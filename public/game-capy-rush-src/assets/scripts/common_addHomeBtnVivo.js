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
var r = require("./MyPlatform");
var s = require("./myBtnClick");
var c = cc._decorator;
var l = c.ccclass;
c.property;
var u = c.menu;
var d = function (t) {
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  i(e, t);
  e.prototype.start = function () {
    this.node.active = false;
    if (r.default.isVIVO) {
      if (!window.qg) {
        return;
      }
      var t = this;
      window.qg.hasShortcutInstalled({
        success: function (e) {
          if (e) {
            console.log("已创建");
            t.node.active = false;
          } else {
            console.log("未创建");
            t.node.active = true;
          }
        }
      });
    }
  };
  e.prototype.btnClick_addHome = function (t) {
    if (s.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      var e = this;
      var n = window.qg;
      if (n) {
        n.installShortcut({
          success: function () {
            console.log("创建成功");
            e.node.active = false;
          }
        });
      }
    }
  };
  return a([l, u("ui/common/common_addHomeBtnVivo")], e);
}(cc.Component);
exports.default = d;