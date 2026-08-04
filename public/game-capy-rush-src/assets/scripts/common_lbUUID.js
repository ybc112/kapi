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
var l = require("./UUIDCheckCtl");
var u = cc._decorator;
var d = u.ccclass;
u.property;
var h = u.menu;
var p = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e._lastTouchTime = 0;
    e._canTouch = true;
    e._btnCopy = null;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    cc.game.on("game_getUUIDDone", this.ongame_getUUIDDone, this);
    this.node.on(cc.Node.EventType.TOUCH_START.toString(), this.touchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_END.toString(), this.touchEnd, this);
  };
  e.prototype.onDestroy = function () {
    cc.game.off("game_getUUIDDone", this.ongame_getUUIDDone, this);
    this.node.off(cc.Node.EventType.TOUCH_START.toString(), this.touchStart, this);
    this.node.off(cc.Node.EventType.TOUCH_END.toString(), this.touchEnd, this);
  };
  e.prototype.start = function () {
    this.ongame_getUUIDDone();
  };
  e.prototype.onDisable = function () {
    this.unscheduleAllCallbacks();
  };
  e.prototype.ongame_getUUIDDone = function () {
    if (window.ywkjTT_openidStr != null && window.ywkjTT_openidStr != "null" && window.ywkjTT_openidStr != "") {
      var t = window.ywkjTT_openidStr;
      if (t.length > 7) {
        t = t.slice(-7);
      }
      this.node.getComponent(cc.Label).string = t.toUpperCase();
    } else {
      this.node.getComponent(cc.Label).string = "";
    }
  };
  e.prototype.touchStart = function () {
    var t = this;
    this.node.stopAllActions();
    cc.tween(this.node).delay(1.5).call(function () {
      console.log("长按");
      var e = t.node.getComponent(cc.Label).string;
      s.default.instance.setClipboardData(e, function (t) {
        if (t == 0) {
          r.ManageCtl.persistRootNode.showTipsUI("复制成功");
        }
      });
    }).start();
  };
  e.prototype.touchEnd = function () {
    var t = this;
    if (this.node.getComponent(cc.Label).string != "" && this._canTouch) {
      var e = new Date().getTime() / 1000;
      if (e - this._lastTouchTime < 0.2) {
        console.log("双击");
        this.node.stopAllActions();
        this._canTouch = false;
        this.scheduleOnce(function () {
          t._canTouch = true;
        }, 1);
        var n = this.node.getComponent(cc.Label).string;
        l.default.GetInstance().checkInWhitelist("ywpk11bd1g62nl2ifhmj", n, function () {
          r.ManageCtl.persistRootNode.showTipsUI("开启成功");
          s.default.isH5_NOADS = true;
          window.game_isNOADS = true;
          window.h5_daren = true;
          r.ManageCtl.myMsgCtl.emit(c.MyConstans.msg.openDr);
          r.ManageCtl.gameData.setOpenAutoFlag(1);
        });
      }
      this._lastTouchTime = e;
    }
  };
  e.prototype.checkWxCopy = function () {
    if (window.wx) {
      var t = window.wx.getSystemInfoSync();
      var e = cc.Canvas.instance.node.height;
      var n = t.screenHeight / e;
      var o = this.node;
      var i = o.convertToWorldSpaceAR(cc.Vec2.ZERO);
      var a = (i.x - o.width * o.anchorX) * n;
      var s = (e - i.y - o.height * (1 - o.anchorY)) * n;
      var c = this;
      if (r.ManageCtl.isWx() && window.wx) {
        window.wx.getSetting({
          success: function (t) {
            if (!t.authSetting["scope.writeClipboard"]) {
              c._btnCopy = window.wx.createUserInfoButton({
                type: "image",
                text: "复制内容到剪贴板操作",
                image: "touming.png",
                style: {
                  left: a,
                  top: s,
                  width: o.width * n,
                  height: o.height * n,
                  lineHeight: o.height,
                  backgroundColor: "#ffffff",
                  color: "#ffffff"
                }
              });
              c._btnCopy.onTap(function (t) {
                console.log(t);
                if (t && t.userInfo) {
                  console.log("## 昵称 点击按钮同意授权");
                  c.hideCopyBtn();
                } else {
                  c.hideCopyBtn();
                }
              });
            }
          }
        });
      }
    }
  };
  e.prototype.hideCopyBtn = function () {
    if (this._btnCopy) {
      this._btnCopy.destroy();
      this._btnCopy = null;
    }
  };
  return a([d, h("ui/common/common_lbUUID")], e);
}(cc.Component);
exports.default = p;