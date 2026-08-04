var t;
var i = this && this.__extends || (t = function (_, o) {
  return (t = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (_, o) {
    _.__proto__ = o;
  } || function (_, o) {
    for (var e in o) {
      if (Object.prototype.hasOwnProperty.call(o, e)) {
        _[e] = o[e];
      }
    }
  })(_, o);
}, function (_, o) {
  function e() {
    this.constructor = _;
  }
  t(_, o);
  _.prototype = o === null ? Object.create(o) : (e.prototype = o.prototype, new e());
});
var d = this && this.__decorate || function (_, o, e, t) {
  var i;
  var d = arguments.length;
  var f = d < 3 ? o : t === null ? t = Object.getOwnPropertyDescriptor(o, e) : t;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    f = Reflect.decorate(_, o, e, t);
  } else {
    for (var m = _.length - 1; m >= 0; m--) {
      if (i = _[m]) {
        f = (d < 3 ? i(f) : d > 3 ? i(o, e, f) : i(o, e)) || f;
      }
    }
  }
  if (d > 3 && f) {
    Object.defineProperty(o, e, f);
  }
  return f;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var f = require("./FCollider");
var m = cc._decorator;
var n = m.ccclass;
var r = m.property;
var a = m.menu;
var s = function (_) {
  function o() {
    var o = _ !== null && _.apply(this, arguments) || this;
    o.worldPoints = [cc.v2(), cc.v2(), cc.v2(), cc.v2()];
    o.worldEdge = [];
    o.isConvex = true;
    o._size = cc.size(100, 100);
    return o;
  }
  i(o, _);
  Object.defineProperty(o.prototype, "type", {
    get: function () {
      return f.ColliderType.Box;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(o.prototype, "size", {
    get: function () {
      return this._size;
    },
    set: function (_) {
      this._size.width = _.width < 0 ? 0 : _.width;
      this._size.height = _.height < 0 ? 0 : _.height;
    },
    enumerable: false,
    configurable: true
  });
  d([r(cc.Size)], o.prototype, "_size", undefined);
  d([r], o.prototype, "size", null);
  return d([n, a("碰撞组件Ex/FBoxCollider")], o);
}(f.default);
exports.default = s;