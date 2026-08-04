Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = require("./SdkConfig");
var i = require("./ksindex");
var a = function () {
  function t() {
    this.wftSdk = null;
  }
  t.GetInstance = function () {
    if (!t.instance) {
      t.instance = new t();
    }
    return this.instance;
  };
  t.prototype.init = function () {
    console.log("## ksPostbackCtl init ", o.MyConstans.projectConst.KS_lxds.appkey);
    this.wftSdk = new i({
      appKey: o.MyConstans.projectConst.KS_lxds.appkey,
      debug: false
    });
  };
  t.prototype.reportActive = function (t) {
    if (this.wftSdk) {
      console.log("## reportActive: ", t);
      this.wftSdk.reportActive({
        openId: t
      });
    } else {
      console.warn("## reportActive !this.wftSdk");
    }
  };
  t.prototype.reportAd = function (t, e) {
    if (this.wftSdk) {
      this.wftSdk.reportAd({
        adUnitId: t,
        isEnded: e
      });
    } else {
      console.warn("## reportAd !this.wftSdk");
    }
  };
  t.instance = null;
  return t;
}();
exports.default = a;