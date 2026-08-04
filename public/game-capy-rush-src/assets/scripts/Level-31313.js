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
var f;
var m;
var n;
var r;
var a;
var s;
var c;
var l = require("./BrainLevelBase");
var u = require("./levelReviveHelper");
var h = require("./LevelUtil");
var p = require("./Level-31313_config");
var y = require("./Level-31313_editor");
var v = cc._decorator;
var g = v.ccclass;
v.property;
(function (_) {
  _[_.none = 0] = "none";
  _[_.init = 1] = "init";
  _[_.waitTouch = 2] = "waitTouch";
  _[_.checkWin = 3] = "checkWin";
  _[_.over = 4] = "over";
})(f || (f = {}));
(function (_) {
  _[_.none = 0] = "none";
  _[_.wait = 1] = "wait";
  _[_.boom = 2] = "boom";
  _[_.clear = 3] = "clear";
  _[_.reverse = 4] = "reverse";
})(m || (m = {}));
(function (_) {
  _[_.up = 0] = "up";
  _[_.down = 1] = "down";
  _[_.left = 2] = "left";
  _[_.right = 3] = "right";
  _[_.leftUp = 4] = "leftUp";
  _[_.leftDown = 5] = "leftDown";
  _[_.rightDown = 6] = "rightDown";
  _[_.rightUp = 7] = "rightUp";
})(n || (n = {}));
(function (_) {
  _.idle = "daiji";
  _.run = "daiji";
  _.dizzy = "yun";
})(r || (r = {}));
(function (_) {
  _[_.shuita = 1] = "shuita";
  _[_.zhu = 2] = "zhu";
  _[_.she = 3] = "she";
  _[_.mifeng = 4] = "mifeng";
})(a || (a = {}));
(function (_) {
  _[_.lake = 1] = "lake";
  _[_.grass = 2] = "grass";
  _[_.land = 3] = "land";
  _[_.yellowGrid = 4] = "yellowGrid";
  _[_.grassland = 5] = "grassland";
})(s || (s = {}));
(function (_) {
  _[_.fruit = 1] = "fruit";
  _[_.flower = 2] = "flower";
})(c || (c = {}));
var x = function (_) {
  function o() {
    var o = _ !== null && _.apply(this, arguments) || this;
    o._state = f.waitTouch;
    o.m_isEmpty = Symbol("m_isEmpty");
    o.m_data = Symbol("m_data");
    o.m_tween = Symbol("m_tween");
    o.m_value = Symbol("m_value");
    o.m_gridIndex = Symbol("m_gridIndex");
    o.m_zindex = Symbol("m_zindex");
    o.mapData = null;
    o.container = null;
    o.spineFight = null;
    o.itemLayer = null;
    o.gridLayer = null;
    o.foodLayer = null;
    o.effectLayer = null;
    o.touchNode = null;
    o.blackBg = null;
    o.tipsNode = null;
    o.propBtnLayer = null;
    o.pres = null;
    o.itemList = [];
    o.mData = [];
    o.rows = 29;
    o.cols = 29;
    o.editor = null;
    o.speed = 1800;
    o.labProgress = null;
    o.totalItem = 0;
    o.foodNum = 0;
    o.gridPosList = [];
    o.levelConfig = null;
    o.currPorpState = m.none;
    o.mPlayerSkineKey = "f31313_player_skin";
    o.playerSkin = a.shuita;
    o.mMapSkineKey = "f31313_map_skin";
    o.mapSkin = s.lake;
    o.mFoodSkineKey = "f31313_food_skin";
    o.foodSkin = c.fruit;
    o.cEffectLayer = null;
    o.isEditor = false;
    o.ed_symbol = "_";
    o.nodeList = [];
    o.runningList = [];
    o.clickTipsTime = 0;
    o.clickTipsInterval = 10;
    o.currClickTipsNode = null;
    o.isDebug = false;
    o.eventName = {
      ClearAnimal: "f31313_clearAnimal",
      Tips: "f31313_tips"
    };
    o.yanwuPool = [];
    o.crocodileTime = 0;
    return o;
  }
  i(o, _);
  Object.defineProperty(o.prototype, "state", {
    get: function () {
      return this._state;
    },
    set: function (_) {
      this._state = _;
    },
    enumerable: false,
    configurable: true
  });
  o.prototype.onLoad = function () {
    var o = this;
    var e = function (_, o, e, t) {
      if (e === undefined) {
        e = 0;
      }
      if (t === undefined) {
        t = 0;
      }
      if (!_.getChildByName(o)) {
        var i = new cc.Node(o);
        _.addChild(i);
        i.addComponent(sp.Skeleton);
        i.getComponent(sp.Skeleton).premultipliedAlpha = false;
        i.x = e;
        i.y = t;
        i.opacity = 0;
        return i;
      }
    };
    var t = function (_, o) {
      if (!_.getChildByName(o)) {
        var e = new cc.Node(o);
        _.addChild(e);
        e.addComponent(cc.Sprite);
        e.active = false;
        return e;
      }
    };
    var i = cc.find("game", this.node);
    var d = i.getChildByName("pres");
    var f = [];
    var m = [];
    d.children.forEach(function (_) {
      if (_.name.startsWith("item")) {
        f.push(_);
      } else if (_.name.startsWith("food")) {
        m.push(_);
      }
    });
    var n = window[this.mPlayerSkineKey] === undefined ? 1 : window[this.mPlayerSkineKey];
    this.playerSkin = n;
    f.forEach(function (_) {
      var o;
      var e = _.children[0];
      e.zIndex = 10;
      var t = parseInt(((o = _.name.match(/\d+/)) === null || o === undefined ? undefined : o[0]) || "0");
      var i = "shuita";
      switch (n) {
        case a.shuita:
          i = "shuita";
          break;
        case a.zhu:
          i = "zhu";
          break;
        case a.she:
          i = "she";
          break;
        case a.mifeng:
          i = "mifeng";
      }
      e.name = i + ",daiji,skin" + t + "=spine";
    });
    if (n !== a.shuita) {
      e(d, "yanwu");
    }
    this.mapSkin = window[this.mMapSkineKey] === undefined ? s.lake : window[this.mMapSkineKey];
    var r = i.children[0];
    var l = null;
    var u = null;
    var h = cc.winSize.height;
    switch (this.mapSkin) {
      case s.lake:
        r.name = "8=bg";
        e(r, "yu").opacity = 255;
        e(r, "shuibo1", -375, h / 2).opacity = 255;
        e(r, "shuibo2", 375, h / 2).opacity = 255;
        e(r, "shuibo3", -375, -h / 2).opacity = 255;
        e(r, "shuibo4", 375, -h / 2).opacity = 255;
        break;
      case s.grass:
        r.name = "6=bg";
        l = t(r, "f31313.10=topBg");
        u = t(r, "f31313.5=bottomBg");
        break;
      case s.land:
        r.name = "3=bg";
        l = t(r, "f31313.1=topBg");
        u = t(r, "f31313.2=bottomBg");
        break;
      case s.yellowGrid:
        r.name = "9=bg";
        break;
      case s.grassland:
        r.name = "157=bg";
        l = t(r, "f31313.159=topBg");
        u = t(r, "f31313.158=bottomBg");
    }
    if (l) {
      l.y = h / 2 - l.height / 2;
      l.active = true;
      l.y -= 50;
    }
    if (u) {
      u.y = -h / 2 + u.height / 2;
      u.active = true;
      u.y += 50;
    }
    this.foodSkin = window[this.mFoodSkineKey] === undefined ? c.fruit : window[this.mFoodSkineKey];
    switch (this.foodSkin) {
      case c.fruit:
        break;
      case c.flower:
        m.forEach(function (_) {
          var o;
          var e = _.children[0];
          e.zIndex = 10;
          var t = 0;
          switch (parseInt(((o = _.name.match(/\d+/)) === null || o === undefined ? undefined : o[0]) || "0")) {
            case 1:
              t = 147;
              break;
            case 2:
              t = 148;
              break;
            case 3:
              t = 149;
              break;
            case 4:
              t = 150;
              break;
            case 5:
              t = 151;
              break;
            case 6:
              t = 152;
              break;
            case 7:
              t = 153;
              break;
            case 8:
              t = 154;
              break;
            case 9:
              t = 155;
              break;
            case 10:
              t = 156;
          }
          e.name = t + "=sp";
        });
    }
    e(d, "guojiang");
    e(d, "zhuangji");
    _.prototype.onLoad.call(this);
    this.setCollisionManager(true, true);
    this.itemLayer = this.dict.itemLayer;
    this.pres = this.dict.pres;
    this.gridLayer = this.dict.gridLayer;
    this.foodLayer = this.dict.foodLayer;
    this.touchNode = this.dict.touchNode;
    this.container = this.dict.container;
    this.effectLayer = this.dict.effectLayer;
    this.labProgress = this.dict.labProgress;
    this.blackBg = this.dict.blackBg;
    this.tipsNode = this.dict.tipsNode;
    this.container.children.forEach(function (_, e) {
      _.zIndex = 10 * e;
      _[o.m_zindex] = _.zIndex;
    });
    this.cEffectLayer = new cc.Node("cEffectLayer");
    this.cEffectLayer.parent = this.container;
    this.cEffectLayer.position = cc.v2();
    this.cEffectLayer.zIndex = 10 * (this.container.childrenCount + 1);
    this.cEffectLayer[this.m_zindex] = this.cEffectLayer.zIndex;
    this.gridLayer.children[0].opacity = 0;
    this.touchNode.setContentSize(2000, 2000);
    this.dict.game.getComponent(cc.Mask).enabled = true;
    this.labProgress.active = false;
    this.dict.propBtnLayer.active = false;
  };
  o.prototype.init = function () {
    if (this.dict) {
      if (this.dict.editor) {
        this.dict.editor.getComponent(y.default).init(this);
        this.isEditor = true;
      } else {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.enterKeyInput, this);
        this.startGame();
      }
    }
  };
  o.prototype.reset = function () {
    this.container.angle = 0;
    if (this.gridPosList.length) {
      this.gridPosList.length = 0;
    }
    if (this.mapData) {
      this.mapData.length = 0;
    }
    this.clearItems();
    this.clearFoods();
  };
  o.prototype.startGame = function (_) {
    var o = this;
    this.reset();
    this.initData(_);
    this.initItemLayer();
    this.initEvent();
    this.updateProgress();
    this.scheduleOnce(function () {
      o.state = f.waitTouch;
      if (cc.view.getFrameSize().width / cc.view.getFrameSize().height >= 0.5) {
        cc.log("短屏");
        o.container.scale = 0.9;
        o.effectLayer.scale = 0.9;
        o.labProgress.y = 520;
        o.dict.propBtnLayer.y += 100;
      }
      o.playRemoteSound("audio/f29589/f29589_create");
      if (o.isDebug) {
        o.container.angle = 0;
      } else {
        o.container.angle = 45;
      }
      o.nodeList.forEach(function (_) {
        _.opacity = 255;
        _.scale = 0;
        cc.tween(_).to(0.3, {
          scale: 1
        }).start();
        o.initGuidence();
      });
    }, 0.1);
  };
  o.prototype.initGuidence = function () {
    if (-31405 == this.levelID) {
      var _ = this.dict.sz;
      var o = this.dict.sz2;
      var e = this.itemLayer.getChildByName("item2");
      var t = this.itemLayer.getChildByName("item5");
      _.position = h.default.convertPosition(e, _);
      o.position = h.default.convertPosition(t, o);
      _.opacity = 255;
      o.opacity = 0;
      this.node.m_guidence = 1;
      this.node.m_guidence_target = e;
      cc.tween(_).to(0.2, {
        scale: 0.8
      }).to(0.2, {
        scale: 1
      }).union().repeatForever().start();
      cc.tween(o).to(0.2, {
        scale: 0.8
      }).to(0.2, {
        scale: 1
      }).union().repeatForever().start();
      this.dict.guidenceTips.opacity = 255;
    }
  };
  o.prototype.updateGuidence = function (_) {
    if (-31405 == this.levelID) {
      var o = this.dict.sz;
      var e = this.dict.sz2;
      this.itemLayer.getChildByName("item2");
      var t = this.itemLayer.getChildByName("item5");
      if (this.node.m_guidence == 1 && this.node.m_guidence_target === _) {
        this.node.m_guidence = 2;
        this.node.m_guidence_target = t;
        o.opacity = 0;
        e.opacity = 255;
      } else if (this.node.m_guidence == 2 && this.node.m_guidence_target === _) {
        e.opacity = 0;
        this.dict.guidenceTips.opacity = 0;
      }
    }
  };
  o.prototype.clearItems = function () {
    for (; this.itemLayer.childrenCount != 0;) {
      this.itemLayer.children[0].removeFromParent();
    }
  };
  o.prototype.clearFoods = function () {
    for (; this.foodLayer.childrenCount != 0;) {
      this.foodLayer.children[0].removeFromParent();
    }
  };
  o.prototype.initItemLayer = function () {
    var _ = this;
    this.levelConfig.forEach(function (o) {
      var e;
      var t = o.split(_.ed_symbol);
      var i = [t[0], Number(t[1]), Number(t[2]), Number(t[3])];
      var d = i[0];
      var f = i[1];
      var m = i[2];
      var n = i[3];
      var r = _.pres.getChildByName(d);
      var a = cc.instantiate(r);
      var s = parseInt(((e = d.match(/\d+/)) === null || e === undefined ? undefined : e[0]) || "0");
      var c = 0;
      if (d.startsWith("item")) {
        a.parent = _.itemLayer;
        c = s + 300;
        _.totalItem++;
      } else {
        a.parent = _.foodLayer;
        c = s + 200;
        _.foodNum++;
      }
      a.name = d;
      a[_.m_value] = c;
      a.angle = n;
      a.x = f;
      a.y = m;
      a.opacity = 0;
      _.nodeList.push(a);
    });
    for (var o = this.gridLayer.children[0], e = function (_) {
        var e = t.nodeList[_];
        var i = new cc.Node();
        i.name = "clickBox";
        i.parent = e;
        i.setContentSize(e.getContentSize());
        var d = t.optimizeSize(e);
        e.width = d.width;
        e.height = d.height;
        e[t.m_data] = {
          headMp: cc.v2(),
          bodyMp: [],
          dir: n.down,
          isHighlight: false,
          mIndex: _
        };
        for (var f = e[t.m_value], m = 0.6 * e.width, r = 0.6 * e.height, a = [0, 180, -180].some(function (_) {
            return _ == e.angle;
          }) ? new cc.Size(m, r) : new cc.Size(r, m), s = cc.v3(a.width / 4, a.height / 2), c = e.convertToWorldSpaceAR(cc.v3()).sub(s), l = new cc.Rect(c.x, c.y, a.width, a.height), u = [], h = e[t.m_data], p = function (_) {
            if (u.some(function (o) {
              return o == _;
            })) {
              return "continue";
            }
            var i = t.getXY(_);
            var d = i.x;
            var m = i.y;
            var n = t.gridPosList[_];
            var r = [o.width, o.height];
            var a = r[0];
            var s = r[1];
            var c = cc.v2(n.x - a / 2, n.y - s / 2);
            var p = t.gridLayer.convertToWorldSpaceAR(c);
            var y = new cc.Rect(p.x, p.y, a, s);
            if (y.intersects(l)) {
              t.mapData[d][m] = f;
              h.value = f;
              if (e.parent === t.foodLayer) {
                e[t.m_gridIndex] = _;
              }
              var v = e.convertToWorldSpaceAR(cc.v2(0, e.height / 4));
              var g = new cc.Rect(v.x, v.y, 5, 5);
              if (y.containsRect(g)) {
                h.headMp = cc.v2(d, m);
              } else {
                h.bodyMp.push(cc.v2(d, m));
              }
              u.push(_);
            }
          }, y = 0; y < t.gridPosList.length; y++) {
          p(y);
        }
        h.dir = t.getDirectionByAngle(e.angle);
        h.mapOffset = t.getMapOffset(h.dir);
        h.isFinish = false;
        e[t.m_data] = h;
        t.testLabel(e, e[t.m_data].headMp.x + "_" + e[t.m_data].headMp.y);
      }, t = this, i = 0; i < this.nodeList.length; i++) {
      e(i);
    }
    this.itemLayer.children.forEach(function (o) {
      _.playIdleAnimation(o);
    });
  };
  o.prototype.playIdleAnimation = function (_) {
    this.playAnimation(_, r.idle, true);
  };
  o.prototype.getXY = function (_) {
    var o = Math.floor(_ / this.cols);
    var e = _ % this.cols;
    return cc.v2(o, e);
  };
  o.prototype.getClickFood = function (_) {
    for (var o = this.foodLayer.convertToNodeSpaceAR(_), e = [], t = null, i = 0; i < this.foodLayer.children.length; i++) {
      var d = this.foodLayer.children[i];
      var f = d.position.sub(o).mag();
      d.m_dis = 99999;
      if (f <= 30) {
        d.m_dis = f;
        e.push(d);
      }
    }
    if (e.length) {
      e.sort(function (_, o) {
        return _.m_dis - o.m_dis;
      });
      t = e[0];
    }
    return t;
  };
  o.prototype.initEvent = function () {
    var _ = this;
    cc.v2();
    var o = this.touchNode;
    this.touchNode = o;
    this.touchNode.off(cc.Node.EventType.TOUCH_START);
    this.touchNode.off(cc.Node.EventType.TOUCH_END);
    this.touchNode.off(cc.Node.EventType.TOUCH_MOVE);
    this.touchNode.off(cc.Node.EventType.TOUCH_CANCEL);
    h.default.touchEvent(o, {
      sFunc: function (o) {
        if (_.state == f.waitTouch) {
          o.getLocation();
        }
      },
      mFunc: function () {
        _.state;
        f.waitTouch;
      },
      eFunc: function (o) {
        if (_.state == f.waitTouch && _.currPorpState != m.wait) {
          var e = o.getLocation();
          if (_.currPorpState != m.clear) {
            var t = _.getClickItem(e);
            if (t) {
              if (t.sz) {
                t.sz.active = false;
              }
              if (t.wait) {
                return;
              }
              _.playClickSound();
              if (_.currPorpState == m.boom) {
                return void _.boom(t);
              }
              switch (_.playerSkin) {
                case a.shuita:
                  _.playLevelSound("waterwalk");
                  break;
                case a.zhu:
                  _.playLevelSound("run");
                  break;
                case a.she:
                case a.mifeng:
                  _.playLevelSound("slide");
              }
              var i = _.getMovePath(t);
              _.cancelTips();
              var d = t[_.m_data].headMp;
              if (i.length) {
                _.updateGuidence(t);
                i.unshift(d);
                _.playAnimation(t, r.run);
                _.updateItemData(t, i);
                var n = i[i.length - 1];
                if (_.isOnTheEdge(n)) {
                  _.scheduleOnce(function () {
                    _.checkIsWin();
                  }, _.getTimeByMp(d, n) + 0.2);
                }
                _.addMoveEffect(t);
                _.showMoveEffect(t);
                _.move(t, i, 1);
                _.addToArray(t, _.runningList);
              } else {
                if (_.isOnTheEdge(d)) {
                  var s = t[_.m_data];
                  var c = s.headMp;
                  var l = h.default.copyArray(s.bodyMp);
                  _.mapData[c.x][c.y] = 0;
                  var u = [];
                  l.forEach(function (o) {
                    _.mapData[o.x][o.y] = 0;
                    var e = o.sub(c);
                    u.push(e);
                  });
                  return void _.goOut(t);
                }
                _.state = f.checkWin;
                var p = _.ijToIndex(d);
                var y = _.gridPosList[p];
                _.checkFaceItem(t, y);
                _.state = f.waitTouch;
              }
            }
          } else {
            var v = _.getClickFood(e);
            if (v) {
              _.clearFood(v);
            }
          }
        }
      }
    });
    this.dict.btnBoom.on(cc.Node.EventType.TOUCH_START, this.func_boom, this);
    this.dict.btnClear.on(cc.Node.EventType.TOUCH_START, this.func_clearFood, this);
    this.dict.btnReverse.on(cc.Node.EventType.TOUCH_START, this.func_reverse, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.enterKeyInput, this);
  };
  o.prototype.getFoodNum = function () {
    return this.foodNum;
  };
  o.prototype.showMsg = function (_) {
    this.tipsNode.active = true;
    this.tipsNode.getComponent(cc.Label).string = _;
  };
  o.prototype.hideMsg = function () {
    this.tipsNode.active = false;
  };
  o.prototype.btnTween = function (_) {
    _.scale = 1;
    cc.tween(_).to(0.1, {
      scale: 1.2
    }).to(0.1, {
      scale: 1
    }).start();
  };
  o.prototype.func_checkboom = function () {
    return this.state != f.over && this.currPorpState == m.none;
  };
  o.prototype.func_boomCb = function () {};
  o.prototype.func_boom = function () {
    if (this.state != f.over && this.currPorpState == m.none) {
      this.dict.blackBg.active = true;
      this.currPorpState = m.boom;
      this.showMsg("选择一种动物，直接消除动物和水果");
      this.cancelTips();
    }
  };
  o.prototype.playMoveEffect = function (_) {
    var o = this;
    if (this.playerSkin == a.shuita) {
      ;
    } else {
      var e;
      var t = this.dict.yanwu;
      if (!this.yanwuPool[t.name]) {
        this.yanwuPool[t.name] = new cc.NodePool();
      }
      (e = this.yanwuPool[t.name].size() <= 0 ? cc.instantiate(t) : this.yanwuPool[t.name].get()).parent = this.cEffectLayer;
      e.zIndex = 1;
      e.active = true;
      e.opacity = 255;
      e.scale = 1;
      var i = this.gridLayer.convertToWorldSpaceAR(_.add(cc.v2(0, 56)));
      e.position = e.parent.convertToNodeSpaceAR(i);
      h.default.playSpineCallBack(e, "animation", false, function () {
        o.yanwuPool[t.name].put(e);
        e.active = false;
        e.parent = o.pres;
      });
    }
  };
  o.prototype.boom = function (_) {
    var o = this;
    this.currPorpState = m.wait;
    this.hideMsg();
    var e = _[this.m_data];
    var t = e.headMp;
    this.mapData[t.x][t.y] = 100;
    e.bodyMp.forEach(function (_) {
      o.mapData[_.x][_.y] = 100;
    });
    var i = this.dict.zhadan;
    var d = cc.instantiate(i);
    d.parent = this.effectLayer;
    d.position = h.default.convertPosition(_, d);
    _[this.m_data].isFinish = true;
    h.default.playSpineCallBack(d, "animation1", false, function () {
      h.default.playSpineCallBack(d, "animation2", false, function () {
        o.playLevelSound("bomb");
        h.default.playSpineCallBack(d, "animation3", false, function () {
          d.removeFromParent(true);
          o.updateProgress();
          o.checkIsFail();
        });
        cc.tween(_).to(0.2, {
          opacity: 0
        }).call(function () {
          _.active = false;
          o.checkIsFail();
        }).start();
        o.clearSameLineFood(_);
        o.dict.blackBg.active = false;
        o.currPorpState = m.none;
        cc.game.emit("level_shake");
        o.func_boomCb();
      });
    });
  };
  o.prototype.clearSameLineFood = function (_) {
    for (var o = this, e = _[this.m_data], t = e.mapOffset, i = e.headMp.add(t), d = true, f = _[this.m_value] - 100, m = []; d;) {
      if (this.isInRange(i)) {
        if (this.mapData[i.x][i.y] == f) {
          var n = this.getFood(i);
          if (n) {
            m.push(n);
          }
        }
        i = i.add(t);
      } else {
        d = false;
      }
    }
    m.forEach(function (_) {
      var e = _[o.m_data].headMp;
      o.mapData[e.x][e.y] = 100;
      o.eatFood(_);
    });
  };
  o.prototype.clearFood = function (_) {
    var o = this;
    this.playLevelSound("remove");
    this.currPorpState = m.wait;
    this.hideMsg();
    var e = _[this.m_value];
    var t = [];
    this.foodLayer.children.forEach(function (_) {
      var i = _[o.m_data].headMp;
      if (e == _[o.m_value]) {
        o.mapData[i.x][i.y] = 100;
        t.push(_);
      }
    });
    t.forEach(function (_) {
      o.eatFood(_);
    });
    this.dict.blackBg.active = false;
    this.currPorpState = m.none;
    this.blackBg.zIndex = this.blackBg[this.m_zindex];
    this.foodLayer.zIndex = this.foodLayer[this.m_zindex];
    this.func_checkclearCb();
  };
  o.prototype.func_check_clearFood = function () {
    return this.foodLayer.children.filter(function (_) {
      return _.active;
    }).length;
  };
  o.prototype.func_checkclearCb = function () {};
  o.prototype.func_clearFood = function () {
    if (this.state != f.over && this.currPorpState == m.none && this.func_check_clearFood()) {
      this.blackBg.active = true;
      this.blackBg.zIndex = this.itemLayer.zIndex + 1;
      this.foodLayer.zIndex = this.itemLayer.zIndex + 2;
      this.currPorpState = m.clear;
      this.showMsg("选择一种水果直接消除");
      this.cancelTips();
    }
  };
  o.prototype.getGoOutCount = function (_) {
    for (var o = _[this.m_data], e = o.mapOffset, t = o.headMp, i = (o.bodyMp, t.add(e)), d = true, f = [], m = _[this.m_value] - 100; d;) {
      if (this.isInRange(i)) {
        var n = this.mapData[i.x][i.y];
        if (n == 100 || n == m) {
          f.push(i);
          i = i.add(e);
        } else {
          d = false;
        }
      } else {
        d = false;
      }
    }
    return f;
  };
  o.prototype.getReverseAngle = function (_) {
    if (_ >= 180) {
      return _ - 180;
    } else {
      return _ + 180;
    }
  };
  o.prototype.getReverseCanGo = function (_) {
    var o = this;
    var e = function (_, e) {
      var t = e[o.m_data];
      var i = t.headMp;
      var d = t.bodyMp;
      if (i.equals(_)) {
        return true;
      }
      for (var f = 0; f < d.length; f++) {
        var m = d[f];
        if (i.equals(m)) {
          return true;
        }
      }
    };
    var t = [];
    _.forEach(function (_) {
      var i;
      var d = _[o.m_data];
      i = _.angle >= 180 ? _.angle - 180 : _.angle + 180;
      if (d.headMp.x == 16 && d.headMp.y == 19) {
        cc.log("a");
      }
      for (var f = o.getDirectionByAngle(i), m = o.getMapOffset(f), n = m.mul(d.bodyMp.length), r = d.headMp.add(n), a = m, s = r.add(a), c = true, l = [], u = _[o.m_value] - 100; c;) {
        if (o.isInRange(s)) {
          var h = o.mapData[s.x][s.y];
          if (h == 100 || h == u || e(s, _)) {
            l.push(s);
            s = s.add(a);
          } else {
            c = false;
          }
        } else {
          c = false;
        }
      }
      if (l.length) {
        var p = l[l.length - 1];
        if (o.isOnTheEdge(p)) {
          t.push(_);
        }
      } else if (o.isOnTheEdge(r)) {
        t.push(_);
      }
    });
    cc.log("getReverseCanGo", t.length);
    return t;
  };
  o.prototype.canMoveFinishNow = function (_) {
    var o = this;
    if (_ === undefined) {
      _ = null;
    }
    if (!_) {
      _ = this.itemLayer.children.filter(function (_) {
        return !_[o.m_data].isFinish && !_.isAnimation;
      });
    }
    var e = [];
    _.forEach(function (_) {
      var t = o.getMovePath(_);
      var i = t[t.length - 1];
      var d = _[o.m_data].headMp;
      if (!(o.isOnTheEdge(d) || t.length && o.isOnTheEdge(i))) {
        e.push(_);
      }
    });
    return e;
  };
  o.prototype.func_check_reverse = function () {
    var _ = this;
    var o = [];
    this.currPorpState = m.wait;
    var e = this.itemLayer.children.filter(function (o) {
      return !o[_.m_data].isFinish && !o.isAnimation;
    });
    var t = this.canMoveFinishNow(e);
    var i = this.getReverseCanGo(t);
    if (i.length) {
      for (var d = 0; d < i.length; d++) {
        var f = i[d];
        o.push(f);
        if (o.length >= 5) {
          break;
        }
      }
    }
    if (o.length < 5) {
      cc.log("翻转：", "一次翻转出去的不足，再找");
      e.forEach(function (_) {
        return _.m_r_check = false;
      });
      o.forEach(function (_) {
        return _.m_r_check = true;
      });
      for (var n = 0; n < t.length; n++) {
        if (!(f = t[n]).m_r_check) {
          for (var r = false, a = 0; a < e.length; a++) {
            var s = e[a];
            if (s != f) {
              var c = f[this.m_data];
              var l = s[this.m_data];
              var u = false;
              if (c.headMp.x == l.headMp.x && c.headMp.x == c.bodyMp[0].x && c.bodyMp[0].x == l.bodyMp[0].x) {
                u = true;
              }
              if (c.headMp.y == l.headMp.y && c.headMp.y == c.bodyMp[0].y && c.bodyMp[0].y == l.bodyMp[0].y) {
                u = true;
              }
              if (u) {
                if (-1 != o.indexOf(s)) {
                  if (this.getReverseAngle(f.angle) === s.angle) {
                    r = true;
                    break;
                  }
                } else if (f.angle === s.angle) {
                  r = true;
                  break;
                }
              }
            }
          }
          if (!r) {
            f.m_r_check = true;
            o.push(f);
          }
        }
      }
    }
    return !!o.length && o;
  };
  o.prototype.func_checkreverse = function () {
    return this.state != f.over && this.currPorpState == m.none;
  };
  o.prototype.func_reverse = function () {
    var _ = this;
    if (this.state != f.over && this.currPorpState == m.none) {
      var o = this.func_check_reverse();
      if (o && o.length) {
        var e = Math.min(o.length, 5);
        var t = [];
        this.playLevelSound("reverse");
        for (var i = function (i) {
            var f = o[i];
            d.hideMoveEffect(f);
            d.clearSameLineFood(f);
            cc.tween(f).to(0.2, {
              scale: 0
            }).delay(0.2).to(0.2, {
              scale: 1
            }).start().call(function () {
              _.reverseAngle(f);
              if (i == e - 1) {
                _.currPorpState = m.none;
              }
            }).delay(1).call(function () {}).start();
            t.push(f);
          }, d = this, n = 0; n < e; n++) {
          i(n);
        }
        this.cancelTips();
      }
    }
  };
  o.prototype.reverseAngle = function (_) {
    var o;
    o = _.angle >= 180 ? _.angle - 180 : _.angle + 180;
    _.angle = o;
    _[this.m_data].dir = this.getDirectionByAngle(_.angle);
    _[this.m_data].mapOffset = this.getMapOffset(_[this.m_data].dir);
    if (this.blackBg) {
      this.blackBg.active = false;
    }
    var e = _[this.m_data];
    var t = e.mapOffset.mul(e.bodyMp.length);
    e.headMp = e.headMp.add(t);
    e.bodyMp.forEach(function (_) {
      var o = e.mapOffset.neg();
      _.addSelf(o);
    });
  };
  o.prototype.showMoveEffect = function (_) {
    if (_.getChildByName("ms")) {
      _.getChildByName("ms").opacity = 255;
      _.getChildByName("ms2").opacity = 255;
    }
  };
  o.prototype.hideMoveEffect = function (_) {
    if (_.getChildByName("ms")) {
      _.getChildByName("ms").opacity = 0;
      _.getChildByName("ms2").opacity = 0;
    }
  };
  o.prototype.addMoveEffect = function (_) {
    if (!_.m_add_moveEffect) {
      _.m_add_moveEffect = true;
      var o = function (o, e, t, i) {
        var d = cc.instantiate(e);
        d.parent = _;
        d.zIndex = 1;
        d.name = o;
        d.x = t;
        d.y = i;
        return d;
      };
      if (this.playerSkin == a.shuita) {
        o("ms", this.dict.pre_ms, -13.5, -45.8);
        o("ms2", this.dict.pre_ms, 11.6, -45.8);
      }
    }
  };
  o.prototype.showEffect = function () {};
  o.prototype.checkFaceItem = function (_, o) {
    var e = this;
    var t = _[this.m_data];
    var i = t.headMp.add(t.mapOffset);
    if (this.getItemByMp(i)) {
      cc.game.emit("level_shake");
      _.isAnimation = true;
      var d = i;
      var m = this.ijToIndex(d);
      var n = this.gridPosList[m];
      var a = n.sub(o);
      var s = a.mag();
      var c = a.normalize().mul(0.2 * s);
      var l = s / this.speed;
      this.showMoveEffect(_);
      cc.tween(_).by(l, {
        position: c
      }).call(function () {
        var o = e.dict.zhuangji;
        var t = cc.instantiate(o);
        t.parent = e.effectLayer;
        t.opacity = 255;
        var i = _.convertToWorldSpaceAR(cc.v2(0, _.height / 2));
        t.position = e.effectLayer.convertToNodeSpaceAR(i);
        h.default.playSpineCallBack(t, "animation", false, function () {
          t.removeFromParent(true);
        });
        e.playAnimation(_, r.dizzy, false);
        e.showEffect(n);
      }).delay(0.3).call(function () {
        e.playAnimation(_, r.run);
      }).by(l, {
        position: c.neg()
      }).call(function () {
        e.playIdleAnimation(_);
        _.isAnimation = false;
        e.deleteFromArray(_, e.runningList);
        e.hideMoveEffect(_);
      }).start();
    } else {
      this.playIdleAnimation(_);
      this.deleteFromArray(_, this.runningList);
      this.state = f.waitTouch;
    }
  };
  o.prototype.getItemByMp = function (_) {
    for (var o = null, e = 0; e < this.nodeList.length && !o; e++) {
      var t = this.nodeList[e];
      if (t.active) {
        var i = t[this.m_data];
        if (_.equals(i.headMp)) {
          o = t;
          break;
        }
        for (var d = 0; d < i.bodyMp.length; d++) {
          var f = i.bodyMp[d];
          if (_.equals(f)) {
            o = t;
            break;
          }
        }
      }
    }
    return o;
  };
  o.prototype.deleteFromArray = function (_, o) {
    var e = o.indexOf(_);
    if (-1 !== e) {
      o.splice(e, 1);
    }
  };
  o.prototype.addToArray = function (_, o) {
    if (-1 === o.indexOf(_)) {
      o.push(_);
    }
  };
  o.prototype.getTimeByMp = function (_, o) {
    return o.sub(_).mag() * this.gridLayer.children[0].width / this.speed;
  };
  o.prototype.updateItemData = function (_, o) {
    var e = this;
    var t = _[this.m_data];
    var i = t.headMp;
    var d = h.default.copyArray(t.bodyMp);
    this.mapData[i.x][i.y] = 100;
    var f = [];
    d.forEach(function (_) {
      e.mapData[_.x][_.y] = 100;
      var o = _.sub(i);
      f.push(o);
    });
    var m = _[this.m_value];
    o.forEach(function (_) {
      var o = _;
      if (e.mapData[o.x][o.y] > 100 && e.mapData[o.x][o.y] < 300) {
        e.mapData[o.x][o.y] = 100;
      }
    });
    var n = o[o.length - 1];
    var r = this.isOnTheEdge(n);
    this.mapData[n.x][n.y] = r ? 100 : m;
    var a = [];
    f.forEach(function (_) {
      var o = _.add(n);
      e.mapData[o.x][o.y] = r ? 100 : m;
      a.push(o);
    });
    t.headMp = n;
    t.bodyMp.length = 0;
    t.bodyMp = h.default.copyArray(a);
    _[this.m_data] = t;
    if (r) {
      _.isGoOut = true;
      var s = _.parent.convertToWorldSpaceAR(_.position);
      cc.game.emit(this.eventName.ClearAnimal, s);
    }
    this.updateTestLabel(_, this.getStr(_));
  };
  o.prototype.isOnTheEdge = function (_) {
    return _.x == 0 || _.x == this.rows - 1 || _.y == 0 || _.y == this.cols - 1;
  };
  o.prototype.getMovePath = function (_) {
    for (var o = _[this.m_data], e = o.mapOffset, t = o.headMp.add(e), i = true, d = [], f = _[this.m_value] - 100; i;) {
      if (this.isInRange(t)) {
        var m = this.mapData[t.x][t.y];
        if (m == 100 || m == f) {
          d.push(t);
          t = t.add(e);
        } else {
          i = false;
        }
      } else {
        i = false;
      }
    }
    return d;
  };
  o.prototype.getClickItem = function (_) {
    for (var o = this, e = this.itemLayer.children.filter(function (_) {
        return _[o.m_data] && !_[o.m_data].isFinish;
      }), t = function (o) {
        var t = e[o];
        if (t.isAnimation) {
          return "continue";
        }
        var d = i.relationPointToPolygon(t.convertToNodeSpaceAR(_), i.getPolygon(t));
        if ([0, 1, 2].some(function (_) {
          return _ == d;
        })) {
          return {
            value: t
          };
        } else {
          return undefined;
        }
      }, i = this, d = 0; d < e.length; d++) {
      var f = t(d);
      if (typeof f == "object") {
        return f.value;
      }
    }
    return null;
  };
  o.prototype.update = function (_) {
    this.updateCrocodile(_);
    this.updateItemTips(_);
  };
  o.prototype.updateItemTips = function (_) {
    if (this.currPorpState == m.none && !this.currClickTipsNode && (this.clickTipsTime += _, this.clickTipsTime >= this.clickTipsInterval)) {
      this.clickTipsTime = 0;
      for (var o = this.getUnFinishNode(), e = 0; e < o.length; e++) {
        var t = o[e];
        var i = this.getMovePath(t);
        if (i.length) {
          var d = i[i.length - 1];
          if (this.isOnTheEdge(d)) {
            this.currClickTipsNode = t;
            return void h.default.playSpineCallBack(t.getChildByName("spine"), "tishi", true);
          }
        }
      }
    }
  };
  o.prototype.cancelTips = function () {
    if (this.currClickTipsNode) {
      this.clickTipsTime = 0;
      h.default.playSpineCallBack(this.currClickTipsNode.getChildByName("spine"), "daiji", true);
      this.currClickTipsNode = null;
    }
  };
  o.prototype.updateCrocodile = function (_) {
    var o = this.dict.yu;
    if (o) {
      if (!o.m_start) {
        o.m_start = true;
        o.m_dir = 1;
        o.m_state = 1;
        o.opacity = 255;
        o.x = -655;
      }
      if (o.m_state == 1) {
        o.x += 2;
        if (o.x >= 700) {
          o.m_state = 2;
          o.x = -655;
          this.crocodileTime = 0;
        }
      } else if (o.m_state == 2) {
        this.crocodileTime += _;
        if (this.crocodileTime > 8) {
          o.m_state = 1;
        }
      }
    }
  };
  o.prototype.updateProgress = function () {
    var _ = this;
    if (this.labProgress) {
      var o = this.labProgress.getComponent(cc.Label);
      var e = this.totalItem;
      var t = ((e - this.itemLayer.children.filter(function (o) {
        return !o[_.m_data].isFinish;
      }).length) / e).toFixed(2);
      var i = Number(t);
      i *= 100;
      if ((i = Math.floor(i)) > 100) {
        i = 100;
      }
      o.string = "进度" + i + "%";
      cc.game.emit("level_proChange", i);
    }
  };
  o.prototype.relationPointToPolygon = function (_, o) {
    for (var e = 0, t = 0; t < o.length; ++t) {
      if (o[t].equals(_)) {
        return 2;
      }
      var i = o[t];
      var d = o[0];
      if (t < o.length - 1) {
        d = o[t + 1];
      }
      var f = this.rayPointToLine(_, i, d);
      if (f == 1) {
        return 1;
      }
      if (f == 0) {
        e++;
      }
    }
    if (e % 2 == 0) {
      return -1;
    } else {
      return 0;
    }
  };
  o.prototype.getPolygon = function () {
    return [cc.v2(-26, -50), cc.v2(26, -50), cc.v2(26, 50), cc.v2(-26, 50)].map(function (_) {
      return cc.v2(_.x, _.y);
    });
  };
  o.prototype.rayPointToLine = function (_, o, e) {
    Math.min(o.x, e.x);
    var t = Math.max(o.x, e.x);
    var i = Math.min(o.y, e.y);
    var d = Math.max(o.y, e.y);
    if (_.y < i || _.y > d || _.x > t) {
      return -1;
    }
    var f = o.x + (e.x - o.x) / (e.y - o.y) * (_.y - o.y);
    if (f > _.x) {
      return 0;
    } else if (f == _.x) {
      return 1;
    } else {
      return -1;
    }
  };
  o.prototype.playAnimation = function (_, o, e) {
    if (e === undefined) {
      e = true;
    }
    var t = o;
    var i = _.getChildByName("spine");
    h.default.playSpineCallBack(i, t, true);
  };
  o.prototype.getDirectionByAngle = function (_) {
    var o = n.up;
    switch (_) {
      case 0:
      case -180:
        o = n.up;
        break;
      case 180:
        o = n.down;
        break;
      case 90:
      case -270:
        o = n.left;
        break;
      case 270:
      case -90:
        o = n.right;
        break;
      case 45:
        o = n.leftUp;
        break;
      case 135:
        o = n.leftDown;
        break;
      case 225:
        o = n.rightDown;
        break;
      case 315:
        o = n.rightUp;
    }
    return o;
  };
  o.prototype.getMapOffset = function (_) {
    var o = cc.v2();
    switch (_) {
      case n.up:
        o = cc.v2(-1, 0);
        break;
      case n.down:
        o = cc.v2(1, 0);
        break;
      case n.left:
        o = cc.v2(0, -1);
        break;
      case n.right:
        o = cc.v2(0, 1);
        break;
      case n.leftUp:
        o = cc.v2(-1, -1);
        break;
      case n.leftDown:
        o = cc.v2(1, -1);
        break;
      case n.rightDown:
        o = cc.v2(1, 1);
        break;
      case n.rightUp:
        o = cc.v2(-1, 1);
    }
    return o;
  };
  o.prototype.testLabel = function (_, o) {
    if (this.isDebug) {
      o = this.getStr(_);
      var e = _.getChildByName("labelNode");
      if (!e) {
        (e = new cc.Node()).name = "labelNode";
        e.parent = _;
        e.position = cc.v2();
        e.position = h.default.convertPosition(_, e);
        e.y -= 20;
      }
      e.color = cc.Color.BLACK;
      var t = e.getComponent(cc.Label);
      if (!t) {
        t = e.addComponent(cc.Label);
      }
      t.fontSize = 10;
      t.string = o;
      _.labelNode = e;
    }
  };
  o.prototype.updateTestLabel = function (_, o) {
    if (this.isDebug) {
      o = this.getStr(_);
      var e = _.labelNode;
      e.getComponent(cc.Label).string = o;
      e.position = h.default.convertPosition(_, e);
      e.y -= 20;
    }
  };
  o.prototype.getStr = function (_) {
    var o = _[this.m_data].headMp.x;
    var e = _[this.m_data].headMp.y;
    if (_[this.m_data].bodyMp.length != 0) {
      return o + "_" + e + "/" + _[this.m_data].bodyMp[0].x + "_" + _[this.m_data].bodyMp[0].y;
    }
  };
  o.prototype.optimizeSize = function (_) {
    for (var o = this.gridLayer.children[0], e = [o.width, o.height], t = e[0], i = e[1], d = [0, 0], f = d[0], m = d[1], n = 1; n < 10; n++) {
      if (_.width < n * t + 10 && f == 0) {
        f = n;
      }
      if (_.height < n * i + 10 && m == 0) {
        m = n;
      }
      if (f != 0 && m != 0) {
        return {
          width: f * t,
          height: m * i
        };
      }
    }
    return null;
  };
  o.prototype.initData = function (_) {
    var o = this;
    if (this.levelConfig) {
      this.levelConfig = null;
    }
    this.levelConfig = _ || JSON.parse(JSON.stringify(p.f31313Config[this.levelID]));
    this.gridLayer.children.forEach(function (_) {
      return _[o.m_isEmpty] = true;
    });
    b.forEach(function (_) {
      var e = Number(_.x);
      var t = Number(_.y);
      o.gridPosList.push(cc.v2(e, t));
    });
    this.gridPosList.forEach(function () {});
    this.mapData = this.make2DArray(this.rows, this.cols, 100);
  };
  o.prototype.make2DArray = function (_, o, e) {
    if (e === undefined) {
      e = 0;
    }
    for (var t = [], i = 0; i < _; i++) {
      t[i] = new Array(o);
      for (var d = 0; d < o; d++) {
        t[i][d] = e;
      }
    }
    return t;
  };
  o.prototype.ijToIndex = function (_) {
    return _.x * this.cols + _.y;
  };
  o.prototype.initGridLayer = function (_) {
    for (var o = 0; o < _.length; o++) {
      for (var e = 0; e < _[o].length; e++) {
        cc.instantiate(this.gridLayer.children[0]).parent = this.gridLayer;
      }
    }
    this.gridLayer.active = true;
    this.gridLayer.getComponent(cc.Layout).updateLayout();
  };
  o.prototype.isInRange = function (_) {
    return _.x >= 0 && _.x < this.rows && _.y >= 0 && _.y < this.cols;
  };
  o.prototype.goOut = function (_) {
    var o = this;
    var e = _[this.m_data];
    if (!e.isFinish) {
      e.isFinish = true;
      var t = this.getGameOffset(e.dir).mul(500);
      var i = t.mag() / this.speed;
      cc.tween(_).by(i, {
        position: t
      }).call(function () {
        _.active = false;
        o.deleteFromArray(_, o.runningList);
      }).start();
      this.updateProgress();
      this.checkIsWin();
    }
  };
  o.prototype.getGameOffset = function (_) {
    var o = cc.v2();
    switch (_) {
      case n.up:
        o = cc.v2(0, 1);
        break;
      case n.down:
        o = cc.v2(0, -1);
        break;
      case n.left:
        o = cc.v2(-1, 0);
        break;
      case n.right:
        o = cc.v2(1, 0);
        break;
      case n.leftUp:
        o = cc.v2(-1, 1);
        break;
      case n.leftDown:
        o = cc.v2(-1, -1);
        break;
      case n.rightDown:
        o = cc.v2(1, -1);
        break;
      case n.rightUp:
        o = cc.v2(1, 1);
    }
    return o;
  };
  o.prototype.move = function (_, o, e) {
    var t = this;
    var i = o[e - 1];
    var d = this.ijToIndex(i);
    var f = this.gridPosList[d];
    if (e >= o.length) {
      if (this.isOnTheEdge(i)) {
        this.goOut(_);
      } else {
        this.checkFaceItem(_, f);
      }
      this.hideMoveEffect(_);
      return void this.checkIsFail();
    }
    var m = o[e];
    var n = this.ijToIndex(m);
    var r = this.gridPosList[n].sub(f);
    var a = r.mag() / this.speed;
    if (_[this.m_tween]) {
      _[this.m_tween].stop();
      _[this.m_tween] = null;
    }
    this.playMoveEffect(f);
    _[this.m_tween] = cc.tween(_).by(a, {
      position: r
    }).call(function () {
      var i = t.getFood(m);
      if (i) {
        t.playLevelSound("eat");
        t.eatFood(i);
      }
      e += 1;
      t.move(_, o, e);
    }).start();
  };
  o.prototype.getFood = function (_) {
    var o = this;
    var e = this.ijToIndex(_);
    return this.foodLayer.children.find(function (_) {
      return _[o.m_gridIndex] == e;
    });
  };
  o.prototype.eatFood = function (_) {
    var o = this.dict.guojiang;
    var e = cc.instantiate(o);
    e.parent = this.effectLayer;
    e.position = h.default.convertPosition(_, e);
    e.zIndex = 10;
    var t = _[this.m_value] - 200;
    this.scheduleOnce(function () {
      var _ = e.getComponent(sp.Skeleton);
      _.setSkin("skin" + t);
      h.default.playSpineCallBack(_, "animation", false, function () {
        e.removeFromParent(true);
      });
    });
    _.active = false;
    _.removeFromParent(true);
  };
  o.prototype.getAngle = function (_, o) {
    return 180 * Math.atan2(o.y - _.y, o.x - _.x) / Math.PI + 90;
  };
  o.prototype.checkIsWin = function () {
    if (this.state != f.over) {
      for (var _ = true, o = 0; o < this.itemLayer.children.length; o++) {
        var e = this.itemLayer.children[o][this.m_data];
        if (e && !e.isFinish) {
          _ = false;
          break;
        }
      }
      if (_) {
        this.state = f.checkWin;
        cc.log("suc");
        this.suc();
      } else {
        this.state = f.waitTouch;
      }
    }
  };
  o.prototype.checkIsFail = function () {
    var _ = this.getUnFinishNode();
    if (_.length) {
      for (var o = [], e = 0; e < _.length; e++) {
        var t = _[e];
        if (this.getMovePath(t).length == 0) {
          o.push(t);
        }
      }
      cc.log("temp.length", o.length, _.length);
      if (o.length >= _.length) {
        this.fail(2);
      }
    } else {
      this.checkIsWin();
    }
  };
  o.prototype.getUnFinishNode = function () {
    var _ = this;
    return this.itemLayer.children.filter(function (o) {
      return !o[_.m_data].isFinish && !o.isGoOut;
    });
  };
  o.prototype.suc = function (_) {
    var o = this;
    if (_ === undefined) {
      _ = 1;
    }
    if (!this.isEditor) {
      if (this.state != f.over) {
        this.state = f.over;
        this.scheduleOnce(function () {
          o.playRight(null, 1);
          o.unscheduleAllCallbacks();
          h.default.clearObj();
        }, _);
      }
    }
  };
  o.prototype.fail = function (_, o) {
    var e = this;
    if (_ === undefined) {
      _ = 0;
    }
    if (o === undefined) {
      o = null;
    }
    if (this.state != f.over) {
      this.state = f.over;
      this.scheduleOnce(function () {
        e.lose(null, false, function () {
          cc.log("levelReviveHelper");
          u.default.levelFailEvent("是否需要复活", function () {
            e.func_revive();
          });
        });
      }, _);
      cc.log("fail");
    }
  };
  o.prototype.lose = function (_, o, e, t) {
    if (o === undefined) {
      o = true;
    }
    if (t === undefined) {
      t = 1;
    }
    if (_) {
      if (_ instanceof cc.Node) {
        var i = cc.instantiate(_);
        i.x += 70;
        i.y -= 70;
        i.parent = _.parent;
        i.active = false;
        if (o) {
          this.playError(i);
        } else {
          this.playErrorOnce(i);
        }
        i.destroy();
      } else if (o) {
        this.playError(_);
      } else {
        this.playErrorOnce(_);
      }
    } else if (o) {
      this.playError();
    } else {
      this.playErrorOnce();
    }
    this.scheduleOnce(function () {
      if (e) {
        e();
      }
    }, t);
  };
  o.prototype.func_revive = function () {
    this.state = f.waitTouch;
    this.isEnd = false;
  };
  o.prototype.onLevelReady = function () {
    this.init();
  };
  o.prototype.enterKeyInput = function (_) {
    switch (_.keyCode) {
      case cc.macro.KEY.r:
        cc.log("复活");
        this.func_revive();
        break;
      case cc.macro.KEY.a:
        cc.log("canMoveFinishNow");
        this.canMoveFinishNow();
    }
  };
  o.prototype.onDisable = function () {
    cc.director.getCollisionManager().enabled = false;
    cc.director.getCollisionManager().enabledDebugDraw = false;
    cc.director.getPhysicsManager().enabled = false;
    cc.director.getPhysicsManager().debugDrawFlags = 0;
    this.unscheduleAllCallbacks();
    h.default.clearObj();
  };
  return d([g], o);
}(l.default);
exports.default = x;
var b = [{
  x: "-758",
  y: "756"
}, {
  x: "-704",
  y: "756"
}, {
  x: "-650",
  y: "756"
}, {
  x: "-596",
  y: "756"
}, {
  x: "-542",
  y: "756"
}, {
  x: "-488",
  y: "756"
}, {
  x: "-434",
  y: "756"
}, {
  x: "-380",
  y: "756"
}, {
  x: "-326",
  y: "756"
}, {
  x: "-272",
  y: "756"
}, {
  x: "-218",
  y: "756"
}, {
  x: "-164",
  y: "756"
}, {
  x: "-110",
  y: "756"
}, {
  x: "-56",
  y: "756"
}, {
  x: "-2",
  y: "756"
}, {
  x: "52",
  y: "756"
}, {
  x: "106",
  y: "756"
}, {
  x: "160",
  y: "756"
}, {
  x: "214",
  y: "756"
}, {
  x: "268",
  y: "756"
}, {
  x: "322",
  y: "756"
}, {
  x: "376",
  y: "756"
}, {
  x: "430",
  y: "756"
}, {
  x: "484",
  y: "756"
}, {
  x: "538",
  y: "756"
}, {
  x: "592",
  y: "756"
}, {
  x: "646",
  y: "756"
}, {
  x: "700",
  y: "756"
}, {
  x: "754",
  y: "756"
}, {
  x: "-758",
  y: "702"
}, {
  x: "-704",
  y: "702"
}, {
  x: "-650",
  y: "702"
}, {
  x: "-596",
  y: "702"
}, {
  x: "-542",
  y: "702"
}, {
  x: "-488",
  y: "702"
}, {
  x: "-434",
  y: "702"
}, {
  x: "-380",
  y: "702"
}, {
  x: "-326",
  y: "702"
}, {
  x: "-272",
  y: "702"
}, {
  x: "-218",
  y: "702"
}, {
  x: "-164",
  y: "702"
}, {
  x: "-110",
  y: "702"
}, {
  x: "-56",
  y: "702"
}, {
  x: "-2",
  y: "702"
}, {
  x: "52",
  y: "702"
}, {
  x: "106",
  y: "702"
}, {
  x: "160",
  y: "702"
}, {
  x: "214",
  y: "702"
}, {
  x: "268",
  y: "702"
}, {
  x: "322",
  y: "702"
}, {
  x: "376",
  y: "702"
}, {
  x: "430",
  y: "702"
}, {
  x: "484",
  y: "702"
}, {
  x: "538",
  y: "702"
}, {
  x: "592",
  y: "702"
}, {
  x: "646",
  y: "702"
}, {
  x: "700",
  y: "702"
}, {
  x: "754",
  y: "702"
}, {
  x: "-758",
  y: "648"
}, {
  x: "-704",
  y: "648"
}, {
  x: "-650",
  y: "648"
}, {
  x: "-596",
  y: "648"
}, {
  x: "-542",
  y: "648"
}, {
  x: "-488",
  y: "648"
}, {
  x: "-434",
  y: "648"
}, {
  x: "-380",
  y: "648"
}, {
  x: "-326",
  y: "648"
}, {
  x: "-272",
  y: "648"
}, {
  x: "-218",
  y: "648"
}, {
  x: "-164",
  y: "648"
}, {
  x: "-110",
  y: "648"
}, {
  x: "-56",
  y: "648"
}, {
  x: "-2",
  y: "648"
}, {
  x: "52",
  y: "648"
}, {
  x: "106",
  y: "648"
}, {
  x: "160",
  y: "648"
}, {
  x: "214",
  y: "648"
}, {
  x: "268",
  y: "648"
}, {
  x: "322",
  y: "648"
}, {
  x: "376",
  y: "648"
}, {
  x: "430",
  y: "648"
}, {
  x: "484",
  y: "648"
}, {
  x: "538",
  y: "648"
}, {
  x: "592",
  y: "648"
}, {
  x: "646",
  y: "648"
}, {
  x: "700",
  y: "648"
}, {
  x: "754",
  y: "648"
}, {
  x: "-758",
  y: "594"
}, {
  x: "-704",
  y: "594"
}, {
  x: "-650",
  y: "594"
}, {
  x: "-596",
  y: "594"
}, {
  x: "-542",
  y: "594"
}, {
  x: "-488",
  y: "594"
}, {
  x: "-434",
  y: "594"
}, {
  x: "-380",
  y: "594"
}, {
  x: "-326",
  y: "594"
}, {
  x: "-272",
  y: "594"
}, {
  x: "-218",
  y: "594"
}, {
  x: "-164",
  y: "594"
}, {
  x: "-110",
  y: "594"
}, {
  x: "-56",
  y: "594"
}, {
  x: "-2",
  y: "594"
}, {
  x: "52",
  y: "594"
}, {
  x: "106",
  y: "594"
}, {
  x: "160",
  y: "594"
}, {
  x: "214",
  y: "594"
}, {
  x: "268",
  y: "594"
}, {
  x: "322",
  y: "594"
}, {
  x: "376",
  y: "594"
}, {
  x: "430",
  y: "594"
}, {
  x: "484",
  y: "594"
}, {
  x: "538",
  y: "594"
}, {
  x: "592",
  y: "594"
}, {
  x: "646",
  y: "594"
}, {
  x: "700",
  y: "594"
}, {
  x: "754",
  y: "594"
}, {
  x: "-758",
  y: "540"
}, {
  x: "-704",
  y: "540"
}, {
  x: "-650",
  y: "540"
}, {
  x: "-596",
  y: "540"
}, {
  x: "-542",
  y: "540"
}, {
  x: "-488",
  y: "540"
}, {
  x: "-434",
  y: "540"
}, {
  x: "-380",
  y: "540"
}, {
  x: "-326",
  y: "540"
}, {
  x: "-272",
  y: "540"
}, {
  x: "-218",
  y: "540"
}, {
  x: "-164",
  y: "540"
}, {
  x: "-110",
  y: "540"
}, {
  x: "-56",
  y: "540"
}, {
  x: "-2",
  y: "540"
}, {
  x: "52",
  y: "540"
}, {
  x: "106",
  y: "540"
}, {
  x: "160",
  y: "540"
}, {
  x: "214",
  y: "540"
}, {
  x: "268",
  y: "540"
}, {
  x: "322",
  y: "540"
}, {
  x: "376",
  y: "540"
}, {
  x: "430",
  y: "540"
}, {
  x: "484",
  y: "540"
}, {
  x: "538",
  y: "540"
}, {
  x: "592",
  y: "540"
}, {
  x: "646",
  y: "540"
}, {
  x: "700",
  y: "540"
}, {
  x: "754",
  y: "540"
}, {
  x: "-758",
  y: "486"
}, {
  x: "-704",
  y: "486"
}, {
  x: "-650",
  y: "486"
}, {
  x: "-596",
  y: "486"
}, {
  x: "-542",
  y: "486"
}, {
  x: "-488",
  y: "486"
}, {
  x: "-434",
  y: "486"
}, {
  x: "-380",
  y: "486"
}, {
  x: "-326",
  y: "486"
}, {
  x: "-272",
  y: "486"
}, {
  x: "-218",
  y: "486"
}, {
  x: "-164",
  y: "486"
}, {
  x: "-110",
  y: "486"
}, {
  x: "-56",
  y: "486"
}, {
  x: "-2",
  y: "486"
}, {
  x: "52",
  y: "486"
}, {
  x: "106",
  y: "486"
}, {
  x: "160",
  y: "486"
}, {
  x: "214",
  y: "486"
}, {
  x: "268",
  y: "486"
}, {
  x: "322",
  y: "486"
}, {
  x: "376",
  y: "486"
}, {
  x: "430",
  y: "486"
}, {
  x: "484",
  y: "486"
}, {
  x: "538",
  y: "486"
}, {
  x: "592",
  y: "486"
}, {
  x: "646",
  y: "486"
}, {
  x: "700",
  y: "486"
}, {
  x: "754",
  y: "486"
}, {
  x: "-758",
  y: "432"
}, {
  x: "-704",
  y: "432"
}, {
  x: "-650",
  y: "432"
}, {
  x: "-596",
  y: "432"
}, {
  x: "-542",
  y: "432"
}, {
  x: "-488",
  y: "432"
}, {
  x: "-434",
  y: "432"
}, {
  x: "-380",
  y: "432"
}, {
  x: "-326",
  y: "432"
}, {
  x: "-272",
  y: "432"
}, {
  x: "-218",
  y: "432"
}, {
  x: "-164",
  y: "432"
}, {
  x: "-110",
  y: "432"
}, {
  x: "-56",
  y: "432"
}, {
  x: "-2",
  y: "432"
}, {
  x: "52",
  y: "432"
}, {
  x: "106",
  y: "432"
}, {
  x: "160",
  y: "432"
}, {
  x: "214",
  y: "432"
}, {
  x: "268",
  y: "432"
}, {
  x: "322",
  y: "432"
}, {
  x: "376",
  y: "432"
}, {
  x: "430",
  y: "432"
}, {
  x: "484",
  y: "432"
}, {
  x: "538",
  y: "432"
}, {
  x: "592",
  y: "432"
}, {
  x: "646",
  y: "432"
}, {
  x: "700",
  y: "432"
}, {
  x: "754",
  y: "432"
}, {
  x: "-758",
  y: "378"
}, {
  x: "-704",
  y: "378"
}, {
  x: "-650",
  y: "378"
}, {
  x: "-596",
  y: "378"
}, {
  x: "-542",
  y: "378"
}, {
  x: "-488",
  y: "378"
}, {
  x: "-434",
  y: "378"
}, {
  x: "-380",
  y: "378"
}, {
  x: "-326",
  y: "378"
}, {
  x: "-272",
  y: "378"
}, {
  x: "-218",
  y: "378"
}, {
  x: "-164",
  y: "378"
}, {
  x: "-110",
  y: "378"
}, {
  x: "-56",
  y: "378"
}, {
  x: "-2",
  y: "378"
}, {
  x: "52",
  y: "378"
}, {
  x: "106",
  y: "378"
}, {
  x: "160",
  y: "378"
}, {
  x: "214",
  y: "378"
}, {
  x: "268",
  y: "378"
}, {
  x: "322",
  y: "378"
}, {
  x: "376",
  y: "378"
}, {
  x: "430",
  y: "378"
}, {
  x: "484",
  y: "378"
}, {
  x: "538",
  y: "378"
}, {
  x: "592",
  y: "378"
}, {
  x: "646",
  y: "378"
}, {
  x: "700",
  y: "378"
}, {
  x: "754",
  y: "378"
}, {
  x: "-758",
  y: "324"
}, {
  x: "-704",
  y: "324"
}, {
  x: "-650",
  y: "324"
}, {
  x: "-596",
  y: "324"
}, {
  x: "-542",
  y: "324"
}, {
  x: "-488",
  y: "324"
}, {
  x: "-434",
  y: "324"
}, {
  x: "-380",
  y: "324"
}, {
  x: "-326",
  y: "324"
}, {
  x: "-272",
  y: "324"
}, {
  x: "-218",
  y: "324"
}, {
  x: "-164",
  y: "324"
}, {
  x: "-110",
  y: "324"
}, {
  x: "-56",
  y: "324"
}, {
  x: "-2",
  y: "324"
}, {
  x: "52",
  y: "324"
}, {
  x: "106",
  y: "324"
}, {
  x: "160",
  y: "324"
}, {
  x: "214",
  y: "324"
}, {
  x: "268",
  y: "324"
}, {
  x: "322",
  y: "324"
}, {
  x: "376",
  y: "324"
}, {
  x: "430",
  y: "324"
}, {
  x: "484",
  y: "324"
}, {
  x: "538",
  y: "324"
}, {
  x: "592",
  y: "324"
}, {
  x: "646",
  y: "324"
}, {
  x: "700",
  y: "324"
}, {
  x: "754",
  y: "324"
}, {
  x: "-758",
  y: "270"
}, {
  x: "-704",
  y: "270"
}, {
  x: "-650",
  y: "270"
}, {
  x: "-596",
  y: "270"
}, {
  x: "-542",
  y: "270"
}, {
  x: "-488",
  y: "270"
}, {
  x: "-434",
  y: "270"
}, {
  x: "-380",
  y: "270"
}, {
  x: "-326",
  y: "270"
}, {
  x: "-272",
  y: "270"
}, {
  x: "-218",
  y: "270"
}, {
  x: "-164",
  y: "270"
}, {
  x: "-110",
  y: "270"
}, {
  x: "-56",
  y: "270"
}, {
  x: "-2",
  y: "270"
}, {
  x: "52",
  y: "270"
}, {
  x: "106",
  y: "270"
}, {
  x: "160",
  y: "270"
}, {
  x: "214",
  y: "270"
}, {
  x: "268",
  y: "270"
}, {
  x: "322",
  y: "270"
}, {
  x: "376",
  y: "270"
}, {
  x: "430",
  y: "270"
}, {
  x: "484",
  y: "270"
}, {
  x: "538",
  y: "270"
}, {
  x: "592",
  y: "270"
}, {
  x: "646",
  y: "270"
}, {
  x: "700",
  y: "270"
}, {
  x: "754",
  y: "270"
}, {
  x: "-758",
  y: "216"
}, {
  x: "-704",
  y: "216"
}, {
  x: "-650",
  y: "216"
}, {
  x: "-596",
  y: "216"
}, {
  x: "-542",
  y: "216"
}, {
  x: "-488",
  y: "216"
}, {
  x: "-434",
  y: "216"
}, {
  x: "-380",
  y: "216"
}, {
  x: "-326",
  y: "216"
}, {
  x: "-272",
  y: "216"
}, {
  x: "-218",
  y: "216"
}, {
  x: "-164",
  y: "216"
}, {
  x: "-110",
  y: "216"
}, {
  x: "-56",
  y: "216"
}, {
  x: "-2",
  y: "216"
}, {
  x: "52",
  y: "216"
}, {
  x: "106",
  y: "216"
}, {
  x: "160",
  y: "216"
}, {
  x: "214",
  y: "216"
}, {
  x: "268",
  y: "216"
}, {
  x: "322",
  y: "216"
}, {
  x: "376",
  y: "216"
}, {
  x: "430",
  y: "216"
}, {
  x: "484",
  y: "216"
}, {
  x: "538",
  y: "216"
}, {
  x: "592",
  y: "216"
}, {
  x: "646",
  y: "216"
}, {
  x: "700",
  y: "216"
}, {
  x: "754",
  y: "216"
}, {
  x: "-758",
  y: "162"
}, {
  x: "-704",
  y: "162"
}, {
  x: "-650",
  y: "162"
}, {
  x: "-596",
  y: "162"
}, {
  x: "-542",
  y: "162"
}, {
  x: "-488",
  y: "162"
}, {
  x: "-434",
  y: "162"
}, {
  x: "-380",
  y: "162"
}, {
  x: "-326",
  y: "162"
}, {
  x: "-272",
  y: "162"
}, {
  x: "-218",
  y: "162"
}, {
  x: "-164",
  y: "162"
}, {
  x: "-110",
  y: "162"
}, {
  x: "-56",
  y: "162"
}, {
  x: "-2",
  y: "162"
}, {
  x: "52",
  y: "162"
}, {
  x: "106",
  y: "162"
}, {
  x: "160",
  y: "162"
}, {
  x: "214",
  y: "162"
}, {
  x: "268",
  y: "162"
}, {
  x: "322",
  y: "162"
}, {
  x: "376",
  y: "162"
}, {
  x: "430",
  y: "162"
}, {
  x: "484",
  y: "162"
}, {
  x: "538",
  y: "162"
}, {
  x: "592",
  y: "162"
}, {
  x: "646",
  y: "162"
}, {
  x: "700",
  y: "162"
}, {
  x: "754",
  y: "162"
}, {
  x: "-758",
  y: "108"
}, {
  x: "-704",
  y: "108"
}, {
  x: "-650",
  y: "108"
}, {
  x: "-596",
  y: "108"
}, {
  x: "-542",
  y: "108"
}, {
  x: "-488",
  y: "108"
}, {
  x: "-434",
  y: "108"
}, {
  x: "-380",
  y: "108"
}, {
  x: "-326",
  y: "108"
}, {
  x: "-272",
  y: "108"
}, {
  x: "-218",
  y: "108"
}, {
  x: "-164",
  y: "108"
}, {
  x: "-110",
  y: "108"
}, {
  x: "-56",
  y: "108"
}, {
  x: "-2",
  y: "108"
}, {
  x: "52",
  y: "108"
}, {
  x: "106",
  y: "108"
}, {
  x: "160",
  y: "108"
}, {
  x: "214",
  y: "108"
}, {
  x: "268",
  y: "108"
}, {
  x: "322",
  y: "108"
}, {
  x: "376",
  y: "108"
}, {
  x: "430",
  y: "108"
}, {
  x: "484",
  y: "108"
}, {
  x: "538",
  y: "108"
}, {
  x: "592",
  y: "108"
}, {
  x: "646",
  y: "108"
}, {
  x: "700",
  y: "108"
}, {
  x: "754",
  y: "108"
}, {
  x: "-758",
  y: "54"
}, {
  x: "-704",
  y: "54"
}, {
  x: "-650",
  y: "54"
}, {
  x: "-596",
  y: "54"
}, {
  x: "-542",
  y: "54"
}, {
  x: "-488",
  y: "54"
}, {
  x: "-434",
  y: "54"
}, {
  x: "-380",
  y: "54"
}, {
  x: "-326",
  y: "54"
}, {
  x: "-272",
  y: "54"
}, {
  x: "-218",
  y: "54"
}, {
  x: "-164",
  y: "54"
}, {
  x: "-110",
  y: "54"
}, {
  x: "-56",
  y: "54"
}, {
  x: "-2",
  y: "54"
}, {
  x: "52",
  y: "54"
}, {
  x: "106",
  y: "54"
}, {
  x: "160",
  y: "54"
}, {
  x: "214",
  y: "54"
}, {
  x: "268",
  y: "54"
}, {
  x: "322",
  y: "54"
}, {
  x: "376",
  y: "54"
}, {
  x: "430",
  y: "54"
}, {
  x: "484",
  y: "54"
}, {
  x: "538",
  y: "54"
}, {
  x: "592",
  y: "54"
}, {
  x: "646",
  y: "54"
}, {
  x: "700",
  y: "54"
}, {
  x: "754",
  y: "54"
}, {
  x: "-758",
  y: "0"
}, {
  x: "-704",
  y: "0"
}, {
  x: "-650",
  y: "0"
}, {
  x: "-596",
  y: "0"
}, {
  x: "-542",
  y: "0"
}, {
  x: "-488",
  y: "0"
}, {
  x: "-434",
  y: "0"
}, {
  x: "-380",
  y: "0"
}, {
  x: "-326",
  y: "0"
}, {
  x: "-272",
  y: "0"
}, {
  x: "-218",
  y: "0"
}, {
  x: "-164",
  y: "0"
}, {
  x: "-110",
  y: "0"
}, {
  x: "-56",
  y: "0"
}, {
  x: "-2",
  y: "0"
}, {
  x: "52",
  y: "0"
}, {
  x: "106",
  y: "0"
}, {
  x: "160",
  y: "0"
}, {
  x: "214",
  y: "0"
}, {
  x: "268",
  y: "0"
}, {
  x: "322",
  y: "0"
}, {
  x: "376",
  y: "0"
}, {
  x: "430",
  y: "0"
}, {
  x: "484",
  y: "0"
}, {
  x: "538",
  y: "0"
}, {
  x: "592",
  y: "0"
}, {
  x: "646",
  y: "0"
}, {
  x: "700",
  y: "0"
}, {
  x: "754",
  y: "0"
}, {
  x: "-758",
  y: "-54"
}, {
  x: "-704",
  y: "-54"
}, {
  x: "-650",
  y: "-54"
}, {
  x: "-596",
  y: "-54"
}, {
  x: "-542",
  y: "-54"
}, {
  x: "-488",
  y: "-54"
}, {
  x: "-434",
  y: "-54"
}, {
  x: "-380",
  y: "-54"
}, {
  x: "-326",
  y: "-54"
}, {
  x: "-272",
  y: "-54"
}, {
  x: "-218",
  y: "-54"
}, {
  x: "-164",
  y: "-54"
}, {
  x: "-110",
  y: "-54"
}, {
  x: "-56",
  y: "-54"
}, {
  x: "-2",
  y: "-54"
}, {
  x: "52",
  y: "-54"
}, {
  x: "106",
  y: "-54"
}, {
  x: "160",
  y: "-54"
}, {
  x: "214",
  y: "-54"
}, {
  x: "268",
  y: "-54"
}, {
  x: "322",
  y: "-54"
}, {
  x: "376",
  y: "-54"
}, {
  x: "430",
  y: "-54"
}, {
  x: "484",
  y: "-54"
}, {
  x: "538",
  y: "-54"
}, {
  x: "592",
  y: "-54"
}, {
  x: "646",
  y: "-54"
}, {
  x: "700",
  y: "-54"
}, {
  x: "754",
  y: "-54"
}, {
  x: "-758",
  y: "-108"
}, {
  x: "-704",
  y: "-108"
}, {
  x: "-650",
  y: "-108"
}, {
  x: "-596",
  y: "-108"
}, {
  x: "-542",
  y: "-108"
}, {
  x: "-488",
  y: "-108"
}, {
  x: "-434",
  y: "-108"
}, {
  x: "-380",
  y: "-108"
}, {
  x: "-326",
  y: "-108"
}, {
  x: "-272",
  y: "-108"
}, {
  x: "-218",
  y: "-108"
}, {
  x: "-164",
  y: "-108"
}, {
  x: "-110",
  y: "-108"
}, {
  x: "-56",
  y: "-108"
}, {
  x: "-2",
  y: "-108"
}, {
  x: "52",
  y: "-108"
}, {
  x: "106",
  y: "-108"
}, {
  x: "160",
  y: "-108"
}, {
  x: "214",
  y: "-108"
}, {
  x: "268",
  y: "-108"
}, {
  x: "322",
  y: "-108"
}, {
  x: "376",
  y: "-108"
}, {
  x: "430",
  y: "-108"
}, {
  x: "484",
  y: "-108"
}, {
  x: "538",
  y: "-108"
}, {
  x: "592",
  y: "-108"
}, {
  x: "646",
  y: "-108"
}, {
  x: "700",
  y: "-108"
}, {
  x: "754",
  y: "-108"
}, {
  x: "-758",
  y: "-162"
}, {
  x: "-704",
  y: "-162"
}, {
  x: "-650",
  y: "-162"
}, {
  x: "-596",
  y: "-162"
}, {
  x: "-542",
  y: "-162"
}, {
  x: "-488",
  y: "-162"
}, {
  x: "-434",
  y: "-162"
}, {
  x: "-380",
  y: "-162"
}, {
  x: "-326",
  y: "-162"
}, {
  x: "-272",
  y: "-162"
}, {
  x: "-218",
  y: "-162"
}, {
  x: "-164",
  y: "-162"
}, {
  x: "-110",
  y: "-162"
}, {
  x: "-56",
  y: "-162"
}, {
  x: "-2",
  y: "-162"
}, {
  x: "52",
  y: "-162"
}, {
  x: "106",
  y: "-162"
}, {
  x: "160",
  y: "-162"
}, {
  x: "214",
  y: "-162"
}, {
  x: "268",
  y: "-162"
}, {
  x: "322",
  y: "-162"
}, {
  x: "376",
  y: "-162"
}, {
  x: "430",
  y: "-162"
}, {
  x: "484",
  y: "-162"
}, {
  x: "538",
  y: "-162"
}, {
  x: "592",
  y: "-162"
}, {
  x: "646",
  y: "-162"
}, {
  x: "700",
  y: "-162"
}, {
  x: "754",
  y: "-162"
}, {
  x: "-758",
  y: "-216"
}, {
  x: "-704",
  y: "-216"
}, {
  x: "-650",
  y: "-216"
}, {
  x: "-596",
  y: "-216"
}, {
  x: "-542",
  y: "-216"
}, {
  x: "-488",
  y: "-216"
}, {
  x: "-434",
  y: "-216"
}, {
  x: "-380",
  y: "-216"
}, {
  x: "-326",
  y: "-216"
}, {
  x: "-272",
  y: "-216"
}, {
  x: "-218",
  y: "-216"
}, {
  x: "-164",
  y: "-216"
}, {
  x: "-110",
  y: "-216"
}, {
  x: "-56",
  y: "-216"
}, {
  x: "-2",
  y: "-216"
}, {
  x: "52",
  y: "-216"
}, {
  x: "106",
  y: "-216"
}, {
  x: "160",
  y: "-216"
}, {
  x: "214",
  y: "-216"
}, {
  x: "268",
  y: "-216"
}, {
  x: "322",
  y: "-216"
}, {
  x: "376",
  y: "-216"
}, {
  x: "430",
  y: "-216"
}, {
  x: "484",
  y: "-216"
}, {
  x: "538",
  y: "-216"
}, {
  x: "592",
  y: "-216"
}, {
  x: "646",
  y: "-216"
}, {
  x: "700",
  y: "-216"
}, {
  x: "754",
  y: "-216"
}, {
  x: "-758",
  y: "-270"
}, {
  x: "-704",
  y: "-270"
}, {
  x: "-650",
  y: "-270"
}, {
  x: "-596",
  y: "-270"
}, {
  x: "-542",
  y: "-270"
}, {
  x: "-488",
  y: "-270"
}, {
  x: "-434",
  y: "-270"
}, {
  x: "-380",
  y: "-270"
}, {
  x: "-326",
  y: "-270"
}, {
  x: "-272",
  y: "-270"
}, {
  x: "-218",
  y: "-270"
}, {
  x: "-164",
  y: "-270"
}, {
  x: "-110",
  y: "-270"
}, {
  x: "-56",
  y: "-270"
}, {
  x: "-2",
  y: "-270"
}, {
  x: "52",
  y: "-270"
}, {
  x: "106",
  y: "-270"
}, {
  x: "160",
  y: "-270"
}, {
  x: "214",
  y: "-270"
}, {
  x: "268",
  y: "-270"
}, {
  x: "322",
  y: "-270"
}, {
  x: "376",
  y: "-270"
}, {
  x: "430",
  y: "-270"
}, {
  x: "484",
  y: "-270"
}, {
  x: "538",
  y: "-270"
}, {
  x: "592",
  y: "-270"
}, {
  x: "646",
  y: "-270"
}, {
  x: "700",
  y: "-270"
}, {
  x: "754",
  y: "-270"
}, {
  x: "-758",
  y: "-324"
}, {
  x: "-704",
  y: "-324"
}, {
  x: "-650",
  y: "-324"
}, {
  x: "-596",
  y: "-324"
}, {
  x: "-542",
  y: "-324"
}, {
  x: "-488",
  y: "-324"
}, {
  x: "-434",
  y: "-324"
}, {
  x: "-380",
  y: "-324"
}, {
  x: "-326",
  y: "-324"
}, {
  x: "-272",
  y: "-324"
}, {
  x: "-218",
  y: "-324"
}, {
  x: "-164",
  y: "-324"
}, {
  x: "-110",
  y: "-324"
}, {
  x: "-56",
  y: "-324"
}, {
  x: "-2",
  y: "-324"
}, {
  x: "52",
  y: "-324"
}, {
  x: "106",
  y: "-324"
}, {
  x: "160",
  y: "-324"
}, {
  x: "214",
  y: "-324"
}, {
  x: "268",
  y: "-324"
}, {
  x: "322",
  y: "-324"
}, {
  x: "376",
  y: "-324"
}, {
  x: "430",
  y: "-324"
}, {
  x: "484",
  y: "-324"
}, {
  x: "538",
  y: "-324"
}, {
  x: "592",
  y: "-324"
}, {
  x: "646",
  y: "-324"
}, {
  x: "700",
  y: "-324"
}, {
  x: "754",
  y: "-324"
}, {
  x: "-758",
  y: "-378"
}, {
  x: "-704",
  y: "-378"
}, {
  x: "-650",
  y: "-378"
}, {
  x: "-596",
  y: "-378"
}, {
  x: "-542",
  y: "-378"
}, {
  x: "-488",
  y: "-378"
}, {
  x: "-434",
  y: "-378"
}, {
  x: "-380",
  y: "-378"
}, {
  x: "-326",
  y: "-378"
}, {
  x: "-272",
  y: "-378"
}, {
  x: "-218",
  y: "-378"
}, {
  x: "-164",
  y: "-378"
}, {
  x: "-110",
  y: "-378"
}, {
  x: "-56",
  y: "-378"
}, {
  x: "-2",
  y: "-378"
}, {
  x: "52",
  y: "-378"
}, {
  x: "106",
  y: "-378"
}, {
  x: "160",
  y: "-378"
}, {
  x: "214",
  y: "-378"
}, {
  x: "268",
  y: "-378"
}, {
  x: "322",
  y: "-378"
}, {
  x: "376",
  y: "-378"
}, {
  x: "430",
  y: "-378"
}, {
  x: "484",
  y: "-378"
}, {
  x: "538",
  y: "-378"
}, {
  x: "592",
  y: "-378"
}, {
  x: "646",
  y: "-378"
}, {
  x: "700",
  y: "-378"
}, {
  x: "754",
  y: "-378"
}, {
  x: "-758",
  y: "-432"
}, {
  x: "-704",
  y: "-432"
}, {
  x: "-650",
  y: "-432"
}, {
  x: "-596",
  y: "-432"
}, {
  x: "-542",
  y: "-432"
}, {
  x: "-488",
  y: "-432"
}, {
  x: "-434",
  y: "-432"
}, {
  x: "-380",
  y: "-432"
}, {
  x: "-326",
  y: "-432"
}, {
  x: "-272",
  y: "-432"
}, {
  x: "-218",
  y: "-432"
}, {
  x: "-164",
  y: "-432"
}, {
  x: "-110",
  y: "-432"
}, {
  x: "-56",
  y: "-432"
}, {
  x: "-2",
  y: "-432"
}, {
  x: "52",
  y: "-432"
}, {
  x: "106",
  y: "-432"
}, {
  x: "160",
  y: "-432"
}, {
  x: "214",
  y: "-432"
}, {
  x: "268",
  y: "-432"
}, {
  x: "322",
  y: "-432"
}, {
  x: "376",
  y: "-432"
}, {
  x: "430",
  y: "-432"
}, {
  x: "484",
  y: "-432"
}, {
  x: "538",
  y: "-432"
}, {
  x: "592",
  y: "-432"
}, {
  x: "646",
  y: "-432"
}, {
  x: "700",
  y: "-432"
}, {
  x: "754",
  y: "-432"
}, {
  x: "-758",
  y: "-486"
}, {
  x: "-704",
  y: "-486"
}, {
  x: "-650",
  y: "-486"
}, {
  x: "-596",
  y: "-486"
}, {
  x: "-542",
  y: "-486"
}, {
  x: "-488",
  y: "-486"
}, {
  x: "-434",
  y: "-486"
}, {
  x: "-380",
  y: "-486"
}, {
  x: "-326",
  y: "-486"
}, {
  x: "-272",
  y: "-486"
}, {
  x: "-218",
  y: "-486"
}, {
  x: "-164",
  y: "-486"
}, {
  x: "-110",
  y: "-486"
}, {
  x: "-56",
  y: "-486"
}, {
  x: "-2",
  y: "-486"
}, {
  x: "52",
  y: "-486"
}, {
  x: "106",
  y: "-486"
}, {
  x: "160",
  y: "-486"
}, {
  x: "214",
  y: "-486"
}, {
  x: "268",
  y: "-486"
}, {
  x: "322",
  y: "-486"
}, {
  x: "376",
  y: "-486"
}, {
  x: "430",
  y: "-486"
}, {
  x: "484",
  y: "-486"
}, {
  x: "538",
  y: "-486"
}, {
  x: "592",
  y: "-486"
}, {
  x: "646",
  y: "-486"
}, {
  x: "700",
  y: "-486"
}, {
  x: "754",
  y: "-486"
}, {
  x: "-758",
  y: "-540"
}, {
  x: "-704",
  y: "-540"
}, {
  x: "-650",
  y: "-540"
}, {
  x: "-596",
  y: "-540"
}, {
  x: "-542",
  y: "-540"
}, {
  x: "-488",
  y: "-540"
}, {
  x: "-434",
  y: "-540"
}, {
  x: "-380",
  y: "-540"
}, {
  x: "-326",
  y: "-540"
}, {
  x: "-272",
  y: "-540"
}, {
  x: "-218",
  y: "-540"
}, {
  x: "-164",
  y: "-540"
}, {
  x: "-110",
  y: "-540"
}, {
  x: "-56",
  y: "-540"
}, {
  x: "-2",
  y: "-540"
}, {
  x: "52",
  y: "-540"
}, {
  x: "106",
  y: "-540"
}, {
  x: "160",
  y: "-540"
}, {
  x: "214",
  y: "-540"
}, {
  x: "268",
  y: "-540"
}, {
  x: "322",
  y: "-540"
}, {
  x: "376",
  y: "-540"
}, {
  x: "430",
  y: "-540"
}, {
  x: "484",
  y: "-540"
}, {
  x: "538",
  y: "-540"
}, {
  x: "592",
  y: "-540"
}, {
  x: "646",
  y: "-540"
}, {
  x: "700",
  y: "-540"
}, {
  x: "754",
  y: "-540"
}, {
  x: "-758",
  y: "-594"
}, {
  x: "-704",
  y: "-594"
}, {
  x: "-650",
  y: "-594"
}, {
  x: "-596",
  y: "-594"
}, {
  x: "-542",
  y: "-594"
}, {
  x: "-488",
  y: "-594"
}, {
  x: "-434",
  y: "-594"
}, {
  x: "-380",
  y: "-594"
}, {
  x: "-326",
  y: "-594"
}, {
  x: "-272",
  y: "-594"
}, {
  x: "-218",
  y: "-594"
}, {
  x: "-164",
  y: "-594"
}, {
  x: "-110",
  y: "-594"
}, {
  x: "-56",
  y: "-594"
}, {
  x: "-2",
  y: "-594"
}, {
  x: "52",
  y: "-594"
}, {
  x: "106",
  y: "-594"
}, {
  x: "160",
  y: "-594"
}, {
  x: "214",
  y: "-594"
}, {
  x: "268",
  y: "-594"
}, {
  x: "322",
  y: "-594"
}, {
  x: "376",
  y: "-594"
}, {
  x: "430",
  y: "-594"
}, {
  x: "484",
  y: "-594"
}, {
  x: "538",
  y: "-594"
}, {
  x: "592",
  y: "-594"
}, {
  x: "646",
  y: "-594"
}, {
  x: "700",
  y: "-594"
}, {
  x: "754",
  y: "-594"
}, {
  x: "-758",
  y: "-648"
}, {
  x: "-704",
  y: "-648"
}, {
  x: "-650",
  y: "-648"
}, {
  x: "-596",
  y: "-648"
}, {
  x: "-542",
  y: "-648"
}, {
  x: "-488",
  y: "-648"
}, {
  x: "-434",
  y: "-648"
}, {
  x: "-380",
  y: "-648"
}, {
  x: "-326",
  y: "-648"
}, {
  x: "-272",
  y: "-648"
}, {
  x: "-218",
  y: "-648"
}, {
  x: "-164",
  y: "-648"
}, {
  x: "-110",
  y: "-648"
}, {
  x: "-56",
  y: "-648"
}, {
  x: "-2",
  y: "-648"
}, {
  x: "52",
  y: "-648"
}, {
  x: "106",
  y: "-648"
}, {
  x: "160",
  y: "-648"
}, {
  x: "214",
  y: "-648"
}, {
  x: "268",
  y: "-648"
}, {
  x: "322",
  y: "-648"
}, {
  x: "376",
  y: "-648"
}, {
  x: "430",
  y: "-648"
}, {
  x: "484",
  y: "-648"
}, {
  x: "538",
  y: "-648"
}, {
  x: "592",
  y: "-648"
}, {
  x: "646",
  y: "-648"
}, {
  x: "700",
  y: "-648"
}, {
  x: "754",
  y: "-648"
}, {
  x: "-758",
  y: "-702"
}, {
  x: "-704",
  y: "-702"
}, {
  x: "-650",
  y: "-702"
}, {
  x: "-596",
  y: "-702"
}, {
  x: "-542",
  y: "-702"
}, {
  x: "-488",
  y: "-702"
}, {
  x: "-434",
  y: "-702"
}, {
  x: "-380",
  y: "-702"
}, {
  x: "-326",
  y: "-702"
}, {
  x: "-272",
  y: "-702"
}, {
  x: "-218",
  y: "-702"
}, {
  x: "-164",
  y: "-702"
}, {
  x: "-110",
  y: "-702"
}, {
  x: "-56",
  y: "-702"
}, {
  x: "-2",
  y: "-702"
}, {
  x: "52",
  y: "-702"
}, {
  x: "106",
  y: "-702"
}, {
  x: "160",
  y: "-702"
}, {
  x: "214",
  y: "-702"
}, {
  x: "268",
  y: "-702"
}, {
  x: "322",
  y: "-702"
}, {
  x: "376",
  y: "-702"
}, {
  x: "430",
  y: "-702"
}, {
  x: "484",
  y: "-702"
}, {
  x: "538",
  y: "-702"
}, {
  x: "592",
  y: "-702"
}, {
  x: "646",
  y: "-702"
}, {
  x: "700",
  y: "-702"
}, {
  x: "754",
  y: "-702"
}, {
  x: "-758",
  y: "-756"
}, {
  x: "-704",
  y: "-756"
}, {
  x: "-650",
  y: "-756"
}, {
  x: "-596",
  y: "-756"
}, {
  x: "-542",
  y: "-756"
}, {
  x: "-488",
  y: "-756"
}, {
  x: "-434",
  y: "-756"
}, {
  x: "-380",
  y: "-756"
}, {
  x: "-326",
  y: "-756"
}, {
  x: "-272",
  y: "-756"
}, {
  x: "-218",
  y: "-756"
}, {
  x: "-164",
  y: "-756"
}, {
  x: "-110",
  y: "-756"
}, {
  x: "-56",
  y: "-756"
}, {
  x: "-2",
  y: "-756"
}, {
  x: "52",
  y: "-756"
}, {
  x: "106",
  y: "-756"
}, {
  x: "160",
  y: "-756"
}, {
  x: "214",
  y: "-756"
}, {
  x: "268",
  y: "-756"
}, {
  x: "322",
  y: "-756"
}, {
  x: "376",
  y: "-756"
}, {
  x: "430",
  y: "-756"
}, {
  x: "484",
  y: "-756"
}, {
  x: "538",
  y: "-756"
}, {
  x: "592",
  y: "-756"
}, {
  x: "646",
  y: "-756"
}, {
  x: "700",
  y: "-756"
}, {
  x: "754",
  y: "-756"
}];