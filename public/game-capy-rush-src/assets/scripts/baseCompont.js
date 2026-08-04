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
var c = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.dict = {};
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    this.loadNodeTree();
  };
  e.prototype.loadNodeTree = function () {
    var t = this;
    var e = this.node;
    if (e) {
      this.dict[e.name] = e;
      var n = function (e) {
        e.children.forEach(function (e) {
          if (e.children.length != 0) {
            n(e);
          }
          if (-1 == e.name.indexOf("copy")) {
            var o = e.name.split("=");
            if (o.length != 1) {
              if (!t.dict[o[1]]) {
                t.dict[o[1]] = e;
              }
              e.name = o[1];
            } else if (!t.dict[e.name]) {
              t.dict[e.name] = e;
            }
          }
        });
      };
      n(e);
    }
  };
  return a([s], e);
}(cc.Component);
exports.default = c;