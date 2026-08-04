import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Wallet } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleConnect = async () => {
    if (wallet.isConnected) {
      wallet.disconnectWallet();
      showToast("info", "已断开钱包连接");
    } else {
      await wallet.connectWallet();
    }
  };

  const NavLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) => {
    const isHash = to.startsWith("#");
    if (isHash && isHome) {
      return (
        <a
          href={to}
          onClick={(e) => {
            e.preventDefault();
            onClick?.();
            const el = document.querySelector(to);
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {children}
        </a>
      );
    }
    if (isHash && !isHome) {
      return <Link to={`/${to}`} onClick={onClick}>{children}</Link>;
    }
    return <Link to={to} onClick={onClick}>{children}</Link>;
  };

  const menuItems = [
    { to: "#top", label: "首页" },
    { to: "/mint", label: "Mint发射" },
    { to: "/mint-launches", label: "Mint已发射" },
    { to: "/meme-launch", label: "Meme发射" },
    { to: "/game", label: "游戏" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b-2 border-dashed border-[#DFC9A4] bg-[rgba(255,251,240,.92)] backdrop-blur-sm">
      <nav className="wrap mx-auto flex h-[70px] max-w-[1060px] items-center justify-between px-4 sm:px-6">
        <Link to="/" className="brand flex items-center gap-2 sm:gap-3">
          <img
            src="/logo.jpg"
            alt="卡皮巴拉 logo"
            className="h-9 w-9 rounded-full border-[3px] border-white object-cover shadow-md sm:h-11 sm:w-11"
            style={{ transform: "rotate(-4deg)" }}
          />
          <span className="hand text-base tracking-wide text-[#4A3524] sm:text-lg">
            佛系卡皮巴拉 <b className="text-[#8A5F38]">CAPY</b>
          </span>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-bold text-[#4A3524] md:flex">
          <NavLink to="#top">首页</NavLink>
          <NavLink to="/mint">Mint发射</NavLink>
          <NavLink to="/mint-launches">Mint已发射</NavLink>
          <NavLink to="/meme-launch">Meme发射</NavLink>
          <NavLink to="/game">游戏</NavLink>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleConnect}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-[#B07C4F] bg-white px-3 py-2 text-xs font-extrabold text-[#8A5F38] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#F5E7C2] sm:px-4 sm:text-sm"
            style={{ transform: "rotate(-1.5deg)" }}
          >
            <Wallet className="h-4 w-4" />
            {wallet.loading
              ? "连接中..."
              : wallet.isConnected
                ? shortAddress(wallet.account)
                : "连接钱包"}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-dashed border-[#B07C4F] bg-white text-[#8A5F38] shadow-sm transition hover:bg-[#F5E7C2] md:hidden"
            aria-label="菜单"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t-2 border-dashed border-[#DFC9A4] bg-[rgba(255,251,240,.98)] px-4 py-3 md:hidden">
          <div className="flex flex-col gap-2 text-sm font-bold text-[#4A3524]">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
              >
                <span className="block rounded-xl px-3 py-2.5 transition hover:bg-[#F5E7C2]">
                  {item.label}
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}