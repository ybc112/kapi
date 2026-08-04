Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = require("./musicCofig");
(function () {
  function t() {
    this.keys = [];
    this.values = [];
  }
  t.prototype.add = function (t, e) {
    this.keys.push(t);
    this.values.push(e);
  };
  t.prototype.remove = function (t) {
    var e = this.keys.indexOf(t);
    if (-1 != e) {
      this.keys.splice(e, 1);
      this.values.splice(e, 1);
    }
  };
  t.prototype.tryGetValue = function (t) {
    var e = this.keys.indexOf(t);
    if (-1 != e) {
      return this.values[e];
    } else {
      return null;
    }
  };
  t.prototype.containKey = function (t) {
    for (var e = this.keys, n = 0; n < e.length; n++) {
      if (e[n] == t) {
        return true;
      }
    }
    return false;
  };
  t.prototype.setValue = function (t, e) {
    var n = this.keys.indexOf(t);
    return -1 != n && (this.keys[n] = t, this.values[n] = e, true);
  };
  t.prototype.getKeys = function () {
    return this.keys;
  };
  t.prototype.getValues = function () {
    return this.values;
  };
})();
var i = function () {
  function t() {
    this.mConfig = new o.default();
    this.m_musicVolume = 0.7;
    this.m_curMusicPath = "";
    this.audioDictionary = {};
    this._volume = 1;
  }
  t.prototype.InitAudioClip = function (t, e) {
    var n = this;
    if (e === undefined) {
      e = null;
    }
    var o = this.audioDictionary[t];
    var i = "/audio" + this.mConfig[t];
    if (o) {
      if (e) {
        e(true);
      }
    } else {
      cc.assetManager.loadBundle("local", function (o, a) {
        if (o) {
          cc.error(o);
        } else if (a) {
          a.load(i, cc.AudioClip, function (o, a) {
            if (o) {
              cc.error(o);
            } else {
              n.audioDictionary[t] = {
                path: i,
                asset: a
              };
              if (e) {
                e(true);
              }
            }
          });
        }
      });
    }
  };
  t.prototype.stopAllEffect = function () {
    cc.audioEngine.setEffectsVolume(0);
  };
  t.prototype.stopAllEffect2 = function () {
    cc.audioEngine.stopAllEffects();
  };
  t.prototype.resumeAllEffect = function () {
    cc.audioEngine.setEffectsVolume(1);
  };
  t.prototype.stopEffect = function (t) {
    if (t) {
      cc.audioEngine.setVolume(t, 0);
    }
  };
  t.prototype.PlayBGM = function (e) {
    var n = this;
    this.m_curMusicPath = e;
    if (t.isMusicOn) {
      var o = this.audioDictionary[e];
      if (o) {
        var i = cc.audioEngine.playMusic(o.asset, true);
        cc.audioEngine.setVolume(i, 0.5);
        this.m_musicVolume = 0.5;
      } else {
        this.InitAudioClip(e, function () {
          var t = n.audioDictionary[e];
          var o = cc.audioEngine.playMusic(t.asset, true);
          cc.audioEngine.setVolume(o, 0.7);
          n.m_musicVolume = 0.7;
        });
      }
    }
  };
  t.prototype.pauseBGM = function () {
    if (this.m_curMusicPath != "") {
      cc.audioEngine.setMusicVolume(0);
      cc.audioEngine.stopMusic();
    }
  };
  t.prototype.pauseBGM2 = function () {
    if (this.m_curMusicPath != "") {
      cc.audioEngine.setMusicVolume(0);
    }
  };
  t.prototype.resumeBGM = function () {
    if (this.m_curMusicPath != "") {
      cc.audioEngine.setMusicVolume(this.m_musicVolume);
      if (t.isMusicOn) {
        this.PlayBGM(this.m_curMusicPath);
      }
    }
  };
  t.prototype.resumeBGM2 = function () {
    if (this.m_curMusicPath != "" && t.isMusicOn) {
      cc.audioEngine.setMusicVolume(this.m_musicVolume);
      this.PlayBGM(this.m_curMusicPath);
    }
  };
  t.prototype.PlayEffect = function (e, n, o, i) {
    if (n === undefined) {
      n = false;
    }
    if (o === undefined) {
      o = 1;
    }
    if (i === undefined) {
      i = null;
    }
    if (t.isAudioOn) {
      if (o != 0) {
        o = this._volume;
      }
      var a = "/audio" + this.mConfig[e];
      cc.assetManager.loadBundle("local", function (t, e) {
        if (!t) {
          if (e) {
            e.load(a, cc.AudioClip, function (t, e) {
              if (t) {
                cc.error(t);
              } else {
                var a = cc.audioEngine.play(e, n, o);
                if (i) {
                  i(a);
                }
              }
            });
          }
        }
      });
    }
  };
  t.prototype.platformPlay = function (t, e, n, o) {
    n = this._volume;
    var i = cc.audioEngine.play(t.asset, e, n);
    if (o) {
      o(i);
    }
  };
  t.prototype.clear = function () {
    this.m_curMusicPath = "";
    this.audioDictionary = {};
    this.mConfig = new o.default();
  };
  t.instance = null;
  t.isAudioOn = true;
  t.isMusicOn = true;
  return t;
}();
exports.default = i;
i.instance = new i();
window.AudioManager = i.instance;