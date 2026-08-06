﻿import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, ExternalLink, RefreshCw, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWallet } from "@/hooks/useWallet";
import { useAppStore } from "@/store";
import { fetchMintLaunchProjects } from "@/lib/mintLaunch/launchpad";
import type { MintLaunchProject } from "@/lib/mintLaunch/types";
import { TokenAvatar } from "@/components/TokenAvatar";

function formatDate(ts: number) {
  if (!ts) return "未知";
  return new Date(ts * 1000).toLocaleString("zh-CN");
}

function shortAddress(address: string) {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
}

export default function MintLaunches() {
  const wallet = useWallet();
  const { showToast } = useAppStore();
  const [projects, setProjects] = useState<MintLaunchProject[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const list = await fetchMintLaunchProjects(wallet.account);
      setProjects(list);
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "加载失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.account]);

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("success", `已复制 ${label}`);
    } catch {
      showToast("error", "复制失败");
    }
  };

  return (
    <div className="page-fade-in mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-dashed border-[#DFC9A4] bg-white text-[#8A5F38] transition hover:bg-[#F5E7C2]"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="hand text-2xl font-black text-[#8A5F38] lg:text-3xl">Mint 已发射</h1>
            <p className="text-xs text-[#8A7258]">链上已部署的佛系卡皮巴拉生态 Mint 项目</p>
          </div>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="capy-btn-main"
        >
          <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
          刷新列表
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.token} className="capy-card relative flex flex-col gap-3">
            <span className="tape tl" />
            <div className="flex items-start gap-3">
              <TokenAvatar
                src={project.avatar}
                symbol={project.symbol}
                token={project.token}
                size={56}
              />
              <div className="flex-1">
                <h3 className="font-bold text-[#4A3524]">{project.name}</h3>
                <p className="text-xs font-bold text-[#8A7258]">
                  {project.symbol} · {project.paymentSymbol}
                </p>
              </div>
            </div>

            <p className="line-clamp-2 text-sm text-[#8A7258]">{project.description}</p>

            <div className="space-y-1 text-xs text-[#8A7258]">
              <div className="flex justify-between">
                <span>进度</span>
                <span className="font-bold text-[#4A3524]">{project.progress.toFixed(2)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#F5E7C2]">
                <div
                  className="h-full rounded-full bg-[#F0A568]"
                  style={{ width: `${Math.min(100, project.progress)}%` }}
                />
              </div>
              <div className="flex justify-between">
                <span>已 Mint</span>
                <span className="text-[#4A3524]">
                  {project.mintedCount} / {project.mintCount}
                </span>
              </div>
              <div className="flex justify-between">
                <span>单价</span>
                <span className="text-[#4A3524]">{project.mintPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>发射时间</span>
                <span className="text-[#4A3524]">{formatDate(project.createdAt)}</span>
              </div>
            </div>

            <div className="rounded-xl border-2 border-dashed border-[#DFC9A4] bg-[#FFFDF6] p-2.5">
              <div className="mb-1 text-[10px] text-[#B0A08A]">代币合约</div>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`https://bscscan.com/token/${project.token}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-[#8A5F38] hover:underline"
                >
                  {shortAddress(project.token)}
                </a>
                <button
                  onClick={() => copy(project.token, "代币地址")}
                  className="rounded-md border border-dashed border-[#DFC9A4] bg-white p-1 text-[#8A5F38] hover:bg-[#F5E7C2]"
                >
                  <Copy className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div className="mt-auto flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => copy(project.token, "代币地址")}
                className="inline-flex items-center gap-1 rounded-lg border border-dashed border-[#DFC9A4] bg-[#FFFDF6] px-2.5 py-1 text-xs font-bold text-[#8A5F38] hover:bg-[#F5E7C2]"
              >
                <Copy className="h-3 w-3" />
                代币
              </button>
              <button
                onClick={() => copy(project.vault, "Vault 地址")}
                className="inline-flex items-center gap-1 rounded-lg border border-dashed border-[#DFC9A4] bg-[#FFFDF6] px-2.5 py-1 text-xs font-bold text-[#8A5F38] hover:bg-[#F5E7C2]"
              >
                <Copy className="h-3 w-3" />
                Vault
              </button>
              <a
                href={`https://bscscan.com/token/${project.token}`}
                target="_blank"
                rel="noreferrer"
                className="ml-auto inline-flex items-center gap-1 rounded-lg border border-dashed border-[#8A5F38] bg-[#F5E7C2] px-2.5 py-1 text-xs font-bold text-[#8A5F38] hover:bg-[#FDEBD7]"
              >
                <ExternalLink className="h-3 w-3" />
                BscScan
              </a>
              <Link
                to={`/mint-project/${project.token}`}
                className="inline-flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-[#8A5F38] bg-[#8A5F38] px-2.5 py-1.5 text-xs font-bold text-[#FFFDF6] transition hover:bg-[#6F5035]"
              >
                查看详情 / Mint / 白名单
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && !loading && (
        <div className="mt-10 rounded-3xl border-2 border-dashed border-[#EAD9B8] bg-[#FFFDF6] p-10 text-center">
          <div className="mb-3 text-4xl">🦫</div>
          <h3 className="text-lg font-bold text-[#4A3524]">暂无已发射项目</h3>
          <p className="text-sm text-[#8A7258]">去 Mint 发射台创建第一个佛系卡皮巴拉生态资产吧。</p>
          <Link to="/mint" className="capy-btn-main mt-4 inline-flex">
            去发射
          </Link>
        </div>
      )}
    </div>
  );
}