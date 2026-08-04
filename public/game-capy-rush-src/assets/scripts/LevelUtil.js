var t = this && this.__decorate || function (_, o, e, t) {
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
var i = this && this.__awaiter || function (_, o, e, t) {
  return new (e || (e = Promise))(function (i, d) {
    function f(_) {
      try {
        n(t.next(_));
      } catch (o) {
        d(o);
      }
    }
    function m(_) {
      try {
        n(t.throw(_));
      } catch (o) {
        d(o);
      }
    }
    function n(_) {
      var o;
      if (_.done) {
        i(_.value);
      } else {
        (o = _.value, o instanceof e ? o : new e(function (_) {
          _(o);
        })).then(f, m);
      }
    }
    n((t = t.apply(_, o || [])).next());
  });
};
var d = this && this.__generator || function (_, o) {
  var e;
  var t;
  var i;
  var d;
  var f = {
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
  d = {
    next: m(0),
    throw: m(1),
    return: m(2)
  };
  if (typeof Symbol == "function") {
    d[Symbol.iterator] = function () {
      return this;
    };
  }
  return d;
  function m(_) {
    return function (o) {
      return n([_, o]);
    };
  }
  function n(d) {
    if (e) {
      throw new TypeError("Generator is already executing.");
    }
    for (; f;) {
      try {
        e = 1;
        if (t && (i = 2 & d[0] ? t.return : d[0] ? t.throw || ((i = t.return) && i.call(t), 0) : t.next) && !(i = i.call(t, d[1])).done) {
          return i;
        }
        t = 0;
        if (i) {
          d = [2 & d[0], i.value];
        }
        switch (d[0]) {
          case 0:
          case 1:
            i = d;
            break;
          case 4:
            f.label++;
            return {
              value: d[1],
              done: false
            };
          case 5:
            f.label++;
            t = d[1];
            d = [0];
            continue;
          case 7:
            d = f.ops.pop();
            f.trys.pop();
            continue;
          default:
            if (!(i = (i = f.trys).length > 0 && i[i.length - 1]) && (d[0] === 6 || d[0] === 2)) {
              f = 0;
              continue;
            }
            if (d[0] === 3 && (!i || d[1] > i[0] && d[1] < i[3])) {
              f.label = d[1];
              break;
            }
            if (d[0] === 6 && f.label < i[1]) {
              f.label = i[1];
              i = d;
              break;
            }
            if (i && f.label < i[2]) {
              f.label = i[2];
              f.ops.push(d);
              break;
            }
            if (i[2]) {
              f.ops.pop();
            }
            f.trys.pop();
            continue;
        }
        d = o.call(_, f);
      } catch (m) {
        d = [6, m];
        t = 0;
      } finally {
        e = i = 0;
      }
    }
    if (5 & d[0]) {
      throw d[1];
    }
    return {
      value: d[0] ? d[1] : undefined,
      done: true
    };
  }
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var f = cc._decorator;
var m = f.ccclass;
f.property;
var n = function () {
  function _() {}
  _.log = function (_, o) {
    if (this.isShowLog) {
      if (o) {
        cc.log("%c " + _ + " %c " + o + " ", "background: #35495E;padding: 1px;border-radius: 2px 0 0 2px;color: #fff;", "background: #409EFF;padding: 1px;border-radius: 0 2px 2px 0;color: #fff;");
      } else {
        cc.log("%c " + _ + " ", "background: #409EFF;padding: 1px;border-radius: 0 2px 2px 0;color: #fff;");
      }
    }
  };
  _.setProjectBg = function (_) {
    var o;
    if (_ === undefined) {
      _ = cc.Color.GRAY;
    }
    for (var e = 0; e < cc.Camera.cameras.length; e++) {
      var t = cc.Camera.cameras[e];
      if (t.node.name == "Main Camera") {
        o = t;
      }
    }
    if (o) {
      var i = o.node.parent.getChildByName("Sprite Background");
      if (i) {
        cc.log("更改项目背景图 测试碰撞");
        i.color = _;
      }
    }
  };
  _.touchEvent = function (_, o) {
    var e = {
      start: function (_) {
        if (o.sFunc) {
          o.sFunc(_);
        }
      },
      move: function (_) {
        if (o.mFunc) {
          o.mFunc(_);
        }
      },
      end: function (_) {
        if (o.eFunc) {
          o.eFunc(_);
        }
      }
    };
    if (o.sFunc) {
      _.on(cc.Node.EventType.TOUCH_START, e.start, this);
    }
    if (o.mFunc) {
      _.on(cc.Node.EventType.TOUCH_MOVE, e.move, this);
    }
    if (o.eFunc) {
      _.on(cc.Node.EventType.TOUCH_END, e.end, this);
      _.on(cc.Node.EventType.TOUCH_CANCEL, e.end, this);
    }
    this.touchList[_.uuid] = {
      target: _,
      func: e
    };
  };
  _.clearEvent = function (_, o) {
    if (o === undefined) {
      o = false;
    }
    if (o) {
      for (var e = 0, t = Object.entries(this.touchList); e < t.length; e++) {
        var i = t[e];
        var d = i[0];
        i[1];
        var f = this.touchList[d];
        var m = f.func;
        var n = f.target;
        n.off(cc.Node.EventType.TOUCH_START, m.start, this);
        n.off(cc.Node.EventType.TOUCH_MOVE, m.move, this);
        n.off(cc.Node.EventType.TOUCH_END, m.end, this);
        n.off(cc.Node.EventType.TOUCH_CANCEL, m.end, this);
        delete this.touchList[d];
      }
    } else {
      if (!_) {
        return void cc.log("[LevelUtil.clearEvent] target为空");
      }
      if (this.touchList[_.uuid]) {
        m = this.touchList[_.uuid].func;
        _.off(cc.Node.EventType.TOUCH_START, m.start, this);
        _.off(cc.Node.EventType.TOUCH_MOVE, m.move, this);
        _.off(cc.Node.EventType.TOUCH_END, m.end, this);
        _.off(cc.Node.EventType.TOUCH_CANCEL, m.end, this);
        delete this.touchList[_.uuid];
      }
    }
  };
  _.onClickEvent = function (_, o, e) {
    if (e === undefined) {
      e = true;
    }
    var t = {
      start: function () {},
      move: function () {},
      end: function () {}
    };
    if (e) {
      t.start = function (_) {
        if (o) {
          o(_);
        }
      };
      _.on(cc.Node.EventType.TOUCH_START, t.start, this);
    } else {
      t.end = function (_) {
        if (o) {
          o(_);
        }
      };
      _.on(cc.Node.EventType.TOUCH_END, t.end, this);
    }
    this.touchList[_.uuid] = {
      target: _,
      func: t
    };
  };
  _.setRigidBodyType = function (_, o, e) {
    if (e === undefined) {
      e = false;
    }
    if (_) {
      var t = null;
      t = _ instanceof cc.Node ? _.getComponent(cc.RigidBody) : _;
      o.scheduleOnce(function () {
        t.type = e ? cc.RigidBodyType.Static : cc.RigidBodyType.Dynamic;
      });
    }
  };
  _.removePhysics = function (_, o) {
    o.scheduleOnce(function () {
      _.removeComponent(cc.PhysicsCollider);
      _.removeComponent(cc.RigidBody);
    });
  };
  _.playSpineCallBack = function (_, o, e, t) {
    if (e === undefined) {
      e = false;
    }
    if (t === undefined) {
      t = null;
    }
    if (_) {
      var i = _ instanceof sp.Skeleton ? _ : _.getComponent(sp.Skeleton);
      if (i) {
        i.setAnimation(0, o, e);
        i.setCompleteListener(function (_) {
          if (_.animation.name == o && t) {
            t();
          }
        });
      }
    }
  };
  _.convertPosition = function (_, o) {
    return o.parent.convertToNodeSpaceAR(_.convertToWorldSpaceAR(cc.Vec2.ZERO));
  };
  _.getWorldPos = function (_) {
    return _.parent.convertToWorldSpaceAR(_.position);
  };
  _.getObj = function (_, o) {
    var e = null;
    var t = this.poolMap[_];
    (e = t && t.size() ? t.get() : cc.instantiate(o)).active = true;
    return e;
  };
  _.putObj = function (_, o) {
    o.active = false;
    var e = this.poolMap[_];
    if (e) {
      e.put(o);
    } else {
      var t = new cc.NodePool();
      this.poolMap[_] = t;
      t.put(o);
    }
  };
  _.clearObj = function () {
    this.poolMap.clear;
  };
  _.loadByFrame = function (_, o, e, t) {
    var i = 0;
    var d = function () {
      for (var f = 0; f < e; f++) {
        if (o) {
          o(i++);
        }
      }
      if (i < t) {
        _.scheduleOnce(function () {
          return d();
        });
      }
    };
    d();
  };
  _.setChildrenActive = function (_, o) {
    if (_) {
      _.children.forEach(function (_, e) {
        _.active = o == e;
      });
    }
  };
  _.deepCopy = function (_) {
    if (_ == null || typeof _ != "object") {
      return _;
    }
    var o = null;
    if (_ instanceof Date) {
      (o = new Date()).setTime(_.getTime());
      return o;
    }
    if (_ instanceof Array) {
      o = [];
      for (var e = 0, t = _.length; e < t; e++) {
        o[e] = this.deepCopy(_[e]);
      }
      return o;
    }
    if (_ instanceof Object) {
      o = {};
      for (var i in _) {
        if (_.hasOwnProperty(i)) {
          o[i] = this.deepCopy(_[i]);
        }
      }
      return o;
    }
    console.warn("不支持的类型：" + o);
  };
  _.getRandomInt = function (_, o) {
    if (_ === undefined) {
      _ = 0;
    }
    if (o === undefined) {
      o = 1;
    }
    return Math.floor(Math.random() * (o - _) + _);
  };
  _.getAngle = function (_, o) {
    return Math.atan((o.y - _.y) / (o.x - _.x));
  };
  _.getDistance = function (_, o) {
    return Math.sqrt(Math.pow(o.x - _.x, 2) + Math.pow(o.y - _.y, 2));
  };
  _.angleToRadian = function (_) {
    return _ * Math.PI / 180;
  };
  _.addSafely = function (_, o) {
    var e = (_.toString().split(".")[1] || "").length;
    var t = (o.toString().split(".")[1] || "").length;
    var i = Math.pow(10, Math.max(e, t));
    return (_ * i + o * i) / i;
  };
  _.getRandomValueInArray = function (_) {
    return _[Math.floor(Math.random() * _.length)];
  };
  _.copyArray = function (_) {
    for (var o = [], e = 0; e < _.length; e++) {
      o.push(_[e]);
    }
    return o;
  };
  _.copy2DArray = function (_) {
    for (var o = [], e = 0; e < _.length; e++) {
      o.push(_[e].concat());
    }
    return o;
  };
  _.fisherYatesShuffle = function (_) {
    for (var o = _.length; o;) {
      var e = Math.floor(Math.random() * o--);
      var t = _[o];
      _[o] = _[e];
      _[e] = t;
    }
    return _;
  };
  _.isHex = function (_) {
    return /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(_);
  };
  _.hexToRgba = function (_) {
    if (this.isHex(_)) {
      return {
        r: parseInt(_.substr(1, 2), 16) || 0,
        g: parseInt(_.substr(3, 2), 16) || 0,
        b: parseInt(_.substr(5, 2), 16) || 0,
        a: parseInt(_.substr(7, 2), 16) || 255
      };
    } else {
      return null;
    }
  };
  _.rgbaToHex = function (_) {
    var o = (256 | _.r).toString(16).slice(1);
    var e = (256 | _.g).toString(16).slice(1);
    var t = (256 | _.b).toString(16).slice(1);
    if (_.a == null) {
      return ("#" + o + e + t).toUpperCase();
    } else {
      return ("#" + o + e + t + (256 | _.a).toString(16).slice(1)).toUpperCase();
    }
  };
  _.createCircleData = function (_, o, e) {
    if (e === undefined) {
      e = 60;
    }
    for (var t = [], i = 360, d = 0, f = 0; f < e; f++) {
      d = (i -= 360 / e) * Math.PI / 180;
      var m = _ * Math.sin(d) + o.x;
      var n = _ * Math.cos(d) + o.y;
      t.push(cc.v2(m, n));
    }
    return t;
  };
  _.getWorldPointsByPolygonComp = function (_) {
    var o = _.getComponent(cc.PolygonCollider);
    if (!o) {
      o = _.getComponent(cc.PhysicsPolygonCollider);
    }
    var e = [];
    var t = [];
    if (o) {
      e = o.points;
      var i = o.offset;
      e.forEach(function (o) {
        var e = cc.v2(o.x + i.x, o.y + i.y);
        t.push(_.convertToWorldSpaceAR(e));
      });
    }
    return t;
  };
  _.getAreaByPoints = function (_) {
    for (var o = _.length, e = 0, t = 0, i = 0; i < o - 1; ++i) {
      e += _[i].x * _[i + 1].y;
      t += _[i + 1].x * _[i].y;
    }
    return 0.5 * ((e += _[o - 1].x * _[0].y) - (t + _[0].x * _[o - 1].y));
  };
  _.optimizePoints = function (_) {
    for (var o = [], e = 0; e < _.length; e++) {
      var t = _[e];
      var i = Math.floor(1 * t.x) / 1;
      var d = Math.floor(1 * t.y) / 1;
      o.push(cc.v2(i, d));
    }
    return o;
  };
  _.handleOneByOne = function (_, o) {
    return i(this, undefined, undefined, function () {
      var e = this;
      return d(this, function () {
        if (this.canHandle) {
          console.log("干他", new Date().getTime());
          this.canHandle = false;
          if (o) {
            o();
          }
          _.scheduleOnce(function () {
            e.canHandle = true;
            var o = e.missionArr.shift();
            if (o) {
              e.handleOneByOne(_, o);
            }
          }, this.duration);
        } else {
          this.missionArr.push(o);
        }
        return [2];
      });
    });
  };
  _.isShowLog = true;
  _.touchList = {};
  _.poolMap = {};
  _.duration = 0.1;
  _.missionArr = [];
  _.canHandle = true;
  return t([m], _);
}();
exports.default = n;