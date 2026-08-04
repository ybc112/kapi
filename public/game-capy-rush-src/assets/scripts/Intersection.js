Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Intersection = undefined;
var t = cc.v2();
var i = cc.v2();
var d = cc.v2();
var f = cc.v2();
function m(_, o) {
  var e;
  var t;
  e = _.min < o.min ? _.min : o.min;
  t = _.max > o.max ? _.max : o.max;
  return _.max - _.min + (o.max - o.min) < t - e;
}
var n = function () {
  function _() {}
  _.polygonCircle = function (o, e) {
    var t = e.worldPosition;
    if (_.pointInPolygon(t, o)) {
      return true;
    }
    for (var i = e.worldRadius * e.worldRadius, d = 0, f = o.length; d < f; d++) {
      var m = d === 0 ? o[o.length - 1] : o[d - 1];
      var n = o[d];
      if (_.pointLineDistanceSqr(t, m, n, true) < i) {
        return true;
      }
    }
    return false;
  };
  _.pointLineDistanceSqr = function (_, o, e, i) {
    var d;
    var f = e.x - o.x;
    var m = e.y - o.y;
    var n = f * f + m * m;
    var r = ((_.x - o.x) * f + (_.y - o.y) * m) / n;
    d = i ? n ? r < 0 ? o : r > 1 ? e : cc.Vec2.set(t, o.x + r * f, o.y + r * m) : o : cc.Vec2.set(t, o.x + r * f, o.y + r * m);
    return (f = _.x - d.x) * f + (m = _.y - d.y) * m;
  };
  _.circleCircle = function (_, o) {
    cc.Vec2.subtract(f, _.worldPosition, o.worldPosition);
    return f.magSqr() < Math.pow(_.worldRadius + o.worldRadius, 2);
  };
  _.lineLine = function (_, o, e, t) {
    var i = (t.x - e.x) * (_.y - e.y) - (t.y - e.y) * (_.x - e.x);
    var d = (o.x - _.x) * (_.y - e.y) - (o.y - _.y) * (_.x - e.x);
    var f = (t.y - e.y) * (o.x - _.x) - (t.x - e.x) * (o.y - _.y);
    if (f !== 0) {
      var m = i / f;
      var n = d / f;
      if (m >= 0 && m <= 1 && n >= 0 && n <= 1) {
        return true;
      }
    }
    return false;
  };
  _.lineRect = function (o, e, m) {
    cc.Vec2.set(t, m.x, m.y);
    cc.Vec2.set(i, m.x, m.yMax);
    cc.Vec2.set(d, m.xMax, m.yMax);
    cc.Vec2.set(f, m.xMax, m.y);
    return !!(_.lineLine(o, e, t, i) || _.lineLine(o, e, i, d) || _.lineLine(o, e, d, f) || _.lineLine(o, e, f, t));
  };
  _.linePolygon = function (o, e, t) {
    for (var i = t.length, d = 0; d < i; ++d) {
      var f = t[d];
      var m = t[(d + 1) % i];
      if (_.lineLine(o, e, f, m)) {
        return true;
      }
    }
    return false;
  };
  _.rectRect = function (_, o) {
    var e = _.x;
    var t = _.y;
    var i = _.x + _.width;
    var d = _.y + _.height;
    var f = o.x;
    var m = o.y;
    var n = o.x + o.width;
    var r = o.y + o.height;
    return e <= n && i >= f && t <= r && d >= m;
  };
  _.rectPolygon = function (o, e) {
    cc.Vec2.set(t, o.x, o.y);
    cc.Vec2.set(i, o.x, o.yMax);
    cc.Vec2.set(d, o.xMax, o.yMax);
    cc.Vec2.set(f, o.xMax, o.y);
    if (_.linePolygon(t, i, e)) {
      return true;
    }
    if (_.linePolygon(i, d, e)) {
      return true;
    }
    if (_.linePolygon(d, f, e)) {
      return true;
    }
    if (_.linePolygon(f, t, e)) {
      return true;
    }
    for (var m = 0, n = e.length; m < n; ++m) {
      if (o.contains(e[m])) {
        return true;
      }
    }
    return !!(_.pointInPolygon(t, e) || _.pointInPolygon(i, e) || _.pointInPolygon(d, e) || _.pointInPolygon(f, e));
  };
  _.pointInPolygon = function (_, o) {
    for (var e = false, t = _.x, i = _.y, d = o.length, f = 0, m = d - 1; f < d; m = f++) {
      var n = o[f].x;
      var r = o[f].y;
      var a = o[m].x;
      var s = o[m].y;
      if (r > i != s > i && t < (a - n) * (i - r) / (s - r) + n) {
        e = !e;
      }
    }
    return e;
  };
  _.getNearestPoint = function (_, o) {
    for (var e = o[0], t = cc.Vec2.squaredDistance(_, e), i = 1, d = o.length; i < d; i++) {
      var f = o[i];
      var m = cc.Vec2.squaredDistance(_, f);
      if (m < t) {
        t = m;
        e = f;
      }
    }
    return e;
  };
  _.satPolygonPolygon = function (o, e, i, d) {
    for (var f = 0, n = i.length; f < n; f++) {
      cc.Vec2.set(t, i[f].y, -i[f].x);
      if (m(_.getProjectionPolygon(o, t), _.getProjectionPolygon(e, t))) {
        return false;
      }
    }
    f = 0;
    for (var r = d.length; f < r; f++) {
      cc.Vec2.set(t, d[f].y, -d[f].x);
      if (m(_.getProjectionPolygon(o, t), _.getProjectionPolygon(e, t))) {
        return false;
      }
    }
    return true;
  };
  _.getProjectionPolygon = function (_, o) {
    for (var e = Number.MAX_SAFE_INTEGER, t = -Number.MAX_SAFE_INTEGER, i = 0, d = _.length; i < d; i++) {
      var f = _[i].dot(o);
      e = Math.min(e, f);
      t = Math.max(t, f);
    }
    return {
      min: e,
      max: t
    };
  };
  _.polygonPolygon = function (o, e) {
    var t;
    var i;
    t = 0;
    i = o.length;
    for (; t < i; ++t) {
      var d = o[t];
      var f = o[(t + 1) % i];
      if (_.linePolygon(d, f, e)) {
        return true;
      }
    }
    t = 0;
    i = e.length;
    for (; t < i; ++t) {
      if (_.pointInPolygon(e[t], o)) {
        return true;
      }
    }
    t = 0;
    i = o.length;
    for (; t < i; ++t) {
      if (_.pointInPolygon(o[t], e)) {
        return true;
      }
    }
    return false;
  };
  _.getPoint = function (_, o, e, t, i) {
    i = i || cc.v2();
    var d = _.x;
    var f = _.y;
    var m = o.x;
    var n = o.y;
    var r = e.x;
    var a = e.y;
    var s = t.x;
    var c = t.y;
    var l = ((m - d) * (a - f) - (r - d) * (n - f)) / ((m - d) * (a - c) - (r - s) * (n - f));
    return cc.Vec2.set(i, r + l * (s - r), a + l * (c - a));
  };
  _.isConcavePolygon = function (_) {
    for (var o = [], e = 0, t = _.length; e < t; ++e) {
      var i = _[e];
      var d = _[(e + 1) % t];
      var f = cc.v2();
      cc.Vec2.subtract(f, i, d);
      o.push(f);
    }
    var m;
    var n;
    var r = o[0].cross(o[1]) >= 0 ? 1 : -1;
    var a = o.length;
    for (e = 1; e < o.length; e++) {
      m = o[e];
      n = o[(e + 1) % a];
      var s = m.cross(n >= 0 ? 1 : -1);
      if (r != s) {
        return true;
      }
      r = s;
    }
    return false;
  };
  return _;
}();
exports.Intersection = n;