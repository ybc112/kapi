Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Platform_ANDROID_XIAOMI = undefined;
var o = require("./statsCtl");
var i = function () {
  function t(t) {
    this._config = {
      bms_name: "",
      bms_version: "",
      rewardId: "",
      insertId: "",
      bannerId: ""
    };
    this._rewardAdsCb = null;
    this._insertCloseCb = null;
    this.isGetReward = false;
    this.jsbPath = "org/cocos2dx/javascript/SdkBridge";
    this.curNativePosId = "";
    this.curInterstitialFeedPosId = "";
    this.curLargeFeedPosId = "";
    this.interstitialFeedCloseCallback = null;
    this.showFailedCallback = null;
    this._config = t;
    this.bindEvents();
  }
  t.prototype.showRewardAds = function (t) {
    console.log("## Android showRewardAds");
    this._rewardAdsCb = null;
    this._rewardAdsCb = t;
    if (window.jsb && window.jsb.reflection) {
      jsb.reflection.callStaticMethod(this.jsbPath, "showRewardVideo", "()V");
    }
  };
  t.prototype.showBanner = function () {
    console.log("## Android showBanner");
    if (window.jsb && window.jsb.reflection) {
      jsb.reflection.callStaticMethod(this.jsbPath, "showBanner", "()V");
    }
  };
  t.prototype.hideBanner = function () {
    console.log("## Android hideBanner");
    if (window.jsb && window.jsb.reflection) {
      jsb.reflection.callStaticMethod(this.jsbPath, "removeBanner", "()V");
    }
  };
  t.prototype.showInsert = function (t) {
    if (t === undefined) {
      t = null;
    }
    console.log("## Android showInsert");
    this._insertCloseCb = null;
    this._insertCloseCb = t;
    var e = this._config.insertId;
    if (window.jsb && window.jsb.reflection) {
      jsb.reflection.callStaticMethod(this.jsbPath, "showInsertBanner", "(Ljava/lang/String;)V", e);
    }
  };
  t.prototype.showBannerFeed = function () {};
  t.prototype.hideBannerFeed = function () {
    if (window.jsb && window.jsb.reflection) {
      jsb.reflection.callStaticMethod(this.jsbPath, "removeBannerFeed", "(Ljava/lang/String;)V", this.curNativePosId);
    }
    this.curNativePosId = "";
  };
  t.prototype.showLargeFeed = function () {};
  t.prototype.hideLargeFeed = function () {
    console.log("## hideLargeFeed  posId: " + this.curLargeFeedPosId);
    if (window.jsb && window.jsb.reflection) {
      window.jsb.reflection.callStaticMethod(this.jsbPath, "removeLargePicFeed", "(Ljava/lang/String;)V", this.curLargeFeedPosId);
    }
  };
  t.prototype.showInterstitialFeed = function () {};
  t.prototype.hideInterstitialFeed = function () {
    console.log("## hideInterstitialFeed  posId: " + this.curInterstitialFeedPosId);
    if (window.jsb && window.jsb.reflection) {
      jsb.reflection.callStaticMethod(this.jsbPath, "removeInterstitialFeed", "(Ljava/lang/String;)V", this.curInterstitialFeedPosId);
    }
    this.curInterstitialFeedPosId = "";
  };
  t.prototype.bindEvents = function () {
    var t = this;
    window.bannerShow = function () {};
    window.bannerShow_err = function () {};
    window.videoUnfinish = function () {
      setTimeout(function () {
        o.statsCtl.sendMsg("totalad_rewardclose");
        window.level_gamePause = false;
        if (t._rewardAdsCb) {
          t._rewardAdsCb(1);
        }
        t._rewardAdsCb = null;
      }, 200);
    };
    window.videoFinish = function () {
      setTimeout(function () {
        o.statsCtl.sendMsg("totalad_rewardend");
        window.level_gamePause = false;
        if (t._rewardAdsCb) {
          t._rewardAdsCb(0);
        }
        t._rewardAdsCb = null;
      }, 200);
    };
    window.clickBanner = function () {};
    window.videoError = function () {
      setTimeout(function () {
        window.level_gamePause = false;
        if (t._rewardAdsCb) {
          t._rewardAdsCb(-1);
        }
        t._rewardAdsCb = null;
      }, 200);
    };
    window.insetVideoSuccess = function () {
      window.lastInsertAdTime = new Date().getTime() / 1000;
      o.statsCtl.sendMsg("totalad_interplay");
    };
    window.insetVideoClose = function () {
      window.lastInsertAdTime = new Date().getTime() / 1000;
      o.statsCtl.sendMsg("totalad_interend");
      setTimeout(function () {
        if (t._insertCloseCb) {
          t._insertCloseCb();
        }
        t._insertCloseCb = null;
      }, 200);
    };
    window.rewardVideoSuccess = function () {
      o.statsCtl.sendMsg("totalad_rewardplay");
    };
    window.test1 = function () {};
    window.InterstitialFeedRemove = function () {
      console.log("## InterstitialFeedRemove  posId: " + t.curInterstitialFeedPosId);
      t.curInterstitialFeedPosId = "";
      if (t.interstitialFeedCloseCallback) {
        t.interstitialFeedCloseCallback();
        cc.game.emit("closeInterstitialFeedRemove");
      }
      t.interstitialFeedCloseCallback = null;
    };
    window.UserCloseInterstitialFeed = function () {
      console.log("## UserCloseInterstitialFeed  posId: " + t.curInterstitialFeedPosId);
      t.curInterstitialFeedPosId = "";
      if (t.interstitialFeedCloseCallback) {
        t.interstitialFeedCloseCallback();
        cc.game.emit("closeInterstitialFeedRemove");
      }
      t.interstitialFeedCloseCallback = null;
    };
    window.InterstitialFeedShowFailed = function () {
      console.log("## InterstitialFeedShowFailed  posId: " + t.curInterstitialFeedPosId);
      t.curInterstitialFeedPosId = "";
      if (t.showFailedCallback) {
        t.showFailedCallback();
      }
      t.showFailedCallback = null;
    };
    window.InterstitialFeedShow = function () {
      console.log("## InterstitialFeedShow ");
      cc.game.emit("InterstitialFeedShow");
    };
    window.BannerFeedShowFailed = function () {
      console.log("## BannerFeedShowFailed  posId: " + t.curNativePosId);
      t.curNativePosId = "";
    };
    window.LargeFeedRemove = function () {
      console.log("## onLargeFeedRemove  posId: " + t.curLargeFeedPosId);
      t.curLargeFeedPosId = "";
    };
    var e = {
      onRequestPermissionsSuccess: function () {},
      onRequestPermissionsFail: function () {},
      onRequestFailAndNeverAsk: function () {},
      onPrivacyAccept: function () {
        console.error("[yjr][unionSdkCallback] onPrivacyAccept");
      },
      onPrivacyReject: function () {},
      onRewardVideoComplete: function () {
        this.isGetReward = true;
      },
      onRewardVideoClose: function () {
        if (this.isGetReward) {
          window.videoFinish();
        } else {
          window.videoUnfinish();
        }
        this.isGetReward = false;
      },
      onRewardVideoShow: function () {},
      onRewardVideoFail: function () {
        window.videoError();
      },
      onInterstitialShow: function () {
        window.lastInsertAdTime = new Date().getTime() / 1000;
        window.insetVideoSuccess();
      },
      onInterstitialClose: function () {
        window.lastInsertAdTime = new Date().getTime() / 1000;
        window.insetVideoClose();
      },
      onInterstitialShowFailed: function () {},
      onFeedShow: function () {},
      onFeedShowFail: function () {},
      onFeedClose: function () {},
      onFeedRenderSuccess: function () {},
      onFeedRenderFail: function () {},
      onInterstitialVideoShow: function () {},
      onInterstitialVideoClose: function () {},
      onInterstitialVideoShowFailed: function () {},
      onFeedShowFailed: function () {},
      onSplashShow: function () {},
      onSplashShowFailed: function () {},
      onSplashDismiss: function () {},
      onBannerFeedShow: function () {},
      onUnionSdkInitSuccess: function () {
        console.error("[yjr][unionSdkCallback] onUnionSdkInitSuccess");
      },
      onBannerShow: function () {},
      onBannerFeedShowFailed: function () {
        window.BannerFeedShowFailed();
      },
      onBannerFeedRemove: function () {},
      onInterstitialFeedShow: function () {
        window.InterstitialFeedShow();
      },
      onInterstitialFeedShowFailed: function () {
        window.InterstitialFeedShowFailed();
      },
      onInterstitialFeedRemove: function () {
        window.InterstitialFeedRemove();
      },
      onUserCloseInterstitialFeed: function () {
        window.UserCloseInterstitialFeed();
      },
      onLargeFeedShow: function () {},
      onLargeFeedShowFailed: function () {},
      onLargeFeedRemove: function () {
        window.LargeFeedRemove();
      }
    };
    window.unionSdkCallback = e;
    window.commonSdkCallback = e;
    window.vivoAdCallback = e;
    window.xiaomiAdCallback = e;
    window.purchaseCallback = function (t) {
      if (t == "paySuccessful") {
        cc.game.emit("buy-removeAdSuc");
      }
    };
  };
  return t;
}();
exports.Platform_ANDROID_XIAOMI = i;