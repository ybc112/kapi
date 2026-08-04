Object.defineProperty(exports, "__esModule", {
  value: true
});
var t = function () {
  function _() {
    this.poolMap = {};
  }
  _.prototype.get = function (_, o) {
    var e = null;
    var t = this.poolMap[o];
    (e = t && t.size() ? t.get() : cc.instantiate(_)).active = true;
    return e;
  };
  _.prototype.put = function (_, o) {
    _.active = false;
    var e = this.poolMap[o];
    if (e) {
      e.put(_);
    } else {
      var t = new cc.NodePool();
      this.poolMap[o] = t;
      t.put(_);
    }
  };
  _.prototype.clear = function (_) {
    if (this.poolMap[_]) {
      this.poolMap[_].clear();
      delete this.poolMap[_];
    }
  };
  return _;
}();
exports.default = t;