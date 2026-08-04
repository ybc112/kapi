Object.defineProperty(exports, "__esModule", {
  value: true
});
var t = function () {
  function _() {}
  _.getNumber = function (_) {
    var o = /-?\d*\.?\d+/;
    if (o.test(_)) {
      try {
        var e = _.match(o)[0];
        return parseInt(e);
      } catch (t) {
        return 0;
      }
    }
    return 0;
  };
  _.convert = function (_, o) {
    if (_ === undefined) {
      _ = null;
    }
    if (o === undefined) {
      o = null;
    }
    _.sign = o ? "" : _.negative ? "-" : _.sign;
    var e = _.min - _.argument.length + 1 - _.sign.length;
    var t = new Array(e < 0 ? 0 : e).join(_.pad);
    if (_.left) {
      if (_.pad == "0" || o) {
        return _.sign + _.argument + t.replace(/0/g, " ");
      } else {
        return _.sign + _.argument + t;
      }
    } else if (_.pad == "0" || o) {
      return _.sign + t + _.argument;
    } else {
      return t + _.sign + _.argument;
    }
  };
  _.sprintf = function () {
    for (var _ = [], o = 0; o < arguments.length; o++) {
      _[o] = arguments[o];
    }
    if (_ === undefined) {
      return null;
    }
    if (_.length < 1) {
      return null;
    }
    if (typeof _[0] != "string") {
      return null;
    }
    if (typeof RegExp == "undefined") {
      return null;
    }
    for (var e, t = _[0], i = new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g), d = new Array(), f = new Array(), m = 0, n = 0, r = 0, a = 0, s = ""; e = i.exec(t);) {
      if (e[9]) {
        m += 1;
      }
      n = a;
      r = i.lastIndex - e[0].length;
      f[f.length] = t.substring(n, r);
      a = i.lastIndex;
      d[d.length] = {
        match: e[0],
        left: !!e[3],
        sign: e[4] || "",
        pad: e[5] || " ",
        min: e[6] || 0,
        precision: e[8],
        code: e[9] || "%",
        negative: parseInt(_[m]) < 0,
        argument: String(_[m])
      };
    }
    f[f.length] = t.substring(a);
    if (d.length == 0) {
      return t;
    }
    if (_.length - 1 < m) {
      return null;
    }
    for (var c = 0; c < d.length; c++) {
      var l;
      if (d[c].code == "%") {
        l = "%";
      } else if (d[c].code == "b") {
        d[c].argument = String(Math.abs(parseInt(d[c].argument)).toString(2));
        l = this.convert(d[c], true);
      } else if (d[c].code == "c") {
        d[c].argument = String(String.fromCharCode(parseInt(String(Math.abs(parseInt(d[c].argument))))));
        l = this.convert(d[c], true);
      } else if (d[c].code == "d") {
        d[c].argument = String(Math.abs(parseInt(d[c].argument)));
        l = this.convert(d[c]);
      } else if (d[c].code == "f") {
        d[c].argument = String(Math.abs(parseFloat(d[c].argument)).toFixed(d[c].precision ? d[c].precision : 6));
        l = this.convert(d[c]);
      } else if (d[c].code == "o") {
        d[c].argument = String(Math.abs(parseInt(d[c].argument)).toString(8));
        l = this.convert(d[c]);
      } else if (d[c].code == "s") {
        d[c].argument = d[c].argument.substring(0, d[c].precision ? d[c].precision : d[c].argument.length);
        l = this.convert(d[c], true);
      } else if (d[c].code == "x") {
        d[c].argument = String(Math.abs(parseInt(d[c].argument)).toString(16));
        l = this.convert(d[c]);
      } else if (d[c].code == "X") {
        d[c].argument = String(Math.abs(parseInt(d[c].argument)).toString(16));
        l = this.convert(d[c]).toUpperCase();
      } else {
        l = d[c].match;
      }
      s += f[c];
      s += l;
    }
    return s + f[c];
  };
  return _;
}();
exports.default = t;