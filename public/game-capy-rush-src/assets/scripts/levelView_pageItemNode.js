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
var r = require("./MyPageView_pageItem");
var s = require("./levelView_levelItemNode");
var c = cc._decorator;
var l = c.ccclass;
var u = c.property;
var d = c.menu;
var h = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.inPageItemNode = null;
    e.layoutNode = null;
    e._itemPool = null;
    return e;
  }
  i(e, t);
  e.prototype.start = function () {
    this.inPageItemNode.active = false;
    if (!this._itemPool) {
      this._itemPool = new cc.NodePool();
    }
  };
  e.prototype.onDestroy = function () {
    if (this._itemPool) {
      this._itemPool.clear();
    }
  };
  e.prototype.updateData = function (t, e, n, o) {
    if (!this._dataArr) {
      this._dataArr = t;
    }
    this._index = e;
    this._createItemCount = n;
    this._inPageItemCount = o;
    this._changeFlag = false;
    if (!this._itemPool) {
      this._itemPool = new cc.NodePool();
    }
    for (var i = [], a = 0; a < this.layoutNode.childrenCount; a++) {
      i.push(this.layoutNode.children[a]);
    }
    for (a = 0; a < i.length; a++) {
      this._itemPool.put(i[a]);
    }
    this.layoutNode.removeAllChildren();
    this.createItem();
  };
  e.prototype.initItem = function (t) {
    var e = null;
    (e = this._itemPool.size() > 0 ? this._itemPool.get() : cc.instantiate(this.inPageItemNode)).active = true;
    this.layoutNode.addChild(e);
    var n = this._index * this._inPageItemCount + t;
    var o = this._dataArr[n];
    e.getComponent(s.default).onRefresh(o, n);
  };
  a([u({
    type: cc.Node,
    tooltip: "pageItem中item预制"
  })], e.prototype, "inPageItemNode", undefined);
  a([u(cc.Node)], e.prototype, "layoutNode", undefined);
  return a([l, d("ui/levelView_pageItemNode")], e);
}(r.default);
exports.default = h;