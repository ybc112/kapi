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
var a = require("./MyPlatform");
var r = function () {
  function t() {
    this.API_GETDATA = "common/game-data/multi-get";
    this.API_GETAllDATA = "common/game-data/multi-user-multi-get";
    this.API_SETDATA = "common/game-data/save";
    this.getDataDoneFlag = false;
  }
  t.GetInstance = function () {
    if (!t.instance) {
      t.instance = new t();
    }
    return this.instance;
  };
  t.prototype.checkGetServerData = function () {
    if (window.ywkjTT_openidStr && window.ywkjTT_openidStr != "null") {
      var t = a.default.BMS_APP_NAME;
      var e = window.ywkjTT_openidStr;
      if (e && e != "") {
        this.getServerData(t, e, "userInfo3");
      }
    }
  };
  t.prototype.checkSaveServerData = function (t, e, n) {
    if (n === undefined) {
      n = true;
    }
    if (window.ywkjTT_openidStr && window.ywkjTT_openidStr != "null") {
      var o = a.default.BMS_APP_NAME;
      var i = window.ywkjTT_openidStr;
      this.saveServerData(o, i, t, e, n);
    }
  };
  t.prototype.getServerData = function (t, e, n) {
    var o = this;
    this.httpRequest("https://game.zuiqiangyingyu.net/" + this.API_GETDATA, {
      app_name: t,
      uuid: e,
      d_keys: n
    }, function (t) {
      if (t && t.data && t.data.data) {
        var e = t.data.data;
        if (e) {
          o.getDataDoneFlag = true;
          console.log("## getServerData getData: ", JSON.stringify(e));
        }
      }
    }, false, "GET");
  };
  t.prototype.getAllServerData = function (t, e, n) {
    var a = this;
    return new Promise(function (r) {
      return o(a, undefined, undefined, function () {
        var o;
        return i(this, function (i) {
          switch (i.label) {
            case 0:
              return [4, this.httpPost("https://game.zuiqiangyingyu.net/" + this.API_GETAllDATA, {
                app_name: t,
                uuids: e,
                d_keys: n
              })];
            case 1:
              o = i.sent();
              console.log("##  getAllServerData", o);
              try {
                if (o && o.data) {
                  r(o.data);
                } else {
                  r([]);
                }
              } catch (a) {
                r([]);
              }
              return [2];
          }
        });
      });
    });
  };
  t.prototype.saveServerData = function (t, e, n, a, r) {
    var s = this;
    if (r === undefined) {
      r = true;
    }
    if (r && !this.getDataDoneFlag) {
      return new Promise(function (t) {
        t(null);
      });
    } else {
      return new Promise(function (r) {
        return o(s, undefined, undefined, function () {
          var o;
          var s;
          return i(this, function (i) {
            switch (i.label) {
              case 0:
                return [4, this.httpPost("https://game.zuiqiangyingyu.net/" + this.API_SETDATA, {
                  app_name: t,
                  uuid: e,
                  d_key: n,
                  d_data: a
                })];
              case 1:
                o = i.sent();
                console.log("[BMS] 参数", o);
                if (o) {
                  try {
                    s = JSON.parse(o);
                    console.log("##  saveServerData ", JSON.stringify(s));
                    s = s.data;
                    r(s);
                  } catch (c) {
                    r({});
                  }
                } else {
                  r({});
                }
                return [2];
            }
          });
        });
      });
    }
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
    return new Promise(function (n) {
      var o = new XMLHttpRequest();
      o.onreadystatechange = function () {
        if (o.readyState == 4) {
          if (o.status >= 200 && o.status < 400) {
            n(o.response);
          } else {
            n(null);
          }
        }
      };
      o.open("POST", t);
      o.send(JSON.stringify(e));
      o.onerror = function () {
        n(null);
      };
      o.ontimeout = function () {
        n(null);
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
  t.prototype.httpRequest = function (t, e, n, o, i, a) {
    if (n === undefined) {
      n = function () {};
    }
    if (o === undefined) {
      o = false;
    }
    if (i === undefined) {
      i = "POST";
    }
    if (a === undefined) {
      a = false;
    }
    this.Get(t, e, n);
  };
  t.prototype.Get = function (t, e, n) {
    t += "?";
    var o = "";
    for (var i in e) {
      o += i + "=" + e[i] + "&";
    }
    var a = new XMLHttpRequest();
    a.onreadystatechange = function () {
      if (a.readyState == 4) {
        if (a.status >= 200 && a.status < 400) {
          var t = a.responseText;
          if (t) {
            var e = JSON.parse(t);
            n({
              data: e
            });
          } else {
            n(false);
          }
        } else {
          n(false);
        }
      }
    };
    a.open("GET", t + o, true);
    a.send();
  };
  t.prototype.httpPost = function (t, e, n) {
    var o = this;
    if (n === undefined) {
      n = "json";
    }
    return new Promise(function (i, a) {
      var r;
      var s = new XMLHttpRequest();
      s.open("POST", t, true);
      s.onreadystatechange = function () {
        if (s.readyState == 4) {
          if (s.status == 200) {
            i(n == "text" ? s.responseText : n == "json" ? JSON.parse(s.responseText) : s.response);
          } else {
            a({
              code: s.status,
              msg: s.statusText,
              data: {}
            });
          }
        }
      };
      s.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      if (cc.sys.isNative) {
        s.setRequestHeader("Accept-Encoding", "gzip,deflate");
      }
      if (!(n != "blob" && n != "arraybuffer" && n != "text")) {
        s.responseType = n;
      }
      if (e) {
        r = o._EncodeFormData(e);
      }
      s.timeout = 5000;
      s.ontimeout = function () {
        a({
          code: -1,
          msg: "timeout",
          data: {}
        });
      };
      s.onerror = function (t) {
        a({
          code: -1,
          msg: "onerror",
          data: t
        });
      };
      s.send(r);
    });
  };
  t.prototype._EncodeFormData = function (t) {
    var e = [];
    var n = /%20/g;
    for (var o in t) {
      var i = t[o];
      var a = encodeURIComponent(o).replace(n, "+") + "=" + encodeURIComponent(i).replace(n, "+");
      e.push(a);
    }
    return e.join("&");
  };
  t.instance = null;
  return t;
}();
exports.default = r;