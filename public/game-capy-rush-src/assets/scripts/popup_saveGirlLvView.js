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
var c = require("./baseCompont");
var l = require("./myBtnClick");
var u = require("./MyTool");
var d = require("./uiPathManage");
var h = require("./jsonConfig");
var p = require("./myJsonCtl");
var f = require("./ManageCtl");
var g = require("./SdkConfig");
var m = cc._decorator;
var y = m.ccclass;
m.property;
var _ = m.menu;
var v = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e._levelItem = null;
    e._showAni = false;
    e._curLv = -1;
    e._nextLv = -1;
    e._endDate = null;
    e._allPassFlag = false;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this._levelItem = this.dict.levelItem;
    this._levelItem.getChildByName("wait").opacity = 0;
    this._levelItem.getChildByName("cur").opacity = 0;
    this._levelItem.getChildByName("pass").opacity = 0;
    this._levelItem.active = false;
  };
  e.prototype.onDestroy = function () {};
  e.prototype.onEnable = function () {};
  e.prototype.start = function () {
    return r(this, undefined, undefined, function () {
      var t;
      var e;
      var n;
      return s(this, function (o) {
        switch (o.label) {
          case 0:
            this.loadLevelItem();
            f.ManageCtl.gameData.setCurModeId(5);
            t = f.ManageCtl.gameData.getPassLvByMode(5);
            e = t + 1;
            return [4, p.myJsonCtl.getJson(f.ManageCtl.getModeNameByModeId(5))];
          case 1:
            n = o.sent();
            if (e > u.MyTool.getJsonLength(n)) {
              e = u.MyTool.getJsonLength(n);
            }
            f.ManageCtl.gameData.setCurLevelId(e);
            return [2];
        }
      });
    });
  };
  e.prototype.onDisable = function () {
    this.unscheduleAllCallbacks();
  };
  e.prototype.initData = function (t) {
    return r(this, undefined, undefined, function () {
      return s(this, function () {
        if (t && t.showAin) {
          this._showAni = t.showAin;
          this._curLv = t.curLv;
          this._nextLv = t.nextLv;
        }
        return [2];
      });
    });
  };
  e.prototype.btnClick_back = function (t) {
    if (l.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      f.ManageCtl.gameData.setCurModeId(1);
      f.ManageCtl.myMsgCtl.emit(g.MyConstans.msg.showMainView, {});
      this.gotoClose();
    }
  };
  e.prototype.gotoClose = function () {
    f.ManageCtl.uiManage.gotoDestroyUI(d.uiPath.uiName.popup_saveGirlLvView);
  };
  e.prototype.loadLevelItem = function () {
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
      var d;
      var g;
      var m;
      var y;
      var _;
      var v;
      var C;
      var w = this;
      return s(this, function (s) {
        switch (s.label) {
          case 0:
            t = f.ManageCtl.gameData.getPassLvByMode(5);
            if (this._showAni) {
              t = this._curLv - 1;
            }
            return [4, p.myJsonCtl.getJson(h.jsonName.mode5)];
          case 1:
            e = s.sent();
            n = null;
            o = 1;
            i = null;
            for (a in e) {
              o = Number(a);
              (n = cc.instantiate(this._levelItem)).active = true;
              n.name = o.toString();
              n.getChildByName("lbLv").getComponent(cc.Label).string = o.toString();
              this.dict.levelItemParentNode.addChild(n);
              i = this.dict.pathNode.getChildByName(a);
              d = i.parent.convertToWorldSpaceAR(i.position);
              g = n.parent.convertToNodeSpaceAR(d);
              n.position = g;
              if (o > t + 1) {
                n.getChildByName("wait").opacity = 255;
              } else if (o == t + 1) {
                n.getChildByName("cur").opacity = 255;
                r = n.getChildByName("cur").getChildByName("curLight");
                cc.tween(r).to(0.2, {
                  scale: 1.2
                }).to(0.2, {
                  scale: 1
                }).union().repeatForever().start();
              } else {
                n.getChildByName("pass").opacity = 255;
              }
            }
            c = null;
            if (t >= u.MyTool.getJsonLength(e)) {
              c = this.dict.pathNode.getChildByName("12");
              this.dict.bg_tishi.active = false;
              this.dict.bg_guanggao.active = false;
              this._allPassFlag = true;
            } else {
              c = this.dict.pathNode.getChildByName((t + 1).toString());
              this._allPassFlag = false;
            }
            l = this.dict.roleNode;
            if (c) {
              d = c.parent.convertToWorldSpaceAR(c.position);
              g = l.parent.convertToNodeSpaceAR(d);
              l.position = cc.v3(g.x, g.y + 0.4 * l.height);
            }
            this.scheduleOnce(function () {
              if (t >= 6) {
                var e = t - 2;
                var n = w.dict.scrollView.getComponent(cc.ScrollView).getMaxScrollOffset();
                var o = cc.misc.clampf(e * w.dict.levelItemParentNode.height, 0, -n.y);
                w.dict.scrollView.getComponent(cc.ScrollView).scrollToOffset(cc.v2(0, -o), 0.02);
              }
            }, 0.02);
            if (this._showAni) {
              m = this.dict.pathNode.getChildByName(this._nextLv.toString());
              y = m.parent.convertToWorldSpaceAR(m.position);
              _ = l.parent.convertToNodeSpaceAR(y);
              (v = this.dict.roleEffect.getComponent(sp.Skeleton)).setAnimation(0, "zou", false);
              if (_.x > l.x) {
                l.scaleX = 0.5;
              } else {
                l.scaleX = -0.5;
              }
              cc.tween(l).to(0.8, {
                position: cc.v3(_.x, _.y + 0.4 * l.height)
              }).call(function () {
                var t = w.dict.levelItemParentNode.getChildByName(w._curLv.toString());
                t.getChildByName("cur").opacity = 0;
                t.getChildByName("wait").opacity = 0;
                t.getChildByName("pass").opacity = 255;
                var e = w.dict.levelItemParentNode.getChildByName(w._nextLv.toString());
                e.getChildByName("cur").opacity = 255;
                e.getChildByName("wait").opacity = 0;
                e.getChildByName("pass").opacity = 0;
                v.setAnimation(0, "zou", true);
              }).start();
              if (this._nextLv >= 7) {
                if ((C = 0 - 300 * (this._nextLv - 7)) < -750) {
                  C = -750;
                }
                this.dict.mapNode.y = C;
                console.log("## newY", C);
              }
            }
            return [2];
        }
      });
    });
  };
  e.prototype.btnClick_click = function (t) {
    return r(this, undefined, undefined, function () {
      var e;
      var n;
      var o;
      var i;
      return s(this, function (a) {
        switch (a.label) {
          case 0:
            if (l.default.instance.baseBtnClick(this.node.name + t.target.name)) {
              e = t.target;
              n = Number(e.name);
              if (e.getChildByName("pass").opacity != 255) {
                return [3, 4];
              } else if (this._allPassFlag) {
                f.ManageCtl.gameData.setCurModeId(5);
                o = undefined;
                return [4, p.myJsonCtl.getJson(f.ManageCtl.getModeNameByModeId(5))];
              } else {
                return [3, 2];
              }
            } else {
              return [2];
            }
          case 1:
            i = a.sent();
            f.ManageCtl.gameData.setCurLevelId(n);
            o = i[n].LevelId1;
            f.ManageCtl.gameData.setCurDevId(o);
            f.ManageCtl.myMsgCtl.emit(g.MyConstans.msg.showGameView);
            this.gotoClose();
            return [3, 3];
          case 2:
            f.ManageCtl.persistRootNode.showTipsUI("本关已通过");
            a.label = 3;
          case 3:
            return [2];
          case 4:
            if (e.getChildByName("wait").opacity == 255) {
              f.ManageCtl.persistRootNode.showTipsUI("需要先通过前面的关卡");
              return [2];
            }
            a.label = 5;
          case 5:
            f.ManageCtl.myMsgCtl.emit(g.MyConstans.msg.showPopupView, d.uiPath.uiName.popup_saveGirlGetTipView, {
              lv: n
            });
            return [2];
        }
      });
    });
  };
  e.prototype.btnClick_getTip = function (t) {
    if (l.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      f.ManageCtl.persistRootNode.showTipsUI("通过第12关可获得喜庆蛇皮肤");
    }
  };
  e.prototype.btnClick_saveGrilCollect = function (t) {
    if (l.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      f.ManageCtl.myMsgCtl.emit(g.MyConstans.msg.showPopupView, d.uiPath.uiName.popup_saveGirlCollectView);
    }
  };
  return a([y, _("ui/popup_saveGirlLvView")], e);
}(c.default);
exports.default = v;