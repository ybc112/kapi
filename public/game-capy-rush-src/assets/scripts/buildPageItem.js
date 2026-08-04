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
var r = require("./buildItem");
var s = require("./MyPageView_pageItem");
var c = cc._decorator;
var l = c.ccclass;
c.property;
var u = c.menu;
var d = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e._itemPool = null;
    return e;
  }
  i(e, t);
  e.prototype.start = function () {
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
    this.node.removeAllChildren();
    this.createItem();
  };
  e.prototype.initItem = function () {
    this.loadItem("buildItem" + (this._index + 1));
  };
  e.prototype.loadItem = function (t) {
    var e = this;
    cc.assetManager.loadBundle("local", function (n, o) {
      if (n) {
        e.loadItem(t);
      } else if (o) {
        e.loadItem2(o, t);
      }
    });
  };
  e.prototype.loadItem2 = function (t, e) {
    var n = this;
    t.load("/prefab/" + e, function (o, i) {
      if (o) {
        n.loadItem2(t, e);
      } else if (i) {
        var a = cc.instantiate(i);
        if (!n.node || !cc.isValid(n.node) || !a) {
          return;
        }
        n.node.addChild(a);
        a.getComponent(r.default).onRefresh(n._index);
      }
    });
  };
  return a([l, u("ui/buildPageItem")], e);
}(s.default);
exports.default = d;