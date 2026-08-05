import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Copy,
  ExternalLink,
  Loader2,
  RefreshCw,
  Rocket,
  Users,
  Save,
  Power,
  ArrowUpDown,
} from "lucide-react";
import {
  fetchMintLaunchProjects,
  mintLaunchProject,
  setMintProjectWhitelistAllowances,
  setMintProjectWhitelistEnabled,
} from "@/lib/mintLaunch/launchpad";
import type { MintLaunchProject } from "@/lib/mintLaunch/types";
import { useWallet } from "@/hooks/useWallet";
import { useAppStore } from "@/store";
import { cn } from "@/lib/utils";

function shortAddress(address: string) {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
}

function isSameAddress(a: string, b: string) {
  return a.toLowerCase() === b.toLowerCase();
}

export default function MintProjectDetail() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const wallet = useWallet();
  const { showToast } = useAppStore();
  const [project, setProject] = useState<MintLaunchProject | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const [mintQuantity, setMintQuantity] = useState("1");
  const [minting, setMinting] = useState(false);

  const [whitelistInput, setWhitelistInput] = useState("");
  const [whitelistLoading, setWhitelistLoading] = useState(false);
  const [whitelistModeLoading, setWhitelistModeLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const isCreator = useMemo(
    () => Boolean(wallet.account) && Boolean(project) && isSameAddress(wallet.account || "", project?.creator || ""),
    [wallet.account, project],
  );

  useEffect(() => {
    let mounted = true;
    if (!token) {
      setStatus("error");
      setError("缺少代币地址参数");
      return;
    }

    setStatus("loading");
    setRefreshing(refreshKey > 0);
    setError("");
    fetchMintLaunchProjects(wallet.account || "")
      .then((data) => {
        if (!mounted) return;
        const found = data.find((p) => p.token.toLowerCase() === token.toLowerCase());
        if (found) {
          setProject(found);
          setStatus("ready");
        } else {
          setStatus("error");
          setError("未找到该发射项目");
        }
        setRefreshing(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : "加载失败");
        setStatus("error");
        setRefreshing(false);
      });

    return () => {
      mounted = false;
    };
  }, [token, wallet.account, refreshKey]);

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("success", `已复制 ${label}`);
    } catch {
      showToast("error", "复制失败");
    }
  };

  const handleMint = async () => {
    if (!project || !wallet.signer) return;
    setMinting(true);
    try {
      await mintLaunchProject(wallet.signer, project, mintQuantity);
      setRefreshKey((k) => k + 1);
      showToast("success", "Mint 成功");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Mint 失败");
    } finally {
      setMinting(false);
    }
  };

  const parseWhitelistAddresses = (text: string): string[] => {
    const raw = text
      .replace(/[\s,;]+/g, " ")
      .trim()
      .split(" ");
    return raw.filter((item) => item.length > 0);
  };

  const handleSaveWhitelist = async () => {
    if (!project || !wallet.signer || !isCreator) return;
    const addresses = parseWhitelistAddresses(whitelistInput);
    if (addresses.length === 0) {
      setError("请至少输入一个白名单地址");
      return;
    }
    if (addresses.length > 200) {
      setError("单次最多 200 个地址");
      return;
    }

    setWhitelistLoading(true);
    try {
      await setMintProjectWhitelistAllowances(
        wallet.signer,
        project.vault,
        addresses.map((account) => ({ account, allowance: "1" })),
      );
      setWhitelistInput("");
      setRefreshKey((k) => k + 1);
      showToast("success", "白名单已保存");
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存白名单失败");
    } finally {
      setWhitelistLoading(false);
    }
  };

  const handleToggleWhitelist = async () => {
    if (!project || !wallet.signer || !isCreator) return;
    setWhitelistModeLoading(true);
    try {
      await setMintProjectWhitelistEnabled(wallet.signer, project.vault, !project.whitelistEnabled);
      setRefreshKey((k) => k + 1);
      showToast("success", "白名单模式已切换");
    } catch (err) {
      setError(err instanceof Error ? err.message : "切换白名单模式失败");
    } finally {
      setWhitelistModeLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="page-fade-in flex min-h-[50vh] flex-col items-center justify-center gap-3 text-[#8A5F38]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-sm">正在加载项目详情…</p>
      </div>
    );
  }

  if (status === "error" || !project) {
    return (
      <div className="page-fade-in mx-auto max-w-3xl px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="capy-btn-ghost mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          返回
        </button>
        <div className="rounded-2xl border-2 border-dashed border-[#B53E2A]/30 bg-[#FDEBD7] p-5 text-sm text-[#B53E2A]">
          {error || "加载失败"}
        </div>
      </div>
    );
  }

  const mintCost = (BigInt(project.mintPriceWei || "0") * BigInt(mintQuantity || "0")).toString();

  return (
    <div className="page-fade-in mx-auto max-w-3xl px-4 py-6 lg:py-8">
      <div className="mb-6 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="capy-btn-ghost">
          <ArrowLeft className="h-4 w-4" />
          返回
        </button>
        <button
          onClick={() => setRefreshKey((k) => k + 1)}
          disabled={refreshing}
          className="capy-btn-ghost"
        >
          <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
          刷新
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border-2 border-dashed border-[#B53E2A]/30 bg-[#FDEBD7] p-4 text-sm text-[#B53E2A]">
          {error}
        </div>
      )}

      <section className="capy-card relative overflow-hidden">
        <span className="tape tl" />
        <span className="tape br" />
        <div className="flex items-start gap-4">
          {project.avatar ? (
            <img
              src={project.avatar}
              alt={project.name}
              className="h-16 w-16 rounded-2xl object-cover ring-2 ring-[#EAD9B8]"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F5E7C2] to-[#FDEBD7] text-xl font-black text-[#8A5F38]">
              {project.symbol.slice(0, 2) || "🦫"}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h1 className="hand text-2xl font-black text-[#4A3524]">{project.name}</h1>
            <p className="text-sm text-[#8A7258]">
              {project.symbol} · {project.whitelistEnabled ? "白名单模式" : "公开模式"}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#8A7258]">铸造进度</span>
            <span className="text-sm font-bold text-[#4A3524]">{project.progress.toFixed(1)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#F5E7C2]">
            <div
              className="h-full rounded-full bg-[#F0A568]"
              style={{ width: `${Math.min(100, project.progress)}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-[#8A7258]">
            <span>
              {project.mintedCount} / {project.mintCount} 份
            </span>
            <span>{project.finalized ? "已结束" : "进行中"}</span>
          </div>
        </div>

        {project.whitelistEnabled && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border-2 border-dashed border-[#DFC9A4] bg-[#FFFDF6] p-3 text-sm text-[#8A7258]">
            <Users className="h-4 w-4 text-[#F0A568]" />
            白名单 {project.whitelistMintedCount}/{project.whitelistMintCount} · 公开{" "}
            {project.publicMintedCount}/{project.publicMintCount}
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-xl border-2 border-dashed border-[#DFC9A4] bg-[#FFFDF6] p-3">
            <div className="text-[#B0A08A]">单次价格</div>
            <div className="mt-1 text-[#4A3524]">
              {project.mintPrice} {project.paymentSymbol}
            </div>
          </div>
          <div className="rounded-xl border-2 border-dashed border-[#DFC9A4] bg-[#FFFDF6] p-3">
            <div className="text-[#B0A08A]">单钱包上限</div>
            <div className="mt-1 text-[#4A3524]">
              {project.maxMintPerWallet === "0" ? "不限制" : `${project.maxMintPerWallet} 份`}
            </div>
          </div>
          <div className="rounded-xl border-2 border-dashed border-[#DFC9A4] bg-[#FFFDF6] p-3">
            <div className="text-[#B0A08A]">代币合约</div>
            <div className="mt-1 flex items-center gap-2">
              <a
                href={`https://bscscan.com/token/${project.token}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[#8A5F38] hover:underline"
              >
                {shortAddress(project.token)}
                <ExternalLink className="h-3 w-3" />
              </a>
              <button
                onClick={() => copy(project.token, "代币地址")}
                className="rounded-md border border-dashed border-[#DFC9A4] bg-white p-1 text-[#8A5F38] hover:bg-[#F5E7C2]"
              >
                <Copy className="h-3 w-3" />
              </button>
            </div>
          </div>
          <div className="rounded-xl border-2 border-dashed border-[#DFC9A4] bg-[#FFFDF6] p-3">
            <div className="text-[#B0A08A]">金库合约</div>
            <div className="mt-1 flex items-center gap-2">
              <a
                href={`https://bscscan.com/address/${project.vault}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[#8A5F38] hover:underline"
              >
                {shortAddress(project.vault)}
                <ExternalLink className="h-3 w-3" />
              </a>
              <button
                onClick={() => copy(project.vault, "Vault 地址")}
                className="rounded-md border border-dashed border-[#DFC9A4] bg-white p-1 text-[#8A5F38] hover:bg-[#F5E7C2]"
              >
                <Copy className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {project.finalized && (
          <a
            href={`https://pancakeswap.finance/swap?outputCurrency=${project.token}`}
            target="_blank"
            rel="noreferrer"
            className="capy-btn-main mt-5 flex w-full items-center justify-center gap-2"
          >
            <ArrowUpDown className="h-4 w-4" />
            去 PancakeSwap 交易
          </a>
        )}
      </section>

      {!project.finalized && (
        <section className="capy-card mt-5">
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-[#F0A568]" />
            <h2 className="hand text-lg font-bold text-[#4A3524]">参与 Mint</h2>
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              type="number"
              min={1}
              value={mintQuantity}
              onChange={(e) => setMintQuantity(e.target.value)}
              className="capy-input"
              placeholder="Mint 数量"
            />
            <button
              onClick={handleMint}
              disabled={minting || !wallet.signer}
              className="capy-btn-main whitespace-nowrap"
            >
              {minting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Mint"}
              {Number(mintCost) > 0 && ` · ${mintCost} ${project.paymentSymbol}`}
            </button>
          </div>
          {project.whitelistEnabled && wallet.account && (
            <p className="mt-3 text-xs text-[#8A7258]">
              白名单剩余份额：{project.whitelistRemaining} 份
            </p>
          )}
        </section>
      )}

      {isCreator && !project.finalized && (
        <section className="capy-card mt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#F0A568]" />
              <h2 className="hand text-lg font-bold text-[#4A3524]">白名单管理</h2>
            </div>
            <button
              onClick={handleToggleWhitelist}
              disabled={whitelistModeLoading}
              className={cn(
                "capy-btn-ghost text-xs",
                project.whitelistEnabled ? "text-[#B53E2A]" : "text-[#8A5F38]",
              )}
            >
              <Power className="h-3.5 w-3.5" />
              {whitelistModeLoading
                ? "切换中"
                : project.whitelistEnabled
                  ? "关闭白名单"
                  : "开启白名单"}
            </button>
          </div>

          <div className="mt-4 rounded-xl border-2 border-dashed border-[#DFC9A4] bg-[#FFFDF6] p-3 text-xs text-[#8A7258]">
            已添加白名单地址数：{project.totalWhitelistAllowance}
          </div>

          <textarea
            value={whitelistInput}
            onChange={(e) => setWhitelistInput(e.target.value)}
            placeholder="批量粘贴白名单地址，每行一个，支持空格、逗号分隔"
            className="capy-input mt-4 min-h-[120px] resize-y"
          />
          <p className="mt-2 text-xs text-[#B0A08A]">单次最多 200 个地址</p>

          <button
            onClick={handleSaveWhitelist}
            disabled={whitelistLoading || !whitelistInput.trim()}
            className="capy-btn-main mt-4 w-full"
          >
            {whitelistLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            保存白名单
          </button>
        </section>
      )}
    </div>
  );
}