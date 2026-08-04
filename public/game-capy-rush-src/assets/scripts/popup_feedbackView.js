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
var l = require("./baseCompont");
var u = require("./MyAnimationTool");
var d = require("./myBtnClick");
var h = require("./statsCtl");
var p = require("./uiPathManage");
var f = cc._decorator;
var g = f.ccclass;
f.property;
var m = f.menu;
var y = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.bg = null;
    e._toggle1 = null;
    e._toggle2 = null;
    e._toggle3 = null;
    e._toggle4 = null;
    e._type = 1;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.bg = this.dict.bg;
  };
  e.prototype.start = function () {
    this._toggle1 = this.dict.toggle1.getComponent(cc.Toggle);
    this._toggle2 = this.dict.toggle2.getComponent(cc.Toggle);
    this._toggle3 = this.dict.toggle3.getComponent(cc.Toggle);
    this._toggle4 = this.dict.toggle4.getComponent(cc.Toggle);
    this._toggle1.uncheck();
    this._toggle2.uncheck();
    this._toggle3.uncheck();
    this._toggle4.uncheck();
  };
  e.prototype.onEnable = function () {
    u.MyAnimationTool.showViewAnimation(this.bg);
  };
  e.prototype.onDisable = function () {};
  e.prototype.initData = function () {
    return r(this, undefined, undefined, function () {
      return s(this, function () {
        return [2];
      });
    });
  };
  e.prototype.btnClick_close = function (t) {
    if (d.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      this.gotoClose();
    }
  };
  e.prototype.btnClick_ok = function (t) {
    if (d.default.instance.baseBtnClick(this.node.name + t.target.name, 0.1)) {
      if (this._toggle1.isChecked || this._toggle2.isChecked || this._toggle3.isChecked || this._toggle4.isChecked) {
        h.statsCtl.sendEventShuShu("Feedback", {
          fbtype: this._type,
          lvgrade: c.ManageCtl.gameData.game_lvgrade
        });
        c.ManageCtl.persistRootNode.showTipsUI("提交成功");
        this.gotoClose();
      } else {
        c.ManageCtl.persistRootNode.showTipsUI("请选择反馈类型");
      }
    }
  };
  e.prototype.gotoClose = function () {
    c.ManageCtl.uiManage.gotoDestroyUI(p.uiPath.uiName.popup_feedbackView);
  };
  e.prototype.toggleChange = function (t, e) {
    var n = parseInt(e);
    this._type = n;
    if (n == 1) {
      this._toggle1.check();
      this._toggle2.uncheck();
      this._toggle3.uncheck();
      this._toggle4.uncheck();
    } else if (n == 2) {
      this._toggle1.uncheck();
      this._toggle2.check();
      this._toggle3.uncheck();
      this._toggle4.uncheck();
    } else if (n == 3) {
      this._toggle1.uncheck();
      this._toggle2.uncheck();
      this._toggle3.check();
      this._toggle4.uncheck();
    } else if (n == 4) {
      this._toggle1.uncheck();
      this._toggle2.uncheck();
      this._toggle3.uncheck();
      this._toggle4.check();
    }
  };
  return a([g, m("ui/popup_feedbackView")], e);
}(l.default);
exports.default = y;