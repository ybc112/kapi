Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = require("./StorageSync");
var i = function () {
  function t() {}
  t.getItem = function (t) {
    if (window.localStorage === undefined) {
      return o.default.getItem(t);
    } else {
      return window.localStorage.getItem(t);
    }
  };
  t.setItem = function (t, e) {
    if (window.localStorage === undefined) {
      return o.default.setItem(t, e);
    } else {
      return window.localStorage.setItem(t, e);
    }
  };
  t.removeItem = function (t) {
    if (window.localStorage === undefined) {
      return o.default.removeItem(t);
    } else {
      return window.localStorage.removeItem(t);
    }
  };
  return t;
}();
exports.default = i;