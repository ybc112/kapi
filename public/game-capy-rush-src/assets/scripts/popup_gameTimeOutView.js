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
var l = require("./MyAnimationTool");
var u = require("./myBtnClick");
var d = require("./statsCtl");
var h = require("./uiPathManage");
var p = cc._decorator;
var f = p.ccclass;
p.property;
var g = p.menu;
var m = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.bg = null;
    e._addTime = 300;
    e._curModeId = 1;
    e._curDevId = 1;
    e._curLevelId = 1;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.bg = this.dict.bg;
  };
  e.prototype.onEnable = function () {
    l.MyAnimationTool.showViewAnimation(this.bg);
  };
  e.prototype.start = function () {
    this.initData2();
  };
  e.prototype.onDisable = function () {};
  e.prototype.initData2 = function () {
    this._curModeId = r.ManageCtl.gameData.getCurModeId();
    this._curDevId = r.ManageCtl.gameData.getCurModeId();
    this._curLevelId = r.ManageCtl.gameData.getCurModeId();
    this._addTime = r.ManageCtl.bmsCtl.getConditionValueByType("AddTime");
    this.dict.lbTime.getComponent(cc.Label).string = "增加" + this._addTime + "s";
    this.dict.lbTime2.getComponent(cc.Label).string = "需要观看广告增加" + this._addTime + "s";
  };
  e.prototype.gotoClose = function () {
    r.ManageCtl.uiManage.gotoDestroyUI(h.uiPath.uiName.popup_gameTimeOutView);
  };
  e.prototype.btnClick_close = function (t) {
    if (u.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.gameRestart);
      this.gotoClose();
    }
  };
  e.prototype.btnClick_addTime = function (t) {
    var e = this;
    if (u.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      r.ManageCtl.playVideo(function () {
        if (e.node && cc.isValid(e.node)) {
          d.statsCtl.sendEventShuShu("reward_btn", {
            mode: e._curModeId,
            devid: e._curDevId,
            lv: e._curLevelId,
            progress: r.ManageCtl.gameData.getGameProgress(),
            scene: "addtime",
            lvgrade: r.ManageCtl.gameData.game_lvgrade
          });
          d.statsCtl.sendEventShuShu("Level_AddTime", {
            mode: e._curModeId,
            devid: e._curDevId,
            lv: e._curLevelId,
            lvgrade: r.ManageCtl.gameData.game_lvgrade
          });
          r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.addGameTime, e._addTime);
          e.gotoClose();
        }
      });
    }
  };
  return a([f, g("ui/popup_gameTimeOutView")], e);
}(c.default);
exports.default = m;