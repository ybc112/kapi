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
var c = require("./MyTool");
var l = require("./ManageCtl");
var u = require("./SdkConfig");
var d = cc._decorator;
var h = d.ccclass;
var p = d.property;
var f = d.menu;
var g = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.bgSpriteFrames = [];
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    var e;
    var n;
    t.prototype.onLoad.call(this);
    this.node.children.forEach(function (t) {
      e = t.getChildByName("getNode");
      n = t.getChildByName("waitNode");
      e.active = false;
      n.active = false;
    });
    l.ManageCtl.myMsgCtl.on(u.MyConstans.msg.updateEquipment, this.onupdateEquipment, this);
  };
  e.prototype.onDestroy = function () {
    l.ManageCtl.myMsgCtl.off(u.MyConstans.msg.updateEquipment, this.onupdateEquipment, this);
  };
  e.prototype.start = function () {
    this.initData2();
  };
  e.prototype.onupdateEquipment = function () {
    this.initData2();
  };
  e.prototype.initData2 = function () {
    var t;
    var e;
    var n = this;
    var o = {};
    var i = l.ManageCtl.gameData.allEquipmentInfo;
    for (var a in i) {
      e = i[a].typeId;
      t = i[a].goodsId;
      if (!o[e]) {
        o[e] = {
          goodsType: i[a].goodsType,
          item: {}
        };
      }
      o[e].item[t] = i[a];
    }
    var r;
    var s = l.ManageCtl.gameData.getEquipmentInfo();
    var u = null;
    var d = null;
    var h = null;
    var p = null;
    var f = null;
    this.node.children.forEach(function (t) {
      u = t.getChildByName("getNode");
      d = t.getChildByName("waitNode");
      r = Number(t.name);
      var e = -1;
      var a = 0;
      for (var l in s) {
        var g = Number(l);
        if (s[l] == r) {
          if (g > e) {
            e = g;
          }
          a += 1;
        }
      }
      if (-1 == e) {
        u.active = false;
        return void (d.active = true);
      }
      u.active = true;
      d.active = false;
      h = u.getChildByName("imgBg").getComponent(cc.Sprite);
      p = u.getChildByName("imgIcon").getComponent(cc.Sprite);
      f = u.getChildByName("lbLv").getComponent(cc.Label);
      var m = i[e].img;
      f.string = "";
      p.node.mReloImgFalg = true;
      p.node.mLoadName = m;
      var y = h.node.width;
      var _ = h.node.height;
      c.MyTool.loadImgByName("/equipment/", m, p, "local", function (t) {
        var e = t.width;
        var n = t.height;
        var o = 1;
        if ((o = e >= n ? y / e : _ / n) < 0.3) {
          o = 0.3;
        }
        t.scale = o - 0.05;
      });
      var v = c.MyTool.getJsonLength(o[r].item);
      var C = Math.floor(a / (v / n.bgSpriteFrames.length));
      if (C >= n.bgSpriteFrames.length) {
        C = n.bgSpriteFrames.length - 1;
      }
      h.spriteFrame = n.bgSpriteFrames[C];
    });
  };
  e.prototype.btnClick_click = function (t) {
    s.default.instance.baseBtnClick(this.node.name + t.target.name);
  };
  a([p({
    type: [cc.SpriteFrame]
  })], e.prototype, "bgSpriteFrames", undefined);
  return a([h, f("ui/common_equipmentNode")], e);
}(r.default);
exports.default = g;