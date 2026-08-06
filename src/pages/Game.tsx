import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Gamepad2,
  Loader2,
  AlertCircle,
  Home,
  Wallet,
  Coins,
  Flame,
  Trophy,
  RotateCcw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/hooks/useWallet";
import {
  GAME_VAULT_ADDRESS,
  LEVEL_FEE_UNITS,
  ITEM_FEE_UNITS,
  WIN_REWARD_UNITS,
  LEVELS_FOR_REWARD,
  formatGameAmount,
  parseGameAmount,
  getTokenBalance,
  getTokenAllowance,
  approveToken,
  payLevel,
  useItem,
  claimReward,
  fetchVaultFees,
} from "@/lib/contracts/gameVault";

const GAME_SRC = "/game-capy-rush/index.html";
const SIGNATURE_BACKEND = String(import.meta.env.VITE_GAME_SIGNER_URL ?? "").trim();

// 支付功能开关：暂时关闭前端支付 UI，代码保留，后续设为 true 即可恢复
const PAYMENT_ENABLED = false;

export default function Game() {
  const navigate = useNavigate();
  const wallet = useWallet();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  const [balance, setBalance] = useState<bigint>(0n);
  const [levelFee, setLevelFee] = useState<bigint>(parseGameAmount(LEVEL_FEE_UNITS));
  const [itemFee, setItemFee] = useState<bigint>(parseGameAmount(ITEM_FEE_UNITS));
  const [winReward, setWinReward] = useState<bigint>(parseGameAmount(WIN_REWARD_UNITS));
  const [levelsForReward] = useState<number>(LEVELS_FOR_REWARD);

  const [currentLevel, setCurrentLevel] = useState(1);
  const [winStreak, setWinStreak] = useState(0);
  const [txPending, setTxPending] = useState<string | null>(null);
  const [lastTxHash, setLastTxHash] = useState<string>("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const tokenSymbol = "CAPY";

  const refreshBalance = useCallback(async () => {
    if (!wallet.provider || !wallet.account) return;
    try {
      const b = await getTokenBalance(wallet.provider, wallet.account);
      setBalance(b);
    } catch {
      setBalance(0n);
    }
  }, [wallet.provider, wallet.account]);

  const refreshFees = useCallback(async () => {
    if (!wallet.provider) return;
    try {
      const fees = await fetchVaultFees(wallet.provider);
      setLevelFee(fees.levelFee);
      setItemFee(fees.itemFee);
      setWinReward(fees.winReward);
    } catch {
      // fall back to env defaults
    }
  }, [wallet.provider]);

  useEffect(() => {
    refreshBalance();
    refreshFees();
  }, [refreshBalance, refreshFees]);

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
    }, 3000);
    return () => clearTimeout(timer);
  }, [started]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== "object") return;
      const { type, payload } = event.data;
      if (type === "CAPY_LEVEL_START") {
        setCurrentLevel(Number(payload?.level ?? currentLevel));
      } else if (type === "CAPY_LEVEL_WIN") {
        setWinStreak((s) => s + 1);
        setMessage({ type: "success", text: `第 ${payload?.level} 关通过！` });
      } else if (type === "CAPY_LEVEL_LOSE") {
        setWinStreak(0);
        setMessage({ type: "error", text: "挑战失败，连胜重置" });
      } else if (type === "CAPY_USE_ITEM") {
        handleUseItem();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [currentLevel]);

  const ensureAllowance = async (amount: bigint) => {
    if (!wallet.signer || !wallet.account || !GAME_VAULT_ADDRESS) return false;
    const allowance = await getTokenAllowance(wallet.provider!, wallet.account, GAME_VAULT_ADDRESS);
    if (allowance < amount) {
      setTxPending("授权中…");
      await approveToken(wallet.signer, GAME_VAULT_ADDRESS, amount * 10n);
      setTxPending(null);
    }
    return true;
  };

  const handlePayLevel = async () => {
    if (!wallet.isConnected || !wallet.signer) {
      setMessage({ type: "error", text: "请先连接钱包" });
      return;
    }
    if (balance < levelFee) {
      setMessage({ type: "error", text: `CAPY 余额不足（需要 ${formatGameAmount(levelFee)}）` });
      return;
    }
    try {
      setTxPending("支付门票中…");
      await ensureAllowance(levelFee);
      const hash = await payLevel(wallet.signer, currentLevel);
      setLastTxHash(hash);
      setMessage({ type: "success", text: `第 ${currentLevel} 关门票已支付` });
      await refreshBalance();
      // auto start game on first pay
      if (!started) setStarted(true);
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "支付失败" });
    } finally {
      setTxPending(null);
    }
  };

  const handleUseItem = async () => {
    if (!PAYMENT_ENABLED) {
      iframeRef.current?.contentWindow?.postMessage({ type: "CAPY_ITEM_GRANTED" }, "*");
      return;
    }
    if (!wallet.isConnected || !wallet.signer) {
      setMessage({ type: "error", text: "请先连接钱包" });
      return;
    }
    if (balance < itemFee) {
      setMessage({ type: "error", text: `CAPY 余额不足（需要 ${formatGameAmount(itemFee)}）` });
      return;
    }
    try {
      setTxPending("道具支付中…");
      await ensureAllowance(itemFee);
      const hash = await useItem(wallet.signer);
      setLastTxHash(hash);
      setMessage({ type: "success", text: "道具已使用，代币已销毁" });
      await refreshBalance();
      // tell the game the item purchase succeeded
      iframeRef.current?.contentWindow?.postMessage({ type: "CAPY_ITEM_GRANTED" }, "*");
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "道具支付失败" });
    } finally {
      setTxPending(null);
    }
  };

  const handleClaimReward = async () => {
    if (!wallet.isConnected || !wallet.signer) {
      setMessage({ type: "error", text: "请先连接钱包" });
      return;
    }
    if (winStreak < levelsForReward) {
      setMessage({ type: "error", text: `需连胜 ${levelsForReward} 关才能领奖` });
      return;
    }
    if (!SIGNATURE_BACKEND) {
      setMessage({ type: "error", text: "领奖签名服务未配置" });
      return;
    }
    try {
      setTxPending("领取奖励中…");
      const res = await fetch(`${SIGNATURE_BACKEND}/api/game/sign-reward`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ player: wallet.account }),
      });
      if (!res.ok) throw new Error("签名服务不可用");
      const { signature } = await res.json();
      const hash = await claimReward(wallet.signer, signature);
      setLastTxHash(hash);
      setWinStreak(0);
      setMessage({ type: "success", text: `奖励 ${formatGameAmount(winReward)} CAPY 已发放` });
      await refreshBalance();
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "领奖失败" });
    } finally {
      setTxPending(null);
    }
  };

  const handleStart = () => {
    if (PAYMENT_ENABLED) {
      if (!GAME_VAULT_ADDRESS) {
        setMessage({ type: "error", text: "游戏金库地址未配置" });
        return;
      }
      handlePayLevel();
    } else {
      setStarted(true);
    }
  };

  if (started) {
    return createPortal(
      <div className="fixed inset-0 z-[9999] flex h-screen w-screen flex-col bg-[#F7F1E2]">
        <div className="hidden sm:flex flex-none items-center justify-between gap-2 bg-[#FFFDF6]/90 px-3 py-2 shadow-sm">
          {PAYMENT_ENABLED ? (
            <div className="flex items-center gap-2">
              <button onClick={handlePayLevel} disabled={txPending !== null} className="capy-btn-main text-xs px-2 py-1.5">
                <Coins className="h-3 w-3" />
                {txPending || `支付第 ${currentLevel} 关`}
              </button>
              <button onClick={handleUseItem} disabled={txPending !== null} className="capy-btn-ghost text-xs px-2 py-1.5">
                <Flame className="h-3 w-3" />
                道具 {formatGameAmount(itemFee)}
              </button>
              {winStreak >= levelsForReward && (
                <button onClick={handleClaimReward} disabled={txPending !== null} className="capy-btn-main text-xs px-2 py-1.5">
                  <Trophy className="h-3 w-3" />
                  领奖
                </button>
              )}
            </div>
          ) : (
            <div />
          )}
          <button onClick={() => setStarted(false)} className="capy-btn-ghost text-xs px-2 py-1.5">
            <RotateCcw className="h-3 w-3" />
            返回
          </button>
        </div>

        <button
          onClick={() => setStarted(false)}
          className="capy-btn-ghost absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#FFFDF6]/90 p-0 shadow-sm sm:hidden"
          aria-label="返回"
        >
          <RotateCcw className="h-4 w-4" />
        </button>

        <div className="relative flex-1 overflow-hidden">
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
            scrolling="yes"
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
      </div>,
      document.body
    );
  }

  return (
    <div className="page-fade-in mx-auto min-h-screen max-w-5xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="hand text-2xl font-black text-[#8A5F38] sm:text-3xl">卡皮巴拉冲冲冲</h1>
          <p className="mt-1 text-sm text-[#8A7258]">超解压合成小游戏，随时随地来一局</p>
        </div>
        <button onClick={() => navigate("/")} className="capy-btn-ghost hidden sm:inline-flex">
          <Home className="h-4 w-4" />
          返回首页
        </button>
      </div>

      {message && (
        <div
          className={cn(
            "mb-4 rounded-xl px-4 py-3 text-sm",
            message.type === "success"
              ? "border border-[#A3D9A5] bg-[#E8F5E9] text-[#2E7D32]"
              : "border border-[#EF9A9A] bg-[#FFEBEE] text-[#C62828]",
          )}
        >
          {message.text}
          {lastTxHash && (
            <a
              href={`https://bscscan.com/tx/${lastTxHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 underline"
            >
              查看交易
            </a>
          )}
        </div>
      )}

      {PAYMENT_ENABLED && (
        <div className="capy-section mb-4 flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <Wallet className="h-5 w-5 text-[#8A5F38]" />
            {wallet.isConnected ? (
              <div className="text-sm">
                <span className="text-[#8A7258]">{shortAddress(wallet.account || "")}</span>
                <span className="mx-2 text-[#D7C4A9]">|</span>
                <span className="font-bold text-[#8A5F38]">
                  {formatGameAmount(balance)} {tokenSymbol}
                </span>
              </div>
            ) : (
              <span className="text-sm text-[#8A7258]">未连接钱包</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {!wallet.isConnected ? (
              <button onClick={wallet.connectWallet} disabled={wallet.loading} className="capy-btn-main text-sm">
                {wallet.loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wallet className="h-4 w-4" />}
                连接钱包
              </button>
            ) : (
              <button onClick={wallet.disconnectWallet} className="capy-btn-ghost text-sm">
                断开钱包
              </button>
            )}
          </div>
        </div>
      )}

      {PAYMENT_ENABLED && (
        <div className="capy-section mb-4 grid grid-cols-2 gap-3 px-4 py-3 sm:grid-cols-4">
          <div className="rounded-xl bg-[#FFFDF6] p-3 text-center">
            <div className="text-xs text-[#8A7258]">每关门票</div>
            <div className="mt-1 font-bold text-[#8A5F38]">
              {formatGameAmount(levelFee)} {tokenSymbol}
            </div>
          </div>
          <div className="rounded-xl bg-[#FFFDF6] p-3 text-center">
            <div className="text-xs text-[#8A7258]">道具费用</div>
            <div className="mt-1 font-bold text-[#8A5F38]">
              {formatGameAmount(itemFee)} {tokenSymbol}
            </div>
          </div>
          <div className="rounded-xl bg-[#FFFDF6] p-3 text-center">
            <div className="text-xs text-[#8A7258]">连胜奖励</div>
            <div className="mt-1 font-bold text-[#8A5F38]">
              {formatGameAmount(winReward)} {tokenSymbol}
            </div>
          </div>
          <div className="rounded-xl bg-[#FFFDF6] p-3 text-center">
            <div className="text-xs text-[#8A7258]">当前连胜</div>
            <div className="mt-1 font-bold text-[#8A5F38]">
              {winStreak} / {levelsForReward}
            </div>
          </div>
        </div>
      )}

      <div className="capy-section flex flex-col items-center px-4 py-12 text-center sm:py-16">
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-[#F0A568]/20 blur-3xl" />
          <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-[#F5E7C2] to-[#FDEBD7] text-5xl shadow-2xl shadow-[#8A5F38]/20 ring-2 ring-[#F0A568]/30 sm:h-32 sm:w-32 lg:h-40 lg:w-40">
            🦫
          </div>
          <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#F0A568] text-[#FFFDF6]">
            <Gamepad2 className="h-4 w-4" />
          </span>
        </div>
        <h2 className="hand mb-2 text-2xl font-black text-[#8A5F38] sm:text-3xl">准备好了吗？</h2>
        <p className="mb-6 max-w-md px-2 text-sm text-[#8A7258]">
          {PAYMENT_ENABLED
            ? `连接钱包并支付 ${formatGameAmount(levelFee)} ${tokenSymbol} 即可开始第 ${currentLevel} 关。连胜 ${levelsForReward} 关可领取 ${formatGameAmount(winReward)} ${tokenSymbol} 大奖！`
            : "点击开始，随时随地来一局超解压合成小游戏！"}
        </p>
        <button
          onClick={handleStart}
          disabled={txPending !== null}
          className="capy-btn-main px-8 py-4 text-base sm:px-10 sm:py-4 sm:text-lg"
        >
          {txPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : PAYMENT_ENABLED ? (
            <Coins className="h-5 w-5" />
          ) : (
            <Gamepad2 className="h-5 w-5" />
          )}
          {txPending || (PAYMENT_ENABLED ? `支付 ${formatGameAmount(levelFee)} CAPY 开始游戏` : "开始游戏")}
        </button>
      </div>
    </div>
  );
}

function shortAddress(address: string) {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}
