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
var l = require("./MyAnimationTool");
var u = require("./myBtnClick");
var d = require("./statsCtl");
var h = require("./uiPathManage");
var p = cc._decorator;
var f = p.ccclass;
var g = p.property;
var m = p.menu;
var y = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.bg = null;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    cc.game.on("canGetWelfareLimited", this.oncanGetWelfareLimited, this);
  };
  e.prototype.onDestroy = function () {
    cc.game.off("canGetWelfareLimited", this.oncanGetWelfareLimited, this);
  };
  e.prototype.start = function () {
    this.oncanGetWelfareLimited();
  };
  e.prototype.oncanGetWelfareLimited = function () {
    var t = cc.sys.localStorage.getItem("nxwz_canGetWelfareLimited");
    var e = this.dict.btnGet;
    var n = this.dict.btnGo;
    n.active = !t;
    e.active = !n.active;
  };
  e.prototype.onDisable = function () {};
  e.prototype.onEnable = function () {
    var t = this;
    this.bg.scale = 0;
    this.scheduleOnce(function () {
      l.MyAnimationTool.showViewAnimation(t.bg);
      t.initData2();
    });
  };
  e.prototype.initData2 = function () {};
  e.prototype.btnClick_cancel = function (t) {
    if (u.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      this.gotoClose();
    }
  };
  e.prototype.btnClick_get = function (t) {
    if (u.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      r.ManageCtl.gameData.addDayPropById(s.MyConstans.propId.bomb, 1);
      r.ManageCtl.persistRootNode.showTipsUI("领取成功，炸弹道具已发放！");
      cc.sys.localStorage.setItem("nxwz_GetWelfareLimitedDone", 1);
      r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.getWelfareLimitedDone);
      r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.updatePropCount);
      d.statsCtl.sendEventShuShu("activity_event", {
        scene: "sidebar",
        lvgrade: r.ManageCtl.gameData.game_lvgrade
      });
      this.gotoClose();
    }
  };
  e.prototype.btnClick_go = function (t) {
    if (u.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      if (window.tt.checkScene) {
        window.tt.checkScene({
          scene: "sidebar",
          success: function (t) {
            console.log("check scene success: ", t.isExist);
            if (t.isExist) {
              window.tt.navigateToScene({
                scene: "sidebar",
                success: function () {
                  console.log("navigate to scene success");
                  cc.sys.localStorage.setItem("nxwz_canGetWelfareLimited", 1);
                  cc.game.emit("canGetWelfareLimited");
                },
                fail: function (t) {
                  console.log("navigate to scene fail: ", t);
                }
              });
            } else {
              r.ManageCtl.persistRootNode.showTipsUI("请从侧边栏进入游戏");
            }
          },
          fail: function (t) {
            console.log("check scene fail:", t);
            r.ManageCtl.persistRootNode.showTipsUI("请从侧边栏进入游戏");
          }
        });
      } else {
        r.ManageCtl.persistRootNode.showTipsUI("请从侧边栏进入游戏");
      }
    }
  };
  e.prototype.gotoClose = function () {
    r.ManageCtl.uiManage.hideUI(h.uiPath.uiName.popup_welfareLimitedView);
  };
  a([g(cc.Node)], e.prototype, "bg", undefined);
  return a([f, m("ui/popup_welfareLimitedView")], e);
}(c.default);
exports.default = y;