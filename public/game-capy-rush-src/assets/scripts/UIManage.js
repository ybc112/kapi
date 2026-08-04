Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = require("./MyPlatform");
var i = require("./uiPathManage");
var a = function () {
  function t() {
    this.m_path = "/prefab/";
    this.m_uiList = {};
    this.m_prefabList = {};
    this.m_loading = {};
  }
  t.GetInstance = function () {
    if (!t.instance) {
      t.instance = new t();
    }
    return this.instance;
  };
  t.prototype.showUI = function (t, e, n, o) {
    var a = this;
    if (n === undefined) {
      n = {};
    }
    if (o === undefined) {
      o = null;
    }
    if (!this.m_loading[t]) {
      this.m_loading[t] = {};
      var r = t;
      var s = 0;
      if (i.uiPath.layerIndex[r] != null) {
        s = i.uiPath.layerIndex[r];
      }
      if (this.m_uiList[r] != null) {
        this.m_uiList[r].active = true;
        if (o) {
          o(this.m_uiList[r]);
        }
        this.m_loading[t] = null;
      } else {
        cc.assetManager.loadBundle("local", function (i, c) {
          if (i) {
            a.m_loading[t] = null;
            return void a.showUI(t, e, n, o);
          }
          if (c) {
            a.showUI2(c, t, e, r, o, s, n);
          }
        });
      }
    }
  };
  t.prototype.showUI2 = function (t, e, n, o, i, a, r) {
    var s = this;
    t.load(this.m_path + e, function (c, l) {
      if (c) {
        s.showUI2(t, e, n, o, i, a, r);
      } else if (l) {
        var u = cc.instantiate(l);
        if (!n || !cc.isValid(n) || !u) {
          return;
        }
        s.m_uiList[o] = u;
        n.addChild(u, a);
        if (i) {
          i(s.m_uiList[o]);
        }
        if (u._components[0] && u._components[0].initData) {
          u._components[0].initData(r);
        }
        s.m_loading[e] = null;
      }
    });
  };
  t.prototype.hideUI = function (t, e) {
    if (e === undefined) {
      e = null;
    }
    this.gotoDestroyUI(t, e);
    if (this.m_prefabList && this.m_prefabList[t] && o.default.isH5_NOADS_tt) {
      cc.assetManager.releaseAsset(this.m_prefabList[t]);
    }
  };
  t.prototype.hideUI2 = function (t, e) {
    if (e === undefined) {
      e = null;
    }
    if (this.m_uiList[t]) {
      this.m_uiList[t].active = false;
    } else {
      if (e && cc.isValid(e)) {
        e.destroy();
      }
      if (this.m_prefabList && this.m_prefabList[t] && o.default.isH5_NOADS_tt) {
        cc.assetManager.releaseAsset(this.m_prefabList[t]);
      }
    }
  };
  t.prototype.gotoDestroyUI = function (t, e) {
    if (e === undefined) {
      e = null;
    }
    var n = this.m_uiList[t];
    if (n) {
      if (cc.isValid(n)) {
        n.destroy();
        this.m_uiList[t] = null;
        if (this.m_prefabList && this.m_prefabList[t] && o.default.isH5_NOADS_tt) {
          cc.assetManager.releaseAsset(this.m_prefabList[t]);
        }
      } else {
        this.m_uiList[t] = null;
      }
    } else {
      if (e && cc.isValid(e)) {
        e.destroy();
      }
      this.m_uiList[t] = null;
      if (this.m_prefabList && this.m_prefabList[t] && o.default.isH5_NOADS_tt) {
        cc.assetManager.releaseAsset(this.m_prefabList[t]);
      }
    }
  };
  t.prototype.destroyAllUI = function () {
    for (var t in this.m_uiList) {
      var e = this.m_uiList[t];
      if (e) {
        e.destroy();
        this.m_uiList[t] = null;
      }
    }
  };
  t.prototype.setUIKeyNull = function (t) {
    if (this.m_uiList[t]) {
      this.m_uiList[t] = null;
    }
  };
  t.prototype.prestrainLoadUI = function (t) {
    var e = this;
    if (t === undefined) {
      t = [];
    }
    var n = 0;
    return new Promise(function (o) {
      for (var i = function (i) {
          var a = t[i];
          cc.loader.loadRes(e.m_path + a, function (i, r) {
            if (r) {
              e.m_prefabList[a] = r;
              if (++n == t.length) {
                o();
              }
            }
          });
        }, a = 0; a < t.length; a++) {
        i(a);
      }
    });
  };
  t.prototype.clear = function () {
    this.m_uiList = {};
    this.m_prefabList = {};
    this.m_loading = "";
  };
  t.prototype.showUILocal = function (t, e, n, o) {
    var a = this;
    if (n === undefined) {
      n = {};
    }
    if (o === undefined) {
      o = null;
    }
    if (!this.m_loading[t]) {
      this.m_loading[t] = {};
      var r = t;
      var s = 0;
      if (i.uiPath.layerIndex[r] != null) {
        s = i.uiPath.layerIndex[r];
      }
      if (this.m_uiList[r] != null) {
        this.m_uiList[r].active = true;
        if (o) {
          o(this.m_uiList[r]);
        }
        this.m_loading[t] = null;
      } else {
        cc.assetManager.loadBundle("local2", function (i, c) {
          if (i) {
            a.m_loading[t] = null;
            return void a.showUILocal(t, e, n, o);
          }
          if (c) {
            a.showUI2(c, t, e, r, o, s, n);
          }
        });
      }
    }
  };
  t.instance = null;
  return t;
}();
exports.default = a;