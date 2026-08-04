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
var c = require("./baseCompont");
var l = require("./buildItem");
var u = require("./myBtnClick");
var d = require("./MyPageView");
var h = require("./MyTool");
var p = require("./statsCtl");
var f = require("./uiPathManage");
var g = require("./jsonConfig");
var m = require("./myJsonCtl");
var y = require("./ManageCtl");
var _ = require("./SdkConfig");
var v = cc._decorator;
var C = v.ccclass;
v.property;
var w = v.menu;
var b = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e._myPageView = null;
    e._showByEndViewFlag = false;
    e._gameLoseFlag = false;
    e._passLv = -1;
    e._beginBuildFlag = false;
    e._autoSaveFlag = false;
    e._iconGoldPool = null;
    e._lbGoldCount = null;
    e._buildLeftCount = 0;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    var e = this.dict.iconGold;
    this._iconGoldPool = new cc.NodePool();
    for (var n = 0; n < 10; n++) {
      var o = cc.instantiate(e);
      this._iconGoldPool.put(o);
    }
    this._myPageView = this.dict.myPageView.getComponent(d.default);
    this.loadList();
    for (var i = [this.dict.btnBuild, this.dict.touchNode], a = 0; a < i.length; a++) {
      var r = i[a];
      r.on(cc.Node.EventType.TOUCH_START.toString(), this.touchStart, this);
      r.on(cc.Node.EventType.TOUCH_CANCEL.toString(), this.touchEnd, this);
      r.on(cc.Node.EventType.TOUCH_END.toString(), this.touchEnd, this);
      r._touchListener.setSwallowTouches(false);
    }
    y.ManageCtl.myMsgCtl.on(_.MyConstans.msg.openBuildView, this.onopenBuildView, this);
    y.ManageCtl.myMsgCtl.on(_.MyConstans.msg.showNextBuildItem, this.onshowNextBuildItem, this);
    y.ManageCtl.myMsgCtl.on(_.MyConstans.msg.changeNextBuild, this.onchangeNextBuild, this);
    y.ManageCtl.myMsgCtl.on(_.MyConstans.msg.changeBuildPage, this.onchangeBuildPage, this);
  };
  e.prototype.onDestroy = function () {
    this._iconGoldPool.clear();
    y.ManageCtl.myMsgCtl.off(_.MyConstans.msg.openBuildView, this.onopenBuildView, this);
    y.ManageCtl.myMsgCtl.off(_.MyConstans.msg.showNextBuildItem, this.onshowNextBuildItem, this);
    y.ManageCtl.myMsgCtl.off(_.MyConstans.msg.changeNextBuild, this.onchangeNextBuild, this);
    y.ManageCtl.myMsgCtl.off(_.MyConstans.msg.changeBuildPage, this.onchangeBuildPage, this);
  };
  e.prototype.start = function () {
    this.schedule(this.timeCallback, 0.08);
    this.schedule(this.timeCallbackSave, 3);
  };
  e.prototype.loadList = function () {
    var t = [];
    var e = y.ManageCtl.gameData.getBuildInfo();
    var n = e.id;
    e.index;
    e.pro;
    for (var o in _.MyConstans.BuildIdList) {
      Number(o);
      t.push(Number(o));
    }
    var i = n + 1;
    if (n >= h.MyTool.getJsonLength(_.MyConstans.BuildIdList)) {
      i = h.MyTool.getJsonLength(_.MyConstans.BuildIdList);
    }
    this._myPageView.setDataByLevel(t, i);
    this._myPageView.setCurPageIndex(i - 1);
  };
  e.prototype.initData = function (t) {
    return r(this, undefined, undefined, function () {
      var e;
      var n;
      var o;
      var i;
      return s(this, function () {
        this._showByEndViewFlag = t.showByEndView || false;
        this._gameLoseFlag = t.gameLose || false;
        this._passLv = t.passLv || -1;
        if (this._showByEndViewFlag) {
          e = y.ManageCtl.gameData.getBuildInfo();
          n = e.id;
          o = e.index;
          e.leftCount;
          i = -1 == this._passLv ? y.ManageCtl.gameData.getCurPassLevelId() : this._passLv;
          p.statsCtl.sendEventShuShu("Build_Show", {
            openpage: "settlementpage",
            lv: i,
            Scene: n + 1,
            Index: o + 1
          });
          y.ManageCtl.gameData.showBeginBuildFlag = true;
          this.setUIShow(true);
        } else {
          y.ManageCtl.gameData.showBeginBuildFlag = false;
          this.setUIShow(false);
        }
        this.setCurNode();
        return [2];
      });
    });
  };
  e.prototype.touchStart = function (t) {
    var e = t.target;
    e.stopAllActions();
    e.scale = 1;
    cc.tween(e).to(0.15, {
      scale: 1.1
    }).start();
    var n = y.ManageCtl.gameData.getBuildInfo();
    if (n.id > this._myPageView.getCurPageIndex()) {
      e.stopAllActions();
      return void (e.scale = 1);
    } else if (y.ManageCtl.gameData.getGoldCount() <= 0) {
      y.ManageCtl.persistRootNode.showTipsUI("金币不足");
      return void this.setUIShow(true);
    } else {
      this._buildLeftCount = n.leftCount;
      this._beginBuildFlag = true;
      this.dict.buildNameBg.opacity = 0;
      return void (this._autoSaveFlag = true);
    }
  };
  e.prototype.touchEnd = function (t) {
    var e = t.target;
    e.stopAllActions();
    e.scale = 1;
    this._beginBuildFlag = false;
    this.dict.buildNameBg.opacity = 255;
    this._autoSaveFlag = false;
  };
  e.prototype.btnClick_continue = function (t) {
    if (u.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      if (this._showByEndViewFlag) {
        if (this._gameLoseFlag) {
          cc.game.emit("onRestartBtn");
        } else {
          y.ManageCtl.myMsgCtl.emit(_.MyConstans.msg.gameNextLevel);
        }
        this.gotoClose();
      } else {
        var e = y.ManageCtl.gameData.getCurPassLevelId();
        this.sendBuildShushu(e);
        this.setUIShow(false);
        y.ManageCtl.gameData.saveBuildInfo();
        y.ManageCtl.gameData.saveGoldCount();
        y.ManageCtl.myMsgCtl.emit(_.MyConstans.msg.updateGoldCount);
        y.ManageCtl.myMsgCtl.emit(_.MyConstans.msg.showMainView);
        for (var n = null, o = 0; o < this._myPageView._pageItems.length; o++) {
          for (var i = this._myPageView._pageItems[o], a = 0; a < i.node.childrenCount; a++) {
            var r = i.node.children[a];
            if (r && r.getComponent(l.default).isWaitBuid()) {
              n = r.getComponent(l.default);
              break;
            }
          }
          if (n) {
            break;
          }
        }
        if (n) {
          n.getNeedCountNode().active = false;
        }
      }
    }
  };
  e.prototype.gotoClose = function () {
    return r(this, undefined, undefined, function () {
      return s(this, function () {
        if (-1 != this._passLv) {
          this.sendBuildShushu(this._passLv);
        }
        y.ManageCtl.gameData.saveBuildInfo();
        y.ManageCtl.gameData.saveGoldCount();
        y.ManageCtl.uiManage.gotoDestroyUI(f.uiPath.uiName.buildView);
        return [2];
      });
    });
  };
  e.prototype.setUIShow = function (t) {
    this.dict.btnBuild.active = t;
    this.dict.btnContinue.active = t;
    this.dict.buildNameBg.active = t;
    this.dict.btnBack.active = t;
    this.dict.goldNode.active = this.dict.btnBuild.active;
    if (!t) {
      this.dict.btnPrevious.opacity = 0;
      return void (this.dict.btnNext.opacity = 0);
    }
    this.dict.btnPrevious.opacity = 255;
    this.dict.btnNext.opacity = 255;
    var e = y.ManageCtl.gameData.getBuildInfo().id;
    if (y.ManageCtl.gameData.getGoldCount() <= 0) {
      this.dict.btnBuild.active = false;
      this.dict.btnContinue.active = true;
    } else if (e > this._myPageView.getCurPageIndex()) {
      this.dict.btnBuild.active = false;
      this.dict.btnContinue.active = true;
    } else {
      this.dict.btnBuild.active = true;
      this.dict.btnContinue.active = false;
    }
    this.dict.goldNode.active = this.dict.btnBuild.active;
    this.setCurNode();
  };
  e.prototype.onopenBuildView = function () {
    var t = y.ManageCtl.gameData.getBuildInfo();
    var e = t.id;
    var n = t.index;
    t.leftCount;
    var o = -1 == this._passLv ? y.ManageCtl.gameData.getCurPassLevelId() : this._passLv;
    p.statsCtl.sendEventShuShu("Build_Show", {
      openpage: "mainpage",
      lv: o,
      Scene: e + 1,
      Index: n + 1
    });
    for (var i = null, a = 0; a < this._myPageView._pageItems.length; a++) {
      for (var r = this._myPageView._pageItems[a], s = 0; s < r.node.childrenCount; s++) {
        var c = r.node.children[s];
        if (c && c.getComponent(l.default).isWaitBuid()) {
          i = c.getComponent(l.default);
          break;
        }
      }
      if (i) {
        break;
      }
    }
    if (i) {
      i.getNeedCountNode().active = true;
    }
    this.setUIShow(true);
  };
  e.prototype.onshowNextBuildItem = function () {
    var t = y.ManageCtl.gameData.getBuildInfo();
    this._buildLeftCount = t.leftCount;
    this.setCurNode();
  };
  e.prototype.onchangeNextBuild = function () {
    var t = y.ManageCtl.gameData.getBuildInfo().id;
    if (t >= h.MyTool.getJsonLength(_.MyConstans.BuildIdList)) {
      console.log("## 全部建完");
      this.setUIShow(true);
      return void this.setCurNode();
    }
    this._myPageView.gotoPage(t);
    for (var e = 0; e < this._myPageView._pageItems.length; e++) {
      for (var n = this._myPageView._pageItems[e], o = 0; o < n.node.childrenCount; o++) {
        var i = n.node.children[o];
        if (i) {
          i.getComponent(l.default).initData();
        }
      }
    }
  };
  e.prototype.onchangeBuildPage = function () {
    this.setCurNode();
  };
  e.prototype.setCurNode = function () {
    var t = y.ManageCtl.gameData.getBuildInfo();
    var e = t.id;
    var n = t.index;
    var o = this._myPageView.getCurPageIndex();
    console.log("curPageIndex: ", o);
    var i = this.dict.lbBuildName.getComponent(cc.Label);
    var a = _.MyConstans.BuildIdList[o].name;
    i.string = a;
    var r = this.dict.imgAllPro.getComponent(cc.Sprite);
    if (e > o) {
      r.fillRange = 1;
    } else {
      var s = _.MyConstans.BuildIdList[o].item;
      r.fillRange = n / s;
    }
    this.setGoldCount();
  };
  e.prototype.timeCallback = function () {
    var t = this;
    if (this.node && cc.isValid(this.node) && this._beginBuildFlag) {
      if (y.ManageCtl.gameData.getGoldCount() <= 0) {
        y.ManageCtl.persistRootNode.showTipsUI("金币不足");
        this._beginBuildFlag = false;
        return void this.setUIShow(true);
      }
      for (var e = null, n = 0; n < this._myPageView._pageItems.length; n++) {
        for (var o = this._myPageView._pageItems[n], i = 0; i < o.node.childrenCount; i++) {
          var a = o.node.children[i];
          if (a && a.getComponent(l.default).isWaitBuid()) {
            e = a.getComponent(l.default);
            break;
          }
        }
        if (e) {
          break;
        }
      }
      if (e) {
        var r = 2;
        if (this._buildLeftCount < r) {
          r = this._buildLeftCount;
        }
        y.ManageCtl.gameData.addGoldCount(-r);
        this._buildLeftCount -= r;
        y.ManageCtl.gameData.setBuildInfoPro(this._buildLeftCount);
        if (!(this._buildLeftCount < 0)) {
          var s = this.dict.iconGold;
          var c = null;
          c = this._iconGoldPool.size() > 0 ? this._iconGoldPool.get() : cc.instantiate(s);
          this.node.addChild(c);
          var u = s.parent.convertToWorldSpaceAR(s.position);
          var d = c.parent.convertToNodeSpaceAR(u);
          c.position = d;
          var h = e.getNeedCountNode().getChildByName("icon");
          var p = h.parent.convertToWorldSpaceAR(h.position);
          var f = c.parent.convertToNodeSpaceAR(p);
          cc.tween(c).to(0.1, {
            position: f
          }).call(function () {
            if (t.node && cc.isValid(t.node)) {
              e.addMaterials(r);
              t.setGoldCount();
              if (t._iconGoldPool && t._iconGoldPool.size() < 10) {
                t._iconGoldPool.put(c);
              } else {
                c.destroy();
              }
            }
          }).start();
        }
      }
    }
  };
  e.prototype.timeCallbackSave = function () {
    if (this.node && cc.isValid(this.node) && this._autoSaveFlag) {
      y.ManageCtl.gameData.saveBuildInfo();
      y.ManageCtl.gameData.saveGoldCount();
    }
  };
  e.prototype.setGoldCount = function () {
    if (!this._lbGoldCount) {
      this._lbGoldCount = this.dict.lbGoldCount.getComponent(cc.Label);
    }
    var t = y.ManageCtl.gameData.getGoldCount();
    this._lbGoldCount.string = t > 9999 ? "x9999+" : "x" + t;
  };
  e.prototype.btnClick_previousPage = function (t) {
    if (u.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      this._myPageView.previousPage();
      this.setUIShow(true);
    }
  };
  e.prototype.btnClick_nextPage = function (t) {
    if (u.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      this._myPageView.nextPage();
      this.setUIShow(true);
    }
  };
  e.prototype.sendBuildShushu = function (t) {
    return r(this, undefined, undefined, function () {
      var e;
      var n;
      var o;
      var i;
      var a;
      var r;
      var c;
      var l;
      var u;
      var d;
      return s(this, function (s) {
        switch (s.label) {
          case 0:
            e = t;
            n = y.ManageCtl.gameData.getBuildInfo();
            o = n.id;
            i = n.index;
            a = n.leftCount;
            r = null;
            return [4, m.myJsonCtl.getJson(g.jsonName.build)];
          case 1:
            for (l in c = s.sent()) {
              if (c[l].Scene == o + 1 && c[l].Index == i + 1) {
                r = c[l];
              }
            }
            if (r) {
              u = r.Materials;
              d = (u - a) / u;
              d = Math.floor(100 * d);
              p.statsCtl.sendEventShuShu("Build_Progress", {
                lv: e,
                Scene: o + 1,
                Index: i + 1,
                Progress: d
              });
            } else {
              p.statsCtl.sendEventShuShu("Build_Progress", {
                lv: e,
                Scene: o + 1,
                Index: i + 1,
                Progress: 0
              });
            }
            return [2];
        }
      });
    });
  };
  return a([C, w("ui/buildView")], e);
}(c.default);
exports.default = b;