Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Platform_QQ = undefined;
var o = require("./BmsCtl");
var i = function () {
  function t(t) {
    var e = this;
    this._config = {
      app_name: "",
      version: "",
      appid: "",
      rewardId: "",
      bannerId: "",
      insertId: "",
      blockAdId: "",
      appBoxAdId: ""
    };
    this.sdk = window.qq;
    this._rewardAds = null;
    this._rewardAdsCb = null;
    this._rewardHasShow = false;
    this._rewardHasLoad = false;
    this._banner = null;
    this._insert = null;
    this._block = null;
    this._appBox = null;
    this._toastTimer = null;
    this._isMute = false;
    this._config = t;
    this.sdk.showShareMenu({
      withShareTicket: true
    });
    this.sdk.onShareAppMessage(function () {
      return e.getShareData();
    });
  }
  t.prototype.getInstance = function () {
    return this.sdk;
  };
  t.prototype.showRewardAds = function (t) {
    var e = this;
    if (this.sdk.createRewardedVideoAd) {
      if (this._config.rewardId) {
        this._rewardAdsCb = t;
        this._rewardHasShow = false;
        if (!this._rewardAds) {
          this._rewardAds = this.sdk.createRewardedVideoAd({
            adUnitId: this._config.rewardId
          });
          this._rewardAds.onLoad(function () {
            e._rewardHasLoad = true;
            if (!e._rewardHasShow) {
              e._rewardHasShow = true;
              e._rewardAds.show();
            }
          });
          this._rewardAds.onClose(function (t) {
            e._rewardHasLoad = false;
            window.level_gamePause = false;
            e._rewardAdsCb(t.isEnded ? 0 : 1);
            clearTimeout(e._toastTimer);
          });
          this._rewardAds.onError(function (t) {
            e._rewardHasLoad = false;
            console.log("[platform] [QQPlatform] showRewardAds", t);
            window.level_gamePause = false;
            e._rewardAdsCb(-1);
            clearTimeout(e._toastTimer);
          });
        }
        return void (this._rewardHasLoad && !this._rewardHasShow ? (this._rewardHasShow = true, this._rewardAds.show()) : this._rewardAds.load());
      } else {
        return t(-3);
      }
    } else {
      return t(-2);
    }
  };
  t.prototype.preloadBanner = function (t) {
    var e = this;
    if (t === undefined) {
      t = {
        id: ""
      };
    }
    if (this.sdk.createBannerAd && this._config.bannerId) {
      if (!this._banner) {
        this._banner = this.sdk.createBannerAd({
          adUnitId: t.id || this._config.bannerId,
          style: {
            left: 9999,
            top: 9999,
            width: 300,
            height: 300
          },
          adIntervals: 30
        });
        this._banner.onLoad(function () {
          console.log("[platform] [QQPlatform] showBanner", "onLoad 1");
        });
        this._banner.onError(function (t) {
          console.log("[platform] [QQPlatform] preloadBanner", t);
        });
        this._banner.onResize(function (t) {
          console.log("[platform] [QQPlatform] showBanner", "onResize 1");
          var n = e.sdk.getSystemInfoSync();
          e._banner.style.top = n.windowHeight - t.height;
          e._banner.style.left = (n.windowWidth - t.width) / 2;
        });
      }
    }
  };
  t.prototype.showBanner = function (t, e) {
    var n = this;
    if (t === undefined) {
      t = {
        id: ""
      };
    }
    if (this.sdk.createBannerAd && this._config.bannerId) {
      if (this._banner) {
        if (this._banner) {
          var o = this._banner.show();
          if (o) {
            o.then(function () {
              if (e) {
                e(0);
              }
            }).catch(function (t) {
              console.log("[platform] [QQPlatform] showBanner", "show error 2", t);
              if (e) {
                e(1);
              }
            });
          } else if (e) {
            e(1);
          }
        }
      } else {
        this._banner = this.sdk.createBannerAd({
          adUnitId: t.id || this._config.bannerId,
          style: {
            left: 9999,
            top: 9999,
            width: 300,
            height: 300
          },
          adIntervals: 30
        });
        this._banner.onLoad(function () {
          if (n._banner) {
            var t = n._banner.show();
            if (t) {
              t.then(function () {
                if (e) {
                  e(0);
                }
              }).catch(function (t) {
                console.log("[platform] [QQPlatform] showBanner", "show error 2", t);
                if (e) {
                  e(1);
                }
              });
            } else if (e) {
              e(1);
            }
          } else if (e) {
            e(0);
          }
        });
        this._banner.onError(function (t) {
          console.log("[platform] [QQPlatform] showBanner", t);
          if (e) {
            e(1);
          }
        });
        this._banner.onResize(function (t) {
          var e = n.sdk.getSystemInfoSync();
          n._banner.style.top = e.windowHeight - t.height;
          n._banner.style.left = (e.windowWidth - t.width) / 2;
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
    if (this.sdk.createInterstitialAd && this._config.insertId) {
      if (this._insert) {
        this._insert.load().then(function () {
          t._insert.show().then(function () {}).catch(function (t) {
            console.log("[platform] [QQPlatform] showInsert", t);
          });
        });
      } else if (!this._insert) {
        this._insert = this.sdk.createInterstitialAd({
          adUnitId: this._config.insertId
        });
        this._insert.onLoad(function () {
          if (t._insert) {
            t._insert.show().then(function () {}).catch(function (t) {
              console.log("[platform] [QQPlatform] showInsert", t);
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
          console.log("[platform] [QQPlatform] showInsert", e);
          if (e && e.errCode == 1003 && t._insert) {
            t._insert.destroy();
            t._insert = null;
          }
        });
      }
    }
  };
  t.prototype.showBlockAds = function (t) {
    var e = this;
    if (t === undefined) {
      t = {
        id: "",
        left: 0,
        top: 0
      };
    }
    if (this.sdk.createBlockAd && this._config.blockAdId) {
      if (!this._block) {
        this._block = this.sdk.createBlockAd({
          adUnitId: t.id || this._config.blockAdId,
          style: {
            left: t.left,
            top: t.top
          },
          size: 1,
          orientation: "landscape",
          adIntervals: 60
        });
        this._block.onError(function (t) {
          console.log("[platform] [QQPlatform] showBlockAds", t);
        });
        this._block.onLoad(function () {
          console.log("[platform] [QQPlatform] showBlockAds onLoad");
          e._block.show();
        });
      }
    }
  };
  t.prototype.hideBlockAds = function () {
    if (this._block) {
      this._block.destroy();
      this._block = null;
    }
  };
  t.prototype.showAppBoxAds = function () {
    var t = this;
    if (this.sdk.createAppBox && this._config.appBoxAdId) {
      if (!this._appBox) {
        this._appBox = this.sdk.createAppBox({
          adUnitId: this._config.appBoxAdId
        });
        this._appBox.onClose(function () {
          console.log("[platform] [QQPlatform] showAppBox onClose");
          t.hideAppBoxAds();
        });
        this._appBox.load().then(function () {
          console.log("[platform] [QQPlatform] showAppBox onLoad");
          t._appBox.show();
        }).catch(function (t) {
          console.log("[platform] [QQPlatform] showAppBox onError", t);
        });
      }
    }
  };
  t.prototype.hideAppBoxAds = function () {
    if (this._appBox) {
      this._appBox.destroy();
      this._appBox = null;
    }
  };
  t.prototype.share = function () {
    this.sdk.shareAppMessage(this.getShareData());
  };
  t.prototype.getShareData = function () {
    var t = o.default.GetInstance().getShareList();
    var e = {};
    if (t.length > 0) {
      var n = t[Math.floor(Math.random() * t.length)];
      e.title = n.title;
      e.imageUrl = n.image;
    }
    return e;
  };
  return t;
}();
exports.Platform_QQ = i;