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
var r = this && this.__awaiter || function (t, e, n, o) {
  return new (n || (n = Promise))(function (i, a) {
    function r(t) {
      try {
        c(o.next(t));
      } catch (e) {
        a(e);
      }
    }
    function s(t) {
      try {
        c(o.throw(t));
      } catch (e) {
        a(e);
      }
    }
    function c(t) {
      var e;
      if (t.done) {
        i(t.value);
      } else {
        (e = t.value, e instanceof n ? e : new n(function (t) {
          t(e);
        })).then(r, s);
      }
    }
    c((o = o.apply(t, e || [])).next());
  });
};
var s = this && this.__generator || function (t, e) {
  var n;
  var o;
  var i;
  var a;
  var r = {
    label: 0,
    sent: function () {
      if (1 & i[0]) {
        throw i[1];
      }
      return i[1];
    },
    trys: [],
    ops: []
  };
  a = {
    next: s(0),
    throw: s(1),
    return: s(2)
  };
  if (typeof Symbol == "function") {
    a[Symbol.iterator] = function () {
      return this;
    };
  }
  return a;
  function s(t) {
    return function (e) {
      return c([t, e]);
    };
  }
  function c(a) {
    if (n) {
      throw new TypeError("Generator is already executing.");
    }
    for (; r;) {
      try {
        n = 1;
        if (o && (i = 2 & a[0] ? o.return : a[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, a[1])).done) {
          return i;
        }
        o = 0;
        if (i) {
          a = [2 & a[0], i.value];
        }
        switch (a[0]) {
          case 0:
          case 1:
            i = a;
            break;
          case 4:
            r.label++;
            return {
              value: a[1],
              done: false
            };
          case 5:
            r.label++;
            o = a[1];
            a = [0];
            continue;
          case 7:
            a = r.ops.pop();
            r.trys.pop();
            continue;
          default:
            if (!(i = (i = r.trys).length > 0 && i[i.length - 1]) && (a[0] === 6 || a[0] === 2)) {
              r = 0;
              continue;
            }
            if (a[0] === 3 && (!i || a[1] > i[0] && a[1] < i[3])) {
              r.label = a[1];
              break;
            }
            if (a[0] === 6 && r.label < i[1]) {
              r.label = i[1];
              i = a;
              break;
            }
            if (i && r.label < i[2]) {
              r.label = i[2];
              r.ops.push(a);
              break;
            }
            if (i[2]) {
              r.ops.pop();
            }
            r.trys.pop();
            continue;
        }
        a = e.call(t, r);
      } catch (s) {
        a = [6, s];
        o = 0;
      } finally {
        n = i = 0;
      }
    }
    if (5 & a[0]) {
      throw a[1];
    }
    return {
      value: a[0] ? a[1] : undefined,
      done: true
    };
  }
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var c = require("./ManageCtl");
var l = require("./SdkConfig");
var u = require("./baseCompont");
var d = require("./GoldFlyCtl");
var h = require("./Language");
var p = require("./MyAnimationTool");
var f = require("./myBtnClick");
var g = require("./statsCtl");
var m = require("./uiPathManage");
var y = require("./myJsonCtl");
var _ = cc._decorator;
var v = _.ccclass;
_.property;
var C = _.menu;
var w = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e._bg = null;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this._bg = this.dict.bg;
    c.ManageCtl.myMsgCtl.on(l.MyConstans.msg.updatePigCount, this.onupdatePigCount, this);
  };
  e.prototype.onDestroy = function () {
    c.ManageCtl.myMsgCtl.off(l.MyConstans.msg.updatePigCount, this.onupdatePigCount, this);
  };
  e.prototype.start = function () {
    this.onupdatePigCount();
  };
  e.prototype.onEnable = function () {
    var t = this;
    this._bg.scale = 0;
    this.scheduleOnce(function () {
      p.MyAnimationTool.showViewAnimation(t._bg);
    });
  };
  e.prototype.btnClick_cancel = function (t) {
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      this.gotoClose();
    }
  };
  e.prototype.btnClick_get = function (t) {
    var e = this;
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      c.ManageCtl.playVideo(function () {
        var t = c.ManageCtl.gameData.getCurModeId();
        var n = c.ManageCtl.gameData.getCurDevId();
        var o = c.ManageCtl.gameData.getCurLevelId();
        g.statsCtl.sendEventShuShu("reward_btn", {
          mode: t,
          devid: n,
          lv: o,
          progress: c.ManageCtl.gameData.getGameProgress(),
          scene: "pigbank",
          lvgrade: c.ManageCtl.gameData.game_lvgrade
        });
        var i = c.ManageCtl.gameData.getPigCount();
        c.ManageCtl.gameData.addGoldCount(i);
        c.ManageCtl.gameData.resetPigCount();
        c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.updatePigCount);
        c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.updateGoldCount);
        c.ManageCtl.persistRootNode.showTipsUI(h.default.formatStr("恭喜获得%d金币", i));
        if (window.game_goldNode) {
          var a = window.game_goldNode;
          var r = a.parent.convertToWorldSpaceAR(a.position);
          d.default.GetInstance().showFlyGold(r, i);
        }
        e.gotoClose();
      });
    }
  };
  e.prototype.btnClick_wait = function (t) {
    return r(this, undefined, undefined, function () {
      var e;
      var n;
      var o;
      var i;
      var a;
      return s(this, function (r) {
        switch (r.label) {
          case 0:
            if (f.default.instance.baseBtnClick(this.node.name + t.target.name)) {
              e = 1;
              n = c.ManageCtl.gameData.getCurPassLevelId();
              o = n + 1;
              c.ManageCtl.gameData.setCurModeId(e);
              c.ManageCtl.gameData.setCurLevelId(o);
              return [4, y.myJsonCtl.getJson(c.ManageCtl.getModeNameByModeId(e))];
            } else {
              return [2];
            }
          case 1:
            i = r.sent();
            o = c.ManageCtl.getOtherLevelId(e, o, i);
            a = i[o].LevelId1;
            c.ManageCtl.gameData.setCurDevId(a);
            c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.showGameView);
            c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.gameReLoadLevel);
            c.ManageCtl.uiManage.gotoDestroyUI(m.uiPath.uiName.popup_gameWinView);
            c.ManageCtl.uiManage.gotoDestroyUI(m.uiPath.uiName.popup_gameLoseView2);
            this.gotoClose();
            return [2];
        }
      });
    });
  };
  e.prototype.gotoClose = function () {
    c.ManageCtl.uiManage.hideUI(m.uiPath.uiName.popup_pigBankView);
  };
  e.prototype.onupdatePigCount = function () {
    var t = this.dict.lbPigCount.getComponent(cc.Label);
    var e = this.dict.lbPigMin.getComponent(cc.Label);
    var n = this.dict.lbPigMax.getComponent(cc.Label);
    var o = this.dict.lbMinTip.getComponent(cc.Label);
    var i = this.dict.lbMaxTip.getComponent(cc.Label);
    var a = this.dict.lbPassGet.getComponent(cc.Label);
    var r = c.ManageCtl.gameData.getPigCount();
    t.string = r.toString();
    e.string = l.MyConstans.num_pigMin.toString();
    n.string = l.MyConstans.num_pigMax.toString();
    o.string = h.default.formatStr("满%d金币可以领取", l.MyConstans.num_pigMin);
    i.string = h.default.formatStr("最多可存储%d金币", l.MyConstans.num_pigMax);
    a.string = h.default.formatStr("每次通过关卡可存入%d金币", l.MyConstans.num_pigPassLvGet);
    this.dict.imgPro.getComponent(cc.Sprite).fillRange = r / l.MyConstans.num_pigMax;
    this.dict.btnGet.active = r >= l.MyConstans.num_pigMin;
    this.dict.btnWait.active = !this.dict.btnGet.active;
  };
  return a([v, C("ui/popup_pigBankView")], e);
}(u.default);
exports.default = w;