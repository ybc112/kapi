Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = require("./Report");
var i = require("./Show");
var a = require("./Hide");
var r = require("./Login");
var s = require("./Api");
var c = require("./TimeManage");
var l = require("./config");
window.wxapi = Object.assign({}, window.tt);
if (window.ks) {
  window.wxapi = Object.assign({}, window.ks);
}
if (!(!window.wx || window.tt || window.ks)) {
  window.wxapi = Object.assign({}, window.wx);
}
var u = require("./ReportQueue");
window.reportQueue = u.default;
var d = require("./Params");
window.params = d.default;
var h = require("./LocalStorage");
var p = require("./Logger");
var f = require("./MyPlatform");
var g = require("./ksPostbackCtl");
var m = require("./InviteCtl");
var y = require("./ServerData_tt");
var _ = new (function () {
  function t() {
    this._initFlag = false;
    this._showFlag = false;
    h.default.removeItem(c.default.lockGetFirstServerTime);
    a.default.hide(function () {
      if (window.reportQueue.len() > 0) {
        o.default.reportQueue();
      }
      o.default.online();
      clearInterval(window.wonder_online);
      window.wonder_online = null;
    });
  }
  t.prototype.initParams = function (t) {
    var e = this;
    window.Logger = new p.default(l.DEFAULT_LOG_LEVEL);
    window.Logger.setLogLevel(t.log_level);
    window.Logger.info("## 初始化渠道参数：", t, window.params);
    window.params.setGameParams(t);
    if (window.tt || window.ks) {
      var n = undefined;
      if (window.tt) {
        n = window.tt.getLaunchOptionsSync();
      }
      if (window.ks) {
        n = window.ks.getLaunchOptionsSync();
      }
      window.Logger.info("## 启动参数：", n.query);
      window.params.setShowParams(n.query);
      window.video_id = n && n.group_id ? n.group_id : "";
      window.Logger.info("## 视频ID ：", window.video_id);
      if (n.query) {
        if (n.query.promotionid) {
          window.ywkjTT_AdidStr = n.query.promotionid;
        } else if (n.query.adid) {
          window.ywkjTT_AdidStr = n.query.adid;
        } else if (n.query.aid) {
          window.ywkjTT_AdidStr = n.query.aid;
        }
        if (n.query.creativeid) {
          window.ywkjTT_creativeid = n.query.creativeid;
        }
        if (n.query.account_id) {
          window.ywkjTT_account_id = n.query.account_id;
        }
        if (n.query.campaign_id) {
          window.ywkjTT_campaign_id = n.query.campaign_id;
        }
        if (n.query.unit_id) {
          window.ywkjTT_unit_id = n.query.unit_id;
          window.ywkjKS_AdidStr = n.query.unit_id;
        }
        if (n.query.creative_id) {
          window.ywkjTT_creative_id = n.query.creative_id;
        }
        if (n.query.projectid) {
          window.m_projectid = n.query.projectid;
        }
        if (n.query.promotionid) {
          window.m_promotionid = n.query.promotionid;
        }
        if (n.query.mid1) {
          window.mid1 = n.query.mid1;
        }
        if (n.query.mid2) {
          window.mid2 = n.query.mid2;
        }
        if (n.query.mid3) {
          window.mid3 = n.query.mid3;
        }
        if (n.query.mid4) {
          window.mid4 = n.query.mid4;
        }
        if (n.query.mid5) {
          window.mid5 = n.query.mid5;
        }
        if (n.query.mid6) {
          window.mid6 = n.query.mid6;
        }
      }
    }
    this.initReport();
    if (!window.wx || window.tt || window.ks) {
      this.setInterval();
      i.default.show(function () {
        e.setInterval();
      });
    }
  };
  t.prototype.setInterval = function () {
    if (!window.wonder_online) {
      c.default.setStartClientTime();
      window.wonder_online = setInterval(function () {
        c.default.setEndClientTime();
        o.default.checkReportQueue(false);
      }, l.ONLINE_DEFAULT_INTERVAL);
    }
  };
  t.prototype.report = function (t, e) {
    if (window.tt || window.ks) {
      o.default.other(t, e);
    }
  };
  t.prototype.initReport = function () {
    if (window.tt || window.ks || window.wx) {
      var t = this;
      if (window.params.getUserParams("openid")) {
        r.default.login({
          success: function () {
            window.game_loginDone = true;
          }
        });
        var e = window.params.getUserParams("openid");
        window.ywkjTT_openidStr = e;
        t.getUUIDDone();
        t.hitInvite();
        if (f.default.BMS_APP_NAME == "lxdsks") {
          g.default.GetInstance().reportActive(window.ywkjTT_openidStr);
        }
        window.Logger.info("## 检查上次是否有异常退出导致在线时长未上报", c.default.getOnlineTime());
        if (c.default.getOnlineTime() > 0) {
          o.default.online();
        }
        window.Logger.info("## 检查上次是否有异常退出导致事件队列未上报", window.reportQueue.len());
        if (window.reportQueue.len() > 0) {
          o.default.reportQueue();
        }
        o.default.click();
        o.default.active();
        o.default.userInfo();
      } else {
        window.Logger.info("## 重新调用登录获取openid");
        r.default.login({
          success: function (e) {
            window.game_loginDone = true;
            window.Logger.info("## login: ", e);
            window.Logger.info("## app_name: " + window.params.getGameParams("app_name"));
            s.getOpenid({
              code: e.code,
              app_name: window.params.getGameParams("app_name")
            }, function (e) {
              console.log("## result : ", JSON.stringify(e));
              if (e.data.code == 0) {
                var n = e.data.data.openid;
                window.Logger.info("## 获取openid成功 ：", n);
                window.ywkjTT_openidStr = n;
                t.getUUIDDone();
                t.hitInvite();
                if (f.default.BMS_APP_NAME == "lxdsks") {
                  g.default.GetInstance().reportActive(window.ywkjTT_openidStr);
                }
                window.params.setUserParams({
                  openid: n
                });
                if (c.default.getOnlineTime() > 0) {
                  window.Logger.info("## 处理异常退出导致未上报的在线时长");
                  o.default.online();
                }
                if (window.reportQueue.len() > 0) {
                  window.Logger.info("## 处理异常退出导致未上报的事件队列");
                  o.default.reportQueue();
                }
                o.default.click();
                o.default.active();
                o.default.userInfo();
              } else {
                window.Logger.warn("## 获取openid失败，返回参数为：", e.data);
              }
            }, function (t) {
              window.Logger.warn("## 调用获取openid接口失败：", t);
            });
          },
          fail: function (t) {
            window.Logger.warn("调用wx.login失败：", t);
          }
        });
      }
    }
  };
  t.prototype.getReportList = function () {
    return window.reportQueue.getList();
  };
  t.prototype.getFirstReportServerTime = function () {
    return c.default.getFirstReportServerTime();
  };
  t.prototype.getFirstReportClientTime = function () {
    return c.default.getFirstReportClientTime();
  };
  t.prototype.getOnlineTime = function () {
    return c.default.getOnlineTime();
  };
  t.prototype.getUUIDDone = function () {
    if (window.ywkjTT_openidStr && window.ywkjTT_openidStr != "null") {
      y.default.GetInstance().checkGetServerData();
      cc.game.emit("game_getUUIDDone");
    }
  };
  t.prototype.hitInvite = function () {
    if (window.m_share_id && window.m_open_id) {
      console.log("## hitInvite");
      m.default.GetInstance().hitInvite(function () {});
    }
  };
  return t;
}())();
exports.default = _;