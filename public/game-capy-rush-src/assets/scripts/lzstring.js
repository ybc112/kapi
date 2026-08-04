var n = function () {
  var t = String.fromCharCode;
  var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
  var o = {};
  function i(t, e) {
    if (!o[t]) {
      o[t] = {};
      for (var n = 0; n < t.length; n++) {
        o[t][t.charAt(n)] = n;
      }
    }
    return o[t][e];
  }
  var a = {
    compressToBase64: function (t) {
      if (t == null) {
        return "";
      }
      var n = a._compress(t, 6, function (t) {
        return e.charAt(t);
      });
      switch (n.length % 4) {
        default:
        case 0:
          return n;
        case 1:
          return n + "===";
        case 2:
          return n + "==";
        case 3:
          return n + "=";
      }
    },
    decompressFromBase64: function (t) {
      if (t == null) {
        return "";
      } else if (t == "") {
        return null;
      } else {
        return a._decompress(t.length, 32, function (n) {
          return i(e, t.charAt(n));
        });
      }
    },
    compressToUTF16: function (e) {
      if (e == null) {
        return "";
      } else {
        return a._compress(e, 15, function (e) {
          return t(e + 32);
        }) + " ";
      }
    },
    decompressFromUTF16: function (t) {
      if (t == null) {
        return "";
      } else if (t == "") {
        return null;
      } else {
        return a._decompress(t.length, 16384, function (e) {
          return t.charCodeAt(e) - 32;
        });
      }
    },
    compressToUint8Array: function (t) {
      for (var e = a.compress(t), n = new Uint8Array(2 * e.length), o = 0, i = e.length; o < i; o++) {
        var r = e.charCodeAt(o);
        n[2 * o] = r >>> 8;
        n[2 * o + 1] = r % 256;
      }
      return n;
    },
    decompressFromUint8Array: function (e) {
      if (e == null) {
        return a.decompress(e);
      }
      for (var n = new Array(e.length / 2), o = 0, i = n.length; o < i; o++) {
        n[o] = 256 * e[2 * o] + e[2 * o + 1];
      }
      var r = [];
      n.forEach(function (e) {
        r.push(t(e));
      });
      return a.decompress(r.join(""));
    },
    compressToEncodedURIComponent: function (t) {
      if (t == null) {
        return "";
      } else {
        return a._compress(t, 6, function (t) {
          return n.charAt(t);
        });
      }
    },
    decompressFromEncodedURIComponent: function (t) {
      if (t == null) {
        return "";
      } else if (t == "") {
        return null;
      } else {
        t = t.replace(/ /g, "+");
        return a._decompress(t.length, 32, function (e) {
          return i(n, t.charAt(e));
        });
      }
    },
    compress: function (e) {
      return a._compress(e, 16, function (e) {
        return t(e);
      });
    },
    _compress: function (t, e, n) {
      if (t == null) {
        return "";
      }
      var o;
      var i;
      var a;
      var r = {};
      var s = {};
      var c = "";
      var l = "";
      var u = "";
      var d = 2;
      var h = 3;
      var p = 2;
      var f = [];
      var g = 0;
      var m = 0;
      for (a = 0; a < t.length; a += 1) {
        c = t.charAt(a);
        if (!Object.prototype.hasOwnProperty.call(r, c)) {
          r[c] = h++;
          s[c] = true;
        }
        l = u + c;
        if (Object.prototype.hasOwnProperty.call(r, l)) {
          u = l;
        } else {
          if (Object.prototype.hasOwnProperty.call(s, u)) {
            if (u.charCodeAt(0) < 256) {
              for (o = 0; o < p; o++) {
                g <<= 1;
                if (m == e - 1) {
                  m = 0;
                  f.push(n(g));
                  g = 0;
                } else {
                  m++;
                }
              }
              i = u.charCodeAt(0);
              o = 0;
              for (; o < 8; o++) {
                g = g << 1 | 1 & i;
                if (m == e - 1) {
                  m = 0;
                  f.push(n(g));
                  g = 0;
                } else {
                  m++;
                }
                i >>= 1;
              }
            } else {
              i = 1;
              o = 0;
              for (; o < p; o++) {
                g = g << 1 | i;
                if (m == e - 1) {
                  m = 0;
                  f.push(n(g));
                  g = 0;
                } else {
                  m++;
                }
                i = 0;
              }
              i = u.charCodeAt(0);
              o = 0;
              for (; o < 16; o++) {
                g = g << 1 | 1 & i;
                if (m == e - 1) {
                  m = 0;
                  f.push(n(g));
                  g = 0;
                } else {
                  m++;
                }
                i >>= 1;
              }
            }
            if (--d == 0) {
              d = Math.pow(2, p);
              p++;
            }
            delete s[u];
          } else {
            i = r[u];
            o = 0;
            i = r[u];
            o = 0;
            for (; o < p; o++) {
              g = g << 1 | 1 & i;
              if (m == e - 1) {
                m = 0;
                f.push(n(g));
                g = 0;
              } else {
                m++;
              }
              i >>= 1;
            }
          }
          if (--d == 0) {
            d = Math.pow(2, p);
            p++;
          }
          r[l] = h++;
          u = String(c);
        }
      }
      if (u !== "") {
        if (Object.prototype.hasOwnProperty.call(s, u)) {
          if (u.charCodeAt(0) < 256) {
            for (o = 0; o < p; o++) {
              g <<= 1;
              if (m == e - 1) {
                m = 0;
                f.push(n(g));
                g = 0;
              } else {
                m++;
              }
            }
            i = u.charCodeAt(0);
            o = 0;
            for (; o < 8; o++) {
              g = g << 1 | 1 & i;
              if (m == e - 1) {
                m = 0;
                f.push(n(g));
                g = 0;
              } else {
                m++;
              }
              i >>= 1;
            }
          } else {
            i = 1;
            o = 0;
            for (; o < p; o++) {
              g = g << 1 | i;
              if (m == e - 1) {
                m = 0;
                f.push(n(g));
                g = 0;
              } else {
                m++;
              }
              i = 0;
            }
            i = u.charCodeAt(0);
            o = 0;
            for (; o < 16; o++) {
              g = g << 1 | 1 & i;
              if (m == e - 1) {
                m = 0;
                f.push(n(g));
                g = 0;
              } else {
                m++;
              }
              i >>= 1;
            }
          }
          if (--d == 0) {
            d = Math.pow(2, p);
            p++;
          }
          delete s[u];
        } else {
          i = r[u];
          o = 0;
          i = r[u];
          o = 0;
          for (; o < p; o++) {
            g = g << 1 | 1 & i;
            if (m == e - 1) {
              m = 0;
              f.push(n(g));
              g = 0;
            } else {
              m++;
            }
            i >>= 1;
          }
        }
        if (--d == 0) {
          d = Math.pow(2, p);
          p++;
        }
      }
      i = 2;
      o = 0;
      for (; o < p; o++) {
        g = g << 1 | 1 & i;
        if (m == e - 1) {
          m = 0;
          f.push(n(g));
          g = 0;
        } else {
          m++;
        }
        i >>= 1;
      }
      for (;;) {
        g <<= 1;
        if (m == e - 1) {
          f.push(n(g));
          break;
        }
        m++;
      }
      return f.join("");
    },
    decompress: function (t) {
      if (t == null) {
        return "";
      } else if (t == "") {
        return null;
      } else {
        return a._decompress(t.length, 32768, function (e) {
          return t.charCodeAt(e);
        });
      }
    },
    _decompress: function (e, n, o) {
      var i;
      var a;
      var r;
      var s;
      var c;
      var l;
      var u;
      var d = [];
      var h = 4;
      var p = 4;
      var f = 3;
      var g = "";
      var m = [];
      var y = {
        val: o(0),
        position: n,
        index: 1
      };
      for (i = 0; i < 3; i += 1) {
        d[i] = i;
      }
      r = 0;
      c = Math.pow(2, 2);
      l = 1;
      for (; l != c;) {
        s = y.val & y.position;
        y.position >>= 1;
        if (y.position == 0) {
          y.position = n;
          y.val = o(y.index++);
        }
        r |= (s > 0 ? 1 : 0) * l;
        l <<= 1;
      }
      switch (r) {
        case 0:
          r = 0;
          c = Math.pow(2, 8);
          l = 1;
          for (; l != c;) {
            s = y.val & y.position;
            y.position >>= 1;
            if (y.position == 0) {
              y.position = n;
              y.val = o(y.index++);
            }
            r |= (s > 0 ? 1 : 0) * l;
            l <<= 1;
          }
          u = t(r);
          break;
        case 1:
          r = 0;
          c = Math.pow(2, 16);
          l = 1;
          for (; l != c;) {
            s = y.val & y.position;
            y.position >>= 1;
            if (y.position == 0) {
              y.position = n;
              y.val = o(y.index++);
            }
            r |= (s > 0 ? 1 : 0) * l;
            l <<= 1;
          }
          u = t(r);
          break;
        case 2:
          return "";
      }
      d[3] = u;
      a = u;
      m.push(u);
      for (;;) {
        if (y.index > e) {
          return "";
        }
        r = 0;
        c = Math.pow(2, f);
        l = 1;
        for (; l != c;) {
          s = y.val & y.position;
          y.position >>= 1;
          if (y.position == 0) {
            y.position = n;
            y.val = o(y.index++);
          }
          r |= (s > 0 ? 1 : 0) * l;
          l <<= 1;
        }
        switch (u = r) {
          case 0:
            r = 0;
            c = Math.pow(2, 8);
            l = 1;
            for (; l != c;) {
              s = y.val & y.position;
              y.position >>= 1;
              if (y.position == 0) {
                y.position = n;
                y.val = o(y.index++);
              }
              r |= (s > 0 ? 1 : 0) * l;
              l <<= 1;
            }
            d[p++] = t(r);
            u = p - 1;
            h--;
            break;
          case 1:
            r = 0;
            c = Math.pow(2, 16);
            l = 1;
            for (; l != c;) {
              s = y.val & y.position;
              y.position >>= 1;
              if (y.position == 0) {
                y.position = n;
                y.val = o(y.index++);
              }
              r |= (s > 0 ? 1 : 0) * l;
              l <<= 1;
            }
            d[p++] = t(r);
            u = p - 1;
            h--;
            break;
          case 2:
            return m.join("");
        }
        if (h == 0) {
          h = Math.pow(2, f);
          f++;
        }
        if (d[u]) {
          g = d[u];
        } else {
          if (u !== p) {
            return null;
          }
          g = a + a.charAt(0);
        }
        m.push(g);
        d[p++] = a + g.charAt(0);
        a = g;
        if (--h == 0) {
          h = Math.pow(2, f);
          f++;
        }
      }
    }
  };
  return a;
}();
if (typeof define == "function" && define.amd) {
  define(function () {
    return n;
  });
} else if (module !== undefined && module != null) {
  module.exports = n;
}