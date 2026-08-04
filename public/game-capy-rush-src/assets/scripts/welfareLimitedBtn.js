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
var c = require("./myBtnClick");
var l = require("./uiPathManage");
var u = cc._decorator;
var d = u.ccclass;
var h = u.property;
var p = u.menu;
var f = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.mlocation = s.MyConstans.openLocation.main;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    r.ManageCtl.myMsgCtl.on(s.MyConstans.msg.getWelfareLimitedDone, this.onGetWelfareLimitedDone, this);
    r.ManageCtl.myMsgCtl.on(s.MyConstans.msg.gameNextLevel, this.ongameNextLevel, this);
  };
  e.prototype.onDestroy = function () {
    r.ManageCtl.myMsgCtl.off(s.MyConstans.msg.getWelfareLimitedDone, this.onGetWelfareLimitedDone, this);
    r.ManageCtl.myMsgCtl.off(s.MyConstans.msg.gameNextLevel, this.ongameNextLevel, this);
  };
  e.prototype.start = function () {
    if (this.mlocation == s.MyConstans.openLocation.game) {
      var t = r.ManageCtl.gameData.getCurModeId();
      var e = r.ManageCtl.gameData.getCurLevelId();
      if (t != 1 || t == 1 && e == 1) {
        return void (this.node.active = false);
      }
    }
    if (this.mlocation == s.MyConstans.openLocation.game && (t = r.ManageCtl.gameData.getCurModeId(), e = r.ManageCtl.gameData.getCurLevelId(), t != 1 || t == 1 && e == 1)) {
      this.node.active = false;
    } else if (window.tt) {
      var n = window.tt;
      console.log("##  appName: ", n.getSystemInfoSync().appName);
      if (["Douyin"].some(function (t) {
        return t == n.getSystemInfoSync().appName;
      })) {
        this.node.active = true;
        this.onGetWelfareLimitedDone();
      } else {
        this.node.active = false;
      }
    } else {
      this.node.active = false;
    }
  };
  e.prototype.btnClick_showWelfareView = function (t) {
    if (c.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.showPopupView, l.uiPath.uiName.popup_welfareLimitedView);
    }
  };
  e.prototype.onGetWelfareLimitedDone = function () {
    var t = cc.sys.localStorage.getItem("nxwz_GetWelfareLimitedDone");
    this.node.active = !t;
    this.node.getChildByName("Background").getChildByName("welfareLimitedBtnRed").active = !t;
  };
  e.prototype.ongameNextLevel = function () {
    if (this.mlocation == s.MyConstans.openLocation.game) {
      var t = r.ManageCtl.gameData.getCurModeId();
      var e = r.ManageCtl.gameData.getCurLevelId();
      if (t != 1 || t == 1 && e == 1) {
        return void (this.node.active = false);
      }
      if (!window.tt) {
        return void (this.node.active = false);
      }
      var n = window.tt;
      if (!["Douyin"].some(function (t) {
        return t == n.getSystemInfoSync().appName;
      })) {
        return void (this.node.active = false);
      }
      this.node.active = true;
    }
  };
  a([h({
    type: cc.Enum(s.MyConstans.openLocation),
    displayName: "所在位置"
  })], e.prototype, "mlocation", undefined);
  return a([d, p("ui/welfareLimitedBtn")], e);
}(cc.Component);
exports.default = f;