var t;
var i = this && this.__extends || (t = function (_, o) {
  return (t = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (_, o) {
    _.__proto__ = o;
  } || function (_, o) {
    for (var e in o) {
      if (Object.prototype.hasOwnProperty.call(o, e)) {
        _[e] = o[e];
      }
    }
  })(_, o);
}, function (_, o) {
  function e() {
    this.constructor = _;
  }
  t(_, o);
  _.prototype = o === null ? Object.create(o) : (e.prototype = o.prototype, new e());
});
var d = this && this.__decorate || function (_, o, e, t) {
  var i;
  var d = arguments.length;
  var f = d < 3 ? o : t === null ? t = Object.getOwnPropertyDescriptor(o, e) : t;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    f = Reflect.decorate(_, o, e, t);
  } else {
    for (var m = _.length - 1; m >= 0; m--) {
      if (i = _[m]) {
        f = (d < 3 ? i(f) : d > 3 ? i(o, e, f) : i(o, e)) || f;
      }
    }
  }
  if (d > 3 && f) {
    Object.defineProperty(o, e, f);
  }
  return f;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var f = require("./BrainLevelBase");
var m = require("./LevelUtil");
var n = cc._decorator;
var r = n.ccclass;
n.property;
var a = function (_) {
  function o() {
    var o = _ !== null && _.apply(this, arguments) || this;
    o.editorLayer = null;
    o.ed_btnImport = null;
    o.ed_btnExport = null;
    o.ed_btnRotate = null;
    o.ed_btnStart = null;
    o.eContent = null;
    o.page1 = null;
    o.page2 = null;
    o.ed_symbol = "_";
    o.ed_scrollView = null;
    o.ed_infoNode = null;
    o.eTouchNode = null;
    o.ed_clickNode = null;
    o.ed_tempItem = null;
    o.ed_btnBack = null;
    o.ed_config = [];
    o.eGrids = null;
    o.eItems = null;
    o.eContainer = null;
    o.rows = 29;
    o.cols = 29;
    o.mgr = null;
    o.container = null;
    o.mapData = null;
    o.isMoveState = false;
    return o;
  }
  i(o, _);
  o.prototype.onLoad = function () {
    _.prototype.onLoad.call(this);
    this.node.getChildByName("eContainer").getChildByName("eGrids").children.forEach(function (_, o) {
      _.name = String(o + 1);
    });
  };
  o.prototype.logData = function () {
    var _ = this.eGrids;
    var o = [];
    _.children.map(function (_) {
      var e = {
        x: _.x.toFixed(0.1),
        y: _.y.toFixed(0.1)
      };
      o.push(e);
    });
    cc.log("path", JSON.stringify(o));
  };
  o.prototype.init = function (_) {
    this.mgr = _;
    this.dict = this.mgr.dict;
    this.initEditor();
  };
  o.prototype.initEditor = function () {
    var _ = this;
    this.node.active = true;
    this.ed_scrollView = this.dict.ed_scrollView;
    this.ed_infoNode = this.dict.ed_infoNode;
    this.ed_tempItem = this.dict.ed_tempItem;
    this.eTouchNode = this.dict.eTouchNode;
    this.ed_btnExport = this.dict.ed_btnExport;
    this.ed_btnImport = this.dict.ed_btnImport;
    this.ed_btnStart = this.dict.ed_btnStart;
    this.ed_btnBack = this.dict.ed_btnBack;
    this.ed_btnRotate = this.dict.ed_btnRotate;
    this.eContent = this.dict.eContent;
    this.page1 = this.dict.page1;
    this.page2 = this.dict.page2;
    this.eGrids = this.dict.eGrids;
    this.eItems = this.dict.eItems;
    this.container = this.dict.container;
    this.eContainer = this.node.getChildByName("eContainer");
    this.eGrids.active = true;
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.enterKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.enterKeyUp, this);
    var o = this.dict.ed_contentBox.getBoundingBoxToWorld();
    var e = null;
    var t = false;
    this.eContent.maxx = -360;
    this.eContent.minx = -850;
    this.logData();
    m.default.touchEvent(this.eTouchNode, {
      sFunc: function (i) {
        if (!_.isMoveState) {
          var d = i.getLocation();
          if (!e) {
            for (var f = 0; f < _.eContent.children.length; f++) {
              var n = _.eContent.children[f];
              if (n.getBoundingBoxToWorld().contains(d)) {
                (e = cc.instantiate(n)).parent = _.eItems;
                e.position = m.default.convertPosition(n, e);
                break;
              }
            }
            if (!e) {
              if (o.contains(d)) {
                t = true;
              }
            }
          }
        }
      },
      mFunc: function (o) {
        if (_.isMoveState) {
          _.eContainer.position = _.eContainer.position.add(o.getDelta());
        } else if (t) {
          _.eContent.x += o.getDeltaX();
          if (_.eContent.x > _.eContent.maxx) {
            _.eContent.x = _.eContent.maxx;
          }
          if (_.eContent.x < _.eContent.minx) {
            _.eContent.x = _.eContent.minx;
          }
        } else if (e) {
          e.position = e.position.add(o.getDelta());
        }
      },
      eFunc: function () {
        if (!_.isMoveState) {
          if (!t) {
            if (e) {
              if (e.getBoundingBoxToWorld().intersects(o)) {
                e.removeFromParent(true);
                e.active = false;
              } else {
                if (!e.touchEvent) {
                  e.touchEvent = true;
                  _.addTouchEvent(e);
                }
                _.correctPosition(e);
              }
              e = null;
            }
          }
          t = false;
        }
      }
    });
    m.default.onClickEvent(this.ed_btnImport, this.import.bind(this));
    m.default.onClickEvent(this.ed_btnExport, this.export.bind(this));
    m.default.onClickEvent(this.ed_btnStart, this.ed_startGame.bind(this));
    m.default.onClickEvent(this.ed_btnBack, this.ed_back.bind(this));
    m.default.onClickEvent(this.ed_btnRotate, this.ed_rotate.bind(this));
    m.default.onClickEvent(this.dict.eBtnCopy, this.ed_item_copy.bind(this));
    m.default.onClickEvent(this.dict.eBtnDelete, this.ed_item_delete.bind(this));
    m.default.onClickEvent(this.dict.eBtnTurnRight, this.ed_item_turnRight.bind(this));
    m.default.onClickEvent(this.dict.eBtnTurnLeft, this.ed_item_turnLeft.bind(this));
  };
  o.prototype.correctPosition = function (_) {
    for (var o = 0.6 * _.width, e = 0.6 * _.height, t = [0, 180, -180].some(function (o) {
        return o == _.angle;
      }) ? new cc.Size(o, e) : new cc.Size(e, o), i = cc.v3(t.width / 2, t.height / 2), d = _.convertToWorldSpaceAR(cc.v3()).sub(i), f = new cc.Rect(d.x, d.y, t.width, t.height), n = [], r = 0; r < this.eGrids.childrenCount; r++) {
      var a = this.eGrids.children[r];
      if (a.getBoundingBoxToWorld().intersects(f)) {
        n.push(a);
      }
    }
    if (_.name.startsWith("food")) {
      _.position = m.default.convertPosition(n[0], _);
    } else {
      var s;
      s = _.angle == 0 || _.angle == 180 || -180 == _.angle ? 1 : 2;
      var c = [];
      if (n.length >= 2) {
        var l = n[0];
        var u = [0, 0];
        var h = u[0];
        var p = u[1];
        var y = [0, 0];
        var v = y[0];
        var g = y[1];
        c.push(l);
        r = 1;
        for (; r < n.length; r++) {
          var x = n[r];
          h = x.x - l.x;
          p = x.y - l.y;
          v = Math.abs(h);
          g = Math.abs(p);
          if (s == 1) {
            if (v < 10 && g > l.width) {
              c.push(x);
              break;
            }
          } else if (g < 10 && v > l.width) {
            c.push(x);
            break;
          }
        }
      }
      cc.log("dir", s);
      if (c.length == 1) {
        var b = this.eGrids.children[0];
        var w = this.eGrids.children[this.cols];
        var A = b.position.sub(w.position);
        var C = n[0].position;
        var E = s == 1 ? 0 : A.x;
        var T = s == 1 ? A.y : 0;
        var L = cc.v2(E, T).add(C);
        var S = C.add(L).mul(0.5);
        var N = this.eGrids.convertToWorldSpaceAR(S);
        _.position = _.parent.convertToNodeSpaceAR(N);
      } else if (c.length == 2) {
        S = c[0].position.add(c[1].position).mul(0.5);
        N = this.eGrids.convertToWorldSpaceAR(S);
        _.position = _.parent.convertToNodeSpaceAR(N);
      }
    }
  };
  o.prototype.ed_startGame = function () {
    this.ed_write();
    this.page1.active = false;
    this.page2.active = true;
    this.eItems.active = false;
    this.eGrids.active = false;
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.enterKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.enterKeyUp, this);
    this.dict.container.angle = 0;
    this.eTouchNode.active = false;
    for (; this.eItems.childrenCount != 0;) {
      this.eItems.children[0].removeFromParent();
    }
    cc.log("ed_startGame:", this.ed_config);
    this.mgr.startGame(this.ed_config);
  };
  o.prototype.ed_write = function () {
    var _ = this;
    this.ed_config.length = 0;
    this.eItems.children.map(function (o) {
      var e = _.ed_symbol;
      var t = o.x.toFixed(1);
      var i = o.y.toFixed(1);
      var d = o.name + e + t + e + i + e + o.angle;
      _.ed_config.push(d);
    });
  };
  o.prototype.export = function () {
    var _ = this;
    var o = this.dict.ed_Level.getComponent(cc.EditBox).string;
    var e = [];
    this.eItems.children.map(function (o) {
      var t = _.ed_symbol;
      var i = o.x.toFixed(1);
      var d = o.y.toFixed(1);
      var f = o.name + t + i + t + d + t + o.angle;
      e.push(f);
    });
    var t = document.createElement("a");
    t.download = o + ".json";
    var i = new Blob([JSON.stringify(e)]);
    t.href = URL.createObjectURL(i);
    t.style.display = "none";
    t.click();
    cc.log("输出配置：", e);
  };
  o.prototype.import = function () {
    var _ = this;
    var o = document.createElement("input");
    o.type = "file";
    o.onchange = function (o) {
      var e = o.target.files;
      if (e.length != 0) {
        var t = new FileReader();
        t.onload = function (o) {
          try {
            var e = JSON.parse(o.target.result);
            _.ed_initData(e);
          } catch (t) {
            console.log(t);
          }
        };
        t.readAsText(e[0]);
      }
    };
    o.click();
  };
  o.prototype.ed_initData = function (_) {
    for (var o = this; this.eItems.childrenCount != 0;) {
      this.eItems.children[0].removeFromParent();
    }
    _.map(function (_) {
      var e = _.split(o.ed_symbol);
      var t = [e[0], Number(e[1]), Number(e[2]), Number(e[3])];
      var i = t[0];
      var d = t[1];
      var f = t[2];
      var m = t[3];
      var n = o.dict.eContent.getChildByName(i);
      var r = cc.instantiate(n);
      r.removeComponent(cc.PolygonCollider);
      r.parent = o.eItems;
      r.angle = m;
      r.x = d;
      r.y = f;
      o.addTouchEvent(r);
    });
    cc.log("导入的配置：", _);
  };
  o.prototype.enterKeyDown = function (_) {
    switch (_.keyCode) {
      case cc.macro.KEY.z:
        return this.ed_item_copy();
      case cc.macro.KEY.a:
        return this.ed_item_turnLeft();
      case cc.macro.KEY.s:
        return this.ed_item_turnRight();
      case cc.macro.KEY.x:
        return this.ed_item_delete();
      case cc.macro.KEY.space:
        this.isMoveState = true;
    }
  };
  o.prototype.enterKeyUp = function (_) {
    switch (_.keyCode) {
      case cc.macro.KEY.space:
        this.isMoveState = false;
    }
  };
  o.prototype.ed_item_copy = function () {
    if (this.ed_clickNode) {
      var _ = cc.instantiate(this.ed_clickNode);
      _.parent = this.eItems;
      _.position = m.default.convertPosition(this.ed_clickNode, _);
      _.x += 50;
      _.y += 50;
      this.addTouchEvent(_);
    }
  };
  o.prototype.ed_back = function () {
    this.eGrids.active = true;
    this.eTouchNode.active = true;
    this.page1.active = true;
    this.page2.active = false;
    this.eItems.active = true;
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.enterKeyDown, this);
    this.mgr.reset();
  };
  o.prototype.ed_rotate = function () {
    this.eContainer.position = cc.v2();
    var _ = this.eContainer.angle == 45 ? 0 : 45;
    this.eTouchNode.active = _ != 45;
    this.eContainer.angle = _;
  };
  o.prototype.ed_item_delete = function () {
    if (this.ed_clickNode) {
      this.ed_clickNode.active = false;
      this.ed_clickNode.removeFromParent(true);
      this.ed_infoNode.active = false;
    }
  };
  o.prototype.ed_item_turnRight = function () {
    if (this.ed_clickNode) {
      this.ed_clickNode.angle -= 90;
      if (this.ed_clickNode.angle < 0) {
        this.ed_clickNode.angle += 360;
      }
      this.correctPosition(this.ed_clickNode);
    }
  };
  o.prototype.ed_item_turnLeft = function () {
    if (this.ed_clickNode) {
      this.ed_clickNode.angle += 90;
      if (this.ed_clickNode.angle > 270) {
        this.ed_clickNode.angle = 0;
      }
      this.correctPosition(this.ed_clickNode);
    }
  };
  o.prototype.addTouchEvent = function (_) {
    if (!_.addTouchEvent) {
      _.addTouchEvent = true;
      _.on(cc.Node.EventType.TOUCH_START, this.touchStartEvent, this);
      _.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoveEvent, this);
      _.on(cc.Node.EventType.TOUCH_END, this.touchEndEvent, this);
      _.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEndEvent, this);
    }
  };
  o.prototype.clearEvent = function (_) {
    if (_.addTouchEvent) {
      _.addTouchEvent = false;
    }
    _.off(cc.Node.EventType.TOUCH_START, this.touchStartEvent, this);
    _.off(cc.Node.EventType.TOUCH_MOVE, this.touchMoveEvent, this);
    _.off(cc.Node.EventType.TOUCH_END, this.touchEndEvent, this);
    _.off(cc.Node.EventType.TOUCH_CANCEL, this.touchEndEvent, this);
  };
  o.prototype.touchStartEvent = function (_) {
    var o = _.target;
    if (o == this.ed_clickNode && this.ed_infoNode.active) {
      this.ed_infoNode.active = false;
    } else {
      this.ed_infoNode.active = true;
      this.ed_infoNode.position = m.default.convertPosition(o, this.ed_infoNode);
      this.ed_clickNode = o;
    }
  };
  o.prototype.touchMoveEvent = function (_) {
    var o = _.target;
    o.position = o.position.add(_.getDelta());
    if (this.ed_infoNode.active) {
      this.ed_infoNode.active = false;
    }
  };
  o.prototype.touchEndEvent = function (_) {
    var o = _.target;
    this.correctPosition(o);
  };
  return d([r], o);
}(f.default);
exports.default = a;