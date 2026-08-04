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
var s = require("./baseCompont");
var c = require("./MyAnimationTool");
var l = require("./myBtnClick");
var u = require("./statsCtl");
var d = require("./uiPathManage");
var h = cc._decorator;
var p = h.ccclass;
h.property;
var f = h.menu;
var g = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.bg = null;
    e.layoutNode = null;
    e._curLocalismIndex = 1;
    e.localismList = {
      1: {
        name: "普通话",
        sound: "a_localismSound1"
      },
      2: {
        name: "四川话",
        sound: "a_localismSound2"
      },
      3: {
        name: "武汉话",
        sound: "a_localismSound3"
      },
      4: {
        name: "长沙话",
        sound: "a_localismSound4"
      },
      5: {
        name: "广东话",
        sound: "a_localismSound5"
      }
    };
    e.audioType = 1;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    var e = this;
    t.prototype.onLoad.call(this);
    var n = r.ManageCtl.gameData.getLocalismSoundInfo();
    this._curLocalismIndex = n.index;
    this.bg = this.dict.bg;
    this.layoutNode = this.dict.layoutNode;
    this.layoutNode.children.forEach(function (t) {
      t.getChildByName("lbName").getComponent(cc.Label).string = e.localismList[t.name].name;
    });
    this.initData2(this._curLocalismIndex);
  };
  e.prototype.onEnable = function () {
    c.MyAnimationTool.showViewAnimation(this.bg);
  };
  e.prototype.initData2 = function (t) {
    this.layoutNode.children.forEach(function (e) {
      if (t == Number(e.name)) {
        e.getChildByName("waitNode").opacity = 0;
        e.getChildByName("useNode").opacity = 255;
      } else {
        e.getChildByName("waitNode").opacity = 255;
        e.getChildByName("useNode").opacity = 0;
      }
    });
    if (r.ManageCtl.gameData.getLocalismSoundInfo().lock.includes(t)) {
      this.dict.useVideoIcon.active = false;
    } else {
      this.dict.useVideoIcon.active = true;
    }
  };
  e.prototype.btnClick_use = function (t) {
    var e = this;
    if (l.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      if (this.dict.useVideoIcon.active) {
        return void r.ManageCtl.playVideo(function () {
          e.dict.useVideoIcon.active = false;
          var t = r.ManageCtl.gameData.getCurModeId();
          var n = r.ManageCtl.gameData.getCurDevId();
          var o = r.ManageCtl.gameData.getCurLevelId();
          u.statsCtl.sendEventShuShu("reward_btn", {
            mode: t,
            devid: n,
            lv: o,
            index: e._curLocalismIndex,
            scene: "sound"
          });
          r.ManageCtl.gameData.setLocalismSoundLock(e._curLocalismIndex);
          r.ManageCtl.persistRootNode.showTipsUI("切换成功");
          e.gotoClose();
        });
      } else {
        r.ManageCtl.gameData.setLocalismSoundIndex(this._curLocalismIndex);
        r.ManageCtl.persistRootNode.showTipsUI("切换成功");
        return void this.gotoClose();
      }
    }
  };
  e.prototype.btnClick_play = function () {
    var t = this._curLocalismIndex.toString();
    var e = this.localismList[t].sound;
    r.ManageCtl.audioManager.PlayEffect(e, false);
  };
  e.prototype.btnClick_close = function (t) {
    if (l.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      r.ManageCtl.gameData.saveLocalismSound();
      this.gotoClose();
    }
  };
  e.prototype.btnClick_click = function (t) {
    if (l.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      var e = Number(t.target.name);
      this._curLocalismIndex = e;
      this.initData2(e);
    }
  };
  e.prototype.gotoClose = function () {
    r.ManageCtl.uiManage.gotoDestroyUI(d.uiPath.uiName.popup_localismSoundView);
  };
  return a([p, f("ui/popup_localismSoundView")], e);
}(s.default);
exports.default = g;