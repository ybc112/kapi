import { useAppStore } from "@/store";
import { CheckCircle, Info, X, XCircle } from "lucide-react";

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const colors = {
  success: "border-[#5F9461] text-[#5F9461]",
  error: "border-[#E8704F] text-[#E8704F]",
  info: "border-[#8A5F38] text-[#8A5F38]",
};

export default function Toast() {
  const { toasts, removeToast } = useAppStore();
  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 flex-col items-center gap-2">
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex min-w-[260px] max-w-[90vw] items-center gap-3 rounded-2xl border-2 border-dashed bg-[#FFFDF6] px-5 py-3 shadow-[0_10px_24px_rgba(107,79,51,.2)] ${colors[toast.type]}`}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span className="flex-1 text-sm font-extrabold text-[#4A3524]">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-[#8A7258] hover:text-[#4A3524]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
