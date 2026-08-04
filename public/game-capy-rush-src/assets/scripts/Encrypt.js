Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Encrypt = undefined;
var o = require("./crypto-js");
var i = function () {
  function t() {
    this.AesKey = "NO8tU0nT0iLQzHzO";
    this.CBCIV = "wt2y0aEzGcu0wTDE";
    this.CBCOptions = {
      iv: o.enc.Utf8.parse(this.CBCIV),
      mode: o.mode.CBC,
      padding: o.pad.Pkcs7
    };
  }
  t.prototype.encrypt = function (t) {
    var e = o.enc.Utf8.parse(this.AesKey);
    var n = o.enc.Utf8.parse(t);
    return o.AES.encrypt(n, e, this.CBCOptions).toString();
  };
  t.prototype.decrypt = function (t) {
    var e = o.enc.Utf8.parse(this.AesKey);
    var n = o.AES.decrypt(t, e, this.CBCOptions);
    return o.enc.Utf8.stringify(n).toString();
  };
  return t;
}();
exports.Encrypt = i;