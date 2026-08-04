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
var d = require("./Language");
var h = require("./MyAnimationTool");
var p = require("./MyTool");
var f = require("./myBtnClick");
var g = require("./statsCtl");
var m = require("./uiPathManage");
var y = require("./jsonConfig");
var _ = require("./myJsonCtl");
var v = cc._decorator;
var C = v.ccclass;
v.property;
var w = v.menu;
var b = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e._bg = null;
    e._getInfo = {};
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this._bg = this.dict.bg;
  };
  e.prototype.onDestroy = function () {};
  e.prototype.start = function () {};
  e.prototype.onEnable = function () {
    var t = this;
    this._bg.scale = 0;
    this.scheduleOnce(function () {
      h.MyAnimationTool.showViewAnimation(t._bg);
      t.initData2();
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
      return s(this, function (r) {
        switch (r.label) {
          case 0:
            return [4, _.myJsonCtl.getJson(y.jsonName.loginBag)];
          case 1:
            t = r.sent();
            e = [];
            for (n in t) {
              e.push(n);
            }
            if (e.length <= 0) {
              return [2];
            } else {
              o = c.ManageCtl.gameData.getLoginPackInfo();
              i = p.MyTool.myRandom(0, e.length - 1);
              if (-1 != o.index) {
                if ((i = o.index) >= e.length) {
                  i = p.MyTool.myRandom(0, e.length - 1);
                  c.ManageCtl.gameData.setLoginPackIndex(i);
                }
              } else {
                c.ManageCtl.gameData.setLoginPackIndex(i);
              }
              a = t[e[i]];
              this.dict.layoutNode.children.forEach(function (t) {
                t.active = false;
              });
              if (a.remove) {
                this.dict.remove.active = true;
                this.dict.remove.getChildByName("lbCount").getComponent(cc.Label).string = d.default.formatStr("移除 x %d", a.remove);
                this._getInfo[l.MyConstans.propId.remove] = a.remove;
              }
              if (a.addHole) {
                this.dict.addHole.active = true;
                this.dict.addHole.getChildByName("lbCount").getComponent(cc.Label).string = d.default.formatStr("加孔 x %d", a.addHole);
                this._getInfo[l.MyConstans.propId.addHole] = a.addHole;
              }
              if (a.tip) {
                this.dict.tip.active = true;
                this.dict.tip.getChildByName("lbCount").getComponent(cc.Label).string = d.default.formatStr("提示 x %d", a.tip);
                this._getInfo[l.MyConstans.propId.tip] = a.tip;
              }
              if (a.mahjong) {
                this.dict.mahjong.active = true;
                this.dict.mahjong.getChildByName("lbCount").getComponent(cc.Label).string = d.default.formatStr("麻将槽 x %d", a.mahjong);
                this._getInfo[l.MyConstans.propId.mahjong] = a.mahjong;
              }
              if (a.shuffle) {
                this.dict.shuffle.active = true;
                this.dict.shuffle.getChildByName("lbCount").getComponent(cc.Label).string = d.default.formatStr("洗牌 x %d", a.shuffle);
                this._getInfo[l.MyConstans.propId.shuffle] = a.shuffle;
              }
              return [2];
            }
        }
      });
    });
  };
  e.prototype.btnClick_cancel = function (t) {
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      this.gotoClose();
    }
  };
  e.prototype.btnClick_get = function (t) {
    var e = this;
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      c.ManageCtl.playVideo(function () {
        var t = c.ManageCtl.gameData.getCurModeId();
        var n = c.ManageCtl.gameData.getCurDevId();
        var o = c.ManageCtl.gameData.getCurLevelId();
        g.statsCtl.sendEventShuShu("reward_btn", {
          mode: t,
          devid: n,
          lv: o,
          progress: c.ManageCtl.gameData.getGameProgress(),
          scene: "dailygift",
          lvgrade: c.ManageCtl.gameData.game_lvgrade
        });
        var i = [];
        var a = "恭喜获得";
        for (var r in e._getInfo) {
          var s = Number(r);
          if (e._getInfo[s]) {
            var u = e._getInfo[s];
            i.push([s, u]);
            switch (s) {
              case l.MyConstans.propId.remove:
                a += " 移出x" + u;
                break;
              case l.MyConstans.propId.addHole:
                a += " 加孔x" + u;
                break;
              case l.MyConstans.propId.tip:
                a += " 提示x" + u;
                break;
              case l.MyConstans.propId.mahjong:
                a += " 麻将槽x" + u;
                break;
              case l.MyConstans.propId.shuffle:
                a += " 洗牌x" + u;
            }
          }
        }
        c.ManageCtl.gameData.setLoginPackDone();
        c.ManageCtl.gameData.addDayPropByIdArr(i);
        c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.updatePropCount);
        c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.getLoginPackDone);
        c.ManageCtl.persistRootNode.showTipsUI(a);
        e.gotoClose();
      });
    }
  };
  e.prototype.gotoClose = function () {
    c.ManageCtl.uiManage.hideUI(m.uiPath.uiName.popup_loginPackView);
  };
  return a([C, w("ui/popup_loginPackView")], e);
}(u.default);
exports.default = b;