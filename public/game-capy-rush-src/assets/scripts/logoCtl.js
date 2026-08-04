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
var r = require("./MyPlatform");
var s = require("./MyTool");
var c = cc._decorator;
var l = c.ccclass;
var u = c.property;
var d = c.menu;
var h = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.imgLogo = null;
    return e;
  }
  i(e, t);
  e.prototype.start = function () {
    var t = "/logo/" + r.default.LogoName;
    this.imgLogo.node.mReloImgFalg = true;
    s.MyTool.loadImg(t, this.imgLogo);
  };
  a([u(cc.Sprite)], e.prototype, "imgLogo", undefined);
  return a([l, d("ui/common/logoCtl")], e);
}(cc.Component);
exports.default = h;