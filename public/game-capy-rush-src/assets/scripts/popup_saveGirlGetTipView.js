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
var h = require("./MyTool");
var p = require("./myBtnClick");
var f = require("./uiPathManage");
var g = require("./myJsonCtl");
var m = cc._decorator;
var y = m.ccclass;
m.property;
var _ = m.menu;
var v = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.bg = null;
    e._lv = 1;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.bg = this.dict.bg;
  };
  e.prototype.onDestroy = function () {};
  e.prototype.onEnable = function () {
    d.MyAnimationTool.showViewAnimation(this.bg);
  };
  e.prototype.onDisable = function () {};
  e.prototype.initData = function (t) {
    return r(this, undefined, undefined, function () {
      var e;
      var n;
      var o;
      return s(this, function () {
        this._lv = t.lv;
        if (!this.dict) {
          this.loadNodeTree();
        }
        e = this.dict.imgIcon.getComponent(cc.Sprite);
        n = "/texture/f29086/f29086_img300" + (11 + this._lv);
        e.node.mReloImgFalg = true;
        h.MyTool.loadImg(n, e);
        o = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
        this.dict.lbTip.getComponent(cc.Label).string = "通关获得生肖" + o[this._lv - 1] + "卡片！";
        return [2];
      });
    });
  };
  e.prototype.btnClick_cancel = function (t) {
    if (p.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      this.gotoClose();
    }
  };
  e.prototype.btnClick_play = function (t) {
    return r(this, undefined, undefined, function () {
      var e;
      var n;
      return s(this, function (o) {
        switch (o.label) {
          case 0:
            if (p.default.instance.baseBtnClick(this.node.name + t.target.name)) {
              c.ManageCtl.gameData.setCurModeId(5);
              return [4, g.myJsonCtl.getJson(c.ManageCtl.getModeNameByModeId(5))];
            } else {
              return [2];
            }
          case 1:
            n = o.sent();
            c.ManageCtl.gameData.setCurLevelId(this._lv);
            e = n[this._lv].LevelId1;
            c.ManageCtl.gameData.setCurDevId(e);
            c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.showGameView);
            this.gotoClose();
            return [2];
        }
      });
    });
  };
  e.prototype.gotoClose = function () {
    c.ManageCtl.uiManage.hideUI(f.uiPath.uiName.popup_saveGirlGetTipView);
  };
  return a([y, _("ui/popup_saveGirlGetTipView")], e);
}(u.default);
exports.default = v;