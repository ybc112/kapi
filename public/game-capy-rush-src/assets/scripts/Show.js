Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = function () {
  function t() {}
  t.prototype.show = function (t) {
    if (window.tt || window.ks) {
      window.wxapi.onShow(t);
    }
  };
  return t;
}();
exports.default = new o();