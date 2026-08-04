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
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    r.ManageCtl.myMsgCtl.on(s.MyConstans.msg.addFavoriteDone, this.onaddFavoriteDone, this);
  };
  e.prototype.onDestroy = function () {
    r.ManageCtl.myMsgCtl.off(s.MyConstans.msg.addFavoriteDone, this.onaddFavoriteDone, this);
  };
  e.prototype.onaddFavoriteDone = function () {
    return !!r.ManageCtl.gameData.getFlagData(s.MyConstans.projectName + "_addCommonUse") && (this.node.active = false, true);
  };
  e.prototype.start = function () {
    if (this.mlocation != s.MyConstans.openLocation.collect || window.collectViewShowByWin) {
      if (r.ManageCtl.isZJTD() && window.tt && !this.showInTT) {
        this.node.active = false;
      } else if (!r.ManageCtl.isKS() || this.showInKs) {
        if (!this.onaddFavoriteDone()) {
          this.node.active = false;
          if (r.ManageCtl.isZJTD()) {
            ;
          } else if (r.ManageCtl.isKS()) {
            var t = window.ks;
            if (!t) {
              return;
            }
            if (!t.checkCommonUse) {
              return void console.log("## !sdk.checkCommonUse");
            }
            var e = this;
            t.checkCommonUse({
              success: function (t) {
                console.log("## 设为常用查询结果为：" + t.isCommonUse);
                if (t.isCommonUse) {
                  e.node.active = false;
                } else {
                  e.node.active = true;
                }
              },
              fail: function (t) {
                if (-10005 === t.code) {
                  console.log("## 暂不支持该功能-常用");
                  e.node.active = true;
                } else {
                  console.log("## 设为常用查询失败", t.msg);
                  e.node.active = true;
                }
              }
            });
          }
        }
      } else {
        this.node.active = false;
      }
    } else {
      this.node.active = false;
    }
  };
  e.prototype.btnClick_favorite = function (t) {
    if (c.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      var e = this;
      if (r.ManageCtl.isZJTD()) {
        window.tt.showFavoriteGuide({
          type: "bar",
          content: "一键添加到我的小程序",
          position: "bottom",
          success: function () {
            e.node.active = false;
            r.ManageCtl.persistRootNode.showTipsUI("收藏成功");
          },
          fail: function () {}
        });
      } else if (r.ManageCtl.isKS()) {
        window.ks.addCommonUse({
          success: function () {
            e.node.active = false;
          },
          fail: function (t) {
            if (-10005 === t.code) {
              console.log("暂不支持该功能");
              r.ManageCtl.persistRootNode.showTipsUI("暂不支持该功能");
            } else {
              console.log("设为常用失败", t.msg);
              r.ManageCtl.persistRootNode.showTipsUI("设置失败");
            }
          }
        });
      }
    }
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
  return a([u, h("ui/common/common_favoriteBtn")], e);
}(cc.Component);
exports.default = p;