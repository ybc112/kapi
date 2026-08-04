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
  return _;
}();
exports.default = t;