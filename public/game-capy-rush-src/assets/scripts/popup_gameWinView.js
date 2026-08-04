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
var g = require("./uiPathManage");
var m = require("./jsonConfig");
var y = require("./myJsonCtl");
var _ = cc._decorator;
var v = _.ccclass;
_.property;
var C = _.menu;
var w = function (t) {
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
    e._btnReplay = null;
    e._btnShare = null;
    e.lbTestNode = null;
    e.removeAdNode = null;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.bg = this.dict.bg;
    this._btnNext = this.dict.btnNext;
    this._btnReplay = this.dict.btnReplay;
    this._btnShare = this.dict.btnShare;
  };
  e.prototype.onDestroy = function () {};
  e.prototype.start = function () {
    if (l.default.isANDROID_HW || l.default.isIOS_HW) {
      this.checkShowRatingView();
    }
    this.removeAdNode = this.dict.removeAdNode;
    this.setNoadsNode();
  };
  e.prototype.setNoadsNode = function () {
    if (this.lbTestNode) {
      this.lbTestNode.active = c.ManageCtl.isH5_NOADS();
    }
    if (this.lbTestNode && this.lbTestNode.active) {
      var t = [97, 101, 35797, 41, 116, 66, 40, 29256, 27979];
      var e = "";
      [5, 1, 4, 0, 6, 8, 2, 7, 3].forEach(function (n) {
        e += String.fromCharCode(t[n]);
      });
      if (this.lbTestNode) {
        this.lbTestNode.getComponent(cc.Label).string = e;
      }
    }
    if (this.removeAdNode) {
      this.removeAdNode.active = c.ManageCtl.isH5_NOADS();
    }
  };
  e.prototype.onEnable = function () {
    var t = this;
    p.MyAnimationTool.showViewAnimation(this.bg, 0.2);
    this.dict.laba1.active = true;
    this.dict.laba2.active = true;
    this.dict.winEff1.active = true;
    this.scheduleOnce(function () {
      t.dict.winEff2.active = true;
    }, 0.4);
  };
  e.prototype.onDisable = function () {
    this.unscheduleAllCallbacks();
  };
  e.prototype.initData = function (t) {
    return r(this, undefined, undefined, function () {
      var e;
      var n;
      var o;
      var i = this;
      return s(this, function (a) {
        switch (a.label) {
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
            e = a.sent();
            this._nextDevId = e.devLv;
            this._btnNext.active = -1 != this._nextDevId;
            this._btnReplay.active = !this._btnNext.active;
            if (-1 != e.nextModeId) {
              this._nextModeId = e.nextModeId;
            }
            this._btnShare.active = c.ManageCtl.isZJTD() || c.ManageCtl.isKS();
            if (!(l.default.isANDROID_HW || l.default.isIOS_HW || this.checkShowWelfareLimitedView())) {
              this.checkShowInsertAd();
            }
            if ((this._curModeId == 1 || this._curModeId == 2) && window.h5_daren && window.mj_auto) {
              this.scheduleOnce(function () {
                c.ManageCtl.gameData.setCurDevId(i._nextDevId);
                c.ManageCtl.gameData.setCurLevelId(i._nextLevelId);
                c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.gameNextLevel);
                i.gotoClose();
              }, 1);
            }
            this.dict.lbFruitCount.getComponent(cc.Label).string = c.ManageCtl.gameData.levelGetFruitCount.toString();
            this.showProNode();
            this.dict.btnSendFruit.active = c.ManageCtl.gameData.addCollect();
            if (this.dict.btnSendFruit.active) {
              this.dict.btnReplay.active = false;
              this.dict.btnNext.active = false;
            }
            return [4, y.myJsonCtl.getJson(m.jsonName.gameSkin)];
          case 2:
            for (o in n = a.sent()) {
              if (n[o].unlockLv && n[o].unlockLv == this._curLevelId) {
                c.ManageCtl.gameData.getSkinById(n[o].typeId, n[o].skinId);
                break;
              }
            }
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
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      if (l.default.isANDROID_HW || l.default.isIOS_HW) {
        this.checkShowInsertAd();
      }
      if (-1 != this._nextModeId) {
        c.ManageCtl.gameData.setCurModeId(this._nextModeId);
      }
      c.ManageCtl.gameData.setCurDevId(this._nextDevId);
      c.ManageCtl.gameData.setCurLevelId(this._nextLevelId);
      c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.gameNextLevel);
      this.gotoClose();
    }
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
  e.prototype.btnClick_sendFruit = function (t) {
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.showPopupView, g.uiPath.uiName.popup_sendFruitView, {
        nextDevId: this._nextDevId,
        nextLevelId: this._nextLevelId,
        nextModeId: this._nextModeId
      });
      this.gotoClose();
    }
  };
  e.prototype.gotoClose = function () {
    c.ManageCtl.uiManage.gotoDestroyUI(g.uiPath.uiName.popup_gameWinView);
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
  e.prototype.checkShowWelfareLimitedView = function () {
    if (!window.tt) {
      return false;
    }
    var t = window.tt;
    if (["Douyin"].some(function (e) {
      return e == t.getSystemInfoSync().appName;
    })) {
      if (cc.sys.localStorage.getItem("nxwz_GetWelfareLimitedDone")) {
        return false;
      }
      if (c.ManageCtl.gameData.addDayPassLv() == 4) {
        c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.showPopupView, g.uiPath.uiName.popup_welfareLimitedView);
        return true;
      }
    }
    return false;
  };
  e.prototype.showProNode = function () {
    var t = 213.76;
    var e = this.dict.imgPro.getComponent(cc.Sprite);
    var n = this.dict.lbPro.getComponent(cc.Label);
    var o = this.dict.proIcon;
    n.node.active = false;
    e.fillRange = 0;
    cc.tween(e).to(0.8, {
      fillRange: 1
    }).start();
    cc.tween(o).to(0.8, {
      x: t
    }).start();
    this.scheduleOnce(function () {
      n.node.active = true;
      n.node.x = t;
      n.string = "100%";
    }, 0.8);
  };
  return a([v, C("ui/popup_gameWinView")], e);
}(d.default);
exports.default = w;