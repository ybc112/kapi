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
var _ = m.property;
var v = m.menu;
var C = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.beginUpdateFlag = true;
    e._lbRoleName = null;
    e._lbRoleQiLv = null;
    e._lbPro = null;
    e._roleEffect = null;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this._lbRoleName = this.dict.lbRoleName.getComponent(cc.Label);
    this._lbRoleQiLv = this.dict.lbRoleQiLv.getComponent(cc.Label);
    this._lbPro = this.dict.lbPro.getComponent(cc.Label);
    this._roleEffect = this.dict.roleEffect.getComponent(sp.Skeleton);
    f.ManageCtl.myMsgCtl.on(g.MyConstans.msg.updateRoleInfo, this.onupdateRoleInfo, this);
    f.ManageCtl.myMsgCtl.on(g.MyConstans.msg.roleUpgrade, this.onroleUpgrade, this);
    f.ManageCtl.myMsgCtl.on(g.MyConstans.msg.updateUseSkin, this.onupdateUseSkin, this);
  };
  e.prototype.onDestroy = function () {
    f.ManageCtl.myMsgCtl.off(g.MyConstans.msg.updateRoleInfo, this.onupdateRoleInfo, this);
    f.ManageCtl.myMsgCtl.off(g.MyConstans.msg.roleUpgrade, this.onroleUpgrade, this);
    f.ManageCtl.myMsgCtl.off(g.MyConstans.msg.updateUseSkin, this.onupdateUseSkin, this);
  };
  e.prototype.start = function () {
    if (this.beginUpdateFlag) {
      this.initData();
    }
    this.onupdateUseSkin();
  };
  e.prototype.btnClick_click = function (t) {
    if (l.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      f.ManageCtl.myMsgCtl.emit(g.MyConstans.msg.showPopupView, d.uiPath.uiName.popup_roleLvView);
    }
  };
  e.prototype.btnClick_roleInfo = function (t) {
    if (l.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      f.ManageCtl.myMsgCtl.emit(g.MyConstans.msg.showMainPageByTag, g.MyConstans.MainPageTag.roleInfo);
    }
  };
  e.prototype.onroleUpgrade = function () {
    var t = this.dict.upgradeEffect;
    t.active = true;
    var e = t.getComponent(sp.Skeleton);
    e.setAnimation(0, "animation", false);
    e.setCompleteListener(function () {
      t.active = true;
    });
  };
  e.prototype.onupdateRoleInfo = function () {
    this.initData();
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
      var d;
      var g;
      var m;
      var y;
      var _;
      var v;
      return s(this, function (s) {
        switch (s.label) {
          case 0:
            t = f.ManageCtl.gameData.getRoleLvInfo();
            e = t.stageId;
            n = t.qiLv;
            o = t.exp;
            return [4, p.myJsonCtl.getJson(h.jsonName.roleLv)];
          case 1:
            i = s.sent();
            a = null;
            r = null;
            c = null;
            l = null;
            for (d in i) {
              if (i[d].bigImg && i[d].stageId == e) {
                a = i[d];
              }
              if (i[d].stageId == e && i[d].qiLevel == n) {
                r = i[d];
              }
              if (i[d].bigImg && i[d].stageId == e + 1) {
                c = i[d];
              }
              if (i[d].stageId == e && i[d].qiLevel == n + 1) {
                l = i[d];
              }
            }
            g = a.bigImg;
            m = "role/" + g;
            if (!this._roleEffect) {
              this._roleEffect = this.dict.roleEffect.getComponent(sp.Skeleton);
            }
            this._roleEffect.node.mLoadName = m;
            u.MyTool.loadSkeleton(m, this._roleEffect.node, "animation");
            this._lbRoleName.string = r.stageName;
            this._lbRoleQiLv.string = r.qiName;
            y = this.dict.lbPro.getComponent(cc.Label);
            _ = this.dict.imgPro.getComponent(cc.Sprite);
            if (c || l) {
              if (!c && l) {
                c = l;
              }
              y.string = "修为：" + o + "/" + c.stageExp;
              v = o / c.stageExp;
              _.fillRange = v;
            } else {
              y.string = "已满级";
              _.fillRange = 1;
            }
            return [2];
        }
      });
    });
  };
  e.prototype.onupdateUseSkin = function () {
    var t = this.dict.swordLeft;
    var e = this.dict.swordRight;
    var n = f.ManageCtl.gameData.getSkinInfoByTypeId(1).use;
    if (t) {
      var o = "/skin/swordBig/icon_pifu" + n + "_l";
      t.mReloImgFalg = true;
      u.MyTool.loadImg(o, t.getComponent(cc.Sprite));
      var i = 0.8;
      cc.tween(t).to(i, {
        position: cc.v3(-219.323, 87.518)
      }).to(i, {
        position: cc.v3(-230.922, 103.335)
      }).union().repeatForever().start();
    }
    if (e) {
      o = "/skin/swordBig/icon_pifu" + n + "_r";
      t.mReloImgFalg = true;
      u.MyTool.loadImg(o, e.getComponent(cc.Sprite));
      i = 0.8;
      cc.tween(e).to(i, {
        position: cc.v3(219.323, 87.518)
      }).to(i, {
        position: cc.v3(230.922, 103.335)
      }).union().repeatForever().start();
    }
  };
  a([_({
    displayName: "初始化是否更新信息"
  })], e.prototype, "beginUpdateFlag", undefined);
  return a([y, v("ui/common_roleNode")], e);
}(c.default);
exports.default = C;