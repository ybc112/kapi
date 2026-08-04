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
var r = require("./baseCompont");
var s = cc._decorator;
var c = s.ccclass;
var l = s.property;
var u = s.menu;
var d = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.generalSpriteMaterial = null;
    e.graySpriteMaterial = null;
    return e;
  }
  i(e, t);
  e.prototype.setGray = function () {
    var t = this;
    this.node.children.forEach(function (e) {
      if (e.getComponent(cc.Sprite)) {
        e.getComponent(cc.Sprite).setMaterial(0, t.graySpriteMaterial);
        if (e.childrenCount > 0) {
          e.children.forEach(function (e) {
            if (e.getComponent(cc.Sprite)) {
              e.getComponent(cc.Sprite).setMaterial(0, t.graySpriteMaterial);
            }
          });
        }
      }
    });
  };
  e.prototype.setGeneral = function () {
    var t = this;
    this.node.children.forEach(function (e) {
      if (e.getComponent(cc.Sprite)) {
        e.getComponent(cc.Sprite).setMaterial(0, t.generalSpriteMaterial);
      }
      if (e.childrenCount > 0) {
        e.children.forEach(function (e) {
          if (e.getComponent(cc.Sprite)) {
            e.getComponent(cc.Sprite).setMaterial(0, t.generalSpriteMaterial);
          }
        });
      }
    });
  };
  a([l({
    type: cc.Material
  })], e.prototype, "generalSpriteMaterial", undefined);
  a([l({
    type: cc.Material
  })], e.prototype, "graySpriteMaterial", undefined);
  return a([c, u("ui/common/common_setBtnCanClick")], e);
}(r.default);
exports.default = d;