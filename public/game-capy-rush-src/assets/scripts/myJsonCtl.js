Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.myJsonCtl = undefined;
var o = require("./ManageCtl");
var i = require("./MyTool");
var a = function () {
  function t() {
    this.jsonList = {};
  }
  t.prototype.getJson = function (t) {
    var e = this;
    return new Promise(function (n) {
      if (t == "mode1" && o.ManageCtl.gameData.allMode1Info) {
        var i = o.ManageCtl.getModeInfo(t);
        return n(i);
      }
      if (e.jsonList[t]) {
        return n(e.jsonList[t]);
      }
      var a = t;
      cc.assetManager.loadBundle("json", function (o, i) {
        i.load(a, function (o, i) {
          if (o) {
            return n(null);
          } else {
            e.jsonList[t] = i.json;
            return n(e.jsonList[t]);
          }
        });
      });
    });
  };
  t.prototype.getJsonInfoByKey = function (t, e, n) {
    var a = this;
    if (n === undefined) {
      n = false;
    }
    return new Promise(function (r) {
      var s = a.jsonList[t];
      if (t == "mode1") {
        s = o.ManageCtl.getModeInfo(t);
      }
      if (s) {
        if (n) {
          var c = i.MyTool.getJsonLength(s);
          if (!(isNaN(e) || t == "mode1")) {
            if (e > c) {
              if ((e %= c) == 0) {
                e = c;
              }
              console.log("## change key: ", e);
            }
          }
          if (!s[e]) {
            var l = i.MyTool.getJsonLength(s);
            return r(s[e %= l]);
          }
        }
        return r(s[e]);
      }
      var u = t;
      cc.assetManager.loadBundle("json", function (n, o) {
        o.load(u, function (n, o) {
          if (n) {
            return r(null);
          }
          a.jsonList[t] = o.json;
          if (!a.jsonList[t][e]) {
            var s = i.MyTool.getJsonLength(a.jsonList[t]);
            e %= s;
            return r(a.jsonList[t][e]);
          }
          return r(a.jsonList[t][e]);
        });
      });
    });
  };
  t.prototype.getJsonLength = function (t) {
    var e = 0;
    for (var n in t) {
      e++;
    }
    return e;
  };
  return t;
}();
exports.myJsonCtl = new a();