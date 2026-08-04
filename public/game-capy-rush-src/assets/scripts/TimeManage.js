Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = require("./function");
var i = require("./LocalStorage");
var a = function () {
  function t() {
    this._startClientTime = "sdk_s_c_t";
    this._endClientTime = "sdk_e_c_t";
    this._firstReportServerTime = "sdk_s_b_t";
    this._firstReportClientTime = "sdk_c_b_t";
    this.lockGetFirstServerTime = "sdk_lock_get_fst";
  }
  t.prototype.setStartClientTime = function () {
    i.default.setItem(this._startClientTime, o.getClientTime());
  };
  t.prototype.getStartClientTime = function () {
    var t = i.default.getItem(this._startClientTime);
    if (t > 0) {
      return t;
    } else {
      return 0;
    }
  };
  t.prototype.removeStartClientTime = function () {
    i.default.removeItem(this._startClientTime);
  };
  t.prototype.setEndClientTime = function () {
    i.default.setItem(this._endClientTime, o.getClientTime());
  };
  t.prototype.getEndClientTime = function () {
    var t = i.default.getItem(this._endClientTime);
    if (t > 0) {
      return t;
    } else {
      return 0;
    }
  };
  t.prototype.removeEndClientTime = function () {
    i.default.removeItem(this._endClientTime);
  };
  t.prototype.getOnlineTime = function () {
    var t = this.getStartClientTime();
    var e = this.getEndClientTime();
    if (t > 0 && e > 0) {
      return e - t;
    } else {
      return 0;
    }
  };
  t.prototype.setFirstReportServerTime = function () {
    var t = this;
    if (!i.default.getItem(this.lockGetFirstServerTime)) {
      i.default.setItem(this.lockGetFirstServerTime, o.getClientTime());
      o.getServerTime(function (e) {
        try {
          i.default.setItem(t._firstReportServerTime, e.data.data.time);
          i.default.removeItem(t.lockGetFirstServerTime);
        } catch (n) {}
      });
    }
  };
  t.prototype.getFirstReportServerTime = function () {
    return i.default.getItem(this._firstReportServerTime);
  };
  t.prototype.removeFirstReportServerTime = function () {
    return i.default.removeItem(this._firstReportServerTime);
  };
  t.prototype.setFirstReportClientTime = function () {
    i.default.setItem(this._firstReportClientTime, o.getClientTime());
  };
  t.prototype.getFirstReportClientTime = function () {
    return i.default.getItem(this._firstReportClientTime);
  };
  t.prototype.removeFirstReportClientTime = function () {
    return i.default.removeItem(this._firstReportClientTime);
  };
  return t;
}();
exports.default = new a();