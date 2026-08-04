import { useEffect, useRef, useState } from "react";
import { Gamepad2, Loader2, AlertCircle, Play, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GAME_SRC = "/game-capy-rush/index.html";

export default function Game() {
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => {
      if (iframeRef.current) {
        try {
          const doc = iframeRef.current.contentDocument;
          if (!doc || !doc.body || doc.body.children.length === 0) {
            setIframeError(true);
          }
        } catch {
          setIframeError(false);
        }
      }
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [started]);

  const handleStart = () => {
    setStarted(true);
    setLoading(true);
    setIframeError(false);
  };

  return (
    <div className="page-fade-in mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="hand text-2xl font-black text-[#8A5F38] sm:text-3xl">卡皮巴拉冲冲冲</h1>
          <p className="mt-1 text-sm text-[#8A7258]">超解压合成小游戏，随时随地来一局</p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="capy-btn-ghost hidden sm:inline-flex"
        >
          <Home className="h-4 w-4" />
          返回首页
        </button>
      </div>

      {!started ? (
        <div className="capy-section flex flex-col items-center py-16 text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-[#F0A568]/20 blur-3xl" />
            <img
              src="/game-capy-rush-logo.png"
              alt="卡皮巴拉冲冲冲"
              className="relative h-32 w-32 rounded-3xl object-cover shadow-2xl shadow-[#8A5F38]/20 ring-2 ring-[#F0A568]/30 lg:h-40 lg:w-40"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/logo.jpg";
              }}
            />
            <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#F0A568] text-[#FFFDF6]">
              <Gamepad2 className="h-4 w-4" />
            </span>
          </div>
          <h2 className="hand mb-2 text-3xl font-black text-[#8A5F38]">准备好了吗？</h2>
          <p className="mb-8 max-w-md text-sm text-[#8A7258]">
            点击下方按钮进入游戏。若首次加载较慢，请耐心等待可爱的卡皮巴拉出来陪你玩～
          </p>
          <button onClick={handleStart} className="capy-btn-main px-10 py-4 text-lg">
            <Play className="h-5 w-5 fill-current" />
            开始游戏
          </button>
        </div>
      ) : (
        <div className="capy-section p-2 sm:p-4">
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-[#F7F1E2] sm:aspect-[4/3]">
            {loading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-[#8A5F38]">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="text-sm">游戏加载中…</span>
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={GAME_SRC}
              title="卡皮巴拉冲冲冲"
              className={cn("h-full w-full border-0", (loading || iframeError) && "hidden")}
              allow="fullscreen"
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setIframeError(true);
              }}
            />
            {iframeError && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 p-6 text-center">
                <AlertCircle className="h-10 w-10 text-[#B53E2A]" />
                <div>
                  <p className="font-bold text-[#B53E2A]">游戏资源尚未构建</p>
                  <p className="mt-2 max-w-md text-sm text-[#8A7258]">
                    当前还没有可运行的 Web 构建产物。请使用 Cocos Creator 打开项目源码
                    <code className="mx-1 rounded bg-[#FFFDF6] px-1 py-0.5 text-xs text-[#4A3524]">
                      public/game-capy-rush-src
                    </code>
                    ，构建为 Web Mobile，然后把产物放到
                    <code className="mx-1 rounded bg-[#FFFDF6] px-1 py-0.5 text-xs text-[#4A3524]">
                      public/game-capy-rush/
                    </code>
                    目录下。
                  </p>
                </div>
                <button onClick={() => setStarted(false)} className="capy-btn-ghost">
                  返回游戏封面
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}
