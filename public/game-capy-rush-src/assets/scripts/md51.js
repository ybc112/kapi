Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.md5 = undefined;
exports.md5 = function (t) {
  function e(t, e) {
    return t << e | t >>> 32 - e;
  }
  function n(t, e) {
    var n;
    var o;
    var i;
    var a;
    var r;
    i = 2147483648 & t;
    a = 2147483648 & e;
    r = (1073741823 & t) + (1073741823 & e);
    if ((n = 1073741824 & t) & (o = 1073741824 & e)) {
      return 2147483648 ^ r ^ i ^ a;
    } else if (n | o) {
      if (1073741824 & r) {
        return 3221225472 ^ r ^ i ^ a;
      } else {
        return 1073741824 ^ r ^ i ^ a;
      }
    } else {
      return r ^ i ^ a;
    }
  }
  function o(t, e, n) {
    return t & e | ~t & n;
  }
  function i(t, e, n) {
    return t & n | e & ~n;
  }
  function a(t, e, n) {
    return t ^ e ^ n;
  }
  function r(t, e, n) {
    return e ^ (t | ~n);
  }
  function s(t, i, a, r, s, c, l) {
    t = n(t, n(n(o(i, a, r), s), l));
    return n(e(t, c), i);
  }
  function c(t, o, a, r, s, c, l) {
    t = n(t, n(n(i(o, a, r), s), l));
    return n(e(t, c), o);
  }
  function l(t, o, i, r, s, c, l) {
    t = n(t, n(n(a(o, i, r), s), l));
    return n(e(t, c), o);
  }
  function u(t, o, i, a, s, c, l) {
    t = n(t, n(n(r(o, i, a), s), l));
    return n(e(t, c), o);
  }
  function d(t) {
    var e;
    var n = "";
    var o = "";
    for (e = 0; e <= 3; e++) {
      n += (o = "0" + (t >>> 8 * e & 255).toString(16)).substr(o.length - 2, 2);
    }
    return n;
  }
  var h;
  var p;
  var f;
  var g;
  var m;
  var y;
  var _;
  var v;
  var C;
  var w;
  w = function (t) {
    for (var e, n = t.length, o = n + 8, i = 16 * ((o - o % 64) / 64 + 1), a = new Array(i - 1), r = 0, s = 0; n > s;) {
      r = s % 4 * 8;
      a[e = (s - s % 4) / 4] = a[e] | t.charCodeAt(s) << r;
      s++;
    }
    r = s % 4 * 8;
    a[e = (s - s % 4) / 4] = a[e] | 128 << r;
    a[i - 2] = n << 3;
    a[i - 1] = n >>> 29;
    return a;
  }(t = function (t) {
    t = t.replace(/\r\n/g, "\n");
    for (var e = "", n = 0; n < t.length; n++) {
      var o = t.charCodeAt(n);
      if (o < 128) {
        e += String.fromCharCode(o);
      } else if (o > 127 && o < 2048) {
        e += String.fromCharCode(o >> 6 | 192);
        e += String.fromCharCode(63 & o | 128);
      } else {
        e += String.fromCharCode(o >> 12 | 224);
        e += String.fromCharCode(o >> 6 & 63 | 128);
        e += String.fromCharCode(63 & o | 128);
      }
    }
    return e;
  }(t));
  y = 1732584193;
  _ = 4023233417;
  v = 2562383102;
  C = 271733878;
  h = 0;
  for (; h < w.length; h += 16) {
    p = y;
    f = _;
    g = v;
    m = C;
    y = s(y, _, v, C, w[h + 0], 7, 3614090360);
    C = s(C, y, _, v, w[h + 1], 12, 3905402710);
    v = s(v, C, y, _, w[h + 2], 17, 606105819);
    _ = s(_, v, C, y, w[h + 3], 22, 3250441966);
    y = s(y, _, v, C, w[h + 4], 7, 4118548399);
    C = s(C, y, _, v, w[h + 5], 12, 1200080426);
    v = s(v, C, y, _, w[h + 6], 17, 2821735955);
    _ = s(_, v, C, y, w[h + 7], 22, 4249261313);
    y = s(y, _, v, C, w[h + 8], 7, 1770035416);
    C = s(C, y, _, v, w[h + 9], 12, 2336552879);
    v = s(v, C, y, _, w[h + 10], 17, 4294925233);
    _ = s(_, v, C, y, w[h + 11], 22, 2304563134);
    y = s(y, _, v, C, w[h + 12], 7, 1804603682);
    C = s(C, y, _, v, w[h + 13], 12, 4254626195);
    v = s(v, C, y, _, w[h + 14], 17, 2792965006);
    y = c(y, _ = s(_, v, C, y, w[h + 15], 22, 1236535329), v, C, w[h + 1], 5, 4129170786);
    C = c(C, y, _, v, w[h + 6], 9, 3225465664);
    v = c(v, C, y, _, w[h + 11], 14, 643717713);
    _ = c(_, v, C, y, w[h + 0], 20, 3921069994);
    y = c(y, _, v, C, w[h + 5], 5, 3593408605);
    C = c(C, y, _, v, w[h + 10], 9, 38016083);
    v = c(v, C, y, _, w[h + 15], 14, 3634488961);
    _ = c(_, v, C, y, w[h + 4], 20, 3889429448);
    y = c(y, _, v, C, w[h + 9], 5, 568446438);
    C = c(C, y, _, v, w[h + 14], 9, 3275163606);
    v = c(v, C, y, _, w[h + 3], 14, 4107603335);
    _ = c(_, v, C, y, w[h + 8], 20, 1163531501);
    y = c(y, _, v, C, w[h + 13], 5, 2850285829);
    C = c(C, y, _, v, w[h + 2], 9, 4243563512);
    v = c(v, C, y, _, w[h + 7], 14, 1735328473);
    y = l(y, _ = c(_, v, C, y, w[h + 12], 20, 2368359562), v, C, w[h + 5], 4, 4294588738);
    C = l(C, y, _, v, w[h + 8], 11, 2272392833);
    v = l(v, C, y, _, w[h + 11], 16, 1839030562);
    _ = l(_, v, C, y, w[h + 14], 23, 4259657740);
    y = l(y, _, v, C, w[h + 1], 4, 2763975236);
    C = l(C, y, _, v, w[h + 4], 11, 1272893353);
    v = l(v, C, y, _, w[h + 7], 16, 4139469664);
    _ = l(_, v, C, y, w[h + 10], 23, 3200236656);
    y = l(y, _, v, C, w[h + 13], 4, 681279174);
    C = l(C, y, _, v, w[h + 0], 11, 3936430074);
    v = l(v, C, y, _, w[h + 3], 16, 3572445317);
    _ = l(_, v, C, y, w[h + 6], 23, 76029189);
    y = l(y, _, v, C, w[h + 9], 4, 3654602809);
    C = l(C, y, _, v, w[h + 12], 11, 3873151461);
    v = l(v, C, y, _, w[h + 15], 16, 530742520);
    y = u(y, _ = l(_, v, C, y, w[h + 2], 23, 3299628645), v, C, w[h + 0], 6, 4096336452);
    C = u(C, y, _, v, w[h + 7], 10, 1126891415);
    v = u(v, C, y, _, w[h + 14], 15, 2878612391);
    _ = u(_, v, C, y, w[h + 5], 21, 4237533241);
    y = u(y, _, v, C, w[h + 12], 6, 1700485571);
    C = u(C, y, _, v, w[h + 3], 10, 2399980690);
    v = u(v, C, y, _, w[h + 10], 15, 4293915773);
    _ = u(_, v, C, y, w[h + 1], 21, 2240044497);
    y = u(y, _, v, C, w[h + 8], 6, 1873313359);
    C = u(C, y, _, v, w[h + 15], 10, 4264355552);
    v = u(v, C, y, _, w[h + 6], 15, 2734768916);
    _ = u(_, v, C, y, w[h + 13], 21, 1309151649);
    y = u(y, _, v, C, w[h + 4], 6, 4149444226);
    C = u(C, y, _, v, w[h + 11], 10, 3174756917);
    v = u(v, C, y, _, w[h + 2], 15, 718787259);
    _ = u(_, v, C, y, w[h + 9], 21, 3951481745);
    y = n(y, p);
    _ = n(_, f);
    v = n(v, g);
    C = n(C, m);
  }
  return (d(y) + d(_) + d(v) + d(C)).toLowerCase();
};