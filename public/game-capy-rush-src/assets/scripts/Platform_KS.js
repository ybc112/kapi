Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Platform_KS = undefined;
var o = require("./ksPostbackCtl");
var i = require("./ttPostbackCtl");
var a = function () {
  function t(t) {
    this._config = {
      bms_name: "",
      bms_version: "",
      appid: "",
      rewardId: "",
      bannerId: "",
      insertId: "",
      blockAdId: "",
      shushuId: ""
    };
    this.sdk = window.kwaigame;
    this._rewardAds = null;
    this._rewardAdsCb = null;
    this._insert = null;
    this._recorder = null;
    this._recordStatus = -1;
    this._recordID = null;
    this._recordTime = 0;
    this.ta = null;
    this._config = t;
    var e = cc.sys.localStorage.getItem("snd_guid");
    if (!e) {
      e = this.guid();
      cc.sys.localStorage.setItem("snd_guid", e);
    }
    console.log("## mid: ", e);
    this.taInit(e);
  }
  t.prototype.guid = function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
      var e = 16 * Math.random() | 0;
      return (t == "x" ? e : 3 & e | 8).toString(16);
    });
  };
  t.prototype.taInit = function (t) {
    if (this._config.shushuId && this._config.shushuId != "") {
      var e = {
        appId: this._config.shushuId,
        serverUrl: "https://ta-data.zuiqiangyingyu.net",
        autoTrack: {
          appShow: true,
          appHide: true
        }
      };
      this.ta = new ThinkingAnalyticsAPI(e);
      this.ta.login(t);
      this.ta.init();
    }
  };
  t.prototype.showRewardAds = function (t) {
    var e = this;
    if (this.sdk) {
      if (!this.sdk.createRewardedVideoAd) {
        return t(-2);
      }
      if (!this._config.rewardId) {
        return t(-3);
      }
      this._rewardAdsCb = t;
      if (!this._rewardAds) {
        i.default.GetInstance().adRequest("激励视频");
        this._rewardAds = this.sdk.createRewardedVideoAd({
          adUnitId: this._config.rewardId
        });
        this._rewardAds.onClose(function () {
          window.level_gamePause = false;
          o.default.GetInstance().reportAd(e._config.rewardId, false);
          e._rewardAdsCb(1);
        });
        this._rewardAds.onReward(function () {
          i.default.GetInstance().adImpressionDone("激励视频");
          window.level_gamePause = false;
          o.default.GetInstance().reportAd(e._config.rewardId, true);
          e._rewardAdsCb(0);
        });
      }
      i.default.GetInstance().adClick("激励视频");
      this._rewardAds.show({
        success: function () {
          i.default.GetInstance().adFill("激励视频");
          i.default.GetInstance().adImpression("激励视频");
        },
        fail: function () {
          i.default.GetInstance().adFill("激励视频");
        }
      });
    }
  };
  t.prototype.showInsert = function () {
    var t = this;
    if (this.sdk && this.sdk.createInterstitialAd && this._config.insertId) {
      if (!this._insert) {
        this._insert = this.sdk.createInterstitialAd({
          adUnitId: this._config.insertId
        });
        this._insert.show().then(function () {}).catch(function (e) {
          console.log("[platform] [KSPlatform] showInsert", e);
          if (t._insert) {
            t._insert.destroy();
            t._insert = null;
          }
        });
        this._insert.onClose(function () {
          if (t._insert) {
            t._insert.destroy();
            t._insert = null;
          }
        });
        this._insert.onError(function (e) {
          console.log("[platform] [KSPlatform] showInsert", e);
          if (t._insert) {
            t._insert.destroy();
            t._insert = null;
          }
        });
      }
    }
  };
  t.prototype.sendEventShuShu = function (t, e) {
    if (this.ta) {
      this.setUserSet();
      this.setSuperProperties();
      console.log("## 发送数数埋点");
      this.ta.track(t, e);
    }
  };
  t.prototype.setUserSet = function () {
    if (this.ta) {
      var t = cc.sys.localStorage.getItem("xjwsl_setUser2");
      var e = window.ywkjTT_openidStr || "null";
      if (e != "null" && !t) {
        cc.sys.localStorage.setItem("xjwsl_setUser2", "ok");
        console.log("## user in");
        var n = window.ywkjKS_AdidStr || "";
        var o = window.ywkjTT_account_id || "";
        var i = window.ywkjTT_campaign_id || "";
        var a = window.ywkjTT_unit_id || "";
        var r = window.ywkjTT_creative_id || "";
        this.ta.userSet({
          openid: e,
          ad_id: n,
          account_id: o,
          campaign_id: i,
          unit_id: a,
          creative_id: r
        });
      }
    }
  };
  t.prototype.setSuperProperties = function () {
    if (this.ta) {
      var t = window.ywkjKS_AdidStr || "";
      this.ta.setSuperProperties({
        version: this._config.bms_version,
        ad_id: t,
        video_id: window.video_id || "",
        projectid: window.m_projectid || "",
        promotionid: window.m_promotionid || "",
        mid1: window.mid1 || "",
        mid2: window.mid2 || "",
        mid3: window.mid3 || "",
        mid4: window.mid4 || "",
        mid5: window.mid5 || "",
        mid6: window.mid6 || ""
      });
    }
  };
  t.prototype.shareRecordCap = function (t) {
    var e = this;
    if (this._recorder) {
      if (-1 == this._recordStatus) {
        return t(-1);
      } else if (this._recordID) {
        return void this._recorder.publishVideo({
          video: this._recordID,
          callback: function (n) {
            if (n) {
              e._recordStatus = 1;
              t(1);
            } else {
              t(0);
            }
          }
        });
      } else {
        return t(-3);
      }
    } else {
      return t(-2);
    }
  };
  t.prototype.startRecordCap = function () {
    var t = this;
    if (this.sdk && this.sdk.createMediaRecorder) {
      if (!this._recorder) {
        this._recorder = this.sdk.createMediaRecorder();
        this._recorder.onStop(function (e) {
          t._recordID = e.videoID;
        });
        this._recorder.onError(function () {
          t._recordStatus = -1;
        });
      }
      this._recordID = null;
      this._recorder.start();
      this._recordStatus = 1;
      this._recordTime = Math.floor(new Date().getTime() / 1000);
    }
  };
  t.prototype.stopRecordCap = function () {
    if (this._recorder && this._recordStatus == 1) {
      this._recorder.stop();
      this._recordStatus = Math.floor(new Date().getTime() / 1000) - this._recordTime < 5 ? -1 : 0;
    }
  };
  t.prototype.getShareStatus = function () {
    return this._recordStatus;
  };
  t.prototype.share = function () {
    if (this.sdk) {
      this.sdk.shareAppMessage({
        success: function () {
          console.log("分享成功");
        },
        fail: function () {
          console.log("分享失败");
        }
      });
    }
  };
  t.prototype.setClipboardData = function (t, e) {
    if (this.sdk) {
      if (this.sdk.setClipboardData) {
        this.sdk.setClipboardData({
          data: t,
          success: function () {
            e(0);
          },
          fail: function () {
            e(-1);
            console.log("## 复制失败");
          }
        });
      } else {
        console.log("## !this.sdk.setClipboardData");
      }
    }
  };
  return t;
}();
exports.Platform_KS = a;