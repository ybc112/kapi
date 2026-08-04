Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = require("./ManageCtl");
var i = require("./MyPlatform");
var a = require("./SdkConfig");
var r = function () {
  function t() {
    this.API_InviteHit = "common/share/hit";
    this.API_getInviteList = "common/share/info";
  }
  t.GetInstance = function () {
    if (!t.instance) {
      t.instance = new t();
    }
    return this.instance;
  };
  t.prototype.getInviteList = function (t) {
    var e = i.default.BMS_APP_NAME;
    var n = window.ywkjTT_openidStr || "null";
    if (n != "null") {
      var r = "";
      if (o.ManageCtl.isZJTD()) {
        r = a.MyConstans.projectConst.ZJTD.shareId;
      }
      this.httpRequest("https://game.zuiqiangyingyu.net/" + this.API_getInviteList, {
        app_name: e,
        open_id: n,
        share_id: r
      }, function (e) {
        console.log("## getInviteList: ", JSON.stringify(e));
        if (e.data && e.data.data && e.data.data.list) {
          console.log("## getInviteList list: ", JSON.stringify(e.data.data.list));
          if (t) {
            t(e.data.data.list);
          }
        }
      }, false, "POST");
    }
  };
  t.prototype.hitInvite = function (t) {
    var e = i.default.BMS_APP_NAME;
    var n = window.ywkjTT_openidStr || "null";
    var o = window.m_share_id;
    var a = window.m_open_id;
    if (n != a && n != "null") {
      this.httpRequest("https://game.zuiqiangyingyu.net/" + this.API_InviteHit, {
        app_name: e,
        open_id: a,
        share_id: o,
        hit_open_id: n,
        expire_time: 2592000
      }, function (e) {
        console.log("## hitInvite: ", JSON.stringify(e));
        if (e.data && e.data.data && e.data.data.share_times) {
          console.log("## hitInvite share_times: ", JSON.stringify(e.data.data.share_times));
          if (t) {
            t(e.data.data.share_times);
          }
        }
      }, false, "POST");
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
    if (i == "POST") {
      this.Post(t, e, n);
    } else {
      this.Get(t, e, n);
    }
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
  t.prototype.Post = function (t, e, n) {
    console.log("Post", t, JSON.stringify(e));
    var o = new XMLHttpRequest();
    o.onreadystatechange = function () {
      if (o.readyState == 4) {
        if (o.status >= 200 && o.status < 400) {
          var t = o.responseText;
          if (t) {
            console.log("## response", t);
            var e = {
              data: JSON.parse(t)
            };
            console.log("## dataJson", e);
            n(e);
          } else {
            n(false);
          }
        } else {
          n(false);
        }
      }
    };
    o.open("POST", t, true);
    o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    o.send(this.formatPostData(e));
  };
  t.prototype.formatPostData = function (t) {
    var e = [];
    for (var n in t) {
      e.push(n);
    }
    e = e.sort();
    var o = "";
    e.forEach(function (n, i) {
      o += n + "=" + t[n] + (i == e.length - 1 ? "" : "&");
    });
    return o;
  };
  t.instance = null;
  return t;
}();
exports.default = r;