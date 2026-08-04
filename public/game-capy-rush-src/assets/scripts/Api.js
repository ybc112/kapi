Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serverTime = exports.getOpenid = exports.report = exports.click = undefined;
var o = require("./Request");
var i = require("./config");
var a = require("./md51");
exports.click = function (t, e, n, a) {
  if (e === undefined) {
    e = function () {};
  }
  if (n === undefined) {
    n = function () {};
  }
  if (a === undefined) {
    a = function () {};
  }
  o.default.post({
    url: i.DOMAIN + "/common/app-track/click",
    data: t,
    dataType: "json",
    success: e,
    fail: n,
    complete: a
  });
};
exports.report = function (t, e, n, r) {
  if (e === undefined) {
    e = function () {};
  }
  if (n === undefined) {
    n = function () {};
  }
  if (r === undefined) {
    r = function () {};
  }
  o.default.post({
    url: i.DOMAIN + "/common/user-op/op-merge-report?trace_id=" + a.md5((Math.round(Date.now() / 1000) + 1000 * Math.random()).toString()),
    data: t,
    dataType: "json",
    success: e,
    fail: n,
    complete: r
  });
};
exports.getOpenid = function (t, e, n, a) {
  if (e === undefined) {
    e = function () {};
  }
  if (n === undefined) {
    n = function () {};
  }
  if (a === undefined) {
    a = function () {};
  }
  var r = "/common/tt/session/sign_in";
  if (window.ks) {
    r = "/common/kuaishou/login";
  } else if (!(!window.wx || window.tt || window.ks)) {
    r = "/common/session/check_code";
  }
  console.log("## getOpenid: ", r);
  o.default.post({
    url: i.DOMAIN + r,
    data: t,
    dataType: "json",
    success: e,
    fail: n,
    complete: a
  });
};
exports.serverTime = function (t, e, n) {
  if (t === undefined) {
    t = function () {};
  }
  if (e === undefined) {
    e = function () {};
  }
  if (n === undefined) {
    n = function () {};
  }
  o.default.get({
    url: i.DOMAIN + "/common/common/time",
    dataType: "json",
    success: t,
    fail: e,
    complete: n
  });
};