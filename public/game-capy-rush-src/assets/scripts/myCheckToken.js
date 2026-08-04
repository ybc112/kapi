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
var a = require("./Encrypt");
var r = function () {
  function t() {
    this.ss0 = "https://ga";
    this.ss1 = "me.zu";
    this.ss2 = "iqiangyin";
    this.ss3 = "gyu.net/";
    this._randomStr = null;
    this._encryptUtils = null;
    this._encrXToken = "";
    this._JSONP_CHECK = "";
  }
  t.GetInstance = function () {
    if (!t.instance) {
      t.instance = new t();
    }
    return this.instance;
  };
  t.prototype.init = function () {
    return o(this, undefined, Promise, function () {
      var t;
      var e;
      var n;
      var o = this;
      return i(this, function (i) {
        switch (i.label) {
          case 0:
            this.server = this.ss0 + this.ss1 + this.ss2 + this.ss3;
            t = [99, 111, 109, 104, 101, 105, 115, 107, 47, 110];
            e = [8, 0, 1, 2, 2, 1, 9, 8, 0, 3, 4, 0, 7, 8, 5, 6];
            this._JSONP_CHECK = "";
            e.forEach(function (e) {
              o._JSONP_CHECK += String.fromCharCode(t[e]);
            });
            this._encryptUtils = new a.Encrypt();
            this._randomStr = this.randomString(32);
            n = (n = (n = this._encryptUtils.encrypt(this._randomStr)).replace(/\+/g, "_")).replace(/\//g, "-");
            this._encrXToken = n;
            return [4, this.jsonpCheck(n)];
          case 1:
            i.sent();
            return [2];
        }
      });
    });
  };
  t.prototype.randomString = function (t) {
    t = t || 32;
    for (var e = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyzoOLl9gqVvUuI12345678", n = e.length, o = "", i = 0; i < t; i++) {
      o += e.charAt(Math.floor(Math.random() * n));
    }
    return o;
  };
  t.prototype.jsonpCheck = function (t) {
    var e = this;
    return new Promise(function (n) {
      return o(e, undefined, undefined, function () {
        var e;
        var o;
        var a;
        return i(this, function (i) {
          switch (i.label) {
            case 0:
              return [4, this.request("GET", this.server + this._JSONP_CHECK, {
                token: t
              })];
            case 1:
              if (e = i.sent()) {
                try {
                  o = JSON.parse(e);
                  console.log("info", o);
                  if (o.code == 0) {
                    a = this._encryptUtils.decrypt(o.data.di);
                    a = JSON.parse(a);
                    console.log("res", a);
                    console.log("x_token", a.x_token);
                    console.log("randomStr", this._randomStr);
                    if (a.x_token == this._randomStr) {
                      n();
                    } else {
                      cc.game.end();
                      window.wrongful = true;
                      cc.game.emit("showEndView");
                    }
                  } else {
                    cc.game.end();
                    window.wrongful = true;
                    cc.game.emit("showEndView");
                  }
                  n();
                } catch (r) {
                  console.log("## ", JSON.stringify(r));
                  cc.game.end();
                  window.wrongful = true;
                  cc.game.emit("showEndView");
                  n();
                }
              } else {
                n();
              }
              return [2];
          }
        });
      });
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
  t.prototype.get = function (t, e) {
    var n = this;
    return new Promise(function (o) {
      t += "?";
      for (var i in e) {
        t += i + "=" + e[i] + "&";
      }
      var a = new XMLHttpRequest();
      a.onreadystatechange = function () {
        if (a.readyState == 4) {
          if (a.status >= 200 && a.status < 400) {
            o(a.response);
          } else {
            o(null);
          }
        }
      };
      a.open("GET", t);
      a.setRequestHeader("x-token", n._encrXToken);
      a.send();
      a.onerror = function () {
        cc.game.end();
        window.wrongful = true;
        cc.game.emit("showEndView");
        o(null);
      };
      a.ontimeout = function () {
        o(null);
        window.wrongful = true;
        cc.game.emit("showEndView");
      };
    });
  };
  t.prototype.post = function () {
    return new Promise(function (t) {
      return t(1);
    });
  };
  t.instance = null;
  return t;
}();
exports.default = r;