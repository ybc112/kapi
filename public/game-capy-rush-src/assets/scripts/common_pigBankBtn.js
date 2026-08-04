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
    t.prototype.onLoad.call(this);
    r.ManageCtl.myMsgCtl.on(s.MyConstans.msg.updatePigCount, this.onupdatePigCount, this);
  };
  e.prototype.onDestroy = function () {
    r.ManageCtl.myMsgCtl.off(s.MyConstans.msg.updatePigCount, this.onupdatePigCount, this);
  };
  e.prototype.start = function () {
    this.onupdatePigCount();
  };
  e.prototype.btnClick_click = function (t) {
    if (l.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.showPopup_pigBankView);
    }
  };
  e.prototype.onupdatePigCount = function () {
    if (this.mlocation != s.MyConstans.openLocation.win || r.ManageCtl.gameData.getCurModeId() == 1) {
      var t = this.dict.redPointNode;
      var e = this.dict.fullNode;
      var n = r.ManageCtl.gameData.getPigCount();
      if (n >= s.MyConstans.num_pigMin && n < s.MyConstans.num_pigMax) {
        t.active = true;
        e.active = false;
      } else if (n >= s.MyConstans.num_pigMax) {
        t.active = false;
        e.active = true;
      } else {
        t.active = false;
        e.active = false;
      }
    } else {
      this.node.active = false;
    }
  };
  a([h({
    type: cc.Enum(s.MyConstans.openLocation),
    displayName: "所在位置"
  })], e.prototype, "mlocation", undefined);
  return a([d, p("ui/common_pigBankBtn")], e);
}(c.default);
exports.default = f;