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
var h = require("./MyTool");
var p = require("./myBtnClick");
var f = require("./uiPathManage");
var g = cc._decorator;
var m = g.ccclass;
var y = g.property;
var _ = g.menu;
var v = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.fruitSpriteFrames = [];
    e.bg = null;
    e._nextDevId = -1;
    e._nextLevelId = 1;
    e._nextModeId = -1;
    e._iconFlyPool = null;
    e._nodesToHide = [];
    e._isRunning = false;
    e._currentIndex = 0;
    e._scheduledCallback = null;
    e.interval = 0.1;
    e._iconSchedule = null;
    e.iconInterval = 0.05;
    e.iconFlyTime = 0.05;
    e._lbPro = null;
    e._lbFruitCount = null;
    e._imgPro = null;
    e._fruitMinusCount = 1;
    e._proAddCount = 0;
    e._curPro = 0;
    e._autoSend = false;
    e._removeEffPool = null;
    e.totalBooks = 29;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this._lbPro = this.dict.lbPro.getComponent(cc.Label);
    this._lbFruitCount = this.dict.lbFruitCount.getComponent(cc.Label);
    this._imgPro = this.dict.imgPro.getComponent(cc.Sprite);
    this.dict.btnShare.active = false;
    var e = this.dict.iconFlyFruit;
    this._iconFlyPool = new cc.NodePool();
    for (var n = 0; n < 10; n++) {
      var o = cc.instantiate(e);
      this._iconFlyPool.put(o);
    }
    this._removeEffPool = new cc.NodePool();
    if (c.ManageCtl.gameData.getDayShowSigninView() == 0) {
      var i = c.ManageCtl.gameData.getSignInInfo();
      var a = i.freeDone;
      var r = i.done;
      if (a == 0 && r == 0) {
        c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.showPopupView, f.uiPath.uiName.popup_signinView);
      }
      c.ManageCtl.gameData.setDayShowSigninView(1);
    }
    this.dict.skinRedNode.active = c.ManageCtl.gameData.isGetNewSkin();
    if (this.dict.skinRedNode.active) {
      this.dict.skinRedNode.scale = 0;
      cc.tween(this.dict.skinRedNode).to(0.3, {
        scale: 1
      }).repeat(2, cc.tween().to(0.1, {
        angle: 10
      }).to(0.1, {
        angle: 0
      }).to(0.1, {
        angle: -10
      }).to(0.1, {
        angle: 0
      })).start();
    }
  };
  e.prototype.onDestroy = function () {};
  e.prototype.start = function () {
    var t = c.ManageCtl.gameData.getCollectInfo();
    var e = t.get + 1;
    var n = t.cur;
    if (c.ManageCtl.gameData.haveGetNewCollectFlag) {
      e = t.get;
      n = 5;
    }
    var o = n - 1;
    var i = this.dict.imgIcon.getComponent(cc.Sprite);
    var a = "/collect/img_cangpin_" + e;
    i.node.mReloImgFalg = true;
    h.MyTool.loadImg(a, i);
    this._curPro = Math.ceil(o / 5 * 100);
    this._lbPro.string = this._curPro + "%";
    this._imgPro.fillRange = o / 5;
    var r = 0;
    this.dict.gridLayout.children.forEach(function (t) {
      r += t.childrenCount;
    });
    for (var s = Math.ceil(r / 5) * o, l = r, u = this.dict.gridLayout, d = 0, p = this.totalBooks; p >= 1; p--) {
      if (m = u.getChildByName(p.toString())) {
        for (var f = 0; f <= m.children.length - 1; f++) {
          if (d < s - 1) {
            m.getChildByName((f + 1).toString()).active = false;
          }
          d += 1;
        }
      }
    }
    var g = Math.ceil(0.2 * l);
    for (p = this.totalBooks; p >= 1; p--) {
      var m;
      if (m = u.getChildByName(p.toString())) {
        for (f = 0; f <= m.children.length - 1; f++) {
          if (m.getChildByName((f + 1).toString()).active) {
            if (this._nodesToHide.length >= g) {
              break;
            }
            this._nodesToHide.push(m.getChildByName((f + 1).toString()));
          }
        }
        if (this._nodesToHide.length >= g) {
          break;
        }
      }
    }
    this._nodesToHide.length;
    this.interval;
    this.interval;
    this._fruitMinusCount = c.ManageCtl.gameData.levelGetFruitCount / this._nodesToHide.length;
    this._lbFruitCount.string = c.ManageCtl.gameData.levelGetFruitCount.toString();
    this._proAddCount = 20 / this._nodesToHide.length;
    for (var y = [this.dict.btnSend], _ = 0; _ < y.length; _++) {
      var v = y[_];
      v.on(cc.Node.EventType.TOUCH_START.toString(), this._onPressStart, this);
      v.on(cc.Node.EventType.TOUCH_CANCEL.toString(), this._onPressEnd, this);
      v.on(cc.Node.EventType.TOUCH_END.toString(), this._onPressEnd, this);
      v._touchListener.setSwallowTouches(false);
    }
  };
  e.prototype.onEnable = function () {};
  e.prototype.onDisable = function () {
    this.unscheduleAllCallbacks();
  };
  e.prototype.initData = function (t) {
    return r(this, undefined, undefined, function () {
      return s(this, function () {
        this._nextDevId = t.nextDevId;
        this._nextLevelId = t.nextLevelId;
        this._nextModeId = t.nextModeId;
        return [2];
      });
    });
  };
  e.prototype.btnClick_back = function (t) {
    if (p.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      this.gotoClose();
    }
  };
  e.prototype.btnClick_next = function (t) {
    if (p.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      c.ManageCtl.gameData.setCurDevId(this._nextDevId);
      c.ManageCtl.gameData.setCurLevelId(this._nextLevelId);
      c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.gameNextLevel);
      this.gotoClose();
    }
  };
  e.prototype.btnClick_share = function (t) {
    if (p.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      l.default.instance.share(function (t) {
        if (t == 0) {
          c.ManageCtl.persistRootNode.showTipsUI("分享成功");
        }
      });
    }
  };
  e.prototype.btnClick_autoSend = function (t) {
    var e = this;
    if (!this._autoSend && p.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      this._autoSend = true;
      this._nodesToHide = h.MyTool.arrSort(this._nodesToHide);
      for (var n = function (t) {
          var n = o._nodesToHide[t];
          var i = o._getFlyIcon();
          i.active = true;
          i.setParent(o.dict.flyIconNode);
          var a = o.dict.fruitFullNode.parent.convertToWorldSpaceAR(o.dict.fruitFullNode.position);
          var r = i.parent.convertToNodeSpaceAR(a);
          i.setPosition(cc.v3(r.x, r.y + 140));
          var s = h.MyTool.myRandom(0, o.fruitSpriteFrames.length - 1);
          i.getComponent(cc.Sprite).spriteFrame = o.fruitSpriteFrames[s];
          var c = n.parent.convertToWorldSpaceAR(n.position);
          var l = i.parent.convertToNodeSpaceAR(c);
          i.position.add(cc.v3(h.MyTool.myRandom(-50, 50), h.MyTool.myRandom(-50, 50)));
          cc.tween(i).to(0.3, {
            position: cc.v3(l)
          }).call(function () {
            e._iconFlyPool.put(i);
          }).start();
        }, o = this, i = 0; i < 5; i++) {
        n(i);
      }
      this.scheduleOnce(function () {
        var t = c.ManageCtl.gameData.getCollectInfo();
        t.get;
        var n = t.cur;
        if (c.ManageCtl.gameData.haveGetNewCollectFlag) {
          t.get;
          n = 5;
        }
        var o = n;
        e._curPro = Math.ceil(o / 5 * 100);
        e._lbPro.string = e._curPro + "%";
        e._imgPro.fillRange = o / 5;
        for (var i = 0; i < e._nodesToHide.length; i++) {
          var a = e._nodesToHide[i];
          a.active = false;
          e.showRemoveEff(a);
        }
        e._endProcess();
      }, 0.3);
    }
  };
  e.prototype.btnClick_collect = function (t) {
    if (p.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.showPopupView, f.uiPath.uiName.popup_collectView);
    }
  };
  e.prototype.btnClick_skin = function (t) {
    if (p.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      this.dict.skinRedNode.active = false;
      c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.showPopupView, f.uiPath.uiName.popup_skinView);
    }
  };
  e.prototype.gotoClose = function () {
    c.ManageCtl.uiManage.gotoDestroyUI(f.uiPath.uiName.popup_sendFruitView);
  };
  e.prototype._onPressStart = function () {
    if (!(this._autoSend || this._isRunning || this._currentIndex >= this._nodesToHide.length)) {
      this._isRunning = true;
      this.beginSend();
    }
  };
  e.prototype._onPressEnd = function () {
    if (!this._autoSend) {
      if (this._isRunning) {
        this.unschedule(this._scheduledCallback);
        this.unschedule(this._iconSchedule);
        this._isRunning = false;
      }
    }
  };
  e.prototype.beginSend = function () {
    var t = this;
    this._scheduledCallback = function () {
      if (t._currentIndex >= t._nodesToHide.length) {
        t._endProcess();
      } else {
        var e = t._nodesToHide[t._currentIndex];
        if (cc.isValid(e)) {
          c.ManageCtl.gameData.levelGetFruitCount -= t._fruitMinusCount;
          if (c.ManageCtl.gameData.levelGetFruitCount < 0) {
            c.ManageCtl.gameData.levelGetFruitCount = 0;
          }
          t._lbFruitCount.string = Math.ceil(c.ManageCtl.gameData.levelGetFruitCount).toString();
          t._curPro += t._proAddCount;
          if (t._curPro > 100) {
            t._curPro = 100;
          }
          t._lbPro.string = Math.ceil(t._curPro) + "%";
          t._imgPro.fillRange = t._curPro / 100;
          e.active = false;
          c.ManageCtl.audioManager.PlayEffect("a_eat");
          t.showRemoveEff(e);
        }
        t._currentIndex++;
      }
    };
    this.schedule(this._scheduledCallback, this.interval);
    this._iconSchedule = function () {
      var e = t._findNextActiveNode(t._currentIndex);
      if (e) {
        var n = t._getFlyIcon();
        n.active = true;
        n.setParent(t.dict.flyIconNode);
        var o = t.dict.fruitFullNode.parent.convertToWorldSpaceAR(t.dict.fruitFullNode.position);
        var i = n.parent.convertToNodeSpaceAR(o);
        n.setPosition(cc.v3(i.x, i.y + 140));
        var a = h.MyTool.myRandom(0, t.fruitSpriteFrames.length - 1);
        n.getComponent(cc.Sprite).spriteFrame = t.fruitSpriteFrames[a];
        var r = e.parent.convertToWorldSpaceAR(e.position);
        var s = n.parent.convertToNodeSpaceAR(r);
        cc.tween(n).to(t.iconFlyTime, {
          position: cc.v3(s)
        }).call(function () {
          t._iconFlyPool.put(n);
        }).start();
      }
    };
    this._iconSchedule();
    this.schedule(this._iconSchedule, this.iconInterval);
  };
  e.prototype._endProcess = function () {
    var t = this.dict.btnSend;
    if (this._scheduledCallback) {
      this.unschedule(this._scheduledCallback);
    }
    if (this._iconSchedule) {
      this.unschedule(this._iconSchedule);
    }
    c.ManageCtl.gameData.levelGetFruitCount = 0;
    this._lbFruitCount.string = c.ManageCtl.gameData.levelGetFruitCount.toString();
    t.off(cc.Node.EventType.TOUCH_START, this._onPressStart, this);
    t.off(cc.Node.EventType.TOUCH_END, this._onPressEnd, this);
    t.off(cc.Node.EventType.TOUCH_CANCEL, this._onPressEnd, this);
    var e = t.getComponent(cc.Button);
    if (e) {
      e.interactable = false;
    }
    this.dict.btnNext.active = true;
    this.dict.btnSend.active = false;
    this.dict.btnSendAll.active = false;
    this.dict.fruitEmptyNode.active = true;
    this.dict.fruitFullNode.active = false;
    c.ManageCtl.gameData.haveGetNewCollectFlag = false;
    if (this._curPro >= 99) {
      c.ManageCtl.audioManager.PlayEffect("a_success", false);
      var n = cc.instantiate(this.dict.imgIcon);
      this.node.addChild(n);
      var o = this.dict.imgIcon.parent.convertToWorldSpaceAR(this.dict.imgIcon.position);
      var i = n.parent.convertToNodeSpaceAR(o);
      n.position = i;
      var a = this.dict.btnCollect.parent.convertToWorldSpaceAR(this.dict.btnCollect.position);
      var r = n.parent.convertToNodeSpaceAR(a);
      cc.tween(n).to(0.3, {
        scale: 0.1,
        position: r
      }).call(function () {
        n.active = false;
      }).start();
      for (var s = this.totalBooks; s >= 1; s--) {
        var l = this.dict.gridLayout.getChildByName(s.toString());
        if (l) {
          for (var u = 0; u <= l.children.length - 1; u++) {
            if (l.children[u].active) {
              l.children[u].active = false;
              this.showRemoveEff(l.children[u]);
            }
          }
        }
      }
    }
  };
  e.prototype._getFlyIcon = function () {
    var t;
    (t = this._iconFlyPool.size() > 0 ? this._iconFlyPool.get() : cc.instantiate(this.dict.iconFlyFruit)).opacity = 255;
    return t;
  };
  e.prototype._findNextActiveNode = function (t) {
    for (var e = t; e < this._nodesToHide.length; e++) {
      var n = this._nodesToHide[e];
      if (n && n.active && cc.isValid(n)) {
        return n;
      }
    }
    return null;
  };
  e.prototype.showRemoveEff = function (t) {
    var e = this;
    var n = this.getRemoveEffNode();
    this.dict.removeParentNode.addChild(n);
    n.active = true;
    var o = t.parent.convertToWorldSpaceAR(t.position);
    var i = n.parent.convertToNodeSpaceAR(o);
    n.position = i;
    var a = n.getComponent(sp.Skeleton);
    a.setAnimation(0, "animation", false);
    a.setCompleteListener(function () {
      a.setToSetupPose();
      a.animation = null;
      e.hideRemoveEffNode(n);
    });
  };
  e.prototype.getRemoveEffNode = function () {
    if (this._removeEffPool.size() > 0) {
      return this._removeEffPool.get();
    } else {
      return cc.instantiate(this.dict.removeEff);
    }
  };
  e.prototype.hideRemoveEffNode = function (t) {
    if (this._removeEffPool && this._removeEffPool.size() < 10) {
      this._removeEffPool.put(t);
    } else {
      t.destroy();
    }
  };
  a([y({
    type: [cc.SpriteFrame]
  })], e.prototype, "fruitSpriteFrames", undefined);
  return a([m, _("ui/popup_sendFruitView")], e);
}(d.default);
exports.default = v;