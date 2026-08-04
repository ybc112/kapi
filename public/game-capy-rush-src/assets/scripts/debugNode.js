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
var u = require("./MyPlatform");
var d = require("./SdkConfig");
var h = require("./jsonConfig");
var p = require("./myJsonCtl");
var f = require("./ServerData_tt");
var g = cc._decorator;
var m = g.ccclass;
var y = g.property;
var _ = g.menu;
var v = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.debug_lbTest = null;
    e.editBoxDevLevel = null;
    e.debug_lbVideo = null;
    e.cleanOkNode = null;
    e.cleanServerDataOkNode = null;
    e.lbGroup = null;
    e._showFlag = false;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    c.ManageCtl.myMsgCtl.on(d.MyConstans.msg.httpRequestConfigSuccess, this.onhttpRequestConfigSuccess, this);
  };
  e.prototype.onDestroy = function () {
    c.ManageCtl.myMsgCtl.off(d.MyConstans.msg.httpRequestConfigSuccess, this.onhttpRequestConfigSuccess, this);
  };
  e.prototype.start = function () {
    c.ManageCtl.persistRootNode.debug = true;
    this.debug_lbVideo.string = c.ManageCtl.persistRootNode.lookVidepDebugFlag ? "看视频" : "不看视频";
    this.onhttpRequestConfigSuccess();
    this.node.getChildByName("btnServerCleanData").active = u.default.isZJTD;
    this.lbGroup.string = "实验组" + c.ManageCtl.gameData.expt_1746523179;
  };
  e.prototype.btnClick_btnTest = function () {
    if (this._showFlag) {
      this._showFlag = false;
      this.debug_lbTest.string = "测试按钮";
      this.node.runAction(cc.moveBy(0.2, cc.v2(this.node.width, 0)));
    } else {
      this._showFlag = true;
      this.debug_lbTest.string = "收回";
      this.node.runAction(cc.moveBy(0.2, cc.v2(-this.node.width, 0)));
    }
  };
  e.prototype.btnClick_closeSelectModel = function () {};
  e.prototype.btnClick_orderLevel = function () {};
  e.prototype.btnClick_cleanData = function () {
    this.cleanOkNode.active = true;
  };
  e.prototype.btnClick_cleanOK = function () {
    this.cleanOkNode.active = false;
    cc.sys.localStorage.clear();
    c.ManageCtl.gameData.clearData();
    c.ManageCtl.persistRootNode.showTipsUI("清除成功，请重启");
  };
  e.prototype.btnClick_cleanCancel = function () {
    this.cleanOkNode.active = false;
  };
  e.prototype.btnClick_cleanServerDate = function () {
    this.cleanServerDataOkNode.active = true;
  };
  e.prototype.btnClick_cleanServerDateOK = function () {
    f.default.GetInstance().checkSaveServerData("modePassLv", JSON.stringify({}));
    f.default.GetInstance().checkSaveServerData("flagData", JSON.stringify({}));
    f.default.GetInstance().checkSaveServerData("skinList", JSON.stringify({
      1: {
        get: [1],
        use: 1,
        unlock: {}
      }
    }));
    f.default.GetInstance().checkSaveServerData("roleLvList", JSON.stringify({
      stageId: 1,
      qiLv: 1,
      exp: 0
    }));
    f.default.GetInstance().checkSaveServerData("equipmentInfo", JSON.stringify({}));
    f.default.GetInstance().checkSaveServerData("getPetIdList", JSON.stringify({}));
    cc.sys.localStorage.clear();
    c.ManageCtl.gameData.clearData();
    c.ManageCtl.persistRootNode.showTipsUI("清除成功，请重启");
  };
  e.prototype.btnClick_cleanServerDateCancel = function () {
    this.cleanServerDataOkNode.active = false;
  };
  e.prototype.btnClicl_noVideo = function () {
    c.ManageCtl.persistRootNode.lookVidepDebugFlag = !c.ManageCtl.persistRootNode.lookVidepDebugFlag;
    this.debug_lbVideo.string = c.ManageCtl.persistRootNode.lookVidepDebugFlag ? "看视频" : "不看视频";
  };
  e.prototype.btnClick_addBomb = function () {
    c.ManageCtl.gameData.addDayPropById(d.MyConstans.propId.bomb, 5);
    c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.updatePropCount);
    c.ManageCtl.persistRootNode.showTipsUI("增加成功");
  };
  e.prototype.btnClick_addRemove = function () {
    c.ManageCtl.gameData.addDayPropById(d.MyConstans.propId.remove, 5);
    c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.updatePropCount);
    c.ManageCtl.persistRootNode.showTipsUI("增加成功");
  };
  e.prototype.btnClick_addFlip = function () {
    c.ManageCtl.gameData.addDayPropById(d.MyConstans.propId.flip, 5);
    c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.updatePropCount);
    c.ManageCtl.persistRootNode.showTipsUI("增加成功");
  };
  e.prototype.btnClicl_jumpDevLv = function () {
    return r(this, undefined, undefined, function () {
      var t;
      var e;
      var n;
      var o;
      var i;
      var a;
      var r;
      var u;
      var f;
      var g;
      var m;
      var y;
      var _;
      var v;
      var C;
      return s(this, function (s) {
        switch (s.label) {
          case 0:
            if (this.editBoxDevLevel.string) {
              t = Number(this.editBoxDevLevel.string);
              if (isNaN(t)) {
                c.ManageCtl.persistRootNode.showTipsUI("请输入正确的开发关卡");
                return [2];
              } else {
                e = false;
                n = 1;
                i = [];
                return [4, p.myJsonCtl.getJson(h.jsonName.mode)];
              }
            } else {
              return [2, c.ManageCtl.persistRootNode.showTipsUI("请输入对应的开发关卡")];
            }
          case 1:
            a = s.sent();
            f = [];
            for (g in a) {
              f.push(g);
            }
            m = 0;
            s.label = 2;
          case 2:
            if (m < f.length) {
              C = f[m];
              r = Number(C);
              return [4, p.myJsonCtl.getJson(c.ManageCtl.getModeNameByModeId(r))];
            } else {
              return [3, 5];
            }
          case 3:
            u = s.sent();
            i.push({
              modelId: r,
              mCfg: u
            });
            s.label = 4;
          case 4:
            m++;
            return [3, 2];
          case 5:
            for (_ = 0; _ < i.length; _++) {
              for (C in v = i[_].mCfg) {
                if ((y = v[C]).LevelId1 == t) {
                  e = true;
                  n = y.id;
                  o = i[_].modelId;
                  break;
                }
                if (y.LevelId2 && y.LevelId2 == t) {
                  e = true;
                  n = y.id;
                  o = i[_].modelId;
                  break;
                }
              }
              if (e) {
                break;
              }
            }
            if (e) {
              console.log("## levelIndex:  " + n + " modelId: " + o);
              if (!l.default.GetInstance().isLoadSubDone()) {
                c.ManageCtl.persistRootNode.showTipsUI("关卡加载中，请稍后重试");
                return [2];
              }
              c.ManageCtl.gameData.setCurModeId(o);
              c.ManageCtl.gameData.setCurDevId(t);
              c.ManageCtl.gameData.setCurLevelId(n);
              c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.showGameView);
              c.ManageCtl.myMsgCtl.emit(d.MyConstans.msg.gameReLoadLevel);
              this.editBoxDevLevel.string = "";
              this.btnClick_btnTest();
            } else {
              c.ManageCtl.persistRootNode.showTipsUI("没有此开发关卡");
            }
            return [2];
        }
      });
    });
  };
  e.prototype.onhttpRequestConfigSuccess = function () {};
  e.prototype.btnClicl_changeTime = function () {};
  e.prototype.btnClicl_setDay = function () {
    c.ManageCtl.gameData.resetDayData();
    c.ManageCtl.persistRootNode.showTipsUI("设置成功");
  };
  a([y(cc.Label)], e.prototype, "debug_lbTest", undefined);
  a([y(cc.EditBox)], e.prototype, "editBoxDevLevel", undefined);
  a([y(cc.Label)], e.prototype, "debug_lbVideo", undefined);
  a([y(cc.Node)], e.prototype, "cleanOkNode", undefined);
  a([y(cc.Node)], e.prototype, "cleanServerDataOkNode", undefined);
  a([y(cc.Label)], e.prototype, "lbGroup", undefined);
  return a([m, _("ui/debugNode")], e);
}(cc.Component);
exports.default = v;