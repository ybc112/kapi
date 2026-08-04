Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = function () {
  function t() {
    this._msgMap = {};
  }
  t.GetInstance = function () {
    if (!t.instance) {
      t.instance = new t();
    }
    return this.instance;
  };
  t.prototype.on = function (t, e, n) {
    if (!this._msgMap[t]) {
      this._msgMap[t] = [];
    }
    this._msgMap[t].push({
      caller: n,
      func: e
    });
  };
  t.prototype.off = function (t, e, n) {
    if (this._msgMap[t]) {
      for (var o = this._msgMap[t], i = 0; i < o.length; i++) {
        var a = o[i];
        if (a.caller == n && a.func == e) {
          o.splice(i, 1);
          break;
        }
      }
      if (o.length <= 0) {
        this._msgMap[t] = null;
      }
    }
  };
  t.prototype.emit = function (t, e, n, o, i, a) {
    if (this._msgMap[t]) {
      for (var r = this._msgMap[t], s = 0; s < r.length; s++) {
        var c = r[s];
        c.func.call(c.caller, e, n, o, i, a);
      }
    }
  };
  t.instance = null;
  return t;
}();
exports.default = o;