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
var l = require("./MyLoadSubAssetsCtl");
var u = require("./SdkConfig");
var d = require("./baseCompont");
var h = require("./GridListView");
var p = require("./MyAnimationTool");
var f = require("./myBtnClick");
var g = require("./uiPathManage");
var m = require("./jsonConfig");
var y = require("./myJsonCtl");
var _ = cc._decorator;
var v = _.ccclass;
_.property;
var C = _.menu;
var w = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.bg = null;
    e._gridListView = null;
    e._curModeId = 1;
    e._curDevId = 1;
    e._curLevelId = 1;
    e._openGridListViewArr = [];
    e._beginShowModeId = -1;
    e._canLoadList = {};
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.bg = this.dict.bg;
    this._gridListView = this.dict.scrollView.getComponent(h.default);
    c.ManageCtl.myMsgCtl.on(u.MyConstans.msg.clickModeItem, this.onclickModeItem, this);
    c.ManageCtl.myMsgCtl.on(u.MyConstans.msg.clickModeItem_advancePlay, this.onclickModeItem_advancePlay, this);
  };
  e.prototype.onDestroy = function () {
    c.ManageCtl.myMsgCtl.off(u.MyConstans.msg.clickModeItem, this.onclickModeItem, this);
    c.ManageCtl.myMsgCtl.off(u.MyConstans.msg.clickModeItem_advancePlay, this.onclickModeItem_advancePlay, this);
  };
  e.prototype.onEnable = function () {
    p.MyAnimationTool.showViewAnimation(this.bg);
  };
  e.prototype.start = function () {};
  e.prototype.onDisable = function () {};
  e.prototype.initData = function (t) {
    return r(this, undefined, undefined, function () {
      var e;
      return s(this, function (n) {
        switch (n.label) {
          case 0:
            this._curModeId = c.ManageCtl.gameData.getCurModeId();
            e = this;
            return [4, c.ManageCtl.gameData.getCurDevId()];
          case 1:
            e._curDevId = n.sent();
            this._curLevelId = c.ManageCtl.gameData.getCurLevelId();
            if (t && t.beginShowModeId) {
              this._beginShowModeId = t.beginShowModeId;
            }
            this.updateProShow();
            this.showListNode();
            return [2];
        }
      });
    });
  };
  e.prototype.loadList = function (t) {
    return r(this, undefined, undefined, function () {
      var e;
      var n;
      var o;
      var i;
      var a;
      var r;
      var c;
      var l;
      var u;
      var d;
      var h;
      return s(this, function (s) {
        switch (s.label) {
          case 0:
            return [4, y.myJsonCtl.getJson(m.jsonName.mode)];
          case 1:
            e = s.sent();
            n = [];
            o = [];
            for (i in e) {
              if (e[i].id != 1) {
                if (!this.checkInHideArr(e[i].id)) {
                  o.push(e[i]);
                }
              }
            }
            a = -1;
            r = 0;
            for (; r < o.length; r++) {
              c = o[r];
              n.push(c.id);
              if (-1 != this._beginShowModeId && c.id == this._beginShowModeId) {
                a = r;
              }
            }
            t.setData(n);
            this._openGridListViewArr.push(t);
            if (-1 != a) {
              l = t.scrollView;
              u = l.getMaxScrollOffset();
              d = a / 2 - 1;
              h = cc.misc.clampf(d * (t.spaceY + t.itemHeight), 0, u.y);
              this.scheduleOnce(function () {
                l.scrollToOffset(cc.v2(0, h), 0.3);
              }, 0.2);
            }
            return [2];
        }
      });
    });
  };
  e.prototype.checkInHideArr = function (t) {
    var e = c.ManageCtl.bmsCtl.getConditionValueByType("HideMode");
    return !!(e && e.length > 0 && e.includes(t));
  };
  e.prototype.btnClick_back = function (t) {
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      this.gotoClose();
    }
  };
  e.prototype.gotoClose = function () {
    c.ManageCtl.uiManage.gotoDestroyUI(g.uiPath.uiName.popup_modeView);
  };
  e.prototype.onclickModeItem = function (t) {
    return r(this, undefined, undefined, function () {
      var e;
      var n;
      var o;
      var i;
      return s(this, function () {
        e = t.modeId;
        n = t.unlock;
        t.tag;
        if (l.default.GetInstance().isLoadSubDone()) {
          if (n) {
            if (e == 5) {
              c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.showPopupView, g.uiPath.uiName.popup_saveGirlLvView);
              return [2];
            } else {
              c.ManageCtl.gameData.setModeUnlock(e);
              o = c.ManageCtl.gameData.getPassLvByMode(e);
              i = o + 1;
              this.gotoMode(e, i);
              return [2];
            }
          } else {
            return [2];
          }
        } else {
          c.ManageCtl.persistRootNode.showTipsUI("关卡加载中，请稍后重试");
          return [2];
        }
      });
    });
  };
  e.prototype.onclickModeItem_advancePlay = function (t) {
    var e = this;
    var n = t.modeId;
    c.ManageCtl.playVideo(function () {
      var t = c.ManageCtl.gameData.getPassLvByMode(n) + 1;
      e.gotoMode(n, t);
    });
  };
  e.prototype.gotoMode = function (t, e) {
    return r(this, undefined, undefined, function () {
      var n;
      var o;
      var i = this;
      return s(this, function (a) {
        switch (a.label) {
          case 0:
            c.ManageCtl.persistRootNode.showLoadCircle();
            c.ManageCtl.gameData.setCurModeId(t);
            c.ManageCtl.gameData.setCurLevelId(e);
            return [4, y.myJsonCtl.getJson(c.ManageCtl.getModeNameByModeId(t))];
          case 1:
            n = a.sent();
            e = c.ManageCtl.getOtherLevelId(t, e, n);
            o = n[e].LevelId1;
            c.ManageCtl.gameData.setCurDevId(o);
            this.scheduleOnce(function () {
              c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.showGameView);
              c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.gameReLoadLevel);
              c.ManageCtl.uiManage.gotoDestroyUI(g.uiPath.uiName.popup_gameWinView);
              c.ManageCtl.uiManage.gotoDestroyUI(g.uiPath.uiName.popup_gameLoseView);
              c.ManageCtl.uiManage.gotoDestroyUI(g.uiPath.uiName.popup_gameLoseView2);
              i.gotoClose();
            }, 1);
            return [2];
        }
      });
    });
  };
  e.prototype.updateProShow = function () {
    return r(this, undefined, undefined, function () {
      return s(this, function () {
        return [2];
      });
    });
  };
  e.prototype.showListNode = function () {
    this._gridListView.node.active = true;
    if (!this._canLoadList[1]) {
      this.loadList(this._gridListView, 1);
    }
    this._canLoadList[1] = 1;
  };
  e.prototype.btnClick_jumpMode = function (t) {
    return r(this, undefined, undefined, function () {
      return s(this, function () {
        f.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3);
        return [2];
      });
    });
  };
  return a([v, C("ui/popup_modeView")], e);
}(d.default);
exports.default = w;