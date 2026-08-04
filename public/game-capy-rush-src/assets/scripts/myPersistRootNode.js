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
var s = require("./AudioManager");
var c = require("./GoldFlyCtl");
var l = cc._decorator;
var u = l.ccclass;
var d = l.property;
var h = l.menu;
var p = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.buttonSound = null;
    e.tipsNode = null;
    e.maskNode = null;
    e.wxLoginBtnNode = null;
    e.wxLoginBtnNode2 = null;
    e.goldNode = null;
    e.loadCircleNode = null;
    e._tipsPool = null;
    e.lookVidepDebugFlag = false;
    e.debug = false;
    e.showOtherMode = true;
    e.resetLuckyPackTime = false;
    e._showLoadCircleAni = false;
    e._loadCircleMaterial = null;
    e._showLoadCircleTime = 1;
    e._startRadius = 0.6;
    e._endRadius = 0.05;
    e._elapsedTime = 0;
    e._isStartLoadCircleAni = false;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    cc.game.addPersistRootNode(this.node);
    c.default.GetInstance().init(this.goldNode);
    this._tipsPool = new cc.NodePool();
    for (var t = 0; t < 5; t++) {
      var e = cc.instantiate(this.tipsNode);
      e.active = false;
      this._tipsPool.put(e);
    }
    this.tipsNode.active = false;
  };
  e.prototype.start = function () {
    r.ManageCtl.setMyPersistRootNode(this);
    window.vivo_maskNode = this.maskNode;
    if (r.ManageCtl.isH5_NOADS()) {
      this.schedule(function () {
        window.webkit = null;
      }, 3);
      this.schedule(function () {
        console.log = function () {};
        console.warn = function () {};
        console.error = function () {};
      }, 1.5);
    }
    cc.tween(this.node.getChildByName("maskNode")).to(0.5, {
      width: 200,
      height: 200
    }).delay(3).to(0.5, {
      width: 3000,
      height: 3000
    }).start();
  };
  e.prototype.onDisable = function () {
    if (this._tipsPool) {
      this._tipsPool.clear();
    }
  };
  e.prototype.playBtnSound = function () {
    if (s.default.isAudioOn) {
      cc.audioEngine.playEffect(this.buttonSound, false);
    }
  };
  e.prototype.showTipsUI = function (t, e) {
    var n = this;
    if (e === undefined) {
      e = 1.5;
    }
    var o = this.getTipsNode();
    o.active = true;
    this.node.addChild(o);
    var i = o.getChildByName("bg_tip").getChildByName("lbTips").getComponent(cc.Label);
    i.string = t;
    if (i.node.width >= 650) {
      i.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
      i.node.width = 650;
    } else {
      i.overflow = cc.Label.Overflow.NONE;
    }
    o.stopAllActions();
    o.y = this.tipsNode.y;
    cc.tween(o).to(0.3, {
      y: this.tipsNode.y + 100
    }).delay(e).call(function (t) {
      n.removeTipsNode(t);
    }).start();
  };
  e.prototype.getTipsNode = function () {
    if (this._tipsPool.size() > 0) {
      return this._tipsPool.get();
    } else {
      return cc.instantiate(this.tipsNode);
    }
  };
  e.prototype.removeTipsNode = function (t) {
    if (this._tipsPool.size() >= 3) {
      t.destroy();
    } else {
      this._tipsPool.put(t);
    }
  };
  e.prototype.showLoadCircle = function (t, e, n) {
    var o = this;
    if (t === undefined) {
      t = 0.4;
    }
    if (e === undefined) {
      e = 0;
    }
    if (n === undefined) {
      n = 0.5;
    }
    window.game_musicOpen = 0;
    window.game_audioOpen = 0;
    this.loadCircleNode.active = true;
    var i = this.loadCircleNode.getChildByName("maskNode");
    i.stopAllActions();
    i.setContentSize(3000, 3000);
    cc.tween(i).to(0.5, {
      width: 0,
      height: 0
    }).call(function () {
      o.loadCircleNode.getChildByName("loadAni").active = true;
      cc.tween(o.loadCircleNode.getChildByName("loadAni")).delay(1.5).call(function () {
        o.loadCircleNode.getChildByName("loadAni").active = false;
        s.default.isMusicOn = r.ManageCtl.gameData.getMusicSwitch();
        s.default.isAudioOn = r.ManageCtl.gameData.getSoundSwitch();
        window.game_musicOpen = s.default.isMusicOn;
        window.game_audioOpen = s.default.isAudioOn;
      }).start();
    }).delay(1.5).to(0.5, {
      width: 3000,
      height: 3000
    }).call(function () {
      o.loadCircleNode.active = false;
    }).start();
  };
  e.prototype.hideLoadCircle = function (t, e, n) {
    if (t === undefined) {
      t = 0.05;
    }
    if (e === undefined) {
      e = 0.4;
    }
    if (n === undefined) {
      n = 0.5;
    }
    if (this.loadCircleNode.active) {
      this.loadCircleNode.active = false;
    }
  };
  a([d({
    type: cc.AudioClip
  })], e.prototype, "buttonSound", undefined);
  a([d(cc.Node)], e.prototype, "tipsNode", undefined);
  a([d(cc.Node)], e.prototype, "maskNode", undefined);
  a([d(cc.Node)], e.prototype, "wxLoginBtnNode", undefined);
  a([d(cc.Node)], e.prototype, "wxLoginBtnNode2", undefined);
  a([d(cc.Node)], e.prototype, "goldNode", undefined);
  a([d(cc.Node)], e.prototype, "loadCircleNode", undefined);
  return a([u, h("ui/myPersistRootNode")], e);
}(cc.Component);
exports.default = p;