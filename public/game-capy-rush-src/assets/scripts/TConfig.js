Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TConfig = undefined;
var o = function () {
  function t() {
    this._name = "";
    this._keyMap = null;
  }
  t.prototype.initByMap = function (t) {
    this._map;
    this._map = t;
  };
  t.prototype.initByArray = function (t) {
    var e = this;
    if (this._map == null) {
      this._map = {};
      t.forEach(function (t) {
        e._map[t.id] = t;
      });
    } else {
      console.error(this._name + " TConfig.initByArray repetition");
    }
  };
  t.prototype.tryGet = function (t) {
    if (this._map != null) {
      var e = this._map[t];
      return [e != null, e];
    }
    console.error(this._name + " TConfig.isExist _map null");
  };
  t.prototype.get = function (t) {
    if (this._map != null) {
      var e = this._map[t];
      if (e == null) {
        console.error(this._name + " TConfig.get fail, id:", t);
      }
      return e;
    }
    console.error(this._name + " TConfig.get _map null");
  };
  t.prototype.find = function (t) {
    if (this._map != null) {
      for (var e in this._map) {
        var n = this._map[e];
        var o = true;
        for (var i in t) {
          if (t[i] !== n[i]) {
            o = false;
            break;
          }
        }
        if (o) {
          return n;
        }
      }
      console.error(this._name + " TConfig.find fail, key:", JSON.stringify(t));
      return null;
    }
    console.error(this._name + " TConfig.find _map null");
  };
  t.prototype.filter = function (t) {
    if (this._map != null) {
      var e = [];
      for (var n in this._map) {
        var o = this._map[n];
        var i = true;
        for (var a in t) {
          if (t[a] !== o[a]) {
            i = false;
            break;
          }
        }
        if (i) {
          e.push(o);
        }
      }
      if (e.length <= 0) {
        console.error(this._name + " TConfig.filter fail, key:", JSON.stringify(t));
      }
      return e;
    }
    console.error(this._name + " TConfig.filter _map null");
  };
  t.prototype.sort = function (t, e) {
    var n = this;
    t.sort(function (t, o) {
      for (var i in e) {
        var a = e[i];
        var r = t[i];
        var s = o[i];
        if (r != null && s != null) {
          return a * (r - s);
        }
        console.warn(n._name + " TConfig.sort property null, key:", i, "id", t.id, o.id);
      }
      return 0;
    });
  };
  t.prototype.forEach = function (t, e) {
    if (this._map != null) {
      for (var n in this._map) {
        var o = this._map[n];
        t.call(e, o);
      }
    } else {
      console.error(this._name + " TConfig.forEach _map null");
    }
  };
  t.prototype.keyMap = function (t, e, n) {
    if (this._keyMap == null) {
      this._keyMap = {};
    }
    var o = this._keyMap[t];
    if (o == null) {
      o = {};
      this._keyMap[t] = o;
    }
    var i = o[e];
    if (i == null) {
      i = {};
      o[e] = i;
      for (var a in this._map) {
        var r = this._map[a];
        var s = r[t];
        var c = r[e];
        if (s != null && c != null) {
          i[s] = c;
        }
      }
    }
    return i[n];
  };
  t.prototype.getAll = function () {
    if (this._map != null) {
      return this._map;
    }
    console.error(this._name + " TConfig.getAll _map null");
  };
  Object.defineProperty(t.prototype, "count", {
    get: function () {
      if (this._count) {
        return this._count;
      } else if (this._map == null) {
        cc.error(this._name + " TConfig.count _map null");
        return 0;
      } else {
        this._count = Object.keys(this._map).length;
        return this._count;
      }
    },
    enumerable: false,
    configurable: true
  });
  return t;
}();
exports.TConfig = o;