Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = function () {
  function t() {}
  t.prototype.hide = function (t) {
    if (window.tt || window.ks) {
      window.wxapi.onHide(t);
    }
  };
  return t;
}();
exports.default = new o();