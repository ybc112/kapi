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
var s = require("./SdkConfig");
var c = require("./baseCompont");
var l = require("./myBtnClick");
var u = cc._decorator;
var d = u.ccclass;
u.property;
var h = u.menu;
var p = function (t) {
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    r.ManageCtl.myMsgCtl.on(s.MyConstans.msg.getLoginPackDone, this.onGetLoginPackDone, this);
  };
  e.prototype.onDestroy = function () {
    r.ManageCtl.myMsgCtl.off(s.MyConstans.msg.getLoginPackDone, this.onGetLoginPackDone, this);
  };
  e.prototype.start = function () {
    this.onGetLoginPackDone();
  };
  e.prototype.btnClick_loginPack = function (t) {
    if (l.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.showPopup_loginPackView);
    }
  };
  e.prototype.onGetLoginPackDone = function () {
    var t = r.ManageCtl.gameData.getLoginPackInfo();
    this.node.active = !t.done;
  };
  return a([d, h("ui/common_loginPackBtn")], e);
}(c.default);
exports.default = p;