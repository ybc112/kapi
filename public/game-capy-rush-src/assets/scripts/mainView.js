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
var u = require("./RankCtl");
var d = require("./SdkConfig");
var h = require("./baseCompont");
var p = require("./MyAnimationTool");
var f = require("./MyTool");
var g = require("./myBtnClick");
var m = require("./uiPathManage");
var y = require("./myJsonCtl");
var _ = cc._decorator;
var v = _.ccclass;
_.property;
var C = _.menu;
var w = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e._lbVersion = null;
    e.lbTestNode = null;
    e.removeAdNode = null;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.init();
    this.beforLoadUIPrefab();
    cc.game.on("showDebugView", this.onShowDebugView, this);
    c.ManageCtl.myMsgCtl.on(d.MyConstans.msg.getInviteDone, this.ongetInviteDone, this);
    c.ManageCtl.myMsgCtl.on(d.MyConstans.msg.getSignInDone, this.ongetSignInDone, this);
    c.ManageCtl.myMsgCtl.on(d.MyConstans.msg.httpRequestConfigSuccess, this.onhttpRequestConfigSuccess, this);
    c.ManageCtl.myMsgCtl.on(d.MyConstans.msg.updateSkinRed, this.onUpdateSkinRed, this);
    c.ManageCtl.myMsgCtl.on(d.MyConstans.msg.getFavoriteDone, this.ongetFavoriteDone, this);
  };
  e.prototype.onDestroy = function () {
    cc.game.off("showDebugView", this.onShowDebugView, this);
    c.ManageCtl.myMsgCtl.off(d.MyConstans.msg.getInviteDone, this.ongetInviteDone, this);
    c.ManageCtl.myMsgCtl.off(d.MyConstans.msg.getSignInDone, this.ongetSignInDone, this);
    c.ManageCtl.myMsgCtl.off(d.MyConstans.msg.httpRequestConfigSuccess, this.onhttpRequestConfigSuccess, this);
    c.ManageCtl.myMsgCtl.off(d.MyConstans.msg.updateSkinRed, this.onUpdateSkinRed, this);
    c.ManageCtl.myMsgCtl.off(d.MyConstans.msg.getFavoriteDone, this.ongetFavoriteDone, this);
  };
  e.prototype.start = function () {
    c.ManageCtl.audioManager.pauseBGM();
    c.ManageCtl.audioManager.PlayBGM("a_homeBg1");
    this.loadList();
    this.onhttpRequestConfigSuccess();
    var t = this.dict.btnBegin;
    p.MyAnimationTool.scaleAnimation_continue(t, 0.05, 0.05);
    this.dict.btnRank.active = c.ManageCtl.isZJTD() && window.tt && window.tt.getImRankList || c.ManageCtl.isWx();
    this.dict.btnPrivate.active = l.default.isVIVO || l.default.isOPPO;
    var e = c.ManageCtl.gameData.getPassLvByMode(1) + 1;
    this.dict.lbCurLv.getComponent(cc.Label).string = "第" + e + "关";
    this.onShowDebugView();
    c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.getServerData);
    this.ongetInviteDone();
    this.ongetSignInDone();
    this.onUpdateSkinRed();
    this.ongetFavoriteDone();
  };
  e.prototype.onDisable = function () {
    this.unscheduleAllCallbacks();
    this.clearView();
  };
  e.prototype.clearView = function () {};
  e.prototype.init = function () {
    this._lbVersion = this.dict.lbVersion.getComponent(cc.Label);
    this._lbVersion.string = l.default.BMS_VERSION;
    this.lbTestNode = this.dict.lbTestNode;
    this.removeAdNode = this.dict.removeAdNode;
    this.setNoadsNode();
    if (c.ManageCtl.isZJTD()) {
      var t = c.ManageCtl.gameData.getPassLvByMode(1);
      if (t > 0) {
        u.default.GetInstance().sendRankData(t);
      }
    }
    if (c.ManageCtl.isH5_NOADS()) {
      window.mj_auto = false;
    }
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
  e.prototype.loadList = function () {
    return r(this, undefined, undefined, function () {
      return s(this, function () {
        return [2];
      });
    });
  };
  e.prototype.btnClick_set = function (t) {
    if (g.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.showPopupView, m.uiPath.uiName.popup_setView);
    }
  };
  e.prototype.btnClick_rank = function (t) {
    if (g.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      if (c.ManageCtl.isZJTD()) {
        u.default.GetInstance().showRankList();
      } else if (c.ManageCtl.isWx()) {
        c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.showPopupView, m.uiPath.uiName.popup_rankView);
      }
    }
  };
  e.prototype.btnClick_play = function (t) {
    return r(this, undefined, undefined, function () {
      var e;
      var n;
      var o;
      var i;
      var a;
      var r;
      var l;
      return s(this, function (s) {
        switch (s.label) {
          case 0:
            if (g.default.instance.baseBtnClick(this.node.name + t.target.name)) {
              c.ManageCtl.persistRootNode.showLoadCircle();
              e = 1;
              return [4, y.myJsonCtl.getJson(c.ManageCtl.getModeNameByModeId(e))];
            } else {
              return [2];
            }
          case 1:
            n = s.sent();
            c.ManageCtl.gameData.setCurModeId(e);
            o = c.ManageCtl.gameData.getPassLvByMode(e);
            i = o + 1;
            c.ManageCtl.gameData.setCurLevelId(i);
            a = f.MyTool.getJsonLength(n);
            if (i > a) {
              if (a >= 2) {
                r = f.MyTool.myRandom(11, a);
                i = r;
              } else {
                i = 1;
              }
            }
            l = n[i].LevelId1;
            c.ManageCtl.gameData.setCurDevId(l);
            this.scheduleOnce(function () {
              c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.showGameView);
            }, 1);
            return [2];
        }
      });
    });
  };
  e.prototype.btnClick_welfareLimited = function (t) {
    if (g.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.showPopupView, m.uiPath.uiName.popup_welfareLimitedView);
    }
  };
  e.prototype.btnClick_signIn = function (t) {
    g.default.instance.baseBtnClick(this.node.name + t.target.name);
  };
  e.prototype.btnClick_invite = function (t) {
    g.default.instance.baseBtnClick(this.node.name + t.target.name);
  };
  e.prototype.btnClick_skin = function (t) {
    if (g.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      c.ManageCtl.gameData.setFlagData(d.MyConstans.projectName + "_newSkin", null);
      this.dict.skinRedNode.active = false;
      c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.showPopupView, m.uiPath.uiName.popup_skinView);
    }
  };
  e.prototype.btnClick_mode = function (t) {
    if (g.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.showPopupView, m.uiPath.uiName.popup_modeView);
    }
  };
  e.prototype.btnClick_collect = function (t) {
    if (g.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.showPopupView, m.uiPath.uiName.popup_collectView);
    }
  };
  e.prototype.btnClick_FavoriteWx = function (t) {
    if (g.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.showPopupView, m.uiPath.uiName.popup_favoriteWxView);
    }
  };
  e.prototype.onhttpRequestConfigSuccess = function () {
    return r(this, undefined, undefined, function () {
      return s(this, function () {
        return [2];
      });
    });
  };
  e.prototype.checkInHideArr = function (t) {
    var e = c.ManageCtl.bmsCtl.getConditionValueByType("HideMode");
    return !!(e && e.length > 0 && e.includes(t));
  };
  e.prototype.onShowDebugView = function () {
    if (this.dict.btnJumpLv && this.dict.editBoxLv) {
      this.dict.btnJumpLv.active = c.ManageCtl.isH5_NOADS() || c.ManageCtl.persistRootNode.debug;
      this.dict.editBoxLv.active = c.ManageCtl.isH5_NOADS() || c.ManageCtl.persistRootNode.debug;
    }
  };
  e.prototype.gotoMode = function (t, e) {
    return r(this, undefined, undefined, function () {
      var n;
      var o;
      return s(this, function (i) {
        switch (i.label) {
          case 0:
            c.ManageCtl.gameData.setCurModeId(t);
            c.ManageCtl.gameData.setCurLevelId(e);
            return [4, y.myJsonCtl.getJson(c.ManageCtl.getModeNameByModeId(t))];
          case 1:
            n = i.sent();
            e = c.ManageCtl.getOtherLevelId(t, e, n);
            o = n[e].LevelId1;
            c.ManageCtl.gameData.setCurDevId(o);
            c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.showGameView);
            return [2];
        }
      });
    });
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
    for (var e = ["gameView", "popup_gameLoseView", "popup_gameWinView", "popup_gameBackView", "popup_sendFruitView"], n = 0; n < e.length; n++) {
      var o = "prefab/" + e[n];
      t.load(o, function (t) {
        if (!t) {
          console.log("## 预加载完成");
        }
      });
    }
  };
  e.prototype.checkShowOtherView = function () {
    c.ManageCtl.gameData.getSignInInfo();
  };
  e.prototype.ongetInviteDone = function () {};
  e.prototype.ongetSignInDone = function () {};
  e.prototype.beforLoadLevelPrefab = function () {};
  e.prototype.loadLevelPrefab2 = function (t, e) {
    var n = this;
    var o = "prefab/level/zqddn_zhb_level" + e;
    t.load(o, function (t, o) {
      if (!t) {
        console.log("## 预加载" + e + "完成");
        window.game_musicOpen = 0;
        window.game_audioOpen = 0;
        var i = cc.instantiate(o);
        i.opacity = 0;
        i.scale = 0;
        n.node.addChild(i);
      }
    });
  };
  e.prototype.onUpdateSkinRed = function () {
    this.dict.skinRedNode.active = c.ManageCtl.gameData.isGetNewSkin();
  };
  e.prototype.ongetFavoriteDone = function () {
    this.dict.btnFavoriteWx.active = c.ManageCtl.isWx() && !c.ManageCtl.gameData.getFlagData(d.MyConstans.projectName + "_wxGetFavorite");
  };
  e.prototype.btnClick_privacy = function (t) {
    if (g.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      if (l.default.isANDROID_VIVO || l.default.isANDROID_OPPO || l.default.isANDROID_XIAOMI || l.default.isANDROID_4399 || l.default.isANDROID_HUAWEI) {
        if (window.jsb && window.jsb.reflection) {
          jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "lookPrivacyPolicy", "()V");
        }
      } else if (l.default.isOPPO || l.default.isQQ || l.default.isVIVO || l.default.isHUAWEI) {
        c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.showPopupView, m.uiPath.uiName.popup_privacyPolicyView, {
          showPrivacyPanelFlag: true,
          showUserPanelFlag: false
        });
      }
    }
  };
  return a([v, C("ui/mainView")], e);
}(h.default);
exports.default = w;