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
var l = require("./SdkConfig");
var u = require("./baseCompont");
var d = require("./MyTool");
var h = require("./myBtnClick");
var p = require("./jsonConfig");
var f = require("./myJsonCtl");
var g = cc._decorator;
var m = g.ccclass;
var y = g.property;
var _ = g.menu;
var v = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.mlocation = l.MyConstans.openLocation.main;
    e._lvBoxAwardBg = null;
    e._curInfo = {};
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this._lvBoxAwardBg = this.dict.lvBoxAwardBg;
    this._lvBoxAwardBg.active = false;
    c.ManageCtl.myMsgCtl.on(l.MyConstans.msg.gameNextLevel, this.ongameNextLevel, this);
    c.ManageCtl.myMsgCtl.on(l.MyConstans.msg.updateLevelBoxInfo, this.onupdateLevelBoxInfo, this);
  };
  e.prototype.onDestroy = function () {
    c.ManageCtl.myMsgCtl.off(l.MyConstans.msg.gameNextLevel, this.ongameNextLevel, this);
    c.ManageCtl.myMsgCtl.off(l.MyConstans.msg.updateLevelBoxInfo, this.onupdateLevelBoxInfo, this);
  };
  e.prototype.start = function () {
    return r(this, undefined, undefined, function () {
      return s(this, function () {
        this.initData2();
        return [2];
      });
    });
  };
  e.prototype.initData2 = function () {
    return r(this, undefined, undefined, function () {
      var t;
      var e;
      var n;
      var o;
      var i;
      var a;
      var r;
      var u;
      var h;
      var g;
      var m;
      var y;
      var _;
      var v;
      var C;
      var w;
      var b;
      var M;
      var k;
      var I;
      var S;
      var P;
      return s(this, function (s) {
        switch (s.label) {
          case 0:
            if (this.mlocation != l.MyConstans.openLocation.game && this.mlocation != l.MyConstans.openLocation.win || c.ManageCtl.gameData.getCurModeId() == 1) {
              t = c.ManageCtl.gameData.getCurPassLevelId();
              e = t + 1;
              return [4, f.myJsonCtl.getJson(p.jsonName.levelBox)];
            } else {
              this.node.active = false;
              return [2];
            }
          case 1:
            n = s.sent();
            o = -1;
            i = -1;
            for (a in n) {
              r = n[a];
              if (this.mlocation == l.MyConstans.openLocation.win && r.lv && t == r.lv) {
                this.node.active = false;
                c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.showGetLevelBoxAward, {
                  levelBoxKey: a
                });
                return [2];
              }
              if (r.lv && e <= r.lv) {
                o = Number(a);
                break;
              }
              i = Number(a);
            }
            if (-1 == o && (o = i, this.mlocation == l.MyConstans.openLocation.win && t % 5 == 0)) {
              this.node.active = false;
              c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.showGetLevelBoxAward, {
                levelBoxKey: o.toString()
              });
              return [2];
            }
            this._curInfo = n[o];
            console.log("## this._curInfo ", JSON.stringify(this._curInfo));
            u = t % 5 / 5;
            h = this.dict.imgProLevelBox.getComponent(cc.Sprite);
            g = this.dict.lbProLevelBox.getComponent(cc.Label);
            h.fillRange = u;
            g.string = t % 5 + "/5";
            if (m = this.dict.proArrNode) {
              y = ["1", "2", "3", "4", "5"];
              w = 0;
              y = ["1", "2", "3", "4", "5"];
              w = 0;
              for (; w < y.length; w++) {
                _ = y[w];
                if (Number(_) <= t % 5) {
                  m.getChildByName(_).active = true;
                } else {
                  m.getChildByName(_).active = false;
                }
              }
            }
            this._lvBoxAwardBg.children.forEach(function (t) {
              t.active = false;
            });
            v = ["remove", "addHole", "tip", "mahjong", "shuffle", "gold"];
            C = null;
            w = 0;
            for (; w < v.length; w++) {
              b = v[w];
              if (this._curInfo[b]) {
                (C = this._lvBoxAwardBg.getChildByName(b)).active = true;
                C.getChildByName("lbCount").getComponent(cc.Label).string = "x" + this._curInfo[b];
              }
            }
            if (this._curInfo.skinId) {
              M = this._curInfo.skinId;
              return [4, f.myJsonCtl.getJsonInfoByKey(p.jsonName.skin, M)];
            } else {
              return [3, 3];
            }
          case 2:
            if ((k = s.sent()).smallName) {
              (I = this._lvBoxAwardBg.getChildByName("skinNode")).active = true;
              S = I.getChildByName("iconSkin").getComponent(cc.Sprite);
              P = k.smallName;
              S.node.mReloImgFalg = true;
              S.node.mLoadName = P;
              d.MyTool.loadImgByName("/skin/", P, S, "local3");
            }
            s.label = 3;
          case 3:
            return [2];
        }
      });
    });
  };
  e.prototype.btnClick_click = function (t) {
    var e = this;
    if (h.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      if (this._lvBoxAwardBg.active) {
        this._lvBoxAwardBg.stopAllActions();
        return void cc.tween(this._lvBoxAwardBg).to(0.2, {
          scale: 0
        }).call(function () {
          e._lvBoxAwardBg.active = false;
        }).start();
      }
      this._lvBoxAwardBg.active = true;
      this._lvBoxAwardBg.stopAllActions();
      this._lvBoxAwardBg.scale = 0;
      cc.tween(this._lvBoxAwardBg).to(0.2, {
        scale: 1
      }).delay(3).to(0.2, {
        scale: 0
      }).call(function () {
        e._lvBoxAwardBg.active = false;
      }).start();
    }
  };
  e.prototype.ongameNextLevel = function () {
    this.initData2();
  };
  e.prototype.onupdateLevelBoxInfo = function () {
    this.initData2();
  };
  a([y({
    type: cc.Enum(l.MyConstans.openLocation),
    displayName: "所在位置"
  })], e.prototype, "mlocation", undefined);
  return a([m, _("ui/common_levelBoxNode")], e);
}(u.default);
exports.default = v;