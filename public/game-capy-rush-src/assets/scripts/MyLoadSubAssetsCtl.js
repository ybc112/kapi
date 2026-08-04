Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = require("./SdkConfig");
var i = require("./Language");
var a = function () {
  function t() {
    this._needLoadSubCount = 0;
    this._loadSubDoneCount = 0;
    this._paths = [];
    this._loadIndex = 0;
  }
  t.GetInstance = function () {
    if (!t.instance) {
      t.instance = new t();
    }
    return this.instance;
  };
  t.prototype.loadSubAssets = function () {
    if (!(o.MyConstans.getCustomPlatform() != o.MyConstans.PLATFORM.ANDROID_HW && o.MyConstans.getCustomPlatform() != o.MyConstans.PLATFORM.IOS_HW && o.MyConstans.getCustomPlatform() != o.MyConstans.PLATFORM.DEV)) {
      this.loadHaiWaiFont();
    }
    if (o.MyConstans.getCustomPlatform() == o.MyConstans.PLATFORM.ZJTD || o.MyConstans.getCustomPlatform() == o.MyConstans.PLATFORM.ZJTD_fdttt || o.MyConstans.getCustomPlatform() == o.MyConstans.PLATFORM.ZJTD_dpxx || o.MyConstans.getCustomPlatform() == o.MyConstans.PLATFORM.ZJTD_xmdel || o.MyConstans.getCustomPlatform() == o.MyConstans.PLATFORM.ZJTD_yjtl || o.MyConstans.getCustomPlatform() == o.MyConstans.PLATFORM.WX || o.MyConstans.getCustomPlatform() == o.MyConstans.PLATFORM.WX_xmdel || o.MyConstans.getCustomPlatform() == o.MyConstans.PLATFORM.KS_nxwz || o.MyConstans.getCustomPlatform() == o.MyConstans.PLATFORM.DEV) {
      this._needLoadSubCount += 1;
      this.loadSubHandle3("mfont");
    } else {
      this._loadSubDoneCount = this._needLoadSubCount;
    }
  };
  t.prototype.loadSubHandle1 = function (t) {
    var e = this;
    console.log("## loadSubHandle1 开始加载分包：" + t);
    cc.loader.downloader.loadSubpackage(t, function (n) {
      if (n) {
        console.log("## myLoadSubAssetsCtl loadSubHandle2 err: " + JSON.stringify(n));
        return e.loadSubHandle2(t);
      }
      e._loadSubDoneCount += 1;
      if (e._paths.length <= 0) {
        e._loadSubDoneCount = e._needLoadSubCount;
      } else if (e._loadIndex < e._paths.length) {
        var o = e._paths[e._loadIndex];
        e.loadSubHandle2(o);
      }
    });
  };
  t.prototype.loadSubHandle2 = function (t) {
    var e = this;
    console.log("## loadSubHandle2 开始加载分包：" + t);
    cc.loader.downloader.loadSubpackage(t, function (n) {
      if (n) {
        console.log("## myLoadSubAssetsCtl loadSubHandle2 err: " + JSON.stringify(n));
        return e.loadSubHandle2(t);
      }
      e._loadSubDoneCount += 1;
      e._loadIndex += 1;
      if (e._loadIndex < e._paths.length) {
        var o = e._paths[e._loadIndex];
        e.loadSubHandle2(o);
      }
    });
  };
  t.prototype.loadSubHandle3 = function (t) {
    var e = this;
    cc.loader.downloader.loadSubpackage(t, function (n, o) {
      if (n) {
        return e.loadSubHandle2(t);
      }
      if (o.name == "mfont") {
        cc.assetManager.loadBundle(o.name, function (t, e) {
          e.load("TTZhunCuYuanJ", cc.Font, function (t, e) {
            if (t) {
              console.error("Failed to load font:", t);
            } else {
              window.myGameFont = e;
            }
          });
        });
      }
      e._loadSubDoneCount += 1;
    });
  };
  t.prototype.isLoadSubDone = function () {
    return this._loadSubDoneCount >= this._needLoadSubCount;
  };
  t.prototype.sendMsg = function (t, e) {
    if (e === undefined) {
      e = null;
    }
    if (e == null) {
      e = " ";
    }
    console.log("%c## 端埋点：" + t + "   " + JSON.stringify(e), "color:#f700f0");
    if (cc.sys.platform == cc.sys.ANDROID) {
      this.subEvent(t, e);
    } else if (!(cc.sys.platform != cc.sys.IPHONE && cc.sys.platform != cc.sys.IPAD)) {
      this.iOSCustomTrackerWithName(t, e);
    }
  };
  t.prototype.subEventUM = function (t, e) {
    console.log("%c## 小游戏埋点：" + t + "   " + JSON.stringify(e), "color:#f700f0");
    if (window.qq !== undefined && window.qq.uma) {
      window.qq.uma.trackEvent(t, e);
    } else if (window.tt !== undefined && window.tt.uma) {
      window.tt.uma.trackEvent(t, e);
    } else if (window.wx !== undefined && window.wx.uma) {
      window.wx.uma.trackEvent(t, e);
    }
  };
  t.prototype.subEvent = function (t, e) {
    if (e === undefined) {
      e = null;
    }
    if (e == null) {
      e = " ";
    }
    var n = {
      value: e
    };
    if (window.jsb && window.jsb.reflection && window.jsb.reflection.callStaticMethod) {
      jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "sendMsg", "(Ljava/lang/String;Ljava/lang/String;)V", t, JSON.stringify(n));
    }
  };
  t.prototype.iOSCustomTrackerWithName = function (t, e) {
    var n = JSON.stringify(e);
    if (window.jsb && window.jsb.reflection && window.jsb.reflection.callStaticMethod) {
      jsb.reflection.callStaticMethod("AppController", "customTrackerWithName:andDictString:", t, n);
    }
  };
  t.prototype.loadHaiWaiFont = function () {
    if (!(i.default.instance.lan != "cn" && i.default.instance.lan != "tc" && i.default.instance.lan != "en")) {
      cc.assetManager.loadBundle("mfont", function (t, e) {
        if (t) {
          cc.error(t);
        } else if (e) {
          e.load("TTZhunCuYuanJ", cc.Font, function (t, e) {
            if (t) {
              console.error("Failed to load font:", t);
            } else {
              window.myGameFont = e;
            }
          });
        }
      });
    }
  };
  t.instance = null;
  return t;
}();
exports.default = a;