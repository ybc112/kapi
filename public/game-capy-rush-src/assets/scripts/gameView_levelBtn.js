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
var c = require("./baseCompont");
var l = require("./myBtnClick");
var u = require("./statsCtl");
var d = require("./uiPathManage");
var h = require("./common_setBtnCanClick");
var capyBridge = require("./CapyPaymentBridge").default;
var p = cc._decorator;
var f = p.ccclass;
p.property;
var g = p.menu;
var m = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.contentNode = null;
    e.gameContent = null;
    e._curModeId = -1;
    e._curDevId = 1;
    e._curLevelId = 1;
    e._arrowsTipNodeOldPos = null;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    r.ManageCtl.myMsgCtl.on(s.MyConstans.msg.sendUsePropShushu, this.sendUsePropShushu, this);
  };
  e.prototype.onDestroy = function () {
    r.ManageCtl.myMsgCtl.off(s.MyConstans.msg.sendUsePropShushu, this.sendUsePropShushu, this);
  };
  e.prototype.setBtnShow = function (t) {
    this.gameContent = t;
    this.gameContent.dict.btnLayoutNode.children.forEach(function (t) {
      t.active = false;
    });
    switch (this._curModeId) {
      case 1:
        if (this.gameContent._curLevelId == 1 && !this.gameContent._showHardFlag) {
          break;
        }
        this.dict.btnBomb.active = true;
        this.dict.btnRemove.active = true;
        this.dict.btnFlip.active = true;
    }
    this._arrowsTipNodeOldPos = this.gameContent.dict.arrowsTipNode.position;
  };
  e.prototype.initData = function (t, e, n, o, i) {
    this.gameContent = t;
    this.contentNode = e;
    this._curModeId = n;
    this._curLevelId = i;
    this._curDevId = o;
    this._arrowsTipNodeOldPos = this.gameContent.dict.arrowsTipNode.position;
  };
  e.prototype.btnClick_Skip = function (t) {
    if (l.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      r.ManageCtl.playVideo(function () {
        cc.game.emit("game_success2");
      });
    }
  };
  e.prototype.btnClick_imgTip = function (t) {
    if (l.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      r.ManageCtl.playVideo(function () {
        r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.showPopupView, d.uiPath.uiName.popup_gameTipsView);
      });
    }
  };
  e.prototype.btnClick_bomb = function (t) {
    var e = this;
    if (l.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      var n = this.gameContent.getLevelComp();
      switch (this._curModeId) {
        case 1:
          this.gameContent.hideBtnTip("btnBomb");
          if (!n.func_checkboom()) {
            return void r.ManageCtl.persistRootNode.showTipsUI("暂不可用");
          }
          if (this.gameContent.dict.addNodeBomb.active) {
            r.ManageCtl.gameData.setPropUse(s.MyConstans.propId.bomb);
            r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.updatePropCount);
            return void r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.showPopupView, d.uiPath.uiName.popup_propView, {
              propId: s.MyConstans.propId.bomb,
              callback: function () {
                e.gameContent.hideGameButton();
                n.func_boom();
                r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.updatePropCount);
                n.func_boomCb = function () {
                  e.gameContent.showGameButton();
                };
              }
            });
          }
          if (this.gameContent.dict.numNodeBomb.active) {
            if (r.ManageCtl.gameData.removeTemporaryCount > 0) {
              r.ManageCtl.gameData.removeTemporaryCount -= 1;
            } else {
              r.ManageCtl.gameData.addDayPropById(s.MyConstans.propId.bomb, -1);
            }
            this.gameContent.hideGameButton();
            n.func_boom();
            r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.updatePropCount);
            return void (n.func_boomCb = function () {
              e.gameContent.showGameButton();
            });
          }
          // 区块链支付开启且没有库存时：用 CAPY 购买道具（5000 枚）
          if (capyBridge && capyBridge.isPaymentEnabled && capyBridge.isPaymentEnabled()) {
            capyBridge.useItem(s.MyConstans.propId.bomb).then(function (granted) {
              if (!granted) return;
              e.gameContent.hideGameButton();
              n.func_boom();
              r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.updatePropCount);
              n.func_boomCb = function () {
                e.gameContent.showGameButton();
              };
              e.sendUsePropShushu();
            });
            return;
          }
          this.playVideo(function () {
            e.gameContent.hideGameButton();
            n.func_boom();
            r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.updatePropCount);
            n.func_boomCb = function () {
              e.gameContent.showGameButton();
            };
            e.sendUsePropShushu();
          }, "bomb");
      }
    }
  };
  e.prototype.btnClick_remove = function (t) {
    var e = this;
    if (l.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      var n = this.gameContent.getLevelComp();
      switch (this._curModeId) {
        case 1:
          this.gameContent.hideBtnTip("btnRemove");
          if (!n.func_check_clearFood()) {
            return void r.ManageCtl.persistRootNode.showTipsUI("没有水果可以消除");
          }
          if (this.gameContent.dict.addNodeRemove.active) {
            r.ManageCtl.gameData.setPropUse(s.MyConstans.propId.remove);
            r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.updatePropCount);
            return void r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.showPopupView, d.uiPath.uiName.popup_propView, {
              propId: s.MyConstans.propId.remove,
              callback: function () {
                e.gameContent.hideGameButton();
                n.func_clearFood();
                n.func_checkclearCb = function () {
                  e.gameContent.showGameButton();
                };
                r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.updatePropCount);
              }
            });
          }
          if (this.gameContent.dict.numNodeRemove.active) {
            if (r.ManageCtl.gameData.clearTemporaryCount > 0) {
              r.ManageCtl.gameData.clearTemporaryCount -= 1;
            } else {
              r.ManageCtl.gameData.addDayPropById(s.MyConstans.propId.remove, -1);
            }
            r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.updatePropCount);
            this.gameContent.hideGameButton();
            n.func_clearFood();
            return void (n.func_checkclearCb = function () {
              e.gameContent.showGameButton();
            });
          }
          // 区块链支付开启且没有库存时：用 CAPY 购买道具（5000 枚）
          if (capyBridge && capyBridge.isPaymentEnabled && capyBridge.isPaymentEnabled()) {
            capyBridge.useItem(s.MyConstans.propId.remove).then(function (granted) {
              if (!granted) return;
              e.gameContent.hideGameButton();
              n.func_clearFood();
              n.func_checkclearCb = function () {
                e.gameContent.showGameButton();
              };
              e.sendUsePropShushu();
            });
            return;
          }
          this.playVideo(function () {
            e.gameContent.hideGameButton();
            n.func_clearFood();
            n.func_checkclearCb = function () {
              e.gameContent.showGameButton();
            };
            e.sendUsePropShushu();
          }, "remove");
      }
    }
  };
  e.prototype.btnClick_flip = function (t) {
    var e = this;
    if (l.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      this.gameContent.hideBtnTip("btnFlip");
      var n = this.gameContent.getLevelComp();
      switch (this._curModeId) {
        case 1:
          if (!n.func_checkreverse()) {
            return void r.ManageCtl.persistRootNode.showTipsUI("暂不可用");
          }
          if (this.gameContent.dict.addNodeAddFlip.active) {
            r.ManageCtl.gameData.setPropUse(s.MyConstans.propId.flip);
            r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.updatePropCount);
            return void r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.showPopupView, d.uiPath.uiName.popup_propView, {
              propId: s.MyConstans.propId.flip,
              callback: function () {
                n.func_reverse();
                r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.updatePropCount);
              }
            });
          }
          if (this.gameContent.dict.numNodeAddFlip.active) {
            r.ManageCtl.gameData.addDayPropById(s.MyConstans.propId.flip, -1);
            r.ManageCtl.myMsgCtl.emit(s.MyConstans.msg.updatePropCount);
            return void n.func_reverse();
          }
          // 区块链支付开启且没有库存时：用 CAPY 购买道具（5000 枚）
          if (capyBridge && capyBridge.isPaymentEnabled && capyBridge.isPaymentEnabled()) {
            capyBridge.useItem(s.MyConstans.propId.flip).then(function (granted) {
              if (!granted) return;
              n.func_reverse();
              e.sendUsePropShushu();
            });
            return;
          }
          this.playVideo(function () {
            n.func_reverse();
            e.sendUsePropShushu();
          }, "reverse");
      }
    }
  };
  e.prototype.playVideo = function (t, e) {
    var n = this;
    r.ManageCtl.playVideo(function () {
      u.statsCtl.sendEventShuShu("reward_btn", {
        mode: n._curModeId,
        devid: n._curDevId,
        lv: n._curLevelId,
        progress: r.ManageCtl.gameData.getGameProgress(),
        scene: e,
        lvgrade: r.ManageCtl.gameData.game_lvgrade
      });
      if (t) {
        t();
      }
    });
  };
  e.prototype.sendUsePropShushu = function () {
    if (r.ManageCtl.gameData.canSendFirst_progress && !r.ManageCtl.gameData.getNotSaveFlagData(s.MyConstans.projectName + "_useProp")) {
      var t = r.ManageCtl.gameData.getCurModeId();
      var e = r.ManageCtl.gameData.getCurLevelId();
      var n = r.ManageCtl.gameData.getCurDevId();
      u.statsCtl.sendEventShuShu("First_progress", {
        mode: t,
        devid: n,
        lv: e,
        progress: r.ManageCtl.gameData.getGameProgress(),
        type: 3,
        lvgrade: r.ManageCtl.gameData.game_lvgrade
      });
      r.ManageCtl.gameData.setNotSaveFlagData(s.MyConstans.projectName + "_useProp", {});
    }
  };
  e.prototype.setBtnCantClick = function (t) {
    t.getChildByName("Background").getChildByName("lbBtnCount").active = false;
    t.getChildByName("Background").getChildByName("iconVideo").active = false;
    t.getComponent(h.default).setGray();
  };
  return a([f, g("ui/gameView_levelBtn")], e);
}(c.default);
exports.default = m;