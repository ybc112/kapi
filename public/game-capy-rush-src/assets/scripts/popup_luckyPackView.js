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
var l = require("./GoldFlyCtl");
var u = require("./Language");
var d = require("./MyAnimationTool");
var h = require("./MyTool");
var p = require("./myBtnClick");
var f = require("./statsCtl");
var g = require("./uiPathManage");
var m = cc._decorator;
var y = m.ccclass;
m.property;
var _ = m.menu;
var v = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e._bg = null;
    e._lbTime = null;
    e._timeCallback = null;
    e._getInfo = {
      remove: {
        propId: s.MyConstans.propId.remove,
        count: 1
      },
      tip: {
        propId: s.MyConstans.propId.tip,
        count: 1
      },
      shuffle: {
        propId: s.MyConstans.propId.shuffle,
        count: 1
      },
      gold: {
        propId: -1,
        count: 50
      }
    };
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this._bg = this.dict.bg;
    this._lbTime = this.dict.lbTime.getComponent(cc.Label);
    this._timeCallback = this.timeCallback.bind(this);
    r.ManageCtl.myMsgCtl.on(s.MyConstans.msg.httpRequestConfigSuccess, this.onhttpRequestConfigSuccess, this);
  };
  e.prototype.onDestroy = function () {
    r.ManageCtl.myMsgCtl.off(s.MyConstans.msg.httpRequestConfigSuccess, this.onhttpRequestConfigSuccess, this);
  };
  e.prototype.start = function () {
    var t = this;
    this.onhttpRequestConfigSuccess();
    this.dict.layoutNode.children.forEach(function (e) {
      var n = e.name;
      var o = t._getInfo[n];
      if (o) {
        e.getChildByName("lbCount").getComponent(cc.Label).string = "x" + o.count;
      } else {
        e.active = false;
      }
    });
    var e = this.dict.waitNode;
    var n = this.dict.btnGet;
    var o = r.ManageCtl.gameData.onLineTime;
    var i = s.MyConstans.num_luckyPackTime;
    if (r.ManageCtl.persistRootNode.resetLuckyPackTime) {
      i = s.MyConstans.num_luckyPackTime_test;
    }
    if (o >= i) {
      this._lbTime.node.parent.active = false;
      this.unschedule(this._timeCallback);
      e.active = false;
      return void (n.active = true);
    }
    this.unschedule(this._timeCallback);
    this.schedule(this.timeCallback, 1);
    var a = i - o;
    this._lbTime.string = h.MyTool.changeSecondToClock(a);
    e.active = true;
    n.active = false;
  };
  e.prototype.onEnable = function () {
    var t = this;
    this._bg.scale = 0;
    this.scheduleOnce(function () {
      d.MyAnimationTool.showViewAnimation(t._bg);
    });
  };
  e.prototype.btnClick_cancel = function (t) {
    if (p.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      this.gotoClose();
    }
  };
  e.prototype.btnClick_wait = function (t) {
    if (p.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      r.ManageCtl.persistRootNode.showTipsUI("累计登录15分钟才能获得奖励");
    }
  };
  e.prototype.btnClick_get = function (t) {
    var e = this;
    if (p.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      r.ManageCtl.playVideo(function () {
        var t = r.ManageCtl.gameData.getCurModeId();
        var n = r.ManageCtl.gameData.getCurDevId();
        var o = r.ManageCtl.gameData.getCurLevelId();
        f.statsCtl.sendEventShuShu("reward_btn", {
          mode: t,
          devid: n,
          lv: o,
          progress: r.ManageCtl.gameData.getGameProgress(),
          scene: "luckygift"
        });
        var i = r.ManageCtl.bmsCtl.getConditionValueByType("luckygift") || 1;
        if (!r.ManageCtl.gameData.addLuckyPackUnlock(1)) {
          var a = r.ManageCtl.gameData.getLuckyPackInfo();
          var c = i - a.count;
          r.ManageCtl.persistRootNode.showTipsUI(u.default.formatStr("已观看%d个视频，剩余%d个视频", a.count, c));
          return void e.onhttpRequestConfigSuccess();
        }
        var d = [];
        var h = 0;
        for (var p in e._getInfo) {
          var g = e._getInfo[p].propId;
          var m = e._getInfo[p].count;
          if (-1 != g) {
            d.push([g, m]);
          } else {
            h = m;
            r.ManageCtl.gameData.addGoldCount(m);
            r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.updateGoldCount);
          }
        }
        r.ManageCtl.gameData.setLuckyPackInfoDone();
        r.ManageCtl.gameData.addDayPropByIdArr(d);
        r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.updatePropCount);
        r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.getLuckyPackDone);
        r.ManageCtl.persistRootNode.showTipsUI("恭喜获得幸运礼包奖励");
        if (h > 0 && window.game_goldNode) {
          var y = window.game_goldNode;
          var _ = y.parent.convertToWorldSpaceAR(y.position);
          l.default.GetInstance().showFlyGold(_, h);
        }
        e.gotoClose();
      });
    }
  };
  e.prototype.gotoClose = function () {
    r.ManageCtl.uiManage.hideUI(g.uiPath.uiName.popup_luckyPackView);
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
      this._lbTime.string = h.MyTool.changeSecondToClock(n);
      if (n <= 0) {
        this._lbTime.node.parent.active = false;
        this.unschedule(this._timeCallback);
        var o = this.dict.waitNode;
        var i = this.dict.btnGet;
        o.active = false;
        return void (i.active = true);
      }
    }
  };
  e.prototype.onhttpRequestConfigSuccess = function () {
    var t = r.ManageCtl.bmsCtl.getConditionValueByType("luckygift") || 1;
    var e = this.dict.lbVideoCount.getComponent(cc.Label);
    if (t <= 1) {
      e.node.active = false;
    } else {
      e.node.active = true;
      var n = r.ManageCtl.gameData.getLuckyPackInfo();
      e.string = "(" + n.count + "/" + t + ")";
    }
  };
  return a([y, _("ui/popup_luckyPackView")], e);
}(c.default);
exports.default = v;