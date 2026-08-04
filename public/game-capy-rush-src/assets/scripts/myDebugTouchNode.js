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
var c = require("./BmsCtl");
var l = cc._decorator;
var u = l.ccclass;
l.property;
var d = l.menu;
var h = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.touchkind = {
      dot: 1,
      right: 2,
      left: 3,
      up: 4,
      down: 5
    };
    e.m_touchBeginFlag = false;
    e.m_touchMoveFlag = false;
    e.m_beginPos = null;
    e.m_continuouTouchDotCount = 0;
    e.m_checkArr = [];
    e.m_setArr = [e.touchkind.dot, e.touchkind.dot, e.touchkind.dot, e.touchkind.dot, e.touchkind.dot, e.touchkind.dot, e.touchkind.dot, e.touchkind.dot];
    e._canTouchFlag = true;
    return e;
  }
  i(e, t);
  e.prototype.start = function () {
    this.node.on(cc.Node.EventType.TOUCH_START.toString(), this.touchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE.toString(), this.touchMove, this);
    this.node.on(cc.Node.EventType.TOUCH_END.toString(), this.touchEnd, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL.toString(), this.touchCancel, this);
    this.node._touchListener.setSwallowTouches(false);
    window.debugTest = this;
    r.ManageCtl.myMsgCtl.on(s.MyConstans.msg.httpRequestConfigSuccess, this.onHttpRequestConfigSuccess, this);
    this.onHttpRequestConfigSuccess();
  };
  e.prototype.onDestroy = function () {
    this.node.off(cc.Node.EventType.TOUCH_START.toString(), this.touchStart, this);
    this.node.off(cc.Node.EventType.TOUCH_MOVE.toString(), this.touchMove, this);
    this.node.off(cc.Node.EventType.TOUCH_END.toString(), this.touchEnd, this);
    this.node.off(cc.Node.EventType.TOUCH_CANCEL.toString(), this.touchCancel, this);
    r.ManageCtl.myMsgCtl.off(s.MyConstans.msg.httpRequestConfigSuccess, this.onHttpRequestConfigSuccess, this);
  };
  e.prototype.touchStart = function (t) {
    if (this._canTouchFlag) {
      var e = t.touch.getLocation();
      this.m_touchBeginFlag = true;
      this.m_beginPos = e;
    }
  };
  e.prototype.touchMove = function () {};
  e.prototype.touchEnd = function () {
    if (this._canTouchFlag) {
      if (this.m_touchBeginFlag) {
        this.m_continuouTouchDotCount += 1;
        this.gotoCheck();
      }
      this.m_touchBeginFlag = false;
      this.m_touchMoveFlag = false;
      this.m_beginPos = null;
    }
  };
  e.prototype.touchCancel = function (t) {
    if (this._canTouchFlag) {
      t.touch.getLocation();
      this.m_touchBeginFlag;
      this.m_touchBeginFlag = false;
      this.m_touchMoveFlag = false;
      this.m_beginPos = null;
    }
  };
  e.prototype.gotoCheck = function () {
    if (this._canTouchFlag) {
      var t = false;
      if (this.m_continuouTouchDotCount >= 8) {
        this.m_continuouTouchDotCount = 0;
        t = true;
      }
      if (t) {
        cc.game.emit("showDebugView");
      }
      this.m_checkArr = [];
    }
  };
  e.prototype.open = function () {
    cc.game.emit("showDebugView");
  };
  e.prototype.onHttpRequestConfigSuccess = function () {
    if (c.default.GetInstance().getConditionValueByType("gm") <= 0) {
      this._canTouchFlag = false;
      this.node.opacity = 0;
    } else {
      this._canTouchFlag = true;
      this.node.opacity = 255;
    }
  };
  return a([u, d("ui/myDebugTouchNode")], e);
}(cc.Component);
exports.default = h;