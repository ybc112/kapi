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
var c = require("./MyTool");
var l = cc._decorator;
var u = l.ccclass;
l.property;
var d = l.menu;
var h = function (t) {
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
  };
  e.prototype.onDestroy = function () {};
  e.prototype.start = function () {};
  e.prototype.onDisable = function () {};
  e.prototype.initData = function (t, e, n) {
    var o = this.node.getChildByName("imgBg").getComponent(cc.Sprite);
    var i = this.node.getChildByName("imgIcon").getComponent(cc.Sprite);
    var a = this.node.getChildByName("lbLv").getComponent(cc.Label);
    var s = this.node.getChildByName("lbName").getComponent(cc.Label);
    var l = t[e];
    a.string = "Lv." + l.goodsLv;
    s.string = l.goodsName;
    var u = "";
    if (r.ManageCtl.gameData.isGetEquipmentByGoodsId(e)) {
      a.node.opacity = 255;
      var d = l.img;
      i.node.mReloImgFalg = true;
      i.node.mLoadName = d;
      c.MyTool.loadImgByName("/equipment/", d, i);
      var h = c.MyTool.getJsonLength(t);
      var p = ["bg_zhuangbei1", "bg_zhuangbei2", "bg_zhuangbei3", "bg_zhuangbei4", "bg_zhuangbei5"];
      u = p[Math.floor(n / (h / p.length))];
    } else {
      u = "bg_zhuangbei0";
      a.node.opacity = 0;
      s.string = "未获得";
    }
    o.node.mReloImgFalg = true;
    o.node.mLoadName = u;
    c.MyTool.loadImgByName("/equipment/bg/", u, o);
  };
  return a([u, d("ui/popup_equipmentItemNode")], e);
}(s.default);
exports.default = h;