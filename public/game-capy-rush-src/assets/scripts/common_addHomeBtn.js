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
var c = require("./myBtnClick");
var l = cc._decorator;
var u = l.ccclass;
var d = l.property;
var h = l.menu;
var p = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.mlocation = s.MyConstans.openLocation.main;
    e.showInTT = false;
    e.showInKs = false;
    e._icon1 = null;
    e._icon2 = null;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    r.ManageCtl.myMsgCtl.on(s.MyConstans.msg.addHomeDone, this.onaddHomeDone, this);
  };
  e.prototype.onDestroy = function () {
    r.ManageCtl.myMsgCtl.off(s.MyConstans.msg.addHomeDone, this.onaddHomeDone, this);
  };
  e.prototype.start = function () {
    if (r.ManageCtl.isZJTD() && window.tt && !this.showInTT) {
      this.node.active = false;
    } else if (!r.ManageCtl.isKS() || this.showInKs) {
      this.onaddHomeDone();
      this.node.active = false;
      var t = this;
      if (r.ManageCtl.isZJTD() && window.tt) {
        var e = window.tt.getSystemInfoSync().appName;
        if (e == "Douyin" || e == "douyin_lite") {
          console.log("## in");
          if ((n = window.tt).checkShortcut) {
            console.log("## checkShortcut");
            n.checkShortcut({
              success: function (e) {
                console.log("## 检查快捷方式  res.status： ", JSON.stringify(e.status));
                if (!(e.status.exist != 0 && e.status.needUpdate != 1)) {
                  t.node.active = true;
                }
              },
              fail: function (e) {
                console.log("## 检查快捷方式失败", JSON.stringify(e.errMsg));
                t.node.active = true;
              }
            });
          }
        } else {
          t.node.active = false;
        }
      } else if (r.ManageCtl.isKS()) {
        var n;
        if (!(n = window.ks)) {
          return;
        }
        if (!n.addShortcut) {
          return void console.log("## !sdk.addShortcut");
        }
        n.checkShortcut({
          success: function (e) {
            console.log("## 添加桌面 是否已添加快捷方式", e.installed);
            if (e.installed) {
              t.node.active = false;
            } else {
              t.node.active = true;
            }
          },
          fail: function (e) {
            if (-10005 === e.code) {
              console.log("## 暂不支持该功能");
              t.node.active = true;
            } else {
              console.log("## 检查快捷方式失败", e.msg);
              t.node.active = true;
            }
          }
        });
      }
    } else {
      this.node.active = false;
    }
  };
  e.prototype.btnClick_addHome = function (t) {
    if (c.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      var e = this;
      window.tt.addShortcut({
        success: function () {
          r.ManageCtl.persistRootNode.showTipsUI("添加桌面成功");
          e.onaddHomeDone();
        },
        fail: function (t) {
          console.log("## 添加桌面失败", JSON.stringify(t.errMsg));
        }
      });
    }
  };
  e.prototype.onaddHomeDone = function () {
    this.node.active = !r.ManageCtl.gameData.getFlagData(s.MyConstans.projectName + "_addHome");
  };
  a([d({
    type: cc.Enum(s.MyConstans.openLocation),
    displayName: "所在位置"
  })], e.prototype, "mlocation", undefined);
  a([d({
    tooltip: "是否在字节端显示"
  })], e.prototype, "showInTT", undefined);
  a([d({
    tooltip: "是否在快手端显示"
  })], e.prototype, "showInKs", undefined);
  return a([u, h("ui/common/common_addHomeBtn")], e);
}(cc.Component);
exports.default = p;