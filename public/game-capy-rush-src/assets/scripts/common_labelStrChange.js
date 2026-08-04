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
var r = require("./Language");
var s = cc._decorator;
var c = s.ccclass;
s.property;
var l = s.menu;
var u = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.currentValue = 1;
    e.elapsedTime = 0;
    e.isUpdating = false;
    e.label = null;
    e.startValue = 0;
    e.endValue = 0;
    e.duration = 0;
    e.format = "";
    return e;
  }
  i(e, t);
  e.prototype.start = function () {};
  e.prototype.startNumberChange = function (t, e, n, o, i) {
    this.label = this.node.getComponent(cc.Label);
    this.currentValue = t;
    this.startValue = t;
    this.endValue = e;
    this.duration = n;
    this.format = o;
    this.label.string = r.default.formatStr(this.format, t);
    this.elapsedTime = 0;
    if (i) {
      this.isUpdating = true;
    }
  };
  e.prototype.update = function (t) {
    if (this.isUpdating) {
      this.elapsedTime += t;
      if (this.elapsedTime >= this.duration) {
        this.currentValue = this.endValue;
        this.label.string = r.default.formatStr(this.format, this.currentValue);
        this.isUpdating = false;
      } else {
        var e = this.elapsedTime / this.duration;
        this.currentValue = Math.floor(this.startValue + (this.endValue - this.startValue) * e);
        this.label.string = r.default.formatStr(this.format, this.currentValue);
      }
    }
  };
  e.prototype.setStart = function () {
    this.isUpdating = true;
  };
  e.prototype.setStop = function () {
    this.isUpdating = false;
  };
  return a([c, l("ui/common_labelStrChange")], e);
}(cc.Component);
exports.default = u;