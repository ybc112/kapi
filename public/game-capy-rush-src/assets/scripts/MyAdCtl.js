Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyAdCtl = undefined;
var o = require("./ManageCtl");
var i = require("./MyPlatform");
var a = require("./SdkConfig");
var r = require("./BmsCtl");
var s = require("./statsCtl");
(function (t) {
  var e = 0;
  var n = false;
  t.playVideo = function (t) {
    console.log("## 看激励视频");
    window.level_gamePause = true;
    if (o.ManageCtl.isH5_NOADS() || a.MyConstans.noAds || o.ManageCtl.persistRootNode.lookVidepDebugFlag) {
      if (t) {
        t(0);
      }
    } else {
      i.default.instance.showRewardAds(t);
    }
  };
  t.showInsertAd = function (t, e) {
    if (t === undefined) {
      t = null;
    }
    if (e === undefined) {
      e = null;
    }
    if (!a.MyConstans.noAds && !i.default.isH5_NOADS) {
      s.statsCtl.sendMsg("totalad_interplay");
      var n = new Date().getTime() / 1000 - (window.lastInsertAdTime || 0);
      if (i.default.isANDROID_233) {
        var r = o.ManageCtl.bmsCtl.getConditionValueByType("FullADTime");
        if (r > 0 && i.default.isANDROID_233 && n < r) {
          console.log("## 插屏间隔小于" + r + "， time: ", n);
          return void (e && e());
        }
      } else if (i.default.isZJTD) {
        var c = o.ManageCtl.bmsCtl.getConditionValueByType("AdIntervals");
        if (c > 0 && n < c) {
          console.log("## 插屏间隔小于" + c + "， time: ", n);
          return void (e && e());
        }
      }
      window.lastInsertAdTime = new Date().getTime() / 1000;
      console.log("## showInsert");
      if (i.default.isVIVO || i.default.isOPPO) {
        console.log("## showInsertAd 3");
        return void i.default.instance.showNativeAds();
      }
      i.default.instance.showInsert(t);
    }
  };
  t.destroyInsertAd = function () {
    i.default.instance.destroyInsertAd();
  };
  t.showBanner = function () {
    if (!(a.MyConstans.noAds || i.default.isH5_NOADS || i.default.isH5_NOADS_fdttt)) {
      if (e <= 0) {
        if (!n) {
          if (i.default.isANDROID_XIAOMI) {
            if (r.default.GetInstance().getConditionValueByType("isCheck") == 1) {
              i.default.instance.showBanner();
            } else {
              i.default.instance.showBannerFeed();
            }
          } else {
            i.default.instance.showBanner();
          }
        }
        n = true;
      }
      e += 1;
    }
  };
  t.hideBanner = function () {
    if (!(a.MyConstans.noAds || i.default.isH5_NOADS || i.default.isH5_NOADS_fdttt)) {
      if (e <= 1) {
        if (n) {
          window.inGameShowBannerTime = new Date().getTime() / 1000;
        }
        n = false;
        if (i.default.isANDROID_XIAOMI) {
          i.default.instance.hideBanner();
          i.default.instance.hideBannerFeed();
        } else {
          i.default.instance.hideBanner();
        }
      }
      if ((e -= 1) < 0) {
        e = 0;
      }
    }
  };
})(exports.MyAdCtl || (exports.MyAdCtl = {}));