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
var d = require("./ChallengeHttp");
var h = require("./GridListView");
var p = require("./jsonConfig");
var f = require("./myJsonCtl");
var g = cc._decorator;
var m = g.ccclass;
g.property;
var y = g.menu;
var _ = function (t) {
  function e() {
    var e = t !== null && t.apply(this, arguments) || this;
    e._beginMoveFlag = false;
    return e;
  }
  i(e, t);
  e.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.dict.stageItemNode.active = false;
    this.initData();
    c.ManageCtl.myMsgCtl.on(l.MyConstans.msg.gotoMyRank, this.ongotoMyRank, this);
  };
  e.prototype.onDestroy = function () {
    c.ManageCtl.myMsgCtl.off(l.MyConstans.msg.gotoMyRank, this.ongotoMyRank, this);
  };
  e.prototype.onDisable = function () {
    this.unscheduleAllCallbacks();
  };
  e.prototype.start = function () {};
  e.prototype.initData = function () {
    return r(this, undefined, undefined, function () {
      var t;
      var e;
      var n;
      var o;
      var i;
      var a;
      var r;
      var l;
      var u;
      var h;
      return s(this, function (s) {
        switch (s.label) {
          case 0:
            if (["UNKNOW", "未知"].some(function (t) {
              return t == c.ManageCtl.gameData.getCountry();
            })) {
              return [3, 1];
            } else {
              e = c.ManageCtl.gameData.getCountry();
              return [3, 3];
            }
          case 1:
            return [4, d.challengeHttp.getCountry()];
          case 2:
            e = s.sent();
            s.label = 3;
          case 3:
            t = e;
            c.ManageCtl.gameData.setCountry(t);
            t += "队";
            console.log("## country: ", t);
            n = null;
            return [4, d.challengeHttp.getServerTime()];
          case 4:
            n = s.sent();
            n = (n = new Date(n)).getMonth() + 1 + "-" + n.getDate();
            console.log("## date: ", n);
            if (c.ManageCtl.gameData.getDate() != n) {
              c.ManageCtl.gameData.resetPlayLevelData();
              c.ManageCtl.gameData.setDate(n);
            }
            return [4, d.challengeHttp.getRank("rank_play_" + n)];
          case 5:
            o = s.sent().list;
            return [4, d.challengeHttp.getRank("rank_pass_" + n)];
          case 6:
            i = s.sent().list;
            if (!o) {
              o = {};
            }
            if (!i) {
              i = {};
            }
            if (i && i.广东) {
              i.广东 = null;
              delete i.广东;
            }
            console.log("## passRank: ", i);
            a = {};
            r = "";
            return [4, f.myJsonCtl.getJson(p.jsonName.rank)];
          case 7:
            for (u in l = s.sent()) {
              r = l[u].country;
              if (!a[r]) {
                a[r] = l[u];
              }
            }
            for (u in a) {
              if (i && !i[u]) {
                i[u] = JSON.parse(JSON.stringify(a[u]));
                i[u].score = a[u].pass;
              } else {
                i[u].score += a[u].pass;
              }
              if (o && !o[u]) {
                o[u] = JSON.parse(JSON.stringify(a[u]));
                o[u].score = a[u].player;
              } else {
                o[u].score += a[u].player;
              }
            }
            i = (h = function (t) {
              var e = [];
              for (var n in t) {
                if (t[n]) {
                  e.push({
                    c: n,
                    score: t[n].score
                  });
                }
              }
              return e.sort(function (t, e) {
                return e.score - t.score;
              }).map(function (t, e) {
                t.seq = e + 1;
                return t;
              });
            })(i);
            o = h(o);
            console.log("## playRank2: ", o);
            console.log("## passRank2: ", i);
            c.ManageCtl.gameData.setRankData(i, o);
            this.setMyTeamRank();
            this.loadList();
            this.loadBroadCastNode();
            return [2];
        }
      });
    });
  };
  e.prototype.ongotoMyRank = function () {
    var t = c.ManageCtl.gameData.getMyPassRankInfo();
    if (t) {
      var e = t.seq;
      var n = this.dict.scrollView.getComponent(h.default);
      var o = n.scrollView;
      var i = o.getMaxScrollOffset();
      var a = e - 1;
      var r = cc.misc.clampf(a * (n.spaceY + n.itemHeight), 0, i.y);
      this.scheduleOnce(function () {
        o.scrollToOffset(cc.v2(0, r), 0.5);
      }, 0.1);
    } else {
      c.ManageCtl.persistRootNode.showTipsUI("未上榜");
    }
  };
  e.prototype.setMyTeamRank = function () {
    var t = c.ManageCtl.gameData.getMyPassRankInfo();
    this.dict.lbMyRand.getComponent(cc.Label).string = t ? "第" + t.seq + "名" : "未上榜";
  };
  e.prototype.loadList = function () {
    var t = [];
    var e = c.ManageCtl.gameData.getPassRankData();
    for (var n in e) {
      if (e[n]) {
        t.push(Number(n));
      }
    }
    this.dict.scrollView.getComponent(h.default).setData(t);
  };
  e.prototype.loadBroadCastNode = function () {
    var t = this;
    var e = this.dict.broadcastNode1;
    var n = this.dict.broadcastNode2;
    this.scheduleOnce(function () {
      n.x = e.x + e.width;
      t._beginMoveFlag = true;
    });
    var o = c.ManageCtl.gameData.getPlayRankData();
    var i = c.ManageCtl.gameData.getPassRankData();
    var a = 0;
    var r = 0;
    for (var s in o) {
      if (o[s]) {
        a += o[s].score;
      }
    }
    for (var s in i) {
      if (i[s]) {
        r += i[s].score;
      }
    }
    var l = this.dict.lbBroadcastPlay1.getComponent(cc.Label);
    var u = this.dict.lbBroadcastPass1.getComponent(cc.Label);
    var d = this.dict.lbBroadcastPlay2.getComponent(cc.Label);
    var h = this.dict.lbBroadcastPass2.getComponent(cc.Label);
    l.string = a.toString();
    u.string = r.toString();
    d.string = a.toString();
    h.string = r.toString();
  };
  e.prototype.update = function (t) {
    if (this._beginMoveFlag) {
      var e = this.dict.broadcastNode1;
      var n = this.dict.broadcastNode2;
      e.x -= 200 * t;
      n.x -= 200 * t;
      if (e.x <= -e.width - 0.5 * e.width) {
        e.x = n.x + n.width;
      }
      if (n.x <= -n.width - 0.5 * n.width) {
        n.x = e.x + e.width;
      }
    }
  };
  return a([m, y("ui/RankNode")], e);
}(u.default);
exports.default = _;