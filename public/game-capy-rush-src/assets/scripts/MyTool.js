Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyTool = undefined;
(function (t) {
  t.screenAdaptation = function () {
    if (cc.view.getFrameSize().height / cc.view.getFrameSize().width > 1.6) {
      cc.Canvas.instance.fitWidth = true;
      cc.Canvas.instance.fitHeight = false;
    } else {
      cc.Canvas.instance.fitHeight = true;
      cc.Canvas.instance.fitWidth = false;
    }
  };
  t.myRandom = function (t, e) {
    return Math.floor(Math.random() * (e - t + 1)) + t;
  };
  t.isIphoneX = function () {
    return cc.winSize.height / cc.winSize.width - 16 / 9 > 0.1;
  };
  t.isIpad = function () {
    return cc.winSize.width / cc.winSize.height <= 1.34;
  };
  t.getRandomStr2 = function (t) {
    for (var e = "", n = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "m", "n", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], o = 0; o < t; o++) {
      e += n[Math.round(Math.random() * (n.length - 1))];
    }
    return e;
  };
  t.getJsonLength = function (t) {
    var e = 0;
    for (var n in t) {
      e++;
    }
    return e;
  };
  t.getJsonNotNullLength = function (t) {
    if (!t) {
      return 0;
    }
    var e = 0;
    for (var n in t) {
      if (t[n]) {
        e++;
      }
    }
    return e;
  };
  t.arrSort = function (t) {
    for (var e = t.length - 1; e >= 0; e--) {
      var n = Math.floor(Math.random() * (e + 1));
      var o = t[n];
      t[n] = t[e];
      t[e] = o;
    }
    return t;
  };
  t.isNative = function () {
    return false;
  };
  t.saveScreenCapture = function (t) {
    var e;
    if (t === undefined) {
      t = null;
    }
    e = cc.director.getScene().getComponentInChildren(cc.Camera);
    var n = new cc.RenderTexture();
    n.initWithSize(cc.winSize.width, cc.winSize.height, cc.game._renderContext.STENCIL_INDEX8);
    var o = new cc.SpriteFrame();
    if (t == null) {
      o.setTexture(n);
    } else {
      var i = cc.winSize.width / 2 + t.x - t.width / 2;
      var a = cc.winSize.height / 2 + t.y - t.height / 2;
      var r = t.width;
      var s = t.height;
      o.setTexture(n, new cc.Rect(i, a, r, s));
    }
    var c = new cc.Node();
    var l = c.addComponent(cc.Sprite);
    l.spriteFrame = o;
    l.node.scaleY = -Math.abs(l.node.scaleY);
    e.targetTexture = n;
    e.render();
    e.targetTexture = null;
    return c;
  };
  t.shuffle = function (t) {
    for (var e = t.length; e;) {
      var n = Math.floor(Math.random() * e--);
      var o = t[e];
      t[e] = t[n];
      t[n] = o;
    }
    return t;
  };
  t.loadImg = function (t, e) {
    if (!(e && e.node.waitmReloImgFalg)) {
      if (e && e.node) {
        e.node.waitmReloImgFalg = true;
      }
      cc.assetManager.loadBundle("local", function (n, o) {
        o.load(t, function (t, n) {
          if (t) {
            console.error("## loadImg err： ", t);
          } else if (e && cc.isValid(e)) {
            if (e) {
              e.spriteFrame = new cc.SpriteFrame(n);
            }
            if (e && e.node) {
              e.node.waitmReloImgFalg = false;
            }
          }
        });
      });
    }
  };
  t.loadImgByName = function (t, e, n, o, i) {
    if (o === undefined) {
      o = "local";
    }
    if (i === undefined) {
      i = null;
    }
    if (!(n && n.node.waitmReloImgFalg)) {
      if (n && n.node) {
        n.node.waitmReloImgFalg = true;
      }
      t += e;
      cc.assetManager.loadBundle(o, function (o, a) {
        a.load(t, function (t, o) {
          if (t) {
            console.error("## loadImg err： ", t);
          } else if (n && cc.isValid(n)) {
            if (e != n.node.mLoadName) {
              console.log("## name !=mLoadName  ", e);
              return void (n && n.node && (n.node.waitmReloImgFalg = false));
            }
            if (n) {
              n.spriteFrame = new cc.SpriteFrame(o);
            }
            if (n && n.node) {
              n.node.waitmReloImgFalg = false;
            }
            if (i) {
              i(n.node);
            }
          }
        });
      });
    }
  };
  t.setUrlSprite = function (t, e) {
    if (e == null || e.length == 0) {
      t.spriteFrame = null;
    } else {
      if (!t || !cc.isValid(t)) {
        return;
      }
      cc.assetManager.loadRemote(e, {
        ext: ".png"
      }, function (e, n) {
        t.spriteFrame = new cc.SpriteFrame(n);
      });
    }
  };
  t.changeSecondToClock = function (t, e) {
    if (e === undefined) {
      e = false;
    }
    var n = parseInt((t / 3600).toString());
    var o = parseInt((t % 3600 / 60).toString());
    var i = parseInt((t % 60).toString());
    var a = "";
    if (n == 0) {
      if (e) {
        a += "00:";
      }
    } else if (n > 0 && n < 10) {
      a += "0" + n;
      a += ":";
    } else {
      a += n;
      a += ":";
    }
    a += o == 0 ? "00" : o > 0 && o < 10 ? "0" + o : o;
    return (a += ":") + (i == 0 ? "00" : i > 0 && i < 10 ? "0" + i : i);
  };
  t.getTime = function () {
    return Math.round(new Date().getTime() / 1000);
  };
  t.getDate = function () {
    return new Date().getDate();
  };
  t.copyArray = function (t) {
    for (var e = [], n = 0; n < t.length; n++) {
      e.push(t[n]);
    }
    return e;
  };
  t.copy2DArray = function (t) {
    for (var e = [], n = 0; n < t.length; n++) {
      e.push(t[n].concat());
    }
    return e;
  };
  t.numToChinese = function (t) {
    var e = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    return String(t).replace(/[0-9]/g, function (t) {
      return e[Number(t)];
    });
  };
  t.loadSkeleton = function (t, e, n) {
    var o = this;
    cc.assetManager.loadBundle("local", function (i, a) {
      if (!i) {
        if (a) {
          a.load(t, sp.SkeletonData, function (o, i) {
            if (!o && e && cc.isValid(e) && e.mLoadName == t) {
              var a = e.getComponent(sp.Skeleton);
              a.skeletonData = i;
              a.setSkin("default");
              a.setAnimation(0, n, true);
            }
          }.bind(o));
        }
      }
    });
  };
  t.getStringAfterChar = function (t, e) {
    var n = t.indexOf(e);
    if (-1 !== n) {
      return t.substring(n + e.length);
    } else {
      return "";
    }
  };
  t.isWxComputer = function () {
    if (window.wx) {
      var t = window.wx.getSystemInfoSync();
      if (t.platform == "windows" || t.platform == "mac") {
        return true;
      }
    }
    return false;
  };
  t.removeMask = function (t) {
    if (t && t.getComponent(cc.Mask)) {
      t.getComponent(cc.Mask).enabled = false;
    }
  };
  t.setSprite = function (t, e) {
    if (e == null || e.length == 0) {
      t.spriteFrame = null;
    } else {
      cc.assetManager.loadRemote(e, {
        ext: ".png"
      }, function (e, n) {
        t.spriteFrame = new cc.SpriteFrame(n);
      });
    }
  };
  t.base64Encode = function (t) {
    return encodeURIComponent(t);
  };
  t.base64Decode = function (t) {
    return decodeURIComponent(t);
  };
})(exports.MyTool || (exports.MyTool = {}));