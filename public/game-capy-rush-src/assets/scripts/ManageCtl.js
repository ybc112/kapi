Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManageCtl = undefined;
var o = require("./MyPlatform");
var i = require("./SdkConfig");
var a = require("./AudioManager");
var r = require("./BmsCtl");
var s = require("./MyAdCtl");
var c = require("./MyMsgCtl");
var l = require("./statsCtl");
var u = require("./ttPostbackCtl");
var d = require("./UIManage");
var h = require("./jsonConfig");
var p = require("./gameData");
var f = require("./MyTool");
(function (t) {
  t.persistRootNode = null;
  t.myMsgCtl = null;
  t.uiManage = null;
  t.gameData = null;
  t.audioManager = null;
  t.bmsCtl = null;
  t.init = function () {
    o.default.instance.init(window.splashCustomPlatform);
    u.default.GetInstance().init();
    this.myMsgCtl = c.default.GetInstance();
    this.uiManage = d.default.GetInstance();
    this.gameData = p.default.GetInstance();
    this.audioManager = a.default.instance;
    this.bmsCtl = r.default.GetInstance();
    this.gameData.loadData();
    this.gameData.addOpenGameCount(1);
    a.default.isMusicOn = this.gameData.getMusicSwitch();
    a.default.isAudioOn = this.gameData.getSoundSwitch();
    window.game_musicOpen = a.default.isMusicOn;
    window.game_audioOpen = a.default.isAudioOn;
  };
  t.setMyPersistRootNode = function (t) {
    this.persistRootNode = t;
  };
  t.getModeNameByModeId = function (t) {
    var e = "";
    var n = {
      1: h.jsonName.mode1
    };
    switch (t) {
      case 1:
        e = p.default.GetInstance().expt_1746523179 == "1" ? h.jsonName.group1 : p.default.GetInstance().expt_1746523179 == "2" ? h.jsonName.group2 : n[t];
        break;
      default:
        e = n[t];
    }
    return e;
  };
  t.playVideo = function (e) {
    var n = this;
    t.gamePause();
    a.default.instance.pauseBGM2();
    s.MyAdCtl.playVideo(function (o) {
      if (!n.checkGamePause()) {
        t.gameResume();
      }
      a.default.instance.resumeBGM2();
      if (o == 0) {
        if (t.gameData.canSendFirst_progress && !p.default.GetInstance().getNotSaveFlagData(i.MyConstans.projectName + "_playVideo")) {
          var r = p.default.GetInstance().getCurModeId();
          var s = p.default.GetInstance().getCurLevelId();
          var c = p.default.GetInstance().getCurDevId();
          l.statsCtl.sendEventShuShu("First_progress", {
            mode: r,
            devid: c,
            lv: s,
            progress: t.gameData.getGameProgress(),
            type: 2,
            lvgrade: t.gameData.game_lvgrade
          });
          p.default.GetInstance().setNotSaveFlagData(i.MyConstans.projectName + "_playVideo", {});
        }
        if (e) {
          e(true);
        }
      } else if (o == 1) {
        t.persistRootNode.showTipsUI("播放中途退出");
      } else if (!(-1 != o && -3 != o)) {
        t.persistRootNode.showTipsUI("暂无广告，敬请期待");
      }
    });
  };
  t.isH5_NOADS = function () {
    return o.default.isH5_NOADS || o.default.isH5_NOADS_fdttt;
  };
  t.isZJTD = function () {
    return o.default.isZJTD || o.default.isZJTD_fdttt || o.default.isZJTD_dpxx || o.default.isZJTD_xmdel || o.default.isZJTD_yjtl;
  };
  t.isKS = function () {
    return o.default.isKS || o.default.isKS_nxwz;
  };
  t.isAuditingPlatform = function () {
    return false;
  };
  t.vibratePlatform = function () {
    return this.isZJTD() || this.isWx();
  };
  t.getOtherLevelId = function (t, e, n) {
    if (t != 1) {
      var o = f.MyTool.getJsonLength(n);
      if (!isNaN(e)) {
        var i = e;
        if (i > o) {
          if ((i = e % o) == 0) {
            i = o;
          }
          console.log("## change 2 key: ", i);
        }
        return i;
      }
    }
    return e;
  };
  t.isZFBPlatform = function () {
    return o.default.isZFB || o.default.isZFB_wdlsz6;
  };
  t.isWx = function () {
    return o.default.isWX || o.default.isWX_xmdel;
  };
  t.gameResume = function () {
    window.game_pause_game = 0;
    console.log("## 恢复");
    cc.game.emit("wzzc_resume_game");
  };
  t.gamePause = function () {
    window.game_pause_game = 1;
    cc.game.emit("wzzc_pause_game");
  };
  t.getAllRoleInfo = function () {
    return p.default.GetInstance().allRoleInfo;
  };
  t.checkGamePause = function () {
    var t = window.mainScene;
    var e = t.node.getChildByName("gameView");
    if (e && (t.node.childrenCount >= window.mainSceneInitChildCount + 2 || e.childrenCount >= window.gameViewInitChildCount)) {
      if (e.childrenCount >= window.gameViewInitChildCount + 1) {
        return true;
      }
      for (var n = 0, o = 0; o < t.node.childrenCount; o++) {
        if (t.node.children[o].name != "debugNode") {
          n += 1;
        }
      }
      if (n >= window.mainSceneInitChildCount + 2) {
        return true;
      }
    }
    return false;
  };
  t.getModeInfo = function (e) {
    var n = t.bmsCtl.getConditionValueByType(e);
    if (!n || n && n.length <= 0) {
      return t.gameData.allMode1Info;
    }
    for (var o = {}, i = 1, a = 0; a < n.length; a++) {
      var r = n[a];
      if (t.gameData.checkDevLvIsRight(r)) {
        o[i] = {
          id: i,
          LevelId1: t.gameData.allMode1Info[i].LevelId1,
          LevelId2: r
        };
        i += 1;
      }
    }
    return o;
  };
})(exports.ManageCtl || (exports.ManageCtl = {}));