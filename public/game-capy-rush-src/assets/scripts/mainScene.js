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
var c = require("./GameTimeCtl");
var l = require("./ManageCtl");
var u = require("./MyPlatform");
var d = require("./SdkConfig");
var h = require("./baseCompont");
var p = require("./AudioManager");
var f = require("./MyTool");
var g = require("./UUIDCheckCtl");
var m = require("./uiPathManage");
var y = require("./myJsonCtl");
var _ = require("./ServerData_tt");
var v = cc._decorator;
var C = v.ccclass;
v.property;
var w = function (t) {
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    c.default.GetInstance().init();
    if (l.ManageCtl.isWx() || l.ManageCtl.isH5_NOADS()) {
      l.ManageCtl.persistRootNode.showOtherMode = false;
    }
    p.default.isMusicOn = l.ManageCtl.gameData.getMusicSwitch();
    p.default.isAudioOn = l.ManageCtl.gameData.getSoundSwitch();
    window.game_musicOpen = p.default.isMusicOn;
    window.game_audioOpen = p.default.isAudioOn;
    window.mainSceneInitChildCount = this.node.childrenCount;
    window.mainScene = this;
    l.ManageCtl.myMsgCtl.on(d.MyConstans.msg.showMainView, this.onshowMainView, this);
    l.ManageCtl.myMsgCtl.on(d.MyConstans.msg.showLevelView, this.onshowLevelView, this);
    l.ManageCtl.myMsgCtl.on(d.MyConstans.msg.showGameView, this.onshowGameView, this);
    l.ManageCtl.myMsgCtl.on(d.MyConstans.msg.showPopupView, this.onshowPopupView, this);
    l.ManageCtl.myMsgCtl.on(d.MyConstans.msg.getServerData, this.ongetServerData, this);
    cc.game.on("showDebugView", this.onShowDebugView, this);
    cc.game.on("showDebugView2", this.onShowDebugView2, this);
    cc.game.on("game_getUUIDDone", this.onGame_getUUIDDone, this);
    cc.game.on("game_checkResumeBgm", this.onGame_checkResumeBgm, this);
  };
  e.prototype.onDestroy = function () {
    l.ManageCtl.myMsgCtl.off(d.MyConstans.msg.showMainView, this.onshowMainView, this);
    l.ManageCtl.myMsgCtl.off(d.MyConstans.msg.showLevelView, this.onshowLevelView, this);
    l.ManageCtl.myMsgCtl.off(d.MyConstans.msg.showGameView, this.onshowGameView, this);
    l.ManageCtl.myMsgCtl.off(d.MyConstans.msg.showPopupView, this.onshowPopupView, this);
    l.ManageCtl.myMsgCtl.off(d.MyConstans.msg.getServerData, this.ongetServerData, this);
    cc.game.off("showDebugView", this.onShowDebugView, this);
    cc.game.off("showDebugView2", this.onShowDebugView2, this);
    cc.game.off("game_getUUIDDone", this.onGame_getUUIDDone, this);
    cc.game.off("game_checkResumeBgm", this.onGame_checkResumeBgm, this);
  };
  e.prototype.start = function () {
    return r(this, undefined, undefined, function () {
      var t;
      var e;
      var n;
      var o;
      var i;
      var a;
      return s(this, function (r) {
        switch (r.label) {
          case 0:
            f.MyTool.screenAdaptation();
            if (l.ManageCtl.gameData.getOpenGameCount() <= 1) {
              l.ManageCtl.gameData.setCurModeId(1);
              t = l.ManageCtl.gameData.getPassLvByMode(1);
              e = t + 1;
              l.ManageCtl.gameData.setCurLevelId(e);
              return [4, y.myJsonCtl.getJson(l.ManageCtl.getModeNameByModeId(1))];
            } else {
              return [3, 2];
            }
          case 1:
            n = r.sent();
            o = f.MyTool.getJsonLength(n);
            if (e > o) {
              if (o >= 2) {
                i = f.MyTool.myRandom(11, o);
                e = i;
              } else {
                e = 1;
              }
            }
            a = n[e].LevelId1;
            l.ManageCtl.gameData.setCurDevId(a);
            l.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.showGameView);
            l.ManageCtl.gameData.setNotSaveFlagData(d.MyConstans.projectName + "_secondInMain", {});
            this.beforLoadUIPrefab();
            return [3, 3];
          case 2:
            this.onshowMainView();
            r.label = 3;
          case 3:
            window.game_turtleProgress = 0;
            if (l.ManageCtl.isH5_NOADS()) {
              window.game_isNOADS = true;
              window.h5_daren = true;
            } else {
              window.game_isNOADS = false;
              window.h5_daren = false;
            }
            this.onGame_getUUIDDone();
            return [2];
        }
      });
    });
  };
  e.prototype.onshowMainView = function (t) {
    if (t === undefined) {
      t = {};
    }
    l.ManageCtl.uiManage.gotoDestroyUI(m.uiPath.uiName.levelView);
    l.ManageCtl.uiManage.gotoDestroyUI(m.uiPath.uiName.gameView);
    l.ManageCtl.uiManage.showUI(m.uiPath.uiName.mainView, this.node, t);
  };
  e.prototype.onshowLevelView = function (t) {
    if (t === undefined) {
      t = {};
    }
    l.ManageCtl.uiManage.gotoDestroyUI(m.uiPath.uiName.mainView);
    l.ManageCtl.uiManage.gotoDestroyUI(m.uiPath.uiName.gameView);
    l.ManageCtl.uiManage.gotoDestroyUI(m.uiPath.uiName.buildView);
    l.ManageCtl.uiManage.showUI(m.uiPath.uiName.levelView, this.node, t);
  };
  e.prototype.onshowGameView = function (t) {
    if (t === undefined) {
      t = {};
    }
    l.ManageCtl.uiManage.gotoDestroyUI(m.uiPath.uiName.levelView);
    l.ManageCtl.uiManage.gotoDestroyUI(m.uiPath.uiName.mainView);
    l.ManageCtl.uiManage.gotoDestroyUI(m.uiPath.uiName.buildView);
    l.ManageCtl.uiManage.gotoDestroyUI(m.uiPath.uiName.popup_modeView);
    l.ManageCtl.uiManage.showUI(m.uiPath.uiName.gameView, this.node, t);
  };
  e.prototype.onshowPopup_setView = function (t) {
    if (t === undefined) {
      t = {};
    }
    l.ManageCtl.uiManage.showUI(m.uiPath.uiName.popup_setView, this.node, t);
  };
  e.prototype.onshowPopup_collectView = function (t) {
    if (t === undefined) {
      t = {};
    }
    l.ManageCtl.uiManage.showUI(m.uiPath.uiName.popup_collectView, this.node, t);
  };
  e.prototype.onShowDebugView = function () {
    l.ManageCtl.uiManage.showUI(m.uiPath.uiName.debugView, cc.find("Canvas"));
  };
  e.prototype.onShowDebugView2 = function () {
    l.ManageCtl.uiManage.showUI(m.uiPath.uiName.debugView2, cc.find("Canvas"));
  };
  e.prototype.onshowPopupView = function (t, e) {
    if (e === undefined) {
      e = {};
    }
    l.ManageCtl.uiManage.showUI(t, this.node, e);
  };
  e.prototype.ongetServerData = function () {
    _.default.GetInstance().checkGetServerData();
  };
  e.prototype.onGame_getUUIDDone = function () {
    console.log("## get onGame_getUUIDDone");
    _.default.GetInstance().checkGetServerData();
    if (l.ManageCtl.gameData.getOpenAutoFlag() == 1) {
      if (window.ywkjTT_openidStr == null || window.ywkjTT_openidStr == "null" || window.ywkjTT_openidStr == "") {
        return;
      }
      var t = window.ywkjTT_openidStr;
      if (t.length > 7) {
        t = t.slice(-7);
      }
      var e = t.toUpperCase();
      g.default.GetInstance().checkInWhitelist("ywpk11bd1g62nl2ifhmj", e, function () {
        console.log("##  自动开启成功");
        u.default.isH5_NOADS = true;
        window.game_isNOADS = true;
        window.h5_daren = true;
        l.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.openDr);
      }, function () {
        console.log("## 关闭自动");
        l.ManageCtl.gameData.setOpenAutoFlag(0);
      });
    }
  };
  e.prototype.onGame_checkResumeBgm = function () {
    p.default.instance.resumeBGM2();
  };
  e.prototype.beforLoadUIPrefab = function () {
    var t = this;
    cc.assetManager.loadBundle("local", function (e, n) {
      if (!e) {
        t.loadUIPrefab2(n);
      }
    });
  };
  e.prototype.loadUIPrefab2 = function (t) {
    for (var e = ["popup_gameLoseView", "popup_gameWinView", "popup_gameBackView", "popup_sendFruitView"], n = 0; n < e.length; n++) {
      var o = "prefab/" + e[n];
      t.load(o, function (t) {
        if (!t) {
          console.log("## 预加载完成");
        }
      });
    }
  };
  return a([C], e);
}(h.default);
exports.default = w;