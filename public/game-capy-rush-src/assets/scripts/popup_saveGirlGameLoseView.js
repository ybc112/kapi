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
var l = require("./SdkConfig");
var u = require("./baseCompont");
var d = require("./MyAnimationTool");
var h = require("./myBtnClick");
var p = require("./statsCtl");
var f = require("./uiPathManage");
var g = cc._decorator;
var m = g.ccclass;
g.property;
var y = g.menu;
var _ = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.bg = null;
    e._callback = null;
    e._curModeId = 1;
    e._curDevId = 1;
    e._curLevelId = 1;
    e._pro = 0;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.bg = this.dict.bg;
  };
  e.prototype.onEnable = function () {
    d.MyAnimationTool.showViewAnimation(this.bg);
  };
  e.prototype.onDisable = function () {};
  e.prototype.initData = function (t) {
    return r(this, undefined, undefined, function () {
      var e;
      var n;
      var o;
      var i;
      var a = this;
      return s(this, function (r) {
        switch (r.label) {
          case 0:
            this._curModeId = c.ManageCtl.gameData.getCurModeId();
            e = this;
            return [4, c.ManageCtl.gameData.getCurDevId()];
          case 1:
            e._curDevId = r.sent();
            this._curLevelId = c.ManageCtl.gameData.getCurLevelId();
            if (!this.dict) {
              this.loadNodeTree();
            }
            this._callback = t.call;
            n = t.errorType;
            this._pro = t.pro;
            o = "复活并解锁一个新炮台";
            switch (n) {
              case 1:
                this.dict.cannonNode.active = true;
                break;
              case 2:
                this.dict.cannonNode.active = false;
                o = "复活将巨龙击退";
            }
            this.dict.lbTip.getComponent(cc.Label).string = o;
            i = c.ManageCtl.gameData.getLevelGameTime();
            p.statsCtl.sendEventShuShu("Level_Lose", {
              mode: this._curModeId,
              devid: this._curDevId,
              lv: this._curLevelId,
              progress: c.ManageCtl.gameData.getGameProgress(),
              gametime: i
            });
            p.statsCtl.sendEventShuShu("Level_Time", {
              mode: this._curModeId,
              devid: this._curDevId,
              lv: this._curLevelId,
              gametime: i,
              type: 2
            });
            if (window.h5_daren && window.mj_auto) {
              if (c.ManageCtl.gameData.loseAutoReviveFlag) {
                this.scheduleOnce(function () {
                  if (a._callback) {
                    a._callback();
                  }
                  a.gotoClose();
                }, 2);
              } else {
                this.scheduleOnce(function () {
                  c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.gameRestart);
                  a.gotoClose();
                }, 2);
              }
            }
            return [2];
        }
      });
    });
  };
  e.prototype.btnClick_replay = function (t) {
    if (h.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.showPopupView, f.uiPath.uiName.popup_saveGirlGameLoseView2, {
        pro: this._pro
      });
      this.gotoClose();
    }
  };
  e.prototype.btnClick_revive = function (t) {
    var e = this;
    if (h.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      c.ManageCtl.playVideo(function () {
        if (e.node && cc.isValid(e.node)) {
          p.statsCtl.sendEventShuShu("reward_btn", {
            mode: e._curModeId,
            devid: e._curDevId,
            lv: e._curLevelId,
            progress: c.ManageCtl.gameData.getGameProgress(),
            scene: "revive"
          });
          if (e._callback) {
            e._callback();
          }
          e.gotoClose();
        }
      });
    }
  };
  e.prototype.gotoClose = function () {
    c.ManageCtl.uiManage.gotoDestroyUI(f.uiPath.uiName.popup_saveGirlGameLoseView);
  };
  return a([m, y("ui/popup_saveGirlGameLoseView")], e);
}(u.default);
exports.default = _;