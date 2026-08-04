Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Platform_VIVO = undefined;
var o = require("./ManageCtl");
var i = require("./AudioManager");
var a = function () {
  function t(t) {
    this._config = {
      bms_name: "",
      bms_version: "",
      appid: "",
      rewardId: "",
      bannerId: "",
      insertId: "",
      nativeAdId: ""
    };
    this.sdk = window.qg;
    this._rewardAds = null;
    this._rewardAdsCb = null;
    this._rewardHasShow = false;
    this._rewardHasLoad = false;
    this._banner = null;
    this._insert = null;
    this.showTime = this.gettimestamp();
    this.customAd_1 = null;
    this.mask = null;
    this._config = t;
  }
  t.prototype.showRewardAds = function (t, e) {
    var n = this;
    if (e === undefined) {
      e = "";
    }
    if (this.sdk) {
      if (this.sdk.createRewardedVideoAd) {
        if (this._config.rewardId) {
          return void (this._rewardAdsCb || (i.default.instance.pauseBGM(), this._rewardAdsCb = t, this._rewardHasShow = false, this._rewardAds || (this._rewardAds = this.sdk.createRewardedVideoAd({
            posId: this._config.rewardId
          }), this._rewardAds.onLoad(function () {
            n._rewardHasLoad = true;
            if (!n._rewardHasShow) {
              n._rewardHasShow = true;
              n._rewardAds.show();
            }
          }), this._rewardAds.onClose(function (t) {
            n._rewardHasLoad = false;
            if (n._rewardAdsCb) {
              n._rewardAdsCb(t.isEnded ? 0 : 1);
              n._rewardAdsCb = null;
              i.default.instance.resumeBGM();
            }
          }), this._rewardAds.onError(function (t) {
            n._rewardHasLoad = false;
            console.log("## [platform] [VIVOPlatform] showRewardAds", t);
            if (n._rewardAdsCb) {
              n._rewardAdsCb(-1);
              n._rewardAdsCb = null;
              i.default.instance.resumeBGM();
            }
          })), this._rewardHasLoad && !this._rewardHasShow ? (this._rewardHasShow = true, this._rewardAds.show()) : this._rewardAds.load()));
        } else {
          return t(-3);
        }
      } else {
        return t(-2);
      }
    }
  };
  t.prototype.showBanner = function (t, e) {
    if (t === undefined) {
      t = {
        id: ""
      };
    }
    if (this.sdk && this.sdk.createBannerAd && this._config.bannerId) {
      if (!this._banner) {
        this._banner = this.sdk.createBannerAd({
          posId: t.id || this._config.bannerId,
          style: {}
        });
        this._banner.show().then(function () {
          if (e) {
            e(0);
          }
        }).catch(function () {
          if (e) {
            e(1);
          }
        });
        this._banner.onError(function (t) {
          console.log("[platform] [VIVOPlatform] showBanner", t);
        });
      }
    }
  };
  t.prototype.hideBanner = function () {
    if (this._banner) {
      this._banner.destroy();
      this._banner = null;
    }
  };
  t.prototype.showInsert = function () {
    var t = this;
    if (this.sdk && this.sdk.createInterstitialAd && this._config.insertId) {
      if (this._insert) {
        this._insert.load().then(function () {
          t._insert.show().then(function () {}).catch(function (t) {
            console.log("## [platform] [VIVOPlatform] showInsert", t);
          });
        });
      } else if (!this._insert) {
        this._insert = this.sdk.createInterstitialAd({
          posId: this._config.insertId
        });
        this._insert.onLoad(function () {
          if (t._insert) {
            t._insert.show().then(function () {}).catch(function (t) {
              console.log("## [platform] [VIVOPlatform] showInsert", t);
            });
          }
        });
        this._insert.onClose(function () {
          if (t._insert) {
            t._insert.destroy();
            t._insert = null;
          }
        });
        this._insert.onError(function (e) {
          console.log("## [platform] [ZJTDPlatform] showInsert", e);
          if (t._insert) {
            t._insert.destroy();
            t._insert = null;
          }
        });
      }
    }
  };
  t.prototype.checkCD = function () {
    var t = this.gettimestamp() - this.showTime;
    var e = o.ManageCtl.bmsCtl.getConditionValueByType("AdIntervals");
    return e > 0 && (console.log("## checkCD:" + t + " cd-" + e), t < e) || (this.showTime = this.gettimestamp(), false);
  };
  t.prototype.gettimestamp = function (t, e) {
    var n = t ? new Date(t).getTime() + "" : new Date().valueOf() + "";
    if (e != "ms") {
      n = n.substring(0, 10);
    }
    return Number(n);
  };
  t.prototype.showNativeAds = function () {
    var t = this._config.nativeAdId;
    console.log("## showNativeAds id: ", t);
    if (!this.checkCD()) {
      this.showCustomAd_1();
    }
  };
  t.prototype.showCustomAd_1 = function () {
    var t = this;
    if (this.sdk && this.sdk.createCustomAd && this._config.nativeAdId) {
      if (this.customAd_1) {
        console.log("## 调用太快");
      } else {
        var e = cc.winSize.height * (352 / 1334);
        var n = this._config.nativeAdId;
        console.log("## showInsert id: ", n);
        this.customAd_1 = this.sdk.createCustomAd({
          adUnitId: n,
          style: {
            top: e,
            width: this.sdk.getSystemInfoSync().screenWidth
          }
        });
        this.customAd_1.onLoad(function () {
          console.log("## showCustomAd_1 onLoad 111 成功");
        });
        this.customAd_1.onClose(function () {
          console.log("## showCustomAd_1 onHide 111 成功");
          if (t.mask) {
            t.mask.active = false;
          }
          t.destroyCustomAd();
        });
        this.customAd_1.onError(function (e) {
          console.log("## [platform] showCustomAd onError1", JSON.stringify(e));
          if (t.mask) {
            t.mask.active = false;
          }
          t.destroyCustomAd();
        });
        this.customAd_1.onHide(function (e) {
          console.log("## [platform] showCustomAd onHide", JSON.stringify(e));
          if (t.mask) {
            t.mask.active = false;
          }
          t.destroyCustomAd();
        });
        console.log("## showCustomAd_1 id 1111", n);
        this.customAd_1.show().then(function () {
          console.log("## [platform]  showCustomAd 成功显示");
          var e = window.vivo_maskNode;
          if (e) {
            e.zIndex = 99999999;
            e.active = true;
            t.mask = e;
          } else {
            (e = cc.find("Canvas/Mask")).parent = cc.find("MainScene");
            e.zIndex = 99999999;
            e.active = true;
            e.position = cc.v2(0, 0);
            t.mask = e;
          }
        }).catch(function (t) {
          console.log("## [platform]  showCustomAd error: ", JSON.stringify(t));
        });
      }
    }
  };
  t.prototype.destroyCustomAd = function () {
    if (this.customAd_1) {
      this.customAd_1.destroy();
      this.customAd_1 = null;
    }
  };
  return t;
}();
exports.Platform_VIVO = a;