Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Platform_ZJTD = undefined;
var o = require("./SdkConfig");
var i = require("./BmsCtl");
var a = require("./ttPostbackCtl");
var r = function () {
  function t(t) {
    var e = this;
    this._config = {
      bms_name: "",
      bms_version: "",
      appid: "",
      rewardId: "",
      bannerId: "",
      insertId: "",
      shushuId: "",
      shareId: ""
    };
    this.sdk = window.tt;
    this._rewardAds = null;
    this._rewardAdsCb = null;
    this._rewardHasShow = false;
    this._rewardHasLoad = false;
    this._banner = null;
    this._insert = null;
    this._insertAdsCb = null;
    this._recorder = null;
    this._recordStatus = -1;
    this._recordPath = null;
    this._inScene = -1;
    this.ta = null;
    this._config = t;
    if (this.sdk) {
      var n = this.sdk.getLaunchOptionsSync();
      var o = n.query;
      console.log("## 启动参数 options： ", JSON.stringify(n));
      if (n.scene) {
        this._inScene = n.scene;
      }
      if (o && o.share_id && o.open_id) {
        window.m_share_id = o.share_id;
        window.m_open_id = o.open_id;
      }
      var i = cc.sys.localStorage.getItem("hzwz_guid");
      if (!i) {
        i = this.guid();
        cc.sys.localStorage.setItem("hzwz_guid", i);
      }
      console.log("## mid: ", i);
      this.taInit(i);
      window.inLiveUser = 0;
      if (n.scene) {
        var a = n.scene;
        console.log("## 进入场景值：", a);
        if (!(a != "021001" && a != "101001" && a != "021036" && a != "021012" && a != "101036" && (n == null ? undefined : n.launch_from) != "homepage" && (n == null ? undefined : n.location) != "sidebar_card")) {
          cc.sys.localStorage.setItem("nxwz_canGetWelfareLimited", 1);
          cc.game.emit("canGetWelfareLimited");
        }
        if (a == "023010") {
          console.log("## 直播用户");
          window.inLiveUser = 1;
        }
        var r = cc.sys.localStorage.getItem("snd_inScene");
        if (r) {
          window.inScene = r;
        } else {
          window.inScene = a;
          cc.sys.localStorage.setItem("snd_inScene", a);
        }
      }
      this.sdk.onShow(function (t) {
        console.log("启动参数如下：", t.query);
        if (n.scene) {
          console.log("## 2 进入场景值：", n.scene);
          if (!(n.scene != "021001" && n.scene != "101001" && n.scene != "021036" && n.scene != "021012" && n.scene != "101036" && (n == null ? undefined : n.launch_from) != "homepage" && (n == null ? undefined : n.location) != "sidebar_card")) {
            cc.sys.localStorage.setItem("nxwz_canGetWelfareLimited", 1);
            cc.game.emit("canGetWelfareLimited");
          }
          if (n.scene == "023010") {
            console.log("## 直播用户2");
            window.inLiveUser = 1;
          }
        }
        setTimeout(function () {
          cc.game.emit("game_checkResumeBgm");
        }, 500);
      });
      this.sdk.onShareAppMessage(function () {
        return e.getShareData();
      });
    }
  }
  t.prototype.getShareData = function () {
    var t = i.default.GetInstance().getShareList();
    var e = {};
    console.log("##  getShareData: ", JSON.stringify(t));
    console.log("##  shareData['title']: ", e.title);
    console.log("##  shareData['imageUrl']: ", e.imageUrl);
    if (t.length > 0) {
      var n = t[Math.floor(Math.random() * t.length)];
      e.title = n.title;
      e.imageUrl = n.image;
    }
    return e;
  };
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
  t.prototype.sendEventShuShu = function (t, e) {
    if (this.ta) {
      this.setUserSet();
      this.setSuperProperties();
      console.log("## 发送数数埋点");
      this.ta.track(t, e);
    }
  };
  t.prototype.setSuperProperties = function () {
    if (this.ta) {
      var t = window.ywkjTT_AdidStr || "";
      if (t.length < 19) {
        this.ta.setSuperProperties({
          version: this._config.bms_version,
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
      } else {
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
    }
  };
  t.prototype.setUserSet = function () {
    if (this.ta) {
      var t = cc.sys.localStorage.getItem("xjwsl_setUser");
      var e = window.ywkjTT_openidStr || "null";
      if (e != "null" && !t) {
        cc.sys.localStorage.setItem("xjwsl_setUser", "ok");
        console.log("## user in");
        var n = window.ywkjTT_AdidStr || "";
        if (n.length < 19) {
          return void this.ta.userSet({
            openid: e
          });
        }
        this.ta.userSet({
          openid: e,
          ad_id: n
        });
      }
    }
  };
  t.prototype.getInstance = function () {
    return this.sdk;
  };
  t.prototype.showRewardAds = function (t) {
    var e = this;
    console.log("## tt showRewardAds rewardId " + this._config.rewardId);
    if (this.sdk) {
      if (!this.sdk.createRewardedVideoAd) {
        window.level_gamePause = false;
        return t(-2);
      }
      if (!this._config.rewardId) {
        window.level_gamePause = false;
        return t(-3);
      }
      this._rewardAdsCb = t;
      this._rewardHasShow = false;
      if (!this._rewardAds) {
        a.default.GetInstance().adRequest("激励视频");
        this._rewardAds = this.sdk.createRewardedVideoAd({
          adUnitId: this._config.rewardId
        });
        this._rewardAds.onLoad(function () {
          a.default.GetInstance().adFill("激励视频");
          e._rewardHasLoad = true;
          if (e._rewardHasShow) {
            window.level_gamePause = false;
          } else {
            e._rewardHasShow = true;
            a.default.GetInstance().adClick("激励视频");
            e._rewardAds.show().then(function () {
              a.default.GetInstance().adImpression("激励视频");
            });
          }
        });
        this._rewardAds.onClose(function (t) {
          e._rewardHasLoad = false;
          if (t.isEnded) {
            a.default.GetInstance().adImpressionDone("激励视频");
          }
          window.level_gamePause = false;
          e._rewardAdsCb(t.isEnded ? 0 : 1);
          if (t.isEnded) {
            window.lastPlayRewardAdTime = new Date().getTime() / 1000;
          }
        });
        this._rewardAds.onError(function (t) {
          e._rewardHasLoad = false;
          console.log("## tt showRewardAds err:", t);
          window.level_gamePause = false;
          e._rewardAdsCb(-1);
        });
      }
      if (this._rewardHasLoad && !this._rewardHasShow) {
        this._rewardHasShow = true;
        a.default.GetInstance().adClick("激励视频");
        this._rewardAds.show().then(function () {
          a.default.GetInstance().adImpression("激励视频");
        });
      } else {
        a.default.GetInstance().adRequest("激励视频");
        this._rewardAds.load();
      }
    }
  };
  t.prototype.showBanner = function () {
    var t = this;
    console.log("## tt showBanner");
    if (this.sdk && this.sdk.createBannerAd && this._config.bannerId) {
      if (!this._banner) {
        this._banner = this.sdk.createBannerAd({
          adUnitId: this._config.bannerId,
          style: {
            left: 9999,
            top: 9999
          },
          adIntervals: 60
        });
        this._banner.onLoad(function () {
          if (t._banner) {
            t._banner.show().then(function () {}).catch(function () {});
          }
        });
        this._banner.onError(function (t) {
          console.log("## tt showBanner err:", t);
        });
        this._banner.onResize(function (e) {
          var n = t.sdk.getSystemInfoSync();
          t._banner.style.top = n.windowHeight - e.height;
          t._banner.style.left = (n.windowWidth - e.width) / 2;
        });
      }
    }
  };
  t.prototype.hideBanner = function () {
    console.log("## tt hideBanner");
    if (this._banner) {
      this._banner.destroy();
      this._banner = null;
    }
  };
  t.prototype.showInsert = function () {
    var t = this;
    console.log("## tt showInsert");
    if (this.sdk && this.sdk.createInterstitialAd && this._config.insertId) {
      if (this._insert) {
        this._insert.load().then(function () {
          t._insert.show().then(function () {}).catch(function (t) {
            console.log("## tt showInsert1 err:", t);
          });
        });
      } else if (!this._insert) {
        this._insert = this.sdk.createInterstitialAd({
          adUnitId: this._config.insertId
        });
        this._insert.onLoad(function () {
          if (t._insert) {
            t._insert.offLoad();
            t._insert.show().then(function () {}).catch(function (t) {
              console.log("## tt showInsert2 err:", t);
            });
          }
        });
        this._insert.onClose(function () {
          if (t._insert) {
            t._insert.offClose();
            t._insert.destroy();
            t._insert = null;
            window.lastInsertAdTime = new Date().getTime() / 1000;
          }
        });
        this._insert.onError(function (e) {
          console.log("## tt showInsert3", e);
          if (e && e.errCode == 1003 && t._insert) {
            t._insert.destroy();
            t._insert = null;
          }
          window.lastInsertAdTime = new Date().getTime() / 1000;
        });
      }
    }
  };
  t.prototype.destroyInsertAd = function () {
    console.log("## destroyInsertAd");
    if (this._insert) {
      this._insert.destroy();
      this._insert = null;
    }
  };
  t.prototype.shareRecordCap = function (t) {
    var e = this;
    if (this._recorder) {
      if (this._recordPath) {
        return void this.sdk.shareAppMessage({
          channel: "video",
          extra: {
            videoPath: this._recordPath
          },
          success: function () {
            e._recordStatus = 1;
            t(0);
          },
          fail: function (e) {
            console.log("## shareRecordCap e: ", e);
            if (e && -1 != e.errMsg.indexOf("short")) {
              t(-1);
            } else {
              t(1);
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
  t.prototype.startRecordCap = function (t) {
    var e = this;
    if (t === undefined) {
      t = 30;
    }
    if (this.sdk && this.sdk.getGameRecorderManager) {
      if (!this._recorder) {
        this._recorder = this.sdk.getGameRecorderManager();
        this._recorder.onStop(function (t) {
          e._recordPath = t.videoPath;
        });
        this._recorder.onError(function () {
          e._recordStatus = -1;
        });
      }
      this._recordPath = null;
      this._recorder.start({
        duration: t
      });
      this._recordStatus = 1;
    }
  };
  t.prototype.stopRecordCap = function () {
    if (this._recorder && this._recordStatus == 1) {
      this._recorder.stop();
      this._recordStatus = 0;
    }
  };
  t.prototype.getShareStatus = function () {
    return this._recordStatus;
  };
  t.prototype.follow = function (t) {
    if (this.sdk && this.sdk.openAwemeUserProfile) {
      this.sdk.openAwemeUserProfile({
        success: function (e) {
          console.log("## follow  res: ", e);
          t(0);
        },
        fail: function (e) {
          console.log("## follow fail, err: ", e);
          t(-1);
        },
        complete: function () {}
      });
    }
  };
  t.prototype.share = function (t) {
    if (this.sdk) {
      var e = "";
      if (this._config && this._config.shareId) {
        e = this._config.shareId;
      }
      console.log("## shareId: ", e);
      this.sdk.shareAppMessage({
        templateId: e,
        query: "",
        success: function () {
          if (t) {
            t(0);
          }
          console.log("分享成功");
        },
        fail: function () {
          if (t) {
            t(-1);
          }
          console.log("分享失败");
        }
      });
    }
  };
  t.prototype.invite = function (t) {
    if (this.sdk) {
      var e = "";
      if (this._config && this._config.shareId) {
        e = this._config.shareId;
      }
      var n = window.ywkjTT_openidStr || "null";
      this.sdk.shareAppMessage({
        templateId: e,
        query: "share_id=" + e + "&open_id=" + n,
        success: function () {
          if (t) {
            t(0);
          }
          console.log("邀请成功");
        },
        fail: function () {
          if (t) {
            t(-1);
          }
          console.log("邀请失败");
        }
      });
    }
  };
  t.prototype.vibrate = function (t) {
    if (this.sdk) {
      switch (t) {
        case o.MyConstans.vibrateKind.long:
          this.sdk.vibrateLong({
            success: function (t) {
              console.log(t);
            },
            fail: function () {
              console.log("vibrateLong调用失败");
            }
          });
          break;
        case o.MyConstans.vibrateKind.short:
          if (this.sdk.vibrateShort) {
            this.sdk.vibrateShort({
              success: function (t) {
                console.log("" + t);
              },
              fail: function () {
                console.log("vibrateShort调用失败");
              }
            });
          }
      }
    }
  };
  t.prototype.setClipboardData = function (t, e) {
    if (this.sdk && this.sdk.setClipboardData) {
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
    }
  };
  return t;
}();
exports.Platform_ZJTD = r;