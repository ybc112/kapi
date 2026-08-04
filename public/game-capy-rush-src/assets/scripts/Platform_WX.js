Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Platform_WX = undefined;
var o = require("./SdkConfig");
var i = require("./BmsCtl");
var a = require("./MyMsgCtl");
var r = require("./gameData");
var s = require("./MyPlatform");
var c = function () {
  function t(t) {
    var e = this;
    this._config = {
      app_name: "",
      version: "",
      appid: "",
      rewardId: "",
      bannerId: "",
      insertId: "",
      blockAdId: "",
      shushuId: ""
    };
    this.sdk = window.wx;
    this._rewardAds = null;
    this._rewardAdsCb = null;
    this._rewardHasShow = false;
    this._rewardHasLoad = false;
    this._banner = null;
    this._insert = null;
    this._block = null;
    this._isMute = false;
    this._customAdList = {};
    this._beginShareFlag = false;
    this._beginShareDate = null;
    this._shareCallback = null;
    this._btnLogin = null;
    this._inScene = -1;
    this.ta = null;
    this._config = t;
    if (this.sdk) {
      if (o.MyConstans.getCustomPlatform() == o.MyConstans.PLATFORM.WX) {
        var n = this.sdk.getExptInfoSync(["expt_1746523179"]);
        console.log("## abtest: ", n);
        if (n.expt_1746523179 === undefined) {
          r.default.GetInstance().expt_1746523179 = "0";
        } else if (n.expt_1746523179 === "1") {
          r.default.GetInstance().expt_1746523179 = "1";
        } else if (n.expt_1746523179 === "2") {
          r.default.GetInstance().expt_1746523179 = "2";
        } else {
          r.default.GetInstance().expt_1746523179 = "0";
        }
      }
      this.sdk.showShareMenu({
        withShareTicket: true
      });
      this.sdk.onShareTimeline(function () {
        return e.getShareData();
      });
      this.sdk.onShareAppMessage(function () {
        return e.getShareData();
      });
      var i = this.sdk.getLaunchOptionsSync();
      console.log("## options: ", JSON.stringify(i));
      if (i.scene == "1104") {
        if (!cc.sys.localStorage.getItem("kpbl_canGetWxGetFavorite")) {
          cc.sys.localStorage.setItem("kpbl_canGetWxGetFavorite", 1);
        }
        cc.game.emit("updateWxFavorite");
      }
      var a = cc.sys.localStorage.getItem("hardchallenge_guid");
      if (!a) {
        a = this.guid();
        cc.sys.localStorage.setItem("hardchallenge_guid", a);
      }
      console.log("## mid: ", a);
      this.taInit(a);
      this.sdk.onShow(function (t) {
        console.log("## options2: ", JSON.stringify(t));
        if (t.scene == "1104") {
          if (!cc.sys.localStorage.getItem("kpbl_canGetWxGetFavorite")) {
            cc.sys.localStorage.setItem("kpbl_canGetWxGetFavorite", 1);
          }
          cc.game.emit("updateWxFavorite");
        }
        console.log("## wx onShow");
        if (e._beginShareFlag) {
          var n = new Date().getTime() / 1000;
          if (e._beginShareDate && e._shareCallback) {
            console.log("## wx time: " + (n - e._beginShareDate));
            if (n - e._beginShareDate >= 2) {
              e._shareCallback(0);
            } else {
              e._shareCallback(-1);
            }
          }
        }
        e._beginShareFlag = false;
        e._beginShareDate = null;
        e._shareCallback = null;
      });
      this.sdk.onHide(function () {});
    }
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
  t.prototype.sendEventShuShu = function (t, e) {
    if (this.ta) {
      this.setSuperProperties();
      console.log("## 微信 发送数数埋点");
      this.ta.track(t, e);
    }
  };
  t.prototype.setSuperProperties = function () {
    if (this.ta) {
      var t = 0;
      if (r.default.GetInstance().expt_1746523179) {
        t = Number(r.default.GetInstance().expt_1746523179);
      }
      this.ta.setSuperProperties({
        time: Math.floor(new Date().getTime() / 1000),
        platform: cc.sys.os,
        version: s.default.BMS_VERSION,
        testgroup: t
      });
    }
  };
  t.prototype.getInstance = function () {
    return this.sdk;
  };
  t.prototype.showRewardAds = function (t) {
    var e = this;
    if (this.sdk) {
      if (this.sdk.createRewardedVideoAd) {
        if (this._config.rewardId) {
          return void (this._rewardAdsCb ? window.level_gamePause = false : (this._rewardAdsCb = t, this._rewardHasShow = false, this._rewardAds || (this._rewardAds = this.sdk.createRewardedVideoAd({
            adUnitId: this._config.rewardId
          }), this._rewardAds.onLoad(function () {
            e._rewardHasLoad = true;
            if (!e._rewardHasShow) {
              e._rewardHasShow = true;
              e._rewardAds.show();
            }
          }), this._rewardAds.onClose(function (t) {
            e._rewardHasLoad = false;
            window.level_gamePause = false;
            e._rewardAdsCb(t.isEnded ? 0 : 1);
            e._rewardAdsCb = null;
          }), this._rewardAds.onError(function (t) {
            e._rewardHasLoad = false;
            console.log("[platform] [WeChatPlatform] showRewardAds", t);
            window.level_gamePause = false;
            e._rewardAdsCb(-1);
            e._rewardAdsCb = null;
          })), this._rewardHasLoad && !this._rewardHasShow ? (this._rewardHasShow = true, this._rewardAds.show()) : this._rewardAds.load()));
        } else {
          window.level_gamePause = false;
          return t(-3);
        }
      } else {
        window.level_gamePause = false;
        return t(-2);
      }
    }
  };
  t.prototype.preloadBanner = function (t) {
    var e = this;
    if (t === undefined) {
      t = {
        id: ""
      };
    }
    if (this.sdk && this.sdk.createBannerAd && this._config.bannerId) {
      if (!this._banner) {
        this._banner = this.sdk.createBannerAd({
          adUnitId: t.id || this._config.bannerId,
          style: {
            left: 9999,
            top: 9999
          },
          adIntervals: 30
        });
        this._banner.onLoad(function () {});
        this._banner.onError(function (t) {
          console.log("[platform] [WeChatPlatform] preloadBanner", t);
        });
        this._banner.onResize(function (t) {
          var n = e.sdk.getSystemInfoSync();
          if (e._banner) {
            e._banner.style.top = n.windowHeight - t.height;
          }
          if (e._banner) {
            e._banner.style.left = (n.windowWidth - t.width) / 2;
          }
        });
      }
    }
  };
  t.prototype.showBanner = function (t, e) {
    var n = this;
    if (t === undefined) {
      t = {
        id: "",
        left: null,
        top: null
      };
    }
    if (this.sdk && this.sdk.createBannerAd && this._config.bannerId) {
      if (this._banner) {
        if (this._banner) {
          this._banner.show().then(function () {
            if (e) {
              e(0);
            }
          }).catch(function () {
            if (e) {
              e(1);
            }
          });
          if (t.top) {
            this._banner.style.top = t.top;
          }
          if (t.left) {
            this._banner.style.left = t.left;
          }
        }
      } else {
        this._banner = this.sdk.createBannerAd({
          adUnitId: t.id || this._config.bannerId,
          style: {
            left: 9999,
            top: 9999
          },
          adIntervals: 30
        });
        this._banner.onLoad(function () {
          if (n._banner) {
            n._banner.show().then(function () {
              if (e) {
                e(0);
              }
            }).catch(function () {
              if (e) {
                e(1);
              }
            });
          } else if (e) {
            e(0);
          }
        });
        this._banner.onError(function (t) {
          console.log("[platform] [WeChatPlatform] showBanner", t);
          if (e) {
            e(1);
          }
        });
        this._banner.onResize(function (e) {
          var o = n.sdk.getSystemInfoSync();
          var i = o.windowHeight - e.height;
          var a = (o.windowWidth - e.width) / 2;
          if (t.top) {
            i = t.top;
          }
          if (t.left) {
            a = t.left;
          }
          n._banner.style.top = i;
          n._banner.style.left = a;
        });
      }
    }
  };
  t.prototype.hideBanner = function (t) {
    if (this._banner && this._config.bannerId) {
      console.log("hideBanner() keepAlive:", t);
      if (t) {
        this._banner.hide();
      } else {
        this._banner.destroy();
        this._banner = null;
      }
    }
  };
  t.prototype.showInsert = function () {
    var t = this;
    if (this.sdk && this.sdk.createInterstitialAd && this._config.insertId) {
      if (this._insert) {
        this._insert.load().then(function () {
          t._insert.show().then(function () {}).catch(function (t) {
            console.log("[platform] [WeChatPlatform] showInsert", t);
          });
        });
      } else if (!this._insert) {
        this._insert = this.sdk.createInterstitialAd({
          adUnitId: this._config.insertId
        });
        this._insert.onLoad(function () {
          if (t._insert) {
            t._insert.show().then(function () {}).catch(function (t) {
              console.log("[platform] [WeChatPlatform] showInsert", t);
            });
          }
        });
        this._insert.onClose(function () {
          if (t._insert) {
            t._insert.destroy();
            t._insert = null;
          }
        });
        this._insert.onError(function (e) {
          console.log("[platform] [WeChatPlatform] showInsert", e);
          if (e && e.errCode == 1003 && t._insert) {
            t._insert.destroy();
            t._insert = null;
          }
        });
      }
    }
  };
  t.prototype.hideCustomAd = function (t) {
    console.log("## hideCustomAd: ", t);
    var e = this._customAdList[t];
    if (e) {
      e.destroy();
      this._customAdList[t] = null;
    }
  };
  t.prototype.share = function (t) {
    this._beginShareFlag = true;
    this._beginShareDate = new Date().getTime() / 1000;
    this._shareCallback = null;
    if (t) {
      this._shareCallback = t;
    }
    this.sdk.shareAppMessage(this.getShareData());
  };
  t.prototype.getShareData = function () {
    var t = i.default.GetInstance().getShareList();
    var e = {};
    if (t.length > 0) {
      var n = t[Math.floor(Math.random() * t.length)];
      e.title = n.title;
      e.imageUrl = n.image;
    }
    return e;
  };
  t.prototype.vibrate = function (t) {
    if (this.sdk) {
      switch (t) {
        case o.MyConstans.vibrateKind.long:
          if (this.sdk.vibrateLong) {
            this.sdk.vibrateLong({
              uccess: function () {},
              fail: function () {}
            });
          }
          break;
        case o.MyConstans.vibrateKind.short:
          if (this.sdk.vibrateShort) {
            this.sdk.vibrateShort({
              type: "medium",
              success: function () {},
              fail: function () {},
              complete: function () {}
            });
          }
      }
    }
  };
  t.prototype.login = function (t, e) {
    if (this.sdk) {
      var n = this.sdk.getSystemInfoSync();
      var i = cc.Canvas.instance.node.height;
      var s = n.screenHeight / i;
      var c = t.convertToWorldSpaceAR(cc.Vec2.ZERO);
      var l = (c.x - t.width * t.anchorX) * s;
      var u = (i - c.y - t.height * (1 - t.anchorY)) * s;
      var d = this;
      this.sdk.getSetting({
        success: function (n) {
          if (n.authSetting["scope.userInfo"]) {
            console.log("## 昵称 已经授权");
            d.sdk.getUserInfo({
              success: function (t) {
                console.log(t.userInfo);
                r.default.GetInstance().setWxUserInfo(t.userInfo.nickName, t.userInfo.avatarUrl);
                e(true);
              }
            });
          } else {
            console.log("## 昵称 未授权");
            e(false);
            d._btnLogin = d.sdk.createUserInfoButton({
              type: "image",
              text: "获取用户信息",
              image: "touming.png",
              style: {
                left: l,
                top: u,
                width: t.width * s,
                height: t.height * s,
                lineHeight: t.height
              }
            });
            d._btnLogin.onTap(function (t) {
              console.log(t);
              if (t && t.userInfo) {
                console.log("## 昵称 点击按钮同意授权");
                r.default.GetInstance().setWxUserInfo(t.userInfo.nickName, t.userInfo.avatarUrl);
                e(true);
                a.default.GetInstance().emit(o.MyConstans.msg.showPopup_rankView);
                d.hideLogoinBtn();
              } else {
                d.hideLogoinBtn();
                a.default.GetInstance().emit(o.MyConstans.msg.reShowRankBtn);
              }
            });
          }
        }
      });
    }
  };
  t.prototype.hideLogoinBtn = function () {
    if (this._btnLogin) {
      this._btnLogin.destroy();
      this._btnLogin = null;
    }
  };
  t.prototype.showFriendRank = function () {
    if (this.sdk) {
      var t = r.default.GetInstance().getWxUserInfo();
      var e = r.default.GetInstance().getPassLvByMode(1);
      t.passLv = e;
      this.sdk.getOpenDataContext().postMessage({
        cmd: "showFriendRank",
        data: JSON.stringify(t)
      });
    }
  };
  t.prototype.hideFriendRank = function () {
    if (this.sdk) {
      this.sdk.getOpenDataContext().postMessage({
        cmd: "hideFriendRank",
        data: null
      });
    }
  };
  t.prototype.setUserCloudStorage = function (t) {
    var e = this;
    if (this.sdk) {
      return new Promise(function (n, o) {
        var i = {
          wxgame: {
            score: t,
            update_time: 1513080573
          },
          cost_ms: 36500
        };
        var a = [{
          key: "score",
          value: JSON.stringify(i)
        }];
        e.sdk.setUserCloudStorage({
          KVDataList: a,
          success: function () {
            console.log("## [WxPlatform] 保存用户数据成功:", a);
            n(true);
          },
          fail: function () {
            console.log("## [WxPlatform] 保存用户数据失败:", a);
            o(false);
          }
        });
      });
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
exports.Platform_WX = c;