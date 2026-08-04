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
var r = require("./ManageCtl");
var s = require("./SdkConfig");
var c = require("./GridListItem");
var l = require("./MyTool");
var u = require("./myBtnClick");
var d = cc._decorator;
var h = d.ccclass;
var p = d.property;
var f = d.menu;
var g = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.unlockBg = null;
    e.lockBg = null;
    e.lockNode = null;
    e.unlockNode = null;
    e.lbName = null;
    e.lbLock = null;
    e.roleEffect = null;
    e.useNode = null;
    e.noUseNode = null;
    e.lbUse = null;
    e._mPetId = -1;
    e._unlockFlag = false;
    e._use = 0;
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
    this._mPetId = t;
    var e = r.ManageCtl.gameData.allPetInfo[t];
    if (e) {
      this.lbName.string = e.petName;
      if (e.petUnlock) {
        this.lbLock.string = e.petUnlock;
      } else if (e.unlockLv) {
        this.lbLock.string = "通过" + e.unlockLv + "关获得";
      }
      var n = s.MyConstans.PetIdSetInfo[t];
      this.roleEffect.node.scale = n.bigScale;
      var o = "pet/big/" + n.effectName + "_da";
      this.roleEffect.node.mLoadName = o;
      l.MyTool.loadSkeleton(o, this.roleEffect.node, "animation");
      this._unlockFlag = r.ManageCtl.gameData.checkGetPetIdListById(this._mPetId);
      this.unlockNode.active = this._unlockFlag;
      this.lockNode.active = !this.unlockNode.active;
      this.unlockBg.active = this._unlockFlag;
      this.lockBg.active = !this.unlockBg.active;
      this.roleEffect.node.color = this._unlockFlag ? cc.Color.WHITE : cc.Color.GRAY;
      this.updateUse();
    }
  };
  e.prototype.updateUse = function () {
    var t = r.ManageCtl.gameData.getPetInfoById(this._mPetId);
    this._use = t.use;
    this.useNode.active = this._use == 1;
    this.noUseNode.active = !this.useNode.active;
    this.lbUse.string = this._use ? "已携带" : "携带";
  };
  e.prototype.btnClick_item = function (t) {
    if (u.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.clickPetItem, {
        petId: this._mPetId,
        unlock: this._unlockFlag,
        unlockStr: this.lbLock.string,
        use: this._use
      });
    }
  };
  e.prototype.btnClick_use = function (t) {
    if (u.default.instance.baseBtnClick(this.node.name + t.target.name)) {
      r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.usePetItem, {
        petId: this._mPetId,
        use: this._use
      });
    }
  };
  a([p(cc.Node)], e.prototype, "unlockBg", undefined);
  a([p(cc.Node)], e.prototype, "lockBg", undefined);
  a([p(cc.Node)], e.prototype, "lockNode", undefined);
  a([p(cc.Node)], e.prototype, "unlockNode", undefined);
  a([p(cc.Label)], e.prototype, "lbName", undefined);
  a([p(cc.Label)], e.prototype, "lbLock", undefined);
  a([p(sp.Skeleton)], e.prototype, "roleEffect", undefined);
  a([p(cc.Node)], e.prototype, "useNode", undefined);
  a([p(cc.Node)], e.prototype, "noUseNode", undefined);
  a([p(cc.Label)], e.prototype, "lbUse", undefined);
  return a([h, f("ui/petItemNode")], e);
}(c.default);
exports.default = g;