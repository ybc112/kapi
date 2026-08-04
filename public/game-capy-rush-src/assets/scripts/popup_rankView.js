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
var d = require("./baseCompont");
var h = require("./ChallengeHttp");
var p = require("./GridListView");
var f = require("./MyTool");
var g = require("./myBtnClick");
var m = require("./uiPathManage");
var y = require("./ServerData");
var _ = cc._decorator;
var v = _.ccclass;
_.property;
var C = _.menu;
var w = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e.bg = null;
    e.lbLoading = null;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.bg = this.dict.bg;
    this.dict.rankItemNode.active = false;
    this.dict.myRankItemNode.active = false;
    c.ManageCtl.myMsgCtl.on(u.MyConstans.msg.reShowRankBtn, this.onReShowRankBtn, this);
  };
  e.prototype.start = function () {
    return r(this, undefined, undefined, function () {
      return s(this, function () {
        this.bg.scale = 0;
        cc.tween(this.bg).to(0.15, {
          scale: 1
        }).start();
        this.dict.btnLogin.opacity = 0;
        this.onReShowRankBtn();
        this.getRankList();
        return [2];
      });
    });
  };
  e.prototype.onDestroy = function () {
    if (c.ManageCtl.isWx()) {
      l.default.instance.hideLogoinBtn();
    }
    c.ManageCtl.myMsgCtl.off(u.MyConstans.msg.reShowRankBtn, this.onReShowRankBtn, this);
  };
  e.prototype.onDisable = function () {};
  e.prototype.getRankList = function () {
    return r(this, undefined, undefined, function () {
      var t;
      var e;
      return s(this, function (n) {
        switch (n.label) {
          case 0:
            if (c.ManageCtl.isWx()) {
              return [4, h.challengeHttp.getRank("rank_pass_lv_wx2")];
            } else {
              return [2];
            }
          case 1:
            for (e in t = n.sent().list) {
              if (t[e]) {
                t[e].uuid = e;
              }
            }
            console.log("## passRank: ", t);
            c.ManageCtl.gameData.setPassRankData(t);
            this.getUserInfoList();
            return [2];
        }
      });
    });
  };
  e.prototype.getUserInfoList = function () {
    return r(this, undefined, undefined, function () {
      var t;
      var e;
      var n;
      var o;
      var i;
      var a;
      var r;
      return s(this, function (s) {
        switch (s.label) {
          case 0:
            t = l.default.BMS_APP_NAME;
            e = "";
            for (r in n = c.ManageCtl.gameData.getPassRankData()) {
              if (n[r]) {
                e += r + ",";
              }
            }
            return [4, y.default.GetInstance().getAllServerData(t, e, "userInfo3")];
          case 1:
            o = s.sent();
            console.log("## 2 allUserInfo :", o);
            console.log("## allUserInfo :", JSON.stringify(o));
            i = {};
            a = {};
            for (r in n) {
              if (o[r]) {
                if (o[r].userInfo3) {
                  if ((i = JSON.parse(o[r].userInfo3)).userName) {
                    n[r].userName = i.userName;
                  }
                  if (i.userHeadUrl) {
                    n[r].userHeadUrl = i.userHeadUrl;
                  }
                }
                if (o[r].roleLvList && (a = JSON.parse(o[r].roleLvList))) {
                  n[r].roleLvList = a;
                }
              }
            }
            c.ManageCtl.gameData.setPassRankData(n);
            this.loadList();
            this.setMyRankInfo();
            return [2];
        }
      });
    });
  };
  e.prototype.btnClick_wxLogin = function (t) {
    if (this.dict.btnLogin.opacity != 0 && g.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      this.onReShowRankBtn();
    }
  };
  e.prototype.btnClick_close = function (t) {
    if (g.default.instance.baseBtnClick(this.node.name + t.target.name, 0.3)) {
      this.gotoClose();
    }
  };
  e.prototype.gotoClose = function () {
    c.ManageCtl.uiManage.gotoDestroyUI(m.uiPath.uiName.popup_rankView);
  };
  e.prototype.showLoad = function () {
    var t = this;
    this.lbLoading.node.active = true;
    cc.tween(this.lbLoading.node).repeatForever(cc.tween().delay(0.15).call(function () {
      t.lbLoading.string = "加载中.";
    }).delay(0.15).call(function () {
      t.lbLoading.string = "加载中..";
    }).delay(0.15).call(function () {
      t.lbLoading.string = "加载中...";
    })).start();
  };
  e.prototype.loadList = function () {
    var t = [];
    var e = [];
    var n = c.ManageCtl.gameData.getPassRankData();
    for (var o in n) {
      if (n[o]) {
        e.push(n[o]);
      }
    }
    console.log("## orderList ", e);
    e.sort(function (t, e) {
      return t.seq - e.seq;
    });
    for (var i = 0; i < e.length; i++) {
      var a = e[i];
      t.push(a);
    }
    this.dict.scrollView.getComponent(p.default).setData(t);
  };
  e.prototype.onReShowRankBtn = function () {
    var t = this;
    if (c.ManageCtl.isWx()) {
      l.default.instance.login(c.ManageCtl.persistRootNode.wxLoginBtnNode2, function (e) {
        if (e) {
          console.log("## 获取用户信息成功");
          t.dict.btnLogin.active = false;
          var n = c.ManageCtl.gameData.getWxUserInfo();
          console.log("## userInfo: ", n);
          try {
            n.userName = f.MyTool.base64Encode(n.userName);
            y.default.GetInstance().checkSaveServerData("userInfo3", JSON.stringify(n), false);
            t.setMyRankInfo();
          } catch (o) {}
        } else {
          t.dict.btnLogin.opacity = 255;
        }
      });
    }
  };
  e.prototype.setMyRankInfo = function () {
    var t = window.ywkjTT_openidStr;
    var e = this.dict.myRankItemNode;
    this.dict.myRankItemNode.active = true;
    var n = e.getChildByName("lbRank").getComponent(cc.Label);
    var o = e.getChildByName("lbScore").getComponent(cc.Label);
    var i = e.getChildByName("lbUserName").getComponent(cc.Label);
    var a = e.getChildByName("bgNode");
    var r = e.getChildByName("maskNode").getChildByName("imgHand").getComponent(cc.Sprite);
    var s = c.ManageCtl.gameData.getPassLvByMode(1);
    n.string = "未上榜";
    o.string = s;
    var l = c.ManageCtl.gameData.getWxUserInfo();
    i.string = f.MyTool.base64Decode(l.userName);
    if (l.userHeadUrl != "") {
      f.MyTool.setSprite(r, l.userHeadUrl);
    }
    if (t && t != "null") {
      var u = c.ManageCtl.gameData.getPassRankData()[t];
      if (u) {
        var d = u.seq;
        var h = d;
        n.string = d > 100 ? "未上榜" : h.toString();
        o.string = u.score + "关";
        i.string = u.userName ? f.MyTool.base64Decode(l.userName) : "游客";
        if (u.userHeadUrl) {
          f.MyTool.setSprite(r, u.userHeadUrl);
        }
        a.children.forEach(function (t) {
          t.active = t.name == "bg" + h;
        });
        if (h >= 1) {
          a.getChildByName("bg4").active = true;
        }
        n.node.active = h >= 4;
      }
    }
  };
  return a([v, C("ui/popup_rankView")], e);
}(d.default);
exports.default = w;