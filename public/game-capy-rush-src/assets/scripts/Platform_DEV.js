Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Platform_DEV = undefined;
var o = function () {
  function t(t) {
    this._config = {
      bms_name: "",
      bms_version: ""
    };
    this._config = t;
  }
  t.prototype.showRewardAds = function (t) {
    window.level_gamePause = false;
    return t(0);
  };
  t.prototype.showBanner = function () {
    console.log("## dev showBanner");
  };
  t.prototype.hideBanner = function () {
    console.log("## dev hideBanner");
  };
  t.prototype.showInsert = function () {
    console.log("## dev showInsert");
  };
  t.prototype.share = function (t) {
    if (t) {
      t(0);
    }
  };
  return t;
}();
exports.Platform_DEV = o;