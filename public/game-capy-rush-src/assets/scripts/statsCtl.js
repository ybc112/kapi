Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statsCtl = undefined;
var o = require("./ManageCtl");
var i = require("./MyPlatform");
var a = require("./SdkConfig");
(function (t) {
  t.events = [];
  t.timer = null;
  t.isInit = false;
  t.sendMsg = function (t, e) {
    if (e === undefined) {
      e = null;
    }
    if (!a.MyConstans.noAds) {
      if (e == null) {
        e = " ";
      }
      console.log("%c## 端埋点：" + t + "   " + JSON.stringify(e), "color:#f700f0");
      if (i.default.isANDROID) {
        this.subEvent(t, e);
      } else if (i.default.isIOS) {
        this.iOSCustomTrackerWithName(t, e);
      }
    }
  };
  t.sendMsgWithLv = function (t, e, n, o) {
    if (o === undefined) {
      o = null;
    }
    if (!a.MyConstans.noAds) {
      if (i.default.isANDROID_HW) {
        if (o == null) {
          o = {};
        }
        o = {
          mode: e,
          lv: n
        };
        this.sendMsg(t, o);
      } else {
        if (o == null) {
          o = " ";
        }
        var r = t + "_" + this.getLevelReportNum2(e) + "_" + this.getLevelReportNum(n);
        this.sendMsg(r, o);
      }
    }
  };
  t.subEventUMWithLv = function (t, e, n, o) {
    if (o === undefined) {
      o = null;
    }
    if (o == null) {
      o = {};
    }
    o[e] = this.getLevelReportNum(n);
    console.log("## 小游戏友盟 " + JSON.stringify(o));
    this.subEventUM(e, o);
  };
  t.sendMsgWithAllLv = function (t, e, n) {
    if (n === undefined) {
      n = null;
    }
    if (!(e > 400)) {
      if (n == null) {
        n = " ";
      }
      var o = t + this.getLevelReportNum(e);
      this.sendMsg(o, n);
    }
  };
  t.subEvent = function (t, e) {
    var n;
    if (e === undefined) {
      e = null;
    }
    if (e == null || e == " ") {
      n = {
        value: e = " "
      };
      n = JSON.stringify(n);
    } else {
      n = JSON.stringify(e);
    }
    if (window.jsb && window.jsb.reflection && window.jsb.reflection.callStaticMethod) {
      jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "sendMsg", "(Ljava/lang/String;Ljava/lang/String;)V", t, n);
    }
  };
  t.iOSCustomTrackerWithName = function (t, e) {
    var n = JSON.stringify(e);
    if (window.jsb && window.jsb.reflection && window.jsb.reflection.callStaticMethod) {
      jsb.reflection.callStaticMethod("AppController", "customTrackerWithName:andDictString:", t, n);
    }
  };
  t.subEventUMByModeId = function (t, e, n, o) {
    if (o === undefined) {
      o = null;
    }
  };
  t.subEventUM = function () {};
  t.getLevelReportNum = function (t) {
    if (t < 10) {
      return "00" + t;
    } else if (t >= 10 && t < 100) {
      return "0" + t;
    } else {
      return t + "";
    }
  };
  t.getLevelReportNum2 = function (t) {
    if (t < 10) {
      return "0" + t;
    } else {
      return t + "";
    }
  };
  t.sendEvents = function () {
    if (!(this.events.length <= 0)) {
      var t = {
        app_name: i.default.BMS_APP_NAME,
        version: i.default.BMS_VERSION,
        platform_name: "ks",
        open_id: "123",
        d_data: JSON.stringify(this.events),
        b_t: Math.floor(new Date().getTime() / 1000).toString()
      };
      console.log("report()", t);
      var e = "";
      for (var n in t) {
        e += n + "=" + t[n] + "&";
      }
      this.request("POST", "https://game.zuiqiangyingyu.net/common/user_op/save_op_data", e, {
        "Content-Type": "application/x-www-form-urlencoded"
      });
      this.events = [];
    }
  };
  t.request = function (t, e, n, o) {
    if (t === undefined) {
      t = "GET";
    }
    return new Promise(function (i, a) {
      var r = new XMLHttpRequest();
      r.onreadystatechange = function () {
        if (r.status == 200 && r.readyState == 4) {
          console.log("request() success:", r.response);
          i(r.response);
        }
      };
      r.onerror = function (t) {
        console.log("request() error:", t);
        a();
      };
      r.ontimeout = function () {
        a();
      };
      r.onloadend = function () {
        if (r.status == 404) {
          a();
        }
      };
      r.open(t, e);
      if (o) {
        for (var s in o) {
          r.setRequestHeader(s, o[s]);
        }
      }
      r.send(n);
    });
  };
  t.sendEventShuShu = function (t, e) {
    if (!window.h5_daren) {
      if (o.ManageCtl.isZJTD() && window.inLiveUser && o.ManageCtl.bmsCtl.getConditionValueByType("zbdata") <= 0 && t != "reward_btn" && t != "user_Login") {
        return;
      }
      console.log("## 数数埋点 ", t, e);
      i.default.instance.sendEventShuShu(t, e);
    }
  };
})(exports.statsCtl || (exports.statsCtl = {}));