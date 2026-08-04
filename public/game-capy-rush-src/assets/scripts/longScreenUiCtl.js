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
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r = cc._decorator;
var s = r.ccclass;
var c = r.property;
var l = r.menu;
var u = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.widget = null;
    e.longScreenTop = 0;
    e.longScreenBottom = 0;
    e.longScreenLeft = 0;
    e.longScreenRight = 0;
    return e;
  }
  i(e, t);
  e.prototype.start = function () {
    if (this.isLongScreen() && this.widget) {
      if (this.widget.isAlignTop) {
        this.widget.top = this.longScreenTop;
      }
      if (this.widget.isAlignBottom) {
        this.widget.bottom = this.longScreenBottom;
      }
      if (this.widget.isAlignLeft) {
        this.widget.left = this.longScreenLeft;
      }
      if (this.widget.isAlignRight) {
        this.widget.right = this.longScreenRight;
      }
      this.widget.updateAlignment();
    }
  };
  e.prototype.isLongScreen = function () {
    return cc.winSize.height / cc.winSize.width - 16 / 9 > 0.1;
  };
  a([c(cc.Widget)], e.prototype, "widget", undefined);
  a([c({
    tooltip: "非16:9尺寸TOP",
    visible: function () {
      return this.widget && this.widget.isAlignTop;
    }
  })], e.prototype, "longScreenTop", undefined);
  a([c({
    tooltip: "非16:9尺寸BOTTOM",
    visible: function () {
      return this.widget && this.widget.isAlignBottom;
    }
  })], e.prototype, "longScreenBottom", undefined);
  a([c({
    tooltip: "非16:9尺寸LEFT",
    visible: function () {
      return this.widget && this.widget.isAlignLeft;
    }
  })], e.prototype, "longScreenLeft", undefined);
  a([c({
    tooltip: "非16:9尺寸RIGHT",
    visible: function () {
      return this.widget && this.widget.isAlignRight;
    }
  })], e.prototype, "longScreenRight", undefined);
  return a([s, l("util/longScreenUiCtl")], e);
}(cc.Component);
exports.default = u;