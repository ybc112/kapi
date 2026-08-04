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
exports.StartAxisType = exports.ListType = undefined;
var r;
var s;
var c = require("./GridListItem");
var l = cc._decorator;
var u = l.ccclass;
var d = l.property;
(function (t) {
  t[t.Horizontal = 1] = "Horizontal";
  t[t.Vertical = 2] = "Vertical";
  t[t.Grid = 3] = "Grid";
})(r = exports.ListType || (exports.ListType = {}));
(function (t) {
  t[t.Horizontal = 1] = "Horizontal";
  t[t.Vertical = 2] = "Vertical";
})(s = exports.StartAxisType || (exports.StartAxisType = {}));
var h = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.GridListItem = null;
    e.type = r.Vertical;
    e.startAxis = s.Horizontal;
    e.spaceX = 0;
    e.spaceY = 0;
    e.padding_top = 0;
    e.padding_buttom = 0;
    e.padding_left = 0;
    e._padding = 0;
    e.padding_right = 0;
    e.scrollView = null;
    e.content = null;
    e.itemDataList = [];
    e.spawnCount = 0;
    e.itemList = [];
    e.itemHeight = 0;
    e.itemWidth = 0;
    e.itemPool = [];
    e.halfScrollView = 0;
    e.lastContentPosX = 0;
    e.lastContentPosY = 0;
    e.gridRow = 0;
    e.gridCol = 0;
    e.updateTimer = 0;
    e.updateInterval = 0.2;
    e.bScrolling = false;
    e.updateFun = function () {};
    return e;
  }
  i(e, t);
  e.prototype.initList = function () {
    this.GridListItem.active = false;
    this.itemHeight = this.GridListItem.height;
    this.itemWidth = this.GridListItem.width;
    this.scrollView = this.node.getComponent(cc.ScrollView);
    this.content = this.scrollView.content;
    this.content.anchorX = 0;
    this.content.anchorY = 1;
    this.content.removeAllChildren();
  };
  e.prototype.setData = function (t) {
    if (!this.scrollView) {
      this.initList();
    }
    this.itemDataList = t.slice();
    this.updateContent();
  };
  e.prototype.countListParam = function () {
    var t = this.itemDataList.length;
    if (this.type == r.Vertical) {
      this.scrollView.horizontal = false;
      this.scrollView.vertical = true;
      this.content.width = this.content.parent.width;
      this.content.height = t * this.itemHeight + (t - 1) * this.spaceY + this.padding_top + this.padding_buttom;
      this.spawnCount = Math.round(this.scrollView.node.height / (this.itemHeight + this.spaceY)) + 2;
      this.halfScrollView = this.scrollView.node.height / 2 + this.itemHeight / 2 + this.spaceY;
      this.updateFun = this.updateV;
    } else if (this.type == r.Horizontal) {
      this.scrollView.horizontal = true;
      this.scrollView.vertical = false;
      this.content.width = t * this.itemWidth + (t - 1) * this.spaceX + this.padding_left + this.padding_right;
      this.content.height = this.content.parent.height;
      this.spawnCount = Math.round(this.scrollView.node.width / (this.itemWidth + this.spaceX)) + 2;
      this.halfScrollView = this.scrollView.node.width / 2 + this.itemWidth / 2 + this.spaceX;
      this.updateFun = this.udpateH;
    } else if (this.type == r.Grid) {
      if (this.startAxis == s.Vertical) {
        this.scrollView.horizontal = false;
        this.scrollView.vertical = true;
        this.content.width = this.content.parent.width;
        if (this.padding_left + this.padding_right + this.itemWidth + this.spaceX > this.content.width) {
          this.padding_left = 0;
          this.padding_right = 0;
          console.error("padding_left或padding_right过大");
        }
        this.gridCol = Math.floor((this.content.width - this.padding_left - this.padding_right) / (this.itemWidth + this.spaceX));
        this.gridRow = Math.ceil(t / this.gridCol);
        this.content.height = this.gridRow * this.itemHeight + (this.gridRow - 1) * this.spaceY + this.padding_top + this.padding_buttom;
        this.spawnCount = Math.round(this.scrollView.node.height / (this.itemHeight + this.spaceY)) * this.gridCol + 2 * this.gridCol;
        this.halfScrollView = this.scrollView.node.height / 2 + this.itemHeight / 2 + this.spaceY;
        this.updateFun = this.updateGrid_V;
      } else if (this.startAxis == s.Horizontal) {
        this.scrollView.horizontal = true;
        this.scrollView.vertical = false;
        this.content.height = this.content.parent.height;
        if (this.padding_top + this.padding_buttom + this.itemHeight + this.spaceY > this.content.height) {
          this.padding_top = 0;
          this.padding_buttom = 0;
          console.error("padding_top或padding_buttom过大");
        }
        this.gridRow = Math.floor((this.content.height - this.padding_top - this.padding_buttom) / (this.itemHeight + this.spaceY));
        this.gridCol = Math.ceil(t / this.gridRow);
        this.content.width = this.gridCol * this.itemWidth + (this.gridCol - 1) * this.spaceX + this.padding_left + this.padding_right;
        this.spawnCount = Math.round(this.scrollView.node.width / (this.itemWidth + this.spaceX)) * this.gridRow + 2 * this.gridRow;
        this.halfScrollView = this.scrollView.node.width / 2 + this.itemWidth / 2 + this.spaceX;
        this.updateFun = this.updateGrid_H;
      }
    }
  };
  e.prototype.createList = function (t, e) {
    if (this.itemDataList.length > this.spawnCount && t + this.spawnCount - 1 >= this.itemDataList.length) {
      t = this.itemDataList.length - this.spawnCount;
      e = this.scrollView.getMaxScrollOffset();
    } else if (this.itemDataList.length <= this.spawnCount) {
      t = 0;
    }
    for (var n = 0; n < this.spawnCount; n++) {
      var o = undefined;
      if (n + t < this.itemDataList.length) {
        if (this.itemList[n] == null) {
          o = this.getItem();
          this.itemList.push(o);
          o.parent = this.content;
          o.active = true;
        } else {
          o = this.itemList[n];
        }
        var i = o.getComponent(c.default);
        i.itemIndex = n + t;
        i.data = this.itemDataList[n + t];
        i.dataChanged();
        if (this.type == r.Vertical) {
          o.setPosition(this.content.width / 2, -o.height * (0.5 + n + t) - this.spaceY * (n + t) - this.padding_top);
        } else if (this.type == r.Horizontal) {
          o.setPosition(o.width * (0.5 + n + t) + this.spaceX * (n + t) + this.padding_left, -this.content.height / 2);
        } else if (this.type == r.Grid) {
          if (this.startAxis == s.Vertical) {
            var a = Math.floor((n + t) / this.gridCol);
            var l = (n + t) % this.gridCol;
            o.setPosition(o.width * (0.5 + l) + this.spaceX * l + this.padding_left, -o.height * (0.5 + a) - this.spaceY * a - this.padding_top);
            o.opacity = 255;
          } else if (this.startAxis == s.Horizontal) {
            a = (n + t) % this.gridRow;
            l = Math.floor((n + t) / this.gridRow);
            o.setPosition(o.width * (0.5 + l) + this.spaceX * l + this.padding_left, -o.height * (0.5 + a) - this.spaceY * a - this.padding_top);
            o.opacity = 255;
          }
        }
      } else if (this.itemList.length > this.itemDataList.length - t) {
        (o = this.itemList.pop()).removeFromParent();
        this.itemPool.push(o);
        o.active = true;
      }
    }
    this.scrollView.scrollToOffset(e);
  };
  e.prototype.getItem = function () {
    if (this.itemPool.length == 0) {
      return cc.instantiate(this.GridListItem);
    } else {
      return this.itemPool.pop();
    }
  };
  e.prototype.update = function () {
    this.updateFun();
  };
  e.prototype.onScrolling = function () {
    this.bScrolling = true;
  };
  e.prototype.updateV = function () {
    for (var t, e = this.itemList, n = this.halfScrollView, o = this.scrollView.content.y > this.lastContentPosY, i = (this.itemHeight + this.spaceY) * e.length, a = 0; a < e.length; a++) {
      t = e[a];
      var r = this.getPositionInView(t);
      if (o) {
        if (r.y > n && t.y - i - this.padding_buttom > -this.content.height) {
          var s = (l = t.getComponent(c.default)).itemIndex + e.length;
          l.itemIndex = s;
          l.data = this.itemDataList[s];
          l.dataChanged();
          t.y = t.y - i;
        }
      } else if (r.y < -n && t.y + i + this.padding_top < 0) {
        var l;
        s = (l = t.getComponent(c.default)).itemIndex - e.length;
        l.itemIndex = s;
        l.data = this.itemDataList[s];
        l.dataChanged();
        t.y = t.y + i;
      }
    }
    this.lastContentPosY = this.scrollView.content.y;
  };
  e.prototype.udpateH = function () {
    for (var t, e = this.itemList, n = this.halfScrollView, o = this.scrollView.content.x > this.lastContentPosX, i = (this.itemWidth + this.spaceX) * e.length, a = 0; a < e.length; a++) {
      t = e[a];
      var r = this.getPositionInView(t);
      if (o) {
        if (r.x > n && t.x - i - this.padding_left > 0) {
          var s = (l = t.getComponent(c.default)).itemIndex - e.length;
          l.itemIndex = s;
          l.data = this.itemDataList[s];
          l.dataChanged();
          t.x = t.x - i;
        }
      } else if (r.x < -n && t.x + i + this.padding_right < this.content.width) {
        var l;
        s = (l = t.getComponent(c.default)).itemIndex + e.length;
        l.itemIndex = s;
        l.data = this.itemDataList[s];
        l.dataChanged();
        t.x = t.x + i;
      }
    }
    this.lastContentPosX = this.scrollView.content.x;
  };
  e.prototype.updateGrid_V = function () {
    for (var t, e = this.itemList, n = this.halfScrollView, o = this.scrollView.content.y > this.lastContentPosY, i = (this.itemHeight + this.spaceY) * (this.spawnCount / this.gridCol), a = 0; a < e.length; a++) {
      t = e[a];
      var r = this.getPositionInView(t);
      if (o) {
        if (r.y > n && t.y - i - this.padding_buttom > -this.content.height) {
          var s = (l = t.getComponent(c.default)).itemIndex + this.spawnCount / this.gridCol * this.gridCol;
          if (this.itemDataList[s] != null) {
            t.y = t.y - i;
            l.itemIndex = s;
            l.data = this.itemDataList[s];
            l.dataChanged();
            t.opacity = 255;
          } else {
            t.y = t.y - i;
            l.itemIndex = s;
            t.opacity = 0;
          }
        }
      } else if (r.y < -n && t.y + i + this.padding_top < 0) {
        var l;
        s = (l = t.getComponent(c.default)).itemIndex - this.spawnCount / this.gridCol * this.gridCol;
        if (this.itemDataList[s] != null) {
          t.y = t.y + i;
          l.itemIndex = s;
          l.data = this.itemDataList[s];
          l.dataChanged();
          t.opacity = 255;
        } else {
          t.y = t.y + i;
          l.itemIndex = s;
          t.opacity = 0;
        }
      }
    }
    this.lastContentPosY = this.scrollView.content.y;
  };
  e.prototype.updateGrid_H = function () {
    for (var t, e = this.itemList, n = this.halfScrollView, o = this.scrollView.content.x > this.lastContentPosX, i = (this.itemWidth + this.spaceX) * (this.spawnCount / this.gridRow), a = 0; a < e.length; a++) {
      t = e[a];
      var r = this.getPositionInView(t);
      if (o) {
        if (r.x > n && t.x - i - this.padding_left > 0) {
          var s = (l = t.getComponent(c.default)).itemIndex - this.spawnCount / this.gridRow * this.gridRow;
          if (this.itemDataList[s] != null) {
            t.x = t.x - i;
            l.itemIndex = s;
            l.data = this.itemDataList[s];
            l.dataChanged();
            t.opacity = 255;
          } else {
            t.x = t.x - i;
            l.itemIndex = s;
            t.opacity = 0;
          }
        }
      } else if (r.x < -n && t.x + i + this.padding_right < this.content.width) {
        var l;
        s = (l = t.getComponent(c.default)).itemIndex + this.spawnCount / this.gridRow * this.gridRow;
        if (this.itemDataList[s] != null) {
          t.x = t.x + i;
          l.itemIndex = s;
          l.data = this.itemDataList[s];
          l.dataChanged();
          t.opacity = 255;
        } else {
          t.x = t.x + i;
          l.itemIndex = s;
          t.opacity = 0;
        }
      }
    }
    this.lastContentPosX = this.scrollView.content.x;
  };
  e.prototype.getPositionInView = function (t) {
    var e = t.parent.convertToWorldSpaceAR(t.position);
    return this.scrollView.node.convertToNodeSpaceAR(e);
  };
  e.prototype.getListData = function () {
    return this.itemDataList;
  };
  e.prototype.addItem = function (t) {
    this.itemDataList.push(t);
    this.updateContent();
  };
  e.prototype.addItemAt = function (t, e) {
    if (!(this.itemDataList[t] == null && this.itemDataList.length != t)) {
      this.itemDataList.splice(t, 1, e);
      this.updateContent();
    }
  };
  e.prototype.deleteItem = function () {};
  e.prototype.changeItem = function (t, e) {
    if (this.itemDataList[t] != null) {
      this.itemDataList[t] = e;
      this.updateContent();
    }
  };
  e.prototype.setStartIndex = function () {
    this.updateContent();
  };
  e.prototype.updateContent = function () {
    if (this.itemList.length == 0) {
      this.countListParam();
      this.createList(0, new cc.Vec2(0, 0));
    } else {
      if (this.type == r.Vertical) {
        this.itemList.sort(function (t, e) {
          return e.y - t.y;
        });
      } else if (this.type == r.Horizontal) {
        this.itemList.sort(function (t, e) {
          return t.x - e.x;
        });
      } else if (this.type == r.Grid) {
        if (this.startAxis == s.Vertical) {
          this.itemList.sort(function (t, e) {
            return t.x - e.x;
          });
          this.itemList.sort(function (t, e) {
            return e.y - t.y;
          });
        } else if (this.startAxis == s.Horizontal) {
          this.itemList.sort(function (t, e) {
            return e.y - t.y;
          });
          this.itemList.sort(function (t, e) {
            return t.x - e.x;
          });
        }
      }
      this.countListParam();
      var t = this.itemList[0].getComponent(c.default).itemIndex;
      if (this.type == r.Grid && this.startAxis == s.Vertical) {
        t += (t + this.spawnCount) % this.gridCol;
      } else if (this.type == r.Grid && this.startAxis == s.Horizontal) {
        t += (t + this.spawnCount) % this.gridRow;
      }
      var e = this.scrollView.getScrollOffset();
      e.x = -e.x;
      this.createList(t, e);
    }
  };
  e.prototype.onDestroy = function () {
    for (var t = this.itemList.length, e = 0; e < t; e++) {
      if (cc.isValid(this.itemList[e], true)) {
        this.itemList[e].destroy();
      }
    }
    this.itemList.length = 0;
    t = this.itemPool.length;
    e = 0;
    for (; e < t; e++) {
      if (cc.isValid(this.itemPool[e], true)) {
        this.itemPool[e].destroy();
      }
    }
    this.itemPool.length = 0;
    this.itemDataList.length = 0;
  };
  e.prototype.getItems = function () {
    return this.itemList;
  };
  a([d({
    type: cc.Node,
    tooltip: "列表项"
  })], e.prototype, "GridListItem", undefined);
  a([d({
    type: cc.Enum(r),
    tooltip: "排列方式"
  })], e.prototype, "type", undefined);
  a([d({
    type: cc.Enum(s),
    tooltip: "网格布局中的方向",
    visible: function () {
      return this.type == r.Grid;
    }
  })], e.prototype, "startAxis", undefined);
  a([d({
    type: cc.Integer,
    tooltip: "列表项X间隔",
    visible: function () {
      return this.type == r.Horizontal || this.type == r.Grid;
    }
  })], e.prototype, "spaceX", undefined);
  a([d({
    type: cc.Integer,
    tooltip: "列表项Y间隔",
    visible: function () {
      return this.type == r.Vertical || this.type == r.Grid;
    }
  })], e.prototype, "spaceY", undefined);
  a([d({
    type: cc.Integer,
    tooltip: "上间距",
    visible: function () {
      return this.type == r.Vertical || this.type == r.Grid;
    }
  })], e.prototype, "padding_top", undefined);
  a([d({
    type: cc.Integer,
    tooltip: "下间距",
    visible: function () {
      return this.type == r.Vertical || this.type == r.Grid;
    }
  })], e.prototype, "padding_buttom", undefined);
  a([d({
    type: cc.Integer,
    tooltip: "左间距",
    visible: function () {
      return this.type == r.Horizontal || this.type == r.Grid;
    }
  })], e.prototype, "padding_left", undefined);
  a([d(cc.Integer)], e.prototype, "_padding", undefined);
  a([d({
    type: cc.Integer,
    tooltip: "右间距",
    visible: function () {
      return this.type == r.Horizontal || this.type == r.Grid;
    }
  })], e.prototype, "padding_right", undefined);
  return a([u], e);
}(cc.Component);
exports.default = h;