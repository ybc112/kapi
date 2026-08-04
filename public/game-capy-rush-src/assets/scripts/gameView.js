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
var l = require("./uiPathManage");
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
    window.gameViewInitChildCount = this.node.childrenCount;
    r.ManageCtl.myMsgCtl.on(s.MyConstans.msg.showPopupView, this.onshowPopupView, this);
    r.ManageCtl.myMsgCtl.on(s.MyConstans.msg.showPopup_reloadView, this.onshowPopup_reloadView, this);
    this.init();
  };
  e.prototype.onDestroy = function () {
    r.ManageCtl.myMsgCtl.off(s.MyConstans.msg.showPopupView, this.onshowPopupView, this);
    r.ManageCtl.myMsgCtl.off(s.MyConstans.msg.showPopup_reloadView, this.onshowPopup_reloadView, this);
  };
  e.prototype.start = function () {
    r.ManageCtl.audioManager.pauseBGM();
    r.ManageCtl.audioManager.PlayBGM("a_homeBg2");
    this.checkShowOtherView();
  };
  e.prototype.onDisable = function () {
    r.ManageCtl.gameData.levelGetFruitCount = 0;
    r.ManageCtl.gameData.haveGetNewCollectFlag = false;
    r.ManageCtl.gameData.passEasyFlag = false;
    r.ManageCtl.gameData.game_lvgrade = 1;
    r.ManageCtl.gameData.gameLoseCount = 0;
    r.ManageCtl.uiManage.gotoDestroyUI(l.uiPath.uiName.popup_gameBackView);
    r.ManageCtl.uiManage.gotoDestroyUI(l.uiPath.uiName.popup_gameWinView);
    r.ManageCtl.uiManage.gotoDestroyUI(l.uiPath.uiName.popup_gameLoseView2);
  };
  e.prototype.initData = function () {};
  e.prototype.init = function () {};
  e.prototype.onshowPopupView = function (t, e) {
    if (e === undefined) {
      e = {};
    }
    r.ManageCtl.uiManage.showUI(t, this.node, e);
  };
  e.prototype.checkShowOtherView = function () {};
  e.prototype.onshowPopup_reloadView = function (t) {
    if (t === undefined) {
      t = {};
    }
    r.ManageCtl.uiManage.showUILocal(l.uiPath.uiName.popup_reloadView, this.node, t);
  };
  return a([d, h("ui/gameView")], e);
}(c.default);
exports.default = p;