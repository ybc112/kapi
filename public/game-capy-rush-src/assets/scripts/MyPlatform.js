Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = require("./SdkConfig");
var i = require("./Platform_ANDROID_HW");
var a = require("./Platform_ANDROID_OPPO");
var r = require("./Platform_ANDROID_VIVO");
var s = require("./Platform_ANDROID_XIAOMI");
var c = require("./Platform_DEV");
var l = require("./Platform_H5_NO_ADS");
var u = require("./Platform_H5_ZUIYOU");
var d = require("./Platform_HUAWEI");
var h = require("./Platform_IOS_HW");
var p = require("./Platform_KS");
var f = require("./Platform_MangoTV");
var g = require("./Platform_OPPO");
var m = require("./Platform_QQ");
var y = require("./Platform_VIVO");
var _ = require("./Platform_WX");
var v = require("./Platform_ZFB");
var C = require("./Platform_ZJTD");
var w = function () {
  function t() {
    this._curPlatfrom = null;
    this.platfromScript = null;
    this._config = null;
  }
  t.prototype.init = function (e) {
    switch (e) {
      case o.MyConstans.PLATFORM.H5_NO_ADS:
        this._config = o.MyConstans.projectConst.H5_NO_ADS;
        this._curPlatfrom = e;
        this.platfromScript = new l.Platform_H5_NO_ADS(this._config);
        t.isH5_NOADS = true;
        break;
      case o.MyConstans.PLATFORM.H5_NO_ADS_fdttt:
        this._config = o.MyConstans.projectConst.H5_NO_ADS_fdttt;
        this._curPlatfrom = e;
        this.platfromScript = new l.Platform_H5_NO_ADS(this._config);
        t.isH5_NOADS_fdttt = true;
        break;
      case o.MyConstans.PLATFORM.H5_NO_ADS_tt:
        this._config = o.MyConstans.projectConst.H5_NO_ADS_tt;
        this._curPlatfrom = e;
        this.platfromScript = new l.Platform_H5_NO_ADS(this._config);
        t.isH5_NOADS_tt = true;
        break;
      case o.MyConstans.PLATFORM.H5_NO_ADS_tt_dpxx:
        this._config = o.MyConstans.projectConst.H5_NO_ADS_tt_dpxx;
        this._curPlatfrom = e;
        this.platfromScript = new l.Platform_H5_NO_ADS(this._config);
        t.isH5_NOADS_tt_dpxx = true;
        break;
      case o.MyConstans.PLATFORM.H5_NO_ADS_AUTO:
        this._config = o.MyConstans.projectConst.H5_NO_ADS_AUTO;
        this._curPlatfrom = e;
        this.platfromScript = new l.Platform_H5_NO_ADS(this._config);
        t.isH5_NOADS = true;
        t.isH5_NOADS_AUTO = true;
        break;
      case o.MyConstans.PLATFORM.H5_NO_ADS_ANDROID:
        this._config = o.MyConstans.projectConst.H5_NO_ADS;
        this._curPlatfrom = e;
        this.platfromScript = new l.Platform_H5_NO_ADS(this._config);
        t.isH5_NOADS_ANDROID = true;
        break;
      case o.MyConstans.PLATFORM.ANDROID_TAPTAP:
        this._config = o.MyConstans.projectConst.ANDROID_TAPTAP;
        this._curPlatfrom = e;
        this.platfromScript = new i.Platform_ANDROID_HW(this._config);
        t.isANDROID_TAPTAP = true;
        t.isANDROID = true;
        break;
      case o.MyConstans.PLATFORM.ANDROID_HYKB:
        this._config = o.MyConstans.projectConst.ANDROID_HYKB;
        this._curPlatfrom = e;
        this.platfromScript = new i.Platform_ANDROID_HW(this._config);
        t.isANDROID_HYKB = true;
        t.isANDROID = true;
        break;
      case o.MyConstans.PLATFORM.ANDROID_233:
        this._config = o.MyConstans.projectConst.ANDROID_233;
        this._curPlatfrom = e;
        this.platfromScript = new i.Platform_ANDROID_HW(this._config);
        t.isANDROID_233 = true;
        t.isANDROID = true;
        break;
      case o.MyConstans.PLATFORM.ANDROID_4399:
        this._config = o.MyConstans.projectConst.ANDROID_4399;
        this._curPlatfrom = e;
        this.platfromScript = new i.Platform_ANDROID_HW(this._config);
        t.isANDROID_4399 = true;
        t.isANDROID = true;
        break;
      case o.MyConstans.PLATFORM.ANDROID_MMY:
        this._config = o.MyConstans.projectConst.ANDROID_MMY;
        this._curPlatfrom = e;
        this.platfromScript = new i.Platform_ANDROID_HW(this._config);
        t.isANDROID_MMY = true;
        t.isANDROID = true;
        break;
      case o.MyConstans.PLATFORM.ANDROID_XIAOMI:
        this._config = o.MyConstans.projectConst.ANDROID_XIAOMI;
        this._curPlatfrom = e;
        this.platfromScript = new s.Platform_ANDROID_XIAOMI(this._config);
        t.isANDROID_XIAOMI = true;
        t.isANDROID = true;
        break;
      case o.MyConstans.PLATFORM.ANDROID_OPPO:
        this._config = o.MyConstans.projectConst.ANDROID_OPPO;
        this._curPlatfrom = e;
        this.platfromScript = new a.Platform_ANDROID_OPPO(this._config);
        t.isANDROID_OPPO = true;
        t.isANDROID = true;
        break;
      case o.MyConstans.PLATFORM.ANDROID_VIVO:
        this._config = o.MyConstans.projectConst.ANDROID_VIVO;
        this._curPlatfrom = e;
        this.platfromScript = new r.Platform_ANDROID_VIVO(this._config);
        t.isANDROID_VIVO = true;
        t.isANDROID = true;
        break;
      case o.MyConstans.PLATFORM.ANDROID_HW:
        this._config = o.MyConstans.projectConst.ANDROID_HW;
        this._curPlatfrom = e;
        this.platfromScript = new i.Platform_ANDROID_HW(this._config);
        t.isANDROID_HW = true;
        t.isANDROID = true;
        break;
      case o.MyConstans.PLATFORM.ANDROID_HUAWEI:
        this._config = o.MyConstans.projectConst.ANDROID_HUAWEI;
        this._curPlatfrom = e;
        this.platfromScript = new i.Platform_ANDROID_HW(this._config);
        t.isANDROID_HUAWEI = true;
        t.isANDROID = true;
        break;
      case o.MyConstans.PLATFORM.IOS_HW:
        this._config = o.MyConstans.projectConst.IOS_HW;
        this._curPlatfrom = e;
        this.platfromScript = new h.Platform_IOS_HW(this._config);
        t.isIOS_HW = true;
        t.isIOS = true;
        break;
      case o.MyConstans.PLATFORM.ZJTD:
        console.log("[platform] 字节小游戏");
        this._config = o.MyConstans.projectConst.ZJTD;
        this._curPlatfrom = o.MyConstans.PLATFORM.ZJTD;
        this.platfromScript = new C.Platform_ZJTD(this._config);
        t.isZJTD = true;
        break;
      case o.MyConstans.PLATFORM.ZJTD_fdttt:
        console.log("[platform] 字节小游戏");
        this._config = o.MyConstans.projectConst.ZJTD_fdttt;
        this._curPlatfrom = o.MyConstans.PLATFORM.ZJTD;
        this.platfromScript = new C.Platform_ZJTD(this._config);
        t.isZJTD_fdttt = true;
        break;
      case o.MyConstans.PLATFORM.ZJTD_dpxx:
        console.log("[platform] 字节小游戏");
        this._config = o.MyConstans.projectConst.ZJTD_dpxx;
        this._curPlatfrom = o.MyConstans.PLATFORM.ZJTD;
        this.platfromScript = new C.Platform_ZJTD(this._config);
        t.isZJTD_dpxx = true;
        break;
      case o.MyConstans.PLATFORM.ZJTD_xmdel:
        console.log("[platform] 字节小游戏");
        this._config = o.MyConstans.projectConst.ZJTD_xmdel;
        this._curPlatfrom = o.MyConstans.PLATFORM.ZJTD;
        this.platfromScript = new C.Platform_ZJTD(this._config);
        t.isZJTD_xmdel = true;
        break;
      case o.MyConstans.PLATFORM.ZJTD_yjtl:
        console.log("[platform] 字节小游戏");
        this._config = o.MyConstans.projectConst.ZJTD_yjtl;
        this._curPlatfrom = o.MyConstans.PLATFORM.ZJTD;
        this.platfromScript = new C.Platform_ZJTD(this._config);
        t.isZJTD_yjtl = true;
        break;
      case o.MyConstans.PLATFORM.WX:
        console.log("[platform] 微信小游戏");
        this._config = o.MyConstans.projectConst.WX;
        this._curPlatfrom = o.MyConstans.PLATFORM.WX;
        this.platfromScript = new _.Platform_WX(this._config);
        t.isWX = true;
        break;
      case o.MyConstans.PLATFORM.WX_xmdel:
        console.log("[platform] 微信小游戏");
        this._config = o.MyConstans.projectConst.WX_xmdel;
        this._curPlatfrom = o.MyConstans.PLATFORM.WX;
        this.platfromScript = new _.Platform_WX(this._config);
        t.isWX_xmdel = true;
        break;
      case o.MyConstans.PLATFORM.KS:
        console.log("[platform] 快手小游戏");
        this._config = o.MyConstans.projectConst.KS;
        this._curPlatfrom = o.MyConstans.PLATFORM.KS;
        this.platfromScript = new p.Platform_KS(this._config);
        t.isKS = true;
        break;
      case o.MyConstans.PLATFORM.KS_nxwz:
        console.log("[platform] 快手小游戏");
        this._config = o.MyConstans.projectConst.KS_nxwz;
        this._curPlatfrom = o.MyConstans.PLATFORM.KS;
        this.platfromScript = new p.Platform_KS(this._config);
        t.isKS_nxwz = true;
        break;
      case o.MyConstans.PLATFORM.ZFB:
        console.log("[platform] 支付宝小游戏");
        this._config = o.MyConstans.projectConst.ZFB;
        this._curPlatfrom = o.MyConstans.PLATFORM.ZFB;
        this.platfromScript = new v.Platform_ZFB(this._config);
        t.isZFB = true;
        break;
      case o.MyConstans.PLATFORM.VIVO:
        console.log("[platform] VIVO小游戏");
        this._config = o.MyConstans.projectConst.VIVO;
        this._curPlatfrom = o.MyConstans.PLATFORM.VIVO;
        this.platfromScript = new y.Platform_VIVO(this._config);
        t.isVIVO = true;
        break;
      case o.MyConstans.PLATFORM.OPPO:
        console.log("[platform] OPPO小游戏");
        this._config = o.MyConstans.projectConst.OPPO;
        this._curPlatfrom = o.MyConstans.PLATFORM.OPPO;
        this.platfromScript = new g.Platform_OPPO(this._config);
        t.isOPPO = true;
        break;
      case o.MyConstans.PLATFORM.H5_zuiyou:
        console.log("[platform] 最右h5");
        this._config = o.MyConstans.projectConst.H5_zuiyou;
        this._curPlatfrom = o.MyConstans.PLATFORM.H5_zuiyou;
        this.platfromScript = new u.Platform_H5_ZUIYOU(this._config);
        t.isH5_zuiyou = true;
        break;
      case o.MyConstans.PLATFORM.MangoTV:
        console.log("[platform] MangoTV");
        this._config = o.MyConstans.projectConst.MangoTV;
        this._curPlatfrom = o.MyConstans.PLATFORM.MangoTV;
        this.platfromScript = new f.Platform_MangoTV(this._config);
        t.isMangoTV = true;
        break;
      default:
        var n = cc.sys.platform;
        cc.sys.os;
        switch (true) {
          case n == cc.sys.BAIDU_GAME:
            console.log("[platform] 百度小游戏");
            break;
          case n == cc.sys.VIVO_GAME:
            console.log("[platform] VIVO小游戏");
            this._config = o.MyConstans.projectConst.VIVO;
            this._curPlatfrom = o.MyConstans.PLATFORM.VIVO;
            this.platfromScript = new y.Platform_VIVO(this._config);
            t.isVIVO = true;
            break;
          case n == cc.sys.OPPO_GAME:
            console.log("[platform] OPPO小游戏");
            this._config = o.MyConstans.projectConst.OPPO;
            this._curPlatfrom = o.MyConstans.PLATFORM.OPPO;
            this.platfromScript = new g.Platform_OPPO(this._config);
            t.isOPPO = true;
            break;
          case n == cc.sys.HUAWEI_GAME:
            console.log("[platform] 华为小游戏");
            this._config = o.MyConstans.projectConst.HUAWEI;
            this._curPlatfrom = o.MyConstans.PLATFORM.HUAWEI;
            this.platfromScript = new d.Platform_HUAWEI(this._config);
            t.isHUAWEI = true;
            break;
          case n == cc.sys.XIAOMI_GAME:
            console.log("[platform] 小米小游戏");
            break;
          case n == cc.sys.ALIPAY_GAME:
            console.log("[platform] 支付宝小游戏");
            this._config = o.MyConstans.projectConst.ZFB;
            this._curPlatfrom = o.MyConstans.PLATFORM.ZFB;
            this.platfromScript = new v.Platform_ZFB(this._config);
            t.isZFB = true;
            break;
          case n == cc.sys.BYTEDANCE_GAME:
          case window.tt !== undefined:
            console.log("[platform] 字节小游戏");
            this._config = o.MyConstans.projectConst.ZJTD;
            this._curPlatfrom = o.MyConstans.PLATFORM.ZJTD;
            this.platfromScript = new C.Platform_ZJTD(this._config);
            t.isZJTD = true;
            break;
          case window.qq !== undefined:
            console.log("[platform] QQ小游戏");
            this._config = o.MyConstans.projectConst.QQ;
            this._curPlatfrom = o.MyConstans.PLATFORM.QQ;
            this.platfromScript = new m.Platform_QQ(this._config);
            t.isQQ = true;
            break;
          case window.kwaigame !== undefined:
            console.log("[platform] 快手小游戏");
            this._config = o.MyConstans.projectConst.KS;
            this._curPlatfrom = o.MyConstans.PLATFORM.KS;
            this.platfromScript = new p.Platform_KS(this._config);
            t.isKS = true;
            break;
          case window.qg !== undefined:
            console.log("[platform] 魅族小游戏");
            break;
          case n == cc.sys.WECHAT_GAME:
            console.log("[platform] 微信小游戏");
            this._config = o.MyConstans.projectConst.WX;
            this._curPlatfrom = o.MyConstans.PLATFORM.WX;
            this.platfromScript = new _.Platform_WX(this._config);
            t.isWX = true;
            break;
          default:
            console.log("[platform] 测试平台");
            this._config = o.MyConstans.projectConst.DEV;
            this._curPlatfrom = o.MyConstans.PLATFORM.DEV;
            this.platfromScript = new c.Platform_DEV(this._config);
            t.isDEV = true;
        }
    }
    t.BMS_APP_NAME = this._config.bms_name;
    t.BMS_VERSION = this._config.bms_version;
    if (this._config.authorStr) {
      t.AuthorStr = this._config.authorStr;
    }
    if (this._config.filingStr) {
      t.FilingStr = this._config.filingStr;
    }
    if (this._config.logoName) {
      t.LogoName = this._config.logoName;
    }
    if (this._config.showHealth) {
      t.ShowHealth = this._config.showHealth;
    }
    if (this._config.showAge) {
      t.ShowAge = this._config.showAge;
    }
  };
  t.prototype.is = function () {
    for (var t = this, e = [], n = 0; n < arguments.length; n++) {
      e[n] = arguments[n];
    }
    return e.some(function (e) {
      return e == t._curPlatfrom;
    });
  };
  t.prototype.showRewardAds = function (t) {
    if (this.platfromScript && this.platfromScript.showRewardAds) {
      this.platfromScript.showRewardAds(t);
    }
  };
  t.prototype.showBanner = function (t, e) {
    if (this.platfromScript && this.platfromScript.showBanner) {
      this.platfromScript.showBanner(t, e);
    }
  };
  t.prototype.hideBanner = function (t) {
    if (this.platfromScript && this.platfromScript.hideBanner) {
      this.platfromScript.hideBanner(t);
    }
  };
  t.prototype.showInsert = function (t) {
    if (this.platfromScript && this.platfromScript.showInsert) {
      this.platfromScript.showInsert(t);
    }
  };
  t.prototype.shareRecordCap = function (t) {
    if (this.platfromScript && this.platfromScript.shareRecordCap) {
      this.platfromScript.shareRecordCap(t);
    }
  };
  t.prototype.startRecordCap = function (t) {
    if (this.platfromScript && this.platfromScript.startRecordCap) {
      this.platfromScript.startRecordCap(t);
    }
  };
  t.prototype.stopRecordCap = function () {
    if (this.platfromScript && this.platfromScript.stopRecordCap) {
      this.platfromScript.stopRecordCap();
    }
  };
  t.prototype.showNativeAds = function (t, e) {
    if (this.platfromScript && this.platfromScript.showNativeAds) {
      this.platfromScript.showNativeAds(t, e);
    }
  };
  t.prototype.hideNativeAds = function () {
    if (this.platfromScript && this.platfromScript.hideNativeAds) {
      this.platfromScript.hideNativeAds();
    }
  };
  t.prototype.showBannerFeed = function () {
    if (this.platfromScript && this.platfromScript.showBannerFeed) {
      this.platfromScript.showBannerFeed();
    }
  };
  t.prototype.hideBannerFeed = function () {
    if (this.platfromScript && this.platfromScript.hideBannerFeed) {
      this.platfromScript.hideBannerFeed();
    }
  };
  t.prototype.showLargeFeed = function (t, e) {
    if (t === undefined) {
      t = "";
    }
    if (e === undefined) {
      e = 0;
    }
    if (this.platfromScript && this.platfromScript.showLargeFeed) {
      this.platfromScript.showLargeFeed();
    }
  };
  t.prototype.hideLargeFeed = function () {
    if (this.platfromScript && this.platfromScript.hideLargeFeed) {
      this.platfromScript.hideLargeFeed();
    }
  };
  t.prototype.showInterstitialFeed = function (t, e) {
    if (this.platfromScript && this.platfromScript.showInterstitialFeed) {
      this.platfromScript.showInterstitialFeed(t, e);
    }
  };
  t.prototype.hideInterstitialFeed = function () {
    if (this.platfromScript && this.platfromScript.hideInterstitialFeed) {
      this.platfromScript.hideInterstitialFeed();
    }
  };
  t.prototype.follow = function (t) {
    if (this.platfromScript && this.platfromScript.follow) {
      this.platfromScript.follow(t);
    }
  };
  t.prototype.destroyInsertAd = function () {
    if (this.platfromScript && this.platfromScript.destroyInsertAd) {
      this.platfromScript.destroyInsertAd();
    }
  };
  t.prototype.hideCustomAd = function (t) {
    if (this.platfromScript && this.platfromScript.hideCustomAd) {
      this.platfromScript.hideCustomAd(t);
    }
  };
  t.prototype.share = function (t) {
    if (this.platfromScript && this.platfromScript.share) {
      this.platfromScript.share(t);
    }
  };
  t.prototype.invite = function (t) {
    if (this.platfromScript && this.platfromScript.invite) {
      this.platfromScript.invite(t);
    }
  };
  t.prototype.sendEventShuShu = function (t, e) {
    if (this.platfromScript && this.platfromScript.sendEventShuShu) {
      this.platfromScript.sendEventShuShu(t, e);
    }
  };
  t.prototype.vibrate = function (t) {
    if (this.platfromScript && this.platfromScript.vibrate) {
      this.platfromScript.vibrate(t);
    }
  };
  t.prototype.onCommentBtn = function () {
    if (this.platfromScript && this.platfromScript.onCommentBtn) {
      this.platfromScript.onCommentBtn();
    }
  };
  t.prototype.purchase = function (t) {
    if (this.platfromScript && this.platfromScript.purchase) {
      this.platfromScript.purchase(t);
    }
  };
  t.prototype.checkOrder = function (t, e) {
    if (this.platfromScript && this.platfromScript.checkOrder) {
      this.platfromScript.checkOrder(t, e);
    }
  };
  t.prototype.restoreRemoveADs = function () {
    if (this.platfromScript && this.platfromScript.checkOrder) {
      this.platfromScript.restoreRemoveADs();
    }
  };
  t.prototype.login = function (t, e) {
    if (this.platfromScript && this.platfromScript.login) {
      this.platfromScript.login(t, e);
    }
  };
  t.prototype.showFriendRank = function () {
    if (this.platfromScript && this.platfromScript.showFriendRank) {
      this.platfromScript.showFriendRank();
    }
  };
  t.prototype.hideFriendRank = function () {
    if (this.platfromScript && this.platfromScript.hideFriendRank) {
      this.platfromScript.hideFriendRank();
    }
  };
  t.prototype.setUserCloudStorage = function (t) {
    if (this.platfromScript && this.platfromScript.setUserCloudStorage) {
      this.platfromScript.setUserCloudStorage(t);
    }
  };
  t.prototype.hideLogoinBtn = function () {
    if (this.platfromScript && this.platfromScript.hideLogoinBtn) {
      this.platfromScript.hideLogoinBtn();
    }
  };
  t.prototype.setClipboardData = function (t, e) {
    if (this.platfromScript && this.platfromScript.setClipboardData) {
      this.platfromScript.setClipboardData(t, e);
    }
  };
  t.instance = null;
  t.BMS_APP_NAME = "";
  t.BMS_VERSION = "";
  t.AuthorStr = "";
  t.FilingStr = "";
  t.LogoName = "logo";
  t.ShowHealth = false;
  t.ShowAge = false;
  t.isDEV = false;
  t.isH5_NOADS = false;
  t.isH5_NOADS_fdttt = false;
  t.isH5_NOADS_tt = false;
  t.isH5_NOADS_tt_dpxx = false;
  t.isH5_NOADS_AUTO = false;
  t.isH5_NOADS_ANDROID = false;
  t.isANDROID_HW = false;
  t.isANDROID = false;
  t.isANDROID_MMY = false;
  t.isANDROID_HYKB = false;
  t.isANDROID_TAPTAP = false;
  t.isANDROID_OPPO = false;
  t.isANDROID_VIVO = false;
  t.isANDROID_233 = false;
  t.isANDROID_4399 = false;
  t.isANDROID_XIAOMI = false;
  t.isANDROID_HUAWEI = false;
  t.isIOS_HW = false;
  t.isIOS = false;
  t.isZJTD = false;
  t.isZJTD_fdttt = false;
  t.isZJTD_dpxx = false;
  t.isZJTD_xmdel = false;
  t.isZJTD_yjtl = false;
  t.isZFB = false;
  t.isZFB_wdlsz6 = false;
  t.isWX = false;
  t.isWX_xmdel = false;
  t.isWX2 = false;
  t.isOPPO = false;
  t.isVIVO = false;
  t.isQQ = false;
  t.isKS = false;
  t.isKS_nxwz = false;
  t.isHUAWEI = false;
  t.isH5_zuiyou = false;
  t.isMangoTV = false;
  return t;
}();
exports.default = w;
w.instance = new w();