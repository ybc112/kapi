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
var n;
var r;
var a = require("./LevelConstant2");
var s = cc._decorator;
var c = s.ccclass;
var l = s.property;
var u = s.executeInEditMode;
var h = s.executionOrder;
(function (_) {
  _[_.SPRITE = 0] = "SPRITE";
  _[_.SP_SKELETON = 1] = "SP_SKELETON";
  _[_.MASK = 2] = "MASK";
  _[_.MOTIONSTREAK = 3] = "MOTIONSTREAK";
})(n || (n = {}));
(function (_) {
  _[_.SPRITE_FRAME = 0] = "SPRITE_FRAME";
  _[_.SKELETON_DATA = 1] = "SKELETON_DATA";
  _[_.AUDIO_CLIP = 2] = "AUDIO_CLIP";
  _[_.SPRITE_ATLAS = 3] = "SPRITE_ATLAS";
})(r || (r = {}));
var p = function (_) {
  function o() {
    var o = _ !== null && _.apply(this, arguments) || this;
    o.levelID = -1;
    o.levelJSON = null;
    o.folder = "";
    o.preloadAsset = true;
    o.dict = {};
    o.dgNode = null;
    o.cwNode = null;
    o.titleNode = null;
    o.isEnd = false;
    o.useCountDown = true;
    o._loadAssetPipe = [];
    o._loadAssetPipeList = [];
    o._loadAssetPipeMax = 20;
    o._loadAssetCount = 0;
    o._loadAssetTotal = 0;
    o._loadImportantAssetCount = 0;
    o._loadImportantAssetTotal = 0;
    o._assetAssignmentType = 1;
    o._assetAssignmentList = [];
    o._assetLoadTimer = null;
    o._assetImportLoadTimer = null;
    o._audioCaches = [];
    o._skeletonDataCaches = [];
    o.useCoundDown = true;
    o.audioCaches = [];
    return o;
  }
  i(o, _);
  o.prototype.onLoad = function () {
    this.onLevelInitial();
    var _ = window.BrainLevelBaseReleaseAudioC || 0;
    if (_ >= 5 && this.levelID != window.BrainLevelBaseReleaseAudioL) {
      this._releaseCacheAudioAsset();
      window.BrainLevelBaseReleaseAudioC = 0;
    } else {
      window.BrainLevelBaseReleaseAudioC = _ + 1;
    }
    window.BrainLevelBaseReleaseAudioL = this.levelID;
    this._installDafaultData();
    this._installLevelCWDGSprite();
    this._installNodesAsset();
    this._installNodeTree();
    this.onLevelLoad();
  };
  o.prototype.onEnable = function () {
    this.onLevelEnable();
  };
  o.prototype.start = function () {
    this.onLevelStart();
  };
  o.prototype.onDisable = function () {
    this._uninstallLevelCWDGSprite();
    this._uninstallAllData();
    this.onLevelDisable();
  };
  o.prototype.onDestroy = function () {
    this.onLevelDestory();
  };
  o.prototype.lateUpdate = function (_) {
    this.onLevelLateUpdate(_);
  };
  o.prototype.update = function (_) {
    this.onLevelUpdate(_);
  };
  o.prototype._installDafaultData = function () {
    this.cwNode = this.node.getChildByName("cw");
    this.dgNode = this.node.getChildByName("dg");
    this.titleNode = this.node.getChildByName("title") || this.node.getChildByName("lblTitle");
  };
  o.prototype._uninstallAllData = function () {
    this.setCollisionManager(false, false);
    this.stopLevelAllSound();
    this._skeletonDataCaches.forEach(function (_) {
      cc.assetManager.releaseAsset(_);
    });
    this._skeletonDataCaches = [];
    this._audioCaches = [];
    this._assetAssignmentList = [];
    this._loadAssetPipeList = [];
    clearTimeout(this._assetLoadTimer);
    clearTimeout(this._assetImportLoadTimer);
  };
  o.prototype._installLevelCWDGSprite = function () {
    return f(this, undefined, undefined, function () {
      var _;
      var o;
      var e;
      var t;
      var i;
      var d;
      var n;
      var r = this;
      return m(this, function (s) {
        switch (s.label) {
          case 0:
            _ = function (_, o) {
              if (o) {
                _.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(o);
              }
            };
            o = window.BrainLevelBaseCaches || {};
            if (this.cwNode) {
              e = "texture/common/cw";
              if (cc.resources) {
                cc.resources.load("zqddn_zhb/level/cw", function (t, i) {
                  return f(r, undefined, undefined, function () {
                    var d;
                    return m(this, function (f) {
                      switch (f.label) {
                        case 0:
                          if (!t) {
                            return [3, 6];
                          }
                          if (o[e]) {
                            return [3, 5];
                          }
                          f.label = 1;
                        case 1:
                          f.trys.push([1, 3,, 4]);
                          return [4, this._downloadSpriteFrame(e)];
                        case 2:
                          i = f.sent();
                          if (!window.BrainLevelBaseCaches) {
                            window.BrainLevelBaseCaches = {};
                          }
                          window.BrainLevelBaseCaches[e] = i;
                          return [3, 4];
                        case 3:
                          d = f.sent();
                          console.log(d);
                          cc.game.emit(a.LEVEL_EVENT.GAME_ASSET_DOWNDOWN_FAIL);
                          return [3, 4];
                        case 4:
                          return [3, 6];
                        case 5:
                          i = o[e];
                          f.label = 6;
                        case 6:
                          if (cc.isValid(this.cwNode)) {
                            if (i) {
                              _(this.cwNode, i);
                            }
                            return [2];
                          } else {
                            return [2];
                          }
                      }
                    });
                  });
                });
                return [3, 8];
              } else {
                return [3, 1];
              }
            } else {
              return [3, 8];
            }
          case 1:
            d = null;
            if (o[e]) {
              return [3, 6];
            }
            s.label = 2;
          case 2:
            s.trys.push([2, 4,, 5]);
            return [4, this._downloadSpriteFrame(e)];
          case 3:
            d = s.sent();
            if (!window.BrainLevelBaseCaches) {
              window.BrainLevelBaseCaches = {};
            }
            window.BrainLevelBaseCaches[e] = d;
            return [3, 5];
          case 4:
            t = s.sent();
            console.log(t);
            cc.game.emit(a.LEVEL_EVENT.GAME_ASSET_DOWNDOWN_FAIL);
            return [3, 5];
          case 5:
            return [3, 7];
          case 6:
            d = o[e];
            s.label = 7;
          case 7:
            if (d) {
              _(this.cwNode, d);
            }
            s.label = 8;
          case 8:
            if (this.dgNode) {
              i = "texture/common/dg";
              if (cc.resources) {
                cc.resources.load("zqddn_zhb/level/dg", function (e, t) {
                  return f(r, undefined, undefined, function () {
                    var d;
                    return m(this, function (f) {
                      switch (f.label) {
                        case 0:
                          if (!e) {
                            return [3, 6];
                          }
                          if (o[i]) {
                            return [3, 5];
                          }
                          f.label = 1;
                        case 1:
                          f.trys.push([1, 3,, 4]);
                          return [4, this._downloadSpriteFrame(i)];
                        case 2:
                          t = f.sent();
                          if (!window.BrainLevelBaseCaches) {
                            window.BrainLevelBaseCaches = {};
                          }
                          window.BrainLevelBaseCaches[i] = t;
                          return [3, 4];
                        case 3:
                          d = f.sent();
                          console.log(d);
                          return [3, 4];
                        case 4:
                          return [3, 6];
                        case 5:
                          t = o[i];
                          f.label = 6;
                        case 6:
                          if (cc.isValid(this.dgNode)) {
                            if (t) {
                              _(this.dgNode, t);
                            }
                            return [2];
                          } else {
                            return [2];
                          }
                      }
                    });
                  });
                });
                return [3, 15];
              } else {
                return [3, 9];
              }
            } else {
              return [3, 15];
            }
          case 9:
            d = null;
            if (o[i]) {
              return [3, 14];
            }
            s.label = 10;
          case 10:
            s.trys.push([10, 12,, 13]);
            return [4, this._downloadSpriteFrame(i)];
          case 11:
            d = s.sent();
            if (!window.BrainLevelBaseCaches) {
              window.BrainLevelBaseCaches = {};
            }
            window.BrainLevelBaseCaches[i] = d;
            return [3, 13];
          case 12:
            n = s.sent();
            console.log(n);
            return [3, 13];
          case 13:
            return [3, 15];
          case 14:
            if (d = o[i]) {
              _(this.dgNode, d);
            }
            s.label = 15;
          case 15:
            return [2];
        }
      });
    });
  };
  o.prototype._uninstallLevelCWDGSprite = function () {
    if (this.cwNode) {
      this.cwNode.getComponent(cc.Sprite).spriteFrame = null;
    }
    if (this.dgNode) {
      this.dgNode.getComponent(cc.Sprite).spriteFrame = null;
    }
  };
  o.prototype._installNodeTree = function () {
    var _ = this;
    var o = this.node.getChildByName("game");
    if (o) {
      this.dict[o.name] = o;
      var e = function (o) {
        o.children.forEach(function (o) {
          if (o.children.length != 0) {
            e(o);
          }
          if (-1 == o.name.indexOf("copy")) {
            var t = o.name.split("=");
            if (t.length != 1) {
              if (!_.dict[t[1]]) {
                _.dict[t[1]] = o;
              }
              o.name = t[1];
            } else if (!_.dict[o.name]) {
              _.dict[o.name] = o;
            }
          }
        });
      };
      e(o);
      var t = this.node.getChildByName("temp");
      if (t) {
        this.dict[t.name] = t;
        e(t);
      }
    }
  };
  o.prototype._installNodesAsset = function () {
    return f(this, undefined, undefined, function () {
      var _;
      var o;
      var e;
      var t;
      var i;
      var d;
      var f;
      var n;
      return m(this, function (m) {
        switch (m.label) {
          case 0:
            _ = this._getNodesAssetInfo();
            o = [];
            e = false;
            for (t in _) {
              i = _[t];
              d = i.find(function (_) {
                return _.seq;
              });
              o.push({
                url: t,
                assetType: i[0].assetType,
                list: i,
                seq: d ? d.seq : 99
              });
              if (d) {
                e = true;
              }
              this._loadAssetTotal++;
              if (d && d.seq == 1) {
                this._loadImportantAssetTotal++;
                this._loadAssetPipeMax = this._loadImportantAssetTotal;
              }
            }
            if (e) {
              o.sort(function (_, o) {
                return _.seq - o.seq;
              });
            }
            if (this._assetAssignmentType == 2) {
              this._assetAssignmentList = o;
            }
            if ((f = window.BrainLevelBaseReleaseAssetC || 0) >= 5) {
              n = o.map(function (_) {
                return _.url;
              });
              this._releaseCacheTextureAsset(n);
              this._releaseCacheSpineAsset(n);
              window.BrainLevelBaseReleaseAssetC = 0;
            } else {
              window.BrainLevelBaseReleaseAssetC = f + 1;
            }
            if (!(this._loadAssetTotal != 0 && this.preloadAsset)) {
              this._handleAssetLoadFinish("", false);
            }
            return [4, this._loadAndSetNodesAsset(o)];
          case 1:
            m.sent();
            return [2];
        }
      });
    });
  };
  o.prototype._getNodesAssetInfo = function () {
    var _ = this;
    var o = {};
    var e = this.node.getChildByName("game");
    if (!e) {
      return o;
    }
    var t = function (e) {
      e.children.forEach(function (e) {
        if (e.children.length != 0) {
          t(e);
        }
        var i = null;
        if ((i = e.getComponent(cc.Sprite)) && i.enabled && !i.spriteFrame) {
          var d = {
            ct: n.SPRITE,
            target: i,
            assetType: r.SPRITE_FRAME
          };
          var f = _._analysisNodeAssetInfo(e.name, r.SPRITE_FRAME);
          d.extra = f.extra;
          if (f.extra.textureName) {
            d.assetType = r.SPRITE_ATLAS;
          }
          if (f.seq) {
            d.seq = f.seq;
          }
          if (!o[f.url]) {
            o[f.url] = [];
          }
          return void o[f.url].push(d);
        }
        if ((i = e.getComponent(sp.Skeleton)) && i.enabled && !i.skeletonData) {
          d = {
            ct: n.SP_SKELETON,
            target: i,
            assetType: r.SKELETON_DATA
          };
          f = _._analysisNodeAssetInfo(e.name, r.SKELETON_DATA);
          d.extra = f.extra;
          if (f.seq) {
            d.seq = f.seq;
          }
          if (!o[f.url]) {
            o[f.url] = [];
          }
          return void o[f.url].push(d);
        } else if ((i = e.getComponent(cc.Mask)) && i.enabled && i.type == cc.Mask.Type.IMAGE_STENCIL && !i.spriteFrame) {
          d = {
            ct: n.MASK,
            target: i,
            assetType: r.SPRITE_FRAME
          };
          f = _._analysisNodeAssetInfo(e.name, r.SPRITE_FRAME);
          d.extra = f.extra;
          if (f.seq) {
            d.seq = f.seq;
          }
          if (!o[f.url]) {
            o[f.url] = [];
          }
          return void o[f.url].push(d);
        } else if ((i = e.getComponent(cc.MotionStreak)) && i.enabled && !i.texture) {
          d = {
            ct: n.MOTIONSTREAK,
            target: i,
            assetType: r.SPRITE_FRAME
          };
          f = _._analysisNodeAssetInfo(e.name, r.SPRITE_FRAME);
          d.extra = f.extra;
          if (f.seq) {
            d.seq = f.seq;
          }
          if (!o[f.url]) {
            o[f.url] = [];
          }
          return void o[f.url].push(d);
        } else {
          return undefined;
        }
      });
    };
    t(e);
    return o;
  };
  o.prototype._analysisNodeAssetInfo = function (_, o) {
    var e = {};
    var t = "";
    var i = null;
    _ = _.split("=")[0];
    var d = this.folder || "" + this.levelID;
    var f = _;
    var m = _.split(".");
    if (m.length == 2) {
      d = m[0] == "c" ? "common" : m[0];
      f = m[1];
    } else if (m.length == 3) {
      if (m[0] == "c") {
        d = "common/" + m[1];
      }
      f = m[2];
    }
    switch (o) {
      case r.SPRITE_FRAME:
        var n = f.split(",");
        if (n.length > 1) {
          f = n[0];
          e.nsgrid = n.slice(1);
        }
        if (("" + f)[0] == "?") {
          i = 2;
          f = ("" + f).substring(1);
        }
        if (("" + f)[0] == "!") {
          i = 1;
          f = ("" + f).substring(1);
        }
        if (-1 != f.indexOf("#")) {
          var a = f.split("#");
          e.textureName = d.indexOf("common") != 0 ? d + "_" + a[1] : "" + a[1];
          t = "texture/" + d + "/" + (d.indexOf("common") != 0 ? d + "_" + a[0] : "" + a[0]);
        } else {
          if (d.indexOf("common") != 0) {
            f = d + "_" + f;
          }
          t = "texture/" + d + "/" + f;
        }
        break;
      case r.SKELETON_DATA:
        var s = f.split(",");
        var c = null;
        var l = "default";
        if (s.length == 2) {
          c = s[1];
          f = s[0];
          e.animationName = c;
        } else if (s.length == 3) {
          l = s[2];
          c = s[1];
          f = s[0];
          e.skinName = l;
          e.animationName = c;
        }
        if (("" + f)[0] == "?") {
          i = 2;
          f = ("" + f).substring(1);
        }
        if (("" + f)[0] == "!") {
          i = 1;
          f = ("" + f).substring(1);
        }
        t = "spine/" + d + "/" + f;
    }
    return {
      url: t,
      extra: e,
      seq: i
    };
  };
  o.prototype._loadAndSetNodesAsset = function (_) {
    var o = this;
    return new Promise(function (e) {
      if (!_.length) {
        return e(false);
      }
      for (var t = window.BrainLevelBaseCaches || {}, i = function (_) {
          if (o._assetAssignmentType == 1) {
            o._setNodesAsset(_.url, _.list);
          }
          o._handleAssetLoadFinish(_.url.substring(_.url.lastIndexOf("/") + 1), _.list.some(function (_) {
            return _.seq == 1;
          }));
        }, d = function (e) {
          var d = _[e];
          if (t[d.url]) {
            i(d);
          } else {
            o._pushAssetToLoadHandle(d.url, d.assetType, function () {
              i(d);
            });
          }
        }, f = 0; f < _.length; f++) {
        d(f);
      }
    });
  };
  o.prototype._setNodesAsset = function (_, o) {
    var e = this;
    var t = window.BrainLevelBaseCaches[_];
    if (t) {
      o.forEach(function (_) {
        var o = _.target;
        var i = _.extra;
        if (o && cc.isValid(o.node)) {
          var d = null;
          switch (_.ct) {
            case n.SPRITE:
              var f = null;
              f = i.textureName ? (d = t.getSpriteFrame(i.textureName)).getTexture() : t;
              if (o.srcBlendFactor == cc.macro.BlendFactor.ONE || i.nsgrid && i.nsgrid.length != 1 && i.nsgrid == "one") {
                o.srcBlendFactor = cc.macro.BlendFactor.ONE;
                f.setPremultiplyAlpha(true);
              }
              if (!d) {
                d = new cc.SpriteFrame(f);
              }
              e._handleSpriteFrameNSGrid(d, i.nsgrid);
              o.spriteFrame = d;
              break;
            case n.MASK:
              d = new cc.SpriteFrame(t);
              e._handleSpriteFrameNSGrid(d, i.nsgrid);
              o.node.setContentSize(t.width, t.height);
              o.spriteFrame = d;
              break;
            case n.MOTIONSTREAK:
              o.node.setContentSize(t.width, t.height);
              o.texture = t;
              break;
            case n.SP_SKELETON:
              var m = new sp.SkeletonData();
              if (t[0]) {
                m.skeletonJson = t[1];
                m.atlasText = t[0];
                m.textures = t[2];
                m.textureNames = t[3];
              } else {
                m = t[1];
              }
              var r = i.skinName || "default";
              var a = i.animationName || null;
              o.skeletonData = m;
              o.setSkin(r);
              o.defaultSkin = r;
              if (a || m.getRuntimeData()) {
                o.defaultAnimation = a || m.getRuntimeData().animations[0].name;
                o.setAnimation(0, a || m.getRuntimeData().animations[0].name, o.loop);
              }
              e._skeletonDataCaches.push(m);
          }
        }
      });
    }
  };
  o.prototype._pushAssetToLoadHandle = function (_, o, e) {
    this._loadAssetPipeList.push({
      url: _,
      assetType: o,
      complete: e
    });
    this._assetLoadHandle();
  };
  o.prototype._assetLoadHandle = function () {
    return f(this, undefined, undefined, function () {
      var _;
      var o;
      var e;
      var t;
      var i;
      var d;
      return m(this, function (f) {
        switch (f.label) {
          case 0:
            if (!this._loadAssetPipe) {
              return [2];
            }
            if (this._loadAssetPipe.length >= this._loadAssetPipeMax || this._loadAssetPipeList.length <= 0) {
              return [2];
            }
            _ = this._loadAssetPipeList.shift();
            this._loadAssetPipe.push(_);
            o = window.BrainLevelBaseCaches || {};
            switch (_.assetType) {
              case r.SPRITE_FRAME:
                return [3, 1];
              case r.SKELETON_DATA:
                return [3, 6];
              case r.SPRITE_ATLAS:
                return [3, 11];
            }
            return [3, 16];
          case 1:
            if (o[_.url]) {
              return [3, 5];
            }
            f.label = 2;
          case 2:
            f.trys.push([2, 4,, 5]);
            return [4, this._downloadSpriteFrame(_.url)];
          case 3:
            i = f.sent();
            if (!window.BrainLevelBaseCaches) {
              window.BrainLevelBaseCaches = {};
            }
            window.BrainLevelBaseCaches[_.url] = i;
            return [3, 5];
          case 4:
            e = f.sent();
            console.log(e);
            cc.game.emit(a.LEVEL_EVENT.GAME_ASSET_DOWNDOWN_FAIL);
            return [3, 5];
          case 5:
            return [3, 16];
          case 6:
            if (o[_.url]) {
              return [3, 10];
            }
            f.label = 7;
          case 7:
            f.trys.push([7, 9,, 10]);
            return [4, this._downloadSpine(_.url)];
          case 8:
            i = f.sent();
            if (!window.BrainLevelBaseCaches) {
              window.BrainLevelBaseCaches = {};
            }
            window.BrainLevelBaseCaches[_.url] = i;
            return [3, 10];
          case 9:
            t = f.sent();
            console.log(t);
            cc.game.emit(a.LEVEL_EVENT.GAME_ASSET_DOWNDOWN_FAIL);
            return [3, 10];
          case 10:
            return [3, 16];
          case 11:
            if (o[_.url]) {
              return [3, 15];
            }
            f.label = 12;
          case 12:
            f.trys.push([12, 14,, 15]);
            return [4, this._downloadSpriteAtlas(_.url)];
          case 13:
            i = f.sent();
            if (!window.BrainLevelBaseCaches) {
              window.BrainLevelBaseCaches = {};
            }
            window.BrainLevelBaseCaches[_.url] = i;
            return [3, 15];
          case 14:
            d = f.sent();
            console.log(d);
            cc.game.emit(a.LEVEL_EVENT.GAME_ASSET_DOWNDOWN_FAIL);
            return [3, 15];
          case 15:
            return [3, 16];
          case 16:
            if (this._loadAssetPipe) {
              this._loadAssetPipe.splice(this._loadAssetPipe.findIndex(function (o) {
                return o.url == _.url;
              }), 1);
            }
            if (_.complete) {
              _.complete();
            }
            this._assetLoadHandle();
            return [2];
        }
      });
    });
  };
  o.prototype._handleSpriteFrameNSGrid = function (_, o) {
    if (o) {
      var e = o;
      if (e.length != 1) {
        var t = e[1] == "one" ? 1 : 0;
        var i = ["insetLeft", "insetRight", "insetTop", "insetBottom"];
        e.forEach(function (o, d) {
          if (e[d + t]) {
            return _[i[d]] = Number(e[d + t]);
          } else {
            return null;
          }
        });
      }
    }
  };
  o.prototype._handleAssetLoadFinish = function (_, o) {
    var e = this;
    this._loadAssetCount++;
    if (o) {
      this._loadImportantAssetCount++;
    }
    this.onLevelAssetsLoaded(_);
    if (this._loadImportantAssetTotal != 0 && this._loadImportantAssetCount >= this._loadImportantAssetTotal) {
      this._loadAssetPipeMax = 20;
      this._handleAssetAssignment();
      this._loadImportantAssetTotal = 0;
      this._assetImportLoadTimer = setTimeout(function () {
        e.onLevelImportantReady();
      }, 0);
    }
    if (this._loadAssetCount >= this._loadAssetTotal) {
      this._assetLoadTimer = setTimeout(function () {
        e._handleAssetAssignment();
        e.onAssetLoadedAllFinishHandle();
        e.onLevelAllAssetsLoaded();
        e.onLevelReady();
      }, 0);
    }
  };
  o.prototype._handleAssetAssignment = function () {
    if (this._assetAssignmentType == 2 && cc.isValid(this.node, true) && this._assetAssignmentList.length) {
      for (var _ = 0; _ < this._assetAssignmentList.length; _++) {
        var o = this._assetAssignmentList[_];
        this._setNodesAsset(o.url, o.list);
      }
    }
  };
  o.prototype._downloadSpriteFrame = function (_, o) {
    var e = this;
    if (o === undefined) {
      o = ".png";
    }
    return new Promise(function (t, i) {
      if (a.ASSET_LOCAL_BUNDLE) {
        cc.assetManager.loadBundle(a.ASSET_LOCAL_BUNDLE, function (o, e) {
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
        var d = _;
        _ += o;
        _ = "" + e.getDomain() + _;
        cc.assetManager.loadRemote(_, function (_, f) {
          if (_) {
            if (o == ".png") {
              return e._downloadSpriteFrame(d, ".jpg");
            }
            i(_);
          }
          t(f);
        });
      }
    });
  };
  o.prototype._downloadSpine = function (_) {
    var o = this;
    return new Promise(function (e, t) {
      if (a.ASSET_LOCAL_BUNDLE) {
        cc.assetManager.loadBundle(a.ASSET_LOCAL_BUNDLE, function (o, i) {
          if (o) {
            return t(o);
          }
          i.load(_, sp.SkeletonData, function (_, o) {
            if (_) {
              return t(_);
            }
            e([null, o, null]);
          });
        });
      } else {
        var i = _.substring(_.lastIndexOf("/") + 1);
        var d = "" + o.getDomain() + _ + ".atlas";
        var n = "" + o.getDomain() + _ + ".json";
        var r = _;
        cc.assetManager.loadAny([{
          url: d,
          ext: ".txt"
        }, {
          url: n,
          ext: ".txt"
        }], function (_, d) {
          return f(o, undefined, undefined, function () {
            var o;
            var f;
            var n;
            var a;
            var s;
            var c;
            var l;
            return m(this, function (m) {
              switch (m.label) {
                case 0:
                  if (_) {
                    return [2, t(_)];
                  }
                  o = true;
                  f = [];
                  for (; o;) {
                    if (-1 == d[0].indexOf("" + i + (f.length ? f.length + 1 : "") + ".png")) {
                      o = false;
                    } else {
                      f.push("" + i + (f.length ? f.length + 1 : ""));
                    }
                  }
                  n = r.substring(0, r.lastIndexOf("/"));
                  a = f.map(function (_) {
                    return _ + ".png";
                  });
                  f = f.map(function (_) {
                    return n + "/" + _;
                  });
                  s = [];
                  m.label = 1;
                case 1:
                  if (f.length) {
                    c = f.shift();
                    return [4, this._downloadSpriteFrame(c)];
                  } else {
                    return [3, 3];
                  }
                case 2:
                  l = m.sent();
                  s.push(l);
                  return [3, 1];
                case 3:
                  d.push(s);
                  d.push(a);
                  e(d);
                  return [2];
              }
            });
          });
        });
      }
    });
  };
  o.prototype._downloadAudio = function (_) {
    var o = this;
    return new Promise(function (e, t) {
      if (-1 != _.indexOf(a.domain)) {
        _ = _.substring(a.domain.length);
      }
      if (-1 != _.indexOf(a.domain_local)) {
        _ = _.substring(a.domain_local.length);
      }
      if (-1 != _.indexOf(".mp3")) {
        _ = _.substring(0, _.indexOf(".mp3"));
      }
      if (a.ASSET_LOCAL_BUNDLE) {
        cc.assetManager.loadBundle(a.ASSET_LOCAL_BUNDLE, function (o, i) {
          if (o) {
            return t(o);
          }
          i.load(_, cc.AudioClip, function (_, o) {
            if (_) {
              return t(_);
            }
            e(o);
          });
        });
      } else {
        _ = "" + o.getDomain() + _ + ".mp3";
        cc.assetManager.loadRemote(_, function (_, o) {
          if (_) {
            return t(_);
          }
          e(o);
        });
      }
    });
  };
  o.prototype._downloadSpriteAtlas = function (_) {
    var o = this;
    return new Promise(function (e, t) {
      if (a.ASSET_LOCAL_BUNDLE) {
        cc.assetManager.loadBundle(a.ASSET_LOCAL_BUNDLE, function (o, i) {
          if (o) {
            return t(o);
          }
          i.load(_, cc.SpriteAtlas, function (_, o) {
            if (_) {
              return t(_);
            }
            e(o);
          });
        });
      } else {
        var i = "" + o.getDomain() + _ + ".plist";
        var d = "" + o.getDomain() + _ + ".png";
        cc.loader.load("" + i, function (_, i) {
          if (_) {
            return t(_);
          }
          cc.assetManager.loadRemote("" + d, function (_, d) {
            if (_) {
              return t(_);
            }
            e(o._parsePlist(i, d));
          });
        });
      }
    });
  };
  o.prototype._parsePlist = function (_, o) {
    var e;
    var t;
    var i = /[\{\}]/g;
    var d = function (_) {
      var o = (_ = _.slice(1, -1)).split(",");
      var e = parseFloat(o[0]);
      var t = parseFloat(o[1]);
      return new cc.Size(e, t);
    };
    var f = function (_) {
      var o = (_ = _.slice(1, -1)).split(",");
      var e = parseFloat(o[0]);
      var t = parseFloat(o[1]);
      return new cc.Vec2(e, t);
    };
    var m = function (_) {
      return _.split(" ").map(parseFloat);
    };
    var n = _.metadata;
    var r = _.frames;
    var a = new cc.SpriteAtlas();
    var s = a._spriteFrames;
    for (var c in r) {
      var l = r[c];
      var u = false;
      var h = undefined;
      var p = undefined;
      var y = undefined;
      if (n.format === 0) {
        u = false;
        h = "{" + l.originalWidth + "," + l.originalHeight + "}";
        p = "{" + l.offsetX + "," + l.offsetY + "}";
        y = "{{" + l.x + "," + l.y + "},{" + l.width + "," + l.height + "}}";
      } else if (n.format === 1 || n.format === 2) {
        u = l.rotated;
        h = l.sourceSize;
        p = l.offset;
        y = l.frame;
      } else if (n.format === 3) {
        u = l.textureRotated;
        h = l.spriteSourceSize;
        p = l.spriteOffset;
        y = l.textureRect;
      }
      var v = new cc.SpriteFrame();
      v.setTexture(o, (undefined, t = y.replace(i, "").split(","), new cc.Rect(parseFloat(t[0] || 0), parseFloat(t[1] || 0), parseFloat(t[2] || 0), parseFloat(t[3] || 0))), !!u, f(p), d(h));
      if (l.triangles) {
        var g = m(l.vertices);
        var x = m(l.verticesUV);
        v.vertices = {
          triangles: (e = l.triangles, e.split(" ").map(parseFloat)),
          x: [],
          y: [],
          u: [],
          v: []
        };
        for (var b = 0; b < g.length; b += 2) {
          v.vertices.x.push(g[b]);
          v.vertices.y.push(g[b + 1]);
        }
        for (b = 0; b < x.length; b += 2) {
          v.vertices.u.push(x[b]);
          v.vertices.v.push(x[b + 1]);
        }
      }
      s[cc.path.mainFileName(c)] = v;
    }
    return a;
  };
  o.prototype._releaseCacheAudioAsset = function () {
    var _ = window.BrainLevelBaseCaches || {};
    for (var o in _) {
      if (-1 != o.indexOf("audio/")) {
        cc.assetManager.releaseAsset(_[o]);
        delete _[o];
      }
    }
  };
  o.prototype._releaseCacheTextureAsset = function (_) {
    if (_ === undefined) {
      _ = [];
    }
    var o = window.BrainLevelBaseCaches || {};
    var e = function (e) {
      if (-1 != e.indexOf("texture/") && !_.some(function (_) {
        return _ == e;
      })) {
        if (o[e] instanceof cc.SpriteAtlas) {
          var t = o[e];
          for (var i in t._spriteFrames) {
            var d = t._spriteFrames[i];
            cc.assetManager.releaseAsset(d.getTexture());
            cc.assetManager.releaseAsset(d);
          }
          cc.assetManager.releaseAsset(t);
        } else {
          cc.assetManager.releaseAsset(o[e]);
        }
        delete o[e];
      }
    };
    for (var t in o) {
      e(t);
    }
  };
  o.prototype._releaseCacheSpineAsset = function (_) {
    if (_ === undefined) {
      _ = [];
    }
    var o = window.BrainLevelBaseCaches || {};
    var e = function (e) {
      if (!(-1 == e.indexOf("spine/") || _.some(function (_) {
        return _ == e;
      }))) {
        o[e].forEach(function (_) {
          if (_ instanceof Array) {
            _.forEach(function (_) {
              return cc.assetManager.releaseAsset(_);
            });
          } else {
            cc.assetManager.releaseAsset(_);
          }
        });
        delete o[e];
      }
    };
    for (var t in o) {
      e(t);
    }
  };
  o.prototype._releaseAllCache = function () {
    this._releaseCacheAudioAsset();
    this._releaseCacheTextureAsset();
    this._releaseCacheSpineAsset();
    window.BrainLevelBaseCaches = {};
  };
  o.prototype.playRemoteSound = function (_, o, e) {
    var t = this;
    if (o === undefined) {
      o = false;
    }
    if (e === undefined) {
      e = 1;
    }
    if (_ && typeof _ == "string" && -1 != _.indexOf("bgm") && window.game_musicOpen == 0) {
      return new Promise(function (_) {
        _(null);
      });
    } else {
      if (window.game_audioOpen == 0) {
        e = 0;
      }
      return new Promise(function (i) {
        return f(t, undefined, undefined, function () {
          var t;
          var d;
          var f;
          var n;
          var r = this;
          return m(this, function (m) {
            switch (m.label) {
              case 0:
                this._audioCaches.push({
                  url: _
                });
                m.label = 1;
              case 1:
                m.trys.push([1, 5,, 6]);
                t = null;
                if ((d = window.BrainLevelBaseCaches || {})[_]) {
                  return [3, 3];
                } else {
                  return [4, this._downloadAudio(_)];
                }
              case 2:
                t = m.sent();
                if (!window.BrainLevelBaseCaches) {
                  window.BrainLevelBaseCaches = {};
                }
                window.BrainLevelBaseCaches[_] = t;
                return [3, 4];
              case 3:
                t = d[_];
                m.label = 4;
              case 4:
                if (cc.isValid(this.node)) {
                  if (f = this._audioCaches.find(function (o) {
                    return o.url == _ && !o.id;
                  })) {
                    if (_.includes("bgm") || _.includes("Bgm")) {
                      if (window.musicMute) {
                        e = 0;
                      }
                    } else if (window.effectMute) {
                      e = 0;
                    }
                    n = cc.audioEngine.play(t, o, window.isSoundMute ? 0 : e);
                    f.id = n;
                    if (!o) {
                      cc.audioEngine.setFinishCallback(n, function () {
                        if (r._audioCaches) {
                          var _ = r._audioCaches.findIndex(function (_) {
                            return _.id == n;
                          });
                          if (-1 != _) {
                            r._audioCaches.splice(_, 1);
                          }
                        }
                      });
                    }
                    return [2, i(n)];
                  } else {
                    return [2, i(-1)];
                  }
                } else {
                  return [2];
                }
              case 5:
                m.sent();
                i(-1);
                return [3, 6];
              case 6:
                return [2];
            }
          });
        });
      });
    }
  };
  o.prototype.stopAudioByUrl = function (_) {
    var o = this._audioCaches.find(function (o) {
      return o.url === _ && o.id;
    });
    if (o) {
      cc.audioEngine.stop(o.id);
      var e = this._audioCaches.findIndex(function (e) {
        return e.url === _ && e.id === o.id;
      });
      if (-1 !== e) {
        this._audioCaches.splice(e, 1);
      }
    }
  };
  o.prototype.playLevelSound = function (_, o, e) {
    if (o === undefined) {
      o = false;
    }
    if (e === undefined) {
      e = 1;
    }
    if (_ && typeof _ == "string" && -1 != _.indexOf("bgm") && window.game_musicOpen == 0) {
      return new Promise(function (_) {
        _(null);
      });
    }
    var t = this.folder || "" + this.levelID;
    var i = "audio/" + t + "/" + t + "_" + _;
    return this.playRemoteSound(i, o, e);
  };
  o.prototype.stopLevelSound = function (_) {
    var o = this.folder || "" + this.levelID;
    var e = "audio/" + o + "/" + o + "_" + _;
    var t = this._audioCaches.findIndex(function (_) {
      return _.url == e;
    });
    if (-1 != t) {
      var i = this._audioCaches.splice(t, 1)[0];
      if (i && i.id) {
        cc.audioEngine.stop(i.id);
      }
    }
  };
  o.prototype.stopLevelAllSound = function () {
    if (this._audioCaches.length) {
      this._audioCaches.forEach(function (_) {
        cc.audioEngine.stop(_.id);
      });
      this._audioCaches = [];
    }
  };
  o.prototype.playClickSound = function () {
    return this.playRemoteSound(a.AUDIO_URL.CLICK);
  };
  o.prototype.playErrorOnce = function (_, o) {
    if (o === undefined) {
      o = 1;
    }
    if (_) {
      var e = cc.v2();
      var t = cc.v2();
      if (_ instanceof cc.Event.EventTouch) {
        e = _.getLocation();
        t = this.cwNode.parent.convertToNodeSpaceAR(e);
      } else if (_ instanceof cc.Node) {
        e = cc.v2(_.parent.convertToWorldSpaceAR(_.position));
        t = this.cwNode.parent.convertToNodeSpaceAR(e);
      } else if (_ instanceof cc.Event.EventTouch) {
        t = cc.v2(_);
      }
      this.cwNode.setPosition(t);
    }
    this.cwNode.active = true;
    this.cwNode.scale = 0;
    this.cwNode.stopAllActions();
    this.playRemoteSound(a.AUDIO_URL.ERROR);
    cc.tween(this.cwNode).to(0.3, {
      scale: 1
    }).delay(o).to(0.3, {
      scale: 0
    }).start();
  };
  o.prototype.playError = function (_, o) {
    var e = this;
    if (o === undefined) {
      o = 1;
    }
    if (!this.isEnd) {
      this.isEnd = true;
      if (_) {
        var t = cc.v2();
        var i = cc.v2();
        if (_ instanceof cc.Event.EventTouch) {
          t = _.getLocation();
          i = this.cwNode.parent.convertToNodeSpaceAR(t);
        } else if (_ instanceof cc.Node) {
          t = cc.v2(_.parent.convertToWorldSpaceAR(_.position));
          i = this.cwNode.parent.convertToNodeSpaceAR(t);
        } else if (_ instanceof cc.Vec2 || _ instanceof cc.Vec3) {
          i = this.cwNode.parent.convertToNodeSpaceAR(_);
        }
        this.cwNode.setPosition(i);
      }
      this.cwNode.active = true;
      this.cwNode.scale = 0;
      this.cwNode.stopAllActions();
      this.playRemoteSound(a.AUDIO_URL.ERROR);
      cc.tween(this.cwNode).to(0.3, {
        scale: 1
      }).delay(o).to(0.3, {
        scale: 0
      }).call(function () {
        e.gameError();
      }).start();
    }
  };
  o.prototype.playRightOnce = function (_, o) {
    var e = this;
    if (o === undefined) {
      o = 1;
    }
    if (_) {
      var t = cc.v2();
      var i = cc.v2();
      if (_ instanceof cc.Event.EventTouch) {
        t = _.getLocation();
        i = this.dgNode.parent.convertToNodeSpaceAR(t);
      } else if (_ instanceof cc.Node) {
        t = cc.v2(_.parent.convertToWorldSpaceAR(_.position));
        i = this.dgNode.parent.convertToNodeSpaceAR(t);
      } else if (_ instanceof cc.Event.EventTouch) {
        i = cc.v2(_);
      }
      this.dgNode.setPosition(i);
    }
    this.dgNode.active = true;
    this.dgNode.scale = 0;
    this.dgNode.stopAllActions();
    cc.tween(this.dgNode).delay(0.3).call(function () {
      e.playRemoteSound(a.AUDIO_URL.RIGHT);
    }).to(0.3, {
      scale: 1
    }, {
      easing: cc.easing.expoOut
    }).delay(o).to(0.3, {
      scale: 0
    }).start();
  };
  o.prototype.playRight = function (_, o) {
    var e = this;
    if (o === undefined) {
      o = 1;
    }
    if (!this.isEnd) {
      this.isEnd = true;
      if (_) {
        var t = cc.v2();
        var i = cc.v2();
        if (_ instanceof cc.Event.EventTouch) {
          t = _.getLocation();
          i = this.dgNode.parent.convertToNodeSpaceAR(t);
        } else if (_ instanceof cc.Node) {
          t = cc.v2(_.parent.convertToWorldSpaceAR(_.position));
          i = this.dgNode.parent.convertToNodeSpaceAR(t);
        } else if (_ instanceof cc.Event.EventTouch) {
          i = cc.v2(_);
        }
        this.dgNode.setPosition(i);
      }
      this.dgNode.active = true;
      this.dgNode.scale = 0;
      this.dgNode.stopAllActions();
      cc.tween(this.dgNode).delay(0.3).call(function () {
        e.playRemoteSound(a.AUDIO_URL.RIGHT);
      }).to(0.3, {
        scale: 1
      }, {
        easing: cc.easing.expoOut
      }).delay(o).call(function () {
        e.gameRight();
      }).start();
    }
  };
  o.prototype.gameError = function () {
    cc.game.emit("onRestartBtn");
  };
  o.prototype.gameRight = function () {
    cc.game.emit("game_success1");
    cc.game.emit("game_success2");
  };
  o.prototype.getDomain = function () {
    return a.domain;
  };
  o.prototype.setPhysicsManager = function (_, o) {
    if (o === undefined) {
      o = 0;
    }
    if (_ || cc.director.getPhysicsManager().enabled && !_) {
      cc.director.getPhysicsManager().enabled = _;
    }
    if (o || cc.director.getPhysicsManager().debugDrawFlags && !o) {
      cc.director.getPhysicsManager().debugDrawFlags = o;
    }
  };
  o.prototype.setCollisionManager = function (_, o) {
    if (o === undefined) {
      o = false;
    }
    if (_ || cc.director.getCollisionManager().enabled && !_) {
      cc.director.getCollisionManager().enabled = _;
    }
    if (o || cc.director.getCollisionManager().enabledDebugDraw && !o) {
      cc.director.getCollisionManager().enabledDebugDraw = o;
    }
  };
  o.prototype.setAssetAssignmentType = function (_) {
    if (_ === undefined) {
      _ = 1;
    }
    this._assetAssignmentType = _;
  };
  o.prototype.onLevelInitial = function () {};
  o.prototype.onLevelUpdate = function () {};
  o.prototype.onLevelLateUpdate = function () {};
  o.prototype.onLevelLoad = function () {};
  o.prototype.onLevelEnable = function () {};
  o.prototype.onLevelStart = function () {};
  o.prototype.onLevelReady = function () {};
  o.prototype.onLevelDisable = function () {};
  o.prototype.onLevelDestory = function () {};
  o.prototype.onLevelImportantReady = function () {};
  o.prototype.onLevelAssetsLoaded = function () {};
  o.prototype.onLevelAllAssetsLoaded = function () {};
  o.prototype.onLevelReadyOnEditor = function () {};
  o.prototype.onAssetLoadedAllFinishHandle = function () {};
  d([l({
    tooltip: "关卡ID"
  })], o.prototype, "levelID", undefined);
  d([l({
    type: cc.JsonAsset,
    tooltip: "关卡JSON"
  })], o.prototype, "levelJSON", undefined);
  d([l({
    tooltip: "资源远程文件夹名字(若无则为关卡ID)"
  })], o.prototype, "folder", undefined);
  d([l({
    displayName: "是否加载远程资源"
  })], o.prototype, "preloadAsset", undefined);
  return d([c, u, h(-1)], o);
}(cc.Component);
exports.default = p;