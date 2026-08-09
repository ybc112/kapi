Object.defineProperty(exports, "__esModule", { value: true });

/**
 * CapyPaymentBridge
 * -----------------
 * 把 Cocos 游戏内的关卡/道具事件通过 postMessage 发送给父页面（React），
 * 由父页面调用区块链合约完成代币支付、销毁和领奖。
 *
 * 使用方式：在需要触发支付的脚本中 require 本模块，例如：
 *   var bridge = require("CapyPaymentBridge").default;
 *   bridge.levelStart(levelNumber);
 *   bridge.levelWin(levelNumber);
 *   bridge.levelLose(levelNumber);
 *   bridge.useItem(itemId);
 *
 * 复活流程（新档位规则）：
 *   1. 游戏内玩家死亡后调用 bridge.levelLose(level, reviveCallback)
 *   2. bridge 向父页面发送 CAPY_LEVEL_LOSE，并保存 reviveCallback
 *   3. 父页面支付复活费后向 iframe 发送 CAPY_REVIVE_GRANTED
 *   4. bridge 调用 reviveCallback，游戏从当前关卡继续
 *   5. 若父页面发送 CAPY_ABANDON，bridge 清空回调，游戏回到封面
 *
 * 开始关卡的许可流程（防止不付门票白玩第 2~11 关）：
 *   1. 游戏开始一关前调用 await bridge.requestLevelStart(level)
 *   2. 第 1 关免费、或未启用支付时，直接返回 true
 *   3. 否则向父页面发送 CAPY_LEVEL_REQUEST，等父页面确认链上已进场
 *   4. 父页面回 CAPY_LEVEL_GRANTED → 返回 true，游戏正常开始
 *      父页面回 CAPY_LEVEL_DENIED  → 返回 false，游戏不要开始（父页面会提示支付）
 */

/** 第几关之前是免费体验（和合约里的 FREE_LEVELS 保持一致） */
var FREE_LEVELS = 1;
/** 等父页面回复的超时时间（毫秒）。支付要签名+上链，给足时间 */
var LEVEL_GRANT_TIMEOUT_MS = 180000;
/** 道具购买等待超时（毫秒）。原来只有 10 秒，钱包弹窗+签名+上链根本来不及，
 *  结果游戏先放弃、技能永远加不上。和关卡许可用同一个量级。 */
var ITEM_GRANT_TIMEOUT_MS = 180000;

var CapyPaymentBridge = (function () {
  function CapyPaymentBridge() {
    this._ready = false;
    this._itemGranted = false;
    this._reviveCallback = null;
    this._reviveLevel = null;
    this._paymentEnabled = false;
    this._levelGrant = null; // { level, resolve }
    this._itemPending = null; // { resolve, timer }
    this._init();
  }

  CapyPaymentBridge.prototype._init = function () {
    if (typeof window === "undefined") return;
    this._ready = true;
    var self = this;
    window.addEventListener("message", function (event) {
      var data = event.data;
      if (!data || typeof data !== "object") return;
      if (data.type === "CAPY_ITEM_GRANTED") {
        self._itemGranted = true;
        self._settleItem(true);
        cc.log("[CapyPaymentBridge] item purchase confirmed");
      } else if (data.type === "CAPY_ITEM_DENIED") {
        // 父页面明确告知失败（余额不足 / 没进场 / 用户取消 / 交易失败）
        cc.log("[CapyPaymentBridge] item denied", data.payload);
        self._settleItem(false);
      } else if (data.type === "CAPY_REVIVE_GRANTED") {
        cc.log("[CapyPaymentBridge] revive granted", data.payload);
        self._doRevive(data.payload && data.payload.level);
      } else if (data.type === "CAPY_ABANDON") {
        cc.log("[CapyPaymentBridge] abandon run");
        self._reviveCallback = null;
        self._reviveLevel = null;
      } else if (data.type === "CAPY_PAYMENT_ENABLED") {
        self._paymentEnabled = !!(data.payload && data.payload.enabled);
        cc.log("[CapyPaymentBridge] payment enabled:", self._paymentEnabled);
      } else if (data.type === "CAPY_LEVEL_GRANTED") {
        cc.log("[CapyPaymentBridge] level granted", data.payload);
        self._settleLevelGrant(true);
      } else if (data.type === "CAPY_LEVEL_DENIED") {
        cc.log("[CapyPaymentBridge] level denied", data.payload);
        self._settleLevelGrant(false);
      } else if (data.type === "CAPY_RESET_PROGRESS") {
        // 换钱包了：清掉游戏本地存档（关卡进度 / 道具 / 模式解锁等），
        // 让游戏从第 1 关重新开始。键前缀固定为 kpblccc_（SdkConfig.projectName）。
        cc.log("[CapyPaymentBridge] reset progress", data.payload);
        self._resetProgress();
      }
    });
    // 主动握手：告诉父页面桥接已就绪，请立刻回一次支付开关状态。
    // 否则「CAPY_PAYMENT_ENABLED 还没到」的那一小段时间里，付费关会被当成免费关放过去。
    this._post("CAPY_BRIDGE_READY", {});
  };

  CapyPaymentBridge.prototype._settleLevelGrant = function (granted) {
    var pending = this._levelGrant;
    if (!pending) return;
    this._levelGrant = null;
    if (pending.timer) clearTimeout(pending.timer);
    pending.resolve(granted);
  };

  /**
   * 开始一关之前向父页面申请许可。
   * @param {number} levelNumber
   * @returns {Promise<boolean>} true = 可以开始，false = 不要开始
   */
  CapyPaymentBridge.prototype.requestLevelStart = function (levelNumber) {
    var self = this;
    var level = Number(levelNumber);
    // 未启用支付（免费体验模式）或免费关：直接放行
    if (!this._paymentEnabled || !(level > FREE_LEVELS)) {
      return Promise.resolve(true);
    }
    // 上一次申请还挂着就先取消掉，避免回调错配
    this._settleLevelGrant(false);
    return new Promise(function (resolve) {
      var pending = { level: level, resolve: resolve, timer: null };
      pending.timer = setTimeout(function () {
        if (self._levelGrant === pending) {
          self._levelGrant = null;
          cc.warn("[CapyPaymentBridge] level grant timeout, level", level);
          resolve(false);
        }
      }, LEVEL_GRANT_TIMEOUT_MS);
      self._levelGrant = pending;
      self._post("CAPY_LEVEL_REQUEST", { level: level, time: Date.now() });
    });
  };

  /**
   * 换钱包时清空游戏本地进度。
   * localStorage 键都是 kpblccc_ 前缀；清完清掉挂起的回调，
   * 然后通知父页面重载 iframe —— 游戏重新加载时会读到已清空的存档，
   * 从第 1 关开始（游戏内 _curLevelId 是内存变量，只有重载才能彻底归零）。
   */
  CapyPaymentBridge.prototype._resetProgress = function () {
    if (typeof cc === "undefined" || !cc.sys || !cc.sys.localStorage) return;
    try {
      var keys = Object.keys(cc.sys.localStorage);
      var cleared = 0;
      for (var i = 0; i < keys.length; i++) {
        if (keys[i].indexOf("kpblccc_") === 0) {
          cc.sys.localStorage.removeItem(keys[i]);
          cleared += 1;
        }
      }
      cc.log("[CapyPaymentBridge] cleared", cleared, "localStorage keys");
    } catch (e) {
      cc.error("[CapyPaymentBridge] reset progress error", e);
      return;
    }
    // 清掉挂起的道具/复活/关卡许可回调，避免重载前的残留 Promise 回调错配
    this._settleItem(false);
    this._settleLevelGrant(false);
    this._reviveCallback = null;
    this._reviveLevel = null;
    // 通知父页面：可以重载 iframe 了
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: "CAPY_PROGRESS_RESET_DONE", payload: {} }, "*");
    }
  };

  CapyPaymentBridge.prototype._post = function (type, payload) {
    if (!this._ready || typeof window === "undefined") return;
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: type, payload: payload || {} }, "*");
    }
    cc.log("[CapyPaymentBridge] post:", type, payload);
  };

  CapyPaymentBridge.prototype.levelStart = function (levelNumber) {
    this._post("CAPY_LEVEL_START", { level: levelNumber, time: Date.now() });
  };

  CapyPaymentBridge.prototype.levelWin = function (levelNumber) {
    this._post("CAPY_LEVEL_WIN", { level: levelNumber, time: Date.now() });
  };

  /**
   * 玩家死亡时调用。
   * @param {number} levelNumber - 当前死亡关卡
   * @param {Function} [reviveCallback] - 复活后要执行的回调（从当前关卡继续）
   */
  CapyPaymentBridge.prototype.levelLose = function (levelNumber, reviveCallback) {
    this._reviveLevel = levelNumber;
    this._reviveCallback = reviveCallback || null;
    if (this._paymentEnabled) {
      // 走区块链复活：通知父页面支付复活费，等待 CAPY_REVIVE_GRANTED
      this._post("CAPY_LEVEL_LOSE", { level: levelNumber, time: Date.now() });
    } else {
      // 未启用支付：直接原地复活，保持原有免费体验
      this._doRevive(levelNumber);
    }
  };

  CapyPaymentBridge.prototype._doRevive = function (level) {
    if (!this._reviveCallback) return;
    // 如果父页面传回了关卡号，校验一致性；否则直接执行保存的回调
    if (level != null && this._reviveLevel != null && Number(level) !== Number(this._reviveLevel)) {
      cc.warn("[CapyPaymentBridge] revive level mismatch, expected", this._reviveLevel, "got", level);
    }
    var cb = this._reviveCallback;
    this._reviveCallback = null;
    this._reviveLevel = null;
    try {
      cb();
    } catch (e) {
      cc.error("[CapyPaymentBridge] revive callback error", e);
    }
  };

  CapyPaymentBridge.prototype.isPaymentEnabled = function () {
    return this._paymentEnabled;
  };

  CapyPaymentBridge.prototype.useItem = function (itemId) {
    this._itemGranted = false;
    this._post("CAPY_USE_ITEM", { itemId: itemId || "default", time: Date.now() });
    return this._waitForItemGranted();
  };

  CapyPaymentBridge.prototype._settleItem = function (granted) {
    var pending = this._itemPending;
    if (!pending) return;
    this._itemPending = null;
    if (pending.timer) clearTimeout(pending.timer);
    pending.resolve(granted);
  };

  CapyPaymentBridge.prototype._waitForItemGranted = function () {
    var self = this;
    // 上一次还挂着就先结掉，避免回调错配
    this._settleItem(false);
    return new Promise(function (resolve) {
      var pending = { resolve: resolve, timer: null };
      pending.timer = setTimeout(function () {
        if (self._itemPending === pending) {
          self._itemPending = null;
          cc.warn("[CapyPaymentBridge] item grant timeout");
          resolve(false);
        }
      }, ITEM_GRANT_TIMEOUT_MS);
      self._itemPending = pending;
    });
  };

  return CapyPaymentBridge;
})();

exports.default = new CapyPaymentBridge();
