Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServerTime = exports.getClientTime = exports.getNonce = exports.arrSort = exports.getSign = exports.response = exports.formatDate = exports.versionFormat = undefined;
var o = require("./Api");
var i = require("./md51");
var a = require("./config");
function r(t) {
  var e = {};
  Object.keys(t).sort().forEach(function (n) {
    e[n] = t[n];
  });
  return e;
}
function s() {
  return i.md5((c() + 1000 * Math.random()).toString());
}
function c() {
  return Math.round(Date.now() / 1000);
}
exports.versionFormat = function (t) {
  return parseInt(t.replace(".", ""));
};
exports.formatDate = function (t, e) {
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
};
exports.response = function (t, e, n) {
  if (t === undefined) {
    t = 0;
  }
  if (e === undefined) {
    e = "";
  }
  if (n === undefined) {
    n = {};
  }
  return {
    code: t,
    msg: e,
    data: n
  };
};
exports.getSign = function (t) {
  t.timestamp = c();
  t.nonce = s();
  t = r(t);
  var e = [];
  for (var n in t) {
    e.push(n + "=" + t[n]);
  }
  var o = e.join("&") + a.API_SECRET;
  t.sign = i.md5(o);
  return t;
};
exports.arrSort = r;
exports.getNonce = s;
exports.getClientTime = c;
exports.getServerTime = function (t) {
  o.serverTime(t);
};