Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = require("./LocalStorage");
var i = new (function () {
  function t() {
    this._list = [];
    this._storageKey = "sdk_report_list";
    var t = o.default.getItem(this._storageKey);
    this._list = t ? JSON.parse(t) : [];
  }
  t.prototype.push = function (t) {
    var e = this._list.push(t);
    this.refeshStorage();
    return e;
  };
  t.prototype.pop = function () {
    var t = this._list.shift();
    this.refeshStorage();
    return t;
  };
  t.prototype.range = function (t, e) {
    var n = this._list.splice(t, e);
    this.refeshStorage();
    return n;
  };
  t.prototype.refeshStorage = function () {
    var t = JSON.stringify(this._list);
    return o.default.setItem(this._storageKey, t);
  };
  t.prototype.len = function () {
    return this._list.length;
  };
  t.prototype.getList = function () {
    return this._list;
  };
  return t;
}())();
exports.default = i;