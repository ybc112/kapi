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
var r = require("./HuaWeiLoginCtl");
var s = require("./UIManage");
var c = require("./uiPathManage");
var l = cc._decorator;
var u = l.ccclass;
var d = l.property;
var h = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.nodeContent = null;
    e.nodeUserPanel = null;
    e.nodePrivacyPanel = null;
    e.lbOK = null;
    e.lbCancel = null;
    e.lbUser2 = null;
    e.lbUser = null;
    e._acceptCallback = null;
    e._showContentFlag = false;
    return e;
  }
  i(e, t);
  e.prototype.start = function () {
    this.lbOK.string = window.qq ? "同意" : "确定";
    this.lbCancel.string = window.qq ? "不同意" : "取消";
  };
  e.prototype.acceptHandle = function () {
    if (cc.sys.platform === cc.sys.HUAWEI_GAME) {
      r.default.GetInstance().login();
    }
    cc.sys.localStorage.setItem("privacypolicy", 1);
    if (this._acceptCallback) {
      this._acceptCallback();
    }
    s.default.GetInstance().gotoDestroyUI(c.uiPath.uiName.popup_privacyPolicyView);
  };
  e.prototype.initData = function (t) {
    var e = false;
    var n = null;
    var o = false;
    var i = false;
    if (t.showContentFlag) {
      e = t.showContentFlag;
    }
    if (t.acceptCallback) {
      n = t.acceptCallback;
    }
    if (t.showPrivacyPanelFlag) {
      o = t.showPrivacyPanelFlag;
    }
    if (t.showUserPanelFlag) {
      i = t.showUserPanelFlag;
    }
    console.log("## PrivacyPolicy 2 initData");
    this._showContentFlag = e;
    this._acceptCallback = n;
    this.nodeContent.active = this._showContentFlag;
    this.nodePrivacyPanel.active = o;
    this.nodeUserPanel.active = i;
  };
  e.prototype.initData2 = function (t, e, n, o) {
    if (t === undefined) {
      t = false;
    }
    if (e === undefined) {
      e = null;
    }
    if (n === undefined) {
      n = false;
    }
    if (o === undefined) {
      o = false;
    }
    console.log("## PrivacyPolicy initData");
    this._showContentFlag = t;
    this._acceptCallback = e;
    this.nodeContent.active = this._showContentFlag;
    this.nodePrivacyPanel.active = n;
    this.nodeUserPanel.active = o;
  };
  e.prototype.refuseHandle = function () {
    if (window.qq) {
      window.qq.exitMiniProgram();
    } else if (cc.sys.platform == cc.sys.VIVO_GAME) {
      window.qg.exitApplication({});
    } else {
      cc.game.end();
    }
  };
  e.prototype.openUserPanelHandle = function () {
    this.nodeUserPanel.active = true;
    this.nodeUserPanel.getComponent(cc.ScrollView).scrollToTop(0);
  };
  e.prototype.openPrivacyPanelHandle = function () {
    this.nodePrivacyPanel.active = true;
    this.nodePrivacyPanel.getComponent(cc.ScrollView).scrollToTop(0);
  };
  e.prototype.closeHandle = function () {
    this.nodePrivacyPanel.active = false;
    this.nodeUserPanel.active = false;
    if (!this._showContentFlag) {
      s.default.GetInstance().gotoDestroyUI(c.uiPath.uiName.popup_privacyPolicyView);
    }
  };
  a([d(cc.Node)], e.prototype, "nodeContent", undefined);
  a([d(cc.Node)], e.prototype, "nodeUserPanel", undefined);
  a([d(cc.Node)], e.prototype, "nodePrivacyPanel", undefined);
  a([d(cc.Label)], e.prototype, "lbOK", undefined);
  a([d(cc.Label)], e.prototype, "lbCancel", undefined);
  a([d(cc.Node)], e.prototype, "lbUser2", undefined);
  a([d(cc.Node)], e.prototype, "lbUser", undefined);
  return a([u], e);
}(cc.Component);
exports.default = h;