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
var l = require("./MyPlatform");
var u = require("./SdkConfig");
var d = require("./baseCompont");
var h = require("./MyAdCtl");
var p = require("./MyAnimationTool");
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
    e._curModeId = 1;
    e._curDevId = 1;
    e._curLevelId = 1;
    e._nextDevId = -1;
    e._nextLevelId = 1;
    e._nextModeId = -1;
    e._btnNext = null;
    e._btnShare = null;
    e._nextVideoIcon = null;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.bg = this.dict.bg;
    this._btnNext = this.dict.btnNext;
    this._btnShare = this.dict.btnShare;
    this._nextVideoIcon = this.dict.nextVideoIcon;
  };
  e.prototype.onDestroy = function () {};
  e.prototype.start = function () {
    if (l.default.isANDROID_HW || l.default.isIOS_HW) {
      this.checkShowRatingView();
    }
  };
  e.prototype.onEnable = function () {
    p.MyAnimationTool.showViewAnimation(this.bg, 0.2);
  };
  e.prototype.onDisable = function () {
    this.unscheduleAllCallbacks();
  };
  e.prototype.initData = function (t) {
    return r(this, undefined, undefined, function () {
      var e;
      var n;
      var o = this;
      return s(this, function (i) {
        switch (i.label) {
          case 0:
            this.scheduleOnce(function () {
              c.ManageCtl.audioManager.PlayEffect("a_success", false);
            }, 0.2);
            this._curModeId = t.modeId;
            this._curDevId = t.devLv;
            this._curLevelId = t.curLevelId;
            this._nextLevelId = this._curLevelId + 1;
            return [4, c.ManageCtl.gameData.getNextDevLv(this._curModeId, this._curLevelId, this._curDevId)];
          case 1:
            e = i.sent();
            this._nextDevId = e.devLv;
            if (-1 != e.nextModeId) {
              this._nextModeId = e.nextModeId;
            }
            n = c.ManageCtl.gameData.checkModeIsUnlock(this._curModeId);
            this._nextVideoIcon.active = !n;
            this._btnShare.active = c.ManageCtl.isZJTD() || c.ManageCtl.isKS();
            if (!(l.default.isANDROID_HW || l.default.isIOS_HW)) {
              this.checkShowInsertAd();
            }
            if ((this._curModeId == 1 || this._curModeId == 2) && window.h5_daren && window.mj_auto) {
              this.scheduleOnce(function () {
                c.ManageCtl.gameData.setCurDevId(o._nextDevId);
                c.ManageCtl.gameData.setCurLevelId(o._nextLevelId);
                c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.gameNextLevel);
                o.gotoClose();
              }, 1);
            }
            this.checkShowHomeRedPosNode();
            return [2];
        }
      });
    });
  };
  e.prototype.btnClick_replay = function (t) {
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.gameRestart);
      this.gotoClose();
    }
  };
  e.prototype.btnClick_back = function (t) {
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      c.ManageCtl.gameData.setCurDevId(this._nextDevId);
      c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.showMainView);
      this.gotoClose();
    }
  };
  e.prototype.btnClick_next = function (t) {
    var e = this;
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      if (this._nextVideoIcon.active) {
        c.ManageCtl.playVideo(function () {
          g.statsCtl.sendEventShuShu("reward_btn", {
            mode: e._curModeId,
            devid: e._curDevId,
            lv: e._curLevelId,
            progress: c.ManageCtl.gameData.getGameProgress(),
            scene: "next",
            lvgrade: c.ManageCtl.gameData.game_lvgrade
          });
          e.gotoNext();
        });
      } else {
        this.gotoNext();
      }
    }
  };
  e.prototype.gotoNext = function () {
    if (-1 != this._nextModeId) {
      c.ManageCtl.gameData.setCurModeId(this._nextModeId);
    }
    c.ManageCtl.gameData.setCurDevId(this._nextDevId);
    c.ManageCtl.gameData.setCurLevelId(this._nextLevelId);
    c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.gameNextLevel);
    this.gotoClose();
  };
  e.prototype.btnClick_share = function (t) {
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      l.default.instance.shareRecordCap(function (t) {
        if (t == 0) {
          c.ManageCtl.persistRootNode.showTipsUI("分享成功");
        } else if (-1 == t) {
          c.ManageCtl.persistRootNode.showTipsUI("录屏时间过短，无法分享");
        }
      });
    }
  };
  e.prototype.btnClick_shareWx = function (t) {
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      l.default.instance.share(function (t) {
        if (t == 0) {
          c.ManageCtl.persistRootNode.showTipsUI("分享成功");
        }
      });
    }
  };
  e.prototype.gotoClose = function () {
    c.ManageCtl.uiManage.gotoDestroyUI(m.uiPath.uiName.popup_gameWinOtherView);
  };
  e.prototype.checkShowInsertAd = function () {
    if (c.ManageCtl.bmsCtl.getConditionValueByType("ScreenAd20") > 0) {
      if (this._curModeId != 1) {
        h.MyAdCtl.showInsertAd();
        return true;
      }
      var t = c.ManageCtl.bmsCtl.getConditionValueByType("AdCheckpoint");
      if (t.length >= 2) {
        var e = t[0];
        var n = t[1];
        if (e == 0 && n == 0) {
          return false;
        }
        var o = this._curLevelId;
        if (o >= e) {
          if (o == e) {
            h.MyAdCtl.showInsertAd();
            return true;
          }
          if ((o - e) % n == 0) {
            h.MyAdCtl.showInsertAd();
            return true;
          }
        }
      }
    }
  };
  e.prototype.checkShowRatingView = function () {};
  e.prototype.checkShowHomeRedPosNode = function () {
    var t = c.ManageCtl.gameData.getSignInInfo();
    this.dict.homeRedNode.active = t.index <= 2 && t.freeDone == 0 || t.index == 3 && t.done == 0;
  };
  return a([_, v("ui/popup_gameWinOtherView")], e);
}(d.default);
exports.default = C;