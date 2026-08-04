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
    e.time = 0.7;
    e.angleL = -1;
    e.angleR = 2;
    return e;
  }
  i(e, t);
  e.prototype.start = function () {
    this.node.stopAllActions();
    this.node.angle = 0;
    cc.tween(this.node).to(this.time, {
      angle: this.angleR
    }).to(this.time + 0.2, {
      angle: this.angleL
    }).delay(0.3).union().repeatForever().start();
  };
  a([c({
    displayName: "摇晃时间"
  })], e.prototype, "time", undefined);
  a([c({
    displayName: "向左摇晃值"
  })], e.prototype, "angleL", undefined);
  a([c({
    displayName: "向右摇晃值"
  })], e.prototype, "angleR", undefined);
  return a([s, l("ui/common/common_shakeNode")], e);
}(cc.Component);
exports.default = u;