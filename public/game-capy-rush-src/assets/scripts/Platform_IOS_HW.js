Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Platform_IOS_HW = undefined;
var o = require("./SdkConfig");
var i = require("./AudioManager");
var a = require("./statsCtl");
var r = function () {
  function t(t) {
    this._config = {
      bms_name: "",
      bms_version: ""
    };
    this._rewardAdsCb = null;
    this._config = t;
    this.bindEvents();
  }
  t.prototype.showRewardAds = function (t) {
    console.log("## ios showRewardAds");
    a.statsCtl.sendMsg("totalad_rewardplay");
    this._rewardAdsCb = null;
    this._rewardAdsCb = t;
    if (window.jsb && window.jsb.reflection) {
      jsb.reflection.callStaticMethod("AppController", "showAds");
    }
  };
  t.prototype.showBanner = function () {
    console.log("## ios showBanner");
    if (window.jsb && window.jsb.reflection) {
      jsb.reflection.callStaticMethod("AppController", "showBannerAds1");
    }
  };
  t.prototype.hideBanner = function () {
    console.log("## ios hideBanner");
    if (window.jsb && window.jsb.reflection) {
      jsb.reflection.callStaticMethod("AppController", "hiddenBanner");
    }
  };
  t.prototype.showInsert = function () {
    console.log("## ios showInsert");
    a.statsCtl.sendMsg("totalad_interplay");
    if (window.jsb && window.jsb.reflection) {
      jsb.reflection.callStaticMethod("AppController", "fullscreenAds");
    }
  };
  t.prototype.onCommentBtn = function () {
    console.log("## ios onCommentBtn");
    if (window.jsb && window.jsb.reflection) {
      jsb.reflection.callStaticMethod("AppController", "onCommentBtn");
    }
  };
  t.prototype.vibrate = function (t) {
    var e = "ddd2";
    switch (t) {
      case o.MyConstans.vibrateKind.long:
        e = "ddd3";
        break;
      case o.MyConstans.vibrateKind.short:
        e = "ddd2";
    }
    if (window.jsb && window.jsb.reflection) {
      jsb.reflection.callStaticMethod("AppController", e);
    }
  };
  t.prototype.sendEventShuShu = function (t, e) {
    var n = t;
    var o = JSON.stringify(e);
    console.log("## ios埋点：" + n + " " + o);
    if (window.jsb && window.jsb.reflection) {
      jsb.reflection.callStaticMethod("AppController", "customTrackerWithName:andDictString:", t, o);
    }
  };
  t.prototype.bindEvents = function () {
    var t = this;
    window.iOSSendMsg = function (e) {
      if (e == "playAds") {
        i.default.instance.pauseBGM();
        cc.director.pause();
        cc.game.pause();
      }
      if (!(e != "playAdsEnd" && e != "unityAds1" && e != "rewardPlayEnd" && e != "rewardPlayEnd")) {
        cc.director.resume();
        cc.game.resume();
        i.default.instance.resumeBGM();
        if (!t._rewardAdsCb) {
          a.statsCtl.sendMsg("totalad_interend");
        }
        if (!(e != "unityAds1" && e != "rewardPlayEnd")) {
          window.level_gamePause = false;
          if (t._rewardAdsCb) {
            t._rewardAdsCb(0);
          }
          a.statsCtl.sendMsg("totalad_rewardend");
        }
        if (!(e != "unityAds0" && e != "rewardPlayNotEnd")) {
          window.level_gamePause = false;
          if (t._rewardAdsCb) {
            t._rewardAdsCb(1);
          }
          a.statsCtl.sendMsg("totalad_rewardclose");
        }
      }
      return "abcd";
    };
    cc.game.on(cc.game.EVENT_SHOW, function () {
      cc.director.resume();
      cc.game.resume();
    });
  };
  return t;
}();
exports.Platform_IOS_HW = r;