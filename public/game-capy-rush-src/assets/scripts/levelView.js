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
var l = require("./MyLoadSubAssetsCtl");
var u = require("./SdkConfig");
var d = require("./baseCompont");
var h = require("./MyPageView");
var p = require("./MyTool");
var f = require("./myBtnClick");
var g = require("./uiPathManage");
var m = require("./jsonConfig");
var y = require("./myJsonCtl");
var _ = require("./levelView_levelItemNode");
var v = cc._decorator;
var C = v.ccclass;
v.property;
var w = v.menu;
var b = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e._modeId = 1;
    e._myPageView = null;
    e._lbUnlockAll = null;
    e._lbUnlockAllTime = null;
    e._btnUnlockAllLvBg = null;
    e._lbModeName = null;
    e.lbTestNode = null;
    e.removeAdNode = null;
    e._unlockAllLvTimeCallback = null;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    c.ManageCtl.myMsgCtl.on(u.MyConstans.msg.clickLevelItem, this.onclickLevelItem, this);
    c.ManageCtl.myMsgCtl.on(u.MyConstans.msg.unlockAllLvDone, this.onunlockAllLvDone, this);
    c.ManageCtl.myMsgCtl.on(u.MyConstans.msg.unlockAllLvTimeOut, this.onunlockAllLvTimeOut, this);
    this.init();
  };
  e.prototype.onDestroy = function () {
    c.ManageCtl.myMsgCtl.off(u.MyConstans.msg.clickLevelItem, this.onclickLevelItem, this);
    c.ManageCtl.myMsgCtl.off(u.MyConstans.msg.unlockAllLvDone, this.onunlockAllLvDone, this);
    c.ManageCtl.myMsgCtl.off(u.MyConstans.msg.unlockAllLvTimeOut, this.onunlockAllLvTimeOut, this);
  };
  e.prototype.start = function () {
    c.ManageCtl.audioManager.pauseBGM();
    c.ManageCtl.audioManager.PlayBGM("a_homeBg1");
    this.initData();
    this.setNoadsNode();
    this.loadLevel();
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
  e.prototype.initData = function () {
    return r(this, undefined, undefined, function () {
      var t;
      return s(this, function (e) {
        switch (e.label) {
          case 0:
            this._modeId = c.ManageCtl.gameData.getCurModeId();
            return [4, y.myJsonCtl.getJsonInfoByKey(m.jsonName.mode, this._modeId)];
          case 1:
            t = e.sent();
            this._lbModeName.string = t ? t.name : "全部关卡";
            return [2];
        }
      });
    });
  };
  e.prototype.init = function () {
    this.dict.levelItemNode.active = false;
    this._myPageView = this.dict.myPageView.getComponent(h.default);
    this._lbUnlockAll = this.dict.lbUnlockAll.getComponent(cc.Label);
    this._lbUnlockAllTime = this.dict.lbUnlockAllTime.getComponent(cc.Label);
    this._btnUnlockAllLvBg = this.dict.btnUnlockAllLvBg;
    this._unlockAllLvTimeCallback = this.unlockAllLvTimeCallback.bind(this);
    this._btnUnlockAllLvBg.mCanTouch = true;
    this._lbModeName = this.dict.lbModeName.getComponent(cc.Label);
    this.lbTestNode = this.dict.lbTestNode;
    this.removeAdNode = this.dict.removeAdNode;
    this.updateAllUnlockCount();
  };
  e.prototype.loadLevel = function () {
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
            return [4, y.myJsonCtl.getJson(c.ManageCtl.getModeNameByModeId(this._modeId))];
          case 1:
            t = r.sent();
            e = [];
            n = -1;
            for (o in t) {
              n = t[o].LevelId1;
              if (c.ManageCtl.gameData.getLevelInfoByDevLv(n)) {
                e.push(n);
              }
            }
            i = c.ManageCtl.gameData.getCurLevelId();
            a = i;
            this._myPageView.setDataByLevel(e, a);
            return [2];
        }
      });
    });
  };
  e.prototype.onclickLevelItem = function (t, e, n) {
    if (this._myPageView.isScroll()) {
      console.log("## 滚动中不能点击");
    } else {
      if (l.default.GetInstance().isLoadSubDone()) {
        if (n) {
          c.ManageCtl.gameData.setCurDevId(t);
          c.ManageCtl.gameData.setCurLevelId(e);
          return void c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.showGameView);
        } else {
          return undefined;
        }
      }
      c.ManageCtl.persistRootNode.showTipsUI("关卡加载中，请稍后重试");
    }
  };
  e.prototype.btnClick_back = function (t) {
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name, 0.1)) {
      this.gotoClose();
    }
  };
  e.prototype.btnClick_unlockAllLv = function (t) {
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name, 0.1) && this._btnUnlockAllLvBg.mCanTouch) {
      c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.showPopup_unlockAllLvView);
    }
  };
  e.prototype.btnClick_nextPage = function (t) {
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name, 0.5)) {
      this._myPageView.nextPage();
    }
  };
  e.prototype.btnClick_nextTenPage = function (t) {
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name, 0.5)) {
      this._myPageView.nextTenPage();
    }
  };
  e.prototype.btnClick_previousPage = function (t) {
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name, 0.5)) {
      this._myPageView.previousPage();
    }
  };
  e.prototype.btnClick_previousTenPage = function (t) {
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name, 0.5)) {
      this._myPageView.previousTenPage();
    }
  };
  e.prototype.gotoClose = function () {
    c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.showMainView);
    c.ManageCtl.uiManage.gotoDestroyUI(g.uiPath.uiName.levelView);
  };
  e.prototype.onunlockAllLvDone = function () {
    this._myPageView._pageItems.forEach(function (t) {
      t.node.getChildByName("layoutNode").children.forEach(function (t) {
        t.getComponent(_.default).updateState();
      });
    });
    this.updateAllUnlockCount();
  };
  e.prototype.onunlockAllLvTimeOut = function () {};
  e.prototype.updateAllUnlockCount = function () {
    var t = c.ManageCtl.gameData.getCurModeId();
    var e = c.ManageCtl.gameData.getUnlockAllInfo(t);
    if (-1 == e.unlockTime) {
      var n = c.ManageCtl.gameData.getCurModeId();
      var o = c.ManageCtl.gameData.getUnlockAllInfo(n);
      if (-1 != o.unlockTime) {
        var i = (new Date().getTime() - o.unlockTime) / 1000;
        if ((a = u.MyConstans.num_allUnlockLvAllTime - i) <= 0) {
          c.ManageCtl.gameData.resetUnlockAllInfo(n);
        }
      }
      this._lbUnlockAll.node.active = true;
      this.dict.lbUnlockAllNode.active = false;
    } else {
      i = (new Date().getTime() - e.unlockTime) / 1000;
      var a = u.MyConstans.num_allUnlockLvAllTime - i;
      console.log("## diffSecond: ", a);
      if (a > 0) {
        this.unschedule(this._unlockAllLvTimeCallback);
        this._unlockAllLvTimeCallback();
        this.schedule(this._unlockAllLvTimeCallback, 1);
      } else {
        this.unschedule(this._unlockAllLvTimeCallback);
        c.ManageCtl.gameData.resetUnlockAllInfo(t);
        this._btnUnlockAllLvBg.color = new cc.Color(255, 255, 255);
        this._btnUnlockAllLvBg.mCanTouch = true;
        this._lbUnlockAll.node.active = true;
        this.dict.lbUnlockAllNode.active = false;
      }
    }
  };
  e.prototype.unlockAllLvTimeCallback = function () {
    var t = c.ManageCtl.gameData.getCurModeId();
    var e = c.ManageCtl.gameData.getUnlockAllInfo(t);
    var n = (new Date().getTime() - e.unlockTime) / 1000;
    var o = u.MyConstans.num_allUnlockLvAllTime - n;
    if (o > 0) {
      this._btnUnlockAllLvBg.color = new cc.Color(164, 164, 164);
      this._btnUnlockAllLvBg.mCanTouch = false;
      this._lbUnlockAll.node.active = false;
      this.dict.lbUnlockAllNode.active = true;
      this._lbUnlockAllTime.string = p.MyTool.changeSecondToClock(o);
    } else {
      this.unschedule(this._unlockAllLvTimeCallback);
      c.ManageCtl.gameData.resetUnlockAllInfo(t);
      this._btnUnlockAllLvBg.color = new cc.Color(255, 255, 255);
      this._btnUnlockAllLvBg.mCanTouch = true;
      this._lbUnlockAll.node.active = true;
      this.dict.lbUnlockAllNode.active = false;
      this._myPageView._pageItems.forEach(function (t) {
        t.node.getChildByName("layoutNode").children.forEach(function (t) {
          t.getComponent(_.default).updateState();
        });
      });
    }
  };
  return a([C, w("ui/levelView")], e);
}(d.default);
exports.default = b;