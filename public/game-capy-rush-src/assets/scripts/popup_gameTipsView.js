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
var l = require("./baseCompont");
var u = require("./MyAnimationTool");
var d = require("./myBtnClick");
var h = require("./uiPathManage");
var p = require("./jsonConfig");
var f = require("./myJsonCtl");
var g = cc._decorator;
var m = g.ccclass;
g.property;
var y = g.menu;
var _ = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.bg = null;
    e.lbTips = null;
    e._contentNode = null;
    e._curModeId = 1;
    e._curDevId = -1;
    e._curLevelId = -1;
    e._byTipFlag = false;
    e._showAnswerDoneFlag = false;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.bg = this.dict.bg;
    this.lbTips = this.dict.lbTips.getComponent(cc.Label);
    this._contentNode = this.dict.contentNode;
  };
  e.prototype.start = function () {
    this.initData2();
  };
  e.prototype.onEnable = function () {
    u.MyAnimationTool.showViewAnimation(this.bg);
    cc.game.emit("wzzc_pause_game");
  };
  e.prototype.onDisable = function () {};
  e.prototype.initData = function () {};
  e.prototype.initData2 = function () {
    return r(this, undefined, undefined, function () {
      var t;
      var e;
      return s(this, function (n) {
        switch (n.label) {
          case 0:
            this._curModeId = c.ManageCtl.gameData.getCurModeId();
            t = this;
            return [4, c.ManageCtl.gameData.getCurDevId()];
          case 1:
            t._curDevId = n.sent();
            this._curLevelId = c.ManageCtl.gameData.getCurLevelId();
            return [4, f.myJsonCtl.getJsonInfoByKey(p.jsonName.tips, this._curDevId)];
          case 2:
            if ((e = n.sent()) && e.tips && this.lbTips) {
              this.lbTips.string = e.tips;
              return [2];
            } else {
              this.loadLevelTipsPrefab();
              return [2];
            }
        }
      });
    });
  };
  e.prototype.btnClick_close = function (t) {
    if (d.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      this.gotoClose();
    }
  };
  e.prototype.btnClick_ok = function (t) {
    if (d.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      this.gotoClose();
    }
  };
  e.prototype.gotoClose = function () {
    cc.game.emit("wzzc_resume_game");
    c.ManageCtl.uiManage.gotoDestroyUI(h.uiPath.uiName.popup_gameTipsView);
  };
  e.prototype.loadLevelTipsPrefab = function () {
    this._contentNode.removeAllChildren();
    this.loadLevelPrefab1();
  };
  e.prototype.loadLevelPrefab1 = function () {
    var t = this;
    cc.assetManager.loadBundle("level", function (e, n) {
      if (e) {
        t.loadLevelPrefab1();
      } else {
        t.loadLevelPrefab2(n);
      }
    });
  };
  e.prototype.loadLevelPrefab2 = function (t) {
    var e = this;
    var n = "prefab/tips/zqddn_zhb_tip" + this._curDevId;
    t.load(n, function (t, o) {
      if (t) {
        e.loadTipPrefab2(n);
      } else {
        var i = cc.instantiate(o);
        i.scale = 0.7;
        e._contentNode.addChild(i);
        i.position = cc.v3(0, 10);
      }
    });
  };
  e.prototype.loadTipPrefab2 = function (t) {
    var e = this;
    return new Promise(function (n) {
      return r(e, undefined, undefined, function () {
        var e = this;
        return s(this, function () {
          cc.assetManager.loadBundle("level", function (o, i) {
            i.load("prefab/tips/zqddn_zhb_tip-picture", function (o, i) {
              if (i) {
                var a = cc.instantiate(i);
                a.children[0].name = e._curDevId.toString();
                a.setPosition(cc.v2(0, 0));
                e._contentNode.addChild(a);
                n();
              } else {
                e.loadLevelPrefab2(t);
              }
            });
          });
          return [2];
        });
      });
    });
  };
  return a([m, y("ui/popup_gameTipsView")], e);
}(l.default);
exports.default = _;