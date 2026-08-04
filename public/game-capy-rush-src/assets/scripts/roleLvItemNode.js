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
var c = require("./ManageCtl");
var l = require("./GridListItem");
var u = require("./MyTool");
var d = require("./jsonConfig");
var h = require("./myJsonCtl");
var p = cc._decorator;
var f = p.ccclass;
var g = p.property;
var m = p.menu;
var y = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.getBg = null;
    e.lockBg = null;
    e.curBg = null;
    e.roleEffect = null;
    e.lbLv = null;
    e.lbName = null;
    e.lbQiLv = null;
    e._roleId = -1;
    return e;
  }
  i(e, t);
  e.prototype.dataChanged = function () {
    this.setInfo(this.data);
  };
  e.prototype.updateItem = function () {
    this.setInfo(this.data);
  };
  e.prototype.setInfo = function (t) {
    return r(this, undefined, undefined, function () {
      var e;
      var n;
      var o;
      var i;
      var a;
      var r;
      var l;
      var p;
      var f;
      return s(this, function (s) {
        switch (s.label) {
          case 0:
            return [4, h.myJsonCtl.getJsonInfoByKey(d.jsonName.roleLv, t)];
          case 1:
            if (!(e = s.sent())) {
              return [2];
            }
            this._roleId = t;
            this.lbLv.string = "Lv." + e.stageId;
            this.lbName.string = e.stageName;
            n = e.bigImg;
            o = "role/" + n;
            this.roleEffect.node.mLoadName = o;
            u.MyTool.loadSkeleton(o, this.roleEffect.node, "animation");
            i = {
              xiake_da_04: 0.22,
              xiake_da_05: 0.22,
              xiake_da_06: 0.21,
              xiake_da_07: 0.22,
              xiake_da_08: 0.21,
              xiake_da_09: 0.2,
              xiake_da_10: 0.19,
              xiake_da_11: 0.2,
              xiake_da_12: 0.2,
              xiake_da_13: 0.2,
              xiake_da_14: 0.18,
              xiake_da_15: 0.17
            };
            this.roleEffect.node.scale = i[n] ? i[n] : 0.25;
            a = c.ManageCtl.gameData.getRoleLvInfo();
            r = a.stageId;
            l = a.qiLv;
            this.lbQiLv.string = "";
            for (f in p = c.ManageCtl.getAllRoleInfo()) {
              if (p[f].stageId == r && p[f].qiLevel == l) {
                this.lbQiLv.string = p[f].qiName;
                break;
              }
            }
            this.getBg.opacity = 0;
            this.lockBg.opacity = 0;
            this.curBg.opacity = 0;
            if (e.stageId < r) {
              this.getBg.opacity = 255;
              this.lbQiLv.node.active = false;
              this.roleEffect.node.color = cc.Color.WHITE;
            } else if (e.stageId == r) {
              this.curBg.opacity = 255;
              this.lbQiLv.node.active = true;
              this.roleEffect.node.color = cc.Color.WHITE;
            } else {
              this.lockBg.opacity = 255;
              this.lbQiLv.node.active = false;
              this.roleEffect.node.color = cc.Color.BLACK;
            }
            return [2];
        }
      });
    });
  };
  a([g(cc.Node)], e.prototype, "getBg", undefined);
  a([g(cc.Node)], e.prototype, "lockBg", undefined);
  a([g(cc.Node)], e.prototype, "curBg", undefined);
  a([g(sp.Skeleton)], e.prototype, "roleEffect", undefined);
  a([g(cc.Label)], e.prototype, "lbLv", undefined);
  a([g(cc.Label)], e.prototype, "lbName", undefined);
  a([g(cc.Label)], e.prototype, "lbQiLv", undefined);
  return a([f, m("ui/roleLvItemNode")], e);
}(l.default);
exports.default = y;