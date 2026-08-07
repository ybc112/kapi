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
 */

var CapyPaymentBridge = (function () {
  function CapyPaymentBridge() {
    this._ready = false;
    this._itemGranted = false;
    this._reviveCallback = null;
    this._reviveLevel = null;
    this._paymentEnabled = false;
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
        cc.log("[CapyPaymentBridge] item purchase confirmed");
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
      }
    });
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

  CapyPaymentBridge.prototype._waitForItemGranted = function () {
    var self = this;
    return new Promise(function (resolve) {
      var attempts = 0;
      var timer = setInterval(function () {
        if (self._itemGranted) {
          clearInterval(timer);
          resolve(true);
          return;
        }
        attempts++;
        if (attempts > 100) {
          // 10 seconds timeout
          clearInterval(timer);
          resolve(false);
        }
      }, 100);
    });
  };

  return CapyPaymentBridge;
})();

exports.default = new CapyPaymentBridge();
