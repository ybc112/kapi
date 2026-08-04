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
var d = require("./GoldFlyCtl");
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
    e._shopList = {
      gold: {
        propId: "gold",
        count: 100
      },
      remove: {
        propId: l.MyConstans.propId.remove,
        count: 1,
        gold: "120"
      },
      mahjong: {
        propId: l.MyConstans.propId.mahjong,
        count: 1,
        gold: "120"
      },
      shuffle: {
        propId: l.MyConstans.propId.shuffle,
        count: 1,
        gold: "100"
      },
      tip: {
        propId: l.MyConstans.propId.tip,
        count: 1,
        gold: "80"
      },
      addHole: {
        propId: l.MyConstans.propId.addHole,
        count: 1,
        gold: "50"
      }
    };
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
  };
  e.prototype.onDestroy = function () {};
  e.prototype.start = function () {
    for (var t = this.dict.content, e = 0; e < t.children.length; e++) {
      var n = t.children[e];
      var o = n.getChildByName("lbCount").getComponent(cc.Label);
      var i = this._shopList[n.name];
      o.string = "x" + i.count;
      if (n.getChildByName("btnGold")) {
        n.getChildByName("btnGold").getChildByName("Background").getChildByName("lbGold").getComponent(cc.Label).string = i.gold;
      }
    }
  };
  e.prototype.onDisable = function () {};
  e.prototype.initData = function () {
    return r(this, undefined, undefined, function () {
      return s(this, function () {
        return [2];
      });
    });
  };
  e.prototype.btnClick_back = function (t) {
    if (h.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      this.gotoClose();
    }
  };
  e.prototype.btnClick_click = function (t) {
    h.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3);
  };
  e.prototype.btnClick_gold = function (t, e) {
    if (h.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      var n = e;
      var o = this._shopList[n];
      var i = o.gold;
      if (c.ManageCtl.gameData.getGoldCount() < i) {
        c.ManageCtl.persistRootNode.showTipsUI("金币不足");
      } else {
        c.ManageCtl.gameData.addGoldCount(-i);
        c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.updateGoldCount);
        var a = o.propId;
        var r = "";
        switch (a) {
          case l.MyConstans.propId.remove:
            r = "Remove";
            break;
          case l.MyConstans.propId.mahjong:
            r = "unlock";
            break;
          case l.MyConstans.propId.shuffle:
            r = "shuffle";
            break;
          case l.MyConstans.propId.tip:
            r = "tips";
            break;
          case l.MyConstans.propId.addHole:
            r = "addone";
        }
        if (r != "") {
          p.statsCtl.sendEventShuShu("shop", {
            type: "coin",
            goods: r
          });
        }
        var s = o.count;
        c.ManageCtl.gameData.addDayPropById(a, s);
        c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.updatePropCount);
        this.showGetTip(a, s);
      }
    }
  };
  e.prototype.btnClick_video = function (t, e) {
    var n = this;
    if (h.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      var o = e;
      var i = this._shopList[o];
      c.ManageCtl.playVideo(function () {
        var t = i.propId;
        var e = "";
        switch (t) {
          case l.MyConstans.propId.remove:
            e = "Remove";
            break;
          case l.MyConstans.propId.mahjong:
            e = "unlock";
            break;
          case l.MyConstans.propId.shuffle:
            e = "shuffle";
            break;
          case l.MyConstans.propId.tip:
            e = "tips";
            break;
          case l.MyConstans.propId.addHole:
            e = "addone";
        }
        if (e != "") {
          p.statsCtl.sendEventShuShu("shop", {
            type: "ad",
            goods: e
          });
        }
        var o = i.count;
        c.ManageCtl.gameData.addDayPropById(t, o);
        c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.updatePropCount);
        n.showGetTip(t, o);
        var a = c.ManageCtl.gameData.getCurModeId();
        var r = c.ManageCtl.gameData.getCurDevId();
        var s = c.ManageCtl.gameData.getCurLevelId();
        p.statsCtl.sendEventShuShu("reward_btn", {
          mode: a,
          devid: r,
          lv: s,
          scene: "shop"
        });
      });
    }
  };
  e.prototype.btnClick_addGold = function (t, e) {
    if (h.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      var n = e;
      var o = this._shopList[n];
      c.ManageCtl.playVideo(function () {
        p.statsCtl.sendEventShuShu("shop", {
          type: "ad",
          goods: "freecoin"
        });
        c.ManageCtl.gameData.addGoldCount(o.count);
        c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.updateGoldCount);
        c.ManageCtl.persistRootNode.showTipsUI("获得金币x" + o.count);
        if (window.game_goldNode) {
          var t = window.game_goldNode;
          var e = t.parent.convertToWorldSpaceAR(t.position);
          d.default.GetInstance().showFlyGold(e, o.count);
        }
      });
    }
  };
  e.prototype.gotoClose = function () {
    c.ManageCtl.uiManage.gotoDestroyUI(f.uiPath.uiName.popup_shopView);
  };
  e.prototype.showGetTip = function (t, e) {
    var n = "获得";
    switch (t) {
      case l.MyConstans.propId.remove:
        n += " 移出x" + e;
        break;
      case l.MyConstans.propId.addHole:
        n += " 加孔x" + e;
        break;
      case l.MyConstans.propId.tip:
        n += " 提示x" + e;
        break;
      case l.MyConstans.propId.mahjong:
        n += " 麻将槽x" + e;
        break;
      case l.MyConstans.propId.shuffle:
        n += " 洗牌x" + e;
    }
    c.ManageCtl.persistRootNode.showTipsUI(n);
  };
  return a([m, y("ui/popup_shopView")], e);
}(u.default);
exports.default = _;