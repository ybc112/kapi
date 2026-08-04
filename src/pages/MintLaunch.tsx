import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  AtSign,
  Check,
  ChevronDown,
  Globe2,
  ImagePlus,
  Info,
  Loader2,
  Plus,
  Rocket,
  Send,
  Shield,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Wallet,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useWallet } from "@/hooks/useWallet";
import { useAppStore } from "@/store";
import {
  allocationMeta,
  initialAdvancedTax,
  initialMintAllocation,
  initialMintForm,
  mintCreationFeeLabel,
  MINT_USDT_ADDRESS,
  mintTemplates,
} from "@/lib/mintLaunch/data";
import {
  createMintLaunchToken,
  getMintReadProvider,
  isMintLaunchpadConfigured,
  mintLaunchpadConfig,
  queueMintProjectVerification,
  readMintLaunchCreatedToken,
  waitForMintTransactionReceipt,
} from "@/lib/mintLaunch/launchpad";
import type {
  AdvancedTaxState,
  AllocationKey,
  AllocationState,
  MintFormState,
  MintLaunchDraft,
  MintTemplateId,
} from "@/lib/mintLaunch/types";

const avatarAcceptedTypes = ["image/png", "image/jpeg", "image/svg+xml", "image/gif", "image/webp"];
const avatarAccept = avatarAcceptedTypes.join(",");
const avatarMaxSourceBytes = 1024 * 1024;
const avatarCanvasSize = 256;

function shortAddress(address: string) {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
}

function compressAvatar(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > avatarMaxSourceBytes) {
      reject(new Error("图片建议小于 1MB"));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = avatarCanvasSize;
        canvas.height = avatarCanvasSize;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas 不可用"));
          return;
        }
        ctx.drawImage(img, 0, 0, avatarCanvasSize, avatarCanvasSize);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = () => reject(new Error("图片读取失败"));
      img.src = String(reader.result);
    };
    reader.onerror = () => reject(new Error("图片读取失败"));
    reader.readAsDataURL(file);
  });
}

function AllocationRing({ allocation, total }: { allocation: AllocationState; total: number }) {
  const unallocated = Math.max(0, 100 - total);
  const data = [
    { key: "marketing", value: allocation.marketing, color: allocationMeta.find((m) => m.key === "marketing")?.color },
    { key: "liquidity", value: allocation.liquidity, color: allocationMeta.find((m) => m.key === "liquidity")?.color },
    { key: "rewards", value: allocation.rewards, color: allocationMeta.find((m) => m.key === "rewards")?.color },
    { key: "burn", value: allocation.burn, color: allocationMeta.find((m) => m.key === "burn")?.color },
    { key: "unallocated", value: unallocated, color: "#EAD9B8" },
  ];

  let cumulative = 0;
  const segments = data
    .filter((item) => item.value > 0)
    .map((item) => {
      const start = cumulative;
      cumulative += item.value;
      const end = cumulative;
      const largeArc = item.value > 50 ? 1 : 0;
      const startAngle = (start / 100) * Math.PI * 2 - Math.PI / 2;
      const endAngle = (end / 100) * Math.PI * 2 - Math.PI / 2;
      const x1 = 50 + 42 * Math.cos(startAngle);
      const y1 = 50 + 42 * Math.sin(startAngle);
      const x2 = 50 + 42 * Math.cos(endAngle);
      const y2 = 50 + 42 * Math.sin(endAngle);
      return {
        ...item,
        d: `M 50 50 L ${x1} ${y1} A 42 42 0 ${largeArc} 1 ${x2} ${y2} Z`,
      };
    });

  return (
    <div className="relative mx-auto h-40 w-40">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        {segments.map((segment) => (
          <path
            key={segment.key}
            d={segment.d}
            fill={segment.color}
            stroke="white"
            strokeWidth="2"
          />
        ))}
        <circle cx="50" cy="50" r="26" fill="white" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-[#4A3524]">{total}%</span>
        <span className="text-[10px] text-[#8A7258]">总分配</span>
      </div>
    </div>
  );
}

export default function MintLaunch() {
  const wallet = useWallet();
  const { showToast } = useAppStore();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<MintFormState>(initialMintForm);
  const [allocation, setAllocation] = useState<AllocationState>(initialMintAllocation);
  const [advancedTax, setAdvancedTax] = useState<AdvancedTaxState>(initialAdvancedTax);
  const [buyTax, setBuyTax] = useState(3);
  const [sellTax, setSellTax] = useState(3);
  const [templateId, setTemplateId] = useState<MintTemplateId>("standard");
  const [avatar, setAvatar] = useState("");
  const [whitelistEnabled, setWhitelistEnabled] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [result, setResult] = useState<{ hash: string; token?: string; predicted?: string } | null>(null);

  const selectedTemplate = useMemo(
    () => mintTemplates.find((t) => t.id === templateId) || mintTemplates[0],
    [templateId],
  );

  const allocationTotal = useMemo(
    () => allocation.marketing + allocation.liquidity + allocation.rewards + allocation.burn,
    [allocation],
  );

  const totalMintCount = useMemo(
    () => (Number(form.publicMintCount) || 0) + (Number(form.whitelistMintCount) || 0),
    [form.publicMintCount, form.whitelistMintCount],
  );

  const tokensPerMint = useMemo(() => {
    const total = Number(form.supply) || 0;
    return totalMintCount > 0 ? total / totalMintCount : 0;
  }, [form.supply, totalMintCount]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, mintCount: String(totalMintCount) }));
  }, [totalMintCount]);

  useEffect(() => {
    if (wallet.isConnected && wallet.account && !form.receiverWallet) {
      setForm((prev) => ({ ...prev, receiverWallet: wallet.account || "" }));
    }
  }, [wallet.isConnected, wallet.account, form.receiverWallet]);

  const handleAvatarUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!avatarAcceptedTypes.includes(file.type)) {
      showToast("error", "请上传 PNG、JPEG、SVG、GIF 或 WebP 图片");
      return;
    }
    try {
      const dataUrl = await compressAvatar(file);
      setAvatar(dataUrl);
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "图片处理失败");
    }
  };

  const updateForm = <K extends keyof MintFormState>(key: K, value: MintFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateAllocation = (key: AllocationKey, value: number) => {
    setAllocation((prev) => ({ ...prev, [key]: Math.max(0, Math.min(100, value)) }));
  };

  const handleDeploy = async () => {
    if (!wallet.isConnected || !wallet.signer) {
      await wallet.connectWallet();
      return;
    }
    if (!wallet.isBSC) {
      await wallet.switchToBSC();
      return;
    }

    const draft: MintLaunchDraft = {
      form,
      allocation,
      advancedTax,
      buyTax,
      sellTax,
      templateId,
      avatar,
      whitelistEnabled,
    };

    setDeploying(true);
    try {
      const txResult = await createMintLaunchToken(wallet.signer, draft);
      const receipt = await waitForMintTransactionReceipt(await getMintReadProvider(), txResult.hash);
      const token = readMintLaunchCreatedToken(receipt);
      await queueMintProjectVerification(token);
      setResult({ hash: txResult.hash, token, predicted: txResult.predictedTokenAddress });
      showToast("success", "部署成功");
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "部署失败");
    } finally {
      setDeploying(false);
    }
  };

  const statusItems = [
    { label: "部署费", value: selectedTemplate.fee },
    { label: "铸造份数", value: totalMintCount.toLocaleString() },
    { label: "每份代币", value: tokensPerMint.toLocaleString() },
    { label: "税率", value: `${buyTax}% / ${sellTax}%` },
  ];

  if (result) {
    return (
      <div className="page-fade-in mx-auto max-w-3xl px-4 py-10">
        <div className="capy-card relative overflow-hidden text-center">
          <span className="tape tl" />
          <span className="tape br" />
          <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center">
            <img
              src="/logo.jpg"
              alt="佛系卡皮巴拉"
              className="relative h-20 w-20 rounded-2xl object-cover ring-2 ring-[#F0A568]"
            />
          </div>
          <h2 className="text-2xl font-bold text-[#4A3524]">佛系卡皮巴拉 Mint 发射成功</h2>
          <p className="mt-2 text-sm text-[#8A7258]">你的代币和金库已经部署到 BNB Smart Chain</p>
          <div className="mt-6 space-y-3 text-left">
            <div className="rounded-xl border-2 border-dashed border-[#DFC9A4] bg-[#FFFDF6] p-4">
              <span className="text-xs text-[#8A7258]">交易哈希</span>
              <div className="mt-1 break-all font-mono text-xs text-[#4A3524]">{result.hash}</div>
            </div>
            {result.token && (
              <div className="rounded-xl border-2 border-dashed border-[#DFC9A4] bg-[#FFFDF6] p-4">
                <span className="text-xs text-[#8A7258]">代币合约</span>
                <div className="mt-1 break-all font-mono text-xs text-[#4A3524]">{result.token}</div>
              </div>
            )}
            {result.predicted && (
              <div className="rounded-xl border-2 border-dashed border-[#DFC9A4] bg-[#FFFDF6] p-4">
                <span className="text-xs text-[#8A7258]">预测地址</span>
                <div className="mt-1 break-all font-mono text-xs text-[#4A3524]">{result.predicted}</div>
              </div>
            )}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button className="capy-btn-main" onClick={() => navigate("/mint-launches")}>
              查看 Mint 已发射
            </button>
            <button className="capy-btn-ghost" onClick={() => setResult(null)}>
              继续部署
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-fade-in mx-auto max-w-7xl px-4 py-6 lg:py-8">
      {/* Hero / status strip */}
      <section className="capy-card relative mb-6 overflow-hidden">
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex items-start gap-4 lg:flex-1">
            <div className="relative">
              <img
                src="/logo.jpg"
                alt="佛系卡皮巴拉"
                className="relative h-16 w-16 rounded-2xl object-cover ring-2 ring-[#F0A568]"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="hand text-2xl font-black tracking-tight text-[#8A5F38] lg:text-4xl">
                  佛系卡皮巴拉 Mint
                </h1>
                <span className="rounded-md border border-dashed border-[#F0A568] bg-[#FDEBD7] px-2 py-0.5 text-[10px] font-bold text-[#8A5F38]">
                  LAUNCH
                </span>
              </div>
              <p className="mt-1.5 text-sm text-[#8A7258]">
                创造你的佛系生态资产，铸造独立 ERC20 和 Mint 金库。配置铸造、税收、奖励和接收钱包。
              </p>
              <p className="mt-1 text-xs text-[#B0A08A]">
                {wallet.isConnected
                  ? `${shortAddress(wallet.account || "")} · Factory ${shortAddress(mintLaunchpadConfig.factoryAddress)}`
                  : "连接钱包后会自动填入创建者接收地址"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-[560px]">
            {statusItems.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border-2 border-dashed border-[#EAD9B8] bg-[#FFFDF6] p-3 text-center"
              >
                <div className="text-xs text-[#B0A08A]">{item.label}</div>
                <div className="mt-1 text-sm font-bold text-[#4A3524]">{item.value}</div>
              </div>
            ))}
          </div>

          {wallet.isConnected && !wallet.isBSC && (
            <button className="capy-btn-main shrink-0" onClick={wallet.switchToBSC}>
              切换网络
            </button>
          )}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          {/* 01 Basic info */}
          <section className="capy-card">
            <div className="flex items-center gap-2 text-base font-semibold text-[#4A3524]">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#F5E7C2] text-[11px] font-bold text-[#8A5F38]">
                01
              </span>
              基础信息
              <span className="ml-auto text-xs font-normal text-[#B0A08A]">部署费 {mintCreationFeeLabel}</span>
            </div>
            <p className="mt-1 text-xs text-[#8A7258]">填写名称、符号、头像和项目简介。</p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#8A7258]">代币名称</label>
                <input
                  className="capy-input"
                  placeholder="输入代币名称"
                  value={form.tokenName}
                  onChange={(e) => updateForm("tokenName", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#8A7258]">代币符号</label>
                <input
                  className="capy-input"
                  placeholder="输入代币符号"
                  value={form.symbol}
                  onChange={(e) => updateForm("symbol", e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-medium text-[#8A7258]">头像图片</label>
              <label
                className={cn(
                  "flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed p-4 transition-all",
                  avatar
                    ? "border-[#F0A568] bg-[#FDEBD7]"
                    : "border-[#DFC9A4] bg-[#FFFDF6] hover:border-[#F0A568]",
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={avatarAccept}
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
                <span
                  className={cn(
                    "flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl",
                    avatar ? "bg-transparent" : "border border-[#DFC9A4] bg-[#FFFDF6]",
                  )}
                >
                  {avatar ? (
                    <img src={avatar} alt="avatar" className="h-full w-full object-cover" />
                  ) : (
                    <Plus className="h-6 w-6 text-[#B0A08A]" />
                  )}
                </span>
                <span className="flex-1">
                  <strong className="block text-sm text-[#4A3524]">
                    {avatar ? "头像已加入部署信息" : "上传项目头像"}
                  </strong>
                  <em className="mt-0.5 block text-xs not-italic text-[#B0A08A]">
                    支持 PNG、JPEG、SVG、GIF、WebP，建议小于 1MB
                  </em>
                </span>
              </label>
              {avatar && (
                <div className="mt-2 flex flex-wrap gap-2">
                  <label className="capy-btn-ghost cursor-pointer py-1.5 text-xs">
                    <ImagePlus className="h-3.5 w-3.5" />
                    更换
                    <input type="file" accept={avatarAccept} className="hidden" onChange={handleAvatarUpload} />
                  </label>
                  <button
                    className="inline-flex items-center gap-1 rounded-xl border border-dashed border-[#E8704F] bg-[#FFE3D6] px-3 py-1.5 text-xs font-bold text-[#E8704F] transition hover:bg-[#FFD5C2]"
                    onClick={() => setAvatar("")}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    移除
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-medium text-[#8A7258]">代币简介（选填）</label>
              <textarea
                className="capy-textarea min-h-[80px]"
                placeholder="简单介绍项目定位、玩法或社区信息"
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
              />
            </div>
          </section>

          {/* 02 Templates */}
          <section className="capy-card">
            <div className="flex items-center gap-2 text-base font-semibold text-[#4A3524]">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#F5E7C2] text-[11px] font-bold text-[#8A5F38]">
                02
              </span>
              选择合约模板
              <span className="ml-auto rounded-md border border-dashed border-[#F0A568] bg-[#FDEBD7] px-2 py-0.5 text-xs text-[#8A5F38]">
                {selectedTemplate.tag}
              </span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {mintTemplates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => setTemplateId(template.id)}
                  className={cn(
                    "flex flex-col gap-1 rounded-xl border-2 p-4 text-left transition-all",
                    templateId === template.id
                      ? "border-[#F0A568] bg-[#FDEBD7]"
                      : "border-[#EAD9B8] bg-[#FFFDF6] hover:border-[#F0A568]",
                  )}
                >
                  <span className="text-xs text-[#B0A08A]">{template.tag}</span>
                  <span className="font-semibold text-[#4A3524]">{template.name}</span>
                  <p className="text-xs text-[#8A7258]">{template.summary}</p>
                  {templateId === template.id && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {template.checks.map((check) => (
                        <span
                          key={check}
                          className="flex items-center gap-1 rounded bg-[#F5E7C2] px-1.5 py-0.5 text-[10px] text-[#8A5F38]"
                        >
                          <Check className="h-3 w-3" />
                          {check}
                        </span>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* 03 Mint config */}
          <section className="capy-card">
            <div className="flex items-center gap-2 text-base font-semibold text-[#4A3524]">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#F5E7C2] text-[11px] font-bold text-[#8A5F38]">
                03
              </span>
              Mint 配置
              <span className="ml-auto rounded-md border border-dashed border-[#8A5F38] bg-[#F5E7C2] px-2 py-0.5 text-xs text-[#8A5F38]">
                BNB
              </span>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#8A7258]">单次价格（BNB）</label>
                <input
                  className="capy-input"
                  value={form.mintPrice}
                  onChange={(e) =>
                    updateForm("mintPrice", e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1"))
                  }
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#8A7258]">总铸造次数</label>
                <input className="capy-input" value={form.mintCount} readOnly />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#8A7258]">公开铸造次数</label>
                <input
                  className="capy-input"
                  value={form.publicMintCount}
                  onChange={(e) => updateForm("publicMintCount", e.target.value.replace(/\D/g, ""))}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#8A7258]">白名单铸造次数</label>
                <input
                  className="capy-input"
                  value={form.whitelistMintCount}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    updateForm("whitelistMintCount", value);
                    setWhitelistEnabled(Number(value) > 0);
                  }}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#8A7258]">单钱包最多 Mint（0 = 不限制）</label>
                <input
                  className="capy-input"
                  value={form.maxMintPerWallet}
                  onChange={(e) => updateForm("maxMintPerWallet", e.target.value.replace(/\D/g, ""))}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#8A7258]">发行总量</label>
                <input
                  className="capy-input"
                  value={form.supply}
                  onChange={(e) => updateForm("supply", e.target.value.replace(/\D/g, ""))}
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl border-2 border-dashed border-[#EAD9B8] bg-[#FFFDF6] p-4">
              <div>
                <div className="text-sm font-medium text-[#4A3524]">开启白名单 Mint</div>
                <div className="text-xs text-[#B0A08A]">开启后，只有写入白名单的钱包可以 mint</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const next = !whitelistEnabled;
                  setWhitelistEnabled(next);
                  if (!next) {
                    updateForm("whitelistMintCount", "0");
                  } else if (Number(form.whitelistMintCount) <= 0) {
                    updateForm("whitelistMintCount", "30");
                  }
                }}
              >
                {whitelistEnabled ? (
                  <ToggleRight className="h-7 w-7 text-[#5F9461]" />
                ) : (
                  <ToggleLeft className="h-7 w-7 text-[#B0A08A]" />
                )}
              </button>
            </div>

            {whitelistEnabled && Number(form.whitelistMintCount || 0) > 0 && Number(form.publicMintCount || 0) <= 0 && (
              <div className="mt-3 rounded-xl border-2 border-dashed border-[#F0A568] bg-[#FDEBD7] p-3 text-xs text-[#8A5F38]">
                当前是纯白名单池：未加白钱包不能 Mint，白名单打满前公开不会开放。
              </div>
            )}
            {Number(form.maxMintPerWallet || 0) > 0 && (
              <div className="mt-3 rounded-xl border-2 border-dashed border-[#F0A568] bg-[#FDEBD7] p-3 text-xs text-[#8A5F38]">
                单钱包最多 {form.maxMintPerWallet} 份；转账即 Mint 也会受这个限制。
              </div>
            )}
          </section>

          {/* 04 Tax */}
          <section className="capy-card">
            <div className="flex items-center gap-2 text-base font-semibold text-[#4A3524]">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#F5E7C2] text-[11px] font-bold text-[#8A5F38]">
                04
              </span>
              买卖税与四项分配
              <span
                className={cn(
                  "ml-auto text-xs",
                  allocationTotal <= 100 ? "text-[#8A5F38]" : "text-[#E8704F]",
                )}
              >
                总计 {allocationTotal}%
              </span>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#8A7258]">买入税 {buyTax}%</label>
                <input
                  type="range"
                  min={0}
                  max={25}
                  step={0.5}
                  value={buyTax}
                  onChange={(e) => setBuyTax(Number(e.target.value))}
                  className="w-full accent-[#F0A568]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#8A7258]">卖出税 {sellTax}%</label>
                <input
                  type="range"
                  min={0}
                  max={25}
                  step={0.5}
                  value={sellTax}
                  onChange={(e) => setSellTax(Number(e.target.value))}
                  className="w-full accent-[#F0A568]"
                />
              </div>
            </div>

            <button
              type="button"
              className="mt-4 flex items-center gap-1 text-xs font-bold text-[#8A7258] hover:text-[#4A3524]"
              onClick={() => setAdvancedOpen((v) => !v)}
            >
              高级税收
              <ChevronDown className={cn("h-3 w-3 transition-transform", advancedOpen && "rotate-180")} />
            </button>
            {advancedOpen && (
              <div className="mt-4 grid gap-4 rounded-xl border-2 border-dashed border-[#EAD9B8] bg-[#FFFDF6] p-4 sm:grid-cols-2">
                {[
                  { key: "transferTax" as const, label: "转账税" },
                  { key: "addLiquidityTax" as const, label: "加池税" },
                  { key: "removeLiquidityTax" as const, label: "撤池税" },
                  { key: "launchProtectionTax" as const, label: "开盘保护税" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="mb-1.5 block text-xs font-medium text-[#8A7258]">
                      {label} {advancedTax[key]}%
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={25}
                      step={0.5}
                      value={advancedTax[key]}
                      onChange={(e) =>
                        setAdvancedTax((prev) => ({ ...prev, [key]: Number(e.target.value) }))
                      }
                      className="w-full accent-[#F0A568]"
                    />
                  </div>
                ))}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#8A7258]">保护区块</label>
                  <input
                    className="capy-input"
                    value={advancedTax.launchProtectionBlocks}
                    onChange={(e) =>
                      setAdvancedTax((prev) => ({
                        ...prev,
                        launchProtectionBlocks: e.target.value.replace(/\D/g, ""),
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#8A7258]">分红间隔（秒）</label>
                  <input
                    className="capy-input"
                    value={advancedTax.claimWaitSeconds}
                    onChange={(e) =>
                      setAdvancedTax((prev) => ({
                        ...prev,
                        claimWaitSeconds: e.target.value.replace(/\D/g, ""),
                      }))
                    }
                  />
                </div>
              </div>
            )}

            <div className="mt-5 grid gap-5 rounded-xl border-2 border-dashed border-[#EAD9B8] bg-[#FFFDF6] p-4 sm:grid-cols-[180px_1fr]">
              <AllocationRing allocation={allocation} total={allocationTotal} />
              <div className="space-y-4">
                {allocationMeta.map(({ key, label, hint }) => (
                  <div key={key}>
                    <label className="mb-1.5 block text-xs font-medium text-[#8A7258]">
                      {label} {allocation[key]}% <span className="text-[#B0A08A]">({hint})</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={1}
                      value={allocation[key]}
                      onChange={(e) => updateAllocation(key as AllocationKey, Number(e.target.value))}
                      className="w-full accent-[#F0A568]"
                    />
                  </div>
                ))}
                <p
                  className={cn(
                    "rounded-lg p-2.5 text-xs font-bold",
                    allocationTotal > 100
                      ? "border border-dashed border-[#E8704F] bg-[#FFE3D6] text-[#E8704F]"
                      : "border border-dashed border-[#F0A568] bg-[#FDEBD7] text-[#8A5F38]",
                  )}
                >
                  {allocationTotal > 100
                    ? "分配总和超过 100%，合约会拒绝部署。"
                    : `未分配 ${Math.max(0, 100 - allocationTotal)}%`}
                </p>
              </div>
            </div>
          </section>

          {/* 05 Receiver */}
          <section className="capy-card">
            <div className="flex items-center gap-2 text-base font-semibold text-[#4A3524]">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#F5E7C2] text-[11px] font-bold text-[#8A5F38]">
                05
              </span>
              接收与分红
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-medium text-[#8A7258]">接收钱包</label>
                <input
                  className="capy-input"
                  placeholder="0x..."
                  value={form.receiverWallet}
                  onChange={(e) => updateForm("receiverWallet", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#8A7258]">分红代币地址</label>
                <input
                  className="capy-input"
                  placeholder={`默认 USDT ${shortAddress(MINT_USDT_ADDRESS)}`}
                  value={form.rewardToken}
                  onChange={(e) => updateForm("rewardToken", e.target.value)}
                />
                <em className="mt-1 block text-xs not-italic text-[#B0A08A]">
                  默认 USDT：{shortAddress(MINT_USDT_ADDRESS)}
                </em>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#8A7258]">持仓门槛</label>
                <input
                  className="capy-input"
                  value={form.rewardThreshold}
                  onChange={(e) =>
                    updateForm("rewardThreshold", e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1"))
                  }
                />
              </div>
            </div>
          </section>

          {/* 06 Links */}
          <section className="capy-card">
            <div className="flex items-center gap-2 text-base font-semibold text-[#4A3524]">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#F5E7C2] text-[11px] font-bold text-[#8A5F38]">
                06
              </span>
              社区入口（选填）
            </div>
            <div className="mt-4 space-y-3">
              {[
                { icon: Send, label: "Telegram 链接", value: form.telegram, key: "telegram" },
                { icon: AtSign, label: "X / Twitter 链接", value: form.xLink, key: "xLink" },
                { icon: Globe2, label: "官网", value: form.website, key: "website" },
              ].map(({ icon: Icon, label, value, key }) => (
                <label
                  key={key}
                  className="flex items-center gap-3 rounded-xl border-2 border-dashed border-[#EAD9B8] bg-[#FFFDF6] p-3 transition-colors hover:border-[#F0A568]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#DFC9A4] bg-[#FFFDF6] text-[#8A5F38]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="w-28 shrink-0 text-sm text-[#8A7258]">{label}</span>
                  <input
                    className="capy-input border-0 bg-transparent px-0 focus:ring-0"
                    placeholder="https://..."
                    value={value}
                    onChange={(e) => updateForm(key as keyof MintFormState, e.target.value)}
                  />
                </label>
              ))}
            </div>
          </section>

          {!isMintLaunchpadConfigured && (
            <div className="flex items-center gap-2 rounded-xl border-2 border-dashed border-[#E8704F] bg-[#FFE3D6] p-4 text-sm text-[#E8704F]">
              <AlertCircle className="h-4 w-4 shrink-0" />
              Mint Factory 未配置，请先设置 VITE_MINT_FACTORY_ADDRESS 环境变量。
            </div>
          )}

          <button
            type="button"
            className={cn(
              "capy-btn-main group relative w-full overflow-hidden",
              deploying && "opacity-70",
            )}
            disabled={deploying || !isMintLaunchpadConfigured}
            onClick={handleDeploy}
          >
            <span className="relative flex items-center justify-center gap-2">
              {deploying ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : !wallet.isConnected ? (
                <Wallet className="h-4 w-4" />
              ) : !wallet.isBSC ? (
                <Shield className="h-4 w-4" />
              ) : (
                <Rocket className="h-4 w-4" />
              )}
              {deploying
                ? "佛系卡皮巴拉 Mint 部署中..."
                : !wallet.isConnected
                  ? "连接钱包"
                  : !wallet.isBSC
                    ? "切换网络"
                    : "确认佛系卡皮巴拉 Mint 部署"}
            </span>
          </button>
        </div>

        {/* Right sticky preview */}
        <div className="space-y-5">
          <div className="capy-card sticky top-24">
            <div className="text-center">
              {avatar ? (
                <img
                  src={avatar}
                  alt="preview"
                  className="mx-auto h-24 w-24 rounded-2xl object-cover ring-2 ring-[#EAD9B8]"
                />
              ) : (
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F5E7C2] via-[#FDEBD7] to-[#E6F0E0] text-3xl font-black text-[#8A5F38] ring-1 ring-[#F0A568]">
                  {form.symbol.slice(0, 2) || "🦫"}
                </div>
              )}
              <h3 className="mt-4 text-xl font-bold text-[#4A3524]">
                {form.tokenName || "佛系卡皮巴拉 Mint Token"}
              </h3>
              <p className="text-sm text-[#8A7258]">
                {form.symbol || "CAPY"} · {selectedTemplate.name}
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-dashed border-[#F0A568] bg-[#FDEBD7] px-2.5 py-1 text-[10px] font-medium text-[#8A5F38]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F0A568]" />
                佛系卡皮巴拉 Mint 发射台
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              {[
                { label: "模板", value: selectedTemplate.name },
                { label: "工厂", value: shortAddress(mintLaunchpadConfig.factoryAddress), mono: true },
                { label: "部署费", value: selectedTemplate.fee },
                { label: "付款代币", value: "BNB" },
                { label: "铸造份数", value: form.mintCount || "0" },
                { label: "每份代币", value: tokensPerMint.toLocaleString() },
                {
                  label: "单钱包上限",
                  value: Number(form.maxMintPerWallet || 0) > 0 ? form.maxMintPerWallet : "不限制",
                },
                { label: "白名单", value: whitelistEnabled ? "开启" : "关闭", highlight: whitelistEnabled },
                { label: "税率", value: `${buyTax}% / ${sellTax}%` },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between border-b border-dashed border-[#EAD9B8] pb-2 text-[#8A7258] last:border-0 last:pb-0"
                >
                  <span>{item.label}</span>
                  <span
                    className={cn(
                      item.mono && "font-mono",
                      item.highlight ? "text-[#8A5F38]" : "text-[#4A3524]",
                    )}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border-2 border-dashed border-[#EAD9B8] bg-[#FFFDF6] p-4">
              <div className="mb-3 text-xs font-bold text-[#8A7258]">税收分配</div>
              <AllocationRing allocation={allocation} total={allocationTotal} />
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                {allocationMeta.map(({ key, label, color }) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-[#8A7258]">{label}</span>
                    <span className="ml-auto text-[#4A3524]">{allocation[key]}%</span>
                  </div>
                ))}
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#EAD9B8]" />
                  <span className="text-[#8A7258]">未分配</span>
                  <span className="ml-auto text-[#4A3524]">{Math.max(0, 100 - allocationTotal)}%</span>
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-[#B0A08A]">
              <Info className="mb-1 inline h-3 w-3" /> 预览仅作参考，实际参数以链上交易为准。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
