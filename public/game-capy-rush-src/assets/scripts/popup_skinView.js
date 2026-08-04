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
var l = require("./SdkConfig");
var u = require("./baseCompont");
var d = require("./GridListView");
var h = require("./MyAnimationTool");
var p = require("./myBtnClick");
var f = require("./uiPathManage");
var g = require("./jsonConfig");
var m = require("./myJsonCtl");
var y = require("./skinItemNode");
var _ = cc._decorator;
var v = _.ccclass;
_.property;
var C = _.menu;
var w = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.bg = null;
    e._gridListView_role = null;
    e._gridListView_bg = null;
    e._gridListView_goods = null;
    e._curScrollView = null;
    e._curGridListView = null;
    e._loadSwordDoneFalg = false;
    e._loadDragonDoneFalg = false;
    e._loadGoodsDoneFalg = false;
    e._curTag = 1;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.bg = this.dict.bg;
    this._gridListView_role = this.dict.gridListView_role.getComponent(d.default);
    this._gridListView_bg = this.dict.gridListView_bg.getComponent(d.default);
    this._gridListView_goods = this.dict.gridListView_goods.getComponent(d.default);
    this._gridListView_role.node.active = false;
    this._gridListView_bg.node.active = false;
    this._gridListView_goods.node.active = false;
    c.ManageCtl.myMsgCtl.on(l.MyConstans.msg.updateUseSkin, this.onUpdateUseSkin, this);
  };
  e.prototype.onDestroy = function () {
    c.ManageCtl.myMsgCtl.off(l.MyConstans.msg.updateUseSkin, this.onUpdateUseSkin, this);
  };
  e.prototype.start = function () {
    this.dict.redNode1.active = false;
    this.dict.redNode2.active = false;
    this.dict.redNode3.active = false;
    var t = c.ManageCtl.gameData.getSkinGetNewInfo();
    for (var e in t) {
      if (t[e]) {
        this.dict["redNode" + e].active = true;
      }
    }
    this.showNodeByIndex(1);
  };
  e.prototype.onEnable = function () {
    h.MyAnimationTool.showViewAnimation(this.bg);
  };
  e.prototype.onDisable = function () {
    this.unscheduleAllCallbacks();
  };
  e.prototype.initData = function () {};
  e.prototype.loadList = function (t, e) {
    return r(this, undefined, undefined, function () {
      var n;
      var o;
      var i;
      return s(this, function (a) {
        switch (a.label) {
          case 0:
            t.node.active = true;
            return [4, m.myJsonCtl.getJson(g.jsonName.gameSkin)];
          case 1:
            n = a.sent();
            o = [];
            for (i in n) {
              if (n[i].typeId == e) {
                o.push(n[i].id);
              }
            }
            t.setData(o);
            return [2];
        }
      });
    });
  };
  e.prototype.btnClick_close = function (t) {
    if (p.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      this.gotoClose();
    }
  };
  e.prototype.gotoClose = function () {
    c.ManageCtl.gameData.saveSkinInfo();
    c.ManageCtl.uiManage.gotoDestroyUI(f.uiPath.uiName.popup_skinView);
  };
  e.prototype.btnClick_tag = function (t, e) {
    if (p.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      var n = parseInt(e);
      this.showNodeByIndex(n);
    }
  };
  e.prototype.showNodeByIndex = function (t) {
    this.dict.tagNode.children.forEach(function (e) {
      if (Number(e.name) == t) {
        e.getChildByName("Background").getChildByName("selectNode").active = true;
        e.getChildByName("Background").getChildByName("unselectNode").active = false;
      } else {
        e.getChildByName("Background").getChildByName("selectNode").active = false;
        e.getChildByName("Background").getChildByName("unselectNode").active = true;
      }
    });
    this.showSkinIndex(t);
  };
  e.prototype.showSkinIndex = function (t) {
    return r(this, undefined, undefined, function () {
      return s(this, function () {
        this._curTag = t;
        switch (t) {
          case 1:
            this._gridListView_role.node.active = true;
            this._gridListView_bg.node.active = false;
            this._gridListView_goods.node.active = false;
            this._curGridListView = this._gridListView_role;
            this._curScrollView = this._curGridListView.node.getComponent(cc.ScrollView);
            if (!this._loadSwordDoneFalg) {
              this.loadList(this._gridListView_role, t);
              this._loadSwordDoneFalg = true;
            }
            this.dict.redNode1.active = false;
            c.ManageCtl.gameData.setSkinGetNewDone(1);
            break;
          case 2:
            this._gridListView_role.node.active = false;
            this._gridListView_bg.node.active = true;
            this._gridListView_goods.node.active = false;
            this._curGridListView = this._gridListView_bg;
            this._curScrollView = this._curGridListView.node.getComponent(cc.ScrollView);
            if (!this._loadDragonDoneFalg) {
              this.loadList(this._gridListView_bg, t);
              this._loadDragonDoneFalg = true;
            }
            this.dict.redNode2.active = false;
            c.ManageCtl.gameData.setSkinGetNewDone(2);
            break;
          case 3:
            this._gridListView_role.node.active = false;
            this._gridListView_bg.node.active = false;
            this._gridListView_goods.node.active = true;
            this._curGridListView = this._gridListView_goods;
            this._curScrollView = this._curGridListView.node.getComponent(cc.ScrollView);
            if (!this._loadGoodsDoneFalg) {
              this.loadList(this._gridListView_goods, t);
              this._loadGoodsDoneFalg = true;
            }
            this.dict.redNode3.active = false;
            c.ManageCtl.gameData.setSkinGetNewDone(3);
        }
        return [2];
      });
    });
  };
  e.prototype.touchIndex = function (t) {
    if (!this._curScrollView || !this._curScrollView.isScrolling()) {
      c.ManageCtl.persistRootNode.playBtnSound();
      var e = t.target;
      e.stopAllActions();
      e.scale = 1;
      cc.tween(e).to(0.1, {
        scale: 1.05
      }).to(0.1, {
        scale: 1
      }).start();
    }
  };
  e.prototype.onUpdateUseSkin = function () {
    if (this._curGridListView) {
      this._curGridListView.getItems().forEach(function (t) {
        t.getComponent(y.default).updateUse();
      });
    }
  };
  return a([v, C("ui/popup_skinView")], e);
}(u.default);
exports.default = w;