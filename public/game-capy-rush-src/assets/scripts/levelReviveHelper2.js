Object.defineProperty(exports, "__esModule", {
  value: true
});
var t = function () {
  function _() {}
  _.levelFailEvent = function (_, o) {
    cc.game.emit("levelFailEvent", _, o);
  };
  return _;
}();
exports.default = t;