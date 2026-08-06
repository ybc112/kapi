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
 */

var CapyPaymentBridge = (function () {
  function CapyPaymentBridge() {
    this._ready = false;
    this._itemGranted = false;
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

  CapyPaymentBridge.prototype.levelLose = function (levelNumber) {
    this._post("CAPY_LEVEL_LOSE", { level: levelNumber, time: Date.now() });
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
