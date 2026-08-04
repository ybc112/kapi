import { Link, useLocation } from "react-router-dom";
import { Wallet } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { useAppStore } from "@/store";

function shortAddress(address: string) {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
}

export default function Header() {
  const wallet = useWallet();
  const { showToast } = useAppStore();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleConnect = async () => {
    if (wallet.isConnected) {
      wallet.disconnectWallet();
      showToast("info", "已断开钱包连接");
    } else {
      await wallet.connectWallet();
    }
  };

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
    const isHash = to.startsWith("#");
    if (isHash && isHome) {
      return (
        <a href={to} onClick={(e) => {
          e.preventDefault();
          const el = document.querySelector(to);
          el?.scrollIntoView({ behavior: "smooth" });
        }}>
          {children}
        </a>
      );
    }
    if (isHash && !isHome) {
      return <Link to={`/${to}`}>{children}</Link>;
    }
    return <Link to={to}>{children}</Link>;
  };

  return (
    <header className="sticky top-0 z-50 border-b-2 border-dashed border-[#DFC9A4] bg-[rgba(255,251,240,.92)] backdrop-blur-sm">
      <nav className="wrap mx-auto flex h-[70px] max-w-[1060px] items-center justify-between px-6">
        <Link to="/" className="brand flex items-center gap-3">
          <img
            src="/logo.jpg"
            alt="卡皮巴拉 logo"
            className="h-11 w-11 rounded-full border-[3px] border-white object-cover shadow-md"
            style={{ transform: "rotate(-4deg)" }}
          />
          <span className="hand text-lg tracking-wide text-[#4A3524]">
            佛系卡皮巴拉 <b className="text-[#8A5F38]">CAPY</b>
          </span>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-bold text-[#4A3524] md:flex">
          <NavLink to="#top">首页</NavLink>
          <NavLink to="#bulletin">双现金流</NavLink>
          <NavLink to="#tickets">游戏生态</NavLink>
          <NavLink to="/mint">Mint发射</NavLink>
          <NavLink to="/mint-launches">Mint已发射</NavLink>
          <NavLink to="/meme-launch">Meme发射</NavLink>
          <NavLink to="/game">游戏</NavLink>
        </div>

        <button
          onClick={handleConnect}
          className="inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-[#B07C4F] bg-white px-4 py-2 text-sm font-extrabold text-[#8A5F38] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#F5E7C2]"
          style={{ transform: "rotate(-1.5deg)" }}
        >
          <Wallet className="h-4 w-4" />
          {wallet.loading
            ? "连接中..."
            : wallet.isConnected
              ? shortAddress(wallet.account)
              : "连接钱包"}
        </button>
      </nav>
    </header>
  );
}
