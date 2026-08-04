import { useCallback, useEffect, useState } from "react";
import { BrowserProvider, formatEther, JsonRpcSigner, type Eip1193Provider } from "ethers";

const BSC_RPC_URL = "https://bsc-rpc.publicnode.com";
const BSC_CHAIN_ID = 56;

type EthereumProvider = Eip1193Provider & {
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
};

interface EthereumWindow extends Window {
  ethereum?: EthereumProvider;
}

export function useWallet() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<string>("");
  const [chainId, setChainId] = useState<number>(0);
  const [balance, setBalance] = useState<string>("0");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const hasMetaMask = typeof window !== "undefined" && Boolean((window as EthereumWindow).ethereum);

  const updateAccountState = useCallback(async (newProvider: BrowserProvider, address: string) => {
    setAccount(address);
    const network = await newProvider.getNetwork();
    const newChainId = Number(network.chainId);
    setChainId(newChainId);
    const newBalance = await newProvider.getBalance(address);
    setBalance(parseFloat(formatEther(newBalance)).toFixed(4));
  }, []);

  const connectWallet = useCallback(async () => {
    if (!hasMetaMask) {
      setError("未检测到 MetaMask，请安装后重试");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const eth = (window as EthereumWindow).ethereum!;
      const newProvider = new BrowserProvider(eth);
      const accounts = (await eth.request?.({ method: "eth_requestAccounts" })) as string[] | undefined;
      if (!accounts || accounts.length === 0) {
        throw new Error("未获得钱包授权");
      }
      const newSigner = await newProvider.getSigner();
      setProvider(newProvider);
      setSigner(newSigner);
      await updateAccountState(newProvider, accounts[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "连接钱包失败");
    } finally {
      setLoading(false);
    }
  }, [hasMetaMask, updateAccountState]);

  const disconnectWallet = useCallback(() => {
    setProvider(null);
    setSigner(null);
    setAccount("");
    setChainId(0);
    setBalance("0");
    setError("");
  }, []);

  const switchToBSC = useCallback(async () => {
    if (!hasMetaMask) return;
    const eth = (window as EthereumWindow).ethereum!;
    try {
      await eth.request?.({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${BSC_CHAIN_ID.toString(16)}` }],
      });
    } catch (switchError: unknown) {
      const code = (switchError as { code?: number }).code;
      if (code === 4902) {
        try {
          await eth.request?.({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${BSC_CHAIN_ID.toString(16)}`,
                chainName: "BNB Smart Chain",
                nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
                rpcUrls: [BSC_RPC_URL],
                blockExplorerUrls: ["https://bscscan.com"],
              },
            ],
          });
        } catch {
          setError("添加 BSC 网络失败");
        }
      } else {
        setError("切换网络失败");
      }
    }
  }, [hasMetaMask]);

  useEffect(() => {
    if (!hasMetaMask || !provider) return;

    const eth = (window as EthereumWindow).ethereum!;
    const handleAccountsChanged = (accounts: unknown) => {
      const list = accounts as string[];
      if (list.length === 0) {
        disconnectWallet();
      } else if (list[0] !== account) {
        const newProvider = new BrowserProvider(eth);
        setProvider(newProvider);
        newProvider.getSigner().then(setSigner).catch(() => setSigner(null));
        updateAccountState(newProvider, list[0]);
      }
    };
    const handleChainChanged = () => {
      if (!account) return;
      const newProvider = new BrowserProvider(eth);
      setProvider(newProvider);
      newProvider.getSigner().then(setSigner).catch(() => setSigner(null));
      updateAccountState(newProvider, account);
    };

    eth.on?.("accountsChanged", handleAccountsChanged);
    eth.on?.("chainChanged", handleChainChanged);
    return () => {
      eth.removeListener?.("accountsChanged", handleAccountsChanged);
      eth.removeListener?.("chainChanged", handleChainChanged);
    };
  }, [hasMetaMask, provider, account, disconnectWallet, updateAccountState]);

  return {
    hasMetaMask,
    provider,
    signer,
    account,
    chainId,
    balance,
    isBSC: chainId === BSC_CHAIN_ID,
    isConnected: Boolean(account && signer),
    loading,
    error,
    connectWallet,
    disconnectWallet,
    switchToBSC,
  };
}
