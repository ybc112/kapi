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
var p = require("./MyTool");
var f = require("./myBtnClick");
var g = require("./statsCtl");
var m = require("./uiPathManage");
var y = require("./jsonConfig");
var _ = require("./myJsonCtl");
var v = cc._decorator;
var C = v.ccclass;
var w = v.property;
var b = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.iconSpriteFrame = [];
    e.bg = null;
    e._closeCallback = null;
    e._beginFlag = false;
    e._itemArr = [];
    e._probabilityArr = [];
    e._curModeId = 1;
    e._curDevId = 1;
    e._curLevelId = 1;
    e._nextDevId = -1;
    e._nextLevelId = 1;
    e._nextModeId = -1;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.bg = this.dict.bg;
  };
  e.prototype.start = function () {
    this.bg.scale = 0;
    cc.tween(this.bg).to(0.15, {
      scale: 1
    }).start();
  };
  e.prototype.initData = function (t) {
    return r(this, undefined, undefined, function () {
      var e;
      var n;
      var o;
      var i;
      var a;
      var r;
      var d = this;
      return s(this, function (s) {
        switch (s.label) {
          case 0:
            this._curModeId = c.ManageCtl.gameData.getCurModeId();
            e = this;
            return [4, c.ManageCtl.gameData.getCurDevId()];
          case 1:
            e._curDevId = s.sent();
            this._curLevelId = c.ManageCtl.gameData.getCurLevelId();
            this._closeCallback = t.callback;
            return [4, _.myJsonCtl.getJson(y.jsonName.wheel)];
          case 2:
            for (o in n = s.sent()) {
              this._itemArr.push(n[o]);
              this._probabilityArr.push(0.01 * n[o].probability);
            }
            if (i = this.dict.circleNode) {
              a = null;
              r = null;
              i.children.forEach(function (t, e) {
                a = t.getChildByName("imgIcon").getComponent(cc.Sprite);
                r = t.getChildByName("lbCount").getComponent(cc.Label);
                a.spriteFrame = d.iconSpriteFrame[d._itemArr[e].item - 1];
                r.string = "x" + d._itemArr[e].Num;
              });
            }
            c.ManageCtl.gameData.setFlagData(u.MyConstans.projectName + "showWheel", {});
            if (c.ManageCtl.gameData.getFlagData(u.MyConstans.projectName + "playWheel")) {
              this.dict.playVideoIcon.active = true;
            } else {
              this.dict.playVideoIcon.active = false;
            }
            this.dict.btnNext.active = this._closeCallback;
            if ((l.default.isANDROID_HW || l.default.isIOS_HW) && this._closeCallback) {
              this.checkShowRatingView();
            }
            return [2];
        }
      });
    });
  };
  e.prototype.onDisable = function () {
    this.unscheduleAllCallbacks();
  };
  e.prototype.btnClick_close = function (t) {
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      this.gotoClose();
    }
  };
  e.prototype.gotoClose = function () {
    if (this._closeCallback) {
      this._closeCallback();
    }
    c.ManageCtl.uiManage.gotoDestroyUI(m.uiPath.uiName.popup_wheelView);
  };
  e.prototype.btnClick_start = function (t) {
    var e = this;
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      if (this.dict.playVideoIcon.active) {
        c.ManageCtl.playVideo(function () {
          g.statsCtl.sendEventShuShu("reward_btn", {
            mode: e._curModeId,
            devid: e._curDevId,
            lv: e._curLevelId,
            progress: c.ManageCtl.gameData.getGameProgress(),
            scene: "wheel",
            lvgrade: c.ManageCtl.gameData.game_lvgrade
          });
          e.begin();
        });
      } else {
        this.begin();
      }
    }
  };
  e.prototype.btnClick_next = function (t) {
    return r(this, undefined, undefined, function () {
      var e;
      return s(this, function (n) {
        switch (n.label) {
          case 0:
            if (f.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
              if (l.default.isANDROID_HW || l.default.isIOS_HW) {
                this.checkShowInsertAd();
              }
              this._nextLevelId = this._curLevelId + 1;
              return [4, c.ManageCtl.gameData.getNextDevLv(this._curModeId, this._curLevelId, this._curDevId)];
            } else {
              return [2];
            }
          case 1:
            e = n.sent();
            this._nextDevId = e.devLv;
            if (-1 != e.nextModeId) {
              this._nextModeId = e.nextModeId;
            }
            if (-1 != this._nextDevId) {
              c.ManageCtl.gameData.unlockLvByDevLv(this._nextDevId);
            }
            if (-1 != this._nextModeId) {
              c.ManageCtl.gameData.setCurModeId(this._nextModeId);
              this._nextLevelId = 1;
            }
            c.ManageCtl.gameData.setCurDevId(this._nextDevId);
            c.ManageCtl.gameData.setCurLevelId(this._nextLevelId);
            c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.gameNextLevel);
            this._closeCallback = null;
            c.ManageCtl.gameData.getNewRoleFlag = false;
            this.gotoClose();
            return [2];
        }
      });
    });
  };
  e.prototype.showLight = function () {
    if (this.dict.lightNode1.opacity == 255) {
      this.dict.lightNode1.opacity = 0;
      this.dict.lightNode2.opacity = 255;
    } else {
      this.dict.lightNode1.opacity = 255;
      this.dict.lightNode2.opacity = 0;
    }
  };
  e.prototype.begin = function () {
    var t = this;
    if (!this._beginFlag) {
      this._beginFlag = true;
      if (!c.ManageCtl.gameData.getFlagData(u.MyConstans.projectName + "playWheel")) {
        c.ManageCtl.gameData.setFlagData(u.MyConstans.projectName + "playWheel", {});
      }
      var e = this.dict.circleNode;
      e.angle = 0;
      this.dict.btnStart.active = false;
      this.dict.btnNext.active = false;
      this.unschedule(this.showLight);
      this.schedule(this.showLight, 0.2);
      var n = [[-359.769, -318.26], [-85.753, -47], [-219.936, -185.782], [-177.671, -135.943], [-265.681, -228], [-40.39, -5], [-313.629, -273.962], [-129.212, -93]];
      var o = 360;
      var i = this.lottery(this._probabilityArr);
      o = p.MyTool.myRandom(n[i][0], n[i][1]);
      o -= 360 * p.MyTool.myRandom(4, 5.5);
      cc.tween(e).delay(0.2).to(2.2, {
        angle: o
      }, {
        easing: cc.easing.sineInOut
      }).call(function () {
        t.dict.pointerNode.stopAllActions();
        t.dict.pointerNode.angle = 0;
        t._itemArr[i].Num;
      }).delay(1).call(function () {
        t.unschedule(t.showLight);
        t.dict.btnStart.active = true;
        t.dict.btnNext.active = t._closeCallback;
        t.dict.playVideoIcon.active = true;
        t._beginFlag = false;
      }).start();
    }
  };
  e.prototype.lottery = function (t) {
    for (var e = [], n = 0, o = 0, i = t; o < i.length; o++) {
      n += i[o];
      e.push(n);
    }
    for (var a = Math.random(), r = 0; r < e.length; r++) {
      if (a < e[r]) {
        return r;
      }
    }
    return t.length - 1;
  };
  e.prototype.checkShowInsertAd = function () {
    if (c.ManageCtl.bmsCtl.getConditionValueByType("ScreenAd20") > 0) {
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
  e.prototype.checkShowRatingView = function () {
    var t = c.ManageCtl.bmsCtl.getConditionValueByType("evaluate") || [];
    if (!(t.length <= 0) && c.ManageCtl.gameData.getCanShowRatingView() != 0) {
      for (var e = c.ManageCtl.gameData.addShowStageResultViewCount(), n = 0; n < t.length; n++) {
        if (e == t[n]) {
          return void c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.showPopup_ratingView);
        }
      }
    }
  };
  a([w([cc.SpriteFrame])], e.prototype, "iconSpriteFrame", undefined);
  return a([C], e);
}(d.default);
exports.default = b;