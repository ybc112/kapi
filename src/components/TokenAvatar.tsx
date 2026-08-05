import { useState } from "react";
import { cn } from "@/lib/utils";

interface TokenAvatarProps {
  src?: string;
  symbol: string;
  token: string;
  size?: number;
  className?: string;
}

const PALETTE = [
  ["#F0A568", "#E8C547"],
  ["#8A5F38", "#D9A774"],
  ["#5F9461", "#6FA8A4"],
  ["#C97B63", "#E8B89D"],
  ["#7D8C6B", "#A68B5B"],
  ["#B87E5E", "#F5E7C2"],
  ["#6FA8A4", "#8FC1A9"],
  ["#D9A774", "#F0A568"],
];

function hashAddress(address: string): number {
  let hash = 0;
  for (let i = 0; i < address.length; i += 1) {
    hash = (hash << 5) - hash + address.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function TokenAvatar({ src, symbol, token, size = 56, className }: TokenAvatarProps) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={symbol}
        className={cn("rounded-xl object-cover ring-2 ring-[#EAD9B8]", className)}
        style={{ width: size, height: size }}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  const hash = hashAddress(token || symbol || "0x");
  const [from, to] = PALETTE[hash % PALETTE.length];
  const angle = 45 + (hash % 90);
  const overlayX = 20 + (hash % 60);
  const overlayY = 20 + ((hash >> 4) % 60);

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-xl ring-2 ring-[#EAD9B8] font-black text-white/90",
        className
      )}
      style={{
        width: size,
        height: size,
        backgroundImage: `radial-gradient(circle at ${overlayX}% ${overlayY}%, rgba(255,255,255,0.25) 0%, transparent 40%), linear-gradient(${angle}deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      <span className="drop-shadow-sm" style={{ fontSize: Math.max(12, size * 0.36) }}>
        {(symbol || "🦫").slice(0, 2)}
      </span>
    </div>
  );
}
