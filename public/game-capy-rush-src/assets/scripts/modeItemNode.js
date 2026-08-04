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
var u = require("./GridListItem");
var d = require("./MyTool");
var h = require("./myBtnClick");
var p = require("./jsonConfig");
var f = require("./myJsonCtl");
var g = cc._decorator;
var m = g.ccclass;
var y = g.property;
var _ = g.menu;
var v = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.lockNode = null;
    e.lockNode2 = null;
    e.videoNode = null;
    e.lbName = null;
    e.imgIcon = null;
    e.btnAdvancePlay = null;
    e.lbUnlockLv = null;
    e.getSkinNode = null;
    e._mId = -1;
    e._unlockFlag = false;
    e._needUnlockLv = 0;
    return e;
  }
  i(e, t);
  e.prototype.dataChanged = function () {
    this.setInfo(this.data);
  };
  e.prototype.updateItem = function () {
    this.setInfo(this.data);
  };
  e.prototype.setInfo = function (t) {
    return r(this, undefined, undefined, function () {
      var e;
      var n;
      var o;
      var i;
      var a;
      var r;
      return s(this, function (s) {
        switch (s.label) {
          case 0:
            this._mId = t;
            return [4, f.myJsonCtl.getJsonInfoByKey(p.jsonName.mode, t)];
          case 1:
            if (!(e = s.sent())) {
              return [2];
            }
            this.lbName.string = e.modeName;
            n = t.toString();
            this.imgIcon.node.mReloImgFalg = true;
            this.imgIcon.node.mLoadName = n;
            d.MyTool.loadImgByName("/modeIcon/moshi", n, this.imgIcon);
            this._unlockFlag = c.ManageCtl.gameData.checkModeIsUnlock(this._mId);
            if (!this._unlockFlag && e.lv) {
              o = e.lv;
              i = c.ManageCtl.bmsCtl.getConditionValueByType("modeMain");
              a = 0;
              for (; a < i.length; a++) {
                if ((r = i[a])[0] == this._mId) {
                  o = r[1];
                  break;
                }
              }
              this._needUnlockLv = o;
              if (c.ManageCtl.gameData.getPassLvByMode(1) >= o) {
                this._unlockFlag = true;
              }
              this.lbUnlockLv.string = "通过" + o + "关解锁";
            }
            this.showByState();
            return [2];
        }
      });
    });
  };
  e.prototype.showByState = function () {
    if (this._unlockFlag) {
      this.lockNode.active = false;
      this.lockNode2.active = false;
      this.imgIcon.node.color = cc.Color.WHITE;
    } else {
      if (this._mId == 5) {
        this.lockNode.active = false;
        this.lockNode2.active = true;
        this.imgIcon.node.color = cc.Color.WHITE;
      } else {
        this.lockNode.active = true;
        this.lockNode2.active = false;
        this.imgIcon.node.color = cc.Color.GRAY;
      }
      if (this._mId == 5) {
        this.btnAdvancePlay.active = false;
      }
    }
    if (this._mId == 5) {
      var t = c.ManageCtl.gameData.getPassLvByMode(5);
      this.getSkinNode.active = t < 12;
    } else {
      this.getSkinNode.active = false;
    }
  };
  e.prototype.btnClick_item = function (t) {
    if (h.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      if (!this._unlockFlag && this._needUnlockLv > 0) {
        c.ManageCtl.persistRootNode.showTipsUI("通过主线第" + this._needUnlockLv + "关解锁");
      } else {
        c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.clickModeItem, {
          modeId: this._mId,
          unlock: this._unlockFlag,
          needUnlockLv: this._needUnlockLv
        });
      }
    }
  };
  e.prototype.btnClick_advancePlay = function (t) {
    if (h.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      c.ManageCtl.myMsgCtl.emit(l.MyConstans.msg.clickModeItem_advancePlay, {
        modeId: this._mId,
        unlock: this._unlockFlag,
        needUnlockLv: this._needUnlockLv
      });
    }
  };
  a([y(cc.Node)], e.prototype, "lockNode", undefined);
  a([y(cc.Node)], e.prototype, "lockNode2", undefined);
  a([y(cc.Node)], e.prototype, "videoNode", undefined);
  a([y(cc.Label)], e.prototype, "lbName", undefined);
  a([y(cc.Sprite)], e.prototype, "imgIcon", undefined);
  a([y(cc.Node)], e.prototype, "btnAdvancePlay", undefined);
  a([y(cc.Label)], e.prototype, "lbUnlockLv", undefined);
  a([y(cc.Node)], e.prototype, "getSkinNode", undefined);
  return a([m, _("ui/modeItemNode")], e);
}(u.default);
exports.default = v;