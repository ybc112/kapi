Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuadTree = undefined;
var t = [cc.Color.BLACK, cc.Color.RED, cc.Color.BLUE, cc.Color.ORANGE, cc.Color.GREEN];
var i = function () {
  function _(_, o, e, t) {
    this.nodes = null;
    this.children = null;
    this._bounds = null;
    this._depth = 0;
    this._maxChildren = 6;
    this._maxDepth = 6;
    this._bounds = _;
    this.children = [];
    this.nodes = [];
    this._maxChildren = t || 10;
    this._maxDepth = e || 4;
    this._depth = o || 0;
    if (!this._bounds.halfHeight) {
      this._bounds.halfHeight = this._bounds.height / 2;
    }
    if (!this._bounds.halfWidth) {
      this._bounds.halfWidth = this._bounds.width / 2;
    }
  }
  _.prototype.getAllNeedTestColliders = function (_) {
    if (this.children.length) {
      _.push(this.children);
    }
    for (var o = 0, e = this.nodes.length; o < e; o++) {
      this.nodes[o].getAllNeedTestColliders(_);
    }
  };
  _.prototype.render = function (_) {
    for (var o = 0, e = this.nodes.length; o < e; o++) {
      var i = this.nodes[o];
      if (i) {
        i.render(_);
      }
    }
    _.lineWidth = cc.misc.clampf(8 - this._depth, 2, 8);
    _.strokeColor = t[this._depth];
    _.moveTo(this._bounds.x, this._bounds.y);
    _.lineTo(this._bounds.x + this._bounds.width, this._bounds.y);
    _.lineTo(this._bounds.x + this._bounds.width, this._bounds.y + this._bounds.height);
    _.lineTo(this._bounds.x, this._bounds.y + this._bounds.height);
    _.close();
    _.stroke();
  };
  _.prototype.insert = function (_) {
    if (this.nodes.length) {
      for (var o = 0, e = (i = this._findIndexs(_)).length; o < e; o++) {
        this.nodes[i[o]].insert(_);
      }
    } else {
      this.children.push(_);
      var t = this.children.length;
      if (this._depth < this._maxDepth && t > this._maxChildren) {
        if (!this.nodes.length) {
          this.subdivide();
        }
        o = 0;
        for (; o < t; o++) {
          for (var i, d = 0, f = (i = this._findIndexs(this.children[o])).length; d < f; d++) {
            this.nodes[i[d]].insert(this.children[o]);
          }
        }
        this.children.length = 0;
      }
    }
  };
  _.prototype.retrieve = function (_, o) {
    var e = this._findIndexs(_);
    if (this.children.length) {
      o.push.apply(o, this.children);
    }
    if (this.nodes.length) {
      for (var t = 0, i = e.length; t < i; t++) {
        this.nodes[e[t]].retrieve(_, o);
      }
    }
    o = o.filter(function (_, e) {
      return o.indexOf(_) >= e;
    });
  };
  _.prototype._findIndexs = function (_) {
    var o = this._bounds;
    var e = o.x + o.halfWidth;
    var t = o.y + o.halfHeight;
    var i = _.y < t;
    var d = _.x < e;
    var f = _.x + _.width > e;
    var m = _.y + _.height > t;
    var n = [];
    if (m && d) {
      n.push(0);
    }
    if (i && d) {
      n.push(1);
    }
    if (i && f) {
      n.push(2);
    }
    if (m && f) {
      n.push(3);
    }
    return n;
  };
  _.prototype.subdivide = function () {
    var o = this._depth + 1;
    var e = this._bounds.halfWidth;
    var t = this._bounds.halfHeight;
    var i = this._bounds.x;
    var d = this._bounds.y;
    this.nodes[0] = new _({
      x: i,
      y: d + t,
      width: e,
      height: t
    }, o, this._maxDepth, this._maxChildren);
    this.nodes[1] = new _({
      x: i,
      y: d,
      width: e,
      height: t
    }, o, this._maxDepth, this._maxChildren);
    this.nodes[2] = new _({
      x: i + e,
      y: d,
      width: e,
      height: t
    }, o, this._maxDepth, this._maxChildren);
    this.nodes[3] = new _({
      x: i + e,
      y: d + t,
      width: e,
      height: t
    }, o, this._maxDepth, this._maxChildren);
  };
  _.prototype.clear = function () {
    this.children.length = 0;
    for (var _ = 0, o = this.nodes.length; _ < o; _++) {
      this.nodes[_].clear();
    }
    this.nodes.length = 0;
  };
  return _;
}();
exports.QuadTree = i;