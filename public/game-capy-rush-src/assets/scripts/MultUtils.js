Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMaterialHash = exports.murmurhash2 = exports.serializeUniforms = exports.serializePasses = exports.serializePass = exports.serializeDefines = undefined;
var a = [];
function i(t, e) {
  for (var r = e.length, i = 0; i < r; i++) {
    var n = e[i];
    a[i] = n + t[n];
  }
  a.length = r;
  return a.join("");
}
function n(t, e) {
  if (e === undefined) {
    e = false;
  }
  var r = t._programName + t._cullMode;
  if (t._blend) {
    r += t._blendEq + t._blendAlphaEq + t._blendSrc + t._blendDst + t._blendSrcAlpha + t._blendDstAlpha + t._blendColor;
  }
  if (t._depthTest) {
    r += t._depthWrite + t._depthFunc;
  }
  if (t._stencilTest) {
    r += t._stencilFuncFront + t._stencilRefFront + t._stencilMaskFront + t._stencilFailOpFront + t._stencilZFailOpFront + t._stencilZPassOpFront + t._stencilWriteMaskFront + t._stencilFuncBack + t._stencilRefBack + t._stencilMaskBack + t._stencilFailOpBack + t._stencilZFailOpBack + t._stencilZPassOpBack + t._stencilWriteMaskBack;
  }
  r += i(t._defines, t._defineNames);
  if (!e) {
    r += s(t._properties, t._propertyNames);
  }
  return r;
}
function c(t, e) {
  if (e === undefined) {
    e = false;
  }
  for (var r = "", a = 0; a < t.length; a++) {
    r += n(t[a], e);
  }
  return r;
}
function s(t, e) {
  for (var r = 0, i = 0, n = e.length; i < n; i++) {
    var c = t[e[i]].value;
    if (c && c._id == null) {
      a[r] = c.toString();
      r++;
    }
  }
  a.length = r;
  return a.join(";");
}
function l(t, e) {
  for (var r, a = t.length, i = e ^ a, n = 0; a >= 4;) {
    r = 1540483477 * (65535 & (r = 255 & t.charCodeAt(n) | (255 & t.charCodeAt(++n)) << 8 | (255 & t.charCodeAt(++n)) << 16 | (255 & t.charCodeAt(++n)) << 24)) + ((1540483477 * (r >>> 16) & 65535) << 16);
    i = 1540483477 * (65535 & i) + ((1540483477 * (i >>> 16) & 65535) << 16) ^ (r = 1540483477 * (65535 & (r ^= r >>> 24)) + ((1540483477 * (r >>> 16) & 65535) << 16));
    a -= 4;
    ++n;
  }
  switch (a) {
    case 3:
      i ^= (255 & t.charCodeAt(n + 2)) << 16;
    case 2:
      i ^= (255 & t.charCodeAt(n + 1)) << 8;
    case 1:
      i = 1540483477 * (65535 & (i ^= 255 & t.charCodeAt(n))) + ((1540483477 * (i >>> 16) & 65535) << 16);
  }
  i = 1540483477 * (65535 & (i ^= i >>> 13)) + ((1540483477 * (i >>> 16) & 65535) << 16);
  return (i ^= i >>> 15) >>> 0;
}
exports.serializeDefines = i;
exports.serializePass = n;
exports.serializePasses = c;
exports.serializeUniforms = s;
exports.murmurhash2 = l;
exports.getMaterialHash = function (t) {
  var e = "";
  var r = t._effect;
  if (r) {
    e += c(r.passes, false);
  }
  return l(e, 666);
};