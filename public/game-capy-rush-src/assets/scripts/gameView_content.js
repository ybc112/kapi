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
var p = require("./ChallengeHttp");
var f = require("./Language");
var g = require("./MyTool");
var m = require("./myBtnClick");
var y = require("./statsCtl");
var _ = require("./uiPathManage");
var v = require("./jsonConfig");
var C = require("./myJsonCtl");
var w = require("./gameView_levelBtn");
var b = require("./gameView_timeNode");
var capyBridge = require("./CapyPaymentBridge").default;
var M = cc._decorator;
var k = M.ccclass;
M.property;
var I = M.menu;
var S = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e._curModeId = 1;
    e._curDevId = 1;
    e._initDevId = 1;
    e._curLevelId = 1;
    e._lbTitle = null;
    e._lbLevel = null;
    e._lbDevLevel = null;
    e._contentNode = null;
    e._timeNode = null;
    e._gameViewLevelBtn = null;
    e._showHardFlag = false;
    e._btnBigTipTimeCallback = null;
    e._btnBigTipHideTime = 5;
    e._btnBigTipCurTime = 5;
    e._showSkipBtnCount = 0;
    e._comboTimeCallback = null;
    e._btnTipTimeCallback = null;
    e._resetBtnTipTimeCallback = null;
    e._btnLayoutNodeOldPos = null;
    e._clearAnimalCount = 0;
    e._btnTipCount = 0;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this._comboTimeCallback = this.comboTimeCallback.bind(this);
    this._btnTipTimeCallback = this.btnTipTimeCallback.bind(this);
    this._resetBtnTipTimeCallback = this.resetBtnTipTimeCallback.bind(this);
    window.m_game_close = false;
    cc.game.on("levelFailEvent", this.onLevelFailEvent, this);
    cc.game.on("game_success2", this.onGameSuccess, this);
    cc.game.on("onRestartBtn", this.onRestartBtn, this);
    cc.game.on("levle_getStarSound", this.onlevle_getStarSound, this);
    cc.game.on("level_shake", this.onlevel_shake, this);
    cc.game.on("showDebugView", this.onShowDebugView, this);
    cc.game.on("rewardVideo", this.onLevelRewardVideo, this);
    cc.game.on("level_proChange", this.onlevel_proChange, this);
    cc.game.on("game_asset_download_fail", this.ongame_asset_download_fail, this);
    cc.game.on("game_showTip", this.ongame_showTip, this);
    cc.game.on("f31313_clearAnimal", this.onf31313_clearAnimal, this);
    c.ManageCtl.myMsgCtl.on(d.MyConstans.msg.gameRestart, this.ongameRestart, this);
    c.ManageCtl.myMsgCtl.on(d.MyConstans.msg.gameNextLevel, this.ongameNextLevel, this);
    c.ManageCtl.myMsgCtl.on(d.MyConstans.msg.gameReLoadLevel, this.ongameReLoadLevel, this);
    c.ManageCtl.myMsgCtl.on(d.MyConstans.msg.gameReLoadLevel2, this.ongameReLoadLevel2, this);
    c.ManageCtl.myMsgCtl.on(d.MyConstans.msg.updatePropCount, this.onUpdatePropCount, this);
    c.ManageCtl.myMsgCtl.on(d.MyConstans.msg.showPathNode, this.onshowPathNode, this);
    c.ManageCtl.myMsgCtl.on(d.MyConstans.msg.showBtnHide, this.onshowBtnHide, this);
    this._contentNode = this.dict.contentNode;
    this._lbTitle = this.dict.lbTitle.getComponent(cc.Label);
    this._lbLevel = this.dict.lbLevel.getComponent(cc.Label);
    this._lbDevLevel = this.dict.lbDevLevel.getComponent(cc.Label);
    this._timeNode = this.dict.timeNode.getComponent(b.default);
    this._gameViewLevelBtn = this.getComponent(w.default);
    this.dict.btnSkipTest.active = c.ManageCtl.isH5_NOADS() || c.ManageCtl.persistRootNode.debug;
    this._gameViewLevelBtn.setBtnShow(this);
    var e = c.ManageCtl.gameData.getShowPath();
    if (this.dict.togglePath.active && e) {
      this.dict.togglePath.getComponent(cc.Toggle).check();
    } else {
      this.dict.togglePath.getComponent(cc.Toggle).uncheck();
    }
    this.dict.btnLayoutNode.children.forEach(function (t) {
      t.active = false;
    });
    this.dict.proNode.active = false;
    this._btnBigTipTimeCallback = this.btnBigTipTimeCallback.bind(this);
    this.dict.lbVersion.getComponent(cc.Label).string = "V " + l.default.BMS_VERSION;
    var n = this.dict.setLoseAutoNode;
    n.on(cc.Node.EventType.TOUCH_END.toString(), this.touchSetLoseAutoNodeEnd, this);
    n._touchListener.setSwallowTouches(false);
    if (c.ManageCtl.gameData.gameHideBtn == 0) {
      this.dict.btnHide1.active = true;
      this.dict.btnHide2.active = false;
      this.dict.btnLayoutNode.active = true;
    } else {
      this.dict.btnHide1.active = false;
      this.dict.btnHide2.active = true;
      this.dict.btnLayoutNode.active = false;
    }
    this.dict.btnTipNode.opacity = this.dict.btnLayoutNode.active ? 255 : 0;
  };
  e.prototype.onDestroy = function () {
    cc.game.off("levelFailEvent", this.onLevelFailEvent, this);
    cc.game.off("game_success2", this.onGameSuccess, this);
    cc.game.off("onRestartBtn", this.onRestartBtn, this);
    cc.game.off("levle_getStarSound", this.onlevle_getStarSound, this);
    cc.game.off("level_shake", this.onlevel_shake, this);
    cc.game.off("showDebugView", this.onShowDebugView, this);
    cc.game.off("rewardVideo", this.onLevelRewardVideo, this);
    cc.game.off("level_proChange", this.onlevel_proChange, this);
    cc.game.off("game_asset_download_fail", this.ongame_asset_download_fail, this);
    cc.game.off("game_showTip", this.ongame_showTip, this);
    cc.game.off("f31313_clearAnimal", this.onf31313_clearAnimal, this);
    c.ManageCtl.myMsgCtl.off(d.MyConstans.msg.gameRestart, this.ongameRestart, this);
    c.ManageCtl.myMsgCtl.off(d.MyConstans.msg.gameNextLevel, this.ongameNextLevel, this);
    c.ManageCtl.myMsgCtl.off(d.MyConstans.msg.gameReLoadLevel, this.ongameReLoadLevel, this);
    c.ManageCtl.myMsgCtl.off(d.MyConstans.msg.gameReLoadLevel2, this.ongameReLoadLevel2, this);
    c.ManageCtl.myMsgCtl.off(d.MyConstans.msg.updatePropCount, this.onUpdatePropCount, this);
    c.ManageCtl.myMsgCtl.off(d.MyConstans.msg.showPathNode, this.onshowPathNode, this);
    c.ManageCtl.myMsgCtl.off(d.MyConstans.msg.showBtnHide, this.onshowBtnHide, this);
  };
  e.prototype.start = function () {
    return r(this, undefined, undefined, function () {
      return s(this, function () {
        this.initData2();
        this.startGame();
        return [2];
      });
    });
  };
  e.prototype.onDisable = function () {
    this.unscheduleAllCallbacks();
    window.m_game_close = true;
    this.releaseAssetAll();
    l.default.instance.stopRecordCap();
    c.ManageCtl.gameData.canSendFirst_progress = false;
  };
  e.prototype.initData2 = function () {
    return r(this, undefined, undefined, function () {
      return s(this, function () {
        this._curModeId = c.ManageCtl.gameData.getCurModeId();
        this._curDevId = c.ManageCtl.gameData.getCurDevId();
        this._initDevId = this._curDevId;
        this._curLevelId = c.ManageCtl.gameData.getCurLevelId();
        this._lbLevel.string = f.default.formatStr("第%d关", this._curLevelId);
        this.checkShowPath();
        return [2];
      });
    });
  };
  e.prototype.btnClick_back = function (t) {
    if (m.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      this.gotoClose();
    }
  };
  e.prototype.btnClick_addTime = function (t) {
    var e = this;
    if (m.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      c.ManageCtl.playVideo(function () {
        if (e.node && cc.isValid(e.node)) {
          y.statsCtl.sendEventShuShu("reward_btn", {
            mode: e._curModeId,
            devid: e._curDevId,
            lv: e._curLevelId,
            progress: c.ManageCtl.gameData.getGameProgress(),
            scene: "addtime",
            lvgrade: c.ManageCtl.gameData.game_lvgrade
          });
          y.statsCtl.sendEventShuShu("Level_AddTime", {
            mode: e._curModeId,
            devid: e._curDevId,
            lv: e._curLevelId,
            lvgrade: c.ManageCtl.gameData.game_lvgrade
          });
          var t = c.ManageCtl.bmsCtl.getConditionValueByType("AddTime");
          e._timeNode.addGameTime(t);
          c.ManageCtl.persistRootNode.showTipsUI("加时成功");
        }
      });
    }
  };
  e.prototype.btnClick_skip = function (t) {
    var e = this;
    if (t.target.opacity != 0 && m.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      c.ManageCtl.playVideo(function () {
        if (e.node && cc.isValid(e.node)) {
          y.statsCtl.sendEventShuShu("reward_btn", {
            mode: e._curModeId,
            devid: e._curDevId,
            lv: e._curLevelId,
            progress: c.ManageCtl.gameData.getGameProgress(),
            scene: "jumpLv",
            lvgrade: c.ManageCtl.gameData.game_lvgrade
          });
          cc.game.emit("game_success2");
        }
      });
    }
  };
  e.prototype.btnClick_skipTest = function (t) {
    if (m.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      cc.game.emit("game_success2");
    }
  };
  e.prototype.btnClick_btnHide = function (t) {
    var e = this;
    if (m.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      var n = this.dict.btnLayoutNode;
      if (!this._btnLayoutNodeOldPos) {
        this._btnLayoutNodeOldPos = n.position;
      }
      n.active = true;
      n.stopAllActions();
      console.log("## btnLayoutNode.y ", n.y);
      if (c.ManageCtl.gameData.gameHideBtn == 0) {
        c.ManageCtl.gameData.gameHideBtn = 1;
        this.dict.btnHide1.active = false;
        this.dict.btnHide2.active = true;
        this.dict.btnTipNode.opacity = 0;
        n.y = this._btnLayoutNodeOldPos.y;
        cc.tween(n).to(0.2, {
          y: this._btnLayoutNodeOldPos.y - 2 * n.height
        }).call(function () {}).start();
      } else {
        c.ManageCtl.gameData.gameHideBtn = 0;
        this.dict.btnHide1.active = true;
        this.dict.btnHide2.active = false;
        n.y = this._btnLayoutNodeOldPos.y - 2 * n.height;
        cc.tween(n).to(0.2, {
          y: this._btnLayoutNodeOldPos.y
        }).call(function () {
          e.dict.btnTipNode.opacity = 255;
        }).start();
      }
    }
  };
  e.prototype.btnClick_getBoxTest = function (t) {
    if (m.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      cc.game.emit("f29376_GetItem", 1, null, true);
    }
  };
  e.prototype.gotoClose = function () {
    var t = c.ManageCtl.gameData.getLevelGameTime();
    y.statsCtl.sendEventShuShu("Level_Return", {
      mode: this._curModeId,
      devid: this._curDevId,
      lv: this._curLevelId,
      progress: c.ManageCtl.gameData.getGameProgress(),
      gametime: t,
      lvgrade: c.ManageCtl.gameData.game_lvgrade
    });
    y.statsCtl.sendEventShuShu("Level_Time", {
      mode: this._curModeId,
      devid: this._curDevId,
      lv: this._curLevelId,
      gametime: t,
      type: 3,
      lvgrade: c.ManageCtl.gameData.game_lvgrade
    });
    if (c.ManageCtl.gameData.canSendFirst_progress && !c.ManageCtl.gameData.getNotSaveFlagData(d.MyConstans.projectName + "_back")) {
      y.statsCtl.sendEventShuShu("First_progress", {
        mode: this._curModeId,
        devid: this._curDevId,
        lv: this._curLevelId,
        progress: c.ManageCtl.gameData.getGameProgress(),
        type: 4,
        lvgrade: c.ManageCtl.gameData.game_lvgrade
      });
      c.ManageCtl.gameData.setNotSaveFlagData(d.MyConstans.projectName + "_back", {});
    }
    c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.showPopupView, _.uiPath.uiName.popup_gameBackView);
  };
  // 付费关（第 2 关起）必须先向父页面申请许可，确认链上已经付过门票才能开始。
  // 没有这道门的话，玩家打完免费的第 1 关就能一路白玩到第 11 关。
  e.prototype.startGame = function () {
    var self = this;
    if (capyBridge && capyBridge.requestLevelStart) {
      return capyBridge.requestLevelStart(this._curLevelId).then(function (granted) {
        if (!granted) {
          cc.log("[capy] level not granted, abort start:", self._curLevelId);
          return undefined; // 父页面会弹支付提示，这里不开始
        }
        return self._startGameInner();
      });
    }
    return this._startGameInner();
  };
  e.prototype._startGameInner = function () {
    capyBridge && capyBridge.levelStart && capyBridge.levelStart(this._curLevelId);
    return r(this, undefined, undefined, function () {
      var t;
      var e;
      var n;
      var o;
      return s(this, function (i) {
        switch (i.label) {
          case 0:
            c.ManageCtl.gameData.removeTemporaryCount = 0;
            c.ManageCtl.gameData.clearTemporaryCount = 0;
            c.ManageCtl.gameData.levelGetFruitCount = 0;
            c.ManageCtl.gameData.setNotSaveFlagData(d.MyConstans.projectConst + "_firstShowBigTip", null);
            c.ManageCtl.gameData.resetLevelGameTime();
            this.onUpdatePropCount();
            this.unschedule(this._btnTipTimeCallback);
            this.unschedule(this._resetBtnTipTimeCallback);
            this.dict.hardLevelNode.active = true;
            this.dict.comboNode.active = false;
            t = this.dict.hardLevelNode;
            return [4, C.myJsonCtl.getJsonInfoByKey(c.ManageCtl.getModeNameByModeId(this._curModeId), this._curLevelId, true)];
          case 1:
            if ((e = i.sent()) && e.LevelId2) {
              t.active = true;
              this.dict.imgHardLevel.getComponent(cc.Sprite).fillRange = 0;
              this.dict.imgDone1.active = false;
              this.dict.imgDone2.active = false;
              return [4, C.myJsonCtl.getJsonInfoByKey(v.jsonName.mode, this._curModeId)];
            } else {
              return [3, 3];
            }
          case 2:
            i.sent();
            if (c.ManageCtl.gameData.passEasyFlag) {
              this.dict.hardLevelNode.active = false;
              this.setHard();
            }
            return [3, 4];
          case 3:
            t.active = false;
            this.dict.lbModeName.active = false;
            i.label = 4;
          case 4:
            this.dict.lbModeName.active = false;
            this.dict.imgImgBg.active = this._curModeId == 1;
            if (this.dict.imgImgBg.active) {
              n = "/bg/bg" + window.f31313_map_skin;
              (o = this.dict.imgImgBg.getComponent(cc.Sprite)).node.mReloImgFalg = true;
              g.MyTool.loadImg(n, o);
            }
            this._lbLevel.string = f.default.formatStr("第%d关", this._curLevelId);
            this._lbDevLevel.string = this._curDevId.toString();
            this._lbDevLevel.node.active = c.ManageCtl.persistRootNode.debug;
            this._timeNode.hideTime();
            this._showHardFlag = false;
            if (c.ManageCtl.gameData.passEasyFlag) {
              this._showHardFlag = true;
            }
            c.ManageCtl.gameData.game_lvgrade = this._showHardFlag ? 2 : 1;
            y.statsCtl.sendEventShuShu("Level_Page", {
              mode: this._curModeId,
              devid: this._curDevId,
              lv: this._curLevelId,
              lvgrade: c.ManageCtl.gameData.game_lvgrade
            });
            if (this._curModeId == 1) {
              c.ManageCtl.gameData.canSendFirst_progress = true;
              c.ManageCtl.gameData.setNotSaveFlagData(d.MyConstans.projectName + "_back", null);
              c.ManageCtl.gameData.setNotSaveFlagData(d.MyConstans.projectName + "_useProp", null);
              c.ManageCtl.gameData.setNotSaveFlagData(d.MyConstans.projectName + "_playVideo", null);
              c.ManageCtl.gameData.setNotSaveFlagData(d.MyConstans.projectName + "_levelLose", null);
            }
            this.checkShowProNode();
            this.loadLevelPrefab();
            return [2];
        }
      });
    });
  };
  e.prototype.checkShowProNode = function () {
    if (this._curModeId == 1) {
      this.dict.imgIconPro.getComponent(cc.Sprite);
      this.dict.lbPro.getComponent(cc.Label).string = f.default.formatStr("进度：%d%", 0);
      window.game_turtleProgress = 0;
      this.dict.proNode.active = true;
    } else {
      this.dict.proNode.active = false;
    }
  };
  e.prototype.loadLevelPrefab = function () {
    this._contentNode.children.forEach(function (t) {
      t.active = false;
      t.destroy();
    });
    this.loadLevelPrefab1();
  };
  e.prototype.loadLevelPrefab1 = function () {
    var t = this;
    cc.assetManager.loadBundle("level", function (e, n) {
      if (e) {
        t.loadLevelPrefab1();
      } else {
        t.loadLevelPrefab2(n);
      }
    });
  };
  e.prototype.loadLevelPrefab2 = function (t) {
    return r(this, undefined, undefined, function () {
      var e;
      var n;
      var o;
      var i;
      var a;
      var r;
      var l = this;
      return s(this, function (s) {
        switch (s.label) {
          case 0:
            e = "prefab/level/zqddn_zhb_level";
            n = -1;
            if (this._showHardFlag) {
              return [4, C.myJsonCtl.getJsonInfoByKey(c.ManageCtl.getModeNameByModeId(this._curModeId), this._curLevelId, true)];
            } else {
              return [3, 2];
            }
          case 1:
            o = s.sent();
            this._curDevId = o.LevelId2;
            c.ManageCtl.gameData.setCurDevId(this._curDevId);
            return [3, 3];
          case 2:
            this._curDevId = this._initDevId;
            c.ManageCtl.gameData.setCurDevId(this._curDevId);
            s.label = 3;
          case 3:
            if (this._curDevId == 0) {
              i = [];
              for (a in c.ManageCtl.gameData.modeEasyInfo) {
                i.push(c.ManageCtl.gameData.modeEasyInfo[a].LevelId1);
              }
              r = g.MyTool.myRandom(0, i.length - 1);
              this._curDevId = i[r];
            }
            console.log("## this._curModeId: ", this._curModeId);
            console.log("## this._curLevelId: ", this._curLevelId);
            console.log("## this._curDevId: ", this._curDevId);
            this._lbDevLevel.string = this._curDevId.toString();
            window.game_levelId = this._curLevelId;
            e += -1 != n ? n.toString() : this._curDevId.toString();
            t.load(e, function (e, n) {
              if (e) {
                l.loadLevelPrefab2(t);
              } else {
                window.currentPrefab = n;
                var o = cc.instantiate(n);
                l._contentNode.addChild(o);
                o.position = cc.v3(0, 0);
                l.loadLevelDone(o);
              }
            });
            return [2];
        }
      });
    });
  };
  e.prototype.loadLevelDone = function (t) {
    this._gameViewLevelBtn.initData(this, t, this._curModeId, this._curDevId, this._curLevelId);
    this._lbTitle.string = "";
    l.default.instance.startRecordCap();
    this.hideLvTitle(t);
    this.showGameButton();
    this.hideLbTime(t);
    this.hideWidget(t);
    this._btnTipCount = 0;
    this.unschedule(this._btnTipTimeCallback);
    this.schedule(this._btnTipTimeCallback, 1);
  };
  e.prototype.hideWidget = function (t) {
    if (this._curModeId == 1) {
      var e = t.getChildByName("game");
      if (e) {
        var n = e.getChildByName("content");
        if (n && n.getComponent(cc.Widget)) {
          n.removeComponent(cc.Widget);
        }
      }
    }
  };
  e.prototype.hideLbTime = function (t) {
    var e = t.getChildByName("lbTime");
    if (e) {
      e.active = false;
    } else {
      e = t.getChildByName("lblTime");
      var n = t.getChildByName("game");
      if (e) {
        e.active = false;
      } else if (n) {
        if (e = n.getChildByName("lblTime")) {
          e.active = false;
        } else if (e = n.getChildByName("cTime")) {
          e.active = false;
        } else if (e = n.getChildByName("lbTime")) {
          e.active = false;
        } else {
          var o = n.getChildByName("time");
          if (o) {
            o.active = false;
          }
        }
        var i = n.getChildByName("node_ui");
        if (i) {
          if (e = i.getChildByName("lblTime")) {
            e.active = false;
          } else if (e = i.getChildByName("lblcTime")) {
            e.active = false;
          }
        }
      }
    }
  };
  e.prototype.hideLvTitle = function () {};
  e.prototype.ongameRestart = function () {
    if (this._curModeId != 128) {
      this.releaseAsset();
    }
    this.startGame();
  };
  e.prototype.ongameNextLevel = function () {
    return r(this, undefined, undefined, function () {
      var t;
      var e;
      var n;
      return s(this, function (o) {
        switch (o.label) {
          case 0:
            this.releaseAsset();
            c.ManageCtl.gameData.levelGetFruitCount = 0;
            if (this._curModeId != 1) {
              return [3, 2];
            } else {
              return [4, c.ManageCtl.gameData.getNextDevLv(this._curModeId, this._curLevelId, this._curDevId)];
            }
          case 1:
            t = o.sent();
            e = t.devLv;
            n = this._curLevelId + 1;
            c.ManageCtl.gameData.setCurDevId(e);
            c.ManageCtl.gameData.setCurLevelId(n);
            o.label = 2;
          case 2:
            this.initData2();
            this.startGame();
            return [2];
        }
      });
    });
  };
  e.prototype.ongameReLoadLevel = function () {
    return r(this, undefined, undefined, function () {
      return s(this, function () {
        this.initData2();
        this.startGame();
        return [2];
      });
    });
  };
  e.prototype.ongameReLoadLevel2 = function () {
    this.loadLevelPrefab();
  };
  e.prototype.onLevelFailEvent = function () {
    var t = this;
    var e = this.getLevelComp();
    if (e && e.func_revive) {
      // 区块链支付开启时：把死亡事件和复活回调交给前端处理
      if (capyBridge && capyBridge.isPaymentEnabled && capyBridge.isPaymentEnabled()) {
        return void capyBridge.levelLose(this._curLevelId, function () {
          var e = t.getLevelComp();
          e.isEnd = false;
          e.func_revive();
        });
      }
      // 免费模式：保留原有复活/道具弹窗逻辑
      if (this._curModeId == 1) {
        var n = e.func_check_clearFood();
        return void c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.showPopupView, _.uiPath.uiName.popup_gameLoseView, {
          call: function (e) {
            var n = t.getLevelComp();
            n.isEnd = false;
            n.func_revive();
            switch (e) {
              case d.MyConstans.propId.bomb:
                t.hideGameButton();
                n.func_boom();
                n.func_boomCb = function () {
                  t.showGameButton();
                };
                break;
              case d.MyConstans.propId.remove:
                t.hideGameButton();
                n.func_clearFood();
                n.func_checkclearCb = function () {
                  t.showGameButton();
                };
                break;
              case d.MyConstans.propId.flip:
                n.func_reverse();
            }
          },
          pro: window.game_turtleProgress,
          haveFruitFlag: n
        });
      }
      c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.showPopupView, _.uiPath.uiName.popup_gameLoseOtherView, {
        call: function () {
          var e = t.getLevelComp();
          e.isEnd = false;
          e.func_revive();
        }
      });
    }
  };
  e.prototype.onGameSuccess = function () {
    capyBridge && capyBridge.levelWin && capyBridge.levelWin(this._curLevelId);
    return r(this, undefined, undefined, function () {
      var t;
      var e;
      var n;
      var o;
      var i;
      var a;
      var r = this;
      return s(this, function (s) {
        switch (s.label) {
          case 0:
            console.log("## onGameSuccess");
            l.default.instance.stopRecordCap();
            this.comboTimeCallback();
            this.unschedule(this._btnTipTimeCallback);
            this.unschedule(this._resetBtnTipTimeCallback);
            this._showSkipBtnCount = 0;
            c.ManageCtl.gameData.passEasyFlag = true;
            c.ManageCtl.gameData.gameLoseCount = 0;
            t = c.ManageCtl.gameData.getLevelGameTime();
            y.statsCtl.sendEventShuShu("Level_Win", {
              mode: this._curModeId,
              devid: this._curDevId,
              lv: this._curLevelId,
              gametime: t,
              lvgrade: c.ManageCtl.gameData.game_lvgrade
            });
            y.statsCtl.sendEventShuShu("Level_Time", {
              mode: this._curModeId,
              devid: this._curDevId,
              lv: this._curLevelId,
              gametime: t,
              type: 1,
              lvgrade: c.ManageCtl.gameData.game_lvgrade
            });
            c.ManageCtl.gameData.canSendFirst_progress = false;
            this.dict.arrowsTipNode.active = false;
            this.dict.arrowsTipNode2.active = false;
            return [4, C.myJsonCtl.getJsonInfoByKey(c.ManageCtl.getModeNameByModeId(this._curModeId), this._curLevelId, true)];
          case 1:
            if ((e = s.sent()) && e.LevelId2 && !this._showHardFlag) {
              this._contentNode.destroyAllChildren();
              this.dict.btnLayoutNode.active = false;
              this.dict.btnBack.active = false;
              this.dict.btnSkipTest.active = false;
              this.dict.proNode.opacity = 0;
              this.dict.comboNode.opacity = 0;
              this.dict.btnHide.opacity = 0;
              (n = this.dict.hardEffect.getComponent(sp.Skeleton)).node.active = true;
              n.setAnimation(0, "animation", false);
              this.scheduleOnce(function () {
                n.node.active = false;
                r.setHard();
                c.ManageCtl.gameData.resetLevelGameTime();
                r.loadLevelPrefab();
                y.statsCtl.sendEventShuShu("Level_Page", {
                  mode: r._curModeId,
                  devid: r._curDevId,
                  lv: r._curLevelId,
                  lvgrade: c.ManageCtl.gameData.game_lvgrade
                });
              }, 2);
              return [2];
            } else {
              this.dict.imgHardLevel.getComponent(cc.Sprite).fillRange = 1;
              this.dict.imgDone2.active = true;
              o = c.ManageCtl.gameData.setPassLvByMode(this._curModeId, this._curLevelId);
              if (this._curModeId == 1) {
                i = this.getLevelComp();
                c.ManageCtl.gameData.levelGetFruitCount = i.getFoodNum();
                a = c.ManageCtl.gameData.getPassLvByMode(this._curModeId);
                p.challengeHttp.setRank("rank_pass_lv_wx2", a);
                u.default.GetInstance().sendRankData(a);
                c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.showPopupView, _.uiPath.uiName.popup_gameWinView, {
                  modeId: this._curModeId,
                  devLv: this._curDevId,
                  curLevelId: this._curLevelId,
                  newPass: o
                });
              } else {
                c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.showPopupView, _.uiPath.uiName.popup_gameWinOtherView, {
                  modeId: this._curModeId,
                  devLv: this._curDevId,
                  curLevelId: this._curLevelId,
                  newPass: o
                });
              }
              return [2];
            }
        }
      });
    });
  };
  e.prototype.setHard = function () {
    this.dict.imgHardLevel.getComponent(cc.Sprite).fillRange = 0.5;
    this.dict.imgDone1.active = true;
    this._showHardFlag = true;
    c.ManageCtl.gameData.game_lvgrade = this._showHardFlag ? 2 : 1;
    this.dict.btnLayoutNode.active = c.ManageCtl.gameData.gameHideBtn == 0;
    this.dict.btnBack.active = true;
    this.dict.btnSkipTest.active = c.ManageCtl.isH5_NOADS() || c.ManageCtl.persistRootNode.debug;
    this.dict.proNode.opacity = 255;
    this.dict.comboNode.opacity = 255;
    this.dict.btnHide.opacity = 255;
  };
  e.prototype.onRestartBtn = function (t) {
    var e = this;
    if (t && t.bySetAuto) {
      c.ManageCtl.persistRootNode.showTipsUI(window.mj_auto ? "开启成功" : "关闭");
      return void this.startGame();
    }
    if (t && t.replay && t.replay) {
      this.startGame();
    } else {
      this.dict.arrowsTipNode.active = false;
      this.dict.arrowsTipNode2.active = false;
      var n = this.getLevelComp();
      if (n && n.func_revive) {
        if (this._curModeId == 1) {
          var o = 1;
          if (this._curModeId == 1 && t) {
            o = t.isCanOpenSlot ? 2 : 3;
          }
          c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.showPopupView, _.uiPath.uiName.popup_gameLoseView, {
            call: function () {
              var t = e.getLevelComp();
              t.isEnd = false;
              t.func_revive();
              e.hideBtnTip("btnBomb");
            },
            errorType: o,
            pro: window.game_turtleProgress
          });
        } else {
          c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.showPopupView, _.uiPath.uiName.popup_gameLoseOtherView, {
            call: function () {
              var t = e.getLevelComp();
              t.isEnd = false;
              t.func_revive();
              e.hideBtnTip("btnBomb");
            }
          });
        }
      } else {
        if (c.ManageCtl.isH5_NOADS()) {
          this.releaseAsset();
        }
        this.startGame();
      }
    }
  };
  e.prototype.getLevelComp = function () {
    if (this._contentNode.children[0]) {
      if (this._contentNode.children[0]._components[0].levelID) {
        return this._contentNode.children[0]._components[0];
      } else if (this._contentNode.children[0]._components[1].levelID) {
        return this._contentNode.children[0]._components[1];
      } else {
        return undefined;
      }
    }
  };
  e.prototype.onlevle_getStarSound = function () {
    c.ManageCtl.audioManager.PlayEffect("a_getStar");
  };
  e.prototype.onlevel_shake = function () {
    if (c.ManageCtl.gameData.getShakeSwitch()) {
      l.default.instance.vibrate(d.MyConstans.vibrateKind.short);
    }
  };
  e.prototype.checkShowWheelView = function () {
    var t = c.ManageCtl.bmsCtl.getConditionValueByType("wheel");
    if (t.length >= 2) {
      var e = t[0];
      var n = t[1];
      if (e == 0 && n == 0) {
        return false;
      }
      var o = this._curLevelId;
      if (o >= e) {
        if (o == e) {
          return true;
        }
        if ((o - e) % n == 0) {
          return true;
        }
      }
    }
    return false;
  };
  e.prototype.click_hideBtnToogle = function (t) {
    if (t.getComponent(cc.Toggle).isChecked) {
      this.dict.btnSkipTest.opacity = 0;
      this.dict.btnLayoutNode.opacity = 0;
    } else {
      this.dict.btnSkipTest.opacity = 255;
      this.dict.btnLayoutNode.opacity = 255;
    }
  };
  e.prototype.hideGameButton = function () {
    this.dict.btnLayoutNode.children.forEach(function (t) {
      t.active = false;
    });
    this.dict.btnBack.active = false;
    this.dict.btnSkipTest.active = false;
    this.dict.btnHide.active = false;
    this.dict.btnTipNode.opacity = 0;
  };
  e.prototype.showGameButton = function () {
    this._gameViewLevelBtn.setBtnShow(this);
    this.dict.btnBack.active = true;
    this.dict.btnSkipTest.active = c.ManageCtl.isH5_NOADS() || c.ManageCtl.persistRootNode.debug;
    this.dict.btnHide.active = true;
    this.dict.btnTipNode.opacity = 255;
  };
  e.prototype.onShowDebugView = function () {
    if (this._lbDevLevel) {
      this._lbDevLevel.string = this._curDevId.toString();
      this._lbDevLevel.node.active = true;
      this.dict.btnSkipTest.active = true;
    }
  };
  e.prototype.onLevelRewardVideo = function (t, e) {
    var n = this;
    if (e === undefined) {
      e = "other";
    }
    c.ManageCtl.playVideo(function () {
      y.statsCtl.sendEventShuShu("reward_btn", {
        mode: n._curModeId,
        devid: n._curDevId,
        lv: n._curLevelId,
        progress: c.ManageCtl.gameData.getGameProgress(),
        scene: e,
        lvgrade: c.ManageCtl.gameData.game_lvgrade
      });
      if (t) {
        t(true);
      }
    });
  };
  e.prototype.btnBigTipTimeCallback = function () {
    this._btnBigTipCurTime -= 1;
    this.dict.lbBigTipTime.getComponent(cc.Label).string = this._btnBigTipCurTime + "s后自动关闭";
  };
  e.prototype.btnClick_closeBigTip = function (t) {
    if (m.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      var e = this.dict.btnBigTipNode;
      e.stopAllActions();
      e.active = false;
      this.unschedule(this._btnBigTipTimeCallback);
    }
  };
  e.prototype.onlevel_proChange = function (t) {
    window.game_turtleProgress = t;
    if (this.dict.proNode && (!this.dict.proNode || this.dict.proNode.active)) {
      this.dict.lbPro.getComponent(cc.Label).string = f.default.formatStr("进度：%d%", t);
      var e = 0.01 * t;
      this.dict.imgIconPro.getComponent(cc.Sprite).fillRange = e;
    }
  };
  e.prototype.ongame_asset_download_fail = function () {
    c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.showPopup_reloadView);
  };
  e.prototype.ongame_showTip = function (t) {
    c.ManageCtl.persistRootNode.showTipsUI(t);
  };
  e.prototype.checkShowPath = function () {
    return r(this, undefined, undefined, function () {
      var t;
      var e;
      var n;
      return s(this, function (o) {
        switch (o.label) {
          case 0:
            if (c.ManageCtl.isH5_NOADS()) {
              t = c.ManageCtl.gameData.getShowPath();
              this.dict.pathNode.active = t == 1 && this._curModeId != 1;
              e = this.dict.lbPath.getComponent(cc.Label);
              return [4, C.myJsonCtl.getJsonInfoByKey(v.jsonName.mode, this._curModeId)];
            } else {
              return [2];
            }
          case 1:
            n = o.sent();
            if (this._curModeId == 1) {
              e.string = "开始游戏→第" + this._curLevelId + "关";
            } else {
              e.string = "更多玩法→" + n.modeName + "→第" + this._curLevelId + "关";
            }
            return [2];
        }
      });
    });
  };
  e.prototype.toogleChange_path = function () {
    var t = this.dict.pathNode;
    if (this.dict.togglePath.getComponent(cc.Toggle).isChecked) {
      c.ManageCtl.gameData.setShowPath(1);
      t.active = this._curModeId != 1;
    } else {
      c.ManageCtl.gameData.setShowPath(0);
      t.active = false;
    }
  };
  e.prototype.onUpdatePropCount = function () {
    var t = this.dict.iconVideoBomb;
    var e = this.dict.iconVideoRemove;
    var n = this.dict.iconVideoAddFlip;
    var o = this.dict.tipRemoveIcon;
    var i = this.dict.numNodeBomb;
    var a = this.dict.numNodeRemove;
    var r = this.dict.numNodeAddFlip;
    var s = this.dict.addNodeBomb;
    var l = this.dict.addNodeRemove;
    var u = this.dict.addNodeAddFlip;
    var h = c.ManageCtl.gameData.checkIsUseProp(d.MyConstans.propId.bomb);
    var p = c.ManageCtl.gameData.checkIsUseProp(d.MyConstans.propId.remove);
    var f = c.ManageCtl.gameData.checkIsUseProp(d.MyConstans.propId.flip);
    s.active = !h;
    l.active = !p;
    u.active = !f;
    var g = i.getChildByName("lbNum").getComponent(cc.Label);
    var m = a.getChildByName("lbNum").getComponent(cc.Label);
    var y = r.getChildByName("lbNum").getComponent(cc.Label);
    var _ = c.ManageCtl.gameData.getDayPropCountById(d.MyConstans.propId.bomb) + c.ManageCtl.gameData.removeTemporaryCount;
    var v = c.ManageCtl.gameData.getDayPropCountById(d.MyConstans.propId.remove) + c.ManageCtl.gameData.clearTemporaryCount;
    var C = c.ManageCtl.gameData.getDayPropCountById(d.MyConstans.propId.flip);
    i.active = _ > 0 && !s.active;
    a.active = v > 0 && !l.active;
    r.active = C > 0 && !u.active;
    t.active = !i.active && !s.active;
    e.active = !a.active && !l.active;
    n.active = !r.active && !u.active;
    o.active = t.active;
    g.string = _ > 99 ? "99+" : _.toString();
    m.string = v > 99 ? "99+" : v.toString();
    y.string = C > 99 ? "99+" : C.toString();
    window.game_removeCount = v;
  };
  e.prototype.releaseAsset = function () {};
  e.prototype.releaseAssetAll = function () {
    if (!window.currentImg) {
      window.currentImg = {};
    }
    for (var t in window.currentImg) {
      if (window.currentImg[t]) {
        cc.assetManager.releaseAsset(window.currentImg[t]);
        delete window.currentImg[t];
      }
    }
    if (!window.currentAudio) {
      window.currentAudio = {};
    }
    for (var t in window.currentAudio) {
      if (window.currentAudio[t]) {
        cc.assetManager.releaseAsset(window.currentAudio[t]);
        delete window.currentAudio[t];
      }
    }
    if (!window.currentOther) {
      window.currentOther = {};
    }
    for (var t in window.currentOther) {
      if (window.currentOther[t]) {
        cc.assetManager.releaseAsset(window.currentOther[t]);
        delete window.currentOther[t];
      }
    }
  };
  e.prototype.onshowPathNode = function (t) {
    this.dict.pathNode.active = !!t && this._curModeId != 1;
    this.checkShowPath();
  };
  e.prototype.onshowBtnHide = function (t) {
    if (t) {
      this.dict.btnSkipTest.opacity = 0;
      this.dict.btnLayoutNode.opacity = 0;
    } else {
      this.dict.btnSkipTest.opacity = 255;
      this.dict.btnLayoutNode.opacity = 255;
    }
  };
  e.prototype.touchSetLoseAutoNodeEnd = function () {
    if (window.h5_daren && window.mj_auto) {
      c.ManageCtl.gameData.loseAutoReviveFlag = !c.ManageCtl.gameData.loseAutoReviveFlag;
      if (c.ManageCtl.gameData.loseAutoReviveFlag) {
        c.ManageCtl.persistRootNode.showTipsUI("开启自动复活");
      } else {
        c.ManageCtl.persistRootNode.showTipsUI("关闭自动复活");
      }
    }
  };
  e.prototype.onf31313_clearAnimal = function (t) {
    console.log("## 移出");
    this._btnTipCount = 0;
    this.showFlyFruit(t);
    this._clearAnimalCount += 1;
    if (this._clearAnimalCount >= 2) {
      this.dict.comboNode.active = true;
      this.dict.comboLayout.stopAllActions();
      this.dict.comboLayout.scale = 1;
      cc.tween(this.dict.comboLayout).to(0.15, {
        scale: 1.2
      }).to(0.15, {
        scale: 1
      }).start();
      var e = this.dict.imgCombo.getComponent(cc.Sprite);
      e.fillRange = 1;
      cc.tween(e).to(3, {
        fillRange: 0
      }).start();
      this.dict.mmlbCombo.getComponent(cc.Label).string = (this._clearAnimalCount - 1).toString();
    }
    this.unschedule(this._comboTimeCallback);
    this.scheduleOnce(this._comboTimeCallback, 3);
  };
  e.prototype.comboTimeCallback = function () {
    this._clearAnimalCount = 0;
    this.dict.comboNode.active = false;
    this.dict.imgCombo.getComponent(cc.Sprite).fillRange = 0;
  };
  e.prototype.btnTipTimeCallback = function () {
    this._btnTipCount += 1;
    if (this._btnTipCount >= 10) {
      this.unschedule(this._btnTipTimeCallback);
      this.scheduleOnce(this._resetBtnTipTimeCallback, 30);
      var t = ["btnBomb", "btnRemove", "btnFlip"];
      var e = g.MyTool.myRandom(0, t.length - 1);
      this.showBtnTip(t[e]);
    }
  };
  e.prototype.resetBtnTipTimeCallback = function () {
    this._btnTipCount = 0;
    this.unschedule(this._btnTipTimeCallback);
    this.schedule(this._btnTipTimeCallback, 1);
  };
  e.prototype.showBtnTip = function (t) {
    if (this._curLevelId != 1 || this._showHardFlag) {
      if (!this._btnLayoutNodeOldPos) {
        this._btnLayoutNodeOldPos = this.dict.btnLayoutNode.position;
      }
      var e = this.dict.btnTipHandNode;
      e.stopAllActions();
      e.scale = 1;
      cc.tween(e).to(0.3, {
        scale: 1.1
      }).to(0.3, {
        scale: 1
      }).union().repeatForever().start();
      var n = this.dict.btnTipNode;
      var o = this.dict.lbBtnTip.getComponent(cc.Label);
      switch (t) {
        case "btnBomb":
          o.string = "试试炸弹？";
          break;
        case "btnRemove":
          o.string = "试试消除？";
          break;
        case "btnFlip":
          o.string = "试试翻转？";
      }
      var i = this.dict[t];
      n.active = true;
      n.stopAllActions();
      n.showByBtnName = "btnBomb";
      var a = i.parent.convertToWorldSpaceAR(i.position);
      var r = n.parent.convertToNodeSpaceAR(a);
      n.position = r;
      n.y = this._btnLayoutNodeOldPos.y;
      n.showByBtnName = t;
      cc.tween(n).delay(5).call(function () {
        n.active = false;
      }).start();
      e.opacity = this.dict.btnLayoutNode.active ? 255 : 0;
    }
  };
  e.prototype.hideBtnTip = function (t) {
    var e = this.dict.btnTipNode;
    if (e.showByBtnName && e.showByBtnName == t) {
      e.active = false;
    }
  };
  e.prototype.showFlyFruit = function () {};
  return a([k, I("ui/gameView_content")], e);
}(h.default);
exports.default = S;