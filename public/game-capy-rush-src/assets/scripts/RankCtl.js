Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = function () {
  function t() {
    this.testFalg = false;
    this._dataType = 0;
  }
  t.GetInstance = function () {
    if (!t.instance) {
      t.instance = new t();
    }
    return this.instance;
  };
  t.prototype.sendRankData = function (t) {
    if (window.tt) {
      var e = window.tt;
      if (e.setImRankData) {
        var n = this.testFalg ? "test" : "default";
        e.setImRankData({
          dataType: this._dataType,
          value: t.toString(),
          priority: 0,
          extra: "extra",
          zoneId: n,
          success: function (t) {
            console.log("## setImRankData success res: ", JSON.stringify(t));
          },
          fail: function (t) {
            console.log("## setImRankData fail res: ", JSON.stringify(t));
          }
        });
      }
    }
  };
  t.prototype.showRankList = function () {
    if (window.tt && window.game_loginDone) {
      var t = window.tt;
      if (t.getImRankList) {
        var e = this.testFalg ? "test" : "default";
        t.getImRankList({
          relationType: "default",
          dataType: this._dataType,
          rankType: "month",
          suffix: "关",
          rankTitle: "通关排行榜",
          zoneId: e,
          success: function (t) {
            console.log("## getImRankData success res: ", JSON.stringify(t));
          },
          fail: function (t) {
            console.log("## getImRankData fail res: ", JSON.stringify(t));
          }
        });
      }
    }
  };
  t.instance = null;
  return t;
}();
exports.default = o;