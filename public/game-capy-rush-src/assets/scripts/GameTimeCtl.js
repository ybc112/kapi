Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = require("./ManageCtl");
var i = function () {
  function t() {
    this._runTime = 0;
    this._gamePauseFlag = false;
  }
  t.GetInstance = function () {
    if (!t.instance) {
      t.instance = new t();
    }
    return this.instance;
  };
  t.prototype.init = function () {
    var t = this;
    setInterval(function () {
      t.timeCallback();
    }, 1000);
    setInterval(function () {}, 3000);
    setInterval(function () {
      t.gamePauseTimeCallback();
    }, 500);
  };
  t.prototype.timeCallback = function () {
    this._runTime += 1;
  };
  t.prototype.gamePauseTimeCallback = function () {
    var t = window.mainScene;
    var e = t.node.getChildByName("gameView");
    if (e) {
      if (t.node.childrenCount >= window.mainSceneInitChildCount + 2 || e.childrenCount >= window.gameViewInitChildCount) {
        if (e.childrenCount >= window.gameViewInitChildCount + 1) {
          if (!this._gamePauseFlag) {
            o.ManageCtl.gamePause();
          }
          return void (this._gamePauseFlag = true);
        }
        for (var n = 0, i = 0; i < t.node.childrenCount; i++) {
          if (t.node.children[i].name != "debugNode") {
            n += 1;
          }
        }
        if (n >= window.mainSceneInitChildCount + 2) {
          if (!this._gamePauseFlag) {
            o.ManageCtl.gamePause();
          }
          return void (this._gamePauseFlag = true);
        }
      }
      if (this._gamePauseFlag) {
        o.ManageCtl.gameResume();
      }
      this._gamePauseFlag = false;
    }
  };
  t.prototype.getRunTime = function () {
    return this._runTime;
  };
  t.instance = null;
  return t;
}();
exports.default = i;