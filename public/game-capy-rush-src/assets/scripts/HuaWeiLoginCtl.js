Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = require("./SdkConfig");
var i = function () {
  function t() {
    this.loadDataDoneFlag = false;
    this._loginCallback = null;
  }
  t.GetInstance = function () {
    if (!t.instance) {
      t.instance = new t();
    }
    return this.instance;
  };
  t.prototype.init = function () {};
  t.prototype.login = function () {
    if (window.qg) {
      console.log("## huawei login appid:" + o.MyConstans.projectConst.HUAWEI.appid);
      window.qg.gameLoginWithReal({
        forceLogin: 1,
        appid: o.MyConstans.projectConst.HUAWEI.appid,
        success: function () {
          console.log("## huaweiLoginSuc");
          window.huaweiLoginSuc();
        },
        fail: function (t, e) {
          console.log("## gameLoginWithReal fail2 :" + t + ", code:" + e);
          window.huaweiLoginFail();
        }
      });
    } else {
      window.huaweiLoginFail();
    }
  };
  t.instance = null;
  t.loginSuccessFlag = false;
  t.loginFailCount = 0;
  return t;
}();
exports.default = i;
window.huaweiLoginSuc = function () {
  console.log("## [window][huaweiLoginSuc]");
  i.loginSuccessFlag = true;
  window.hauweiLoginDone();
};