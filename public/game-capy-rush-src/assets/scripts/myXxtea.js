Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.myXxtea = undefined;
var o = function () {
  function t() {}
  t.prototype.xxtea_encrypt = function (t, e) {
    if (t == "") {
      return "";
    }
    var n = this.str2long(t, true);
    var o = this.str2long(e, false);
    if (typeof t == "string") {
      t = this.toBytes(t);
    }
    if (typeof e == "string") {
      e = this.toBytes(e);
    }
    if (t == null || t.length === 0) {
      return t;
    }
    n = this.toUint32Array(t, true);
    o = this.toUint32Array(e, false);
    for (var i, a, r = n.length - 1, s = n[r], c = n[0], l = Math.floor(6 + 52 / (r + 1)), u = 0; l-- > 0;) {
      a = (u = u + 2654435769 & 4294967295) >>> 2 & 3;
      for (var d = 0; d < r; d++) {
        i = (s >>> 5 ^ (c = n[d + 1]) << 2) + (c >>> 3 ^ s << 4) ^ (u ^ c) + (o[3 & d ^ a] ^ s);
        s = n[d] = n[d] + i & 4294967295;
      }
      i = (s >>> 5 ^ (c = n[0]) << 2) + (c >>> 3 ^ s << 4) ^ (u ^ c) + (o[3 & d ^ a] ^ s);
      s = n[r] = n[r] + i & 4294967295;
    }
    return this.str2Hex(this.long2str(n, false));
  };
  t.prototype.xxtea_decrypt = function (t, e) {
    if (t == "") {
      return "";
    }
    t = this.hex2str(t);
    for (var n, o, i = this.str2long(t, false), a = this.str2long(e, false), r = i.length - 1, s = i[r - 1], c = i[0], l = 2654435769 * Math.floor(6 + 52 / (r + 1)) & 4294967295; l != 0;) {
      o = l >>> 2 & 3;
      for (var u = r; u > 0; u--) {
        n = ((s = i[u - 1]) >>> 5 ^ c << 2) + (c >>> 3 ^ s << 4) ^ (l ^ c) + (a[3 & u ^ o] ^ s);
        c = i[u] = i[u] - n & 4294967295;
      }
      n = ((s = i[r]) >>> 5 ^ c << 2) + (c >>> 3 ^ s << 4) ^ (l ^ c) + (a[3 & u ^ o] ^ s);
      c = i[0] = i[0] - n & 4294967295;
      l = l - 2654435769 & 4294967295;
    }
    var d = this.toUint8Array(i, true);
    return this.toString(d);
  };
  t.prototype.long2str = function (t, e) {
    for (var n = t.length, o = 4294967295 & t[n - 1], i = 0; i < n; i++) {
      t[i] = String.fromCharCode(255 & t[i], t[i] >>> 8 & 255, t[i] >>> 16 & 255, t[i] >>> 24 & 255);
    }
    if (e) {
      return t.join("").substring(0, o);
    } else {
      return t.join("");
    }
  };
  t.prototype.str2long = function (t, e) {
    for (var n = t.length, o = [], i = 0; i < n; i += 4) {
      o[i >> 2] = t.charCodeAt(i) | t.charCodeAt(i + 1) << 8 | t.charCodeAt(i + 2) << 16 | t.charCodeAt(i + 3) << 24;
    }
    if (e) {
      o[o.length] = n;
    }
    return o;
  };
  t.prototype.str2Hex = function (t) {
    var e = "";
    var n = "";
    var o = 0;
    do {
      if ((n = t.charCodeAt(o++).toString(16)).length == 1) {
        n = "0" + n;
      }
      e += n;
    } while (o < t.length);
    return e;
  };
  t.prototype.hex2str = function (t) {
    for (var e = "", n = 0; n < t.length;) {
      var o = parseInt(t.substr(n, 1), 16) << 4 | parseInt(t.substr(++n, 1), 16);
      o &= 255;
      e += String.fromCharCode(o);
      ++n;
    }
    return e;
  };
  t.prototype.toUint32Array = function (t, e) {
    var n;
    var o = t.length;
    var i = o >> 2;
    if ((3 & o) != 0) {
      ++i;
    }
    if (e) {
      (n = new Array(i + 1))[i] = o;
    } else {
      n = new Uint32Array(i);
    }
    for (var a = 0; a < o; ++a) {
      n[a >> 2] |= t[a] << ((3 & a) << 3);
    }
    return n;
  };
  t.prototype.toUint8Array = function (t, e) {
    var n;
    n = e ? t[t.length - 1] : t.length << 2;
    for (var o = new Uint8Array(n), i = 0; i < n; i++) {
      o[i] = t[i >> 2] >> ((3 & i) << 3);
    }
    return o;
  };
  t.prototype.toBytes = function (t) {
    for (var e = t.length, n = new Uint8Array(3 * e), o = 0, i = 0; i < e; i++) {
      var a = t.charCodeAt(i);
      if (a < 128) {
        n[o++] = a;
      } else if (a < 2048) {
        n[o++] = 192 | a >> 6;
        n[o++] = 128 | 63 & a;
      } else {
        if (!(a < 55296 || a > 57343)) {
          if (i + 1 < e) {
            var r = t.charCodeAt(i + 1);
            if (a < 56320 && r >= 56320 && r <= 57343) {
              var s = 65536 + ((1023 & a) << 10 | 1023 & r);
              n[o++] = 240 | s >> 18;
              n[o++] = 128 | s >> 12 & 63;
              n[o++] = 128 | s >> 6 & 63;
              n[o++] = 128 | 63 & s;
              i++;
              continue;
            }
          }
          throw new Error("Malformed string");
        }
        n[o++] = 224 | a >> 12;
        n[o++] = 128 | a >> 6 & 63;
        n[o++] = 128 | 63 & a;
      }
    }
    return n.subarray(0, o);
  };
  t.prototype.toShortString = function (t, e) {
    for (var n = new Array(e), o = 0, i = 0, a = t.length; o < e && i < a; o++) {
      var r = t[i++];
      switch (r >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          n[o] = r;
          break;
        case 12:
        case 13:
          if (!(i < a)) {
            throw new Error("Unfinished UTF-8 octet sequence");
          }
          n[o] = (31 & r) << 6 | 63 & t[i++];
          break;
        case 14:
          if (!(i + 1 < a)) {
            throw new Error("Unfinished UTF-8 octet sequence");
          }
          n[o] = (15 & r) << 12 | (63 & t[i++]) << 6 | 63 & t[i++];
          break;
        case 15:
          if (!(i + 2 < a)) {
            throw new Error("Unfinished UTF-8 octet sequence");
          }
          var s = ((7 & r) << 18 | (63 & t[i++]) << 12 | (63 & t[i++]) << 6 | 63 & t[i++]) - 65536;
          if (!(s >= 0 && s <= 1048575)) {
            throw new Error("Character outside valid Unicode range: 0x" + s.toString(16));
          }
          n[o++] = s >> 10 & 1023 | 55296;
          n[o] = 1023 & s | 56320;
          break;
        default:
          throw new Error("Bad UTF-8 encoding 0x" + r.toString(16));
      }
    }
    if (o < e) {
      n = n.slice(0, o);
    }
    return String.fromCharCode.apply(String, n);
  };
  t.prototype.toLongString = function (t, e) {
    for (var n = [], o = new Array(65535), i = 0, a = 0, r = t.length; i < e && a < r; i++) {
      var s = t[a++];
      switch (s >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          o[i] = s;
          break;
        case 12:
        case 13:
          if (!(a < r)) {
            throw new Error("Unfinished UTF-8 octet sequence");
          }
          o[i] = (31 & s) << 6 | 63 & t[a++];
          break;
        case 14:
          if (!(a + 1 < r)) {
            throw new Error("Unfinished UTF-8 octet sequence");
          }
          o[i] = (15 & s) << 12 | (63 & t[a++]) << 6 | 63 & t[a++];
          break;
        case 15:
          if (!(a + 2 < r)) {
            throw new Error("Unfinished UTF-8 octet sequence");
          }
          var c = ((7 & s) << 18 | (63 & t[a++]) << 12 | (63 & t[a++]) << 6 | 63 & t[a++]) - 65536;
          if (!(c >= 0 && c <= 1048575)) {
            throw new Error("Character outside valid Unicode range: 0x" + c.toString(16));
          }
          o[i++] = c >> 10 & 1023 | 55296;
          o[i] = 1023 & c | 56320;
          break;
        default:
          throw new Error("Bad UTF-8 encoding 0x" + s.toString(16));
      }
      if (i >= 65534) {
        var l = i + 1;
        n.push(String.fromCharCode.apply(String, o.subarray(0, l)));
        e -= l;
        i = -1;
      }
    }
    if (i > 0) {
      n.push(String.fromCharCode.apply(String, o.slice(0, i)));
    }
    return n.join("");
  };
  t.prototype.toString = function (t) {
    var e = t.length;
    if (e === 0) {
      return "";
    } else if (e < 100000) {
      return this.toShortString(t, e);
    } else {
      return this.toLongString(t, e);
    }
  };
  return t;
}();
exports.myXxtea = o;