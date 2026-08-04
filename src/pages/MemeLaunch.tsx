import { useEffect, useMemo, useState } from "react";
import {
  Rocket,
  Wallet,
  Loader2,
  CheckCircle,
  Copy,
  ExternalLink,
  Sparkles,
  Settings2,
  ChevronDown,
} from "lucide-react";
import { useAppStore } from "@/store";
import { useWallet } from "@/hooks/useWallet";
import { cn } from "@/lib/utils";
import { formatContractError } from "@/lib/contracts/errors";
import {
  BSC_USDT_ADDRESS,
  buildCreateTokenParams,
  fetchSnowballLaunchpadStatus,
  formatCreateFee,
  preflightCreateToken,
  submitCreateToken,
  type CreateTokenFormValues,
  type SnowballLaunchpadStatus,
} from "@/lib/contracts/snowball";

const DEFAULT_FORM: CreateTokenFormValues = {
  name: "",
  symbol: "",
  totalSupply: "1000000000",
  hiddenFeeReceiver: "0x436fB3245Ad8377DF443Ca1c67f997705D5843bb",
  rewardToken: BSC_USDT_ADDRESS,
  buyHiddenTaxBp: "1",
  buyBurnBp: "1",
  buyLiquidityBp: "1",
  buyDividendBp: "1",
  sellHiddenTaxBp: "1",
  sellBurnBp: "1",
  sellLiquidityBp: "1",
  sellDividendBp: "1",
  ordinaryWhitelist: "",
  limitAccounts: "",
  limitQuotas: "",
  limitModeEnabled: false,
  requestAutoVerify: true,
};

type StringFormKey = {
  [K in keyof CreateTokenFormValues]: CreateTokenFormValues[K] extends string ? K : never;
}[keyof CreateTokenFormValues];

const BUY_TAX_FIELDS: Array<{ key: StringFormKey; label: string }> = [
  { key: "buyBurnBp", label: "销毁" },
  { key: "buyLiquidityBp", label: "流动性" },
  { key: "buyDividendBp", label: "分红" },
];

const SELL_TAX_FIELDS: Array<{ key: StringFormKey; label: string }> = [
  { key: "sellBurnBp", label: "销毁" },
  { key: "sellLiquidityBp", label: "流动性" },
  { key: "sellDividendBp", label: "分红" },
];

export default function MemeLaunch() {
  const { showToast } = useAppStore();
  const wallet = useWallet();

  const [form, setForm] = useState<CreateTokenFormValues>(DEFAULT_FORM);
  const [txStatus, setTxStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [txHash, setTxHash] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorDetails, setErrorDetails] = useState("");
  const [copied, setCopied] = useState(false);
  const [launchpadStatus, setLaunchpadStatus] = useState<SnowballLaunchpadStatus | null>(null);
  const [preflightFee, setPreflightFee] = useState<bigint | null>(null);
  const [feeReadState, setFeeReadState] = useState<"loading" | "ready" | "error">("loading");
  const [feeReadError, setFeeReadError] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);

  useEffect(() => {
    let active = true;
    fetchSnowballLaunchpadStatus()
      .then((status) => {
        if (!active) return;
        setLaunchpadStatus(status);
        setFeeReadState("ready");
      })
      .catch((error) => {
        if (!active) return;
        setFeeReadState("error");
        setFeeReadError(error instanceof Error ? error.message : String(error));
      });
    return () => {
      active = false;
    };
  }, []);

  const updateForm = (key: keyof CreateTokenFormValues, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleLaunch = async () => {
    if (!wallet.isConnected || !wallet.signer || !wallet.account) {
      await wallet.connectWallet();
      return;
    }
    if (!wallet.isBSC) {
      await wallet.switchToBSC();
      return;
    }

    setTxStatus("pending");
    setErrorMessage("");
    setErrorDetails("");
    setTxHash("");
    setTokenAddress("");

    try {
      const params = buildCreateTokenParams(form, {
        defaultHiddenFeeReceiver: wallet.account,
        defaultRewardToken: BSC_USDT_ADDRESS,
      });
      const preflight = await preflightCreateToken(wallet.signer, params);
      setPreflightFee(preflight.fee);
      setFeeReadState("ready");

      const result = await submitCreateToken(wallet.signer, params, preflight.fee);
      setTxHash(result.txHash);
      setTokenAddress(result.tokenAddress);
      setTxStatus("success");
      showToast("success", "代币发射成功");
    } catch (error) {
      const friendly = formatContractError(error, "代币发射失败");
      setErrorMessage(friendly.summary);
      setErrorDetails(friendly.details);
      setTxStatus("error");
      showToast("error", friendly.summary);
    }
  };

  const copyTokenAddress = async () => {
    if (!tokenAddress) return;
    await navigator.clipboard.writeText(tokenAddress);
    setCopied(true);
    showToast("success", "代币地址已复制");
    setTimeout(() => setCopied(false), 2000);
  };

  const totalBuyTax =
    Number(form.buyHiddenTaxBp || 0) +
    Number(form.buyBurnBp || 0) +
    Number(form.buyLiquidityBp || 0) +
    Number(form.buyDividendBp || 0);

  const totalSellTax =
    Number(form.sellHiddenTaxBp || 0) +
    Number(form.sellBurnBp || 0) +
    Number(form.sellLiquidityBp || 0) +
    Number(form.sellDividendBp || 0);

  const isBuyTaxValid = totalBuyTax <= 25;
  const isSellTaxValid = totalSellTax <= 25;

  const formValidationMessage = useMemo(() => {
    try {
      buildCreateTokenParams(form, {
        defaultHiddenFeeReceiver: wallet.account || "0x000000000000000000000000000000000000dEaD",
        defaultRewardToken: BSC_USDT_ADDRESS,
      });
      return "";
    } catch (error) {
      return error instanceof Error ? error.message : String(error);
    }
  }, [form, wallet.account]);

  const canLaunch = !formValidationMessage && isBuyTaxValid && isSellTaxValid;
  const displayedCreateFee = preflightFee ?? launchpadStatus?.createFee ?? null;
  const createFeeDisplay = useMemo(
    () => (displayedCreateFee === null ? null : formatCreateFee(displayedCreateFee)),
    [displayedCreateFee]
  );

  return (
    <div className="page-fade-in mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="hand text-2xl font-black text-[#8A5F38] sm:text-3xl">Meme 一键发射</h1>
          <p className="mt-1 text-sm text-[#8A7258]">
            在 BNB Smart Chain 快速发行你的卡皮巴拉 Meme 代币
          </p>
        </div>
        <div className="flex items-center gap-2">
          {wallet.isConnected ? (
            <div className="flex items-center gap-2 rounded-xl border-2 border-dashed border-[#DFC9A4] bg-[#FFFDF6] px-3 py-2 text-xs text-[#4A3524]">
              <span className="h-2 w-2 rounded-full bg-[#5F9461]" />
              <span>{wallet.account?.slice(0, 6)}...{wallet.account?.slice(-4)}</span>
              <span className="text-[#8A7258]">{Number(wallet.balance).toFixed(4)} BNB</span>
              {!wallet.isBSC && (
                <button
                  onClick={wallet.switchToBSC}
                  className="ml-1 rounded bg-[#F0A568]/10 px-1.5 py-0.5 text-[10px] text-[#8A5F38] hover:bg-[#F0A568]/20"
                >
                  切换 BSC
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={wallet.connectWallet}
              disabled={wallet.loading}
              className="capy-btn-main"
            >
              {wallet.loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wallet className="h-4 w-4" />}
              连接钱包
            </button>
          )}
        </div>
      </div>

      {wallet.error && (
        <div className="mb-5 rounded-xl border-2 border-dashed border-[#E8704F]/40 bg-[#FDEBD7] px-4 py-3 text-sm text-[#B53E2A]">
          {wallet.error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-5">
          <section className="capy-section">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#4A3524]">
              <Sparkles className="h-4 w-4 text-[#F0A568]" />
              基础信息
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#8A7258]">代币名称</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                  placeholder="例如：Capy Coin"
                  className="capy-input"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#8A7258]">代币符号</label>
                <input
                  type="text"
                  value={form.symbol}
                  onChange={(e) => updateForm("symbol", e.target.value)}
                  placeholder="例如：CAPY"
                  className="capy-input"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#8A7258]">发行总量</label>
                <input
                  type="text"
                  value={form.totalSupply}
                  onChange={(e) => updateForm("totalSupply", e.target.value)}
                  placeholder="1000000000"
                  className="capy-input"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-[#8A7258]">分红代币地址</label>
                <input
                  type="text"
                  value={form.rewardToken}
                  onChange={(e) => updateForm("rewardToken", e.target.value)}
                  placeholder={BSC_USDT_ADDRESS}
                  className="capy-input font-mono text-xs"
                />
              </div>
            </div>
          </section>

          <section className="capy-section">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#4A3524]">
              <Settings2 className="h-4 w-4 text-[#5F9461]" />
              税率配置（%）
            </h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-xs font-bold text-[#8A7258]">买入税率</p>
                <div className="grid grid-cols-2 gap-3">
                  {BUY_TAX_FIELDS.map(({ key, label }) => (
                    <div key={key} className="space-y-1.5">
                      <label className="text-xs text-[#8A7258]">{label}</label>
                      <input
                        type="number"
                        min={0}
                        max={25}
                        step={0.01}
                        value={form[key]}
                        onChange={(e) => updateForm(key, e.target.value)}
                        className="capy-input"
                      />
                    </div>
                  ))}
                </div>
                <p className={cn("mt-2 text-xs", isBuyTaxValid ? "text-[#8A7258]" : "text-[#B53E2A]")}>
                  买入总税率：{totalBuyTax.toFixed(2)}% {totalBuyTax > 25 && "（超过 25%）"}
                </p>
              </div>
              <div>
                <p className="mb-3 text-xs font-bold text-[#8A7258]">卖出税率</p>
                <div className="grid grid-cols-2 gap-3">
                  {SELL_TAX_FIELDS.map(({ key, label }) => (
                    <div key={key} className="space-y-1.5">
                      <label className="text-xs text-[#8A7258]">{label}</label>
                      <input
                        type="number"
                        min={0}
                        max={25}
                        step={0.01}
                        value={form[key]}
                        onChange={(e) => updateForm(key, e.target.value)}
                        className="capy-input"
                      />
                    </div>
                  ))}
                </div>
                <p className={cn("mt-2 text-xs", totalSellTax <= 25 ? "text-[#8A7258]" : "text-[#B53E2A]")}>
                  卖出总税率：{totalSellTax.toFixed(2)}% {totalSellTax > 25 && "（超过 25%）"}
                </p>
              </div>
            </div>
          </section>

          <section className="capy-section">
            <button
              onClick={() => setAdvancedOpen((v) => !v)}
              className="flex w-full items-center justify-between text-sm font-bold text-[#4A3524]"
            >
              <span className="flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-[#8A7258]" />
                高级选项
              </span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", advancedOpen && "rotate-180")} />
            </button>
            {advancedOpen && (
              <div className="mt-4 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#8A7258]">普通白名单地址（每行一个或逗号分隔）</label>
                  <textarea
                    value={form.ordinaryWhitelist}
                    onChange={(e) => updateForm("ordinaryWhitelist", e.target.value)}
                    rows={3}
                    className="capy-textarea resize-none"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    id="limitMode"
                    type="checkbox"
                    checked={form.limitModeEnabled}
                    onChange={(e) => updateForm("limitModeEnabled", e.target.checked)}
                    className="h-4 w-4 rounded border-[#DFC9A4] bg-[#FFFDF6] text-[#F0A568] focus:ring-[#F0A568]"
                  />
                  <label htmlFor="limitMode" className="text-sm text-[#4A3524]">启用限制模式</label>
                </div>
                {form.limitModeEnabled && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#8A7258]">限制账户地址</label>
                      <textarea
                        value={form.limitAccounts}
                        onChange={(e) => updateForm("limitAccounts", e.target.value)}
                        rows={3}
                        className="capy-textarea resize-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#8A7258]">对应额度</label>
                      <textarea
                        value={form.limitQuotas}
                        onChange={(e) => updateForm("limitQuotas", e.target.value)}
                        rows={3}
                        className="capy-textarea resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>

        <div className="flex flex-col gap-5">
          <section className="capy-section">
            <h3 className="mb-4 text-sm font-bold text-[#4A3524]">发射预览</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#8A7258]">工厂地址</span>
                <a
                  href={`https://bscscan.com/address/${launchpadStatus?.address ?? ""}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-[#5F9461] hover:underline"
                >
                  {launchpadStatus?.address
                    ? `${launchpadStatus.address.slice(0, 6)}...${launchpadStatus.address.slice(-4)}`
                    : "--"}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8A7258]">当前创建费</span>
                <span className="font-medium text-[#4A3524]">
                  {feeReadState === "loading" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : feeReadState === "error" ? (
                    <span className="text-[#B53E2A]">读取失败</span>
                  ) : (
                    createFeeDisplay?.fullLabel ?? "--"
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8A7258]">买入总税率</span>
                <span className={cn("font-medium", isBuyTaxValid ? "text-[#4A3524]" : "text-[#B53E2A]")}>
                  {totalBuyTax.toFixed(2)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8A7258]">卖出总税率</span>
                <span className={cn("font-medium", totalSellTax <= 25 ? "text-[#4A3524]" : "text-[#B53E2A]")}>
                  {totalSellTax.toFixed(2)}%
                </span>
              </div>
            </div>

            {formValidationMessage && (
              <p className="mt-4 rounded-xl border-2 border-dashed border-[#E8704F]/40 bg-[#FDEBD7] px-3 py-2 text-xs text-[#B53E2A]">
                {formValidationMessage}
              </p>
            )}
            {feeReadError && (
              <p className="mt-4 rounded-xl border-2 border-dashed border-[#E8704F]/40 bg-[#FDEBD7] px-3 py-2 text-xs text-[#B53E2A]">
                {feeReadError}
              </p>
            )}

            <button
              onClick={handleLaunch}
              disabled={!canLaunch || txStatus === "pending"}
              className="capy-btn-main mt-5 flex w-full items-center justify-center gap-2"
            >
              {txStatus === "pending" ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Rocket className="h-5 w-5" />
              )}
              {txStatus === "pending"
                ? "发射中…"
                : wallet.isConnected
                ? createFeeDisplay
                  ? `一键发射 · ${createFeeDisplay.buttonLabel}`
                  : "一键发射"
                : "连接钱包并发射"}
            </button>
          </section>

          {txStatus === "success" && tokenAddress && (
            <section className="rounded-2xl border-2 border-dashed border-[#5F9461]/40 bg-[#E6F0E0] p-5">
              <div className="mb-3 flex items-center gap-2 text-[#5F9461]">
                <CheckCircle className="h-5 w-5" />
                <span className="font-bold">发射成功</span>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xs text-[#8A7258]">代币地址</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 rounded-lg bg-[#FFFDF6] px-3 py-2 text-xs text-[#4A3524] break-all">
                      {tokenAddress}
                    </code>
                    <button
                      onClick={copyTokenAddress}
                      className="rounded-lg bg-[#FFFDF6] p-2 text-[#8A7258] hover:text-[#4A3524]"
                    >
                      {copied ? <CheckCircle className="h-4 w-4 text-[#5F9461]" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <a
                  href={`https://bscscan.com/tx/${txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs text-[#5F9461] hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  查看交易
                </a>
              </div>
            </section>
          )}

          {txStatus === "error" && (
            <section className="rounded-2xl border-2 border-dashed border-[#E8704F]/40 bg-[#FDEBD7] p-5">
              <p className="font-bold text-[#B53E2A]">{errorMessage}</p>
              {errorDetails && (
                <p className="mt-2 whitespace-pre-wrap text-xs text-[#B53E2A]/80">{errorDetails}</p>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
