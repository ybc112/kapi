Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Platform_ZFB = undefined;
var o = require("./SdkConfig");
var i = function () {
  function t(t) {
    var e = this;
    this._config = {
      app_name: "",
      version: "",
      appid: "",
      rewardId: "",
      bannerId: "",
      insertId: "",
      blockAdId: ""
    };
    this.sdk = window.my;
    this._rewardAdsCb = null;
    this._rewardAdsList = {};
    this._banner = null;
    this._insert = null;
    this._rewardHasShow = false;
    this._rewardHasLoad = false;
    this._config = t;
    if (this.sdk) {
      var n = this.sdk.getSystemInfoSync();
      console.log("[WxBannerCtrler][constructor]", n);
      this._wxSrnW = n.windowWidth;
      this._wxSrnH = n.windowHeight;
      this._ccCvsW = cc.Canvas.instance.node.width;
      this._ccCvsH = cc.Canvas.instance.node.height;
      this._cc2wxScale = n.windowHeight / this._ccCvsH;
      this._wx2ccScale = this._ccCvsH / n.windowHeight;
      this._minCCWidth = 300 * this._wx2ccScale;
      if (this.sdk.createRewardedAd) {
        var i = this.sdk.env.clientVersion;
        if (this.compareVersion(i, "10.3.66") <= 0) {
          return;
        }
        var a = o.MyConstans.projectConst.ZFB.rewardId;
        console.log("## videoId " + a);
        this._rewardAdsList[a] = this.sdk.createRewardedAd({
          adUnitId: a
        });
        this._rewardAdsList[a].onLoad(function () {
          console.log("激励广告加载成功");
        });
        this._rewardAdsList[a].onError(function (t) {
          console.log(t);
        });
        this._rewardAdsList[a].onClose(function (t) {
          if (t && t.isEnded) {
            e._rewardAdsCb(0);
            e._rewardAdsCb = null;
          } else {
            e._rewardAdsCb(1);
            e._rewardAdsCb = null;
          }
        });
      }
    }
  }
  t.prototype.showRewardAds = function (t) {
    var e = this;
    if (this.sdk) {
      var n = this.sdk.env.clientVersion;
      if (this.compareVersion(n, "10.3.66") <= 0) {
        return t(-3);
      }
      if (!this.sdk.createRewardedAd) {
        console.log("## [platform] [zfbPlatform] !this.sdk.createRewardedAd");
        return t(-3);
      }
      if (!this._config.rewardId) {
        console.log("## [platform] [zfbPlatform] !this._config.rewardId");
        return t(-3);
      }
      this._rewardAdsCb = t;
      this._rewardHasShow = false;
      var i = o.MyConstans.projectConst.ZFB.rewardId;
      console.log("## [platform] [zfbPlatform] show");
      this._rewardAdsList[i].show().catch(function () {
        console.log("## [platform] [zfbPlatform] load");
        e._rewardAdsList[i].load().then(function () {
          return e._rewardAdsList[i].show();
        });
      });
    }
  };
  t.prototype.showBanner = function (t) {
    var e = this;
    if (t === undefined) {
      t = {
        id: "",
        left: null,
        top: null
      };
    }
    if (this.sdk) {
      var n = this.sdk.getSystemInfoSync();
      var o = n.windowWidth;
      var i = n.windowHeight;
      console.log("## screenWidth: ", o);
      console.log("## screenHeight: ", i);
      var a = {
        width: 300,
        top: i - 75,
        left: 0.5 * (o - 300)
      };
      if (this.sdk.createBannerAd) {
        var r = this._config.bannerId;
        if (r) {
          if (this._banner) {
            if (this._banner) {
              console.log("## [platform] [zfbPlatform] showBanner show2");
              this._banner.show().then(function () {}).catch(function () {});
            }
          } else {
            this._banner = this.sdk.createBannerAd({
              adUnitId: r,
              style: a
            });
            console.log("## [platform] [zfbPlatform] style2: ", a);
            this._banner.onLoad(function () {
              console.log("## [platform] [zfbPlatform] showBanner onLoad");
              if (e._banner) {
                e._banner.show().then(function () {}).catch(function () {});
              }
            });
            this._banner.onError(function (t) {
              console.log("## [platform] [zfbPlatform] showBanner err:", t);
            });
          }
        }
      }
    }
  };
  t.prototype.showBannerByNode = function (t) {
    var e = this;
    if (this.sdk) {
      if (t.width < this._minCCWidth) {
        t.width = this._minCCWidth;
      }
      if (t.width > this._ccCvsW) {
        t.width = this._ccCvsW;
      }
      var n = t.convertToWorldSpaceAR(cc.Vec2.ZERO);
      console.log("根据节点创建的广告条的node", n);
      var o = {
        left: (n.x - t.width * t.anchorX) * this._cc2wxScale,
        top: (this._ccCvsH - n.y - t.height * (1 - t.anchorY)) * this._cc2wxScale,
        width: t.width * this._cc2wxScale
      };
      if (this.sdk.createBannerAd && this._config.bannerId) {
        if (this._banner) {
          if (this._banner) {
            console.log("## [platform] [zfbPlatform] showBanner show2");
            this._banner.show().then(function () {}).catch(function () {});
          }
        } else {
          this._banner = this.sdk.createBannerAd({
            adUnitId: this._config.bannerId,
            style: o
          });
          console.log("## [platform] [zfbPlatform] adUnitId: ", this._config.bannerId);
          this._banner.onLoad(function () {
            console.log("## [platform] [zfbPlatform] showBanner onLoad");
            if (e._banner) {
              e._banner.show().then(function () {}).catch(function () {});
            }
          });
          this._banner.onError(function (t) {
            console.log("## [platform] [zfbPlatform] showBanner err:", t);
          });
        }
      }
    }
  };
  t.prototype.hideBanner = function (t) {
    if (this._banner && this._config.bannerId) {
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
      if (this._insert && this._insert.load) {
        this._insert.load().then(function () {
          console.log("## [platform] [zfbPlatform] 1 load");
          t._insert.show().then(function () {}).catch(function (t) {
            console.log("## [platform] [zfbPlatform] showInsert", t);
          });
        });
      } else if (!this._insert || this._insert && !this._insert.load) {
        this._insert = this.sdk.createInterstitialAd({
          adUnitId: this._config.insertId
        });
        this._insert.onLoad(function () {
          console.log("## [platform] [zfbPlatform] 2 load");
          if (t._insert) {
            t._insert.show().then(function () {}).catch(function (t) {
              console.log("## [platform] [zfbPlatform] showInsert", t);
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
          console.log("## [platform] [zfbPlatform] showInsert", e);
          if (e && e.errCode == 1003 && t._insert) {
            t._insert.destroy();
            t._insert = null;
          }
        });
      }
    }
  };
  t.prototype.compareVersion = function (t, e) {
    t = t.split(".");
    e = e.split(".");
    for (var n = Math.max(t.length, e.length); t.length < n;) {
      t.push("0");
    }
    for (; e.length < n;) {
      e.push("0");
    }
    for (var o = 0; o < n; o++) {
      var i = parseInt(t[o]);
      var a = parseInt(e[o]);
      if (i > a) {
        return 1;
      }
      if (i < a) {
        return -1;
      }
    }
    return 0;
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
  t.prototype.request = function (t, e, n, o) {
    var i = this;
    return new Promise(function (a, r) {
      console.log("## request  url : ", t);
      console.log("## request  data : ", n);
      i.sdk.request({
        url: t,
        method: e,
        data: n,
        header: o,
        success: function (t) {
          a(t);
        },
        fail: function (t) {
          r(t);
        }
      });
    });
  };
  return t;
}();
exports.Platform_ZFB = i;