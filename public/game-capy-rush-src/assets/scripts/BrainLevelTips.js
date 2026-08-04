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
var n = require("./LevelConstant");
var r = cc._decorator;
var a = r.ccclass;
var s = r.property;
var c = r.executeInEditMode;
var l = function (_) {
  function o() {
    var o = _ !== null && _.apply(this, arguments) || this;
    o.folder = "";
    o.tipsSize = cc.v2(600, 600);
    o.assetName = null;
    return o;
  }
  i(o, _);
  o.prototype.onLoad = function () {
    var _ = this.node.getChildByName("node") || this.node.children[0];
    var o = this.tipsSize.x / _.width;
    var e = this.tipsSize.y / _.height;
    _.scale = Math.min(e, o);
    this.autoSetAssetName();
    this.setLevelAsset();
  };
  o.prototype.onDestroy = function () {};
  o.prototype.autoSetAssetName = function () {
    var _ = this.assetName || this.node.assetName;
    if (_) {
      this.folder = "cf20000";
      this.node.children[0].name = "" + _;
    }
  };
  o.prototype.setLevelAsset = function () {
    var _ = this;
    var o = this.node;
    if (o) {
      var e = function (o, e) {
        return f(_, undefined, undefined, function () {
          var _;
          var t;
          var i;
          var d;
          var n = this;
          return m(this, function (r) {
            switch (r.label) {
              case 0:
                _ = function (_, o) {
                  return new Promise(function (t) {
                    return f(n, undefined, undefined, function () {
                      var i;
                      var d;
                      var f;
                      var n;
                      var r;
                      return m(this, function (m) {
                        switch (m.label) {
                          case 0:
                            m.trys.push([0, 2,, 3]);
                            return [4, this.downloadSpriteFrame(_, o)];
                          case 1:
                            i = m.sent();
                            if (e && cc.isValid(e.node)) {
                              e.spriteFrame = new cc.SpriteFrame(i);
                              if (this.tipsSize.equals(cc.v2())) {
                                if (d = this.node.getChildByName("node") || this.node.children[0]) {
                                  f = d.width / e.node.width;
                                  n = d.height / e.node.height;
                                  e.node.scale = Math.min(n, f);
                                }
                              } else {
                                f = this.tipsSize.x / e.node.width;
                                n = this.tipsSize.y / e.node.height;
                                e.node.scale = Math.min(n, f);
                              }
                              return [2, t(true)];
                            } else {
                              return [2, t(true)];
                            }
                          case 2:
                            r = m.sent();
                            console.log(r);
                            return [2, t(false)];
                          case 3:
                            return [2];
                        }
                      });
                    });
                  });
                };
                t = this.folder;
                if ((i = o.split(".")).length > 1) {
                  t = i[0] == "c" ? "common" : i[0];
                }
                return [4, _(d = "tips/" + t + "/" + o, ".png")];
              case 1:
                if (!r.sent()) {
                  _(d, ".jpg");
                }
                return [2];
            }
          });
        });
      };
      var t = function (_) {
        _.children.forEach(function (_) {
          if (_.children.length != 0) {
            t(_);
          }
          var o = _.getComponent(cc.Sprite);
          if (o && o.enabled && !o.spriteFrame) {
            return e(_.name.split("=")[0], o);
          }
        });
      };
      t(o);
    }
  };
  o.prototype.downloadSpriteFrame = function (_, o) {
    var e = this;
    return new Promise(function (t, i) {
      if (n.ASSET_LOCAL_BUNDLE) {
        cc.assetManager.loadBundle(n.ASSET_LOCAL_BUNDLE, function (o, e) {
          if (o) {
            return i(o);
          }
          e.load(_, cc.Texture2D, function (_, o) {
            if (_) {
              return i(_);
            }
            t(o);
          });
        });
      } else {
        _ += o;
        _ = "" + e.getDomain() + _;
        cc.assetManager.loadRemote(_, {
          maxRetryCount: 1,
          retryInterval: 100
        }, function (_, o) {
          if (_) {
            return i(_);
          }
          t(o);
        });
      }
    });
  };
  o.prototype.getDomain = function () {
    return n.domain;
  };
  d([s({
    tooltip: "资源远程文件夹名字(若无则为关卡ID)"
  })], o.prototype, "folder", undefined);
  return d([a, c], o);
}(cc.Component);
exports.default = l;