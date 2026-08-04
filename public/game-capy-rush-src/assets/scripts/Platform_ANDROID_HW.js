Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Platform_ANDROID_HW = undefined;
var o = require("./ManageCtl");
var i = require("./SdkConfig");
var a = require("./statsCtl");
var r = function () {
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
    this._config = t;
    this.bindEvents();
  }
  t.prototype.showRewardAds = function (t) {
    console.log("## Android showRewardAds");
    this._rewardAdsCb = null;
    this._rewardAdsCb = t;
    if (window.jsb && window.jsb.reflection) {
      jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showVideo", "(Ljava/lang/String;)V", this._config.rewardId);
    }
  };
  t.prototype.showBanner = function () {
    console.log("## Android showBanner");
    if (window.jsb && window.jsb.reflection) {
      jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "addBanner", "(Ljava/lang/String;)V", this._config.bannerId);
    }
  };
  t.prototype.hideBanner = function () {
    console.log("## Android hideBanner");
    if (window.jsb && window.jsb.reflection) {
      jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "hideBanner", "()V");
    }
  };
  t.prototype.showInsert = function (t) {
    if (t === undefined) {
      t = null;
    }
    console.log("## Android showInsert");
    this._insertCloseCb = null;
    this._insertCloseCb = t;
    if (window.jsb && window.jsb.reflection) {
      jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showInsertBanner", "(Ljava/lang/String;)V", this._config.insertId);
    }
  };
  t.prototype.sendEventShuShu = function (t, e) {
    var n = t;
    var o = JSON.stringify(e);
    console.log("## 安卓埋点：" + n + " " + o);
    if (window.jsb && window.jsb.reflection) {
      jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "sendMsg", "(Ljava/lang/String;Ljava/lang/String;)V", n, o);
    }
  };
  t.prototype.onCommentBtn = function () {
    console.log("## Android onCommentBtn");
    if (window.jsb && window.jsb.reflection) {
      jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "onCommentBtn", "()V");
    }
  };
  t.prototype.vibrate = function (t) {
    var e = 30;
    switch (t) {
      case i.MyConstans.vibrateKind.long:
        e = 100;
        break;
      case i.MyConstans.vibrateKind.short:
        e = 30;
    }
    if (window.jsb && window.jsb.reflection) {
      jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "vibrate", "(I)V", e);
    }
  };
  t.prototype.purchase = function (t) {
    console.log("## 内购");
    if (window.jsb && window.jsb.reflection) {
      jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "purchase", "(Ljava/lang/String;)V", t);
    }
  };
  t.prototype.checkOrder = function (t, e) {
    console.log("## 订单查询");
    if (window.jsb && window.jsb.reflection) {
      var n = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "checkOrder", "(Ljava/lang/String;)Z", t);
      if (e) {
        e(n);
      }
    } else if (e) {
      e(false);
    }
  };
  t.prototype.restoreRemoveADs = function () {
    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "restoreRemoveADs", "()V");
  };
  t.prototype.bindEvents = function () {
    var t = this;
    window.bannerShow = function () {};
    window.bannerShow_err = function () {};
    window.videoUnfinish = function () {
      setTimeout(function () {
        a.statsCtl.sendMsg("totalad_rewardclose");
        window.level_gamePause = false;
        if (t._rewardAdsCb) {
          t._rewardAdsCb(1);
        }
        t._rewardAdsCb = null;
      }, 200);
    };
    window.videoFinish = function () {
      setTimeout(function () {
        a.statsCtl.sendMsg("totalad_rewardend");
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
      a.statsCtl.sendMsg("totalad_interplay");
    };
    window.insetVideoClose = function () {
      a.statsCtl.sendMsg("totalad_interend");
      setTimeout(function () {
        if (t._insertCloseCb) {
          t._insertCloseCb();
        }
        t._insertCloseCb = null;
      }, 200);
    };
    window.rewardVideoSuccess = function () {
      a.statsCtl.sendMsg("totalad_rewardplay");
    };
    window.test1 = function () {};
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
      onFeedRenderSuccess: function () {},
      onFeedRenderFail: function () {},
      onSplashShow: function () {},
      onSplashClose: function () {},
      onUnionSdkInitSuccess: function () {
        console.error("[yjr][unionSdkCallback] onUnionSdkInitSuccess");
      },
      onBannerShow: function () {},
      onBannerRemoved: function () {
        console.log("[platform] [AndroidPlatform] onBannerClose");
        window.inGameShowBannerTime = new Date().getTime() / 1000;
      }
    };
    window.unionSdkCallback = e;
    window.commonSdkCallback = e;
    window.remove_ads_suc = function () {
      console.log("## 内购回调 remove_ads_suc   ");
      o.ManageCtl.gameData.setBuyRemoveAds(true);
      cc.game.emit("buy-purchase-suc", i.MyConstans.purchaseId.remove_ads);
    };
    window.remove_ads_fail = function () {
      console.log("## 内购回调 remove_ads_fail");
      cc.game.emit("buy-purchase-fail", i.MyConstans.purchaseId.remove_ads);
    };
    window.remove_ads_pack_suc = function () {
      console.log("## 内购回调 remove_ads_pack_suc ");
      o.ManageCtl.gameData.setBuyRemoveAds(true);
      cc.game.emit("buy-purchase-suc", i.MyConstans.purchaseId.remove_ads_pack);
    };
    window.remove_ads_pack_fail = function () {
      console.log("## 内购回调 remove_ads_pack_fail");
      cc.game.emit("buy-purchase-fail", i.MyConstans.purchaseId.remove_ads_pack);
    };
    window.small_st_suc = function (t) {
      console.log("## 内购回调 small_st_suc ", t);
      cc.game.emit("buy-purchase-suc", i.MyConstans.purchaseId.card10, t);
    };
    window.small_st_fail = function () {
      console.log("## 内购回调 small_st_fail");
      cc.game.emit("buy-purchase-fail", i.MyConstans.purchaseId.card10);
    };
    window.medium_st_suc = function (t) {
      console.log("## 内购回调 medium_st_suc ", t);
      cc.game.emit("buy-purchase-suc", i.MyConstans.purchaseId.card30, t);
    };
    window.medium_st_fail = function () {
      console.log("## 内购回调 medium_st_fail");
      cc.game.emit("buy-purchase-fail", i.MyConstans.purchaseId.card30);
    };
    window.big_st_suc = function (t) {
      console.log("## 内购回调 big_st_suc ", t);
      cc.game.emit("buy-purchase-suc", i.MyConstans.purchaseId.card60, t);
    };
    window.big_st_fail = function () {
      console.log("## 内购回调 big_st_fail");
      cc.game.emit("buy-purchase-fail", i.MyConstans.purchaseId.card60);
    };
    window.huge_st_suc = function (t) {
      console.log("## 内购回调 huge_st_suc ", t);
      cc.game.emit("buy-purchase-suc", i.MyConstans.purchaseId.card150, t);
    };
    window.huge_st_fail = function () {
      console.log("## 内购回调 huge_st_fail");
      cc.game.emit("buy-purchase-fail", i.MyConstans.purchaseId.card150);
    };
    window.mega_st_suc = function (t) {
      console.log("## 内购回调 mega_st_suc ", t);
      cc.game.emit("buy-purchase-suc", i.MyConstans.purchaseId.card300, t);
    };
    window.mega_st_fail = function () {
      console.log("## 内购回调 mega_st_fail");
      cc.game.emit("buy-purchase-fail", i.MyConstans.purchaseId.card300);
    };
    window.brilliant_st_suc = function (t) {
      console.log("## 内购回调 brilliant_st_suc ", t);
      cc.game.emit("buy-purchase-suc", i.MyConstans.purchaseId.card600, t);
    };
    window.brilliant_st_fail = function () {
      console.log("## 内购回调 brilliant_st_fail");
      cc.game.emit("buy-purchase-fail", i.MyConstans.purchaseId.card600);
    };
  };
  return t;
}();
exports.Platform_ANDROID_HW = r;