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
var r = require("./ManageCtl");
var s = require("./myXxtea");
var c = require("./uiPathManage");
var l = cc._decorator;
var u = l.ccclass;
var d = l.property;
var h = l.menu;
var p = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.lbContent = null;
    return e;
  }
  i(e, t);
  e.prototype.start = function () {
    var t = new s.myXxtea();
    this.lbContent.string = t.xxtea_decrypt("668f40f8783508960f2d9b073e19c69938a37476049c5da0d6c7cd992ba1e181c382d3a83d69716a43ef7288f88f974d6678a7e3c1eb3b46eb9ed28d", "jguwhskvishgusbq");
    this.scheduleOnce(function () {
      r.ManageCtl.uiManage.gotoDestroyUI(c.uiPath.uiName.debugView2);
    }, 3);
  };
  e.prototype.onDisable = function () {
    this.unscheduleAllCallbacks();
  };
  a([d(cc.Label)], e.prototype, "lbContent", undefined);
  return a([u, h("ui/debugNode2")], e);
}(cc.Component);
exports.default = p;