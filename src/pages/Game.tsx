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
  Skull,
  Heart,
  Calendar,
  Medal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/hooks/useWallet";
import {
  GAME_VAULT_ADDRESS,
  type VaultEconomics,
  type PlayerState,
  type LeaderboardRewardSignature,
  formatGameAmount,
  parseGameAmount,
  getTokenBalance,
  getTokenAllowance,
  approveToken,
  enterTier,
  revive,
  useItem,
  abandonRun,
  claimReward,
  checkIn,
  claimLeaderboardReward,
  fetchVaultEconomics,
  fetchPlayerState,
  fetchCurrentEpoch,
  fetchLeaderboardRewardCap,
  levelRangeOf,
  rewardForTier,
} from "@/lib/contracts/gameVault";

const GAME_SRC = "/game-capy-rush/index.html";
const SIGNATURE_BACKEND = String(import.meta.env.VITE_GAME_SIGNER_URL ?? "").trim();

// 支付功能开关：打开后启用门票/复活/道具/签到/排行榜等链上交互
const PAYMENT_ENABLED = true;

const CHECK_IN_COST = parseGameAmount("10000");

type LeaderboardEntry = {
  player: string;
  score: number;
};

export default function Game() {
  const navigate = useNavigate();
  const wallet = useWallet();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  const [balance, setBalance] = useState<bigint>(0n);
  const [econ, setEcon] = useState<VaultEconomics | null>(null);
  const [player, setPlayer] = useState<PlayerState | null>(null);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [cleared, setCleared] = useState(0);
  const [claimable, setClaimable] = useState(false);

  const [txPending, setTxPending] = useState<string | null>(null);
  const [lastTxHash, setLastTxHash] = useState<string>("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [reviveDialog, setReviveDialog] = useState(false);
  const [pendingItem, setPendingItem] = useState(false);
  // 游戏请求开始某一关时挂在这里：付费关必须先确认链上已进场才放行
  const [levelRequest, setLevelRequest] = useState<number | null>(null);
  const [levelRequestPending, setLevelRequestPending] = useState(false);
  // 弹窗模式：pay = 付门票进档；claim = 上一档已通关但没领奖，先领奖
  const [levelRequestMode, setLevelRequestMode] = useState<"pay" | "claim">("pay");
  // 弹窗内的错误提示（页面级 message 会被弹窗遮罩挡住，用户以为「点不动」）
  const [levelRequestError, setLevelRequestError] = useState<string | null>(null);
  // 换钱包后重载游戏 iframe 用：key 变化 React 会重新挂载 iframe
  const [gameKey, setGameKey] = useState(0);

  const [checkInPending, setCheckInPending] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [leaderboardEpoch, setLeaderboardEpoch] = useState<number | null>(null);
  const [leaderboardCurrentEpoch, setLeaderboardCurrentEpoch] = useState<number | null>(null);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [claimingRank, setClaimingRank] = useState<number | null>(null);
  const [rankCaps, setRankCaps] = useState<Record<number, number>>({});

  const tokenSymbol = "CAPY";
  const currentTier = player?.run.active ? player.run.tier : player?.tierNext ?? 0;
  const { fromLevel, toLevel } = levelRangeOf(currentTier);
  const startLevel = player?.run.active ? fromLevel + cleared : currentTier === 0 ? 1 : fromLevel;

  const refreshBalance = useCallback(async () => {
    if (!wallet.provider || !wallet.account) return;
    try {
      const b = await getTokenBalance(wallet.provider, wallet.account);
      setBalance(b);
    } catch {
      setBalance(0n);
    }
  }, [wallet.provider, wallet.account]);

  const refreshEcon = useCallback(async () => {
    if (!wallet.provider) return;
    try {
      const e = await fetchVaultEconomics(wallet.provider);
      setEcon(e);
    } catch {
      // fall back to defaults handled by fetchVaultEconomics
    }
  }, [wallet.provider]);

  const refreshPlayer = useCallback(async () => {
    if (!wallet.provider || !wallet.account) return;
    try {
      const p = await fetchPlayerState(wallet.provider, wallet.account);
      setPlayer(p);
    } catch {
      setPlayer(null);
    }
  }, [wallet.provider, wallet.account]);

  useEffect(() => {
    refreshBalance();
    refreshEcon();
    refreshPlayer();
  }, [refreshBalance, refreshEcon, refreshPlayer]);

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

  const postToGame = useCallback((type: string, payload?: unknown) => {
    iframeRef.current?.contentWindow?.postMessage({ type, payload: payload ?? {} }, "*");
  }, []);

  // 游戏加载完成后，把支付开关状态同步给游戏内桥接脚本
  useEffect(() => {
    if (started && iframeRef.current?.contentWindow) {
      postToGame("CAPY_PAYMENT_ENABLED", { enabled: PAYMENT_ENABLED });
    }
  }, [started, postToGame]);

  // 钱包地址变化 = 换人了，游戏存档（关卡进度）要跟着重置，
  // 否则新钱包会接着上一个钱包的关卡继续玩（localStorage 是浏览器的，跟钱包无关）
  const walletRef = useRef(wallet.account);
  useEffect(() => {
    const prev = walletRef.current;
    walletRef.current = wallet.account;
    if (wallet.account && prev && prev.toLowerCase() !== wallet.account.toLowerCase()) {
      // 等到 iframe 挂载完再发，否则消息丢了
      const t = setTimeout(() => {
        if (iframeRef.current?.contentWindow) {
          postToGame("CAPY_RESET_PROGRESS", {});
        }
      }, 300);
      return () => clearTimeout(t);
    }
  }, [wallet.account, postToGame]);

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

  const showError = (err: unknown, fallback: string) => {
    setMessage({
      type: "error",
      text: err instanceof Error ? err.message : fallback,
    });
  };

  const showSuccess = (text: string, hash?: string) => {
    setMessage({ type: "success", text });
    if (hash) setLastTxHash(hash);
  };

  const startBackendSession = async (): Promise<string | null> => {
    if (!SIGNATURE_BACKEND || !wallet.account) return null;
    const res = await fetch(`${SIGNATURE_BACKEND}/api/game/session/start`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ player: wallet.account }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "开局会话失败");
    }
    const data = await res.json();
    return data.sessionId ?? null;
  };

  const reportLevelToBackend = useCallback(async (level: number) => {
    if (!sessionId) return;
    const res = await fetch(`${SIGNATURE_BACKEND}/api/game/session/level`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sessionId, level }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "关卡上报失败");
    }
    const data = await res.json();
    setCleared(Number(data.cleared ?? cleared + 1));
    if (Number(data.remaining ?? 0) === 0) {
      setClaimable(true);
    }
  }, [sessionId, cleared]);

  /**
   * 游戏请求开始某一关时的许可判定。
   * 第 1 关免费直接放行；第 2 关起必须链上已经付过门票（run.active 且档位区间对得上），
   * 否则挂起请求、弹支付遮罩，付完再放行。没有这道门玩家能白玩到第 11 关。
   */
  const handleLevelRequest = useCallback(
    async (level: number) => {
      if (!PAYMENT_ENABLED || level <= 1) {
        postToGame("CAPY_LEVEL_GRANTED", { level });
        return;
      }
      try {
        if (!wallet.provider || !wallet.account) {
          setLevelRequest(level); // 让遮罩提示先连钱包
          return;
        }
        const fresh = await fetchPlayerState(wallet.provider, wallet.account);
        setPlayer(fresh);
        const tier = fresh.run.active ? fresh.run.tier : fresh.tierNext;
        const range = levelRangeOf(tier);
        if (fresh.run.active && level >= range.fromLevel && level <= range.toLevel) {
          // 门票已付。确保后端会话在（领奖签名要用），然后放行
          if (!sessionId) {
            const sid = await startBackendSession().catch(() => null);
            if (sid) setSessionId(sid);
          }
          postToGame("CAPY_LEVEL_GRANTED", { level });
          return;
        }
        if (fresh.run.active) {
          // 有进行中的 run，但请求的关卡超出了本档区间 = 本档已通关、还没领奖。
          // 先领奖（领完 run 清空、tierNext+1），再付下一档门票，不能直接 enterTier
          //（合约会 revert RunAlreadyActive）。
          setLevelRequestMode("claim");
          setLevelRequest(level);
          setLevelRequestError(null);
          return;
        }
      } catch {
        // 读链失败也走支付遮罩，宁可多问一次也不要放过去
      }
      setLevelRequestMode("pay");
      setLevelRequest(level);
      setLevelRequestError(null);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [PAYMENT_ENABLED, postToGame, wallet.provider, wallet.account, sessionId],
  );

  /** 遮罩里点「支付门票」 */
  const confirmLevelPayment = async () => {
    if (levelRequest == null) return;
    setLevelRequestPending(true);
    try {
      await handleEnterTier();
      const sid = await startBackendSession();
      if (!sid) throw new Error("后端会话未返回 sessionId");
      setSessionId(sid);
      setCleared(0);
      setClaimable(false);
      postToGame("CAPY_LEVEL_GRANTED", { level: levelRequest });
      setLevelRequest(null);
      setLevelRequestMode("pay");
    } catch (err) {
      showError(err, "支付门票失败");
    } finally {
      setLevelRequestPending(false);
    }
  };

  /** 遮罩里点「放弃」——告诉游戏不要开始这一关 */
  const cancelLevelPayment = () => {
    if (levelRequest == null) return;
    postToGame("CAPY_LEVEL_DENIED", { level: levelRequest });
    setLevelRequest(null);
  };

  const signReward = async () => {
    if (!sessionId) throw new Error("没有活跃会话");
    const res = await fetch(`${SIGNATURE_BACKEND}/api/game/sign-reward`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sessionId }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "签名服务不可用");
    }
    return res.json();
  };

  const fetchLeaderboard = useCallback(async () => {
    if (!PAYMENT_ENABLED || !SIGNATURE_BACKEND || !wallet.provider) return;
    setLeaderboardLoading(true);
    try {
      const current = await fetchCurrentEpoch(wallet.provider);
      setLeaderboardCurrentEpoch(current);
      const epoch = Math.max(0, current - 1);
      setLeaderboardEpoch(epoch);
      const res = await fetch(`${SIGNATURE_BACKEND}/api/game/leaderboard?epoch=${epoch}`);
      if (!res.ok) throw new Error("排行榜获取失败");
      const data = await res.json();
      setLeaderboard(data.leaderboard ?? []);
    } catch {
      setLeaderboard([]);
    } finally {
      setLeaderboardLoading(false);
    }
  }, [PAYMENT_ENABLED, wallet.provider]);

  const fetchRankCaps = useCallback(async () => {
    if (!PAYMENT_ENABLED || !wallet.provider) return;
    try {
      const [c1, c2, c3] = await Promise.all([
        fetchLeaderboardRewardCap(wallet.provider, 1),
        fetchLeaderboardRewardCap(wallet.provider, 2),
        fetchLeaderboardRewardCap(wallet.provider, 3),
      ]);
      setRankCaps({ 1: c1, 2: c2, 3: c3 });
    } catch {
      setRankCaps({});
    }
  }, [PAYMENT_ENABLED, wallet.provider]);

  useEffect(() => {
    if (!PAYMENT_ENABLED) return;
    fetchRankCaps();
    fetchLeaderboard();
    const timer = setInterval(() => {
      void fetchLeaderboard();
    }, 60_000);
    return () => clearInterval(timer);
  }, [PAYMENT_ENABLED, fetchRankCaps, fetchLeaderboard]);

  const handleEnterTier = async () => {
    if (!wallet.isConnected || !wallet.signer) {
      throw new Error("请先连接钱包");
    }
    if (!econ) {
      throw new Error("经济参数未加载");
    }
    if (balance < econ.ticket) {
      throw new Error(`CAPY 余额不足（需要 ${formatGameAmount(econ.ticket)} 门票）`);
    }
    setTxPending("支付门票中…");
    try {
      await ensureAllowance(econ.ticket);
      const hash = await enterTier(wallet.signer);
      showSuccess(`第 ${currentTier} 档门票已支付`, hash);
      await refreshBalance();
      await refreshPlayer();
    } finally {
      setTxPending(null);
    }
  };

  const handleStart = async () => {
    if (!PAYMENT_ENABLED) {
      setStarted(true);
      return;
    }
    if (!wallet.isConnected || !wallet.signer) {
      setMessage({ type: "error", text: "请先连接钱包" });
      return;
    }
    if (!GAME_VAULT_ADDRESS) {
      setMessage({ type: "error", text: "游戏金库地址未配置" });
      return;
    }
    if (!SIGNATURE_BACKEND) {
      setMessage({ type: "error", text: "领奖签名服务未配置" });
      return;
    }

    try {
      // 第 1 关免费，直接开始
      if (startLevel === 1) {
        setStarted(true);
        return;
      }

      // 付费档位：必须先链上进场
      if (!player?.run.active) {
        await handleEnterTier();
      }

      // 开启后端会话（用于领奖签名）
      const sid = await startBackendSession();
      if (!sid) throw new Error("后端会话未返回 sessionId");
      setSessionId(sid);
      setCleared(0);
      setClaimable(false);
      setStarted(true);
    } catch (err) {
      showError(err, "开始游戏失败");
    }
  };

  const handleRevive = async () => {
    if (!wallet.isConnected || !wallet.signer) {
      setMessage({ type: "error", text: "请先连接钱包" });
      return;
    }
    if (!econ) {
      setMessage({ type: "error", text: "经济参数未加载" });
      return;
    }
    if (balance < econ.reviveCost) {
      setMessage({
        type: "error",
        text: `CAPY 余额不足（需要 ${formatGameAmount(econ.reviveCost)} 复活费）`,
      });
      return;
    }
    try {
      setTxPending("支付复活费中…");
      await ensureAllowance(econ.reviveCost);
      const hash = await revive(wallet.signer);
      setLastTxHash(hash);
      await refreshBalance();
      await refreshPlayer();
      setReviveDialog(false);
      postToGame("CAPY_REVIVE_GRANTED", { level: currentLevel });
    } catch (err) {
      showError(err, "复活失败");
    } finally {
      setTxPending(null);
    }
  };

  const handleAbandon = async () => {
    if (!wallet.isConnected || !wallet.signer) return;
    try {
      setTxPending("放弃闯关中…");
      const hash = await abandonRun(wallet.signer);
      setLastTxHash(hash);
      await refreshPlayer();
      setReviveDialog(false);
      setStarted(false);
      setSessionId(null);
      setClaimable(false);
      setCleared(0);
    } catch (err) {
      showError(err, "放弃闯关失败");
    } finally {
      setTxPending(null);
    }
  };

  const handleUseItem = useCallback(async () => {
    // 失败时必须回 CAPY_ITEM_DENIED，否则游戏会一直干等到超时
    const deny = (text: string) => {
      setMessage({ type: "error", text });
      postToGame("CAPY_ITEM_DENIED", { reason: text });
    };
    if (!PAYMENT_ENABLED) {
      postToGame("CAPY_ITEM_GRANTED");
      return;
    }
    if (!wallet.isConnected || !wallet.signer) {
      deny("请先连接钱包");
      return;
    }
    if (!econ) {
      deny("经济参数未加载，请刷新页面");
      return;
    }
    if (balance < econ.itemCost) {
      deny(`CAPY 余额不足，道具需要 ${formatGameAmount(econ.itemCost)}`);
      return;
    }
    // 合约里 useItem() 要求链上有进行中的闯关（runs[player].active），
    // 免费的第 1 关没有进场记录，直接调会 revert NoActiveRun。先拦住并说清楚。
    if (!player?.run.active) {
      deny(`道具只能在闯关中使用。请先支付 ${formatGameAmount(econ.ticket)} CAPY 门票进场（第 1 关免费体验不支持道具）`);
      return;
    }
    try {
      setTxPending("道具支付中…");
      setPendingItem(true);
      await ensureAllowance(econ.itemCost);
      const hash = await useItem(wallet.signer);
      setLastTxHash(hash);
      showSuccess("道具已使用，40% 已销毁、60% 进奖池", hash);
      await refreshBalance();
      postToGame("CAPY_ITEM_GRANTED");
    } catch (err) {
      const text = err instanceof Error ? err.message : "道具支付失败";
      deny(text);
    } finally {
      setTxPending(null);
      setPendingItem(false);
    }
  }, [PAYMENT_ENABLED, wallet.isConnected, wallet.signer, econ, balance, player, postToGame, refreshBalance]);

  const handleClaimReward = async () => {
    if (!wallet.isConnected || !wallet.signer) {
      setMessage({ type: "error", text: "请先连接钱包" });
      return;
    }
    if (!econ || !player) {
      setMessage({ type: "error", text: "玩家状态未加载" });
      return;
    }
    if (!sessionId) {
      setLevelRequestError("没有可领奖的会话。如果刚刷新过页面或后端重启过，本档进度已丢失，请放弃后重新闯关。");
      return;
    }
    try {
      setTxPending("领取奖励中…");
      const signed = await signReward();
      const reward = BigInt(signed.reward ?? "0");
      const hash = await claimReward(
        wallet.signer,
        Number(signed.tier),
        BigInt(signed.nonce),
        Number(signed.deadline),
        signed.signature
      );
      setLastTxHash(hash);
      setClaimable(false);
      setSessionId(null);
      setCleared(0);
      showSuccess(`第 ${signed.tier} 档奖励 ${formatGameAmount(reward)} CAPY 已发放`, hash);
      await refreshBalance();
      await refreshPlayer();
      // 领奖后如果弹窗还开着（通关未领奖模式），切回「支付下一档门票」模式
      if (levelRequest != null) {
        setLevelRequestMode("pay");
      }
    } catch (err) {
      const text = err instanceof Error ? err.message : "领奖失败";
      if (levelRequest != null) {
        setLevelRequestError(text);
      } else {
        showError(err, "领奖失败");
      }
    } finally {
      setTxPending(null);
    }
  };

  const handleCheckIn = async () => {
    if (!PAYMENT_ENABLED || !wallet.isConnected || !wallet.signer) {
      setMessage({ type: "error", text: "请先连接钱包" });
      return;
    }
    if (balance < CHECK_IN_COST) {
      setMessage({ type: "error", text: `CAPY 余额不足（需要 ${formatGameAmount(CHECK_IN_COST)} 签到费）` });
      return;
    }
    setCheckInPending(true);
    try {
      await ensureAllowance(CHECK_IN_COST);
      const hash = await checkIn(wallet.signer);
      showSuccess(`签到成功，解锁 7 天游戏签到`, hash);
      await refreshBalance();
      await refreshPlayer();
    } catch (err) {
      showError(err, "签到失败");
    } finally {
      setCheckInPending(false);
    }
  };

  const handleClaimLeaderboard = async (rank: number) => {
    if (!PAYMENT_ENABLED || !wallet.isConnected || !wallet.signer || !wallet.account) {
      setMessage({ type: "error", text: "请先连接钱包" });
      return;
    }
    if (leaderboardEpoch === null) {
      setMessage({ type: "error", text: "排行榜数据未加载" });
      return;
    }
    setClaimingRank(rank);
    try {
      const res = await fetch(`${SIGNATURE_BACKEND}/api/game/leaderboard/claim`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ player: wallet.account, epochId: leaderboardEpoch, rank }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "排行榜签名失败");
      }
      const signed: LeaderboardRewardSignature = await res.json();
      const hash = await claimLeaderboardReward(
        wallet.signer,
        signed.epochId,
        signed.rank,
        BigInt(signed.amount),
        BigInt(signed.nonce),
        signed.deadline,
        signed.signature
      );
      showSuccess(`第 ${rank} 名排行榜奖励 ${formatGameAmount(BigInt(signed.amount))} CAPY 已发放`, hash);
      await refreshBalance();
      await refreshPlayer();
      await fetchLeaderboard();
    } catch (err) {
      showError(err, "领取排行榜奖励失败");
    } finally {
      setClaimingRank(null);
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== "object") return;
      const { type, payload } = event.data;
      if (type === "CAPY_BRIDGE_READY") {
        // 桥接就绪，立刻同步支付开关，避免竞态
        postToGame("CAPY_PAYMENT_ENABLED", { enabled: PAYMENT_ENABLED });
      } else if (type === "CAPY_PROGRESS_RESET_DONE") {
        // 游戏已清档，重载 iframe 让游戏从第 1 关重新开始，并重置前端状态
        setGameKey((k) => k + 1);
        setStarted(false);
        setLoading(true);
        setCleared(0);
        setClaimable(false);
        setSessionId(null);
        setCurrentLevel(1);
        setLevelRequest(null);
        setLevelRequestMode("pay");
        setLevelRequestError(null);
      } else if (type === "CAPY_LEVEL_REQUEST") {
        // 游戏要开始某一关，先确认能不能开：免费关直接放行，付费关必须链上已进场
        const level = Number(payload?.level ?? currentLevel);
        setCurrentLevel(level);
        void handleLevelRequest(level);
      } else if (type === "CAPY_LEVEL_START") {
        const level = Number(payload?.level ?? currentLevel);
        setCurrentLevel(level);
      } else if (type === "CAPY_LEVEL_WIN") {
        const level = Number(payload?.level ?? currentLevel);
        setCurrentLevel(level);
        void reportLevelToBackend(level);
        setMessage({ type: "success", text: `第 ${level} 关通过！` });
      } else if (type === "CAPY_LEVEL_LOSE") {
        const level = Number(payload?.level ?? currentLevel);
        setCurrentLevel(level);
        if (PAYMENT_ENABLED) {
          setReviveDialog(true);
        }
      } else if (type === "CAPY_USE_ITEM") {
        void handleUseItem();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [currentLevel, sessionId, cleared, PAYMENT_ENABLED, handleUseItem, reportLevelToBackend, handleLevelRequest, postToGame]);

  const checkInActive = Boolean(player && player.checkInExpiry > Date.now() / 1000);
  const checkInExpiryText = player?.checkInExpiry
    ? new Date(player.checkInExpiry * 1000).toLocaleDateString()
    : "未签到";

  const leaderboardRewardText = (rank: number) => {
    const cap = rankCaps[rank];
    if (!cap || !player?.pool) return "--";
    return `${formatGameAmount((player.pool * BigInt(cap)) / 10000n)} ${tokenSymbol}`;
  };

  if (started) {
    return createPortal(
      <div className="fixed inset-0 z-[9999] flex h-screen w-screen flex-col bg-[#F7F1E2]">
        <div className="hidden sm:flex flex-none items-center justify-between gap-2 bg-[#FFFDF6]/90 px-3 py-2 shadow-sm">
          {PAYMENT_ENABLED ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-lg bg-[#FFFDF6] px-2 py-1 text-xs text-[#8A5F38]">
                <Coins className="h-3 w-3" />
                档位 {currentTier}（{fromLevel}-{toLevel}）
              </div>
              {claimable ? (
                <button onClick={handleClaimReward} disabled={txPending !== null} className="capy-btn-main text-xs px-2 py-1.5">
                  <Trophy className="h-3 w-3" />
                  {txPending || "领奖"}
                </button>
              ) : (
                <button onClick={handleUseItem} disabled={txPending !== null || pendingItem} className="capy-btn-ghost text-xs px-2 py-1.5">
                  <Flame className="h-3 w-3" />
                  道具 {econ ? formatGameAmount(econ.itemCost) : "--"}
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
          {/* 浮动 CAPY 余额：游戏 iframe 内看不到链上余额，叠加在右上角 */}
          {started && !loading && (
            <div className="pointer-events-none absolute right-2 top-2 z-20 flex items-center gap-1.5 rounded-full bg-[#FFFDF6]/95 px-3 py-1.5 text-xs font-bold text-[#8A5F38] shadow-lg">
              <Coins className="h-3.5 w-3.5 text-[#C8811F]" />
              <span>
                {wallet.isConnected ? `${formatGameAmount(balance)} ${tokenSymbol}` : "未连接钱包"}
              </span>
            </div>
          )}
          <iframe
            key={gameKey}
            ref={iframeRef}
            src={GAME_SRC}
            title="卡皮巴拉冲冲冲"
            className={cn("h-full w-full border-0", (loading || iframeError) && "hidden")}
            allow="fullscreen"
            scrolling="yes"
            onLoad={() => {
              setLoading(false);
              postToGame("CAPY_PAYMENT_ENABLED", { enabled: PAYMENT_ENABLED });
            }}
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

        {levelRequest != null && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-[#FFFDF6] p-6 text-center shadow-xl">
              <Coins className="mx-auto h-10 w-10 text-[#C8811F]" />
              {levelRequestMode === "claim" ? (
                <>
                  <h3 className="mt-3 text-lg font-bold text-[#8A5F38]">
                    本档 {fromLevel}~{toLevel} 关已通关
                  </h3>
                  <p className="mt-1 text-sm text-[#8A7258]">
                    先领取{" "}
                    {econ ? formatGameAmount(rewardForTier(econ, currentTier)) : "--"} CAPY
                    奖励，再支付下一档门票进入第 {levelRequest} 关。
                  </p>
                </>
              ) : (
                <>
                  <h3 className="mt-3 text-lg font-bold text-[#8A5F38]">
                    第 {levelRequest} 关需要门票
                  </h3>
                  <p className="mt-1 text-sm text-[#8A7258]">
                    第 1 关是免费体验。从第 2 关起按档位收费，支付{" "}
                    {econ ? formatGameAmount(econ.ticket) : "--"} CAPY 可进入第 {fromLevel}~{toLevel} 关，
                    连过 10 关可领 {econ ? formatGameAmount(rewardForTier(econ, currentTier)) : "--"} CAPY。
                  </p>
                </>
              )}
              {!wallet.isConnected && (
                <p className="mt-2 text-xs text-[#B53E2A]">请先连接钱包</p>
              )}
              <p className="mt-2 text-xs text-[#8A7258]">
                余额 {formatGameAmount(balance)} {tokenSymbol}
              </p>
              {levelRequestError && (
                <p className="mt-2 rounded-lg bg-[#B53E2A]/10 p-2 text-xs text-[#B53E2A]">
                  {levelRequestError}
                </p>
              )}
              <div className="mt-5 flex gap-3">
                <button
                  onClick={cancelLevelPayment}
                  disabled={levelRequestPending}
                  className="capy-btn-ghost flex-1 text-sm"
                >
                  放弃
                </button>
                {levelRequestMode === "claim" ? (
                  <button
                    onClick={handleClaimReward}
                    disabled={levelRequestPending || !wallet.isConnected}
                    className="capy-btn-main flex-1 text-sm"
                  >
                    <Trophy className="h-3 w-3" />
                    {txPending || "领取奖励"}
                  </button>
                ) : (
                  <button
                    onClick={confirmLevelPayment}
                    disabled={levelRequestPending || !wallet.isConnected}
                    className="capy-btn-main flex-1 text-sm"
                  >
                    <Coins className="h-3 w-3" />
                    {levelRequestPending ? txPending || "处理中…" : "支付门票"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {reviveDialog && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-[#FFFDF6] p-6 text-center shadow-xl">
              <Skull className="mx-auto h-10 w-10 text-[#B53E2A]" />
              <h3 className="mt-3 text-lg font-bold text-[#8A5F38]">挑战失败</h3>
              <p className="mt-1 text-sm text-[#8A7258]">
                支付 {econ ? formatGameAmount(econ.reviveCost) : "--"} CAPY 即可从第 {currentLevel} 关继续
              </p>
              <div className="mt-5 flex gap-3">
                <button onClick={handleAbandon} disabled={txPending !== null} className="capy-btn-ghost flex-1 text-sm">
                  放弃
                </button>
                <button onClick={handleRevive} disabled={txPending !== null} className="capy-btn-main flex-1 text-sm">
                  <Heart className="h-3 w-3" />
                  {txPending || "复活"}
                </button>
              </div>
            </div>
          </div>
        )}
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
              : "border border-[#EF9A9A] bg-[#FFEBEE] text-[#C62828]"
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

      {PAYMENT_ENABLED && econ && (
        <div className="capy-section mb-4 grid grid-cols-2 gap-3 px-4 py-3 sm:grid-cols-4">
          <div className="rounded-xl bg-[#FFFDF6] p-3 text-center">
            <div className="text-xs text-[#8A7258]">下档奖励</div>
            <div className="mt-1 font-bold text-[#8A5F38]">
              {formatGameAmount(rewardForTier(econ, currentTier))} {tokenSymbol}
            </div>
          </div>
          <div className="rounded-xl bg-[#FFFDF6] p-3 text-center">
            <div className="text-xs text-[#8A7258]">门票 / 复活</div>
            <div className="mt-1 font-bold text-[#8A5F38]">
              {formatGameAmount(econ.ticket)} {tokenSymbol}
            </div>
          </div>
          <div className="rounded-xl bg-[#FFFDF6] p-3 text-center">
            <div className="text-xs text-[#8A7258]">道具费用</div>
            <div className="mt-1 font-bold text-[#8A5F38]">
              {formatGameAmount(econ.itemCost)} {tokenSymbol}
            </div>
          </div>
          <div className="rounded-xl bg-[#FFFDF6] p-3 text-center">
            <div className="text-xs text-[#8A7258]">当前档位</div>
            <div className="mt-1 font-bold text-[#8A5F38]">
              {currentTier === 0 && player?.tierNext === 0 ? "第 1 关免费" : `第 ${currentTier} 档`}
            </div>
          </div>
        </div>
      )}

      {PAYMENT_ENABLED && (
        <div className="capy-section mb-4 grid grid-cols-1 gap-4 px-4 py-4 sm:grid-cols-2">
          <div className="rounded-xl bg-[#FFFDF6] p-4">
            <div className="mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#8A5F38]" />
              <h3 className="font-bold text-[#8A5F38]">每周签到</h3>
            </div>
            <p className="mb-3 text-sm text-[#8A7258]">
              支付 <span className="font-bold text-[#8A5F38]">{formatGameAmount(CHECK_IN_COST)} CAPY</span> 解锁
              <span className="font-bold text-[#8A5F38]"> 7 天 </span>
              游戏内每日签到权益
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCheckIn}
                disabled={!wallet.isConnected || checkInPending || checkInActive}
                className="capy-btn-main text-sm"
              >
                {checkInPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Calendar className="h-4 w-4" />}
                {checkInActive ? `已签到至 ${checkInExpiryText}` : "立即签到"}
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-[#FFFDF6] p-4">
            <div className="mb-3 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-[#8A5F38]" />
              <h3 className="font-bold text-[#8A5F38]">每日排行榜</h3>
            </div>
            <p className="mb-3 text-sm text-[#8A7258]">
              每 24 小时结算，榜一 5% / 榜二 2% / 榜三 1% 奖池
            </p>
            <div className="space-y-2">
              {leaderboardLoading && leaderboard.length === 0 ? (
                <div className="flex items-center gap-2 text-sm text-[#8A7258]">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  加载中…
                </div>
              ) : leaderboard.length === 0 ? (
                <p className="text-sm text-[#8A7258]">暂无昨日排行数据</p>
              ) : (
                leaderboard.slice(0, 3).map((entry, idx) => {
                  const rank = idx + 1;
                  const isMe = wallet.isConnected && entry.player.toLowerCase() === wallet.account?.toLowerCase();
                  return (
                    <div
                      key={entry.player + rank}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-2 text-sm",
                        isMe ? "bg-[#F0A568]/20" : "bg-[#F7F1E2]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Medal className={cn("h-4 w-4", rank === 1 ? "text-[#F0A568]" : "text-[#8A5F38]")} />
                        <span className="text-[#4A3524]">{shortAddress(entry.player)}</span>
                        {isMe && <span className="text-xs text-[#F0A568]">我</span>}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[#8A7258]">{entry.score} 关</span>
                        <span className="font-bold text-[#8A5F38]">{leaderboardRewardText(rank)}</span>
                        {isMe && leaderboardEpoch !== null && leaderboardCurrentEpoch !== null && leaderboardEpoch < leaderboardCurrentEpoch && (
                          <button
                            onClick={() => handleClaimLeaderboard(rank)}
                            disabled={claimingRank !== null}
                            className="capy-btn-main text-xs px-2 py-1"
                          >
                            {claimingRank === rank ? <Loader2 className="h-3 w-3 animate-spin" /> : "领取"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
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
            ? currentTier === 0 && player?.tierNext === 0
              ? "第 1 关免费体验，通关后进入第 0 档（第 2~11 关）。"
              : `支付 ${econ ? formatGameAmount(econ.ticket) : "--"} CAPY 开始第 ${currentTier} 档（第 ${fromLevel}~${toLevel} 关），通关可领 ${econ ? formatGameAmount(rewardForTier(econ, currentTier)) : "--"} CAPY。`
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
          {txPending || (PAYMENT_ENABLED ? (startLevel === 1 ? "开始第 1 关（免费）" : player?.run.active ? "继续闯关" : `支付门票开始第 ${currentTier} 档`) : "开始游戏")}
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
