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
var r;
var s = require("./ManageCtl");
var c = require("./SdkConfig");
var l = require("./baseCompont");
var u = require("./Language");
var d = require("./MyTool");
var h = require("./uiPathManage");
(function (t) {
  t[t.init = 1] = "init";
  t[t.play = 2] = "play";
  t[t.waitAddTime = 3] = "waitAddTime";
  t[t.win = 4] = "win";
  t[t.lose = 5] = "lose";
})(r || (r = {}));
var p = cc._decorator;
var f = p.ccclass;
p.property;
var g = p.menu;
var m = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e._state = r.init;
    e.lbTime = null;
    e._timeCallback = null;
    e._initTime = 180;
    e._allTime = 180;
    e._gamePauseFlag = false;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    cc.game.on("game_success2", this.onGameSuccess, this);
    s.ManageCtl.myMsgCtl.on(c.MyConstans.msg.addGameTime, this.addGameTime, this);
    this.lbTime = this.dict.lbTime.getComponent(cc.Label);
    this._timeCallback = this.timeCallback.bind(this);
  };
  e.prototype.onDestroy = function () {
    cc.game.off("game_success2", this.onGameSuccess, this);
    s.ManageCtl.myMsgCtl.off(c.MyConstans.msg.addGameTime, this.addGameTime, this);
  };
  e.prototype.setState = function (t) {
    this._state = t;
  };
  e.prototype.start = function () {
    if (this._timeCallback) {
      this.schedule(this._timeCallback, 1);
    }
    this.lbTime.string = u.default.formatStr("倒计时:%s", d.MyTool.changeSecondToClock(this._allTime));
  };
  e.prototype.onGameSuccess = function () {
    this.setState(r.win);
  };
  e.prototype.restartTime = function () {
    if (this._initTime != 0) {
      this.lbTime.node.color = cc.Color.WHITE;
      this._allTime = this._initTime;
      this.lbTime.string = u.default.formatStr("倒计时:%s", d.MyTool.changeSecondToClock(this._allTime));
    } else {
      this.node.active = false;
    }
  };
  e.prototype.addGameTime = function (t) {
    if (this._initTime != 0) {
      this.lbTime.node.color = cc.Color.WHITE;
      this._allTime += t;
      this.lbTime.string = u.default.formatStr("倒计时:%s", d.MyTool.changeSecondToClock(this._allTime));
      this.setState(r.play);
    } else {
      this.node.active = false;
    }
  };
  e.prototype.beginTime = function (t) {
    this._initTime = t;
    if (t != 0) {
      this.node.active = true;
      this.restartTime();
      this.setState(r.play);
    } else {
      this.node.active = false;
    }
  };
  e.prototype.hideTime = function () {
    this.node.active = false;
  };
  e.prototype.timeCallback = function () {
    if (this._state == r.play && this.node.active) {
      this._allTime -= 1;
      this.setTime();
    }
  };
  e.prototype.setTime = function () {
    if (this._state == r.play) {
      if (this._allTime < 0) {
        this._allTime = 0;
      }
      this.lbTime.string = u.default.formatStr("倒计时:%s", d.MyTool.changeSecondToClock(this._allTime));
      if (this._allTime <= 3) {
        this.lbTime.node.color = cc.Color.RED;
        this.lbTime.node.stopAllActions();
        this.lbTime.node.scale = 1;
        cc.tween(this.lbTime.node).to(0.3, {
          scale: 1.2
        }).to(0.3, {
          scale: 1
        }).start();
      }
      if (this._allTime <= 0) {
        this.setState(r.lose);
        console.log("## 时间到了");
        return void this.onTimeOut();
      } else {
        return undefined;
      }
    }
  };
  e.prototype.onTimeOut = function () {
    s.ManageCtl.myMsgCtl.emit(c.MyConstans.msg.showPopupView, h.uiPath.uiName.popup_gameLoseView, {
      state: 2
    });
  };
  return a([f, g("ui/gameView_timeNode")], e);
}(l.default);
exports.default = m;