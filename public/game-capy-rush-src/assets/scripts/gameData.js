var o = this && this.__awaiter || function (t, e, n, o) {
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
var i = this && this.__generator || function (t, e) {
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
var a = require("./ManageCtl");
var r = require("./MyPlatform");
var s = require("./SdkConfig");
var c = require("./MyTool");
var l = require("./jsonConfig");
var u = require("./myJsonCtl");
var d = require("./ServerData_tt");
var h = function () {
  function t() {
    this._soundSwitch = 1;
    this._musicSwitch = 1;
    this._shakeSwitch = 1;
    this._openGameCount = 0;
    this._lastLoginDate = -1;
    this._loginDay = 0;
    this._showPath = 1;
    this._modePassLv = {};
    this._modeUnlock = [];
    this._flagData = {};
    this._dayPropList = {};
    this._inviteIndex = 0;
    this._inviteCount = 0;
    this._signInInfo = {
      freeDone: 0,
      done: 0,
      index: 1,
      round: 1
    };
    this._getPetIdList = {};
    this._skinList = {
      1: {
        get: [1],
        use: 1,
        unlock: {}
      }
    };
    this._getPassRankData = {};
    this._showSignCount = 0;
    this._useProList = {};
    this._dayPassLv = 0;
    this._openAutoFlag = 0;
    this._collectInfo = {
      get: 0,
      cur: 0
    };
    this._dayShowSigninView = 0;
    this._curModeId = 1;
    this._curDevId = -1;
    this._curLevelId = 1;
    this.allRoleInfo = {};
    this.allLvRewardsInfo = {};
    this.allEquipmentInfo = {};
    this.allPetInfo = {};
    this.allMode1Info = null;
    this.modeEasyInfo = {};
    this._notSaveFlagData = {};
    this._levelTime = -1;
    this.canSendFirst_progress = false;
    this.oldSkillBuffData = {};
    this.newSkillBuffData = {};
    this.userName = "游客";
    this.userHeadUrl = "";
    this.removeTemporaryCount = 0;
    this.clearTemporaryCount = 0;
    this.reloadLevelCount = 0;
    this.loseAutoReviveFlag = true;
    this.levelGetFruitCount = 0;
    this.haveGetNewCollectFlag = false;
    this.passEasyFlag = false;
    this.game_lvgrade = 1;
    this.gameLoseCount = 0;
    this.gameHideBtn = 0;
    this.expt_1746523179 = "0";
    this.loadDataDoneFlag = false;
    this.dataKey = {
      soundSwitch: "soundSwitch",
      musicSwitch: "musicSwitch",
      shakeSwitch: "shakeSwitch",
      lastLoginDate: "lastLoginDate",
      openGameCount: "openGameCount",
      loginDay: "loginDay",
      flagData: "flagData",
      modePassLv: "modePassLv",
      showPath: "showPath",
      dayPropList: "dayPropList",
      inviteIndex: "inviteIndex",
      inviteCount: "inviteCount",
      signInInfo: "signInInfo",
      getPetIdList: "getPetIdList",
      skinList: "skinList",
      getPassRankData: "getPassRankData",
      showSignCount: "showSignCount",
      useProList: "useProList",
      dayPassLv: "dayPassLv",
      modeUnlock: "modeUnlock",
      openAutoFlag: "openAutoFlag",
      collectInfo: "collectInfo",
      dayShowSigninView: "dayShowSigninView"
    };
  }
  t.GetInstance = function () {
    if (!t.instance) {
      t.instance = new t();
    }
    return this.instance;
  };
  t.prototype.loadData = function () {
    return o(this, undefined, undefined, function () {
      var t;
      var e;
      var n;
      return i(this, function (o) {
        switch (o.label) {
          case 0:
            this._soundSwitch = this.loadNumData(this.dataKey.soundSwitch, 1);
            this._musicSwitch = this.loadNumData(this.dataKey.musicSwitch, 1);
            this._shakeSwitch = this.loadNumData(this.dataKey.shakeSwitch, 1);
            this._openGameCount = this.loadNumData(this.dataKey.openGameCount, 0);
            this._lastLoginDate = this.loadNumData(this.dataKey.lastLoginDate, -1);
            this._loginDay = this.loadNumData(this.dataKey.loginDay, 0);
            this._showPath = this.loadNumData(this.dataKey.showPath, 1);
            this._inviteIndex = this.loadNumData(this.dataKey.inviteIndex, 0);
            this._inviteCount = this.loadNumData(this.dataKey.inviteCount, 0);
            this._flagData = this.loadJsonData(this.dataKey.flagData, {});
            this._modePassLv = this.loadJsonData(this.dataKey.modePassLv, {});
            this._dayPropList = this.loadJsonData(this.dataKey.dayPropList, {});
            this._signInInfo = this.loadJsonData(this.dataKey.signInInfo, {
              freeDone: 0,
              done: 0,
              index: 1,
              round: 1
            });
            this._getPetIdList = this.loadJsonData(this.dataKey.getPetIdList, {});
            this._skinList = this.loadJsonData(this.dataKey.skinList, {
              1: {
                get: [1],
                use: 1,
                unlock: {}
              }
            });
            this._getPassRankData = this.loadJsonData(this.dataKey.getPassRankData, {});
            this._showSignCount = this.loadNumData(this.dataKey.showSignCount, 0);
            this._useProList = this.loadJsonData(this.dataKey.useProList, {});
            this._dayPassLv = this.loadNumData(this.dataKey.dayPassLv, 0);
            this._modeUnlock = this.loadJsonData(this.dataKey.modeUnlock, []);
            this._openAutoFlag = this.loadNumData(this.dataKey.openAutoFlag, 0);
            this._dayShowSigninView = this.loadNumData(this.dataKey.dayShowSigninView, 0);
            this._collectInfo = this.loadJsonData(this.dataKey.collectInfo, {
              get: 0,
              cur: 0
            });
            if (this._openAutoFlag == 1) {
              r.default.isH5_NOADS = true;
              window.game_isNOADS = true;
              window.h5_daren = true;
            }
            if (this._skinList[1] && this._skinList[1].use) {
              window.f31313_player_skin = this._skinList[1].use;
            } else {
              window.f31313_player_skin = 1;
            }
            if (this._skinList[2] && this._skinList[2].use) {
              window.f31313_map_skin = this._skinList[2].use;
            } else {
              window.f31313_map_skin = 1;
            }
            if (this._skinList[3] && this._skinList[3].use) {
              window.f31313_food_skin = this._skinList[3].use;
            } else {
              window.f31313_food_skin = 1;
            }
            if (!this._signInInfo.freeDone) {
              this._signInInfo.freeDone = this._signInInfo.done == 1 ? 1 : 0;
            }
            this.dealWithOldData();
            t = c.MyTool.getDate();
            if (this._lastLoginDate != t) {
              this._loginDay += 1;
              this._lastLoginDate = t;
              this.saveData(this.dataKey.loginDay, this._loginDay);
              this.saveData(this.dataKey.lastLoginDate, this._lastLoginDate);
              this.resetDayData();
            }
            e = this;
            return [4, u.myJsonCtl.getJson(l.jsonName.mode1)];
          case 1:
            e.allMode1Info = o.sent();
            n = this;
            return [4, u.myJsonCtl.getJson(l.jsonName.modeEasy)];
          case 2:
            n.modeEasyInfo = o.sent();
            console.log("## loadData Done");
            this.loadDataDoneFlag = true;
            return [2];
        }
      });
    });
  };
  t.prototype.dealWithOldData = function () {
    return o(this, undefined, undefined, function () {
      var t;
      var e;
      var n;
      var o;
      var a;
      var r;
      var s;
      return i(this, function (i) {
        switch (i.label) {
          case 0:
            t = this.getPassLvByMode(1);
            return [4, u.myJsonCtl.getJson(l.jsonName.pet)];
          case 1:
            e = i.sent();
            n = 0;
            for (s in e) {
              n = Number(s);
              if (e[s].unlockLv && t >= e[s].unlockLv) {
                if (!this.checkGetPetIdListById(n)) {
                  this._getPetIdList[n] = {
                    get: 1,
                    use: 0
                  };
                }
              }
            }
            o = 1;
            a = 1;
            return [4, u.myJsonCtl.getJson(l.jsonName.gameSkin)];
          case 2:
            for (s in r = i.sent()) {
              o = r[s].typeId;
              a = r[s].skinId;
              if (r[s].unlockLv && t + 1 >= r[s].unlockLv) {
                if (!this._skinList[o]) {
                  this._skinList[o] = {
                    get: [1],
                    use: 1,
                    unlock: {
                      skinId: 0
                    }
                  };
                }
                if (!this._skinList[o].get.includes(a)) {
                  this._skinList[o].get.push(a);
                }
              }
            }
            return [2];
        }
      });
    });
  };
  t.prototype.loadNumData = function (t, e) {
    if (e === undefined) {
      e = 0;
    }
    var n = cc.sys.localStorage.getItem(this.getSaveKey(t)) || e;
    if (n) {
      n = Number(n);
    }
    return n;
  };
  t.prototype.loadJsonData = function (t, e) {
    var n = e;
    var o = cc.sys.localStorage.getItem(this.getSaveKey(t)) || JSON.stringify(e);
    if (o) {
      n = JSON.parse(o);
    }
    return n;
  };
  t.prototype.resetDayData = function () {
    this._dayPropList = {};
    this.saveData(this.dataKey.dayPropList, JSON.stringify(this._dayPropList));
    this._dayShowSigninView = 0;
    this.saveData(this.dataKey.dayShowSigninView, this._dayShowSigninView);
    if (this._signInInfo.freeDone == 1 || this._signInInfo.done == 1) {
      this._signInInfo.done = 0;
      this._signInInfo.freeDone = 0;
      var t = this._signInInfo.index;
      t += 1;
      this._signInInfo.index = t;
      this.saveData(this.dataKey.signInInfo, JSON.stringify(this._signInInfo));
    }
    this._showSignCount = 0;
    this.saveData(this.dataKey.showSignCount, this._showSignCount);
    this._dayPassLv = 0;
    this.saveData(this.dataKey.dayPassLv, this._dayPassLv);
    cc.sys.localStorage.setItem("kpbl_canGetWxGetFavorite", null);
    a.ManageCtl.gameData.setFlagData(s.MyConstans.projectName + "_wxGetFavorite", null);
  };
  t.prototype.getSaveKey = function (t) {
    return s.MyConstans.projectName + "_" + t;
  };
  t.prototype.saveData = function (t, e) {
    cc.sys.localStorage.setItem(this.getSaveKey(t), e);
  };
  t.prototype.clearData = function () {
    this._soundSwitch = 1;
    this._musicSwitch = 1;
  };
  t.prototype.setSoundSwitch = function (t) {
    this._soundSwitch = t ? 1 : 0;
    this.saveData(this.dataKey.soundSwitch, this._soundSwitch);
  };
  t.prototype.getSoundSwitch = function () {
    return this._soundSwitch == 1;
  };
  t.prototype.setMusicSwitch = function (t) {
    this._musicSwitch = t ? 1 : 0;
    this.saveData(this.dataKey.musicSwitch, this._musicSwitch);
  };
  t.prototype.getMusicSwitch = function () {
    return this._musicSwitch == 1;
  };
  t.prototype.setShakeSwitch = function (t) {
    this._shakeSwitch = t ? 1 : 0;
  };
  t.prototype.saveShakeSwitch = function () {
    this.saveData(this.dataKey.shakeSwitch, this._shakeSwitch);
  };
  t.prototype.getShakeSwitch = function () {
    return this._shakeSwitch == 1;
  };
  t.prototype.setCurModeId = function (t) {
    this._curModeId = t;
  };
  t.prototype.getCurModeId = function () {
    return this._curModeId;
  };
  t.prototype.setCurDevId = function (t) {
    this._curDevId = t;
  };
  t.prototype.getCurDevId = function () {
    return this._curDevId;
  };
  t.prototype.setCurLevelId = function (t) {
    this._curLevelId = t;
  };
  t.prototype.getCurLevelId = function () {
    return this._curLevelId;
  };
  t.prototype.getPassLvByMode = function (t) {
    if (this._modePassLv[t]) {
      return this._modePassLv[t];
    } else {
      return 0;
    }
  };
  t.prototype.setPassLvByMode = function (t, e) {
    if (!this._modePassLv[t]) {
      this._modePassLv[t] = 0;
    }
    return e > this._modePassLv[t] && (this._modePassLv[t] = e, this.saveData(this.dataKey.modePassLv, JSON.stringify(this._modePassLv)), d.default.GetInstance().checkSaveServerData("modePassLv", JSON.stringify(this._modePassLv)), true);
  };
  t.prototype.setModePassLvByStr = function (t) {
    if (t) {
      var e = JSON.parse(t);
      for (var n in e) {
        if (e[n] && this._modePassLv[n] && this._modePassLv[n] > e[n]) {
          e[n] = this._modePassLv[n];
        }
        if (this._modePassLv[n] && !e[n]) {
          e[n] = this._modePassLv[n];
        }
      }
      this._modePassLv = e;
      this.saveData(this.dataKey.modePassLv, JSON.stringify(this._modePassLv));
    }
  };
  t.prototype.getNextDevLv = function (t, e) {
    return o(this, undefined, undefined, function () {
      var n;
      var o;
      var r;
      var s;
      var l;
      return i(this, function (i) {
        switch (i.label) {
          case 0:
            return [4, u.myJsonCtl.getJson(a.ManageCtl.getModeNameByModeId(t))];
          case 1:
            n = i.sent();
            o = e + 1;
            r = c.MyTool.getJsonLength(n);
            if (t == 5 && o > r) {
              return [2, {
                nextModeId: -1,
                devLv: -1
              }];
            } else {
              if (o > r) {
                s = 1;
                if (t == 1) {
                  s = 11;
                }
                if (r >= 2) {
                  l = c.MyTool.myRandom(s, r);
                  o = l;
                } else {
                  o = 1;
                }
              }
              return [2, {
                nextModeId: -1,
                devLv: n[o].LevelId1
              }];
            }
        }
      });
    });
  };
  t.prototype.resetLevelGameTime = function () {
    this._levelTime = c.MyTool.getTime();
  };
  t.prototype.getLevelGameTime = function () {
    if (this._levelTime <= 0) {
      this._levelTime = c.MyTool.getTime();
    }
    return c.MyTool.getTime() - this._levelTime;
  };
  t.prototype.getOpenGameCount = function () {
    return this._openGameCount;
  };
  t.prototype.addOpenGameCount = function () {
    this._openGameCount += 1;
    this.saveData(this.dataKey.openGameCount, this._openGameCount);
  };
  t.prototype.getLoginDay = function () {
    return this._loginDay;
  };
  t.prototype.getFlagData = function (t) {
    return this._flagData[t];
  };
  t.prototype.setFlagData = function (t, e) {
    this._flagData[t] = e;
    this.saveData(this.dataKey.flagData, JSON.stringify(this._flagData));
    d.default.GetInstance().checkSaveServerData("flagData", JSON.stringify(this._flagData));
  };
  t.prototype.setFlagDataByStr = function (t) {
    if (t) {
      this._flagData = JSON.parse(t);
      this.saveData(this.dataKey.flagData, JSON.stringify(this._flagData));
    }
  };
  t.prototype.getNotSaveFlagData = function (t) {
    return this._notSaveFlagData[t];
  };
  t.prototype.setNotSaveFlagData = function (t, e) {
    this._notSaveFlagData[t] = e;
  };
  t.prototype.setShowPath = function (t) {
    this._showPath = t;
    this.saveData(this.dataKey.showPath, this._showPath);
  };
  t.prototype.getShowPath = function () {
    return this._showPath;
  };
  t.prototype.getGameProgress = function () {
    return window.game_turtleProgress || 0;
  };
  t.prototype.getGameCurAtkSwordCount = function () {
    return window.level_curAtkSwordCount || 0;
  };
  t.prototype.addDayPropById = function (t, e) {
    if (!this._dayPropList[t]) {
      this._dayPropList[t] = {
        count: 0
      };
    }
    this._dayPropList[t].count += e;
    if (this._dayPropList[t].count < 0) {
      this._dayPropList[t].count = 0;
    }
    this.saveData(this.dataKey.dayPropList, JSON.stringify(this._dayPropList));
  };
  t.prototype.addDayPropByArr = function (t) {
    for (var e = 0; e < t.length; e++) {
      var n = t[e];
      var o = n[0];
      var i = n[1];
      if (!this._dayPropList[o]) {
        this._dayPropList[o] = {
          count: 0
        };
      }
      this._dayPropList[o].count += i;
    }
    this.saveData(this.dataKey.dayPropList, JSON.stringify(this._dayPropList));
  };
  t.prototype.getDayPropCountById = function (t) {
    if (this._dayPropList[t]) {
      return this._dayPropList[t].count;
    } else {
      return 0;
    }
  };
  t.prototype.getInviteIndex = function () {
    return this._inviteIndex;
  };
  t.prototype.addInviteIndex = function (t) {
    this._inviteIndex += t;
    this.saveData(this.dataKey.inviteIndex, this._inviteIndex);
  };
  t.prototype.setInviteIndex = function (t) {
    this._inviteIndex = t;
    this.saveData(this.dataKey.inviteIndex, this._inviteIndex);
  };
  t.prototype.getInviteCount = function () {
    return this._inviteCount;
  };
  t.prototype.setInviteCount = function (t) {
    this._inviteCount = t;
    this.saveData(this.dataKey.inviteCount, this._inviteCount);
  };
  t.prototype.getSignInInfo = function () {
    return this._signInInfo;
  };
  t.prototype.setSignInDone = function () {
    if (this._signInInfo.freeDone) {
      this._signInInfo.done = 1;
    } else {
      this._signInInfo.freeDone = 1;
    }
    this.saveData(this.dataKey.signInInfo, JSON.stringify(this._signInInfo));
  };
  t.prototype.addGetPetIdList = function (t) {
    if (!this._getPetIdList[t]) {
      this._getPetIdList[t] = {
        get: 1,
        use: 0
      };
    }
    this._getPetIdList[t].get = 1;
    this.saveData(this.dataKey.getPetIdList, JSON.stringify(this._getPetIdList));
    d.default.GetInstance().checkSaveServerData("getPetIdList", JSON.stringify(this._getPetIdList));
  };
  t.prototype.getPetInfoById = function (t) {
    if (!this._getPetIdList[t]) {
      this._getPetIdList[t] = {
        get: 0,
        use: 0
      };
    }
    return this._getPetIdList[t];
  };
  t.prototype.checkGetPetIdListById = function (t) {
    if (!this._getPetIdList[t]) {
      this._getPetIdList[t] = {
        get: 0,
        use: 0
      };
    }
    return this._getPetIdList[t].get == 1;
  };
  t.prototype.haveUsePet = function () {
    for (var t in this._getPetIdList) {
      if (this._getPetIdList[t] && this._getPetIdList[t].use == 1) {
        return Number(t);
      }
    }
    return 0;
  };
  t.prototype.setPetIdUse = function (t, e) {
    if (e == 1) {
      for (var n in this._getPetIdList) {
        this._getPetIdList[n].use = 0;
      }
    }
    this._getPetIdList[t] = {
      get: 1,
      use: e
    };
    this.saveData(this.dataKey.getPetIdList, JSON.stringify(this._getPetIdList));
    d.default.GetInstance().checkSaveServerData("getPetIdList", JSON.stringify(this._getPetIdList));
  };
  t.prototype.setGetPetIdListByStr = function (t) {
    if (t) {
      this._getPetIdList = JSON.parse(t);
      this.saveData(this.dataKey.getPetIdList, JSON.stringify(this._getPetIdList));
    }
  };
  t.prototype.isGetNewSkin = function () {
    if (!this._skinList.getNew) {
      return false;
    }
    for (var t in this._skinList.getNew) {
      if (this._skinList.getNew[t]) {
        return true;
      }
    }
    return false;
  };
  t.prototype.getSkinInfoByTypeId = function (t) {
    if (!this._skinList[t]) {
      this._skinList[t] = {
        get: [1],
        use: 1,
        unlock: {}
      };
    }
    return this._skinList[t];
  };
  t.prototype.addSkinUnlockCountById = function (t, e, n) {
    if (!this._skinList[t]) {
      this._skinList[t] = {
        get: [1],
        use: 1,
        unlock: {
          skinId: 0
        }
      };
    }
    if (!this._skinList[t].unlock[e]) {
      this._skinList[t].unlock[e] = 0;
    }
    var o = false;
    this._skinList[t].unlock[e] += 1;
    if (this._skinList[t].unlock[e] >= n && !this._skinList[t].get.includes(e)) {
      this._skinList[t].get.push(e);
      this._skinList[t].use = e;
      if (t == 1) {
        window.f31313_player_skin = e;
      } else if (t == 2) {
        window.f31313_map_skin = e;
        if (this._skinList[2].use >= 3) {
          switch (this._skinList[2].use) {
            case 3:
              window.game_dragonIdStr = "gtl";
              break;
            case 4:
              window.game_dragonIdStr = "s";
              break;
            case 5:
              window.game_dragonIdStr = "s2";
          }
        } else {
          window.game_dragonIdStr = null;
        }
      } else if (t == 3) {
        window.f31313_food_skin = e;
      }
      o = true;
    }
    this.saveData(this.dataKey.skinList, JSON.stringify(this._skinList));
    d.default.GetInstance().checkSaveServerData("skinList", JSON.stringify(this._skinList));
    return o;
  };
  t.prototype.getSkinById = function (t, e) {
    var n = false;
    if (!this._skinList[t]) {
      this._skinList[t] = {
        get: [1],
        use: 1,
        unlock: {}
      };
    }
    if (!this._skinList[t].get.includes(e)) {
      this._skinList[t].get.push(e);
      n = true;
    }
    if (!this._skinList.getNew) {
      this._skinList.getNew = {};
    }
    this._skinList.getNew[t] = 1;
    this.saveData(this.dataKey.skinList, JSON.stringify(this._skinList));
    d.default.GetInstance().checkSaveServerData("skinList", JSON.stringify(this._skinList));
    return n;
  };
  t.prototype.setSkinUse = function (t, e) {
    if (!this._skinList[t]) {
      this._skinList[t] = {
        get: [1],
        use: 1,
        unlock: {
          skinId: 0
        }
      };
    }
    if (!this._skinList[t].use) {
      this._skinList[t].use = e;
    }
    if (!this._skinList[t].get) {
      this._skinList[t].get = [];
    }
    if (!this._skinList[t].get.includes(e)) {
      this._skinList[t].get.push(e);
    }
    this._skinList[t].use = e;
    if (t == 1) {
      window.f31313_player_skin = e;
    } else if (t == 2) {
      window.f31313_map_skin = e;
      if (this._skinList[2].use >= 3) {
        switch (this._skinList[2].use) {
          case 3:
            window.game_dragonIdStr = "gtl";
            break;
          case 4:
            window.game_dragonIdStr = "s";
            break;
          case 5:
            window.game_dragonIdStr = "s2";
        }
      } else {
        window.game_dragonIdStr = null;
      }
    } else if (t == 3) {
      window.f31313_food_skin = e;
    }
  };
  t.prototype.setSkinGetNewDone = function (t) {
    if (!this._skinList.getNew) {
      this._skinList.getNew = {};
    }
    this._skinList.getNew[t] = 0;
  };
  t.prototype.getSkinGetNewInfo = function () {
    if (!this._skinList.getNew) {
      this._skinList.getNew = {};
    }
    return this._skinList.getNew;
  };
  t.prototype.saveSkinInfo = function () {
    this.saveData(this.dataKey.skinList, JSON.stringify(this._skinList));
    d.default.GetInstance().checkSaveServerData("skinList", JSON.stringify(this._skinList));
  };
  t.prototype.setSkinListByStr = function (t) {
    if (t) {
      this._skinList = JSON.parse(t);
      this.saveData(this.dataKey.skinList, JSON.stringify(this._skinList));
    }
  };
  t.prototype.getWxUserInfo = function () {
    return {
      userName: this.userName,
      userHeadUrl: this.userHeadUrl
    };
  };
  t.prototype.setWxUserInfo = function (t, e) {
    this.userName = t;
    this.userHeadUrl = e;
  };
  t.prototype.getPassRankData = function () {
    return this._getPassRankData;
  };
  t.prototype.setPassRankData = function (t) {
    this._getPassRankData = t;
    this.saveData(this.dataKey.getPassRankData, JSON.stringify(this._getPassRankData));
  };
  t.prototype.addShowSignCount = function (t) {
    this._showSignCount += t;
    if (this._showSignCount < 0) {
      this._showSignCount = 0;
    }
    this.saveData(this.dataKey.showSignCount, this._showSignCount);
    return this._showSignCount;
  };
  t.prototype.getShowSignCount = function () {
    return this._showSignCount;
  };
  t.prototype.resetShowSignCount = function () {
    this._showSignCount = 0;
    this.saveData(this.dataKey.showSignCount, this._showSignCount);
  };
  t.prototype.checkIsUseProp = function (t) {
    return !!this._useProList[t];
  };
  t.prototype.setPropUse = function (t) {
    this._useProList[t] = {};
    this.saveData(this.dataKey.useProList, JSON.stringify(this._useProList));
  };
  t.prototype.addDayPassLv = function () {
    this._dayPassLv += 1;
    this.saveData(this.dataKey.dayPassLv, this._dayPassLv);
    return this._dayPassLv;
  };
  t.prototype.getDayPassLv = function () {
    return this._dayPassLv;
  };
  t.prototype.checkModeIsUnlock = function (t) {
    return !!this._modeUnlock.includes(t);
  };
  t.prototype.setModeUnlock = function (t) {
    if (!this._modeUnlock.includes(t)) {
      this._modeUnlock.push(t);
      this.saveData(this.dataKey.modeUnlock, JSON.stringify(this._modeUnlock));
      d.default.GetInstance().checkSaveServerData("modeUnlock", JSON.stringify(this._modeUnlock));
    }
  };
  t.prototype.setModeUnlockByStr = function (t) {
    if (t) {
      var e = JSON.parse(t);
      if (e.length > this._modeUnlock.length) {
        this._modeUnlock = e;
        this.saveData(this.dataKey.modeUnlock, JSON.stringify(this._modeUnlock));
      }
    }
  };
  t.prototype.setOpenAutoFlag = function (t) {
    this._openAutoFlag = t;
    this.saveData(this.dataKey.openAutoFlag, this._openAutoFlag);
  };
  t.prototype.getOpenAutoFlag = function () {
    return this._openAutoFlag;
  };
  t.prototype.addCollect = function () {
    this.haveGetNewCollectFlag = false;
    return !(this._collectInfo.get >= s.MyConstans.num_collectAllCount || (this._collectInfo.cur += 1, this._collectInfo.cur >= 5 && (this._collectInfo.get += 1, this._collectInfo.cur = 0, this.haveGetNewCollectFlag = true), this.saveData(this.dataKey.collectInfo, JSON.stringify(this._collectInfo)), 0));
  };
  t.prototype.getCollectInfo = function () {
    return this._collectInfo;
  };
  t.prototype.getDayShowSigninView = function () {
    return this._dayShowSigninView;
  };
  t.prototype.setDayShowSigninView = function (t) {
    this._dayShowSigninView = t;
    this.saveData(this.dataKey.dayShowSigninView, this._dayShowSigninView);
  };
  t.prototype.checkDevLvIsRight = function (t) {
    var e = this.allMode1Info;
    for (var n in e) {
      if (e[n].LevelId2 == t) {
        return true;
      }
    }
    return false;
  };
  t.instance = null;
  return t;
}();
exports.default = h;