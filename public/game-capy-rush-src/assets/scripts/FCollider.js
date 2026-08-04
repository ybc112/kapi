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
exports.StateType = exports.ColliderType = undefined;
var f;
var m = require("./FColliderManager");
var n = cc._decorator;
var r = n.ccclass;
var a = n.property;
(function (_) {
  _[_.Circle = 0] = "Circle";
  _[_.Box = 1] = "Box";
  _[_.Polygon = 2] = "Polygon";
})(f = exports.ColliderType || (exports.ColliderType = {}));
(function (_) {
  _[_.IsTest = 1] = "IsTest";
  _[_.NoTest = 2] = "NoTest";
})(exports.StateType || (exports.StateType = {}));
var s = function (_) {
  function o() {
    var o = _ !== null && _.apply(this, arguments) || this;
    o.isConvex = true;
    o.aabb = cc.rect();
    o.tag = 0;
    o.colliderId = 0;
    o.contactMap = new Map();
    o._offset = cc.v2();
    return o;
  }
  var e;
  i(o, _);
  e = o;
  Object.defineProperty(o.prototype, "type", {
    get: function () {
      return f.Box;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(o.prototype, "x", {
    get: function () {
      return this.aabb.x;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(o.prototype, "y", {
    get: function () {
      return this.aabb.y;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(o.prototype, "width", {
    get: function () {
      return this.aabb.width;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(o.prototype, "height", {
    get: function () {
      return this.aabb.height;
    },
    enumerable: false,
    configurable: true
  });
  o.prototype.initCollider = function () {
    this.colliderId = e._baseId++;
    if (e._baseId > 50000000000) {
      e._baseId = 1;
    }
  };
  Object.defineProperty(o.prototype, "offset", {
    get: function () {
      return this._offset;
    },
    set: function (_) {
      this._offset = _;
    },
    enumerable: false,
    configurable: true
  });
  o.prototype.onEnable = function () {
    m.default.instance.addCollider(this);
  };
  o.prototype.onDisable = function () {
    m.default.instance.removeCollider(this);
  };
  o._baseId = 1;
  d([a(cc.Vec2)], o.prototype, "_offset", undefined);
  d([a(cc.Vec2)], o.prototype, "offset", null);
  return e = d([r], o);
}(cc.Component);
exports.default = s;