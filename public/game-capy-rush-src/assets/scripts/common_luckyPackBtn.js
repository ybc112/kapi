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
var l = require("./MyTool");
var u = require("./myBtnClick");
var d = cc._decorator;
var h = d.ccclass;
d.property;
var p = d.menu;
var f = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e._lbTime = null;
    e._timeCallback = null;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this._lbTime = this.dict.lbTime.getComponent(cc.Label);
    this._timeCallback = this.timeCallback.bind(this);
    r.ManageCtl.myMsgCtl.on(s.MyConstans.msg.getLuckyPackDone, this.onGetLuckyPackDone, this);
  };
  e.prototype.onDestroy = function () {
    r.ManageCtl.myMsgCtl.off(s.MyConstans.msg.getLuckyPackDone, this.onGetLuckyPackDone, this);
  };
  e.prototype.onDisable = function () {
    this.unscheduleAllCallbacks();
  };
  e.prototype.start = function () {
    this.onGetLuckyPackDone();
    if (this.node.active) {
      var t = r.ManageCtl.gameData.onLineTime;
      var e = s.MyConstans.num_luckyPackTime;
      if (r.ManageCtl.persistRootNode.resetLuckyPackTime) {
        e = s.MyConstans.num_luckyPackTime_test;
      }
      if (t >= e) {
        this._lbTime.node.active = false;
        return void this.unschedule(this._timeCallback);
      }
      this.unschedule(this._timeCallback);
      this.schedule(this.timeCallback, 1);
      var n = e - t;
      this._lbTime.string = l.MyTool.changeSecondToClock(n);
    }
  };
  e.prototype.btnClick_luckyPack = function (t) {
    if (u.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.showPopup_luckyPackView);
    }
  };
  e.prototype.onGetLuckyPackDone = function () {
    var t = r.ManageCtl.gameData.getLuckyPackInfo();
    this.node.active = !t.done;
  };
  e.prototype.timeCallback = function () {
    if (this.node.active) {
      var t = r.ManageCtl.gameData.onLineTime;
      var e = s.MyConstans.num_luckyPackTime;
      if (r.ManageCtl.persistRootNode.resetLuckyPackTime) {
        e = s.MyConstans.num_luckyPackTime_test;
      }
      var n = e - t;
      if (n < 0) {
        n = 0;
      }
      this._lbTime.string = l.MyTool.changeSecondToClock(n);
      if (n <= 0) {
        this._lbTime.node.active = false;
        return void this.unschedule(this._timeCallback);
      } else {
        return undefined;
      }
    }
  };
  return a([h, p("ui/common_luckyPackBtn")], e);
}(c.default);
exports.default = f;