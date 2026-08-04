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
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r;
var s = require("./ManageCtl");
var c = require("./GridListItem");
var l = require("./MyTool");
(function (t) {
  t[t.init = 1] = "init";
  t[t.unlock = 2] = "unlock";
  t[t.lock = 3] = "lock";
})(r || (r = {}));
var u = cc._decorator;
var d = u.ccclass;
var h = u.property;
var p = u.menu;
var f = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.roleParentNode = null;
    e.lbRank = null;
    e.lbScore = null;
    e.lbCountry = null;
    e.bgNode = null;
    e._rank = 0;
    return e;
  }
  i(e, t);
  e.prototype.dataChanged = function () {
    this.setInfo(this.data);
  };
  e.prototype.updateItem = function () {};
  e.prototype.setInfo = function (t) {
    this._rank = t;
    var e = s.ManageCtl.gameData.getPassRankData()[this._rank];
    if (e) {
      var n = this._rank + 1;
      this.lbRank.string = "第" + n + "名";
      this.lbScore.string = e.score.toString();
      this.lbCountry.string = e.c;
      this.bgNode.children.forEach(function (t) {
        t.opacity = t.name == "bg" + n ? 255 : 0;
      });
      if (n >= 4) {
        this.bgNode.getChildByName("bg4").opacity = 255;
      }
      this.loadRole(e.score);
    }
  };
  e.prototype.loadRole = function (t) {
    var e = Math.ceil(t / 10);
    if (e < 0) {
      e = 0;
    }
    if (e > 22) {
      e = 22;
    }
    var n = 1;
    this.roleParentNode.children.forEach(function (t) {
      if (Number(t.name) > e) {
        t.active = false;
      } else {
        t.active = true;
      }
      var o = t.getComponent(sp.Skeleton);
      n = l.MyTool.myRandom(1, 30);
      o.setSkin("icon_turtle_" + n);
    });
  };
  a([h(cc.Node)], e.prototype, "roleParentNode", undefined);
  a([h(cc.Label)], e.prototype, "lbRank", undefined);
  a([h(cc.Label)], e.prototype, "lbScore", undefined);
  a([h(cc.Label)], e.prototype, "lbCountry", undefined);
  a([h(cc.Node)], e.prototype, "bgNode", undefined);
  return a([d, p("ui/RankNode_stageItem")], e);
}(c.default);
exports.default = f;