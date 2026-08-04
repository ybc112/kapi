Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMultMaterial = exports.MultBatch2D = undefined;
var a = require("./MultUtils");
cc.Component.prototype.useMult = false;
var i = {
  texture: null,
  defalut: new cc.Texture2D(),
  getImpl: function () {
    return this.texture;
  }
};
cc.gfx.Texture2D.prototype.texID = -1;
var n = 0;
var c = false;
var s = [];
exports.MultBatch2D = {
  enable: false,
  parent: null,
  curID: 0,
  incID: 0,
  count: 0,
  hash: 0,
  reset: function () {
    if (this.count > 0) {
      this.curID++;
    }
    this.incID += this.count;
    this.count = 0;
  },
  clear: function () {
    for (var t = s, e = 0; e < t.length; e++) {
      var r = t[e];
      r.destroy();
      r.decRef();
    }
    s.length = 0;
  }
};
var l = function () {
  exports.MultBatch2D.enable = false;
  cc.resources.load("multTextures/Mult-material", cc.Material, function (t, e) {
    if (!t) {
      var i = cc.Material.getBuiltinMaterial("2d-sprite");
      if (i) {
        exports.MultBatch2D.hash = a.getMaterialHash(i);
        exports.MultBatch2D.parent = e;
        exports.MultBatch2D.enable = true;
        e.addRef();
      }
    }
  });
};
exports.getMultMaterial = function (t) {
  exports.MultBatch2D.reset();
  c = false;
  if (!exports.MultBatch2D.enable || !t || !t.isMultTextures) {
    return t;
  }
  if (!exports.MultBatch2D.parent || !exports.MultBatch2D.parent.isValid) {
    l();
    return t;
  }
  var e = s[n++];
  if (!e || !e.isValid) {
    e = new (0, cc.MaterialVariant)(exports.MultBatch2D.parent);
    s[n - 1] = e;
    for (var a = 0; a < 8; a++) {
      e.setProperty("texture" + a, i.defalut);
    }
    e.updateHash(exports.MultBatch2D.hash);
    e.define("USE_TEXTURE", true);
    e.isMultTextures = true;
    e.cacheTextures = [-1];
    e.addRef();
  }
  c = true;
  return e;
};
var u = function (t, e) {
  var r = t._assembler._renderData;
  if (!r) {
    return false;
  }
  var a = 0;
  var i = r.vDatas[0];
  if (t.dataDirty) {
    t.dataDirty = false;
    for (var n = 0, c = i.length; n < c; n += 5) {
      a = ~~(100000 * i[n + 2]);
      i[n + 2] = 10 * a + e;
    }
  } else if (t.texID != e) {
    n = 0;
    c = i.length;
    n = 0;
    c = i.length;
    for (; n < c; n += 5) {
      a = ~~(0.1 * i[n + 2]);
      i[n + 2] = 10 * a + e;
    }
  }
  t.texID = e;
};
var o = function (t, e, a) {
  if (c && e) {
    var n = e.effect.passes[0].getProperty("texture");
    if (!n) {
      console.warn(t.node.name, " texture lost !!!!!");
      e.setProperty("texture", i.defalut);
      n = i.defalut;
    }
    var s = exports.MultBatch2D;
    e.effect;
    var l = n.texID - s.incID;
    if (l < 0) {
      if (s.count >= 8) {
        a._flush();
        a.material = exports.getMultMaterial(e);
        a.node = e.getDefine("CC_USE_MODEL") ? t.node : a._dummyNode;
      }
      l = s.count++;
      n.texID = l + s.incID;
      var o = a.material;
      var h = o.cacheTextures;
      if (h[l] !== n._id) {
        h[l] = n._id;
        i.texture = n;
        o.setProperty("texture" + l, i);
        o.effect._dirty = false;
        o._dirty = false;
      }
    }
    u(t, l);
  }
};
var h = function () {
  var t = cc.RenderComponent.prototype;
  t.texID = -1;
  t.vDitry = true;
  t.dataDirty = true;
  Object.defineProperty(t, "_vertsDirty", {
    get: function () {
      return this.vDitry;
    },
    set: function (t) {
      if (!t && this.vDitry) {
        this.dataDirty = true;
      }
      this.vDitry = t;
    }
  });
  var e = t.setMaterial;
  t.setMaterial = function (t, r) {
    var a = e.call(this, t, r);
    this.setVertsDirty();
    return a;
  };
  var i = cc.Material.prototype;
  var c = i.getHash;
  i.getHash = function () {
    var t = this._effect;
    if (exports.MultBatch2D.enable && t && t._dirty) {
      this.isMultTextures = false;
      var e = this._owner;
      if (e && (e.useMult || e instanceof cc.Sprite || e instanceof cc.Label)) {
        var i = a.getMaterialHash(this);
        if (i == exports.MultBatch2D.hash) {
          this.isMultTextures = true;
          t._dirty = false;
          t._hash = i;
          return i;
        }
      }
    }
    return c.call(this);
  };
  t._checkBacth = function (t, e) {
    var a = this._materials[0];
    if (a && a.getHash() !== t.material.getHash() || t.cullingMask !== e) {
      t._flush();
      t.node = a.getDefine("CC_USE_MODEL") ? this.node : t._dummyNode;
      t.material = exports.getMultMaterial(a);
      t.cullingMask = e;
    }
    o(this, a, t);
  };
  cc.director.on(cc.Director.EVENT_BEFORE_DRAW, function () {
    n = 0;
    exports.MultBatch2D.reset();
    exports.MultBatch2D.curID = 0;
  });
};
cc.game.on(cc.game.EVENT_GAME_INITED, function () {
  l();
  h();
});