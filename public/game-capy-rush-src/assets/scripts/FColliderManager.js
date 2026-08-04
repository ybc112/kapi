Object.defineProperty(exports, "__esModule", {
  value: true
});
var t;
var i = require("./FCollider");
var d = require("./Intersection");
var f = require("./QuadTree");
var m = cc.v2();
var n = cc.mat4();
var r = [];
var a = 0;
function s(_, o, e, t, i, d) {
  var f = _.x;
  var m = _.y;
  var n = _.width;
  var r = _.height;
  var a = o.m;
  var s = a[0];
  var c = a[1];
  var l = a[4];
  var u = a[5];
  var h = s * f + l * m + a[12];
  var p = c * f + u * m + a[13];
  var y = s * n;
  var v = c * n;
  var g = l * r;
  var x = u * r;
  t.x = h;
  t.y = p;
  i.x = y + h;
  i.y = v + p;
  e.x = g + h;
  e.y = x + p;
  d.x = y + g + h;
  d.y = v + x + p;
}
(function (_) {
  _.onEnter = "onCollisionEnter";
  _.onStay = "onCollisionStay";
  _.onExit = "onCollisionExit";
})(t || (t = {}));
var c = function () {
  function _() {
    this._tree = null;
    this._treeDirty = true;
    this._maxDepth = 4;
    this._maxChildren = 10;
    this._treeRect = cc.rect(0, 0, cc.winSize.width, cc.winSize.height);
    this._enable = false;
    this._colliders = [];
    this._enableDebugDraw = false;
    this._enableQuadTreeDraw = false;
    this._debugDrawer = null;
    this._tree = new f.QuadTree(this._treeRect, 0, this._maxDepth, this._maxChildren);
  }
  Object.defineProperty(_, "instance", {
    get: function () {
      if (!this._instance) {
        this._instance = new _();
      }
      return this._instance;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_.prototype, "maxDepth", {
    get: function () {
      return this._maxDepth;
    },
    set: function (_) {
      if (_ != this._maxDepth) {
        this._maxDepth = _;
        this._treeDirty = true;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_.prototype, "maxChildren", {
    get: function () {
      return this._maxChildren;
    },
    set: function (_) {
      if (this._maxChildren != _) {
        this._maxChildren = _;
        this._treeDirty = true;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_.prototype, "treeRect", {
    get: function () {
      return this._treeRect;
    },
    set: function (_) {
      if (!(this._treeRect && this._treeRect.equals(_))) {
        this._treeRect.set(_);
        this._treeDirty = false;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_.prototype, "enable", {
    get: function () {
      return this._enable;
    },
    set: function (_) {
      this._enable = _;
      if (_) {
        cc.director.getScheduler().enableForTarget(this);
        cc.director.getScheduler().scheduleUpdate(this, cc.Scheduler.PRIORITY_NON_SYSTEM, false);
      }
    },
    enumerable: false,
    configurable: true
  });
  _.prototype.addCollider = function (_) {
    var o = this._colliders;
    this.initCollider(_);
    o.push(_);
  };
  _.prototype.removeCollider = function (_) {
    for (var o = this, e = this._colliders.length - 1; e >= 0; e--) {
      var t = this._colliders[e];
      if (_.colliderId === t.colliderId) {
        this._colliders.splice(e, 1);
        var i = _.contactMap;
        if (i) {
          i.forEach(function (e) {
            o.updateCollideExit(_, e.other);
          });
        }
        break;
      }
    }
  };
  _.prototype.initCollider = function (_) {
    _.initCollider();
  };
  _.prototype.updateCollider = function (_) {
    _.node.getWorldMatrix(n);
    if (_.type === i.ColliderType.Box) {
      var o = (v = _).size;
      v.aabb.x = v.offset.x - o.width / 2;
      v.aabb.y = v.offset.y - o.height / 2;
      v.aabb.width = o.width;
      v.aabb.height = o.height;
      var e = v.worldPoints;
      var t = e[0];
      var d = e[1];
      var f = e[2];
      var r = e[3];
      s(v.aabb, n, t, d, f, r);
      for (var a = Math.min(t.x, d.x, f.x, r.x), c = Math.min(t.y, d.y, f.y, r.y), l = Math.max(t.x, d.x, f.x, r.x), u = Math.max(t.y, d.y, f.y, r.y), h = v.worldEdge, p = 0, y = e.length; p < y; p++) {
        if (!h[p]) {
          h[p] = cc.v2();
        }
        cc.Vec2.subtract(h[p], e[(p + 1) % y], e[p]);
      }
      v.aabb.x = a;
      v.aabb.y = c;
      v.aabb.width = l - a;
      v.aabb.height = u - c;
    } else if (_.type == i.ColliderType.Circle) {
      var v = _;
      cc.Vec2.transformMat4(m, v.offset, n);
      v.worldPosition.x = m.x;
      v.worldPosition.y = m.y;
      var g = n.m;
      var x = g[12];
      var b = g[13];
      g[12] = g[13] = 0;
      m.x = v.radius;
      m.y = 0;
      cc.Vec2.transformMat4(m, m, n);
      var w = Math.sqrt(m.x * m.x + m.y * m.y);
      v.worldRadius = w;
      v.aabb.x = v.worldPosition.x - w;
      v.aabb.y = v.worldPosition.y - w;
      v.aabb.width = 2 * w;
      v.aabb.height = 2 * w;
      g[12] = x;
      g[13] = b;
    } else if (_.type == i.ColliderType.Polygon) {
      var A = (v = _).points;
      var C = v.worldPoints;
      h = v.worldEdge;
      C.length = A.length;
      a = Number.MAX_SAFE_INTEGER;
      c = Number.MAX_SAFE_INTEGER;
      l = -Number.MAX_SAFE_INTEGER;
      u = -Number.MAX_SAFE_INTEGER;
      p = 0;
      y = A.length;
      for (; p < y; p++) {
        if (!C[p]) {
          C[p] = cc.v2();
        }
        m.x = A[p].x + v.offset.x;
        m.y = A[p].y + v.offset.y;
        cc.Vec2.transformMat4(m, m, n);
        var E = m.x;
        var T = m.y;
        C[p].set(m);
        if (E > l) {
          l = E;
        }
        if (E < a) {
          a = E;
        }
        if (T > u) {
          u = T;
        }
        if (T < c) {
          c = T;
        }
      }
      if (_.isConvex) {
        p = 0;
        y = C.length;
        p = 0;
        y = C.length;
        for (; p < y; p++) {
          if (!h[p]) {
            h[p] = cc.v2();
          }
          cc.Vec2.subtract(h[p], C[(p + 1) % y], C[p]);
        }
      }
      v.aabb.x = a;
      v.aabb.y = c;
      v.aabb.width = l - a;
      v.aabb.height = u - c;
    }
  };
  _.prototype.shouldCollide = function (_, o) {
    var e = _.node;
    var t = o.node;
    var i = cc.game.collisionMatrix;
    return e !== t && i[e.groupIndex][t.groupIndex];
  };
  _.prototype.update = function (_) {
    if (this.enable) {
      this.oneTest(_);
    }
  };
  _.prototype.oneTest = function () {
    var _ = this;
    if (this._treeDirty) {
      this._tree = new f.QuadTree(this._treeRect, 0, this._maxDepth, this._maxChildren);
      this._treeDirty = false;
    }
    this._tree.clear();
    for (var o = this._colliders.length - 1; o >= 0; o--) {
      var e = this._colliders[o];
      if (e && e.isValid) {
        e.contactMap.forEach(function (_) {
          _.state = i.StateType.NoTest;
        });
        this.updateCollider(this._colliders[o]);
        this._tree.insert(this._colliders[o]);
      } else {
        this._colliders.splice(o, 1);
      }
    }
    r.length = 0;
    this._tree.getAllNeedTestColliders(r);
    for (var t = 0, m = r.length; t < m; t++) {
      for (var n = r[t], s = (o = 0, n.length); o < s; o++) {
        for (var c = n[o], l = o + 1; l < s; l++) {
          var u = n[l];
          if (this.shouldCollide(c, u)) {
            switch (c.type) {
              case i.ColliderType.Circle:
                if (u.type === i.ColliderType.Circle) {
                  a = d.Intersection.circleCircle(c, u) ? 1 : 0;
                } else if (!(u.type !== i.ColliderType.Box && u.type !== i.ColliderType.Polygon)) {
                  a = d.Intersection.polygonCircle(u.worldPoints, c) ? 1 : 0;
                }
                break;
              case i.ColliderType.Box:
                if (u.type === i.ColliderType.Circle) {
                  a = d.Intersection.polygonCircle(c.worldPoints, u) ? 1 : 0;
                } else if (u.type === i.ColliderType.Box) {
                  a = c.node.angle === 0 && u.node.angle === 0 ? d.Intersection.rectRect(c.aabb, u.aabb) ? 1 : 0 : d.Intersection.satPolygonPolygon(c.worldPoints, u.worldPoints, c.worldEdge, u.worldEdge) ? 1 : 0;
                } else if (u.type === i.ColliderType.Polygon) {
                  a = u.isConvex ? d.Intersection.satPolygonPolygon(c.worldPoints, u.worldPoints, c.worldEdge, u.worldEdge) ? 1 : 0 : d.Intersection.polygonPolygon(c.worldPoints, u.worldPoints) ? 1 : 0;
                }
                break;
              case i.ColliderType.Polygon:
                a = u.type === i.ColliderType.Circle ? d.Intersection.polygonCircle(c.worldPoints, u) ? 1 : 0 : c.isConvex && u.isConvex ? d.Intersection.satPolygonPolygon(c.worldPoints, u.worldPoints, c.worldEdge, u.worldEdge) ? 1 : 0 : d.Intersection.polygonPolygon(c.worldPoints, u.worldPoints) ? 1 : 0;
            }
            if (a == 1) {
              this.updateCollideContact(c, u);
            } else {
              this.updateCollideExit(c, u);
            }
          }
        }
      }
    }
    var h = function (o) {
      var e = p._colliders[o];
      e.contactMap.forEach(function (o) {
        if (o.state === i.StateType.NoTest) {
          _.updateCollideExit(e, o.other);
        }
      });
    };
    var p = this;
    for (o = this._colliders.length - 1; o >= 0; o--) {
      h(o);
    }
    this.drawColliders();
    this.drawQuadTree();
  };
  _.prototype.checkCollider = function (_, o) {
    o = o || [];
    var e = [];
    this._tree.retrieve(_, e);
    for (var t = 0, f = e.length; t < f; t++) {
      var m = e[t];
      if (m.colliderId !== _.colliderId && this.shouldCollide(_, m)) {
        switch (_.type) {
          case i.ColliderType.Circle:
            if (m.type === i.ColliderType.Circle) {
              if (d.Intersection.circleCircle(_, m)) {
                o.push(m);
              }
            } else if (!(m.type !== i.ColliderType.Box && m.type !== i.ColliderType.Polygon)) {
              if (d.Intersection.polygonCircle(m.worldPoints, _)) {
                o.push(m);
              }
            }
            break;
          case i.ColliderType.Box:
            if (m.type === i.ColliderType.Circle) {
              if (d.Intersection.polygonCircle(_.worldPoints, m)) {
                o.push(m);
              }
            } else if (m.type === i.ColliderType.Box) {
              if (_.node.angle === 0 && m.node.angle === 0) {
                if (d.Intersection.rectRect(_.aabb, m.aabb)) {
                  o.push(m);
                }
              } else if (d.Intersection.satPolygonPolygon(_.worldPoints, m.worldPoints, _.worldEdge, m.worldEdge)) {
                o.push(m);
              }
            } else if (m.type === i.ColliderType.Polygon) {
              if (m.isConvex) {
                if (d.Intersection.satPolygonPolygon(_.worldPoints, m.worldPoints, _.worldEdge, m.worldEdge)) {
                  o.push(m);
                }
              } else if (d.Intersection.polygonPolygon(_.worldPoints, m.worldPoints)) {
                o.push(m);
              }
            }
            break;
          case i.ColliderType.Polygon:
            if (m.type === i.ColliderType.Circle) {
              if (d.Intersection.polygonCircle(_.worldPoints, m)) {
                o.push(m);
              }
            } else if (_.isConvex && m.isConvex) {
              if (d.Intersection.satPolygonPolygon(_.worldPoints, m.worldPoints, _.worldEdge, m.worldEdge)) {
                o.push(m);
              }
            } else if (d.Intersection.polygonPolygon(_.worldPoints, m.worldPoints)) {
              o.push(m);
            }
        }
      }
    }
    return o;
  };
  _.prototype.updateCollideContact = function (_, o) {
    var e = _.contactMap.get(o.colliderId);
    if (e) {
      e.state = i.StateType.IsTest;
      this._doCollide(_, o, t.onStay);
    } else {
      _.contactMap.set(o.colliderId, {
        other: o,
        state: i.StateType.IsTest
      });
      this._doCollide(_, o, t.onEnter);
    }
    var d = o.contactMap.get(_.colliderId);
    if (d) {
      d.state = i.StateType.IsTest;
      this._doCollide(o, _, t.onStay);
    } else {
      o.contactMap.set(_.colliderId, {
        other: _,
        state: i.StateType.IsTest
      });
      this._doCollide(o, _, t.onEnter);
    }
  };
  _.prototype.updateCollideExit = function (_, o) {
    if (_.contactMap.delete(o.colliderId)) {
      this._doCollide(_, o, t.onExit);
    }
    if (o.contactMap.delete(_.colliderId)) {
      this._doCollide(o, _, t.onExit);
    }
  };
  _.prototype._doCollide = function (_, o, e) {
    for (var t, i = _.node._components, d = 0, f = i.length; d < f; d++) {
      if ((t = i[d])[e]) {
        t[e](o, _);
      }
    }
  };
  Object.defineProperty(_.prototype, "enableDebugDraw", {
    get: function () {
      return this._enableDebugDraw;
    },
    set: function (_) {
      if (_ && !this._enableDebugDraw) {
        this._checkDebugDrawValid();
        this._debugDrawer.node.active = true;
      } else if (!_ && this._enableDebugDraw) {
        this._debugDrawer.clear(true);
        this._debugDrawer.node.active = false;
      }
      this._enableDebugDraw = _;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_.prototype, "enableQuadTreeDraw", {
    get: function () {
      return this._enableQuadTreeDraw;
    },
    set: function (_) {
      if (_ && !this._enableQuadTreeDraw) {
        this._checkDebugDrawValid();
        this._debugDrawer.node.active = true;
      } else if (!_ && this._enableQuadTreeDraw) {
        this._debugDrawer.clear(true);
        this._debugDrawer.node.active = false;
      }
      this._enableQuadTreeDraw = _;
    },
    enumerable: false,
    configurable: true
  });
  _.prototype._checkDebugDrawValid = function () {
    if (!this._debugDrawer || !this._debugDrawer.isValid) {
      var _ = new cc.Node("FCOLLISION_MANAGER_DEBUG_DRAW");
      _.zIndex = cc.macro.MAX_ZINDEX;
      cc.game.addPersistRootNode(_);
      this._debugDrawer = _.addComponent(cc.Graphics);
      this._debugDrawer.lineWidth = 5;
    }
  };
  _.prototype.drawColliders = function () {
    if (this._enableDebugDraw) {
      this._checkDebugDrawValid();
      var _ = this._debugDrawer;
      _.clear();
      for (var o = this._colliders, e = 0, t = o.length; e < t; e++) {
        var d = o[e];
        _.strokeColor = cc.Color.RED;
        if (d.type === i.ColliderType.Box || d.type === i.ColliderType.Polygon) {
          var f = d.worldPoints;
          if (f.length > 0) {
            cc.Vec2.set(m, f[0].x, f[0].y);
            _.moveTo(m.x, m.y);
            for (var n = 1; n < f.length; n++) {
              cc.Vec2.set(m, f[n].x, f[n].y);
              _.lineTo(m.x, m.y);
            }
            _.close();
            _.stroke();
          }
        } else if (d.type === i.ColliderType.Circle) {
          _.circle(d.worldPosition.x, d.worldPosition.y, d.worldRadius);
          _.stroke();
        }
      }
    }
  };
  _.prototype.drawQuadTree = function () {
    if (this._enableQuadTreeDraw) {
      this._checkDebugDrawValid();
      var _ = this._debugDrawer;
      if (!this._enableDebugDraw) {
        _.clear(true);
      }
      this._tree.render(_);
    }
  };
  _._instance = null;
  return _;
}();
exports.default = c;