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
var r = require("./baseCompont");
var s = require("./ManageCtl");
var c = require("./SdkConfig");
var l = require("./myBtnClick");
var u = require("./uiPathManage");
var d = cc._decorator;
var h = d.ccclass;
var p = d.property;
var f = d.menu;
var g = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.mlocation = c.MyConstans.openLocation.main;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    s.ManageCtl.myMsgCtl.on(c.MyConstans.msg.getSignInDone, this.ongetSignInDone, this);
  };
  e.prototype.onDestroy = function () {
    s.ManageCtl.myMsgCtl.off(c.MyConstans.msg.getSignInDone, this.ongetSignInDone, this);
  };
  e.prototype.start = function () {
    this.ongetSignInDone();
  };
  e.prototype.btnClick_click = function (t) {
    if (l.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      s.ManageCtl.myMsgCtl.emit(c.MyConstans.msg.showPopupView, u.uiPath.uiName.popup_signinView);
    }
  };
  e.prototype.ongetSignInDone = function () {
    var t = s.ManageCtl.gameData.getSignInInfo();
    var e = t.freeDone;
    var n = t.done;
    var o = t.index;
    if (this.mlocation == c.MyConstans.openLocation.win) {
      this.node.active = e == 0 && n == 0 && o <= 7;
    } else {
      this.node.active = o < 7 || o == 7 && e == 0;
    }
    this.dict.signinBtnRed.active = e == 0 && n == 0;
  };
  a([p({
    type: cc.Enum(c.MyConstans.openLocation),
    displayName: "所在位置"
  })], e.prototype, "mlocation", undefined);
  return a([h, f("ui/common/common_signinBtn")], e);
}(r.default);
exports.default = g;