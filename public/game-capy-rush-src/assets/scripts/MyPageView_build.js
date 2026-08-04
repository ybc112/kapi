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
var r = require("./MyPageView");
var s = require("./ManageCtl");
var c = require("./SdkConfig");
var l = cc._decorator;
var u = l.ccclass;
l.property;
var d = function (t) {
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  i(e, t);
  e.prototype.update = function () {};
  e.prototype.onTouchStart = function () {};
  e.prototype.onTouchMove = function () {};
  e.prototype.onTouchEnd = function () {};
  e.prototype.updatePageNumIndex = function () {
    s.ManageCtl.myMsgCtl.emit(c.MyConstans.msg.changeBuildPage);
  };
  e.prototype.setCurPageIndex = function (t) {
    this._curPageIndex = t;
    if (this.showChangePageBtnFlag) {
      var e = s.ManageCtl.gameData.getBuildInfo().id;
      this.lbCurPage.string = this._curPageIndex + 1 + "/" + this._needCreatePageItemCount;
      if (this._curPageIndex == 0) {
        this.btnPreviousPage.active = false;
        this.btnNextPage.active = this._needCreatePageItemCount >= 2;
        if (this._curPageIndex == e) {
          this.btnNextPage.active = false;
        }
      } else if (this._curPageIndex == this._needCreatePageItemCount - 1) {
        this.btnPreviousPage.active = this._needCreatePageItemCount >= 2;
        this.btnNextPage.active = false;
      } else {
        this.btnPreviousPage.active = this._needCreatePageItemCount >= 2;
        this.btnNextPage.active = this._needCreatePageItemCount >= 2;
        if (this._curPageIndex == e) {
          this.btnNextPage.active = false;
        }
      }
    }
  };
  e.prototype.nextPage = function () {
    if (this._state != 3) {
      var t = this._curPageIndex + 1;
      if (!(t > this._needCreatePageItemCount - 1)) {
        this.gotoPage(t);
      }
    }
  };
  e.prototype.previousPage = function () {
    if (this._state != 3) {
      var t = this._curPageIndex - 1;
      if (!(t < 0)) {
        this.gotoPage(t);
      }
    }
  };
  return a([u], e);
}(r.default);
exports.default = d;