Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = require("./ManageCtl");
var i = function () {
  function t() {
    this._btnClickList = {};
  }
  t.prototype.baseBtnClick = function (t, e) {
    var n = this;
    if (e === undefined) {
      e = 1;
    }
    o.ManageCtl.persistRootNode.playBtnSound();
    return !this._btnClickList[t] && (this._btnClickList[t] = {}, setTimeout(function () {
      n._btnClickList[t] = null;
    }, 1000 * e), true);
  };
  t.instance = null;
  return t;
}();
exports.default = i;
i.instance = new i();