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
r.property;
var c = r.menu;
var l = function (t) {
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  i(e, t);
  e.prototype.start = function () {
    var t = this.node;
    t.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    t.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    t.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    t.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
  };
  e.prototype.onTouchStart = function () {};
  e.prototype.onTouchMove = function (t) {
    var e = t.target;
    var n = t.getDelta();
    e.x += n.x;
    e.y += n.y;
    var o = cc.winSize.width;
    var i = cc.winSize.height;
    if (e.x < 0.5 * -o + 0.5 * e.width) {
      e.x = 0.5 * -o + 0.5 * e.width;
    }
    if (e.x > 0.5 * o - 0.5 * e.width) {
      e.x = 0.5 * o - 0.5 * e.width;
    }
    if (e.y < 0.5 * -i + 0.5 * e.height) {
      e.y = 0.5 * -i + 0.5 * e.height;
    }
    if (e.y > 0.5 * i - 0.5 * e.height) {
      e.y = 0.5 * i - 0.5 * e.height;
    }
  };
  e.prototype.onTouchEnd = function () {};
  return a([s, c("ui/common/common_touchMoveNode")], e);
}(cc.Component);
exports.default = l;