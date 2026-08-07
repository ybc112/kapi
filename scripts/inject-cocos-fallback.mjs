import fs from "node:fs";
import path from "node:path";

const md5Source = fs.readFileSync(
  path.resolve("public/game-capy-rush-src/assets/scripts/Md5.js"),
  "utf8"
);

const fallbackScript = `<!-- Cocos web build fallback stubs for modules excluded from the build -->
<script>
(function () {
  var cache = {};
  function getMyAdCtl() {
    if (!cache.myAdCtl) {
      cache.myAdCtl = {
        MyAdCtl: {
          playVideo: function (cb) {
            window.level_gamePause = true;
            if (typeof cb === "function") cb(0);
          },
          showInsertAd: function (cb) {
            if (typeof cb === "function") cb();
          },
          destroyInsertAd: function () {},
          showBanner: function () {},
          hideBanner: function () {}
        }
      };
    }
    return cache.myAdCtl;
  }
  function getMd5() {
    if (!cache.md5) {
      var exports = {};
${md5Source.split("\n").map((line) => "      " + line).join("\n")}
      cache.md5 = exports;
    }
    return cache.md5;
  }
  var prevRequire = typeof window.__require === "function" ? window.__require : null;
  var missingLog = {};
  window.__require = function (name, direct) {
    if (name === "MyAdCtl" || name === "./MyAdCtl") return getMyAdCtl();
    if (name === "Md5" || name === "./Md5") return getMd5();
    if (prevRequire) {
      try {
        return prevRequire(name, direct);
      } catch (e) {}
    }
    if (!missingLog[name]) {
      missingLog[name] = true;
      console.warn("[Cocos fallback] missing module stubbed:", name);
    }
    return {};
  };
})();
</script>`;

const targets = [
  "public/game-capy-rush/index.html",
  "E:/dapp/web-mobile/index.html",
];

const MAIN_SCRIPT_RE = /<script src="main\.[a-f0-9]+\.js" charset="utf-8"><\/script>/;
const STUB_RE = /<!-- Cocos web build fallback stubs[\s\S]*?<script src="main\.[a-f0-9]+\.js" charset="utf-8"><\/script>/;

for (const target of targets) {
  const filePath = path.resolve(target);
  if (!fs.existsSync(filePath)) {
    console.log("skip (not found):", filePath);
    continue;
  }
  let html = fs.readFileSync(filePath, "utf8");
  const mainMatch = html.match(MAIN_SCRIPT_RE);
  if (!mainMatch) {
    console.log("skip (main script not found):", filePath);
    continue;
  }
  const mainTag = mainMatch[0];

  if (STUB_RE.test(html)) {
    // 已有旧桩，整体替换
    html = html.replace(
      STUB_RE,
      fallbackScript + "\n" + mainTag
    );
  } else {
    // 没有桩，插入到 main.js 之前
    html = html.replace(mainTag, fallbackScript + "\n" + mainTag);
  }

  fs.writeFileSync(filePath, html, "utf8");
  console.log("updated:", filePath);
}
