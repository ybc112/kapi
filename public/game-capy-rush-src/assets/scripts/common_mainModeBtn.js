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
    e.modeId = 128;
    e.lbLockCount = null;
    e._unlockFlag = false;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
  };
  e.prototype.onDestroy = function () {};
  e.prototype.start = function () {
    if (!this.lbLockCount) {
      this.lbLockCount = this.dict.lbLockCount.getComponent(cc.Label);
    }
    this.initData();
  };
  e.prototype.initData = function () {
    this._unlockFlag = r.ManageCtl.gameData.checkModeIsUnlock(this.modeId);
    this.dict.imgVideo.active = !this._unlockFlag;
    if (!this._unlockFlag) {
      var t = r.ManageCtl.bmsCtl.getConditionValueByType("TwoTimesUnlock");
      if (t && t.length > 0) {
        for (var e = false, n = 0; n < t.length; n++) {
          var o = t[n];
          if (o && o.length > 0) {
            var i = o[0];
            if (o[1].includes(this.modeId)) {
              e = true;
              this.lbLockCount.node.active = true;
              var a = r.ManageCtl.gameData.getUnlockModeCountByModeId(this.modeId);
              this.lbLockCount.string = a + "/" + i;
              break;
            }
          }
        }
        if (!e) {
          this.lbLockCount.node.active = false;
        }
      } else {
        this.lbLockCount.node.active = false;
      }
    }
  };
  e.prototype.btnClick_click = function (t) {
    var e = this;
    if (l.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.clickMainModeItem, {
        modeId: this.modeId,
        unlock: this._unlockFlag,
        callback: function () {
          e.initData();
        }
      });
    }
  };
  a([h({
    displayName: "模式id"
  })], e.prototype, "modeId", undefined);
  return a([d, p("ui/common_mainModeBtn")], e);
}(c.default);
exports.default = f;