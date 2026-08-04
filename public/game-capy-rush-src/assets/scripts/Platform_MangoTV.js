Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Platform_MangoTV = undefined;
var o = function () {
  function t(t) {
    this._config = {
      bms_name: "",
      bms_version: "",
      appid: "",
      rewardId: "",
      bannerId: "",
      insertId: "",
      shushuId: "",
      shareId: ""
    };
    this.sdk = window.mgtv;
    this._rewardAds = null;
    this._rewardAdsCb = null;
    this._rewardHasShow = false;
    this._rewardHasLoad = false;
    this._banner = null;
    this._insert = null;
    this._insertAdsCb = null;
    this._recorder = null;
    this._recordStatus = -1;
    this._recordPath = null;
    this._inScene = -1;
    this._config = t;
    this.sdk;
  }
  t.prototype.guid = function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
      var e = 16 * Math.random() | 0;
      return (t == "x" ? e : 3 & e | 8).toString(16);
    });
  };
  t.prototype.sendEventShuShu = function () {};
  t.prototype.setSuperProperties = function () {};
  t.prototype.setUserSet = function () {};
  t.prototype.getInstance = function () {
    return this.sdk;
  };
  t.prototype.showRewardAds = function (t) {
    var e = this;
    console.log("## tt showRewardAds rewardId " + this._config.rewardId);
    if (this.sdk) {
      if (!this.sdk.createRewardedVideoAd) {
        window.level_gamePause = false;
        return t(-2);
      }
      if (!this._config.rewardId) {
        window.level_gamePause = false;
        return t(-3);
      }
      this._rewardAdsCb = t;
      this._rewardHasShow = false;
      if (!this._rewardAds) {
        this._rewardAds = this.sdk.createRewardedVideoAd({
          adUnitId: this._config.rewardId
        });
        this._rewardAds.onLoad(function () {
          e._rewardHasLoad = true;
          if (e._rewardHasShow) {
            window.level_gamePause = false;
          } else {
            e._rewardHasShow = true;
            e._rewardAds.show().then(function () {});
          }
        });
        this._rewardAds.onClose(function (t) {
          console.log("## 激励视频回调： ", JSON.stringify(t));
          e._rewardHasLoad = false;
          t.isEnded;
          window.level_gamePause = false;
          if (t && t.isEnded || t === undefined) {
            e._rewardAdsCb(0);
          } else {
            e._rewardAdsCb(1);
          }
        });
        this._rewardAds.onError(function (t) {
          e._rewardHasLoad = false;
          console.log("## showRewardAds err:", t);
          window.level_gamePause = false;
          e._rewardAdsCb(-1);
        });
      }
      if (this._rewardHasLoad && !this._rewardHasShow) {
        this._rewardHasShow = true;
        this._rewardAds.show().then(function () {});
      } else {
        this._rewardAds.load();
      }
    }
  };
  t.prototype.showBanner = function () {};
  t.prototype.hideBanner = function () {};
  t.prototype.showInsert = function () {};
  t.prototype.destroyInsertAd = function () {};
  t.prototype.share = function () {};
  return t;
}();
exports.Platform_MangoTV = o;