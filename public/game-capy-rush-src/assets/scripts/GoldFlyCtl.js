Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = require("./ManageCtl");
var i = require("./MyTool");
var a = function () {
  function t() {
    this.goldItemNode = null;
    this.goldPool = null;
  }
  t.GetInstance = function () {
    if (!t.instance) {
      t.instance = new t();
    }
    return this.instance;
  };
  t.prototype.init = function (t) {
    this.goldItemNode = t;
    this.goldPool = new cc.NodePool();
    for (var e = 0; e < 20; e++) {
      var n = cc.instantiate(this.goldItemNode);
      this.goldPool.put(n);
    }
  };
  t.prototype.showFlyGold = function (t, e) {
    if (e > 20) {
      e = 20;
    }
    for (var n = 0; n < e; n++) {
      this.showFlyNode(t, n);
    }
  };
  t.prototype.showFlyGoldFromNode = function (t, e, n) {
    if (n > 20) {
      n = 20;
    }
    for (var o = 0; o < n; o++) {
      this.showFlyNode(e, o, t);
    }
  };
  t.prototype.showFlyNode = function (t, e, n) {
    var a = this;
    if (n === undefined) {
      n = null;
    }
    var r = this.getGoldNode();
    o.ManageCtl.persistRootNode.node.addChild(r, 9999);
    r.active = true;
    var s = i.MyTool.myRandom(100, 300);
    var c = i.MyTool.myRandom(-150, 150);
    r.position = cc.v3(c, s);
    if (n) {
      r.position = r.parent.convertToNodeSpaceAR(n);
    }
    var l = r.parent.convertToNodeSpaceAR(t);
    var u = r.position.add(cc.v3(i.MyTool.myRandom(-300, 300), i.MyTool.myRandom(-300, 300)));
    r.scale = 0;
    var d = cc.tween().to(0.1 + 0.01 * e, {
      scale: 1
    }, {
      easing: cc.easing.expoIn
    });
    var h = cc.tween().by(0.05 + 0.01 * e, {
      x: 0,
      y: 25
    }, {
      easing: cc.easing.expoIn
    });
    cc.tween(r).sequence(d, h).delay(0.2 + 0.01 * e).then(cc.bezierTo(0.3, [r.position, u, l])).call(function () {
      a.hideGoldNode(r);
    }).start();
  };
  t.prototype.getGoldNode = function () {
    if (this.goldPool.size() > 0) {
      return this.goldPool.get();
    } else {
      return cc.instantiate(this.goldItemNode);
    }
  };
  t.prototype.hideGoldNode = function (t) {
    if (this.goldPool && this.goldPool.size() < 20) {
      this.goldPool.put(t);
    } else {
      t.destroy();
    }
  };
  t.instance = null;
  return t;
}();
exports.default = a;