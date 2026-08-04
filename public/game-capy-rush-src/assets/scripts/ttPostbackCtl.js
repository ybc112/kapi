Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = require("./MyPlatform");
var i = require("./index");
var a = require("./Report");
var r = function () {
  function t() {
    this._sdk = i.default;
  }
  t.GetInstance = function () {
    if (!t.instance) {
      t.instance = new t();
    }
    return this.instance;
  };
  t.prototype.init = function () {
    window.game_loginDone = false;
    var t = o.default.BMS_APP_NAME;
    var e = o.default.BMS_VERSION;
    console.log("## init mappName: " + t);
    if (window.tt || window.ks || window.wx) {
      var n = "tt_minigame";
      if (window.ks) {
        n = "ks_minigame";
      } else if (window.wx) {
        n = "wx_minigame";
      }
      this._sdk.initParams({
        app_name: t,
        channel: n,
        version: e,
        log_level: "info"
      });
    }
  };
  t.prototype.adRequest = function (t) {
    a.default.adRequest(t);
  };
  t.prototype.adClick = function (t) {
    a.default.adClick(t);
  };
  t.prototype.adImpression = function (t) {
    a.default.adImpression(t);
  };
  t.prototype.adFill = function (t) {
    a.default.adFill(t);
  };
  t.prototype.adImpressionDone = function (t) {
    a.default.adImpressionDone(t);
  };
  t.instance = null;
  return t;
}();
exports.default = r;