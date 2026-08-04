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
var c = require("./MyTool");
var l = require("./ManageCtl");
var u = require("./SdkConfig");
var d = cc._decorator;
var h = d.ccclass;
var p = d.property;
var f = d.menu;
var g = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.beginShowFlag = true;
    e.lbVITCount = null;
    e.lbRecoverTime = null;
    e._showVITFlag = false;
    e._getInfiniteFlag = false;
    e._infiniteTimeCallback = null;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    var e = this;
    t.prototype.onLoad.call(this);
    this.lbVITCount = this.dict.lbVITCount.getComponent(cc.Label);
    this.lbRecoverTime = this.dict.lbRecoverTime.getComponent(cc.Label);
    l.ManageCtl.myMsgCtl.on(u.MyConstans.msg.updateVITCount, this.onupdateVITCount, this);
    l.ManageCtl.myMsgCtl.on(u.MyConstans.msg.getInfiniteVIT, this.ongetInfiniteVIT, this);
    l.ManageCtl.myMsgCtl.on(u.MyConstans.msg.httpRequestConfigSuccess, this.onhttpRequestConfigSuccess, this);
    this._infiniteTimeCallback = this.infiniteTimeCallback.bind(this);
    this.onhttpRequestConfigSuccess();
    this.onupdateVITCount();
    this.updateUnlockInfinite();
    this.setRecoverVIT();
    this.schedule(function () {
      e.setRecoverVIT();
    }, 1);
  };
  e.prototype.onDestroy = function () {
    l.ManageCtl.myMsgCtl.off(u.MyConstans.msg.updateVITCount, this.onupdateVITCount, this);
    l.ManageCtl.myMsgCtl.off(u.MyConstans.msg.getInfiniteVIT, this.ongetInfiniteVIT, this);
    l.ManageCtl.myMsgCtl.off(u.MyConstans.msg.httpRequestConfigSuccess, this.onhttpRequestConfigSuccess, this);
  };
  e.prototype.start = function () {};
  e.prototype.ongetInfiniteVIT = function () {
    this.updateUnlockInfinite();
  };
  e.prototype.onupdateVITCount = function () {
    if (this._showVITFlag) {
      var t = l.ManageCtl.gameData.getVITCount();
      this.lbVITCount.string = t.toString();
      if (-1 == l.ManageCtl.gameData.getLastRecoverVITTime()) {
        if (t < l.ManageCtl.gameData.recoverVITCountMax) {
          var e = Math.floor(Date.now() / 1000);
          l.ManageCtl.gameData.setLastRecoverVITTime(e);
          this.setRecoverVIT();
        } else {
          l.ManageCtl.gameData.setLastRecoverVITTime(-1);
        }
      } else {
        if (t >= l.ManageCtl.gameData.recoverVITCountMax) {
          return void l.ManageCtl.gameData.setLastRecoverVITTime(-1);
        }
        this.setRecoverVIT();
      }
    }
  };
  e.prototype.setRecoverVIT = function () {
    if (this._showVITFlag) {
      var t = l.ManageCtl.gameData.getLastRecoverVITTime();
      if (-1 != t) {
        var e = Math.floor(Date.now() / 1000);
        var n = e - t;
        var o = l.ManageCtl.gameData.recoverVITTime - n;
        if (o < 0) {
          o = 0;
        }
        this.lbRecoverTime.string = c.MyTool.changeSecondToClock(o);
        this.lbRecoverTime.node.opacity = 255;
        if (n > l.ManageCtl.gameData.recoverVITTime) {
          var i = Math.floor(n / l.ManageCtl.gameData.recoverVITTime);
          var a = l.ManageCtl.gameData.getVITCount();
          var r = a + i;
          if (r > l.ManageCtl.gameData.recoverVITCountMax) {
            r = l.ManageCtl.gameData.recoverVITCountMax - a;
          }
          var s = n - i * l.ManageCtl.gameData.recoverVITTime;
          console.log("## offlineSeconds ", n);
          console.log("## 离线恢复体力 ", r);
          console.log("## time ", s);
          if (s < 0) {
            s = 0;
          }
          l.ManageCtl.gameData.setLastRecoverVITTime(e - s);
          l.ManageCtl.gameData.addVITCount(r);
          this.onupdateVITCount();
        }
      } else {
        this.lbRecoverTime.node.opacity = 0;
      }
    }
  };
  e.prototype.onhttpRequestConfigSuccess = function () {
    if (u.MyConstans.useVIT) {
      if (!this.beginShowFlag) {
        this._showVITFlag = true;
        return void (this.node.opacity = 0);
      }
      if (!l.ManageCtl.gameData.gameUseVITFlag) {
        this._showVITFlag = false;
        return void this.node.children.forEach(function (t) {
          t.active = false;
        });
      }
      this._showVITFlag = true;
      this.node.children.forEach(function (t) {
        t.active = true;
      });
      this.onupdateVITCount();
    } else {
      this.node.active = false;
    }
  };
  e.prototype.btnClick_infiniteVIT = function (t) {
    if (this.node.opacity != 0 && this._showVITFlag && s.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      l.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.showpopup_addInfiniteVITView);
    }
  };
  e.prototype.updateUnlockInfinite = function () {
    if (u.MyConstans.useVIT) {
      var t = l.ManageCtl.gameData.getUnlockInfiniteInfo();
      if (-1 != t.unlockTime) {
        var e = (new Date().getTime() - t.unlockTime) / 1000;
        var n = u.MyConstans.num_allUnlockInfiniteTime - e;
        console.log("## 无限体力倒计时: ", n);
        if (n > 0) {
          this.unschedule(this._infiniteTimeCallback);
          this._infiniteTimeCallback();
          this.schedule(this._infiniteTimeCallback, 1);
        }
      }
    }
  };
  e.prototype.infiniteTimeCallback = function () {
    if (u.MyConstans.useVIT) {
      var t = l.ManageCtl.gameData.getUnlockInfiniteInfo();
      var e = (new Date().getTime() - t.unlockTime) / 1000;
      if (u.MyConstans.num_allUnlockInfiniteTime - e > 0) {
        this._getInfiniteFlag = true;
        this.lbVITCount.string = "∞";
        l.ManageCtl.gameData.isGetInfiniteVITFlag = true;
      } else {
        this.unschedule(this._infiniteTimeCallback);
        l.ManageCtl.gameData.resetUnlockInfiniteInfo();
        this._getInfiniteFlag = false;
        l.ManageCtl.gameData.isGetInfiniteVITFlag = false;
      }
    }
  };
  a([p({
    displayName: "一开始显示"
  })], e.prototype, "beginShowFlag", undefined);
  return a([h, f("ui/common/common_VITNode")], e);
}(r.default);
exports.default = g;