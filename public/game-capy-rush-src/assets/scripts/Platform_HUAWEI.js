Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Platform_HUAWEI = undefined;
var o = function () {
  function t(t) {
    this._config = {
      app_name: "",
      version: "",
      appid: "",
      rewardId: "",
      bannerId: "",
      insertId: "",
      blockAdId: ""
    };
    this.sdk = window.qg;
    this._rewardAds = null;
    this._rewardAdsCb = null;
    this._rewardHasShow = false;
    this._rewardHasLoad = false;
    this._banner = null;
    this._insert = null;
    this._nativeAds = [];
    this._config = t;
  }
  t.prototype.getInstance = function () {
    return this.sdk;
  };
  t.prototype.showRewardAds = function (t) {
    var e = this;
    if (this.sdk.createRewardedVideoAd) {
      if (this._config.rewardId) {
        return void (this._rewardAdsCb || (this._rewardAdsCb = t, this._rewardHasShow = false, this._rewardAds || (this._rewardAds = this.sdk.createRewardedVideoAd({
          adUnitId: this._config.rewardId
        }), this._rewardAds.onLoad(function () {
          e._rewardHasLoad = true;
          if (!e._rewardHasShow) {
            e._rewardHasShow = true;
            e._rewardAds.show();
          }
        }), this._rewardAds.onClose(function (t) {
          e._rewardHasLoad = false;
          window.level_gamePause = false;
          if (e._rewardAdsCb) {
            setTimeout(function () {
              e._rewardAdsCb(t.isEnded ? 0 : 1);
              e._rewardAdsCb = null;
            }, 300);
          }
        }), this._rewardAds.onError(function (t) {
          e._rewardHasLoad = false;
          console.log("[platform] [HUAWEIPlatform] showRewardAds", JSON.stringify(t));
          window.level_gamePause = false;
          if (e._rewardAdsCb) {
            setTimeout(function () {
              e._rewardAdsCb(-1);
              e._rewardAdsCb = null;
            }, 300);
          }
        })), this._rewardHasLoad && !this._rewardHasShow ? (this._rewardHasShow = true, this._rewardAds.show()) : this._rewardAds.load()));
      } else {
        return t(-3);
      }
    } else {
      return t(-2);
    }
  };
  t.prototype.showBanner = function (t) {
    if (t === undefined) {
      t = {
        id: ""
      };
    }
    if (this._config.bannerId && !this._banner) {
      var e = this.sdk.getSystemInfoSync();
      console.log("on getSystemInfoSync: success =" + JSON.stringify(e));
      var n = e.safeArea.height;
      this._banner = this.sdk.createBannerAd({
        adUnitId: t.id || this._config.bannerId,
        style: {
          top: n - 57,
          left: 0,
          height: 57,
          width: 360
        }
      });
      this._banner.show();
      this._banner.onError(function (t) {
        console.log("## [platform] [HUAWEIPlatform] showBanner err:", JSON.stringify(t));
      });
    }
  };
  t.prototype.hideBanner = function () {
    if (this._banner) {
      this._banner.hide();
      this._banner.destroy();
      this._banner = null;
    }
  };
  t.prototype.showInsert = function () {
    var t = this;
    if (this._config.insertId) {
      if (!this._insert) {
        this._insert = this.sdk.createInterstitialAd({
          adUnitId: this._config.insertId
        });
        this._insert.onLoad(function () {
          console.log("## [platform] [HUAWEIPlatform] showInsert onLoad");
          if (t._insert) {
            t._insert.show();
          }
        });
        this._insert.onClose(function () {
          console.log("## [platform] [HUAWEIPlatform] showInsert onClose");
          if (t._insert) {
            t._insert.destroy();
            t._insert = null;
          }
        });
        this._insert.onError(function (e) {
          console.log("## [platform] [HUAWEIPlatform] showInsert onError", JSON.stringify(e));
          if (e && e.errCode == 1003 && t._insert) {
            t._insert.destroy();
            t._insert = null;
          }
        });
        this._insert.load();
      }
    }
  };
  return t;
}();
exports.Platform_HUAWEI = o;