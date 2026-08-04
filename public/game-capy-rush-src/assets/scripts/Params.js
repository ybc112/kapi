Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = require("./LocalStorage");
var i = function () {
  function t() {
    this._showParams = {};
    this._gameParams = {
      app_name: "",
      channel: "",
      version: ""
    };
    this._userParams = {
      openid: ""
    };
    this._openidKey = "sdk_openid";
    this._userParams.openid = o.default.getItem(this._openidKey);
  }
  t.prototype.setShowParams = function (t) {
    return this._showParams = t;
  };
  t.prototype.getShowParams = function (t) {
    if (t === undefined) {
      t = "";
    }
    if (t === "") {
      return this._showParams;
    } else if (this._showParams[t] === undefined) {
      return "";
    } else {
      return this._showParams[t];
    }
  };
  t.prototype.setGameParams = function (t) {
    t.channel = "tt_minigame";
    if (window.ks) {
      t.channel = "ks_minigame";
    }
    return this._gameParams = t;
  };
  t.prototype.getGameParams = function (t) {
    if (t === undefined) {
      t = "";
    }
    if (t === "") {
      return this._gameParams;
    } else if (this._gameParams[t] === undefined) {
      return "";
    } else {
      return this._gameParams[t];
    }
  };
  t.prototype.setUserParams = function (t) {
    o.default.setItem(this._openidKey, t.openid === undefined ? "" : t.openid);
    return this._userParams = t;
  };
  t.prototype.getUserParams = function (t) {
    if (t === undefined) {
      t = "";
    }
    if (t === "") {
      return this._userParams;
    } else if (this._userParams[t] === undefined) {
      return "";
    } else {
      return this._userParams[t];
    }
  };
  return t;
}();
exports.default = new i();