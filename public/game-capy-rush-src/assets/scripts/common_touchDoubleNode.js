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
var c = cc._decorator;
var l = c.ccclass;
c.property;
var u = c.menu;
var d = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e._doubleTime = 0.3;
    e._doubleCount = 0;
    e._doubleTimeCallback = null;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    this._doubleTimeCallback = this.doubleTimeCallback.bind(this);
  };
  e.prototype.start = function () {
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
  };
  e.prototype.doubleTimeCallback = function () {
    this.unschedule(this._doubleTimeCallback);
    this._doubleCount = 0;
  };
  e.prototype.onTouchEnd = function () {
    this.unschedule(this._doubleTimeCallback);
    this.scheduleOnce(this._doubleTimeCallback, this._doubleTime);
    this._doubleCount += 1;
    console.log("## this._doubleCount: ", this._doubleCount);
    if (this._doubleCount >= 2) {
      console.log("双击");
      r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.showPopup_changePathBgView);
    }
  };
  return a([l, u("ui/common/common_touchDoubleNode")], e);
}(cc.Component);
exports.default = d;