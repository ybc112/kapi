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
var f = [cc.v3(-7.6, 6.7), cc.v3(7.6, -6.7), cc.v3(-5.6, -4.7), cc.v3(5.6, 4.7)];
var m = cc._decorator;
var n = m.ccclass;
m.property;
var r = function (_) {
  function o() {
    var o = _ !== null && _.apply(this, arguments) || this;
    o.nowMoveInTimes = 0;
    o.rotateOldPosition = cc.v3(0, 0);
    o.circleCenter = cc.v2(0, 0);
    o.radian = 0;
    o.radianMin = 0;
    o.radianAdd = 0;
    o.moveInTimes = 15;
    o.circleRadius = 0;
    o.circleRadiusMax = 250;
    o.circleRadiusMin = 250;
    o.subCircleLength = -10;
    o.rotationTimes = 80;
    o.addCircleLength = 3;
    o.addRadianOnce = 0;
    o.parentComp = null;
    return o;
  }
  i(o, _);
  o.prototype.rotate = function (_) {
    cc.v2(cc.winSize.width, cc.winSize.height / 2);
    this.nowMoveInTimes = 0;
    this.rotateOldPosition = this.getPosition(this.node.v, this.node.h);
    this.parentComp = _;
    this.initRotationData();
    this.schedule(this.circleMove, 0.01);
    cc.tween(this.node).delay(0.5).call(function () {
      this.node.getComponent(cc.Sprite).spriteFrame = _.itemSpriteFrames[this.node.name];
      this.node.sp = this.node.name;
    }, this).start();
  };
  o.prototype.circleMove = function () {
    this.nowMoveInTimes += 1;
    if (this.nowMoveInTimes <= this.moveInTimes) {
      this.circleRadius += this.subCircleLength;
      this.radian += this.radianAdd;
    } else {
      if (this.nowMoveInTimes > this.rotationTimes + this.moveInTimes) {
        this.unschedule(this.circleMove);
        return void this.moveOldPosition();
      }
      if (this.circleRadius < this.circleRadiusMax) {
        this.circleRadius += this.addCircleLength;
      }
      this.radian += this.addRadianOnce;
    }
    var _ = this.circleRadius * Math.cos(this.radian) + this.circleCenter.x;
    var o = this.circleRadius * Math.sin(this.radian) + this.circleCenter.y;
    this.node.x = _;
    this.node.y = o;
  };
  o.prototype.moveOldPosition = function () {
    var _ = this;
    cc.tween(this.node).to(0.1, {
      x: this.rotateOldPosition.x,
      y: this.rotateOldPosition.y
    }).call(function () {
      _.parentComp._washing = false;
    }).start();
  };
  o.prototype.initRotationData = function () {
    var _ = this.getPointAngle(this.circleCenter, this.rotateOldPosition);
    var o = this.rnd(-90, 90);
    this.radian = _ * Math.PI / 180;
    this.radianMin = (_ + o) * Math.PI / 180;
    this.radianAdd = (this.radianMin - this.radian) / this.moveInTimes;
    var e = this.pointLength(this.circleCenter, this.rotateOldPosition);
    var t = Math.sqrt(e);
    var i = Math.ceil(100 * Math.random()) + 70;
    this.circleRadius = t;
    this.circleRadiusMax = 250;
    this.circleRadiusMin = i;
    this.subCircleLength = -(t - this.circleRadiusMin) / this.moveInTimes;
    this.addCircleLength = (this.circleRadiusMax - this.circleRadiusMin) / this.rotationTimes * 1;
    var d = (720 - o - 30) / this.rotationTimes;
    this.addRadianOnce = d * Math.PI / 180;
  };
  o.prototype.getPointAngle = function (_, o) {
    var e = o.x - _.x;
    var t = o.y - _.y;
    var i = 0;
    if (e != 0) {
      var d = Math.abs(t / e);
      i = e > 0 ? t >= 0 ? Math.atan(d) : 2 * Math.PI - Math.atan(d) : t >= 0 ? Math.PI - Math.atan(d) : Math.PI + Math.atan(d);
    } else {
      i = t > 0 ? Math.PI / 2 : -Math.PI / 2;
    }
    return 180 * i / Math.PI;
  };
  o.prototype.getPosition = function (_, o) {
    var e = cc.v3(0, 0);
    if (_) {
      e = e.add(f[_ > 0 ? 0 : 1].mul(_ > 0 ? _ : Math.abs(_)));
    }
    if (o) {
      e = e.add(f[o > 0 ? 2 : 3].mul(o > 0 ? o : Math.abs(o)));
    }
    return cc.v3(e);
  };
  o.prototype.rnd = function (_, o) {
    if (o == null) {
      _ = 0;
    }
    return _ + Math.floor(Math.random() * (o - _ + 1));
  };
  o.prototype.pointLength = function (_, o) {
    var e = o.x - _.x;
    var t = o.y - _.y;
    return e * e + t * t;
  };
  return d([n], o);
}(cc.Component);
exports.default = r;