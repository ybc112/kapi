var n;
var o;
var i;
var a = function () {
  return (a = Object.assign || function (t) {
    for (var e, n = 1, o = arguments.length; n < o; n++) {
      for (var i in e = arguments[n]) {
        if (Object.prototype.hasOwnProperty.call(e, i)) {
          t[i] = e[i];
        }
      }
    }
    return t;
  }).apply(this, arguments);
};
if (typeof SuppressedError == "function") {
  SuppressedError;
}
(function (t) {
  t.DOUYIN = "douyin";
  t.KUAISHOU = "ks";
})(o || (o = {}));
(function (t) {
  t.ACTIVE = "active";
  t.AD = "ad";
})(i || (i = {}));
var r;
var s;
(n = {})[o.DOUYIN] = "byte/dance";
n[o.KUAISHOU] = "ks";
var c = n;
var l = typeof KSGameGlobal != "undefined";
var u = l ? o.KUAISHOU : o.DOUYIN;
var d = l ? typeof ks != "undefined" && ks : typeof tt != "undefined" && tt;
function h(t, e) {
  console.error("[WFTSDK ".concat(u, "]:").concat(t), e);
}
function p(t, e) {
  console.log("[WFTSDK ".concat(u, " debug]:").concat(t), e);
}
!function (t) {
  t.GET = "GET";
  t.POST = "POST";
}(s || (s = {}));
(r = {})[i.ACTIVE] = "/".concat(c[u], "/open/api/active");
r[i.AD] = "/".concat(c[u], "/open/api/read/ads");
var f = r;
var g = new (function () {
  function t() {
    this.debug = false;
  }
  t.prototype.fetch = function (t) {
    var e = this;
    return new Promise(function (n, o) {
      t.header = a(a({}, t.header), {
        "app-key": t.data.appKey,
        "app-id": t.data.appId
      });
      if (d) {
        d.request(a(a({}, t), {
          success: function (o) {
            var i = o.data;
            try {
              i = i && JSON.parse(i);
            } catch (t) {}
            if (e.debug) {
              p(t.url, i);
            }
            n(i);
          },
          fail: function (n) {
            if (e.debug) {
              p(t.url, n);
            }
            o(n.errMsg);
          },
          complate: function () {
            if (e.debug) {
              p("complate");
            }
          }
        }));
      }
    });
  };
  t.prototype.setDebug = function (t) {
    this.debug = t;
  };
  t.prototype.post = function (t, e) {
    return this.fetch({
      url: "https://copyapi.data.tryine.com" + t,
      method: s.POST,
      data: e
    });
  };
  t.prototype.report = function (t) {
    return this.post(f[t.eventType], t.data);
  };
  return t;
}())();
var m = function () {
  function t(t) {
    var e;
    var n;
    this.config = {
      appKey: "",
      appId: "",
      openId: "",
      anonymousOpenId: "",
      debug: false
    };
    this.options = {
      clickId: null,
      promotionId: null,
      projectId: null,
      requestId: null,
      advertiserId: null,
      groupId: null,
      adId: null,
      creativeId: null,
      scene: null,
      extra: null,
      unitId: null,
      accountId: null,
      campaignId: null,
      query: null
    };
    if (t.debug) {
      console.log("[WFTSDK version]: ".concat("0.2.2-1"));
    }
    this.config.appKey = t.appKey;
    this.config.debug = !!t.debug;
    g.setDebug(!!t.debug);
    if (d) {
      var i = d.getLaunchOptionsSync();
      var r = i.query;
      var s = r.clickid;
      var c = r.projectid;
      var l = r.promotionid;
      var h = r.requestid;
      var p = r.click_id;
      var f = r.request_id;
      var m = r.creative_id;
      var y = r.ad_id;
      var _ = r.group_id;
      var v = r.advertiser_id;
      var C = i.query;
      var w = C.callback;
      var b = C.account_id;
      var M = C.campaign_id;
      var k = C.unit_id;
      if (u === o.DOUYIN) {
        this.config.appId = (e = i.extra) === null || e === undefined ? undefined : e.appId;
        this.options = {
          clickId: s || p,
          promotionId: l,
          projectId: c,
          requestId: h || f,
          advertiserId: v,
          groupId: _,
          adId: y,
          creativeId: m,
          scene: i.scene,
          query: i.query,
          extra: JSON.stringify(i.extra)
        };
      } else if (u === o.KUAISHOU) {
        var I = d.getSystemInfoSync();
        this.config.appId = (n = I.host) === null || n === undefined ? undefined : n.appId;
        this.options = {
          clickId: w,
          creativeId: m,
          unitId: k,
          accountId: b,
          campaignId: M,
          scene: i.from,
          query: i.query,
          extra: JSON.stringify(a(a({}, I.host), {
            brand: I.brand,
            model: I.model
          }))
        };
      }
    } else if (t.debug) {
      console.warn("[WFTSDK环境异常，非官方平台或小游戏开发工具环境内将无法正常执行上报]");
    }
  }
  t.prototype.trackEvent = function (t) {
    if (d) {
      t.data = a(a(a({}, t.data), this.config), this.options);
      if (!this.config.appId) {
        h(t.eventType + " appId 不能为空");
      }
      if (!this.config.appKey) {
        h(t.eventType + " appKey 不能为空");
      }
      if (u === o.DOUYIN) {
        if (!(this.config.openId || this.config.anonymousOpenId)) {
          h(t.eventType + " openId 或 anonymousOpenId 不能为空");
        }
      } else if (!this.config.openId) {
        h(t.eventType + " openId 不能为空");
      }
      if (this.config.debug) {
        p(t.eventType, t);
      }
      g.report(t);
    }
  };
  t.prototype.reportActive = function (t) {
    if (d) {
      this.config.openId = t.openId;
      this.config.anonymousOpenId = t.anonymousOpenId;
      this.trackEvent({
        eventType: i.ACTIVE
      });
    }
  };
  t.prototype.reportAd = function (t) {
    if (d) {
      if (!t.adUnitId) {
        h(i.AD + " adUnitId 不能为空");
      }
      if (t.isEnded !== false && t.isEnded !== true) {
        h(i.AD + " isEnded 不能为空或类型错误");
      }
      if (u === o.DOUYIN && isNaN(t.count)) {
        h(i.AD + " count 不能为空或类型错误");
      }
      this.trackEvent({
        eventType: i.AD,
        data: t
      });
    }
  };
  return t;
}();
if (typeof GameGlobal != "undefined") {
  GameGlobal.WftSdk = m;
}
module.exports = m;