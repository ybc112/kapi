var o;
var i = this && this.__extends || (o = function (t, e) {
  return (o = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (t, e) {
    t.__proto__ = e;
  } || function (t, e) {
    for (var n in e) {
      if (Object.prototype.hasOwnProperty.call(e, n)) {
        t[n] = e[n];
      }
    }
  })(t, e);
}, function (t, e) {
  function n() {
    this.constructor = t;
  }
  o(t, e);
  t.prototype = e === null ? Object.create(e) : (n.prototype = e.prototype, new n());
});
var a = this && this.__decorate || function (t, e, n, o) {
  var i;
  var a = arguments.length;
  var r = a < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, n) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, n, o);
  } else {
    for (var s = t.length - 1; s >= 0; s--) {
      if (i = t[s]) {
        r = (a < 3 ? i(r) : a > 3 ? i(e, n, r) : i(e, n)) || r;
      }
    }
  }
  if (a > 3 && r) {
    Object.defineProperty(e, n, r);
  }
  return r;
};
var r = this && this.__awaiter || function (t, e, n, o) {
  return new (n || (n = Promise))(function (i, a) {
    function r(t) {
      try {
        c(o.next(t));
      } catch (e) {
        a(e);
      }
    }
    function s(t) {
      try {
        c(o.throw(t));
      } catch (e) {
        a(e);
      }
    }
    function c(t) {
      var e;
      if (t.done) {
        i(t.value);
      } else {
        (e = t.value, e instanceof n ? e : new n(function (t) {
          t(e);
        })).then(r, s);
      }
    }
    c((o = o.apply(t, e || [])).next());
  });
};
var s = this && this.__generator || function (t, e) {
  var n;
  var o;
  var i;
  var a;
  var r = {
    label: 0,
    sent: function () {
      if (1 & i[0]) {
        throw i[1];
      }
      return i[1];
    },
    trys: [],
    ops: []
  };
  a = {
    next: s(0),
    throw: s(1),
    return: s(2)
  };
  if (typeof Symbol == "function") {
    a[Symbol.iterator] = function () {
      return this;
    };
  }
  return a;
  function s(t) {
    return function (e) {
      return c([t, e]);
    };
  }
  function c(a) {
    if (n) {
      throw new TypeError("Generator is already executing.");
    }
    for (; r;) {
      try {
        n = 1;
        if (o && (i = 2 & a[0] ? o.return : a[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, a[1])).done) {
          return i;
        }
        o = 0;
        if (i) {
          a = [2 & a[0], i.value];
        }
        switch (a[0]) {
          case 0:
          case 1:
            i = a;
            break;
          case 4:
            r.label++;
            return {
              value: a[1],
              done: false
            };
          case 5:
            r.label++;
            o = a[1];
            a = [0];
            continue;
          case 7:
            a = r.ops.pop();
            r.trys.pop();
            continue;
          default:
            if (!(i = (i = r.trys).length > 0 && i[i.length - 1]) && (a[0] === 6 || a[0] === 2)) {
              r = 0;
              continue;
            }
            if (a[0] === 3 && (!i || a[1] > i[0] && a[1] < i[3])) {
              r.label = a[1];
              break;
            }
            if (a[0] === 6 && r.label < i[1]) {
              r.label = i[1];
              i = a;
              break;
            }
            if (i && r.label < i[2]) {
              r.label = i[2];
              r.ops.push(a);
              break;
            }
            if (i[2]) {
              r.ops.pop();
            }
            r.trys.pop();
            continue;
        }
        a = e.call(t, r);
      } catch (s) {
        a = [6, s];
        o = 0;
      } finally {
        n = i = 0;
      }
    }
    if (5 & a[0]) {
      throw a[1];
    }
    return {
      value: a[0] ? a[1] : undefined,
      done: true
    };
  }
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var c = require("./ManageCtl");
var l = require("./MyLoadSubAssetsCtl");
var u = require("./MyPlatform");
var d = require("./SdkConfig");
var h = require("./baseCompont");
var p = require("./HuaWeiLoginCtl");
var f = require("./Language");
var g = require("./myCheckToken");
var m = require("./myWXCheckToken");
var y = require("./statsCtl");
var _ = require("./uiPathManage");
var v = require("./gameData");
var C = cc._decorator;
var w = C.ccclass;
C.property;
var b = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.onLoadDoneFalg = false;
    e.startDoneFalg = false;
    e.showPrivacyViewFlag = false;
    e._loadScene = false;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    return r(this, undefined, undefined, function () {
      var e;
      var n;
      return s(this, function () {
        t.prototype.onLoad.call(this);
        window.ywkjTT_openidStr = "null";
        f.default.instance.init();
        window.m_Language = f.default;
        window.splashCustomPlatform = d.MyConstans.getCustomPlatform();
        this.dict.ageNode.active = false;
        this.dict.lbHealth.active = false;
        this.dict.lbAuthor.active = false;
        this.dict.lbFiling.active = false;
        this.screenAdaptation();
        c.ManageCtl.init();
        l.default.GetInstance().loadSubAssets();
        e = c.ManageCtl.gameData.getOpenGameCount();
        n = e <= 1;
        y.statsCtl.sendEventShuShu("user_Login", {
          IsNew: n,
          OpenNum: e,
          PlayDays: c.ManageCtl.gameData.getLoginDay()
        });
        c.ManageCtl.bmsCtl.requestConfig(function () {});
        c.ManageCtl.bmsCtl.requestShare();
        this.onLoadDoneFalg = true;
        return [2];
      });
    });
  };
  e.prototype.start = function () {
    var t = this;
    if (!(d.MyConstans.getCustomPlatform() != d.MyConstans.PLATFORM.H5_NO_ADS && d.MyConstans.getCustomPlatform() != d.MyConstans.PLATFORM.H5_NO_ADS_fdttt && d.MyConstans.getCustomPlatform() != d.MyConstans.PLATFORM.H5_NO_ADS_tt && d.MyConstans.getCustomPlatform() != d.MyConstans.PLATFORM.H5_NO_ADS_tt_dpxx && d.MyConstans.getCustomPlatform() != d.MyConstans.PLATFORM.H5_NO_ADS_AUTO && d.MyConstans.getCustomPlatform() != d.MyConstans.PLATFORM.H5_NO_ADS_ndxld && d.MyConstans.getCustomPlatform() != d.MyConstans.PLATFORM.H5_NO_ADS_kdmnq)) {
      console.log = function () {};
      console.warn = function () {};
      console.error = function () {};
      cc.log = function () {};
      g.default.GetInstance().init();
    }
    if (!(d.MyConstans.getCustomPlatform() != d.MyConstans.PLATFORM.WX && d.MyConstans.getCustomPlatform() != d.MyConstans.PLATFORM.WX_xmdel)) {
      m.default.GetInstance().init();
    }
    var e = u.default.ShowHealth;
    var n = u.default.ShowAge;
    var o = u.default.AuthorStr;
    var i = u.default.FilingStr;
    this.dict.lbAuthor.active = true;
    this.dict.lbFiling.active = true;
    this.dict.lbHealth.active = e;
    this.dict.ageNode.active = n;
    this.dict.lbAuthor.getComponent(cc.Label).string = o;
    this.dict.lbFiling.getComponent(cc.Label).string = i;
    this.beforLoadLevelPrefab();
    this.beforLoadUIPrefab();
    if (cc.sys.platform === cc.sys.OPPO_GAME || window.qq || cc.sys.platform === cc.sys.VIVO_GAME || d.MyConstans.getCustomPlatform() == d.MyConstans.PLATFORM.VIVO || d.MyConstans.getCustomPlatform() == d.MyConstans.PLATFORM.OPPO) {
      if (cc.sys.localStorage.getItem("privacypolicy") != 1) {
        this.showLoadAnimation(2);
        this.showPrivacyViewFlag = true;
        this.showPrivacyPolicyView();
      } else {
        this.showLoadAnimation(2);
        this.scheduleOnce(function () {
          t.showPrivacyViewFlag = false;
        }, 2);
      }
    } else {
      this.showLoadAnimation(2);
    }
  };
  e.prototype.showLoadAnimation = function (t) {
    var e = this;
    var n = this.dict.imgPro2.getComponent(cc.Sprite);
    n.fillRange = 0;
    cc.tween(n).to(t, {
      fillRange: 1
    }).call(function () {
      e.startDoneFalg = true;
    }).start();
    var o = this.dict.proIcon;
    cc.tween(o).to(t, {
      x: 282
    }).start();
  };
  e.prototype.screenAdaptation = function () {
    if (cc.view.getFrameSize().height / cc.view.getFrameSize().width > 1.6) {
      cc.Canvas.instance.fitWidth = true;
      cc.Canvas.instance.fitHeight = false;
    } else {
      cc.Canvas.instance.fitHeight = true;
      cc.Canvas.instance.fitWidth = false;
    }
  };
  e.prototype.update = function () {
    if (this.onLoadDoneFalg && this.startDoneFalg && !this.showPrivacyViewFlag && v.default.GetInstance().loadDataDoneFlag) {
      this.gotoMainScene();
    }
  };
  e.prototype.gotoMainScene = function () {
    if (!this._loadScene) {
      this._loadScene = true;
      console.log("## mainScene");
      cc.director.loadScene("mainScene");
    }
  };
  e.prototype.beforLoadLevelPrefab = function () {
    var t = this;
    cc.assetManager.loadBundle("level", function (e, n) {
      if (!e) {
        t.loadLevelPrefab2(n);
      }
    });
  };
  e.prototype.loadLevelPrefab2 = function (t) {
    var e = this;
    t.load("prefab/level/zqddn_zhb_level-31405", function (t, n) {
      if (!t) {
        console.log("## 预加载完成");
        window.game_musicOpen = 0;
        window.game_audioOpen = 0;
        var o = cc.instantiate(n);
        o.opacity = 0;
        o.scale = 0;
        e.node.addChild(o);
      }
    });
  };
  e.prototype.showPrivacyPolicyView = function () {
    var t = this;
    c.ManageCtl.uiManage.showUI(_.uiPath.uiName.popup_privacyPolicyView, this.node, {
      showContentFlag: true,
      acceptCallback: function () {
        if (d.MyConstans.getCustomPlatform() == d.MyConstans.PLATFORM.HUAWEI) {
          p.default.GetInstance().login();
        } else {
          t.scheduleOnce(function () {
            t.showPrivacyViewFlag = false;
          }, 0.3);
        }
      }
    });
  };
  e.prototype.showPrivacyPolicyView2 = function () {};
  e.prototype.getServerTime = function () {};
  e.prototype.httpRequest = function (t, e, n, o, i, a) {
    if (n === undefined) {
      n = function () {};
    }
    if (o === undefined) {
      o = false;
    }
    if (i === undefined) {
      i = "POST";
    }
    if (a === undefined) {
      a = false;
    }
    this.Get(t, e, n);
  };
  e.prototype.Get = function (t, e, n) {
    t += "?";
    var o = "";
    for (var i in e) {
      o += i + "=" + e[i] + "&";
    }
    var a = new XMLHttpRequest();
    a.onreadystatechange = function () {
      if (a.readyState == 4) {
        if (a.status >= 200 && a.status < 400) {
          var t = a.responseText;
          if (t) {
            var e = JSON.parse(t);
            n({
              data: e
            });
          } else {
            n(false);
          }
        } else {
          n(false);
        }
      } else {
        n(false);
      }
    };
    a.open("GET", t + o, true);
    a.send();
  };
  e.prototype.beforLoadUIPrefab = function () {
    var t = this;
    cc.assetManager.loadBundle("local", function (e, n) {
      if (!e) {
        t.loadUIPrefab2(n);
      }
    });
  };
  e.prototype.loadUIPrefab2 = function (t) {
    for (var e = ["mainView", "gameView"], n = 0; n < e.length; n++) {
      var o = "prefab/" + e[n];
      t.load(o, function (t) {
        if (!t) {
          console.log("## 预加载完成");
        }
      });
    }
  };
  return a([w], e);
}(h.default);
exports.default = b;