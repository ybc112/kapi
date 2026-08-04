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
var r = require("./baseCompont");
var s = require("./myBtnClick");
var c = require("./uiPathManage");
var l = require("./ManageCtl");
var u = require("./SdkConfig");
var d = cc._decorator;
var h = d.ccclass;
d.property;
var p = d.menu;
var f = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e._showChangePageAni = false;
    e._leftPageWidth = -750;
    e._rightPageWidth = 750;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    l.ManageCtl.myMsgCtl.on(u.MyConstans.msg.showMainPageByTag, this.onshowMainPageByTag, this);
  };
  e.prototype.onDestroy = function () {
    l.ManageCtl.uiManage.gotoDestroyUI(c.uiPath.uiName.popup_roleInfoView);
    l.ManageCtl.uiManage.gotoDestroyUI(c.uiPath.uiName.popup_petListView);
    l.ManageCtl.myMsgCtl.off(u.MyConstans.msg.showMainPageByTag, this.onshowMainPageByTag, this);
  };
  e.prototype.start = function () {
    this.loadPageNode();
    this.showPage(u.MyConstans.MainPageTag.main);
  };
  e.prototype.loadPageNode = function () {
    var t = this;
    l.ManageCtl.uiManage.showUI(c.uiPath.uiName.mainView, this.dict.pageNode, {});
    l.ManageCtl.uiManage.showUI(c.uiPath.uiName.popup_roleInfoView, this.dict.pageNode, {
      hideBg: true,
      hideCloseBtn: true,
      changeX: true
    }, function (e) {
      t.scheduleOnce(function () {
        t._leftPageWidth = e.width;
        e.x = -e.width;
        e.opacity = 255;
      });
    });
    l.ManageCtl.uiManage.showUI(c.uiPath.uiName.popup_petListView, this.dict.pageNode, {
      changeX: true
    }, function (e) {
      t.scheduleOnce(function () {
        t._rightPageWidth = e.width;
        e.x = e.width;
        e.opacity = 255;
      });
    });
  };
  e.prototype.onshowMainPageByTag = function (t) {
    if (!this._showChangePageAni) {
      this.showPage(t);
    }
  };
  e.prototype.btnClick_page = function (t, e) {
    if (s.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3) && !this._showChangePageAni) {
      var n = e;
      this.showPage(n);
    }
  };
  e.prototype.showPage = function (t) {
    var e = this;
    var n = this.dict.pageBtnNode;
    var o = null;
    var i = null;
    var a = null;
    n.children.forEach(function (t) {
      o = t.getChildByName("Background");
      i = o.getChildByName("selectNode");
      a = o.getChildByName("unSelectNode");
      o.getChildByName("layoutNode");
      i.opacity = 0;
      a.opacity = 255;
    });
    var r = null;
    var s = 0;
    switch (t) {
      case u.MyConstans.MainPageTag.main:
        s = 0;
        r = this.dict.btnMainPage;
        break;
      case u.MyConstans.MainPageTag.roleInfo:
        s = this._leftPageWidth;
        r = this.dict.btnRoleInfoPage;
        break;
      case u.MyConstans.MainPageTag.petList:
        s = -this._rightPageWidth;
        r = this.dict.btnPetListPage;
        break;
      default:
        s = 0;
        r = this.dict.btnMainPage;
    }
    o = r.getChildByName("Background");
    a = o.getChildByName("unSelectNode");
    i = o.getChildByName("selectNode");
    a.opacity = 0;
    i.opacity = 255;
    this._showChangePageAni = true;
    var c = this.dict.pageNode;
    c.children.forEach(function (t) {
      t.opacity = 255;
    });
    c.stopAllActions();
    var l = c.getChildByName("popup_roleInfoView");
    var d = c.getChildByName("popup_petListView");
    var h = c.getChildByName("mainView");
    cc.tween(c).to(0.3, {
      x: s
    }).call(function () {
      e._showChangePageAni = false;
      switch (t) {
        case u.MyConstans.MainPageTag.main:
          if (l) {
            l.opacity = 0;
          }
          if (d) {
            d.opacity = 0;
          }
          break;
        case u.MyConstans.MainPageTag.roleInfo:
          if (h) {
            h.opacity = 0;
          }
          if (d) {
            d.opacity = 0;
          }
          break;
        case u.MyConstans.MainPageTag.petList:
          if (h) {
            h.opacity = 0;
          }
          if (l) {
            l.opacity = 255;
          }
          break;
        default:
          if (l) {
            l.opacity = 0;
          }
          if (d) {
            d.opacity = 0;
          }
      }
    }).start();
  };
  return a([h, p("ui/mainView")], e);
}(r.default);
exports.default = f;