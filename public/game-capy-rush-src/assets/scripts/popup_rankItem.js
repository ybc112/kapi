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
    e.lbRank = null;
    e.lbScore = null;
    e.lbUserName = null;
    e.bgNode = null;
    e.imgHand = null;
    e.defaultHand = null;
    return e;
  }
  i(e, t);
  e.prototype.dataChanged = function () {
    this.setInfo(this.data);
  };
  e.prototype.updateItem = function () {};
  e.prototype.setInfo = function (t) {
    this._rankInfo = t;
    var e = s.ManageCtl.gameData.getPassRankData()[this._rankInfo.uuid];
    if (e) {
      var n = e.seq;
      this.lbRank.string = n.toString();
      this.lbScore.string = e.score + "关";
      this.lbUserName.string = e.userName ? l.MyTool.base64Decode(e.userName) : "游客";
      this.imgHand.spriteFrame = this.defaultHand;
      if (e.userHeadUrl) {
        l.MyTool.setSprite(this.imgHand, e.userHeadUrl);
      }
      this.bgNode.children.forEach(function (t) {
        t.active = t.name == "bg" + n;
      });
      if (n >= 4) {
        this.bgNode.getChildByName("bg4").active = true;
      }
      this.lbRank.node.active = n >= 4;
    }
  };
  a([h(cc.Label)], e.prototype, "lbRank", undefined);
  a([h(cc.Label)], e.prototype, "lbScore", undefined);
  a([h(cc.Label)], e.prototype, "lbUserName", undefined);
  a([h(cc.Node)], e.prototype, "bgNode", undefined);
  a([h(cc.Sprite)], e.prototype, "imgHand", undefined);
  a([h(cc.SpriteFrame)], e.prototype, "defaultHand", undefined);
  return a([d, p("ui/popup_rankItem")], e);
}(c.default);
exports.default = f;