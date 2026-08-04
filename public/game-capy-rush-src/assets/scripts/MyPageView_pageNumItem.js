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
var c = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e._imgBg = null;
    e._imgCur = null;
    e._pageNum = 0;
    return e;
  }
  i(e, t);
  e.prototype.updateData = function (t, e) {
    this._pageNum = t;
    if (!this._imgBg) {
      this._imgBg = this.node.getChildByName("imgBg");
    }
    if (!this._imgCur) {
      this._imgCur = this.node.getChildByName("imgCur");
    }
    this._imgCur.active = t == e;
    this._imgBg.active = !this._imgCur.active;
  };
  e.prototype.setCutShowPageNum = function (t) {
    if (!this._imgBg) {
      this._imgBg = this.node.getChildByName("imgBg");
    }
    if (!this._imgCur) {
      this._imgCur = this.node.getChildByName("imgCur");
    }
    this._imgCur.active = this._pageNum == t;
    this._imgBg.active = !this._imgCur.active;
  };
  e.prototype.btnClick_touch = function () {
    this.touchCallback(this._pageNum);
  };
  e.prototype.touchCallback = function () {};
  return a([s], e);
}(cc.Component);
exports.default = c;