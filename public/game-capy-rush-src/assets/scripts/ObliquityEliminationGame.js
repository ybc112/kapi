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
var m = require("./LevelConstant");
var n = require("./ObliquityEliminationItem");
var r = [cc.v3(-7.6, 6.7), cc.v3(7.6, -6.7), cc.v3(-5.6, -4.7), cc.v3(5.6, 4.7)];
var a = cc._decorator;
var s = a.ccclass;
var c = a.property;
var l = function (_) {
  function o() {
    var o = _ !== null && _.apply(this, arguments) || this;
    o.levelConfig = "";
    o.item = null;
    o.item2 = null;
    o.itemSpriteFrames = [];
    o.item2SpriteFrames = [];
    o.blockTotal = null;
    o.poly = null;
    o.tx = null;
    o._panel = null;
    o._collection = null;
    o._staging = null;
    o._touchItem = null;
    o._extra = null;
    o._total = 0;
    o._panelData = [];
    o._canTouch = false;
    o._washing = false;
    o._extraGrid = false;
    o._pool = null;
    return o;
  }
  i(o, _);
  o.prototype.onLevelReady = function () {
    this.itemSpriteFrames = this.dict.spriteFrame1.children.map(function (_) {
      return _.getComponent(cc.Sprite).spriteFrame;
    });
    this.item2SpriteFrames = this.dict.spriteFrame2.children.map(function (_) {
      return _.getComponent(cc.Sprite).spriteFrame;
    });
    this.item = this.dict.ObliquityEliminationItem;
    this.item2 = this.dict.ObliquityEliminationCollectionItem;
    this._panel = cc.find("game/Panel", this.node);
    this._collection = cc.find("game/Collection", this.node);
    this._extra = cc.find("game/Extra", this.node);
    this._staging = cc.find("game/Staging", this.node);
    this._pool = new cc.NodePool();
    for (var _ = 0; _ < 300; ++_) {
      var o = cc.instantiate(this.item);
      this._pool.put(o);
    }
    this.init();
  };
  o.prototype.onLevelDisable = function () {
    this._panelData = [];
    this._total = 0;
    this._panel.removeAllChildren();
    this._collection.removeAllChildren();
    this._staging.removeAllChildren();
    this.poly.active = false;
    this._extra.active = true;
    this._extraGrid = false;
  };
  o.prototype.init = function () {
    var _ = JSON.parse(this.levelConfig);
    this._panelData = [];
    this._total = 0;
    this.createItems(_);
    this._panel.off(cc.Node.EventType.TOUCH_END);
    this._panel.off(cc.Node.EventType.TOUCH_START);
    this._panel.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    this._panel.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
  };
  o.prototype.getItem = function () {
    if (this._pool.size() > 0) {
      return this._pool.get();
    } else {
      return cc.instantiate(this.item);
    }
  };
  o.prototype.createItems = function (_) {
    var o = this;
    this._panel.destroyAllChildren();
    this._collection.destroyAllChildren();
    var e = [];
    for (var t in _.types) {
      for (var i = 3 * _.types[t], d = 0; d < i; d++) {
        e.push(t);
      }
    }
    e = this.shuffle(e);
    _.map.forEach(function (_) {
      var t = o.getItem();
      o._panel.addChild(t);
      t.addComponent(n.default);
      t.position = o.getPosition(_.v || 0, _.h || 0);
      t.active = true;
      var i = e.shift();
      t.getComponent(cc.Sprite).spriteFrame = o.itemSpriteFrames[i];
      t.name = "" + i;
      t.layer = _.l;
      t.y = t.position.y;
      t.v = _.v;
      t.h = _.h;
      t.sp = i;
      if (!o._panelData[_.l]) {
        o._panelData[_.l] = [];
      }
      o._panelData[_.l].push(t);
      o._total++;
      o.blockTotal.string = "格子数：" + o._total;
    });
    this.refreshLayerIndex();
    this.playItemsIn();
    this._canTouch = true;
  };
  o.prototype.playItemsIn = function () {
    var _ = this;
    this._panel.children.sort(function (_, o) {
      return _.y + 1000 * _.layer - (o.y + 1000 * o.layer);
    }).forEach(function (o, e) {
      var t = cc.winSize.height / 2 + o.width;
      var i = o.y;
      o.y = t;
      cc.tween(o).delay(0.02 * e).to(0.8, {
        y: i
      }).by(0.1, {
        y: -5
      }).by(0.1, {
        y: 8
      }).by(0.1, {
        y: -3
      }).call(function () {
        _.refreshLayerMask(o);
        if (e == _._panel.children.length - 1) {
          _._canTouch = true;
        }
      }).start();
    });
  };
  o.prototype.touchStart = function (_) {
    if (!this._washing && this._canTouch) {
      var o = this._panel.children.filter(function (_) {
        return !_.getChildByName("Mask").active;
      }).sort(function (_, o) {
        return o.layer - _.layer;
      });
      var e = _.getLocation();
      var t = o.find(function (_) {
        var o = _.getComponent(cc.PolygonCollider);
        return cc.Intersection.pointInPolygon(_.convertToNodeSpaceAR(e), o.points);
      });
      if (t && this.canPutToCollection()) {
        t.stopAllActions();
        cc.tween(t).to(0.15, {
          scale: 1.1
        }).start();
        this._touchItem = t;
        this._touchItem.z = this._touchItem.zIndex;
        this._touchItem.zIndex = cc.macro.MAX_ZINDEX;
      }
    }
  };
  o.prototype.touchEnd = function () {
    var _ = this;
    if (!this._washing && this._canTouch && this._touchItem) {
      this._touchItem.stopAllActions();
      var o = this._panelData[this._touchItem.layer].findIndex(function (o) {
        return o.uuid == _._touchItem.uuid;
      });
      this._panelData[this._touchItem.layer].splice(o, 1);
      this.putToCollection(this._touchItem);
      this.refreshAllLayerMask();
      this._touchItem = null;
      this._total--;
      this.blockTotal.string = "格子数：" + this._total;
      this.poly.active = false;
    }
  };
  o.prototype.canPutToCollection = function () {
    if (this._collection.childrenCount < (this._extraGrid ? 8 : 7)) {
      return true;
    }
    var _ = {};
    this._collection.children.forEach(function (o) {
      return _[o.name] = (_[o.name] || 0) + 1;
    });
    for (var o in _) {
      if (_[o] >= 3) {
        return true;
      }
    }
    return false;
  };
  o.prototype.putToCollection = function (_) {
    var o = this;
    this.playRemoteSound(m.AUDIO_URL.BOBO);
    var e = cc.instantiate(this.item2);
    e.layer = _.layer;
    e.v = _.v;
    e.h = _.h;
    e.sp = _.sp;
    e.getComponent(cc.Sprite).spriteFrame = this.item2SpriteFrames[Number(_.name)];
    e.name = "" + _.name;
    e.position = this._collection.convertToNodeSpaceAR(_.parent.convertToWorldSpaceAR(_.position));
    e.active = true;
    var t;
    var i = this._collection.children;
    var d = i.filter(function (o) {
      return o.name == _.name;
    }).sort(function (_, o) {
      return _.i - o.i;
    });
    var f = i.length;
    if (d.length) {
      f = i.find(function (_) {
        return _.uuid == d[d.length - 1].uuid;
      }).i + 1;
      i.filter(function (_) {
        return _.i >= f;
      }).sort(function (_, o) {
        return _.i - o.i;
      }).forEach(function (_, e) {
        _.i = f + e + 1;
        var t = cc.v3(0, 15);
        t.x = 66 + 82 * (f + e + 1);
        _.stopAllActions();
        cc.tween(_).to(o.calcDuration(_, 100), {
          position: t
        }).call(function () {
          _.f = true;
          _.t = null;
          o.clearToCollection();
        }).start();
      });
      e.i = f;
      this._collection.addChild(e);
      (t = cc.v3(0, 15)).x = 66 + 82 * f;
      e.stopAllActions();
      cc.tween(e).to(this.calcDuration(e, 200), {
        position: t
      }).call(function () {
        e.f = true;
        e.t = null;
        o.clearToCollection();
      }).start();
    } else {
      e.i = f;
      this._collection.addChild(e);
      (t = cc.v3(0, 15)).x = 66 + 82 * f;
      cc.tween(e).to(this.calcDuration(_, 200), {
        position: t
      }).call(function () {
        e.f = true;
        e.t = null;
        o.clearToCollection();
      }).start();
    }
    _.active = false;
    _.destroy();
  };
  o.prototype.backToCollection = function (_) {
    var o = this;
    this.playRemoteSound(m.AUDIO_URL.BOBO);
    var e;
    var t = _;
    var i = this._collection.children;
    var d = i.filter(function (o) {
      return o.name == _.name;
    }).sort(function (_, o) {
      return _.i - o.i;
    });
    var f = i.length;
    if (d.length) {
      f = i.find(function (_) {
        return _.uuid == d[d.length - 1].uuid;
      }).i + 1;
      i.filter(function (_) {
        return _.i >= f;
      }).sort(function (_, o) {
        return _.i - o.i;
      }).forEach(function (_, e) {
        _.i = f + e + 1;
        var t = cc.v3(0, 15);
        t.x = 66 + 82 * (f + e + 1);
        _.stopAllActions();
        cc.tween(_).to(o.calcDuration(_, 100), {
          position: t
        }).call(function () {
          _.f = true;
          _.t = null;
          o.clearToCollection();
        }).start();
      });
      t.i = f;
      t.position = this._collection.convertToNodeSpaceAR(t.parent.convertToWorldSpaceAR(t.position));
      t.parent = this._collection;
      (e = cc.v3(0, 15)).x = 66 + 82 * f;
      t.stopAllActions();
      cc.tween(t).to(this.calcDuration(t, 200), {
        position: e
      }).call(function () {
        t.f = true;
        t.t = null;
        o.clearToCollection();
      }).start();
    } else {
      t.i = f;
      t.position = this._collection.convertToNodeSpaceAR(t.parent.convertToWorldSpaceAR(t.position));
      t.parent = this._collection;
      (e = cc.v3(0, 15)).x = 66 + 82 * f;
      cc.tween(t).to(this.calcDuration(_, 200), {
        position: e
      }).call(function () {
        t.f = true;
        t.t = null;
        o.clearToCollection();
      }).start();
    }
  };
  o.prototype.clearToCollection = function () {
    var _ = this;
    var o = this._collection.children.map(function (_) {
      return _;
    }).filter(function (_) {
      return _.f;
    }).sort(function (_, o) {
      return _.i - o.i;
    });
    var e = o.filter(function (_) {
      var e = o.find(function (_) {
        return o.filter(function (o) {
          return o.name == _.name;
        }).length >= 3;
      });
      return _.name == (e ? e.name : null);
    });
    if (e.length >= 3) {
      var t = e[e.length - 1].i;
      this.playRemoteSound(m.AUDIO_URL.XIU);
      e.forEach(function (o) {
        var e = cc.instantiate(_.tx);
        _.node.addChild(e);
        e.position = _.node.convertToNodeSpaceAR(o.parent.convertToWorldSpaceAR(o.position));
        e.active = true;
        e.getComponent(sp.Skeleton).setCompleteListener(function () {
          e.destroy();
        });
        o.active = false;
        o.removeFromParent();
        o.destroy();
      });
      this._collection.children.map(function (_) {
        return _;
      }).filter(function (_) {
        return _.i > t;
      }).forEach(function (o) {
        o.i -= 3;
        var e = cc.v3(0, 15);
        e.x = 66 + 82 * o.i;
        o.stopAllActions();
        cc.tween(o).to(_.calcDuration(o, 100), {
          position: e
        }).call(function () {
          o.f = true;
          o.t = null;
          _.clearToCollection();
        }).start();
      });
      if (this._total <= 0) {
        console.log("游戏胜利");
        this.playRight(null, 2);
      }
    } else if (o.length >= (this._extraGrid ? 8 : 7)) {
      console.log("游戏失败");
      this.playError(null, 2);
    }
  };
  o.prototype.calcDuration = function () {
    return 0.2;
  };
  o.prototype.refreshLayerMask = function (_) {
    for (var o = this, e = [], t = 1; this._panelData[_.layer + t];) {
      e = e.concat(this._panelData[_.layer + t]);
      t++;
    }
    var i = e.length > 0;
    if (i) {
      var d = this.getPosition(_.v, _.h);
      var f = this.getPolygon(d);
      i = e.some(function (_) {
        var e = o.relationPointToPolygon(o.getPosition(_.v, _.h), f);
        return [0, 1, 2].some(function (_) {
          return _ == e;
        });
      });
    }
    var m = _.getChildByName("Mask");
    if (m.active != i) {
      m.active = !!i;
    }
  };
  o.prototype.refreshAllLayerMask = function () {
    var _ = this;
    this._panel.children.forEach(function (o) {
      return o.active && _.refreshLayerMask(o);
    });
  };
  o.prototype.refreshLayerIndex = function () {
    this._panel.children.sort(function (_, o) {
      return o.y - _.y;
    }).forEach(function (_, o) {
      return _.zIndex = 1000 * _.layer + o;
    });
  };
  o.prototype.getPosition = function (_, o) {
    var e = cc.v3(0, 0);
    if (_) {
      e = e.add(r[_ > 0 ? 0 : 1].mul(_ > 0 ? _ : Math.abs(_)));
    }
    if (o) {
      e = e.add(r[o > 0 ? 2 : 3].mul(o > 0 ? o : Math.abs(o)));
    }
    return cc.v3(e);
  };
  o.prototype.getPolygon = function (_) {
    var o = r[0].mul(11);
    var e = r[1].mul(9);
    var t = r[2].mul(9);
    var i = r[3].mul(11);
    var d = _.add(o);
    var f = _.add(e);
    var m = _.add(t);
    var n = _.add(i);
    return [d, _.add(o.add(t)), m, _.add(t.add(e)), f, _.add(e.add(i)), n, _.add(i.add(o))];
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
  o.prototype.shuffle = function (_) {
    for (var o = _.length; o;) {
      var e = Math.floor(Math.random() * o--);
      var t = _[o];
      _[o] = _[e];
      _[e] = t;
    }
    return _;
  };
  o.prototype.func_showRewardAds = function (_) {
    cc.game.emit(m.LEVEL_EVENT.REWARDVIDEO, _);
  };
  o.prototype.func_unlockExtraGrid = function () {
    var _ = this;
    this.func_showRewardAds(function (o) {
      if (o) {
        _._extraGrid = true;
        _._extra.active = false;
      }
    });
  };
  o.prototype.func_checkwithdraw = function () {
    for (var _ = null, o = this._collection.childrenCount - 1; !_ && o >= 0;) {
      if (!((_ = this._collection.children[o]) && _.active)) {
        o--;
      }
    }
    return !!_;
  };
  o.prototype.func_withdraw = function () {
    var _ = this;
    if (!this._washing) {
      for (var o = null, e = this._collection.childrenCount - 1; !o && e >= 0;) {
        if (!((o = this._collection.children[e]) && o.active)) {
          e--;
        }
      }
      if (o) {
        var t = cc.instantiate(this.item);
        this._panel.addChild(t);
        t.addComponent(n.default);
        t.position = this.getPosition(o.v || 0, o.h || 0);
        t.active = true;
        t.getComponent(cc.Sprite).spriteFrame = this.itemSpriteFrames[o.sp];
        t.name = "" + o.sp;
        t.layer = o.layer;
        t.y = t.position.y;
        t.v = o.v;
        t.h = o.h;
        t.sp = o.sp;
        this._panelData[o.layer].push(t);
        this._total++;
        this.blockTotal.string = "格子数：" + this._total;
        var i = o.i;
        o.removeFromParent();
        o.destroy();
        this._collection.children.map(function (_) {
          return _;
        }).sort(function (_, o) {
          return _.i - o.i;
        }).filter(function (_) {
          return _.i > i;
        }).forEach(function (o, e) {
          o.i = i + e;
          var t = cc.v3(0, 15);
          t.x = 66 + 82 * (i + e);
          o.stopAllActions();
          cc.tween(o).to(_.calcDuration(o, 100), {
            position: t
          }).call(function () {
            o.f = true;
            o.t = null;
            _.clearToCollection();
          }).start();
        });
        this.refreshLayerIndex();
        this.refreshAllLayerMask();
      }
    }
  };
  o.prototype.func_checkputout = function () {
    return !(this._staging.childrenCount > 0 || !this._collection.children.slice(0, 3).length);
  };
  o.prototype.func_putout = function () {
    var _ = this;
    if (!(this._staging.childrenCount > 0)) {
      var o = this._collection.children.slice(0, 3);
      if (o.length) {
        var e = o.length == 1 ? [cc.v3(0, 0)] : o.length == 2 ? [cc.v3(50, 0), cc.v3(-50, 0)] : [cc.v3(100, 0), cc.v3(0, 0), cc.v3(-100, 0)];
        var t = o[o.length - 1].i;
        this._collection.children.map(function (_) {
          return _;
        }).sort(function (_, o) {
          return _.i - o.i;
        }).filter(function (_) {
          return _.i > t;
        }).forEach(function (o, e) {
          o.i = t - 2 + e;
          var i = cc.v3(0, 15);
          i.x = 66 + 82 * (t - 2 + e);
          o.stopAllActions();
          cc.tween(o).to(_.calcDuration(o, 100), {
            position: i
          }).call(function () {
            o.f = true;
            o.t = null;
            _.clearToCollection();
          }).start();
        });
        o.sort(function (_, o) {
          return o.i - _.i;
        }).forEach(function (o, t) {
          o.position = _._staging.convertToNodeSpaceAR(o.parent.convertToWorldSpaceAR(o.position));
          o.parent = _._staging;
          delete o.f;
          cc.tween(o).to(_.calcDuration(o, 100), {
            position: e[t]
          }).start();
          o.once(cc.Node.EventType.TOUCH_END, function () {
            _.backToCollection(o);
          }, _);
        });
      }
    }
  };
  o.prototype.func_random = function () {
    var _ = this;
    if (!(this._panel.childrenCount <= 0 || this._washing)) {
      this._washing = true;
      var o = this.shuffle(this._panel.children.map(function (_) {
        return _.name;
      }));
      this._panel.children.forEach(function (e) {
        e.name = o.shift();
        e.getComponent(n.default).rotate(_);
      });
    }
  };
  d([c()], o.prototype, "levelConfig", undefined);
  d([c(cc.Node)], o.prototype, "item", undefined);
  d([c(cc.Node)], o.prototype, "item2", undefined);
  d([c([cc.SpriteFrame])], o.prototype, "itemSpriteFrames", undefined);
  d([c([cc.SpriteFrame])], o.prototype, "item2SpriteFrames", undefined);
  d([c(cc.Label)], o.prototype, "blockTotal", undefined);
  d([c(cc.Node)], o.prototype, "poly", undefined);
  d([c(cc.Node)], o.prototype, "tx", undefined);
  return d([s], o);
}(f.default);
exports.default = l;