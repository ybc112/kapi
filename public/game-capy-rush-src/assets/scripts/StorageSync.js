Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = function () {
  function t() {}
  t.getItem = function (t) {
    if (window.tt || window.ks) {
      return window.wxapi.getStorageSync(t);
    }
  };
  t.setItem = function (t, e) {
    if (window.tt || window.ks) {
      return window.wxapi.setStorageSync(t, e);
    }
  };
  t.removeItem = function (t) {
    if (window.tt || window.ks) {
      return window.wxapi.removeStorageSync(t);
    }
  };
  return t;
}();
exports.default = o;