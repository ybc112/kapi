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
var c = require("./MyPageView_pageItem");
var l = require("./MyTool");
var u = require("./jsonConfig");
var d = require("./myJsonCtl");
var h = require("./ManageCtl");
var p = require("./SdkConfig");
var f = cc._decorator;
var g = f.ccclass;
f.property;
var m = f.menu;
var y = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e._waitBuildFlag = false;
    e._curNeedCountNode = null;
    e._doneEffect = null;
    e._lbNeedCount = null;
    e._imgMaterial = null;
    e._imgShow = null;
    e._curNeedAllMaterialCount = 1;
    e._curBuildNode = null;
    return e;
  }
  i(e, t);
  e.prototype.onRefresh = function (t) {
    this._index = t;
    this.initData();
  };
  e.prototype.onDisable = function () {
    this.unscheduleAllCallbacks();
  };
  e.prototype.initData = function () {
    return r(this, undefined, undefined, function () {
      var t;
      var e;
      var n;
      var o;
      var i;
      var a;
      var r;
      var c;
      var l;
      var f;
      var g;
      var m;
      var y;
      var _;
      var v;
      var C;
      var w;
      var b;
      var M;
      var k;
      var I;
      var S;
      return s(this, function (s) {
        switch (s.label) {
          case 0:
            t = h.ManageCtl.gameData.getBuildInfo();
            e = t.id;
            n = t.index;
            o = t.leftCount;
            i = t.reset;
            if (!this._curNeedCountNode) {
              this._curNeedCountNode = this.node.getChildByName("needCountNode");
            }
            if (this._index < e) {
              for (M = 0; M < this.node.childrenCount; M++) {
                if (-1 == (k = this.node.children[M]).name.indexOf("bg") && k.name != "needCountNode" && k.name != "doneEffect") {
                  a = k.getChildByName("lock");
                  r = k.getChildByName("show");
                  c = k.getChildByName("effectNode");
                  k.active = true;
                  a.active = false;
                  r.active = true;
                  r.getComponent(cc.Sprite).fillRange = 1;
                  this._curNeedCountNode.active = false;
                  if (c) {
                    c.active = true;
                    if (c.getChildByName("hideShowNode")) {
                      r.active = false;
                    }
                  }
                }
              }
              return [2];
            }
            if (this._index > e) {
              return [2];
            } else {
              this._waitBuildFlag = false;
              return [4, d.myJsonCtl.getJson(u.jsonName.build)];
            }
          case 1:
            l = s.sent();
            f = null;
            for (g in l) {
              if (l[g].Scene == e + 1 && l[g].Index == n + 1) {
                f = l[g];
              }
            }
            if (!f) {
              return [2];
            }
            this._curNeedAllMaterialCount = f.Materials;
            if (i == 1) {
              o = this._curNeedAllMaterialCount;
              h.ManageCtl.gameData.setBuildInfoPro(o);
              h.ManageCtl.gameData.setBuildInfoReset(0);
            }
            this._curNeedCountNode.opacity = 255;
            this._curNeedCountNode.active = h.ManageCtl.gameData.showBeginBuildFlag;
            m = this._curNeedCountNode.getChildByName("needCountBg");
            if (!this._lbNeedCount) {
              this._lbNeedCount = this._curNeedCountNode.getChildByName("lbNeedCount").getComponent(cc.Label);
            }
            y = (this._curNeedAllMaterialCount - o) / this._curNeedAllMaterialCount;
            this._lbNeedCount.string = Math.floor(100 * y) + "%";
            _ = n + 1;
            v = null;
            C = null;
            w = null;
            b = null;
            this._curBuildNode = null;
            M = 0;
            for (; M < this.node.childrenCount; M++) {
              if (-1 == (k = this.node.children[M]).name.indexOf("bg") && k.name != "needCountNode") {
                v = k.getChildByName("lock");
                C = k.getChildByName("show");
                b = k.getChildByName("effectNode");
                w = k.children[2];
                if (Number(k.name) < _) {
                  k.active = true;
                  v.active = false;
                  C.active = true;
                  if (b) {
                    b.active = true;
                    if (b.getChildByName("hideShowNode")) {
                      C.active = false;
                    }
                  }
                  C.getComponent(cc.Sprite).fillRange = 1;
                } else if (Number(k.name) == _) {
                  k.active = true;
                  v.active = true;
                  C.active = true;
                  if (b) {
                    b.active = false;
                  }
                  this._imgShow = C.getComponent(cc.Sprite);
                  I = w.parent.convertToWorldSpaceAR(w.position);
                  S = this._curNeedCountNode.parent.convertToNodeSpaceAR(I);
                  this._curNeedCountNode.position = S;
                  if (-1 != w.name.indexOf("-1")) {
                    m.scaleX = -1;
                  } else {
                    m.scaleX = 1;
                  }
                  this._imgMaterial = v.getComponent(cc.Sprite).getMaterial(0);
                  this._imgMaterial.effect.setProperty("enableSetColor", 1);
                  this._imgShow.fillRange = (this._curNeedAllMaterialCount - o) / this._curNeedAllMaterialCount;
                  this._waitBuildFlag = true;
                  h.ManageCtl.myMsgCtl.emit(p.MyConstans.msg.showNextBuildItem);
                  this._curBuildNode = k;
                } else {
                  k.active = false;
                }
              }
            }
            return [2];
        }
      });
    });
  };
  e.prototype.isWaitBuid = function () {
    return this._waitBuildFlag;
  };
  e.prototype.getNeedCountNode = function () {
    if (!this._curNeedCountNode) {
      this._curNeedCountNode = this.node.getChildByName("needCountNode");
    }
    return this._curNeedCountNode;
  };
  e.prototype.addMaterials = function () {
    var t = this;
    if (this._waitBuildFlag) {
      var e = h.ManageCtl.gameData.getBuildInfo();
      e.id;
      e.index;
      var n = e.leftCount;
      var o = (this._curNeedAllMaterialCount - n) / this._curNeedAllMaterialCount;
      this._imgShow.fillRange = o;
      this._lbNeedCount.string = Math.floor(100 * o) + "%";
      if (n <= 0) {
        this._waitBuildFlag = false;
        this._curNeedCountNode.active = false;
        for (var i = h.ManageCtl.gameData.addBuildInfoIndex(1), a = 0, r = 0; r < this.node.childrenCount; r++) {
          var s = this.node.children[r];
          if (-1 == s.name.indexOf("bg") && s.name != "needCountNode" && s.name != "doneEffect") {
            a += 1;
          }
        }
        this.scheduleOnce(function () {
          if (t.node && cc.isValid(t.node)) {
            if (!t._doneEffect) {
              t._doneEffect = t.node.getChildByName("doneEffect").getComponent(sp.Skeleton);
            }
            t._doneEffect.node.active = true;
            var e = t._curBuildNode.children[3];
            var n = e.parent.convertToWorldSpaceAR(e.position);
            var o = t._doneEffect.node.parent.convertToNodeSpaceAR(n);
            t._doneEffect.node.position = o;
            t._doneEffect.setAnimation(0, "animation", false);
            var i = l.MyTool.getStringAfterChar(e.name, "=");
            t._doneEffect.node.scale = Number(i);
            var a = t._curBuildNode.getChildByName("effectNode");
            if (a) {
              a.active = true;
              if (a.getChildByName("hideShowNode")) {
                t._curBuildNode.getChildByName("show").active = false;
              }
            }
            h.ManageCtl.audioManager.PlayEffect("a_right");
          }
        }, 0.15);
        cc.tween(this._curBuildNode).to(0.15, {
          scale: this._curBuildNode.scale + 0.1
        }).to(0.15, {
          scale: this._curBuildNode.scale
        }).delay(0.5).call(function () {
          if (t.node && cc.isValid(t.node)) {
            if (i >= a) {
              console.log("## 当前建筑建完");
              h.ManageCtl.gameData.setNextBuild();
              return void h.ManageCtl.myMsgCtl.emit(p.MyConstans.msg.changeNextBuild);
            }
            h.ManageCtl.gameData.setBuildInfoReset(1);
            t.initData();
          }
        }).start();
      }
    }
  };
  return a([g, m("ui/buildItem")], e);
}(c.default);
exports.default = y;