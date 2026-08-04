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
var s = require("./MyPlatform");
var c = require("./SdkConfig");
var l = require("./baseCompont");
var u = require("./AudioManager");
var d = require("./MyAdCtl");
var h = require("./MyAnimationTool");
var p = require("./myBtnClick");
var f = require("./uiPathManage");
var g = cc._decorator;
var m = g.ccclass;
g.property;
var y = g.menu;
var _ = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.bg = null;
    e.soundClose = null;
    e.soundOpen = null;
    e.musicClose = null;
    e.musicOpen = null;
    e.shakeClose = null;
    e.shakeOpen = null;
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
    r.ManageCtl.myMsgCtl.on(c.MyConstans.msg.httpRequestConfigSuccess, this.onhttpRequestConfigSuccess, this);
  };
  e.prototype.onDestroy = function () {
    r.ManageCtl.myMsgCtl.off(c.MyConstans.msg.httpRequestConfigSuccess, this.onhttpRequestConfigSuccess, this);
  };
  e.prototype.start = function () {
    this.initData2();
    this.onhttpRequestConfigSuccess();
    if (r.ManageCtl.isZFBPlatform()) {
      d.MyAdCtl.showBanner();
    }
    this.dict.btnCleanData.active = r.ManageCtl.isH5_NOADS();
    this.dict.btnMusic1.active = r.ManageCtl.persistRootNode.debug;
    this.dict.btnMusic2.active = r.ManageCtl.persistRootNode.debug;
  };
  e.prototype.onEnable = function () {
    h.MyAnimationTool.showViewAnimation(this.bg);
  };
  e.prototype.onDisable = function () {
    if (r.ManageCtl.isZFBPlatform()) {
      d.MyAdCtl.hideBanner();
    }
  };
  e.prototype.initData2 = function () {
    this.musicClose.active = u.default.isMusicOn;
    this.musicOpen.active = !this.musicClose.active;
    this.soundClose.active = u.default.isAudioOn;
    this.soundOpen.active = !this.soundClose.active;
    this.shakeClose.active = r.ManageCtl.gameData.getShakeSwitch();
    this.shakeOpen.active = !this.shakeClose.active;
    var t = s.default.FilingStr;
    this.dict.lbFiling.getComponent(cc.Label).string = t;
    this.dict.lbVersion.getComponent(cc.Label).string = "V " + s.default.BMS_VERSION;
  };
  e.prototype.btnCLick_music = function (t) {
    if (p.default.instance.baseBtnClick(this.node.name + t.target.name, 0.1)) {
      if (u.default.isMusicOn) {
        u.default.isMusicOn = false;
        r.ManageCtl.audioManager.pauseBGM();
        this.initData2();
      } else {
        u.default.isMusicOn = true;
        r.ManageCtl.audioManager.resumeBGM();
        this.initData2();
      }
    }
  };
  e.prototype.btnCLick_sound = function (t) {
    if (p.default.instance.baseBtnClick(this.node.name + t.target.name, 0.1)) {
      if (u.default.isAudioOn) {
        u.default.isAudioOn = false;
        r.ManageCtl.audioManager.stopAllEffect();
        this.initData2();
      } else {
        u.default.isAudioOn = true;
        r.ManageCtl.persistRootNode.playBtnSound();
        r.ManageCtl.audioManager.resumeAllEffect();
        this.initData2();
      }
    }
  };
  e.prototype.btnCLick_shake = function (t) {
    if (p.default.instance.baseBtnClick(this.node.name + t.target.name, 0.1)) {
      if (r.ManageCtl.gameData.getShakeSwitch()) {
        r.ManageCtl.gameData.setShakeSwitch(false);
        this.initData2();
      } else {
        r.ManageCtl.gameData.setShakeSwitch(true);
        this.initData2();
      }
    }
  };
  e.prototype.btnCLick_restoreBuy = function (t) {
    if (p.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      s.default.instance.restoreRemoveADs();
    }
  };
  e.prototype.btnClick_close = function (t) {
    if (p.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      r.ManageCtl.gameData.setMusicSwitch(u.default.isMusicOn);
      r.ManageCtl.gameData.setSoundSwitch(u.default.isAudioOn);
      r.ManageCtl.gameData.saveShakeSwitch();
      window.game_musicOpen = u.default.isMusicOn;
      window.game_audioOpen = u.default.isAudioOn;
      r.ManageCtl.uiManage.gotoDestroyUI(f.uiPath.uiName.popup_setView);
    }
  };
  e.prototype.onhttpRequestConfigSuccess = function () {
    this.dict.shakeNode.active = r.ManageCtl.vibratePlatform();
  };
  e.prototype.btnClick_clearData = function (t) {
    if (p.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      cc.sys.localStorage.clear();
      r.ManageCtl.gameData.clearData();
      r.ManageCtl.persistRootNode.showTipsUI("清除成功，请重启");
    }
  };
  e.prototype.btnCLick_music1 = function () {
    r.ManageCtl.audioManager.pauseBGM();
    r.ManageCtl.audioManager.PlayBGM("a_homeBg1");
  };
  e.prototype.btnCLick_music2 = function () {
    r.ManageCtl.audioManager.pauseBGM();
    r.ManageCtl.audioManager.PlayBGM("a_homeBg2");
  };
  return a([m, y("ui/popup_setView")], e);
}(l.default);
exports.default = _;