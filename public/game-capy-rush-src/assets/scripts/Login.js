Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = function () {
  function t() {}
  t.prototype.login = function (t) {
    if (window.tt || window.ks || window.wx) {
      window.wxapi.login(t);
    }
  };
  return t;
}();
exports.default = new o();