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
var r = require("./Language");
var s = cc._decorator;
var c = s.ccclass;
s.property;
var l = s.menu;
var u = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.loadCount = 0;
    e.oldSpriteFrame = null;
    return e;
  }
  i(e, t);
  e.prototype.start = function () {
    console.log("## ExSprite");
    if (r.default.instance.lan != "cn") {
      this.loadImg();
    }
  };
  e.prototype.onLoad = function () {};
  e.prototype.loadImg = function () {
    var t = this;
    var e = this.spriteFrame.name;
    if (e) {
      var n = this.getFineName(e);
      this.oldSpriteFrame = this.spriteFrame;
      this.spriteFrame = null;
      cc.assetManager.loadBundle("local", function (o, i) {
        i.load(n, function (n, o) {
          if (n) {
            if (t.loadCount == 0) {
              t.loadCount += 1;
              t.loadImg2(e);
            }
          } else {
            t.spriteFrame = null;
            t.spriteFrame = new cc.SpriteFrame(o);
          }
        });
      });
    }
  };
  e.prototype.getFineName = function (t, e) {
    if (e === undefined) {
      e = "";
    }
    if (e != "") {
      return "word/" + e + "/" + t;
    } else {
      return "word/" + r.default.instance.lan + "/" + t;
    }
  };
  e.prototype.loadImg2 = function (t) {
    var e = this;
    if (t) {
      var n = this.getFineName(t, "en");
      cc.assetManager.loadBundle("local", function (t, o) {
        o.load(n, function (t, n) {
          if (t) {
            if (e.oldSpriteFrame) {
              e.spriteFrame = e.oldSpriteFrame;
            }
            return void (e.oldSpriteFrame = null);
          }
          e.spriteFrame = null;
          e.spriteFrame = new cc.SpriteFrame(n);
        });
      });
    }
  };
  return a([c, l("util/ExSprite")], e);
}(cc.Sprite);
exports.default = u;