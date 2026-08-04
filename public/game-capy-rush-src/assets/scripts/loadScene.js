var t;
var i = this && this.__extends || (t = function (_, o) {
  return (t = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (_, o) {
    _.__proto__ = o;
  } || function (_, o) {
    for (var e in o) {
      if (Object.prototype.hasOwnProperty.call(o, e)) {
        _[e] = o[e];
      }
    }
  })(_, o);
}, function (_, o) {
  function e() {
    this.constructor = _;
  }
  t(_, o);
  _.prototype = o === null ? Object.create(o) : (e.prototype = o.prototype, new e());
});
var d = this && this.__decorate || function (_, o, e, t) {
  var i;
  var d = arguments.length;
  var f = d < 3 ? o : t === null ? t = Object.getOwnPropertyDescriptor(o, e) : t;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    f = Reflect.decorate(_, o, e, t);
  } else {
    for (var m = _.length - 1; m >= 0; m--) {
      if (i = _[m]) {
        f = (d < 3 ? i(f) : d > 3 ? i(o, e, f) : i(o, e)) || f;
      }
    }
  }
  if (d > 3 && f) {
    Object.defineProperty(o, e, f);
  }
  return f;
};
var f = this && this.__awaiter || function (_, o, e, t) {
  return new (e || (e = Promise))(function (i, d) {
    function f(_) {
      try {
        n(t.next(_));
      } catch (o) {
        d(o);
      }
    }
    function m(_) {
      try {
        n(t.throw(_));
      } catch (o) {
        d(o);
      }
    }
    function n(_) {
      var o;
      if (_.done) {
        i(_.value);
      } else {
        (o = _.value, o instanceof e ? o : new e(function (_) {
          _(o);
        })).then(f, m);
      }
    }
    n((t = t.apply(_, o || [])).next());
  });
};
var m = this && this.__generator || function (_, o) {
  var e;
  var t;
  var i;
  var d;
  var f = {
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
  d = {
    next: m(0),
    throw: m(1),
    return: m(2)
  };
  if (typeof Symbol == "function") {
    d[Symbol.iterator] = function () {
      return this;
    };
  }
  return d;
  function m(_) {
    return function (o) {
      return n([_, o]);
    };
  }
  function n(d) {
    if (e) {
      throw new TypeError("Generator is already executing.");
    }
    for (; f;) {
      try {
        e = 1;
        if (t && (i = 2 & d[0] ? t.return : d[0] ? t.throw || ((i = t.return) && i.call(t), 0) : t.next) && !(i = i.call(t, d[1])).done) {
          return i;
        }
        t = 0;
        if (i) {
          d = [2 & d[0], i.value];
        }
        switch (d[0]) {
          case 0:
          case 1:
            i = d;
            break;
          case 4:
            f.label++;
            return {
              value: d[1],
              done: false
            };
          case 5:
            f.label++;
            t = d[1];
            d = [0];
            continue;
          case 7:
            d = f.ops.pop();
            f.trys.pop();
            continue;
          default:
            if (!(i = (i = f.trys).length > 0 && i[i.length - 1]) && (d[0] === 6 || d[0] === 2)) {
              f = 0;
              continue;
            }
            if (d[0] === 3 && (!i || d[1] > i[0] && d[1] < i[3])) {
              f.label = d[1];
              break;
            }
            if (d[0] === 6 && f.label < i[1]) {
              f.label = i[1];
              i = d;
              break;
            }
            if (i && f.label < i[2]) {
              f.label = i[2];
              f.ops.push(d);
              break;
            }
            if (i[2]) {
              f.ops.pop();
            }
            f.trys.pop();
            continue;
        }
        d = o.call(_, f);
      } catch (m) {
        d = [6, m];
        t = 0;
      } finally {
        e = i = 0;
      }
    }
    if (5 & d[0]) {
      throw d[1];
    }
    return {
      value: d[0] ? d[1] : undefined,
      done: true
    };
  }
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var n = cc._decorator;
var r = n.ccclass;
n.property;
var a = function (_) {
  function o() {
    return _ !== null && _.apply(this, arguments) || this;
  }
  i(o, _);
  o.prototype.start = function () {
    this.runGame();
  };
  o.prototype.runGame = function () {
    return f(this, undefined, undefined, function () {
      return m(this, function (_) {
        switch (_.label) {
          case 0:
            _.trys.push([0, 2,, 3]);
            return [4, this.loadSubAssets()];
          case 1:
            _.sent();
            cc.director.loadScene("splashScene");
            return [3, 3];
          case 2:
            _.sent();
            return [3, 3];
          case 3:
            return [2];
        }
      });
    });
  };
  o.prototype.loadSubAssets = function () {
    var _ = this;
    return new Promise(function (o) {
      return f(_, undefined, undefined, function () {
        var _;
        var e;
        return m(this, function (t) {
          switch (t.label) {
            case 0:
              _ = [];
              if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                if (window.tt === undefined && window.qq === undefined && window.kwaigame === undefined) {
                  console.log("## wx loadSubAssets");
                  _.push("mainScript");
                } else if (window.kwaigame !== undefined) {
                  _.push("mainScript");
                } else if (window.qq !== undefined) {
                  _.push("mainScript");
                }
              } else if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
                console.log("## tt loadSubAssets");
                _.push("mainScript");
              } else if (cc.sys.platform === cc.sys.HUAWEI_GAME) {
                console.log("## HUAWEI loadSubAssets");
                _.push("mainScript");
              } else if (cc.sys.platform === cc.sys.VIVO_GAME) {
                console.log("## vivo loadSubAssets");
                _.push("mainScript");
              } else if (cc.sys.platform === cc.sys.OPPO_GAME) {
                console.log("## oppo loadSubAssets");
                _.push("mainScript");
              }
              if (_.length <= 0) {
                return [2, o()];
              }
              t.label = 1;
            case 1:
              if (_.length) {
                e = _.shift();
                return [4, this.loadSubHandle(e)];
              } else {
                return [3, 3];
              }
            case 2:
              t.sent();
              return [3, 1];
            case 3:
              return [2, o()];
          }
        });
      });
    });
  };
  o.prototype.loadSubHandle = function (_, o) {
    var e = this;
    console.log("## 开始加载分包：" + _);
    return new Promise(function (t) {
      cc.loader.downloader.loadSubpackage(_, function (i) {
        if (i) {
          console.log("## err: " + JSON.stringify(i));
          return e.loadSubHandle(_, t);
        }
        console.log("## 加载分包：" + _ + "成功");
        t();
        if (o) {
          o();
        }
      });
    });
  };
  return d([r], o);
}(cc.Component);
exports.default = a;