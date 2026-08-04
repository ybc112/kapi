Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = require("./Md5");
var i = function () {
  function t() {
    this._open = false;
    this.baseUrl = "https://open-api.zuiqiangyingyu.net/";
    this.API_uuidInWhitelist = "check/Uuidwhitelist/uuidInWhitelist";
  }
  t.GetInstance = function () {
    if (!t.instance) {
      t.instance = new t();
    }
    return this.instance;
  };
  t.prototype.checkInWhitelist = function (t, e, n, o) {
    var i = this;
    if (o === undefined) {
      o = null;
    }
    if (this._open) {
      console.log("## 检测 成功");
      this._open = true;
      return void (n && n());
    }
    var a = {
      app_id: t,
      uuid: e,
      t: Math.floor(new Date().getTime() / 1000),
      nonce: this.randomString(32)
    };
    a.sign = this.getSign(a);
    this.httpRequest(this.baseUrl + this.API_uuidInWhitelist, a, function (t) {
      console.log("## data: ", JSON.stringify(t));
      if (t.data && t.data.code == 0 && t.data.data) {
        console.log("## 检测 成功");
        i._open = true;
        if (n) {
          n();
        }
      } else if (o) {
        o();
      }
    }, false, "GET");
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
    if (i == "POST") {
      this.Post(t, e, n);
    } else {
      this.Get(t, e, n);
    }
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
  t.prototype.Post = function (t, e, n) {
    console.log("Post", t, JSON.stringify(e));
    var o = new XMLHttpRequest();
    o.onreadystatechange = function () {
      if (o.readyState == 4) {
        if (o.status >= 200 && o.status < 400) {
          var t = o.responseText;
          if (t) {
            console.log("## response", t);
            var e = {
              data: JSON.parse(t)
            };
            console.log("## dataJson", e);
            n(e);
          } else {
            n(false);
          }
        } else {
          n(false);
        }
      }
    };
    o.open("POST", t, true);
    o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    o.send(this.formatPostData(e));
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
  t.prototype.getSign = function (t) {
    var e = [];
    for (var n in t) {
      e.push(n);
    }
    e = e.sort();
    var i = "";
    e.forEach(function (n, o) {
      i += n + "=" + t[n] + (o == e.length - 1 ? "" : "&");
    });
    i += "F411nF5LGJWMTqcPWSI4dQvry1ei5n3e";
    return new o.Md5().md5(i);
  };
  t.prototype.randomString = function (t) {
    t = t || 32;
    for (var e = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyzoOLl9gqVvUuI12345678_", n = e.length, o = "", i = 0; i < t; i++) {
      o += e.charAt(Math.floor(Math.random() * n));
    }
    return o;
  };
  t.instance = null;
  return t;
}();
exports.default = i;