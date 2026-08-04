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
var c = require("./ManageCtl");
var l = require("./SdkConfig");
var u = cc._decorator;
var d = u.ccclass;
var h = u.property;
var p = u.menu;
var f = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.beginShowFlag = true;
    e.lbGoldCount = null;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.onresetGoldEndNode();
    this.lbGoldCount = this.dict.lbGoldCount.getComponent(cc.Label);
    c.ManageCtl.myMsgCtl.on(l.MyConstans.msg.updateGoldCount, this.onupdateGoldCount, this);
    c.ManageCtl.myMsgCtl.on(l.MyConstans.msg.resetGoldEndNode, this.onresetGoldEndNode, this);
  };
  e.prototype.onDestroy = function () {
    c.ManageCtl.myMsgCtl.off(l.MyConstans.msg.updateGoldCount, this.onupdateGoldCount, this);
    c.ManageCtl.myMsgCtl.off(l.MyConstans.msg.resetGoldEndNode, this.onresetGoldEndNode, this);
    c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.resetGoldEndNode);
  };
  e.prototype.onresetGoldEndNode = function () {
    window.game_goldNode = this.dict.iconGoldEnd;
  };
  e.prototype.start = function () {
    this.onupdateGoldCount();
  };
  e.prototype.onupdateGoldCount = function () {
    var t = c.ManageCtl.gameData.getGoldCount();
    this.lbGoldCount.string = t > 999 ? "999+" : t.toString();
  };
  e.prototype.btnClick_click = function (t) {
    if (s.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.showPopup_shopView);
    }
  };
  a([h({
    displayName: "一开始显示"
  })], e.prototype, "beginShowFlag", undefined);
  return a([d, p("ui/common/common_GoldNode")], e);
}(r.default);
exports.default = f;