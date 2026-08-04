Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = require("./Api");
var i = require("./function");
var a = require("./TimeManage");
var r = require("./config");
var s = function () {
  function t() {}
  t.prototype.click = function () {
    if ((!window.wx || window.tt || window.ks) && (window.params.getShowParams("w_cid") || window.params.getShowParams("clickid"))) {
      var t = {
        yw_track_channel: window.tt ? "tt_ttmn" : "ks_mn",
        yw_app_name: window.params.getGameParams("app_name"),
        yw_channel: window.params.getGameParams("channel"),
        yw_version: window.params.getGameParams("version"),
        yw_opi: window.params.getUserParams("openid")
      };
      t = Object.assign(t, window.params.getShowParams());
      window.Logger.info("## 上报监测数据", t);
      o.click(t, function (t) {
        window.Logger.info("## 上报监测数据完成", t);
      }, function (t) {
        window.Logger.error("## 监测数据上报失败;", t);
      }, function () {});
    }
  };
  t.prototype.active = function () {
    if (!window.wx || window.tt || window.ks) {
      i.getServerTime(function (t) {
        var e = [{
          d_type: "u_op",
          t: i.getClientTime(),
          act: "active",
          wds: "激活",
          clickid: window.params.getShowParams("clickid")
        }];
        var n = {
          app_name: window.params.getGameParams("app_name"),
          channel: window.params.getGameParams("channel"),
          version: window.params.getGameParams("version"),
          uuid: window.params.getUserParams("openid"),
          m_data: JSON.stringify(e),
          b_t: t.data.data.time
        };
        n = i.getSign(n);
        window.Logger.info("## 上报激活", n);
        o.report(n, function () {}, function (t) {
          window.Logger.error("## 激活上报失败;", t);
        }, function () {});
      });
    }
  };
  t.prototype.online = function () {
    if (!window.wx || window.tt || window.ks) {
      var t = a.default.getEndClientTime();
      var e = a.default.getOnlineTime();
      a.default.removeStartClientTime();
      a.default.removeEndClientTime();
      i.getServerTime(function (n) {
        var a = [{
          d_type: "u_op",
          t: t,
          act: "time",
          wds: "时长",
          tab1: e,
          clickid: window.params.getShowParams("clickid")
        }];
        var r = {
          app_name: window.params.getGameParams("app_name"),
          channel: window.params.getGameParams("channel"),
          version: window.params.getGameParams("version"),
          uuid: window.params.getUserParams("openid"),
          m_data: JSON.stringify(a),
          b_t: n.data.data.time
        };
        r = i.getSign(r);
        window.Logger.info("## 上报在线时长", r);
        o.report(r, function () {}, function (t) {
          window.Logger.error("## 在线时长上报失败;", t);
        }, function () {});
      });
    }
  };
  t.prototype.userInfo = function () {
    if (!window.wx || window.tt || window.ks) {
      i.getServerTime(function (t) {
        var e = "tt_minigame";
        if (window.ks) {
          e = "ks_minigame";
        }
        var n = [{
          d_type: "u",
          platform: e,
          t: i.getClientTime(),
          clickid: window.params.getShowParams("clickid"),
          requestid: window.params.getShowParams("requestid"),
          os: window.params.getShowParams("os"),
          imei: window.params.getShowParams("imei"),
          android_id: window.params.getShowParams("android_id"),
          mac: window.params.getShowParams("mac"),
          idfa: window.params.getShowParams("idfa"),
          idfa_md5: window.params.getShowParams("idfa_md5"),
          d_m: window.params.getShowParams("d_m"),
          idfv: window.params.getShowParams("idfv"),
          oaid: window.params.getShowParams("oaid")
        }];
        var a = {
          app_name: window.params.getGameParams("app_name"),
          channel: window.params.getGameParams("channel"),
          version: window.params.getGameParams("version"),
          uuid: window.params.getUserParams("openid"),
          m_data: JSON.stringify(n),
          b_t: t.data.data.time
        };
        a = i.getSign(a);
        window.Logger.info("## 上报用户信息", a);
        o.report(a, function (t) {
          window.Logger.info("## 上报用户信息成功;", t);
        }, function (t) {
          window.Logger.error("## 上报用户信息失败;", t);
        }, function () {});
      });
    }
  };
  t.prototype.adRequest = function (t) {
    var e = "字节";
    if (window.ks) {
      e = "快手";
    }
    var n = {
      d_type: "ad_ac",
      t: i.getClientTime(),
      clickid: window.params.getShowParams("clickid"),
      act: "ad_request",
      wds: "广告请求",
      ad_t: t,
      tab1: e
    };
    window.reportQueue.push(n);
    this.checkReportQueue();
  };
  t.prototype.adFill = function (t) {
    var e = "字节";
    if (window.ks) {
      e = "快手";
    }
    var n = {
      d_type: "ad_ac",
      t: i.getClientTime(),
      clickid: window.params.getShowParams("clickid"),
      act: "ad_fill",
      wds: "广告填充",
      ad_t: t,
      tab1: e
    };
    window.reportQueue.push(n);
    this.checkReportQueue();
  };
  t.prototype.adClick = function (t) {
    var e = "字节";
    if (window.ks) {
      e = "快手";
    }
    var n = {
      d_type: "ad_ac",
      t: i.getClientTime(),
      clickid: window.params.getShowParams("clickid"),
      act: "ad_click",
      wds: "广告触发",
      ad_t: t,
      tab1: e
    };
    window.reportQueue.push(n);
    this.checkReportQueue();
  };
  t.prototype.adImpression = function (t) {
    var e = "字节";
    if (window.ks) {
      e = "快手";
    }
    var n = {
      d_type: "ad_ac",
      t: i.getClientTime(),
      clickid: window.params.getShowParams("clickid"),
      act: "ad_impression",
      wds: "广告展示",
      ad_t: t,
      tab1: e
    };
    window.reportQueue.push(n);
    this.checkReportQueue();
  };
  t.prototype.adImpressionDone = function (t) {
    var e = "字节";
    if (window.ks) {
      e = "快手";
    }
    var n = {
      d_type: "ad_ac",
      t: i.getClientTime(),
      clickid: window.params.getShowParams("clickid"),
      act: "ad_impression_done",
      wds: "广告播放完成",
      ad_t: t,
      tab1: e
    };
    window.reportQueue.push(n);
    this.checkReportQueue();
  };
  t.prototype.other = function (t, e) {
    var n = {
      d_type: "u_op",
      t: i.getClientTime(),
      clickid: window.params.getShowParams("clickid"),
      act: t,
      wds: e
    };
    window.reportQueue.push(n);
    this.checkReportQueue();
  };
  t.prototype.checkReportQueue = function (t) {
    var e = this;
    if (t === undefined) {
      t = true;
    }
    if (t && !a.default.getFirstReportServerTime()) {
      a.default.setFirstReportServerTime();
      a.default.setFirstReportClientTime();
    }
    if (window.reportQueue.len() > 0 && (window.reportQueue.len() >= r.LIMIT_REPORT_COUNT || a.default.getFirstReportClientTime() && i.getClientTime() - a.default.getFirstReportClientTime() >= r.LIMIT_REPORT_INTERVAL)) {
      setTimeout(function () {
        e.reportQueue();
      }, 500);
    }
  };
  t.prototype.reportQueue = function (t) {
    if (t === undefined) {
      t = 0;
    }
    if ((!window.wx || window.tt || window.ks) && !(Object.keys(window.params.getGameParams()).length <= 0) && window.params.getUserParams("openid")) {
      var e = window.reportQueue.range(0, t === 0 ? window.reportQueue.len() : t);
      var n = {
        app_name: window.params.getGameParams("app_name"),
        channel: window.params.getGameParams("channel"),
        version: window.params.getGameParams("version"),
        uuid: window.params.getUserParams("openid"),
        m_data: JSON.stringify(e),
        b_t: a.default.getFirstReportServerTime()
      };
      a.default.removeFirstReportServerTime();
      a.default.removeFirstReportClientTime();
      n = i.getSign(n);
      window.Logger.info("## 上报事件队列", n, e);
      o.report(n, function () {}, function (t) {
        window.Logger.error("## 事件队列上报失败;", t);
      }, function () {});
    }
  };
  return t;
}();
exports.default = new s();