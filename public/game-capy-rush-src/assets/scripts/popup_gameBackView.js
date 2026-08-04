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
var h = require("./AudioManager");
var p = require("./MyAdCtl");
var f = require("./MyAnimationTool");
var g = require("./myBtnClick");
var m = require("./statsCtl");
var y = require("./uiPathManage");
var _ = require("./myJsonCtl");
var v = cc._decorator;
var C = v.ccclass;
v.property;
var w = v.menu;
var b = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.bg = null;
    e.soundClose = null;
    e.soundOpen = null;
    e.musicClose = null;
    e.musicOpen = null;
    e.shakeClose = null;
    e.shakeOpen = null;
    e._curModeId = 1;
    e._curDevId = 1;
    e._curLevelId = 1;
    e._openDrFlag = false;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.bg = this.dict.bg;
    this.soundClose = this.dict.soundClose;
    this.soundOpen = this.dict.soundOpen;
    this.musicClose = this.dict.musicClose;
    this.musicOpen = this.dict.musicOpen;
    this.shakeClose = this.dict.shakeClose;
    this.shakeOpen = this.dict.shakeOpen;
    this.dict.btnJumpLv.active = c.ManageCtl.isH5_NOADS() || c.ManageCtl.persistRootNode.debug;
    this.dict.editBoxJumpLv.active = c.ManageCtl.isH5_NOADS() || c.ManageCtl.persistRootNode.debug;
    this.dict.btnMusic1.active = c.ManageCtl.persistRootNode.debug;
    this.dict.btnMusic2.active = c.ManageCtl.persistRootNode.debug;
    c.ManageCtl.myMsgCtl.on(u.MyConstans.msg.httpRequestConfigSuccess, this.onhttpRequestConfigSuccess, this);
    c.ManageCtl.myMsgCtl.on(u.MyConstans.msg.openDr, this.onopenDr, this);
  };
  e.prototype.onDestroy = function () {
    c.ManageCtl.myMsgCtl.off(u.MyConstans.msg.httpRequestConfigSuccess, this.onhttpRequestConfigSuccess, this);
    c.ManageCtl.myMsgCtl.off(u.MyConstans.msg.openDr, this.onopenDr, this);
  };
  e.prototype.start = function () {
    this.initData2();
    this.onhttpRequestConfigSuccess();
    if (l.default.isZFB) {
      p.MyAdCtl.showBanner();
    }
    this.checkOpenDr();
    this.dict.btnCleanData.active = c.ManageCtl.isH5_NOADS();
  };
  e.prototype.onEnable = function () {
    f.MyAnimationTool.showViewAnimation(this.bg);
  };
  e.prototype.onDisable = function () {
    if (l.default.isZFB) {
      p.MyAdCtl.hideBanner();
    }
  };
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
            this.musicClose.active = h.default.isMusicOn;
            this.musicOpen.active = !this.musicClose.active;
            this.soundClose.active = h.default.isAudioOn;
            this.soundOpen.active = !this.soundClose.active;
            this.shakeClose.active = c.ManageCtl.gameData.getShakeSwitch();
            this.shakeOpen.active = !this.shakeClose.active;
            this.dict.lbVersion.getComponent(cc.Label).string = "V " + l.default.BMS_VERSION;
            return [2];
        }
      });
    });
  };
  e.prototype.btnClick_close = function (t) {
    if (g.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      if (this._openDrFlag) {
        c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.gameReLoadLevel);
      }
      this.gotoClose();
    }
  };
  e.prototype.btnClick_home = function (t) {
    if (g.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.showMainView);
      this.gotoClose();
    }
  };
  e.prototype.btnClick_replay = function (t) {
    if (g.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      cc.game.emit("onRestartBtn", {
        replay: true
      });
      this.gotoClose();
    }
  };
  e.prototype.btnClick_share = function (t) {
    if (g.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      l.default.instance.share(function (t) {
        if (t == 0) {
          c.ManageCtl.persistRootNode.showTipsUI("分享成功");
        }
      });
    }
  };
  e.prototype.btnClick_skip = function (t) {
    var e = this;
    if (g.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      c.ManageCtl.playVideo(function () {
        if (e.node && cc.isValid(e.node)) {
          m.statsCtl.sendEventShuShu("reward_btn", {
            mode: e._curModeId,
            devid: e._curDevId,
            lv: e._curLevelId,
            progress: c.ManageCtl.gameData.getGameProgress(),
            scene: "jumpLv",
            lvgrade: c.ManageCtl.gameData.game_lvgrade
          });
          cc.game.emit("game_success2");
          e.gotoClose();
        }
      });
    }
  };
  e.prototype.btnCLick_music = function (t) {
    if (g.default.instance.baseBtnClick(this.node.name + t.target.name, 0.1)) {
      if (h.default.isMusicOn) {
        h.default.isMusicOn = false;
        c.ManageCtl.audioManager.pauseBGM();
        this.initData2();
      } else {
        h.default.isMusicOn = true;
        c.ManageCtl.audioManager.resumeBGM();
        this.initData2();
      }
    }
  };
  e.prototype.btnCLick_sound = function (t) {
    if (g.default.instance.baseBtnClick(this.node.name + t.target.name, 0.1)) {
      if (h.default.isAudioOn) {
        h.default.isAudioOn = false;
        c.ManageCtl.audioManager.stopAllEffect();
        this.initData2();
      } else {
        h.default.isAudioOn = true;
        c.ManageCtl.persistRootNode.playBtnSound();
        c.ManageCtl.audioManager.resumeAllEffect();
        this.initData2();
      }
    }
  };
  e.prototype.btnCLick_shake = function (t) {
    if (g.default.instance.baseBtnClick(this.node.name + t.target.name, 0.1)) {
      if (c.ManageCtl.gameData.getShakeSwitch()) {
        c.ManageCtl.gameData.setShakeSwitch(false);
        this.initData2();
      } else {
        c.ManageCtl.gameData.setShakeSwitch(true);
        this.initData2();
      }
    }
  };
  e.prototype.gotoClose = function () {
    c.ManageCtl.gameData.setMusicSwitch(h.default.isMusicOn);
    c.ManageCtl.gameData.setSoundSwitch(h.default.isAudioOn);
    c.ManageCtl.gameData.saveShakeSwitch();
    window.game_musicOpen = h.default.isMusicOn;
    window.game_audioOpen = h.default.isAudioOn;
    c.ManageCtl.uiManage.gotoDestroyUI(y.uiPath.uiName.popup_gameBackView);
  };
  e.prototype.onhttpRequestConfigSuccess = function () {
    this.dict.shakeNode.active = c.ManageCtl.vibratePlatform();
  };
  e.prototype.btnClicl_jumpDevLv = function () {
    return r(this, undefined, undefined, function () {
      var t;
      var e;
      var n;
      return s(this, function (o) {
        switch (o.label) {
          case 0:
            if ((t = this.dict.editBoxJumpLv.getComponent(cc.EditBox)).string) {
              e = Number(t.string);
              if (isNaN(e)) {
                c.ManageCtl.persistRootNode.showTipsUI("请输入正确的关卡顺序");
                return [2];
              } else {
                return [4, _.myJsonCtl.getJsonInfoByKey(c.ManageCtl.getModeNameByModeId(this._curModeId), e, true)];
              }
            } else {
              return [2, c.ManageCtl.persistRootNode.showTipsUI("请输入关卡顺序")];
            }
          case 1:
            n = o.sent();
            c.ManageCtl.gameData.setCurModeId(this._curModeId);
            c.ManageCtl.gameData.setCurDevId(n.LevelId1);
            c.ManageCtl.gameData.setCurLevelId(e);
            c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.showGameView);
            c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.gameReLoadLevel);
            c.ManageCtl.isH5_NOADS();
            this.gotoClose();
            return [2];
        }
      });
    });
  };
  e.prototype.toogleChange_path = function () {
    if (this.dict.togglePath.getComponent(cc.Toggle).isChecked) {
      c.ManageCtl.gameData.setShowPath(1);
      c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.showPathNode, true);
    } else {
      c.ManageCtl.gameData.setShowPath(0);
      c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.showPathNode, false);
    }
  };
  e.prototype.click_hideBtnToogle = function (t) {
    if (t.getComponent(cc.Toggle).isChecked) {
      c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.showBtnHide, true);
    } else {
      c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.showBtnHide, false);
    }
  };
  e.prototype.onopenDr = function () {
    this._openDrFlag = true;
    this.checkOpenDr();
  };
  e.prototype.checkOpenDr = function () {
    this.dict.togglePath.active = c.ManageCtl.isH5_NOADS();
    var t = c.ManageCtl.gameData.getShowPath();
    if (this.dict.togglePath.active) {
      if (t) {
        this.dict.togglePath.getComponent(cc.Toggle).check();
        c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.showPathNode, true);
      } else {
        this.dict.togglePath.getComponent(cc.Toggle).uncheck();
        c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.showPathNode, false);
      }
    }
    this.dict.toggleHideBtn.active = c.ManageCtl.isH5_NOADS();
  };
  e.prototype.btnClick_clearData = function (t) {
    if (g.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      cc.sys.localStorage.clear();
      c.ManageCtl.gameData.clearData();
      c.ManageCtl.persistRootNode.showTipsUI("清除成功，请重启");
    }
  };
  e.prototype.btnCLick_music1 = function () {
    c.ManageCtl.audioManager.pauseBGM();
    c.ManageCtl.audioManager.PlayBGM("a_homeBg1");
  };
  e.prototype.btnCLick_music2 = function () {
    c.ManageCtl.audioManager.pauseBGM();
    c.ManageCtl.audioManager.PlayBGM("a_homeBg2");
  };
  return a([C, w("ui/popup_gameBackView")], e);
}(d.default);
exports.default = b;