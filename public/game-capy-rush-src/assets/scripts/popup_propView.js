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
var d = require("./MyAnimationTool");
var h = require("./myBtnClick");
var p = require("./statsCtl");
var f = require("./uiPathManage");
var g = require("./jsonConfig");
var m = require("./myJsonCtl");
var y = cc._decorator;
var _ = y.ccclass;
y.property;
var v = y.menu;
var C = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.bg = null;
    e._propId = null;
    e._callback = null;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.bg = this.dict.bg;
  };
  e.prototype.onEnable = function () {
    d.MyAnimationTool.showViewAnimation(this.bg);
  };
  e.prototype.onDisable = function () {};
  e.prototype.initData = function (t) {
    return r(this, undefined, undefined, function () {
      var e;
      var n;
      var o;
      var i;
      var a;
      var r;
      var u;
      return s(this, function (s) {
        switch (s.label) {
          case 0:
            this._propId = t.propId;
            this._callback = t.callback;
            if (!this.dict) {
              this.loadNodeTree();
            }
            e = this.dict.iconVideo;
            n = this.dict.numNode;
            o = this.dict.lbNum.getComponent(cc.Label);
            switch (this._propId) {
              case l.MyConstans.propId.bomb:
                this.dict.icon_bomb.active = true;
                this.dict.icon_remove.active = false;
                this.dict.icon_flip.active = false;
                i = c.ManageCtl.gameData.getDayPropCountById(l.MyConstans.propId.bomb) + c.ManageCtl.gameData.removeTemporaryCount;
                n.active = i > 0;
                o.string = i > 99 ? "99+" : i.toString();
                break;
              case l.MyConstans.propId.remove:
                this.dict.icon_bomb.active = false;
                this.dict.icon_remove.active = true;
                this.dict.icon_flip.active = false;
                a = c.ManageCtl.gameData.getDayPropCountById(l.MyConstans.propId.remove) + c.ManageCtl.gameData.clearTemporaryCount;
                n.active = a > 0;
                o.string = a > 99 ? "99+" : a.toString();
                break;
              case l.MyConstans.propId.flip:
                this.dict.icon_bomb.active = false;
                this.dict.icon_remove.active = false;
                this.dict.icon_flip.active = true;
                r = c.ManageCtl.gameData.getDayPropCountById(l.MyConstans.propId.flip);
                n.active = r > 0;
                o.string = r > 99 ? "99+" : r.toString();
            }
            e.active = !n.active;
            return [4, m.myJsonCtl.getJsonInfoByKey(g.jsonName.goods, this._propId)];
          case 1:
            u = s.sent();
            this.dict.lbTitle.getComponent(cc.Label).string = u.boxName;
            this.dict.lbText.getComponent(cc.Label).string = u.ads;
            return [2];
        }
      });
    });
  };
  e.prototype.btnClick_close = function (t) {
    if (h.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      this.gotoClose();
    }
  };
  e.prototype.gotoClose = function () {
    c.ManageCtl.uiManage.gotoDestroyUI(f.uiPath.uiName.popup_propView);
  };
  e.prototype.btnClick_use = function (t) {
    var e = this;
    if (h.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      if (this.dict.numNode.active) {
        switch (this._propId) {
          case l.MyConstans.propId.bomb:
            c.ManageCtl.gameData.addDayPropById(l.MyConstans.propId.bomb, -1);
            break;
          case l.MyConstans.propId.remove:
            c.ManageCtl.gameData.addDayPropById(l.MyConstans.propId.remove, -1);
            break;
          case l.MyConstans.propId.flip:
            c.ManageCtl.gameData.addDayPropById(l.MyConstans.propId.flip, -1);
        }
        if (this._callback) {
          this._callback();
        }
        this.gotoClose();
        return void c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.sendUsePropShushu);
      }
      c.ManageCtl.playVideo(function () {
        var t = c.ManageCtl.gameData.getCurModeId();
        var n = c.ManageCtl.gameData.getCurDevId();
        var o = c.ManageCtl.gameData.getCurLevelId();
        switch (e._propId) {
          case l.MyConstans.propId.bomb:
            p.statsCtl.sendEventShuShu("reward_btn", {
              mode: t,
              devid: n,
              lv: o,
              progress: c.ManageCtl.gameData.getGameProgress(),
              scene: "bomb",
              lvgrade: c.ManageCtl.gameData.game_lvgrade
            });
            break;
          case l.MyConstans.propId.remove:
            p.statsCtl.sendEventShuShu("reward_btn", {
              mode: t,
              devid: n,
              lv: o,
              progress: c.ManageCtl.gameData.getGameProgress(),
              scene: "remove",
              lvgrade: c.ManageCtl.gameData.game_lvgrade
            });
            break;
          case l.MyConstans.propId.flip:
            p.statsCtl.sendEventShuShu("reward_btn", {
              mode: t,
              devid: n,
              lv: o,
              progress: c.ManageCtl.gameData.getGameProgress(),
              scene: "reverse",
              lvgrade: c.ManageCtl.gameData.game_lvgrade
            });
        }
        if (e._callback) {
          e._callback();
        }
        e.gotoClose();
        c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.sendUsePropShushu);
      });
    }
  };
  return a([_, v("ui/popup_propView")], e);
}(u.default);
exports.default = C;