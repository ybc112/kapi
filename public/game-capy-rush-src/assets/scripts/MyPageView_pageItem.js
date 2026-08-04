var o;
var i = this && this.__extends || (o = function (t, e) {
  return (o = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (t, e) {
    t.__proto__ = e;
  } || function (t, e) {
    for (var n in e) {
      if (Object.prototype.hasOwnProperty.call(e, n)) {
        t[n] = e[n];
      }
    }
  })(t, e);
}, function (t, e) {
  function n() {
    this.constructor = t;
  }
  o(t, e);
  t.prototype = e === null ? Object.create(e) : (n.prototype = e.prototype, new n());
});
var a = this && this.__decorate || function (t, e, n, o) {
  var i;
  var a = arguments.length;
  var r = a < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, n) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, n, o);
  } else {
    for (var s = t.length - 1; s >= 0; s--) {
      if (i = t[s]) {
        r = (a < 3 ? i(r) : a > 3 ? i(e, n, r) : i(e, n)) || r;
      }
    }
  }
  if (a > 3 && r) {
    Object.defineProperty(e, n, r);
  }
  return r;
};
var r = this && this.__awaiter || function (t, e, n, o) {
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
var s = this && this.__generator || function (t, e) {
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
var c = cc._decorator;
var l = c.ccclass;
c.property;
var u = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e._index = 0;
    e._createItemCount = 0;
    e._inPageItemCount = 0;
    e._dataArr = null;
    e._changeFlag = false;
    e._generator = null;
    return e;
  }
  i(e, t);
  e.prototype.updateData = function (t, e, n, o) {
    if (!this._dataArr) {
      this._dataArr = t;
    }
    this._index = e;
    this._createItemCount = n;
    this._inPageItemCount = o;
    this._changeFlag = false;
  };
  e.prototype.changeToRight = function (t, e) {
    this._changeFlag = true;
    if (this._generator) {
      this._generator.return;
      this._generator = null;
    }
    this._index += 3;
    var n = this._index == t - 1 ? e - this._index * this._inPageItemCount : this._inPageItemCount;
    this.updateData(this._dataArr, this._index, n, this._inPageItemCount);
  };
  e.prototype.changeToLeft = function (t, e) {
    this._changeFlag = true;
    if (this._generator) {
      this._generator.return;
      this._generator = null;
    }
    this._index -= 3;
    var n = this._index == t - 1 ? e - this._index * this._inPageItemCount : this._inPageItemCount;
    this.updateData(this._dataArr, this._index, n, this._inPageItemCount);
  };
  e.prototype.changeToPage = function (t, e, n) {
    this._index = t;
    var o = this._index == e - 1 ? n - this._index * this._inPageItemCount : this._inPageItemCount;
    this.updateData(this._dataArr, this._index, o, this._inPageItemCount);
  };
  e.prototype.getPageIndex = function () {
    return this._index;
  };
  e.prototype.createItem = function () {
    this.framingLoad(this._createItemCount);
  };
  e.prototype.framingLoad = function (t) {
    return r(this, undefined, undefined, function () {
      return s(this, function (e) {
        switch (e.label) {
          case 0:
            return [4, this.executePreFrame(this._getItemGenerator(t), 0.2)];
          case 1:
            e.sent();
            return [2];
        }
      });
    });
  };
  e.prototype._getItemGenerator = function (t) {
    var e;
    return s(this, function (n) {
      switch (n.label) {
        case 0:
          e = 0;
          n.label = 1;
        case 1:
          if (e < t) {
            if (this._changeFlag) {
              return [2];
            } else {
              return [4, this.initItem(e)];
            }
          } else {
            return [3, 4];
          }
        case 2:
          n.sent();
          n.label = 3;
        case 3:
          e++;
          return [3, 1];
        case 4:
          return [2];
      }
    });
  };
  e.prototype.initItem = function () {};
  e.prototype.executePreFrame = function (t, e) {
    var n = this;
    return new Promise(function (o) {
      var i = t;
      n._generator = t;
      var a = function () {
        for (var t = new Date().getTime(), r = i.next();; r = i.next()) {
          if (r == null || r.done) {
            return void o(null);
          }
          if (new Date().getTime() - t > e) {
            return void n.scheduleOnce(function () {
              a();
            });
          }
        }
      };
      a();
    });
  };
  return a([l], e);
}(cc.Component);
exports.default = u;