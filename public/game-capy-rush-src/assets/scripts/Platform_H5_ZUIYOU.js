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
exports.Platform_H5_ZUIYOU = undefined;
var a = function () {
  function t(t) {
    this._config = {
      bms_name: "",
      bms_version: "",
      appKey: ""
    };
    this.sdk = window.__XCgs;
    this._rewardAds = null;
    this._rewardAdsCb = null;
    this._config = t;
    this.initSDK();
  }
  t.prototype.initSDK = function () {
    var t = this;
    console.log("## 初始化最右SDK------ ", this._config.appKey);
    if (this.sdk) {
      window.__XCgs.call("init")(this._config.appKey, function (e, n) {
        if (e) {
          console.log("初始化失败", e);
        } else {
          console.log("初始化失败", n);
          var o = n.uid;
          var i = n.ts;
          var a = n.sign;
          t.checkSign(t._config.bms_name, o, i, a).then(function (t) {
            console.log("签名校验", t);
            if (t && t.res) {
              console.log("签名校验成功");
              window.canCallAPI = true;
            }
          });
        }
      });
    }
  };
  t.prototype.showRewardAds = function (t) {
    var e = this;
    if (window.canCallAPI) {
      if (this.sdk) {
        this._rewardAdsCb = t;
        cc.director.pause();
        this.sdk.call("playRewardAd")(function (t, n) {
          cc.director.resume();
          if (t) {
            console.log("播放失败", t);
            return void e._rewardAdsCb(1);
          }
          if (n && n.status === 1) {
            e._rewardAdsCb(0);
          }
        });
      }
    } else {
      console.log("## API未初始化");
    }
  };
  t.prototype.checkSign = function (t, e, n, a) {
    var r = this;
    return new Promise(function (s) {
      return o(r, undefined, undefined, function () {
        var o;
        var r;
        var c;
        return i(this, function (i) {
          switch (i.label) {
            case 0:
              o = {
                app_name: t,
                ts: n,
                uid: e,
                sign: a
              };
              return [4, this.post__("https://game.zuiqiangyingyu.net/common/zui-you/check-sign", o)];
            case 1:
              r = i.sent();
              try {
                c = JSON.parse(r);
                s(c.data);
              } catch (l) {
                s({
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
  t.prototype.post__ = function (t, e) {
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
      i.open("POST", t, true);
      i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      var a = n.obj2String(e);
      console.log("前端格式化 formatPostData", n.formatPostData(e));
      console.log("前端格式化 obj2String", a);
      i.send(a);
      i.onerror = function () {
        o(null);
      };
      i.ontimeout = function () {
        o(null);
      };
    });
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
  t.prototype.obj2String = function (t) {
    return new URLSearchParams(t).toString();
  };
  return t;
}();
exports.Platform_H5_ZUIYOU = a;