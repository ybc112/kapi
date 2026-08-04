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
var s = require("./myBtnClick");
var c = require("./uiPathManage");
var l = require("./ManageCtl");
var u = require("./SdkConfig");
var d = cc._decorator;
var h = d.ccclass;
d.property;
var p = d.menu;
var f = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.bg = null;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.bg = this.dict.bg;
    var e = this.dict.handNode;
    e.active = true;
    cc.tween(e).to(0.2, {
      scale: 1.1
    }).to(0.2, {
      scale: 1
    }).union().repeatForever().start();
    this.dict.btnGet.active = !l.ManageCtl.gameData.getFlagData(u.MyConstans.projectName + "_wxGetFavorite");
    this.onUpdateWxFavorite();
    cc.game.on("updateWxFavorite", this.onUpdateWxFavorite, this);
  };
  e.prototype.onDestroy = function () {
    cc.game.off("updateWxFavorite", this.onUpdateWxFavorite, this);
  };
  e.prototype.btnClick_close = function (t) {
    if (s.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      this.gotoClose();
    }
  };
  e.prototype.gotoClose = function () {
    l.ManageCtl.uiManage.gotoDestroyUI(c.uiPath.uiName.popup_favoriteWxView);
  };
  e.prototype.onUpdateWxFavorite = function () {
    if (this && this.dict && this.dict.getLock) {
      this.dict.getLock.active = !cc.sys.localStorage.getItem("kpbl_canGetWxGetFavorite");
    }
  };
  e.prototype.btnClick_get = function (t) {
    if (s.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      if (this.dict.getLock.active) {
        l.ManageCtl.persistRootNode.showTipsUI("请先添加到我的小程序");
      } else if (!l.ManageCtl.gameData.getFlagData(u.MyConstans.projectName + "_wxGetFavorite")) {
        l.ManageCtl.gameData.addDayPropById(u.MyConstans.propId.bomb, 1);
        l.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.updatePropCount);
        l.ManageCtl.persistRootNode.showTipsUI("添加成功，炸弹道具已发放！");
        l.ManageCtl.gameData.setFlagData(u.MyConstans.projectName + "_wxGetFavorite", {});
        this.dict.btnGet.active = false;
        l.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.getFavoriteDone);
      }
    }
  };
  return a([h, p("ui/popup_favoriteWxView")], e);
}(r.default);
exports.default = f;