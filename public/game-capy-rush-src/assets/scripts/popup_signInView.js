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
var s = require("./SdkConfig");
var c = require("./baseCompont");
var l = require("./Language");
var u = require("./MyAnimationTool");
var d = require("./MyTool");
var h = require("./myBtnClick");
var p = require("./statsCtl");
var f = require("./uiPathManage");
var g = cc._decorator;
var m = g.ccclass;
g.property;
var y = g.menu;
var _ = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.bg = null;
    e._signInIndex = 1;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.bg = this.dict.bg;
  };
  e.prototype.start = function () {
    this.initData2();
  };
  e.prototype.onEnable = function () {
    u.MyAnimationTool.showViewAnimation(this.bg);
  };
  e.prototype.onDisable = function () {};
  e.prototype.initData2 = function () {
    var t = r.ManageCtl.gameData.getSignInInfo();
    var e = t.freeDone;
    var n = t.done;
    var o = t.index;
    if (o > 7 || o == 7 && (e == 1 || n == 1)) {
      this.gotoClose();
    } else {
      for (var i = null, a = this.dict.signInNode, c = 1; c <= a.childrenCount; c++) {
        var l = a.children[c - 1];
        l.stopAllActions();
        l.scale = 1;
        i = l.getChildByName("imgDoneNode");
        if (c < o) {
          i.active = true;
        } else if (c == o) {
          i.active = e == 1 || n == 1;
          this._signInIndex = c;
        } else {
          i.active = false;
        }
      }
      this.dict.btnFree.active = e == 0 && n == 0;
      this.dict.btnVideo.active = this.dict.btnFree.active;
      if (!s.MyConstans.signInList[this._signInIndex].double) {
        this.dict.btnVideo.active = false;
      }
      if (this.dict.btnFree.active) {
        var u = this.dict.btnFree;
        if (this.dict.btnVideo.active) {
          u = this.dict.btnVideo;
        }
        cc.tween(u).to(0.3, {
          scale: 1.05
        }).to(0.3, {
          scale: 1
        }).union().repeatForever().start();
      }
    }
  };
  e.prototype.btnClick_close = function (t) {
    if (h.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      this.gotoClose();
    }
  };
  e.prototype.gotoClose = function () {
    r.ManageCtl.uiManage.gotoDestroyUI(f.uiPath.uiName.popup_signinView);
  };
  e.prototype.btnClick_getDone = function (t) {
    if (h.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      r.ManageCtl.persistRootNode.showTipsUI("今日已签到");
    }
  };
  e.prototype.btnClick_get = function (t) {
    if (h.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      this.getAward(1);
    }
  };
  e.prototype.btnClick_double = function (t) {
    var e = this;
    if (h.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      r.ManageCtl.playVideo(function () {
        var t = "sign" + e._signInIndex;
        var n = r.ManageCtl.gameData.getCurLevelId();
        var o = r.ManageCtl.gameData.getCurDevId();
        var i = r.ManageCtl.gameData.getCurLevelId();
        p.statsCtl.sendEventShuShu("reward_btn", {
          mode: n,
          devid: o,
          lv: i,
          progress: r.ManageCtl.gameData.getGameProgress(),
          slot: r.ManageCtl.gameData.getGameCurAtkSwordCount(),
          scene: t
        });
        e.getAward(2);
      });
    }
  };
  e.prototype.getAward = function (t) {
    var e = s.MyConstans.signInList[this._signInIndex];
    var n = e.propId;
    var o = e.count;
    var i = e.skin;
    var a = o * t;
    if (e.ranProp) {
      var c = [s.MyConstans.propId.bomb, s.MyConstans.propId.remove, s.MyConstans.propId.flip];
      n = c[d.MyTool.myRandom(0, c.length - 1)];
    }
    if (n) {
      switch (n) {
        case s.MyConstans.propId.bomb:
          r.ManageCtl.gameData.addDayPropById(s.MyConstans.propId.bomb, a);
          r.ManageCtl.persistRootNode.showTipsUI(l.default.formatStr("已获得炸弹道具x%d", a));
          break;
        case s.MyConstans.propId.remove:
          r.ManageCtl.gameData.addDayPropById(s.MyConstans.propId.remove, a);
          r.ManageCtl.persistRootNode.showTipsUI(l.default.formatStr("已获得消除道具x%d", a));
          break;
        case s.MyConstans.propId.flip:
          r.ManageCtl.gameData.addDayPropById(s.MyConstans.propId.flip, a);
          r.ManageCtl.persistRootNode.showTipsUI(l.default.formatStr("已获得翻转道具x%d", a));
      }
      r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.updatePropCount);
    }
    if (i) {
      var u = i.typeId;
      var h = i.skinId;
      r.ManageCtl.gameData.getSkinById(u, h);
      r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.updateSkinRed);
      if (u == 2) {
        r.ManageCtl.persistRootNode.showTipsUI(l.default.formatStr("已获得限定背景x%d", a));
      }
      if (u == 1) {
        r.ManageCtl.persistRootNode.showTipsUI(l.default.formatStr("已获得限定皮肤x%d", a));
      }
    }
    r.ManageCtl.gameData.setSignInDone();
    r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.getSignInDone);
    this.initData2();
  };
  return a([m, y("ui/popup_signInView")], e);
}(c.default);
exports.default = _;