Object.defineProperty(exports, "__esModule", {
  value: true
});
var t = function () {
  function _() {}
  _.getRandomInt = function (_, o) {
    if (_ === undefined) {
      _ = 0;
    }
    if (o === undefined) {
      o = 1;
    }
    return Math.floor(Math.random() * (o - _ + 1) + _);
  };
  _.getRandomFloat = function (_, o) {
    if (_ === undefined) {
      _ = 0;
    }
    if (o === undefined) {
      o = 1;
    }
    return Math.random() * (o - _ + 1) + _;
  };
  _.getRandomValueInArray = function (_) {
    return _[Math.floor(Math.random() * _.length)];
  };
  _.getTwoPosAngle = function (_, o) {
    return Math.atan((o.y - _.y) / (o.x - _.x));
  };
  _.getTwoPosDistance = function (_, o) {
    return Math.sqrt(Math.pow(o.x - _.x, 2) + Math.pow(o.y - _.y, 2));
  };
  _.getAngleByTwoPoint = function (_, o) {
    var e = o.sub(_).normalize();
    if (e.equals(cc.v2(0, 0))) {
      return 0;
    } else {
      return e.signAngle(cc.v2(1, 0)) / Math.PI * 180 + 90;
    }
  };
  _.convertAngleToRadian = function (_) {
    return _ * Math.PI / 180;
  };
  _.convertRadianToAngle = function (_) {
    return _ / (Math.PI / 180);
  };
  _.isHex = function (_) {
    return /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(_);
  };
  _.convertHexToRGBA = function (_) {
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
  _.convertRGBAToHex = function (_) {
    var o = (256 | _.r).toString(16).slice(1);
    var e = (256 | _.g).toString(16).slice(1);
    var t = (256 | _.b).toString(16).slice(1);
    if (_.a == null) {
      return ("#" + o + e + t).toUpperCase();
    } else {
      return ("#" + o + e + t + (256 | _.a).toString(16).slice(1)).toUpperCase();
    }
  };
  _.prototype.copyAny = function (_) {
    return JSON.parse(JSON.stringify(_));
  };
  _.shuffle = function (_) {
    for (var o = _.length; o;) {
      var e = Math.floor(Math.random() * o--);
      var t = _[o];
      _[o] = _[e];
      _[e] = t;
    }
    return _;
  };
  _.pointToLineDistance = function (_, o, e) {
    var t = _.x;
    var i = _.y;
    var d = o.x;
    var f = o.y;
    var m = e.x;
    var n = e.y;
    var r = d - t;
    var a = f - i;
    var s = r * (m - t) + a * (n - i);
    var c = r * r + a * a;
    if (c === 0) {
      return Math.sqrt(Math.pow(m - t, 2) + Math.pow(n - i, 2));
    }
    var l;
    var u;
    var h = s / c;
    if (h < 0) {
      l = t;
      u = i;
    } else if (h > 1) {
      l = d;
      u = f;
    } else {
      l = t + h * r;
      u = i + h * a;
    }
    return Math.sqrt(Math.pow(m - l, 2) + Math.pow(n - u, 2));
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
  _.isSegmentsIntersect = function (_, o, e, t, i) {
    if (Math.max(_.x, o.x) < Math.min(e.x, t.x) || Math.min(_.x, o.x) > Math.max(e.x, t.x) || Math.max(_.y, o.y) < Math.min(e.y, t.y) || Math.min(_.y, o.y) > Math.max(e.y, t.y)) {
      return false;
    }
    if (e.sub(_).cross(o.sub(_)) * t.sub(_).cross(o.sub(_)) > 0) {
      return false;
    }
    if (_.sub(e).cross(t.sub(e)) * o.sub(e).cross(t.sub(e)) > 0) {
      return false;
    }
    if (i) {
      var d = ((_.x - e.x) * (e.y - t.y) - (_.y - e.y) * (e.x - t.x)) / ((_.x - o.x) * (e.y - t.y) - (_.y - o.y) * (e.x - t.x));
      i.x = _.x + d * (o.x - _.x);
      i.y = _.y + d * (o.y - _.y);
    }
    return true;
  };
  return _;
}();
exports.default = t;