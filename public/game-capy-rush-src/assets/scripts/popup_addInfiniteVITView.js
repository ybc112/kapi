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
var u = require("./MyAnimationTool");
var d = require("./myBtnClick");
var h = require("./statsCtl");
var p = require("./uiPathManage");
var f = cc._decorator;
var g = f.ccclass;
f.property;
var m = f.menu;
var y = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.bg = null;
    e._curModeId = 1;
    e._curDevId = -1;
    e._curLevelId = -1;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.bg = this.dict.bg;
  };
  e.prototype.start = function () {
    this.updateCount();
  };
  e.prototype.onEnable = function () {
    u.MyAnimationTool.showViewAnimation(this.bg);
  };
  e.prototype.onDisable = function () {};
  e.prototype.initData = function () {};
  e.prototype.btnClick_close = function (t) {
    if (d.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      this.gotoClose();
    }
  };
  e.prototype.btnClick_share = function (t) {
    var e = this;
    if (d.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      s.default.instance.share(function (t) {
        if (t == 0) {
          h.statsCtl.sendEventShuShu("share", {
            scene: "live",
            lvgrade: r.ManageCtl.gameData.game_lvgrade
          });
          e.addUnlockInfiniteCount(3);
        }
      });
    }
  };
  e.prototype.btnClick_video = function (t) {
    var e = this;
    if (d.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      r.ManageCtl.playVideo(function () {
        if (e.node && cc.isValid(e.node)) {
          var t = r.ManageCtl.gameData.getCurModeId();
          var n = r.ManageCtl.gameData.getCurDevId();
          var o = r.ManageCtl.gameData.getCurLevelId();
          h.statsCtl.sendEventShuShu("reward_btn", {
            mode: t,
            devid: n,
            lv: o,
            scene: "unlimitedpower"
          });
          e.addUnlockInfiniteCount(5);
        }
      });
    }
  };
  e.prototype.btnClick_video2 = function (t) {
    var e = this;
    if (d.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      r.ManageCtl.playVideo(function () {
        if (e.node && cc.isValid(e.node)) {
          var t = r.ManageCtl.gameData.getCurModeId();
          var n = r.ManageCtl.gameData.getCurDevId();
          var o = r.ManageCtl.gameData.getCurLevelId();
          h.statsCtl.sendEventShuShu("reward_btn", {
            mode: t,
            devid: n,
            lv: o,
            scene: "unlimitedpower"
          });
          e.addUnlockInfiniteCount(3);
        }
      });
    }
  };
  e.prototype.btnClick_done = function (t) {
    if (d.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      r.ManageCtl.persistRootNode.showTipsUI("请明天再来");
    }
  };
  e.prototype.addUnlockInfiniteCount = function (t) {
    if (r.ManageCtl.gameData.addUnlockInfiniteCount(1)) {
      r.ManageCtl.persistRootNode.showTipsUI("恭喜获得无限体力&免费高级订单");
      r.ManageCtl.gameData.addFreeAdvancedOrdeCount();
      cc.game.emit("game_getFreeAdvancedOrde");
      r.ManageCtl.myMsgCtl.emit(c.MyConstans.msg.updateVITCount);
      r.ManageCtl.myMsgCtl.emit(c.MyConstans.msg.getInfiniteVIT);
      return void r.ManageCtl.uiManage.gotoDestroyUI(p.uiPath.uiName.popup_addInfiniteVITView);
    }
    r.ManageCtl.gameData.addVITCount(t);
    r.ManageCtl.myMsgCtl.emit(c.MyConstans.msg.updateVITCount);
    r.ManageCtl.persistRootNode.showTipsUI("恭喜获得" + t + "体力");
    this.updateCount();
  };
  e.prototype.gotoClose = function () {
    r.ManageCtl.uiManage.gotoDestroyUI(p.uiPath.uiName.popup_addInfiniteVITView);
  };
  e.prototype.updateCount = function () {
    var t = this.dict.lbTip.getComponent(cc.Label);
    var e = this.dict.lbTipDone.getComponent(cc.Label);
    var n = this.dict.imgPro.getComponent(cc.Sprite);
    var o = this.dict.proNode;
    var i = r.ManageCtl.gameData.getUnlockInfiniteInfo();
    c.MyConstans.num_allUnlockInfiniteCount;
    i.unlockCount;
    switch (i.unlockCount) {
      case 0:
        this.dict.btnShare.active = false;
        if (r.ManageCtl.isZJTD() && window.tt) {
          var a = window.tt.getSystemInfoSync().appName;
          console.log("## appName: ");
          if (!(a != "Douyin" && a != "douyin_lite")) {
            this.dict.btnShare.active = true;
          }
        }
        this.dict.btnVideo.active = false;
        this.dict.btnVideo2.active = !this.dict.btnShare.active;
        this.dict.btnDone.active = false;
        t.node.active = true;
        e.node.active = false;
        n.fillRange = 0;
        o.getChildByName("1").getChildByName("lockNode").active = true;
        o.getChildByName("1").getChildByName("doneNode").active = false;
        o.getChildByName("2").getChildByName("lockNode").active = true;
        o.getChildByName("2").getChildByName("doneNode").active = false;
        o.getChildByName("3").getChildByName("lockNode").active = true;
        o.getChildByName("3").getChildByName("doneNode").active = false;
        t.string = "分享本游戏一次后，再观看2次视频\n即可解锁当天无限体力&免费高级订单";
        break;
      case 1:
        this.dict.btnShare.active = false;
        this.dict.btnVideo.active = true;
        this.dict.btnVideo2.active = false;
        this.dict.btnDone.active = false;
        t.node.active = true;
        e.node.active = false;
        n.fillRange = 0.33;
        o.getChildByName("1").getChildByName("lockNode").active = false;
        o.getChildByName("1").getChildByName("doneNode").active = true;
        o.getChildByName("2").getChildByName("lockNode").active = true;
        o.getChildByName("2").getChildByName("doneNode").active = false;
        o.getChildByName("3").getChildByName("lockNode").active = true;
        o.getChildByName("3").getChildByName("doneNode").active = false;
        t.string = "再观看2次视频\n即可解锁当天无限体力&免费高级订单";
        break;
      case 2:
        this.dict.btnShare.active = false;
        this.dict.btnVideo.active = true;
        this.dict.btnVideo2.active = false;
        this.dict.btnDone.active = false;
        t.node.active = true;
        e.node.active = false;
        n.fillRange = 0.66;
        o.getChildByName("1").getChildByName("lockNode").active = false;
        o.getChildByName("1").getChildByName("doneNode").active = true;
        o.getChildByName("2").getChildByName("lockNode").active = false;
        o.getChildByName("2").getChildByName("doneNode").active = true;
        o.getChildByName("3").getChildByName("lockNode").active = true;
        o.getChildByName("3").getChildByName("doneNode").active = false;
        t.string = "再观看1次视频\n即可解锁当天无限体力&免费高级订单";
        break;
      default:
        this.dict.btnShare.active = false;
        this.dict.btnVideo.active = false;
        this.dict.btnVideo2.active = false;
        this.dict.btnDone.active = true;
        t.node.active = false;
        e.node.active = true;
        n.fillRange = 1;
        o.getChildByName("1").getChildByName("lockNode").active = false;
        o.getChildByName("1").getChildByName("doneNode").active = true;
        o.getChildByName("2").getChildByName("lockNode").active = false;
        o.getChildByName("2").getChildByName("doneNode").active = true;
        o.getChildByName("3").getChildByName("lockNode").active = false;
        o.getChildByName("3").getChildByName("doneNode").active = true;
    }
  };
  return a([g, m("ui/popup_addInfiniteVITView")], e);
}(l.default);
exports.default = y;