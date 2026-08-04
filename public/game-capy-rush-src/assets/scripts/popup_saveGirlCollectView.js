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
var l = require("./baseCompont");
var u = require("./MyAnimationTool");
var d = require("./MyTool");
var h = require("./myBtnClick");
var p = require("./uiPathManage");
var f = require("./common_setGraySprite");
var g = cc._decorator;
var m = g.ccclass;
g.property;
var y = g.menu;
var _ = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.bg = null;
    e._curModeId = 1;
    e._curDevId = 1;
    e._curLevelId = 1;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.bg = this.dict.bg;
  };
  e.prototype.start = function () {
    this.loadList();
    this.dict.itemNode.active = false;
  };
  e.prototype.onEnable = function () {
    u.MyAnimationTool.showViewAnimation(this.bg);
  };
  e.prototype.onDisable = function () {};
  e.prototype.loadList = function () {
    var t = this.dict.content;
    var e = c.ManageCtl.gameData.getPassLvByMode(5);
    this.dict.lbPro.getComponent(cc.Label).string = "当前收集进度" + e + "/12";
    for (var n = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"], o = null, i = 1, a = 0; a < n.length; a++) {
      i = a + 1;
      var r = n[a];
      (o = cc.instantiate(this.dict.itemNode)).active = true;
      t.addChild(o);
      o.name = i.toString();
      var s = o.getChildByName("imgIcon").getComponent(cc.Sprite);
      var l = "/texture/f29086/f29086_img300" + (11 + i);
      s.node.mReloImgFalg = true;
      d.MyTool.loadImg(l, s);
      if (i <= e) {
        o.getChildByName("lbName").getComponent(cc.Label).string = r;
        s.getComponent(f.default).setGeneral();
        o.mlock = false;
      } else {
        o.getChildByName("lbName").getComponent(cc.Label).string = "????";
        s.getComponent(f.default).setGray();
        o.mlock = true;
      }
    }
  };
  e.prototype.initData = function () {
    return r(this, undefined, undefined, function () {
      var t;
      return s(this, function (e) {
        switch (e.label) {
          case 0:
            this._curModeId = c.ManageCtl.gameData.getCurModeId();
            t = this;
            return [4, c.ManageCtl.gameData.getCurDevId()];
          case 1:
            t._curDevId = e.sent();
            this._curLevelId = c.ManageCtl.gameData.getCurLevelId();
            if (!this.dict) {
              this.loadNodeTree();
            }
            return [2];
        }
      });
    });
  };
  e.prototype.btnClick_close = function (t) {
    if (h.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      this.gotoClose();
    }
  };
  e.prototype.gotoClose = function () {
    c.ManageCtl.uiManage.gotoDestroyUI(p.uiPath.uiName.popup_saveGirlCollectView);
  };
  e.prototype.btnClick_click = function (t) {
    if (h.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      var e = t.target;
      var n = Number(e.name);
      if (e.mlock) {
        c.ManageCtl.persistRootNode.showTipsUI("通过生肖大作战第" + n + "关可获得");
      } else {
        c.ManageCtl.persistRootNode.showTipsUI("通过生肖大作战第" + n + "关获得");
      }
    }
  };
  return a([m, y("ui/popup_saveGirlCollectView")], e);
}(l.default);
exports.default = _;