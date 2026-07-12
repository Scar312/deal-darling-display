import { useEffect, useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import saladImg from "@/assets/uber/bogo.png";

interface PromotionsSheetProps {
  open: boolean;
  onClose: () => void;
  codeApplied: string | null;
  onApplyCode: (code: string) => void;
  onRemoveCode: () => void;
  fourOffSelected: boolean;
  onToggleFourOff: () => void;
  couponImg: string;
}

export function PromotionsSheet({
  open,
  onClose,
  codeApplied,
  onApplyCode,
  onRemoveCode,
  fourOffSelected,
  onToggleFourOff,
  couponImg,
}: PromotionsSheetProps) {
  const [promoMode, setPromoMode] = useState(false);
  const [code, setCode] = useState("");
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);

  // Track the visual viewport so the sheet (and the Add promo button)
  // shrinks and stays visible when the mobile keyboard opens.
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => {
      const keyboardOpen = vv.height < window.innerHeight - 80;
      setViewportHeight(keyboardOpen ? vv.height : null);
    };
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    update();
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);

  const closeAll = () => {
    setPromoMode(false);
    setCode("");
    onClose();
  };

  const handleAdd = () => {
    if (code.trim().length > 0) {
      onApplyCode(code.trim().toUpperCase());
      setCode("");
      setPromoMode(false);
    }
  };

  return (
    <div
      style={viewportHeight ? { height: viewportHeight } : undefined}
      className={`fixed inset-x-0 top-0 z-50 mx-auto flex h-[100dvh] w-full max-w-[480px] flex-col bg-white transition-transform duration-300 ease-out ${
        open ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      {/* Header */}
      <div className="relative flex items-center justify-center px-4 pb-3 pt-4">
        {promoMode ? null : (
          <button
            onClick={closeAll}
            aria-label="Close"
            className="absolute left-3 top-3.5 flex h-9 w-9 items-center justify-center"
          >
            <X className="h-6 w-6" strokeWidth={2.5} />
          </button>
        )}
        <h2 className="text-[17px] font-bold">Promotions</h2>
      </div>

      {promoMode ? (
        <div className="flex min-h-0 flex-1 flex-col px-4 pt-1">
          <div className="flex items-center gap-3 rounded-full bg-[#f3f3f3] px-4 py-3">
            <button onClick={() => setPromoMode(false)} aria-label="Back">
              <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
            </button>
            <input
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter promo code"
              className="flex-1 bg-transparent text-[16px] font-medium text-foreground placeholder:text-[#6b6b6b] focus:outline-none"
            />
          </div>
          {/* Add promo pinned at the bottom; stays above the keyboard */}
          <div className="mt-auto pb-4 pt-3">
            <button
              onClick={handleAdd}
              className="w-full rounded-xl bg-black py-3.5 text-[16px] font-semibold text-white active:opacity-90"
            >
              Add promo
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-4 pb-8">
          {/* Enter promo pill */}
          <button
            onClick={() => setPromoMode(true)}
            className="mt-1 flex w-full items-center gap-3 rounded-full bg-[#f3f3f3] px-4 py-3 text-left"
          >
            <img src={couponImg} alt="" className="h-5 w-5 object-contain" />
            <span className="text-[16px] font-medium text-[#6b6b6b]">Enter promo code</span>
          </button>

          {codeApplied && (
            <div className="mt-4 flex items-center justify-between rounded-xl border border-[#111] bg-white px-4 py-3">
              <div>
                <div className="text-[15px] font-bold">Promo code applied</div>
                <div className="text-[13px] text-[#5a5a5a]">
                  Code: {codeApplied} · 85% off
                </div>
              </div>
              <button
                onClick={onRemoveCode}
                aria-label="remove promo"
                className="text-[14px] font-semibold underline"
              >
                Remove
              </button>
            </div>
          )}

          {/* Stackable */}
          <div className="mt-6">
            <h3 className="text-[19px] font-extrabold leading-tight">
              Promotions you can stack
            </h3>
            <p className="mt-0.5 text-[14px] font-semibold text-[#3a3a3a]">
              Use with other promotions
            </p>

            <div className="mt-3 rounded-2xl border border-[#e6e6e6] bg-[#fafafa] p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="text-[22px] font-extrabold leading-tight">
                    Buy 1, get 1 free
                  </div>
                  <p className="mt-1.5 text-[14px] leading-snug text-[#5a5a5a]">
                    Valid for current order while supplies last
                  </p>
                  <p className="mt-1 text-[14px] leading-snug text-[#5a5a5a]">
                    Use at Dunkin' · Unlimited until Sep 3…
                  </p>
                </div>
                <img src={saladImg} alt="" className="h-14 w-14 object-contain" />
              </div>
              <div className="mt-4 flex items-center gap-5">
                <button className="rounded-full bg-[#e8e8e8] px-5 py-2 text-[14px] font-semibold">
                  Shop
                </button>
                <button className="text-[14px] font-semibold">Details</button>
              </div>
            </div>
          </div>

          {/* One-per-order */}
          <div className="mt-6">
            <h3 className="text-[19px] font-extrabold leading-tight">
              One-per-order promotions
            </h3>
            <p className="mt-0.5 text-[14px] font-semibold text-[#3a3a3a]">
              Limit of one per order
            </p>

            <div className="mt-3 rounded-2xl border-2 border-black bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="text-[22px] font-extrabold leading-tight">$4 off</div>
                  <p className="mt-1.5 text-[14px] leading-snug text-[#5a5a5a]">
                    Valid for current order while supplies last
                  </p>
                  <p className="mt-1 text-[14px] leading-snug text-[#5a5a5a]">
                    Use at Dunkin' · $16 minimum order (…
                  </p>
                </div>
                <img src={saladImg} alt="" className="h-14 w-14 object-contain" />
              </div>
              <div className="mt-4 flex items-center gap-5">
                <button
                  onClick={onToggleFourOff}
                  className={`rounded-full px-5 py-2 text-[14px] font-semibold ${
                    fourOffSelected ? "bg-black text-white" : "bg-[#e8e8e8] text-black"
                  }`}
                >
                  {fourOffSelected ? "Selected" : "Select"}
                </button>
                <button className="text-[14px] font-semibold">Details</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
