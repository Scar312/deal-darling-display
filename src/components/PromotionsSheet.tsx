import { useEffect, useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const mediaPath = "/assets/all-images/png/media";
const burgerImg = `${mediaPath}/burger.jpg`;
const saladImg = `${mediaPath}/salad-promo.png`;

interface PromotionsSheetProps {
  open: boolean;
  onClose: () => void;
  codeApplied: string | null;
  onApplyCode: (code: string) => void;
  onRemoveCode: () => void;
  fourOffSelected: boolean;
  onToggleFourOff: () => void;
  couponImg: string;
  discountImg: string;
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
  discountImg,
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
      aria-hidden={!open}
      inert={!open}
      className={`fixed inset-x-0 top-0 z-50 mx-auto flex h-[100dvh] w-full max-w-[480px] flex-col bg-background text-foreground transition-transform duration-300 ease-out ${
        open ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <div className="relative flex h-[72px] shrink-0 items-center justify-center px-4">
        <Button
          variant="ghost"
          size="icon"
          tabIndex={open ? 0 : -1}
          onClick={promoMode ? () => setPromoMode(false) : closeAll}
          aria-label={promoMode ? "Back" : "Close"}
          className="absolute left-4 h-10 w-10"
        >
          {promoMode ? <ArrowLeft className="h-6 w-6" /> : (
            <X className="h-6 w-6" strokeWidth={1.8} />
          )}
        </Button>
        <h2 className="text-[19px] font-semibold">Promotions</h2>
      </div>

      {promoMode ? (
        <div className="flex min-h-0 flex-1 flex-col px-4 pb-[env(safe-area-inset-bottom)] pt-1">
          <label className="flex h-[48px] shrink-0 items-center gap-3 rounded-full bg-checkout-surface px-5">
            <img src={couponImg} alt="" className="h-5 w-5 shrink-0 object-contain" />
            <input
              autoFocus
              value={code}
              onChange={(event) => setCode(event.target.value.toUpperCase())}
              placeholder="Enter promo code"
              aria-label="Enter promo code"
              autoCapitalize="characters"
              autoCorrect="off"
              spellCheck={false}
              style={{ textTransform: "uppercase" }}
              className="min-w-0 flex-1 bg-transparent text-[17px] font-medium uppercase text-foreground placeholder:normal-case placeholder:text-checkout-muted focus:outline-none"
            />
          </label>
          <div className="mt-auto pt-4">
            <Button
              onClick={handleAdd}
              disabled={!code.trim()}
              className="h-[58px] w-full rounded-xl bg-foreground text-[18px] font-medium text-background hover:bg-foreground/90"
            >
              Add promo
            </Button>
          </div>
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8">
          <Button
            variant="ghost"
            onClick={() => setPromoMode(true)}
            tabIndex={open ? 0 : -1}
            className="mt-1 flex h-[48px] w-full justify-start gap-3 rounded-full bg-checkout-surface px-5 text-left hover:bg-checkout-surface"
          >
            <img src={couponImg} alt="" className="h-5 w-5 shrink-0 object-contain" />
            <span className="text-[17px] font-semibold text-checkout-muted">Enter promo code</span>
          </Button>

          {codeApplied && (
            <div className="mt-4 flex items-center justify-between gap-3 border-y border-checkout-separator py-4">
              <div>
                <div className="text-[16px] font-medium text-checkout-green">Promo code applied</div>
                <div className="mt-1 text-[14px] text-checkout-muted">Code: {codeApplied} · 87% off</div>
              </div>
              <Button
                variant="link"
                tabIndex={open ? 0 : -1}
                onClick={onRemoveCode}
                className="px-2 text-[14px] font-medium text-checkout-green"
              >
                Remove
              </Button>
            </div>
          )}

          <section className="mt-7">
            <h3 className="text-[21px] font-semibold leading-tight">Promotions you can stack</h3>
            <p className="mt-1 text-[15px] font-medium">Use with other promotions</p>
            <PromotionCard title="Free Item on $15+" image={saladImg} selected={false}>
              <p>Valid for current order while supplies last</p>
              <p>Get 1 of this item for free with this order when you spend at least $15 (excluding…</p>
            </PromotionCard>
          </section>

          <section className="mt-7">
            <h3 className="text-[21px] font-semibold leading-tight">One-per-order promotions</h3>
            <p className="mt-1 text-[15px] font-medium">Limit of one per order</p>
            <PromotionCard title="Discounted Delivery Fee on us" image={discountImg} selected>
              <p>Use by Dec 3, 2026 9 PM</p>
              <p>For 3 delivery orders · Only redeemable on delivery orders · Restaurant orders…</p>
            </PromotionCard>
            <PromotionCard
              title="Discounted Service Fee on us"
              image={discountImg}
              selected={fourOffSelected}
              onToggle={onToggleFourOff}
            >
              <p>Use by Dec 3, 2026 9 PM</p>
              <p>For 3 delivery orders · Only redeemable on delivery orders · Restaurant orders…</p>
            </PromotionCard>
          </section>

          <div className="relative mt-7 overflow-hidden rounded-[22px] bg-checkout-surface">
            <img src={burgerImg} alt="Burger" className="absolute inset-y-0 right-0 h-full w-[32%] object-cover object-center" />
            <div className="relative z-10 flex min-h-[132px] max-w-[75%] flex-col justify-between p-4">
              <p className="text-[17px] font-semibold leading-snug">$0 Delivery Fee + up to 10% off with Uber One</p>
              <Button variant="secondary" className="h-9 w-fit rounded-full px-4 text-[14px]">Try free for 4 weeks</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PromotionCard({
  title,
  image,
  selected,
  onToggle,
  children,
}: {
  title: string;
  image: string | null;
  selected: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <article className={`mt-4 rounded-[14px] border-2 bg-background px-[15px] py-4 ${selected ? "border-foreground" : "border-checkout-separator"}`}>
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <h4 className="text-[23px] font-bold leading-[1.18] tracking-[-0.01em]">{title}</h4>
          <div className="mt-2 text-[14.5px] font-medium leading-[1.4] text-checkout-muted">
            {children}
            {showDetails && <p>Valid on eligible McDonald&apos;s delivery orders. Conditions apply.</p>}
          </div>
        </div>
        {image ? (
          <img src={image} alt="" className="mt-1 h-[50px] w-[50px] shrink-0 object-contain" />
        ) : null}
      </div>
      <div className="mt-4 flex items-center gap-5">
        <Button
          variant={selected ? "default" : "secondary"}
          onClick={onToggle}
          className={`h-10 rounded-full px-5 text-[15px] font-medium ${selected ? "bg-foreground text-background hover:bg-foreground/90" : ""}`}
        >
          {selected ? "Selected" : "Shop"}
        </Button>
        <Button variant="ghost" onClick={() => setShowDetails((visible) => !visible)} className="h-10 px-2 text-[15px] font-medium">
          {showDetails ? "Hide details" : "Details"}
        </Button>
      </div>
    </article>
  );
}
