var o = this && this.__spreadArrays || function () {
  for (var t = 0, e = 0, n = arguments.length; e < n; e++) {
    t += arguments[e].length;
  }
  var o = Array(t);
  var i = 0;
  for (e = 0; e < n; e++) {
    for (var a = arguments[e], r = 0, s = a.length; r < s; r++, i++) {
      o[i] = a[r];
    }
  }
  return o;
};
function i(t, e) {
  var n = {
    "M+": t.getMonth() + 1,
    "d+": t.getDate(),
    "h+": t.getHours() % 12 == 0 ? 12 : t.getHours() % 12,
    "H+": t.getHours(),
    "m+": t.getMinutes(),
    "s+": t.getSeconds(),
    "q+": Math.floor((t.getMonth() + 3) / 3),
    S: t.getMilliseconds()
  };
  if (/(y+)/.test(e)) {
    e = e.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(e)) {
    e = e.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? "星期" : "周" : "") + "日一二三四五六".charAt(t.getDay()));
  }
  for (var o in n) {
    if (new RegExp("(" + o + ")").test(e)) {
      e = e.replace(RegExp.$1, RegExp.$1.length == 1 ? n[o] : ("00" + n[o]).substr(("" + n[o]).length));
    }
  }
  return e;
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLegalLogLevel = exports.LOG_LEVEL = undefined;
exports.LOG_LEVEL = {
  VERBOSE: "verbose",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
  NONE: "none"
};
exports.isLegalLogLevel = function (t) {
  return [exports.LOG_LEVEL.VERBOSE, exports.LOG_LEVEL.INFO, exports.LOG_LEVEL.WARNING, exports.LOG_LEVEL.ERROR, exports.LOG_LEVEL.NONE].includes(t);
};
var a = function () {
  function t(e, n) {
    if (e === undefined) {
      e = "none";
    }
    if (n === undefined) {
      n = "LOG";
    }
    this.level = e;
    this.prefix = n;
    this.id = t.id;
  }
  t.isLegalLogLevel = function (t) {
    return [exports.LOG_LEVEL.VERBOSE, exports.LOG_LEVEL.INFO, exports.LOG_LEVEL.WARNING, exports.LOG_LEVEL.ERROR, exports.LOG_LEVEL.NONE].includes(t);
  };
  t.prototype.getPrintPrefix = function () {
    this.id++;
    i(new Date(), "yyyy-MM-ddThh:mm:ss.SZ");
  };
  t.prototype.setLogLevel = function (t) {
    return this.level = t;
  };
  t.prototype.getLogLevel = function () {
    return this.level;
  };
  t.prototype.info = function () {
    for (var t = [], e = 0; e < arguments.length; e++) {
      t[e] = arguments[e];
    }
    var n = ["info"];
    if (n.includes(this.level)) {
      console.log.apply(console, o([this.getPrintPrefix("info")], t));
    }
  };
  t.prototype.warn = function () {
    for (var t = [], e = 0; e < arguments.length; e++) {
      t[e] = arguments[e];
    }
    var n = ["info", "warn"];
    if (n.includes(this.level)) {
      console.warn.apply(console, o([this.getPrintPrefix("warn")], t));
    }
  };
  t.prototype.error = function () {
    for (var t = [], e = 0; e < arguments.length; e++) {
      t[e] = arguments[e];
    }
    var n = ["info", "warn", "error", "verbose"];
    if (n.includes(this.level)) {
      console.error.apply(console, o([this.getPrintPrefix("error")], t));
    }
  };
  t.prototype.verbose = function () {
    for (var t = [], e = 0; e < arguments.length; e++) {
      t[e] = arguments[e];
    }
    var n = ["info", "warn", "error", "verbose"];
    if (n.includes(this.level)) {
      console.error.apply(console, o([this.getPrintPrefix("verbose")], t));
    }
  };
  t.id = 0;
  t.LOG_LEVEL = {
    VERBOSE: "verbose",
    INFO: "info",
    WARNING: "warning",
    ERROR: "error",
    NONE: "none"
  };
  return t;
}();
exports.default = a;