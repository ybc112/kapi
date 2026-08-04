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
var r = cc._decorator;
var s = r.ccclass;
r.property;
var c = r.menu;
var l = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.touchkind = {
      dot: 1,
      right: 2,
      left: 3
    };
    e.m_touchBeginFlag = false;
    e.m_touchMoveFlag = false;
    e.m_beginPos = null;
    e.m_continuouTouchDotCount = 0;
    e.m_checkArr = [];
    e.m_setArr = [e.touchkind.left, e.touchkind.left, e.touchkind.dot, e.touchkind.right, e.touchkind.right, e.touchkind.dot];
    return e;
  }
  i(e, t);
  e.prototype.start = function () {
    this.node.on(cc.Node.EventType.TOUCH_START.toString(), this.touchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE.toString(), this.touchMove, this);
    this.node.on(cc.Node.EventType.TOUCH_END.toString(), this.touchEnd, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL.toString(), this.touchCancel, this);
    this.node._touchListener.setSwallowTouches(false);
    window.debugTest2 = this;
  };
  e.prototype.onDestroy = function () {
    this.node.off(cc.Node.EventType.TOUCH_START.toString(), this.touchStart, this);
    this.node.off(cc.Node.EventType.TOUCH_MOVE.toString(), this.touchMove, this);
    this.node.off(cc.Node.EventType.TOUCH_END.toString(), this.touchEnd, this);
    this.node.off(cc.Node.EventType.TOUCH_CANCEL.toString(), this.touchCancel, this);
  };
  e.prototype.touchStart = function (t) {
    var e = t.touch.getLocation();
    this.m_touchBeginFlag = true;
    this.m_beginPos = e;
  };
  e.prototype.touchMove = function () {};
  e.prototype.touchEnd = function () {
    if (this.m_touchBeginFlag) {
      this.m_continuouTouchDotCount += 1;
      if (this.m_continuouTouchDotCount >= 5) {
        this.m_continuouTouchDotCount = 0;
        this.m_checkArr = [];
      }
      if (this.m_continuouTouchDotCount == 1 && this.m_checkArr.length != 0) {
        this.m_checkArr.push(this.touchkind.dot);
        this.gotoCheck();
      }
    }
    this.m_touchBeginFlag = false;
    this.m_touchMoveFlag = false;
    this.m_beginPos = null;
  };
  e.prototype.touchCancel = function (t) {
    var e = t.touch.getLocation();
    if (this.m_touchBeginFlag) {
      this.m_continuouTouchDotCount = 0;
      var n = e.x;
      var o = e.y;
      var i = this.m_beginPos.x;
      var a = this.m_beginPos.y;
      if (n - i >= 0.5 * this.node.width && Math.abs(o - a) <= this.node.height) {
        if (this.m_checkArr.length < this.m_setArr.length) {
          this.m_checkArr.push(this.touchkind.right);
        }
      } else if (n - i <= 0.5 * -this.node.width && Math.abs(o - a) <= this.node.height && this.m_checkArr.length < this.m_setArr.length) {
        this.m_checkArr.push(this.touchkind.left);
      }
    }
    this.m_touchBeginFlag = false;
    this.m_touchMoveFlag = false;
    this.m_beginPos = null;
  };
  e.prototype.gotoCheck = function () {
    if (!(this.m_checkArr.length < this.m_setArr.length)) {
      for (var t = false, e = 0, n = 0; n < this.m_setArr.length; n++) {
        var o = this.m_setArr[n];
        if (this.m_checkArr[n] != o) {
          break;
        }
        e += 1;
      }
      if (e == this.m_setArr.length) {
        t = true;
      }
      if (t) {
        cc.game.emit("showDebugView2");
      }
      this.m_checkArr = [];
    }
  };
  e.prototype.open = function () {
    cc.game.emit("showDebugView2");
  };
  return a([s, c("ui/myTouchNode2")], e);
}(cc.Component);
exports.default = l;