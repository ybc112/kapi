Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = require("./ManageCtl");
var i = require("./MyPlatform");
var a = require("./SdkConfig");
var r = require("./MyMsgCtl");
var s = require("./MyTool");
var c = require("./crypto-js");
var l = function () {
  function t() {
    this._url = {
      path: "https://op-data.zuiqiangyingyu.net/",
      info: "common/config/info",
      share_list: "common/game/share_list",
      ads_list: "common/game/v2/ads",
      shield_ip: "common/ip/is_enable",
      serverTime: "common/common/time"
    };
    this._lauchConfig = {};
    this._defaultLauchConfig = {
      gm: 0,
      ScreenAd20: 1,
      AdCheckpoint: [3, 3],
      isAuditing: 1,
      levelAD: 0,
      ADagain: 0,
      levelTimeAD: 1,
      BackAd20: 0,
      AddTime: 180,
      gameMinTime: 0,
      UnlockAllLevel: 1,
      UnlockAllLevelNum: 3,
      UnlockAllModeNum: 5,
      level: [],
      ProjectID: [],
      wheel: [],
      evaluate: [],
      FailAdCheckpoint: [],
      share: 0,
      TwoTimesUnlock: [],
      buyscene: [],
      buyitem: [],
      buyrevive: [],
      normalitem: [],
      normalrevive: [],
      HardLevel: 0,
      sharerevive: 0,
      AdIntervals: 1,
      zbtj: [0, 0],
      zbdata: 0,
      luckygift: 1,
      signinCheckpoint: [1, 4],
      HideMode: [],
      modeMain: []
    };
    this._isShieldIP = 0;
    this._isAuditing = 1;
    this._shareList = {};
    this._adsList = [];
    this.m_requestShieldIPSuccessFlag = false;
    this.m_requestConfigSuccessFlag = false;
    this.m_requestShareSuccessFlag = false;
    this.m_loadAdTraceFlag = false;
  }
  t.GetInstance = function () {
    if (!t.instance) {
      t.instance = new t();
    }
    return this.instance;
  };
  t.prototype.requestShieldIP = function () {
    if (!this.m_requestShieldIPSuccessFlag) {
      this.httpRequestShieldIP();
      if (this.m_requestConfigSuccessFlag) {
        this.httpRequestConfigSuccess();
      }
    }
  };
  t.prototype.requestConfig = function (t) {
    if (!this.m_requestConfigSuccessFlag) {
      this.httpRequestConfig(t);
    }
  };
  t.prototype.requestShare = function () {
    if (!this.m_requestShareSuccessFlag) {
      this.httpRequestShare();
      this.httpRequestAds();
    }
  };
  t.prototype.requestServerTime = function () {};
  t.prototype.httpRequestShieldIP = function () {
    var t = this;
    var e = this;
    this.httpRequest(this._url.path + this._url.shield_ip, {
      app_name: i.default.BMS_APP_NAME
    }, function (n) {
      if (n && n.data && n.data.data) {
        var o = n.data.data;
        t._isShieldIP = parseInt(o.is_enable);
        e.httpRequestShieldIPSuccess();
      }
    }, false, "GET");
  };
  t.prototype.httpRequestConfig = function (t) {
    var e = this;
    var n = this;
    if (i.default.isIOS) {
      this._url.info = "common/stat-info/info";
    }
    if (!o.ManageCtl.isH5_NOADS()) {
      console.log("## MyPlatform.BMS_APP_NAME: " + i.default.BMS_APP_NAME + " MyPlatform.BMS_VERSION: " + i.default.BMS_VERSION);
    }
    this.httpRequest(this._url.path + this._url.info, {
      app_name: i.default.BMS_APP_NAME,
      version: i.default.BMS_VERSION
    }, function (a) {
      if (a && a.data && a.data.data) {
        var r = a.data.data;
        if (a.data.data) {
          if (i.default.isIOS) {
            var c = e.qttUS(a.data.data, "XppWRb3GLxLmXQo8", "Qnyjq6ZoMQyIOZ11");
            c = JSON.parse(c);
            a.data.data = c;
            r = c;
          }
          if (s.MyTool.getJsonLength(a.data.data) <= 0) {
            return void e.httpRequestConfigFail();
          }
          try {
            for (var l in a.data.data) {
              e._lauchConfig[l] = a.data.data[l];
            }
            window.lauchConfig = e._lauchConfig;
          } catch (u) {}
          if (!o.ManageCtl.isH5_NOADS()) {
            console.log("## 启动common.lauchConfig配置：", JSON.stringify(e._lauchConfig));
          }
          e._isAuditing = r.isAuditing;
          if (!(e._isAuditing == 1)) {
            e._isShieldIP;
          }
          if (t) {
            t();
          }
        }
        n.httpRequestConfigSuccess();
      }
    }, false, "GET");
  };
  t.prototype.qttS = function (t, e, n) {
    var o = JSON.stringify(t);
    var i = {
      iv: c.enc.Utf8.parse(n),
      mode: c.mode.CBC,
      padding: c.pad.Pkcs7
    };
    var a = c.enc.Utf8.parse(e);
    var r = c.enc.Utf8.parse(o);
    return c.AES.encrypt(r, a, i).toString();
  };
  t.prototype.qttUS = function (t, e, n) {
    var o = {
      iv: c.enc.Utf8.parse(n),
      mode: c.mode.CBC,
      padding: c.pad.Pkcs7
    };
    var i = c.enc.Utf8.parse(e);
    var a = c.AES.decrypt(t, i, o);
    return c.enc.Utf8.stringify(a).toString();
  };
  t.prototype.randomString = function (t) {
    t = t || 32;
    for (var e = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678", n = e.length, o = "", i = 0; i < t; i++) {
      o += e.charAt(Math.floor(Math.random() * n));
    }
    return o;
  };
  t.prototype.httpRequestShare = function () {
    var t = this;
    this.httpRequest(this._url.path + this._url.share_list, {
      app_name: i.default.BMS_APP_NAME
    }, function (e) {
      if (e && e.data && e.data.data) {
        console.log("## 分享信息：", JSON.stringify(e));
        t._shareList = {};
        if (e.data.data.list && e.data.data.list.length > 0) {
          for (var n = e.data.data.list, o = [], i = 0; i < n.length; i++) {
            if (n[i].position == 3) {
              o.push({
                id: n[i].id,
                flag: n[i].flag,
                position: n[i].position,
                title: n[i].title,
                image: n[i].image,
                weight: n[i].weight
              });
            }
          }
          t._shareList = {
            3: o
          };
        }
        t.httpRequestShareSuccess();
      }
    }, false, "GET");
  };
  t.prototype.httpRequestShieldIPSuccess = function () {
    this.m_requestShieldIPSuccessFlag = true;
  };
  t.prototype.getRequestConfigSuccess = function () {
    return this.m_requestConfigSuccessFlag;
  };
  t.prototype.httpRequestConfigFail = function () {
    this.m_requestConfigSuccessFlag = true;
    window.level_showAutoBtn = this._lauchConfig.auto;
    r.default.GetInstance().emit(a.MyConstans.msg.httpRequestConfigSuccess);
  };
  t.prototype.httpRequestConfigSuccess = function () {
    this.m_requestConfigSuccessFlag = true;
    r.default.GetInstance().emit(a.MyConstans.msg.httpRequestConfigSuccess);
  };
  t.prototype.httpRequestShareSuccess = function () {
    this.m_requestShareSuccessFlag = true;
  };
  t.prototype.httpRequestServerTimeSuccess = function () {};
  t.prototype.httpRequestAds = function () {
    var t = this;
    this.httpRequest(this._url.path + this._url.ads_list, {
      app_name: i.default.BMS_APP_NAME
    }, function (e) {
      console.log("广告信息：", e);
      t._adsList = [];
      if (e.data.data.list && e.data.data.list.length > 0) {
        for (var n = e.data.data.list, o = 0; o < n.length; o++) {
          t._adsList.push(n[o]);
        }
      }
    }, false, "GET");
  };
  t.prototype.adTrace = function () {
    if (!this.m_loadAdTraceFlag) {
      this.m_loadAdTraceFlag = true;
      if (i.default.isIOS && this.getConditionByTagOutAudit("isAdsTrack") && window.jsb && window.jsb.reflection) {
        jsb.reflection.callStaticMethod("AppController", "adTrace");
      }
    }
  };
  t.prototype.getConfigByTag = function (t) {
    return this.getConditionByTagOutAudit(t);
  };
  t.prototype.getConditionByTagOutAudit = function (t, e) {
    if (e === undefined) {
      e = true;
    }
    if (this._lauchConfig == null) {
      return this.checkDefaultTrue(t);
    } else if (this._lauchConfig.isAuditing == null) {
      return this.checkDefaultTrue(t);
    } else {
      return (!this._lauchConfig.isAuditing || !e) && (this._lauchConfig[t] == null ? this.checkDefaultTrue(t) : this._lauchConfig[t] == "all" || this._lauchConfig[t] == 1 || this._lauchConfig[t] != "no" && this._lauchConfig[t] != 0 && (this._lauchConfig[t] != "ip" || this._isShieldIP != 0));
    }
  };
  t.prototype.checkDefaultTrue = function (t) {
    var e = false;
    switch (t) {
      case "isAdsTrack":
        e = true;
    }
    return e;
  };
  t.prototype.getConditionByVideoicon = function (t) {
    return this._lauchConfig == null || this._lauchConfig[t] == null || this._lauchConfig[t] == "all" || this._lauchConfig[t] == 1 || this._lauchConfig[t] != "no" && this._lauchConfig[t] != 0 && (this._lauchConfig[t] == "ip" ? t == "videoicon" || t == "videoicon1" ? this._isShieldIP == 0 : this._isShieldIP != 0 : t == "videoicon" || t == "videoicon1");
  };
  t.prototype.getConditionValueByType = function (t) {
    if (this._lauchConfig == null) {
      return this.checkDefaultCount(t);
    } else if (this._lauchConfig[t] == null) {
      return this.checkDefaultCount(t);
    } else {
      return this._lauchConfig[t];
    }
  };
  t.prototype.getIsAuditing = function () {
    return this._isAuditing == 1;
  };
  t.prototype.checkDefaultCount = function (t) {
    return this._defaultLauchConfig[t];
  };
  t.prototype.setBmsDefaultCount = function (t, e) {
    this._defaultLauchConfig[t] = e;
  };
  t.prototype.getShareList = function () {
    if (this._shareList[3]) {
      return this._shareList[3];
    } else {
      return [];
    }
  };
  t.prototype.httpRequest = function (t, e, n, o, i, a) {
    if (n === undefined) {
      n = function () {};
    }
    if (o === undefined) {
      o = false;
    }
    if (i === undefined) {
      i = "POST";
    }
    if (a === undefined) {
      a = false;
    }
    this.Get(t, e, n);
  };
  t.prototype.Get = function (t, e, n) {
    t += "?";
    var o = "";
    for (var i in e) {
      o += i + "=" + e[i] + "&";
    }
    var a = new XMLHttpRequest();
    a.onreadystatechange = function () {
      if (a.readyState == 4) {
        if (a.status >= 200 && a.status < 400) {
          var t = a.responseText;
          if (t) {
            var e = JSON.parse(t);
            n({
              data: e
            });
          } else {
            n(false);
          }
        } else {
          n(false);
        }
      }
    };
    a.open("GET", t + o, true);
    a.send();
  };
  t.instance = null;
  return t;
}();
exports.default = l;