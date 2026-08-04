Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyAnimationTool = undefined;
(function (t) {
  t.scaleAnimation_heartbeat = function (t) {
    var e = t.scaleX;
    t.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.1, e + 0.1), cc.scaleTo(0.2, e - 0.1), cc.scaleTo(0.1, e), cc.delayTime(0.6))));
  };
  t.scaleAnimation_continue = function (t, e, n, o) {
    if (e === undefined) {
      e = 0.15;
    }
    if (n === undefined) {
      n = 0.15;
    }
    if (o === undefined) {
      o = 0.5;
    }
    var i = t.scaleX;
    cc.tween(t).to(o, {
      scaleX: i + e,
      scaleY: i + n
    }).to(o, {
      scaleX: i,
      scaleY: i
    }).union().repeatForever().start();
  };
  t.scaleAnimation_onec = function (t, e, n, o) {
    if (e === undefined) {
      e = 0.15;
    }
    if (n === undefined) {
      n = 0.15;
    }
    if (o === undefined) {
      o = 0.5;
    }
    var i = t.scaleX;
    t.runAction(cc.sequence(cc.scaleTo(o, i + e, i + n), cc.scaleTo(o, i, i)));
  };
  t.shakeAnimation = function (t, e, n) {
    if (e === undefined) {
      e = 5;
    }
    if (n === undefined) {
      n = 8;
    }
    t.runAction(cc.repeatForever(cc.sequence(cc.repeat(cc.sequence(cc.rotateTo(0.05, n), cc.rotateTo(0.05, 0), cc.rotateTo(0.05, -n), cc.rotateTo(0.05, 0)), 5), cc.delayTime(e))));
  };
  t.shakeAnimationOnec = function (t, e, n) {
    if (e === undefined) {
      e = 5;
    }
    if (n === undefined) {
      n = 8;
    }
    t.runAction(cc.sequence(cc.repeat(cc.sequence(cc.rotateTo(0.05, n), cc.rotateTo(0.05, 0), cc.rotateTo(0.05, -n), cc.rotateTo(0.05, 0)), 5), cc.delayTime(e)));
  };
  t.jumpAnimation = function (t, e, n) {
    if (e === undefined) {
      e = 3;
    }
    if (n === undefined) {
      n = 2;
    }
    var o = cc.v2(t.position.x, t.position.y);
    t.runAction(cc.repeatForever(cc.sequence(cc.repeat(cc.sequence(cc.moveTo(0.12, cc.v2(o.x, o.y + 30)), cc.moveTo(0.12, cc.v2(o.x, o.y))), e), cc.delayTime(n))));
  };
  t.moveToTarget = function (t, e, n) {
    if (n === undefined) {
      n = null;
    }
    var o = cc.v2(t.x, t.y);
    t.active = true;
    var i = e.convertToWorldSpaceAR(cc.v2(0, 0));
    var a = t.parent.convertToNodeSpaceAR(i);
    t.runAction(cc.sequence(cc.moveTo(0.5, a), cc.callFunc(function () {
      t.position = cc.v3(o);
      t.active = false;
      if (n) {
        n();
      }
    }, this)));
  };
  t.rotateAnimation = function (t, e, n) {
    if (e === undefined) {
      e = 360;
    }
    if (n === undefined) {
      n = 4;
    }
    t.runAction(cc.repeatForever(cc.rotateBy(n, e)));
  };
  t.sealAnimation = function (t, e) {
    if (e === undefined) {
      e = 3;
    }
    var n = t.scaleX;
    t.y -= 30;
    t.opacity = 50;
    t.scale = e;
    t.runAction(cc.spawn(cc.scaleTo(0.3, n).easing(cc.easeIn(3)), cc.fadeIn(0.3), cc.moveBy(0.3, cc.v2(0, 30))));
  };
  t.wingAnimation = function (t, e, n) {
    t.runAction(cc.repeatForever(cc.sequence(cc.rotateTo(1, e), cc.rotateTo(1, n))));
  };
  t.upDownMoveAnimation = function (t, e, n, o) {
    var i = cc.v2(t.x, t.y);
    t.runAction(cc.repeatForever(cc.sequence(cc.moveTo(e, cc.v2(i.x, i.y + o)), cc.moveTo(e, cc.v2(i.x, i.y + n)))));
  };
  t.leftRightMoveAnimation = function (t, e, n, o) {
    var i = cc.v2(t.x, t.y);
    t.runAction(cc.repeatForever(cc.sequence(cc.moveTo(e, cc.v2(n, i.y)), cc.moveTo(e, cc.v2(o, i.y)))));
  };
  t.labelChangeAnimation = function (t, e, n, o) {
    var i = 0;
    var a = 1;
    if (n > o) {
      a = n - o;
      for (var r = 0; r <= a; r++) {
        t.scheduleOnce(function () {
          e.string = (n + i).toString();
          i--;
        }, 0.8 / a * r);
      }
    } else if (n < o) {
      a = o - n;
      r = 0;
      a = o - n;
      r = 0;
      for (; r <= a; r++) {
        t.scheduleOnce(function () {
          e.string = (n + i).toString();
          i++;
        }, 0.8 / a * r);
      }
    }
  };
  t.fingerScaleAnimation = function (t, e, n) {
    if (e === undefined) {
      e = 0.3;
    }
    if (n === undefined) {
      n = 0.2;
    }
    var o = t.scale;
    var i = cc.repeatForever(cc.sequence(cc.scaleTo(e, o - n), cc.scaleTo(e, o)));
    t.runAction(i);
  };
  t.showViewAnimation = function (t, e) {
    if (e === undefined) {
      e = 0.3;
    }
    t.scale = 0;
    cc.tween(t).to(0.3, {
      scale: 1
    }, {
      easing: cc.easing.backOut
    }).start();
  };
  t.scaleAppear = function (t, e, n, o, i) {
    if (e === undefined) {
      e = 0;
    }
    if (n === undefined) {
      n = 0.5;
    }
    if (o === undefined) {
      o = 0;
    }
    if (i === undefined) {
      i = null;
    }
    var a = t.scale;
    t.scale = e;
    cc.tween(t).to(0.3, {
      scale: a + n
    }).to(0.3, {
      scale: a
    }).delay(o).call(function () {
      if (i) {
        i();
      }
    }).start();
  };
  t.iconFlyAnimation = function (t, e, n, o, i) {
    t.active = true;
    t.position = cc.v3(o);
    t.scale = 1;
    t.opacity = 255;
    var a = t.parent.convertToNodeSpaceAR(e.parent.convertToWorldSpaceAR(e.position));
    cc.tween(t).to(n, {
      position: a
    }).to(0.2, {
      scale: 2,
      opacity: 0
    }).call(function () {
      if (i) {
        i();
      }
    }).start();
  };
})(exports.MyAnimationTool || (exports.MyAnimationTool = {}));