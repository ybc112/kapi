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
var r;
var s;
var c = require("./MyPageView_pageItem");
var l = require("./MyPageView_pageNumItem");
var u = cc._decorator;
var d = u.ccclass;
var h = u.property;
(function (t) {
  t[t.init = 1] = "init";
  t[t.waitTouch = 2] = "waitTouch";
  t[t.scroll = 3] = "scroll";
})(r || (r = {}));
(function (t) {
  t[t.none = 1] = "none";
  t[t.left = 2] = "left";
  t[t.right = 3] = "right";
})(s || (s = {}));
var p = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.inPageItemCount = 1;
    e.scrollChange = 0.5;
    e.pageScrollTime = 0.3;
    e.pageItemNode = null;
    e.showChangePageBtnFlag = true;
    e.btnPreviousPage = null;
    e.btnNextPage = null;
    e.lbCurPage = null;
    e.showPageNumFlag = true;
    e.pageNumNode = null;
    e.pageNumItemNode = null;
    e.createPageNumMaxCount = 9;
    e._content = null;
    e._pageTouchNode = null;
    e._state = r.init;
    e._beginTouchPos = null;
    e._pageItemWidth = 0;
    e._dataArr = [];
    e._beginShowPageIndex = 0;
    e._needCreatePageItemCount = 0;
    e._curPageIndex = 0;
    e._pageItems = [];
    e._pageNumberItems = [];
    e._curDirection = s.none;
    e._touchMoveFlag = false;
    e._oldPosList = {};
    e.loadDataDoneFlag = false;
    e.loadStartFlag = false;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    this._content = this.node.getChildByName("view").getChildByName("content");
    this._pageTouchNode = this.node.getChildByName("view").getChildByName("pageTouchNode");
    var t = this._pageTouchNode;
    t.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    t.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    t.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    t.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    this._pageTouchNode._touchListener.setSwallowTouches(false);
  };
  e.prototype.onDestroy = function () {
    this.unscheduleAllCallbacks();
    var t = this.node;
    t.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    t.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    t.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    t.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
  };
  e.prototype.start = function () {
    this.pageItemNode.active = false;
    this._pageItemWidth = this.pageItemNode.width;
    if (this.showPageNumFlag) {
      this.pageNumItemNode.active = false;
    }
    if (this.loadDataDoneFlag) {
      this.createPageItem();
      this.createPageNumItem();
      this.setState(r.waitTouch);
    }
    this.loadStartFlag = true;
    this.setState(r.waitTouch);
  };
  e.prototype.getInPageItemCount = function () {
    return this.inPageItemCount;
  };
  e.prototype.setState = function (t) {
    this._state = t;
  };
  e.prototype.isScroll = function () {
    return this._state == r.scroll;
  };
  e.prototype.getCurPageIndex = function () {
    return this._curPageIndex;
  };
  e.prototype.setCurPageIndex = function (t) {
    this._curPageIndex = t;
    if (this.showChangePageBtnFlag) {
      this.lbCurPage.string = this._curPageIndex + 1 + "/" + this._needCreatePageItemCount;
      this.btnPreviousPage.active = true;
      this.btnNextPage.active = true;
    }
  };
  e.prototype.onTouchStart = function (t) {
    var e = this;
    if (this._state == r.waitTouch) {
      this._beginTouchPos = t.getLocation();
      this._oldPosList = {};
      this._pageItems.forEach(function (t) {
        e._oldPosList[t.node.name] = t.node.position;
      });
    }
  };
  e.prototype.onTouchMove = function (t) {
    if (this._state == r.waitTouch && this._beginTouchPos) {
      var e = t.getLocation();
      if (this._touchMoveFlag) {
        this._pageItems.forEach(function (e) {
          e.node.x += t.getDeltaX();
        });
      }
      if (!this._touchMoveFlag) {
        var n = 20 + this.scrollChange * this.node.width * 0.25;
        if (e.x - this._beginTouchPos.x > n) {
          this._curDirection = s.right;
        } else if (e.x - this._beginTouchPos.x < -n) {
          this._curDirection = s.left;
        } else {
          this._curDirection = s.none;
        }
      }
    }
  };
  e.prototype.onTouchEnd = function (t) {
    var e = this;
    if (this._beginTouchPos) {
      if (this._touchMoveFlag) {
        var n = t.getLocation();
        var o = 20 + this.scrollChange * this.node.width * 0.25;
        if (n.x - this._beginTouchPos.x > o) {
          this._curDirection = s.right;
          this.beginScroll(s.right);
        } else if (n.x - this._beginTouchPos.x < -o) {
          this._curDirection = s.left;
          this.beginScroll(s.left);
        } else {
          this._curDirection = s.none;
        }
        if (this._curDirection == s.none) {
          this._pageItems.forEach(function (t) {
            cc.tween(t.node).to(0.5 * e.pageScrollTime, {
              x: e._oldPosList[t.node.name].x
            }).start();
          });
        }
      }
      this._curDirection = s.none;
    }
  };
  e.prototype.update = function () {
    if (!this._touchMoveFlag) {
      if (this._curDirection != s.none && this._state == r.waitTouch) {
        if (this._curDirection == s.left) {
          this.beginScroll(s.left);
        } else {
          this.beginScroll(s.right);
        }
      }
    }
  };
  e.prototype.beginScroll = function (t) {
    var e = this;
    this.setState(r.scroll);
    if (t == s.left) {
      if (this._curPageIndex >= this._needCreatePageItemCount - 1) {
        return void this.setState(r.waitTouch);
      }
      var n;
      this.setCurPageIndex(this._curPageIndex + 1);
      if (this._curPageIndex > this._needCreatePageItemCount - 1) {
        this.setCurPageIndex(this._needCreatePageItemCount - 1);
      }
      this._pageItems.forEach(function (t) {
        n = e._touchMoveFlag ? e._oldPosList[t.node.name].x - t.node.width : t.node.x - t.node.width;
        cc.tween(t.node).to(e.pageScrollTime, {
          x: n
        }).call(function () {
          if (t.node.x <= 1.95 * (0 - t.node.width)) {
            t.changeToRight(e._needCreatePageItemCount, e._dataArr.length);
            t.node.position = cc.v3(e._pageItemWidth, 0);
            e._oldPosList[t.node.name] = t.node.position;
          }
        }).start();
      });
      var o = this.pageScrollTime;
      this.scheduleOnce(function () {
        e.setState(r.waitTouch);
        e.updatePageNumIndex();
      }, o);
    } else if (t == s.right) {
      if (this._curPageIndex <= 0) {
        return void this.setState(r.waitTouch);
      }
      var i;
      this.setCurPageIndex(this._curPageIndex - 1);
      if (this._curPageIndex < 0) {
        this.setCurPageIndex(0);
      }
      this._pageItems.forEach(function (t) {
        i = e._touchMoveFlag ? e._oldPosList[t.node.name].x + t.node.width : t.node.x + t.node.width;
        cc.tween(t.node).to(e.pageScrollTime, {
          x: i
        }).call(function () {
          if (t.node.x >= 1.95 * t.node.width) {
            t.changeToLeft(e._needCreatePageItemCount, e._dataArr.length);
            t.node.position = cc.v3(-e._pageItemWidth, 0);
            e._oldPosList[t.node.name] = t.node.position;
          }
        }).start();
      });
      o = this.pageScrollTime;
      this.scheduleOnce(function () {
        e.setState(r.waitTouch);
        e.updatePageNumIndex();
      }, o);
    }
  };
  e.prototype.updatePageNumIndex = function () {
    for (var t = this.getPageNumBeginAndEndIndexInfo(this._curPageIndex), e = t.begin, n = t.end, o = null, i = 0, a = e; a < n; a++) {
      if (o = this._pageNumberItems[i]) {
        o.updateData(a, this._curPageIndex);
      }
      i += 1;
    }
  };
  e.prototype.setData = function (t, e) {
    this._dataArr = t;
    this._beginShowPageIndex = e;
    this._needCreatePageItemCount = Math.ceil(this._dataArr.length / this.inPageItemCount);
    this.setCurPageIndex(this._beginShowPageIndex);
  };
  e.prototype.setDataByLevel = function (t, e) {
    var n = Math.floor((e - 1) / this.getInPageItemCount());
    this._dataArr = t;
    this._beginShowPageIndex = n;
    this._needCreatePageItemCount = Math.ceil(this._dataArr.length / this.inPageItemCount);
    this.setCurPageIndex(this._beginShowPageIndex);
    if (!this.loadDataDoneFlag && this.loadStartFlag) {
      this.createPageItem();
      this.createPageNumItem();
      this.setState(r.waitTouch);
    }
    this.loadDataDoneFlag = true;
  };
  e.prototype.gotoLv = function (t) {
    var e = Math.floor((t - 1) / this.getInPageItemCount());
    if (!(e < 0 || e > this._needCreatePageItemCount)) {
      this.gotoPage(e);
    }
  };
  e.prototype.createPageItem = function () {
    if (!(this._needCreatePageItemCount <= 0)) {
      this._pageItems = [];
      var t = null;
      if (this._needCreatePageItemCount < 3) {
        for (var e = null, n = 0, o = 0, i = 0; i < this._needCreatePageItemCount; i++) {
          (e = cc.instantiate(this.pageItemNode)).active = true;
          if (this._touchMoveFlag) {
            e.name = i.toString();
          }
          this._content.addChild(e);
          if (this._beginShowPageIndex <= 0) {
            e.position = cc.v3(i * this._pageItemWidth, 0);
            n = this._beginShowPageIndex + i;
          } else {
            e.position = cc.v3((i - 1) * this._pageItemWidth, 0);
            n = this._beginShowPageIndex + i - 1;
          }
          o = n == this._needCreatePageItemCount - 1 ? this._dataArr.length - n * this.inPageItemCount : this.inPageItemCount;
          (t = e.getComponent(c.default)).updateData(this._dataArr, n, o, this.inPageItemCount);
          this._pageItems.push(t);
        }
      } else {
        e = null;
        n = 0;
        o = 0;
        var a = null;
        for (i = 0; i < 3; i++) {
          (e = cc.instantiate(this.pageItemNode)).active = true;
          if (this._touchMoveFlag) {
            e.name = i.toString();
          }
          this._content.addChild(e);
          if (this._beginShowPageIndex <= 0) {
            e.position = cc.v3(i * this._pageItemWidth, 0);
            n = this._beginShowPageIndex + i;
          } else if (this._beginShowPageIndex >= Math.ceil(this._dataArr.length / this.inPageItemCount) - 1) {
            e.position = cc.v3((i - 2) * this._pageItemWidth, 0);
            n = this._beginShowPageIndex + i - 2;
          } else {
            e.position = cc.v3((i - 1) * this._pageItemWidth, 0);
            n = this._beginShowPageIndex + i - 1;
          }
          o = n == this._needCreatePageItemCount - 1 ? this._dataArr.length - n * this.inPageItemCount : this.inPageItemCount;
          (a = e.getComponent(c.default)).updateData(this._dataArr, n, o, this.inPageItemCount);
          this._pageItems.push(a);
        }
      }
    }
  };
  e.prototype.createPageNumItem = function () {
    if (this.showPageNumFlag) {
      for (var t = this.getPageNumBeginAndEndIndexInfo(this._beginShowPageIndex), e = t.begin, n = t.end, o = null, i = null, a = e; a < n; a++) {
        (o = cc.instantiate(this.pageNumItemNode)).active = true;
        this.pageNumNode.addChild(o);
        (i = o.getComponent(l.default)).updateData(a, this._curPageIndex);
        i.touchCallback = this.touchPageNumItemCallback.bind(this);
        this._pageNumberItems.push(i);
      }
    }
  };
  e.prototype.getPageNumBeginAndEndIndexInfo = function (t) {
    var e = this.createPageNumMaxCount;
    if (e > this._needCreatePageItemCount) {
      e = this._needCreatePageItemCount;
    }
    var n = 0;
    var o = e;
    if (t == this._needCreatePageItemCount - 1) {
      n = t - e + 1;
      o = t + 1;
    } else if (t != 0) {
      if (t > Math.ceil(0.5 * e)) {
        if ((o = t + Math.floor(0.5 * e)) > this._needCreatePageItemCount) {
          o = this._needCreatePageItemCount;
        }
        n = o - e;
      } else if (t == Math.ceil(0.5 * e)) {
        if ((o = t + Math.ceil(0.5 * e)) > this._needCreatePageItemCount) {
          o = this._needCreatePageItemCount;
        }
        n = o - e;
      }
    }
    return {
      begin: n,
      end: o
    };
  };
  e.prototype.touchPageNumItemCallback = function (t) {
    if (this._state != r.scroll) {
      this.gotoPage(t);
    }
  };
  e.prototype.gotoPage = function (t) {
    var e = this;
    var n = t;
    if (this._curPageIndex != n) {
      this._curDirection = s.none;
      this.setState(r.scroll);
      var o = this._curPageIndex;
      this.setCurPageIndex(n);
      if (this._needCreatePageItemCount < 3) {
        if (o == 0) {
          this._pageItems.forEach(function (t) {
            cc.tween(t.node).to(e.pageScrollTime, {
              x: t.node.x - t.node.width
            }).start();
          });
        } else {
          this._pageItems.forEach(function (t) {
            cc.tween(t.node).to(e.pageScrollTime, {
              x: t.node.x + t.node.width
            }).start();
          });
        }
        this.scheduleOnce(function () {
          e.setState(r.waitTouch);
          e._pageNumberItems.forEach(function (t) {
            t.setCutShowPageNum(e._curPageIndex);
          });
        }, this.pageScrollTime);
      } else {
        if (this._curPageIndex == 0) {
          this._pageItems.forEach(function (t, n) {
            t.node.x = n + t.node.width * n;
            t.changeToPage(n, e._needCreatePageItemCount, e._dataArr.length);
          });
        } else if (this._curPageIndex == this._needCreatePageItemCount - 1) {
          this._pageItems.forEach(function (t, n) {
            t.node.x = t.node.width * (n - 2);
            t.changeToPage(e._curPageIndex + (n - 2), e._needCreatePageItemCount, e._dataArr.length);
          });
        } else {
          this._pageItems.forEach(function (t, n) {
            t.node.x = (n - 1) * e._pageItemWidth;
            t.changeToPage(e._curPageIndex + (n - 1), e._needCreatePageItemCount, e._dataArr.length);
          });
        }
        this.scheduleOnce(function () {
          e.setState(r.waitTouch);
          e.updatePageNumIndex();
        }, this.pageScrollTime);
      }
    }
  };
  e.prototype.nextPage = function () {
    if (this._state != r.scroll) {
      var t = this._curPageIndex + 1;
      if (t > this._needCreatePageItemCount - 1) {
        t = 0;
      }
      this.gotoPage(t);
    }
  };
  e.prototype.previousPage = function () {
    if (this._state != r.scroll) {
      var t = this._curPageIndex - 1;
      if (t < 0) {
        t = this._needCreatePageItemCount - 1;
      }
      this.gotoPage(t);
    }
  };
  e.prototype.nextTenPage = function () {
    if (this._state != r.scroll) {
      var t = this._curPageIndex + 10;
      if (t > this._needCreatePageItemCount - 1) {
        t = 0;
      }
      this.gotoPage(t);
    }
  };
  e.prototype.previousTenPage = function () {
    if (this._state != r.scroll) {
      var t = this._curPageIndex - 10;
      if (t < 0) {
        t = this._needCreatePageItemCount - 1;
      }
      this.gotoPage(t);
    }
  };
  a([h({
    displayName: "每页中显示item数量"
  })], e.prototype, "inPageItemCount", undefined);
  a([h({
    type: cc.Float,
    range: [0, 1, 0.1],
    slide: true,
    displayName: "滑动判断阈值",
    tooltip: "值越大，滑动距离越大才判断滑动"
  })], e.prototype, "scrollChange", undefined);
  a([h({
    displayName: "每页滚动时间"
  })], e.prototype, "pageScrollTime", undefined);
  a([h({
    type: cc.Node,
    tooltip: "pageItem预制"
  })], e.prototype, "pageItemNode", undefined);
  a([h({
    displayName: "显示切页按钮"
  })], e.prototype, "showChangePageBtnFlag", undefined);
  a([h({
    type: cc.Node,
    visible: function () {
      return this.showChangePageBtnFlag;
    }
  })], e.prototype, "btnPreviousPage", undefined);
  a([h({
    type: cc.Node,
    visible: function () {
      return this.showChangePageBtnFlag;
    }
  })], e.prototype, "btnNextPage", undefined);
  a([h({
    type: cc.Label,
    visible: function () {
      return this.showChangePageBtnFlag;
    }
  })], e.prototype, "lbCurPage", undefined);
  a([h({
    displayName: "显示下面页数"
  })], e.prototype, "showPageNumFlag", undefined);
  a([h({
    type: cc.Node,
    visible: function () {
      return this.showPageNumFlag;
    }
  })], e.prototype, "pageNumNode", undefined);
  a([h({
    type: cc.Node,
    visible: function () {
      return this.showPageNumFlag;
    }
  })], e.prototype, "pageNumItemNode", undefined);
  a([h({
    displayName: "创建页数最大值",
    visible: function () {
      return this.showPageNumFlag;
    }
  })], e.prototype, "createPageNumMaxCount", undefined);
  return a([d], e);
}(cc.Component);
exports.default = p;