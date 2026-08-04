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
var u = require("./MyTool");
var d = require("./myBtnClick");
var h = cc._decorator;
var p = h.ccclass;
var f = h.property;
var g = h.menu;
var m = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.lbLevelName = null;
    e.imgLvIcon = null;
    e.lockNode = null;
    e.doneNode = null;
    e.hotNode = null;
    e.newNode = null;
    e.terrorNode = null;
    e._devLv = -1;
    e._index = 1;
    e._unlockFlag = false;
    return e;
  }
  i(e, t);
  e.prototype.onRefresh = function (t, e) {
    this._devLv = t;
    this._index = e + 1;
    if (this._devLv) {
      this.initData();
    }
  };
  e.prototype.initData = function () {
    return r(this, undefined, undefined, function () {
      var t;
      var e;
      return s(this, function () {
        t = c.ManageCtl.gameData.getLevelInfoByDevLv(this._devLv);
        this.lbLevelName.string = t.title;
        e = "/levelIcon/" + this._devLv;
        this.imgLvIcon.node.mReloImgFalg = true;
        u.MyTool.loadImg(e, this.imgLvIcon);
        this.updateState();
        return [2];
      });
    });
  };
  e.prototype.updateState = function () {
    var t = c.ManageCtl.gameData.checkDevLvIsUnlock(this._devLv);
    if (this._index == 1) {
      t = true;
    }
    var e = c.ManageCtl.gameData.getCurModeId();
    if (-1 != c.ManageCtl.gameData.getUnlockAllInfo(e).unlockTime) {
      t = true;
    }
    this._unlockFlag = t;
    if (t) {
      this.lockNode.opacity = 0;
      var n = c.ManageCtl.gameData.checkDevLvIsPass(this._devLv);
      this.doneNode.opacity = n ? 255 : 0;
    } else {
      this.lockNode.opacity = 255;
      this.doneNode.opacity = 0;
    }
  };
  e.prototype.btnClick_click = function (t) {
    if (d.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.clickLevelItem, this._devLv, this._index, this._unlockFlag);
    }
  };
  a([f(cc.Label)], e.prototype, "lbLevelName", undefined);
  a([f(cc.Sprite)], e.prototype, "imgLvIcon", undefined);
  a([f(cc.Node)], e.prototype, "lockNode", undefined);
  a([f(cc.Node)], e.prototype, "doneNode", undefined);
  a([f(cc.Node)], e.prototype, "hotNode", undefined);
  a([f(cc.Node)], e.prototype, "newNode", undefined);
  a([f(cc.Node)], e.prototype, "terrorNode", undefined);
  return a([p, g("ui/levelView_levelItemNode")], e);
}(cc.Component);
exports.default = m;