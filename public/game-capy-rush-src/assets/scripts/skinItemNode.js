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
var l = require("./MyPlatform");
var u = require("./SdkConfig");
var d = require("./GridListItem");
var h = require("./Language");
var p = require("./MyTool");
var f = require("./myBtnClick");
var g = require("./statsCtl");
var m = require("./jsonConfig");
var y = require("./myJsonCtl");
var _ = cc._decorator;
var v = _.ccclass;
var C = _.property;
var w = _.menu;
var b = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.unlockBg = null;
    e.lockNode = null;
    e.useNode = null;
    e.lbName = null;
    e.imgIcon = null;
    e.videoNode = null;
    e.lbVideo = null;
    e.lbLockTxt = null;
    e._mid = -1;
    e._typeId = -1;
    e._skinId = -1;
    e._unlockFlag = false;
    e._unlockLv = 1;
    e._needUnlock = 1;
    e._jsonInfo = null;
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
      return s(this, function (o) {
        switch (o.label) {
          case 0:
            this._mid = t;
            return [4, y.myJsonCtl.getJsonInfoByKey(m.jsonName.gameSkin, t)];
          case 1:
            if (e = o.sent()) {
              this._jsonInfo = e;
              this.lbLockTxt.string = "";
              this._typeId = e.typeId;
              this._skinId = e.skinId;
              this.lbName.string = e.skinName;
              n = "/skin/";
              if (this._typeId == 1) {
                n += "role/img_role" + this._skinId;
              } else if (this._typeId == 2) {
                n += "bg/img_bg" + this._skinId;
              } else if (this._typeId == 3) {
                n += "goods/img_goods" + this._skinId;
              }
              this.imgIcon.node.mReloImgFalg = true;
              p.MyTool.loadImg(n, this.imgIcon);
              this.updateUse();
              return [2];
            } else {
              return [2];
            }
        }
      });
    });
  };
  e.prototype.updateUse = function () {
    if (this._jsonInfo) {
      var t = c.ManageCtl.gameData.getSkinInfoByTypeId(this._typeId);
      var e = t.get;
      var n = t.use;
      var o = t.unlock;
      this._unlockFlag = false;
      if (e.includes(this._skinId)) {
        this._unlockFlag = true;
        this.lockNode.active = false;
        this.videoNode.active = false;
        return void (this.useNode.active = this._skinId == n);
      }
      var i = c.ManageCtl.gameData.getPassLvByMode(1);
      if (this._jsonInfo.unlockLv && i >= this._jsonInfo.unlockLv) {
        this._unlockFlag = true;
        this.lockNode.active = false;
        this.videoNode.active = false;
        return void (this.useNode.active = this._skinId == n);
      }
      this.lockNode.active = true;
      this.useNode.active = false;
      if (this._jsonInfo.unlockAd) {
        this._unlockFlag = false;
        this.videoNode.active = true;
        var a;
        a = o[this._skinId] ? o[this._skinId] : 0;
        this._needUnlock = this._jsonInfo.unlockAd;
        if (l.default.isWX && (this._needUnlock = 1, a >= this._needUnlock)) {
          this._unlockFlag = true;
          this.lockNode.active = false;
          this.videoNode.active = false;
          return void (this.useNode.active = this._skinId == n);
        }
        this.lbVideo.string = a + "/" + this._needUnlock;
      } else if (this._jsonInfo.unlockLv) {
        this.lbLockTxt.string = h.default.formatStr("通过%d关解锁", this._jsonInfo.unlockLv);
        this.videoNode.active = false;
      } else if (this._typeId == 1 && this._skinId == 4) {
        this.lbLockTxt.string = "签到7日解锁";
        this.videoNode.active = false;
      } else if (this._typeId == 2 && this._skinId == 5) {
        this.lbLockTxt.string = "签到3日解锁";
        this.videoNode.active = false;
      }
    }
  };
  e.prototype.btnClick_item = function (t) {
    var e = this;
    if (f.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      if (this._unlockFlag) {
        c.ManageCtl.gameData.setSkinUse(this._typeId, this._skinId);
        c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.updateUseSkin);
      } else if (this.videoNode.active) {
        c.ManageCtl.playVideo(function () {
          var t = c.ManageCtl.gameData.getCurModeId();
          var n = c.ManageCtl.gameData.getCurDevId();
          var o = c.ManageCtl.gameData.getCurLevelId();
          var i = "";
          if (e._typeId == 1) {
            i = "animalSkin" + e._skinId;
          } else if (e._typeId == 2) {
            i = "backgroundSkin" + e._skinId;
          }
          if (i != "") {
            g.statsCtl.sendEventShuShu("reward_btn", {
              mode: t,
              devid: n,
              lv: o,
              progress: c.ManageCtl.gameData.getGameProgress(),
              scene: i,
              lvgrade: c.ManageCtl.gameData.game_lvgrade
            });
          }
          if (c.ManageCtl.gameData.addSkinUnlockCountById(e._typeId, e._skinId, e._needUnlock)) {
            c.ManageCtl.myMsgCtl.emit(u.MyConstans.msg.updateUseSkin);
          } else {
            var a;
            var r = c.ManageCtl.gameData.getSkinInfoByTypeId(e._typeId).unlock;
            a = r[e._skinId] ? r[e._skinId] : 0;
            e.lbVideo.string = a + "/" + e._needUnlock;
            var s = e._needUnlock - a;
            c.ManageCtl.persistRootNode.showTipsUI("再观看" + s + "次视频获得");
          }
        });
      } else if (this._jsonInfo.unlockLv) {
        c.ManageCtl.persistRootNode.showTipsUI(h.default.formatStr("通过%d关解锁", this._jsonInfo.unlockLv));
      } else if (this._typeId == 1 && this._skinId == 4) {
        c.ManageCtl.persistRootNode.showTipsUI("签到7日解锁");
      } else if (this._typeId == 2 && this._skinId == 5) {
        c.ManageCtl.persistRootNode.showTipsUI("签到3日解锁");
      }
    }
  };
  e.prototype.btnClick_use = function (t) {
    f.default.instance.baseBtnClick(this.node.name + t.target.name);
  };
  a([C(cc.Node)], e.prototype, "unlockBg", undefined);
  a([C(cc.Node)], e.prototype, "lockNode", undefined);
  a([C(cc.Node)], e.prototype, "useNode", undefined);
  a([C(cc.Label)], e.prototype, "lbName", undefined);
  a([C(cc.Sprite)], e.prototype, "imgIcon", undefined);
  a([C(cc.Node)], e.prototype, "videoNode", undefined);
  a([C(cc.Label)], e.prototype, "lbVideo", undefined);
  a([C(cc.Label)], e.prototype, "lbLockTxt", undefined);
  return a([v, w("ui/skinItemNode")], e);
}(d.default);
exports.default = b;