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
var d = require("./Language");
var h = require("./MyAnimationTool");
var p = require("./MyTool");
var f = require("./myBtnClick");
var g = require("./statsCtl");
var m = require("./uiPathManage");
var y = cc._decorator;
var _ = y.ccclass;
y.property;
var v = y.menu;
var C = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.bg = null;
    e.imgPro = null;
    e.doneNode = null;
    e.lockNode = null;
    e.lbUnlockNum = null;
    e.lbUnlockNum2 = null;
    e._lbUnlockAllTime = null;
    e._curModeId = 1;
    e._curDevId = 1;
    e._curLevelId = 1;
    e._unlockAllLvTimeCallback = null;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.bg = this.dict.bg;
    this.imgPro = this.dict.imgPro.getComponent(cc.Sprite);
    this.doneNode = this.dict.doneNode;
    this.lockNode = this.dict.lockNode;
    this.lbUnlockNum = this.dict.lbUnlockNum.getComponent(cc.Label);
    this.lbUnlockNum2 = this.dict.lbUnlockNum2.getComponent(cc.Label);
    this._lbUnlockAllTime = this.dict.lbUnlockAllTime.getComponent(cc.Label);
    this._unlockAllLvTimeCallback = this.unlockAllLvTimeCallback.bind(this);
    c.ManageCtl.myMsgCtl.on(l.MyConstans.msg.unlockAllLvTimeOut, this.onunlockAllLvTimeOut, this);
  };
  e.prototype.onDestroy = function () {
    c.ManageCtl.myMsgCtl.off(l.MyConstans.msg.unlockAllLvTimeOut, this.onunlockAllLvTimeOut, this);
  };
  e.prototype.onEnable = function () {
    h.MyAnimationTool.showViewAnimation(this.bg);
  };
  e.prototype.start = function () {
    this.initData2();
  };
  e.prototype.onDisable = function () {};
  e.prototype.initData2 = function () {
    return r(this, undefined, undefined, function () {
      var t;
      return s(this, function (e) {
        switch (e.label) {
          case 0:
            this._curModeId = c.ManageCtl.gameData.getCurModeId();
            t = this;
            return [4, c.ManageCtl.gameData.getCurDevId()];
          case 1:
            t._curDevId = e.sent();
            this._curLevelId = c.ManageCtl.gameData.getCurLevelId();
            this.updateProShow();
            return [2];
        }
      });
    });
  };
  e.prototype.gotoClose = function () {
    c.ManageCtl.uiManage.gotoDestroyUI(m.uiPath.uiName.popup_unlockAllLvView);
  };
  e.prototype.btnClick_close = function (t) {
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      this.gotoClose();
    }
  };
  e.prototype.btnClick_freeKey = function (t) {
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.showPopupView, m.uiPath.uiName.popup_welfareLimitedView);
    }
  };
  e.prototype.btnClick_unlockAllLv = function (t) {
    var e = this;
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      c.ManageCtl.playVideo(function () {
        if (e.node && cc.isValid(e.node)) {
          g.statsCtl.sendEventShuShu("reward_btn", {
            mode: e._curModeId,
            devid: e._curDevId,
            lv: e._curLevelId,
            progress: c.ManageCtl.gameData.getGameProgress(),
            scene: "unlockall",
            lvgrade: c.ManageCtl.gameData.game_lvgrade
          });
          var t = c.ManageCtl.gameData.getCurModeId();
          if (c.ManageCtl.gameData.addUnlockAllCount(t, 1)) {
            c.ManageCtl.persistRootNode.showTipsUI("恭喜全部解锁");
            e.updateProShow();
            c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.unlockAllLvDone);
            return void e.gotoClose();
          }
          var n = c.ManageCtl.gameData.getUnlockAllInfo(t);
          var o = c.ManageCtl.bmsCtl.getConditionValueByType("UnlockAllLevelNum") - n.unlockCount;
          c.ManageCtl.persistRootNode.showTipsUI(d.default.formatStr("再看%d次视频即可全部解锁", o));
          e.updateProShow();
        }
      });
    }
  };
  e.prototype.updateProShow = function () {
    var t = c.ManageCtl.gameData.getCurModeId();
    var e = c.ManageCtl.gameData.getUnlockAllInfo(t);
    var n = e.unlockCount;
    var o = c.ManageCtl.bmsCtl.getConditionValueByType("UnlockAllLevelNum");
    this.lbUnlockNum.string = n + "/" + o;
    this.lbUnlockNum2.string = "再观看(" + n + "/" + o + ")次视频";
    var i = o - e.unlockCount;
    if (i < 0) {
      i = 0;
    }
    this.dict.btnUnlockAll.active = i > 0;
    var a = n / o;
    if (a > 1) {
      a = 1;
    }
    this.imgPro.fillRange = a;
    this.doneNode.active = i <= 0;
    this.lockNode.active = !this.doneNode.active;
    this.updateAllUnlockCount();
  };
  e.prototype.updateAllUnlockCount = function () {
    var t = c.ManageCtl.gameData.getCurModeId();
    var e = c.ManageCtl.gameData.getUnlockAllInfo(t);
    if (-1 != e.unlockTime) {
      var n = (new Date().getTime() - e.unlockTime) / 1000;
      if (l.MyConstans.num_allUnlockLvAllTime - n > 0) {
        this.unschedule(this._unlockAllLvTimeCallback);
        this._unlockAllLvTimeCallback();
        this.schedule(this._unlockAllLvTimeCallback, 1);
      } else {
        this.unschedule(this._unlockAllLvTimeCallback);
        c.ManageCtl.gameData.resetUnlockAllInfo(t);
        this.doneNode.active = false;
        this.lockNode.active = !this.doneNode.active;
        this.updateProShow();
      }
    }
  };
  e.prototype.unlockAllLvTimeCallback = function () {
    var t = c.ManageCtl.gameData.getCurModeId();
    var e = c.ManageCtl.gameData.getUnlockAllInfo(t);
    var n = (new Date().getTime() - e.unlockTime) / 1000;
    var o = l.MyConstans.num_allUnlockLvAllTime - n;
    if (o > 0) {
      this._lbUnlockAllTime.string = p.MyTool.changeSecondToClock(o);
    } else {
      this.unschedule(this._unlockAllLvTimeCallback);
      c.ManageCtl.gameData.resetUnlockAllInfo(t);
      this.doneNode.active = false;
      this.lockNode.active = !this.doneNode.active;
      this.updateProShow();
    }
  };
  e.prototype.onunlockAllLvTimeOut = function () {
    this.updateProShow();
  };
  return a([_, v("ui/popup_unlockAllLvView")], e);
}(u.default);
exports.default = C;