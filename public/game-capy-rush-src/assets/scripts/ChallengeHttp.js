var o = this && this.__awaiter || function (t, e, n, o) {
  return new (n || (n = Promise))(function (i, a) {
    function r(t) {
      try {
        c(o.next(t));
      } catch (e) {
        a(e);
      }
    }
    function s(t) {
      try {
        c(o.throw(t));
      } catch (e) {
        a(e);
      }
    }
    function c(t) {
      var e;
      if (t.done) {
        i(t.value);
      } else {
        (e = t.value, e instanceof n ? e : new n(function (t) {
          t(e);
        })).then(r, s);
      }
    }
    c((o = o.apply(t, e || [])).next());
  });
};
var i = this && this.__generator || function (t, e) {
  var n;
  var o;
  var i;
  var a;
  var r = {
    label: 0,
    sent: function () {
      if (1 & i[0]) {
        throw i[1];
      }
      return i[1];
    },
    trys: [],
    ops: []
  };
  a = {
    next: s(0),
    throw: s(1),
    return: s(2)
  };
  if (typeof Symbol == "function") {
    a[Symbol.iterator] = function () {
      return this;
    };
  }
  return a;
  function s(t) {
    return function (e) {
      return c([t, e]);
    };
  }
  function c(a) {
    if (n) {
      throw new TypeError("Generator is already executing.");
    }
    for (; r;) {
      try {
        n = 1;
        if (o && (i = 2 & a[0] ? o.return : a[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, a[1])).done) {
          return i;
        }
        o = 0;
        if (i) {
          a = [2 & a[0], i.value];
        }
        switch (a[0]) {
          case 0:
          case 1:
            i = a;
            break;
          case 4:
            r.label++;
            return {
              value: a[1],
              done: false
            };
          case 5:
            r.label++;
            o = a[1];
            a = [0];
            continue;
          case 7:
            a = r.ops.pop();
            r.trys.pop();
            continue;
          default:
            if (!(i = (i = r.trys).length > 0 && i[i.length - 1]) && (a[0] === 6 || a[0] === 2)) {
              r = 0;
              continue;
            }
            if (a[0] === 3 && (!i || a[1] > i[0] && a[1] < i[3])) {
              r.label = a[1];
              break;
            }
            if (a[0] === 6 && r.label < i[1]) {
              r.label = i[1];
              i = a;
              break;
            }
            if (i && r.label < i[2]) {
              r.label = i[2];
              r.ops.push(a);
              break;
            }
            if (i[2]) {
              r.ops.pop();
            }
            r.trys.pop();
            continue;
        }
        a = e.call(t, r);
      } catch (s) {
        a = [6, s];
        o = 0;
      } finally {
        n = i = 0;
      }
    }
    if (5 & a[0]) {
      throw a[1];
    }
    return {
      value: a[0] ? a[1] : undefined,
      done: true
    };
  }
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.challengeHttp = undefined;
var a = require("./ManageCtl");
var r = require("./MyPlatform");
var s = require("./Md5");
var c = "https://op-data.zuiqiangyingyu.net/";
var l = function () {
  function t() {}
  t.prototype.getRank = function (t, e) {
    var n = this;
    if (e === undefined) {
      e = "1";
    }
    return new Promise(function (a) {
      return o(n, undefined, undefined, function () {
        var n;
        var o;
        var s;
        return i(this, function (i) {
          switch (i.label) {
            case 0:
              (n = {
                app_name: r.default.BMS_APP_NAME,
                rank_name: t,
                page_size: "100",
                page: e,
                timestamp: Math.floor(new Date().getTime() / 1000),
                nonce: this.randomString(32)
              }).sign = this.getSign(n);
              return [4, this.post(c + "common/rank/list", n)];
            case 1:
              o = i.sent();
              try {
                s = JSON.parse(o);
                a(s.data);
              } catch (l) {
                a({
                  list: [],
                  total: 0
                });
              }
              return [2];
          }
        });
      });
    });
  };
  t.prototype.setRank = function (t, e) {
    var n = this;
    var s = "";
    if ((r.default.isZJTD || a.ManageCtl.isWx()) && window.ywkjTT_openidStr) {
      s = window.ywkjTT_openidStr;
    }
    if (s != "") {
      return new Promise(function (a) {
        return o(n, undefined, undefined, function () {
          var n;
          var o;
          var l;
          return i(this, function (i) {
            switch (i.label) {
              case 0:
                (n = {
                  app_name: r.default.BMS_APP_NAME,
                  rank_name: t,
                  key: s,
                  score: e,
                  timestamp: Math.floor(new Date().getTime() / 1000),
                  nonce: this.randomString(32)
                }).sign = this.getSign(n);
                return [4, this.post(c + "common/rank/set-score", n)];
              case 1:
                o = i.sent();
                try {
                  l = JSON.parse(o);
                  a(l.data);
                } catch (u) {
                  a({
                    list: [],
                    total: 0
                  });
                }
                return [2];
            }
          });
        });
      });
    }
  };
  t.prototype.incrRank = function (t, e) {
    var n = this;
    if (e === undefined) {
      e = 1;
    }
    var s = "";
    if ((r.default.isZJTD || a.ManageCtl.isWx()) && window.ywkjTT_openidStr) {
      s = window.ywkjTT_openidStr;
    }
    if (s != "") {
      return new Promise(function (a) {
        return o(n, undefined, undefined, function () {
          var n;
          var o;
          var l;
          return i(this, function (i) {
            switch (i.label) {
              case 0:
                (n = {
                  app_name: r.default.BMS_APP_NAME,
                  rank_name: t,
                  key: s,
                  score: e,
                  timestamp: Math.floor(new Date().getTime() / 1000),
                  nonce: this.randomString(32)
                }).sign = this.getSign(n);
                return [4, this.post(c + "common/rank/incr-score", n)];
              case 1:
                o = i.sent();
                try {
                  l = JSON.parse(o);
                  a(l.data);
                } catch (u) {
                  a({
                    list: [],
                    total: 0
                  });
                }
                return [2];
            }
          });
        });
      });
    }
  };
  t.prototype.getServerTime = function () {
    var t = this;
    return new Promise(function (e) {
      return o(t, undefined, undefined, function () {
        var t;
        var n;
        return i(this, function (o) {
          switch (o.label) {
            case 0:
              return [4, this.get("https://game.zuiqiangyingyu.net/common/common/time", {})];
            case 1:
              t = o.sent();
              try {
                n = JSON.parse(t);
                e(n.data && n.data.date_time || new Date().toString());
              } catch (i) {
                e(new Date().toString());
              }
              return [2];
          }
        });
      });
    });
  };
  t.prototype.randomString = function (t) {
    t = t || 32;
    for (var e = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyzoOLl9gqVvUuI12345678_", n = e.length, o = "", i = 0; i < t; i++) {
      o += e.charAt(Math.floor(Math.random() * n));
    }
    return o;
  };
  t.prototype.getSign = function (t) {
    var e = [];
    for (var n in t) {
      e.push(n);
    }
    e = e.sort();
    var o = "";
    e.forEach(function (n, i) {
      o += n + "=" + t[n] + (i == e.length - 1 ? "" : "&");
    });
    o += "VuFFap7NHJA70M9xWb9fSQcdVtivPY4E";
    return new s.Md5().md5(o);
  };
  t.prototype.formatPostData = function (t) {
    var e = [];
    for (var n in t) {
      e.push(n);
    }
    e = e.sort();
    var o = "";
    e.forEach(function (n, i) {
      o += n + "=" + t[n] + (i == e.length - 1 ? "" : "&");
    });
    return o;
  };
  t.prototype.get = function (t, e) {
    return new Promise(function (n) {
      t += "?";
      for (var o in e) {
        t += o + "=" + e[o] + "&";
      }
      var i = new XMLHttpRequest();
      i.onreadystatechange = function () {
        if (i.readyState == 4) {
          if (i.status >= 200 && i.status < 400) {
            n(i.response);
          } else {
            n(null);
          }
        }
      };
      i.open("GET", t);
      i.send();
      i.onerror = function () {
        n(null);
      };
      i.ontimeout = function () {
        n(null);
      };
    });
  };
  t.prototype.post = function (t, e) {
    var n = this;
    return new Promise(function (o) {
      var i = new XMLHttpRequest();
      i.onreadystatechange = function () {
        if (i.readyState == 4) {
          if (i.status >= 200 && i.status < 400) {
            o(i.response);
          } else {
            o(null);
          }
        }
      };
      i.open("POST", t);
      i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      i.send(n.formatPostData(e));
      i.onerror = function () {
        o(null);
      };
      i.ontimeout = function () {
        o(null);
      };
    });
  };
  t.prototype.request = function (t, e, n) {
    switch (t) {
      case "GET":
        return this.get(e, n);
      case "POST":
        return this.post(e, n);
    }
  };
  return t;
}();
exports.challengeHttp = new l();