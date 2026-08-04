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
var m = require("./Intersection");
var n = cc._decorator;
var r = n.ccclass;
var a = n.property;
var s = n.menu;
var c = function (_) {
  function o() {
    var o = _ !== null && _.apply(this, arguments) || this;
    o.worldPoints = [cc.v2(-100, 0), cc.v2(0, 50), cc.v2(100, 0)];
    o.worldEdge = [];
    o._points = [cc.v2(-50, -50), cc.v2(50, -50), cc.v2(50, 50), cc.v2(-50, 50)];
    return o;
  }
  i(o, _);
  Object.defineProperty(o.prototype, "type", {
    get: function () {
      return f.ColliderType.Polygon;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(o.prototype, "points", {
    get: function () {
      return this._points;
    },
    set: function (_) {
      this._points = _;
    },
    enumerable: false,
    configurable: true
  });
  o.prototype.initCollider = function () {
    _.prototype.initCollider.call(this);
    this.isConvex = !m.Intersection.isConcavePolygon(this.points);
  };
  d([a({
    type: [cc.Vec2]
  })], o.prototype, "_points", undefined);
  d([a({
    type: [cc.Vec2]
  })], o.prototype, "points", null);
  return d([r, s("碰撞组件Ex/FPolygonCollider")], o);
}(f.default);
exports.default = c;