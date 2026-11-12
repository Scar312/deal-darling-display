import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Clock3,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PromotionsSheet } from "@/components/PromotionsSheet";
import { calculateCheckoutTotals, checkoutPriceLines, randomizeCheckoutPrices, type CheckoutPriceLines } from "@/lib/checkout-pricing";

import { restaurants, pickRestaurantOrder } from "@/lib/restaurants";

const mediaPath = "/assets/all-images/png/media";
const couponImg = `${mediaPath}/coupon.png`;
const giftImg = `${mediaPath}/gift.png`;
const locationImg = `${mediaPath}/location.png`;
const mapImg = `${mediaPath}/map.jpg`;
const priorityImg = `${mediaPath}/priority.png`;

const userIconImg = `${mediaPath}/user.png`;
const visaImg = `${mediaPath}/visa-card.png`;
const discountImg = `${mediaPath}/promo-discount.png`;
const promoAppliedImg = `${mediaPath}/promo-applied.png`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Delivery checkout | Restaurant orders" },
      { name: "description", content: "Review your restaurant delivery details, offers, and order total." },
      { property: "og:title", content: "Delivery checkout | Restaurant orders" },
      { property: "og:description", content: "Review your restaurant delivery details, offers, and order total." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Checkout,
});

const money = (amount: number) => `$${amount.toFixed(2)}`;

function Checkout() {
  const [fulfillment, setFulfillment] = useState("delivery");
  const [prices, setPrices] = useState<CheckoutPriceLines>(() => ({ ...checkoutPriceLines }));
  const [order, setOrder] = useState({ restaurant: restaurants[0], itemCount: 15 });
  useEffect(() => {
    setPrices(randomizeCheckoutPrices());
    let previous: string | null = null;
    try { previous = window.localStorage.getItem("checkout-restaurant"); } catch {}
    const next = pickRestaurantOrder(previous);
    setOrder(next);
    try { window.localStorage.setItem("checkout-restaurant", next.restaurant.name); } catch {}
  }, []);
  const storeName = order.restaurant.name;
  const [option, setOption] = useState("standard");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [codeApplied, setCodeApplied] = useState<string | null>(null);
  const [fourOff, setFourOff] = useState(true);
  const totals = calculateCheckoutTotals(Boolean(codeApplied), prices);
  const savings = Math.round((totals.originalTotal - totals.total) * 100) / 100;

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[480px] overflow-x-clip bg-background pb-52 text-foreground">
      <header className="sticky top-0 z-30 flex items-center bg-background px-4 pb-2 pt-3">
        <Button variant="ghost" size="icon" aria-label="Back" className="h-9 w-9 shrink-0 [&_svg]:size-6">
          <ArrowLeft className="h-6 w-6" strokeWidth={2} />
        </Button>
        <h1 className="flex-1 text-center text-[17px] font-medium">Checkout</h1>
        <span aria-hidden="true" className="h-9 w-9 shrink-0" />
      </header>

      <section className="px-4 pt-2">
        <div role="group" aria-label="Order type" className="mb-4 grid grid-cols-2 rounded-full bg-checkout-surface p-1">
          {(["delivery", "pickup"] as const).map((mode) => (
            <Button key={mode} variant="ghost" aria-pressed={fulfillment === mode} onClick={() => setFulfillment(mode)} className={`h-9 rounded-full text-[16px] font-medium ${fulfillment === mode ? "bg-background hover:bg-background" : "hover:bg-transparent"}`}>
              {mode === "delivery" ? "Delivery" : "Pickup"}
            </Button>
          ))}
        </div>
        <div className="overflow-hidden rounded-lg">
          <img src={mapImg} alt="Map showing your delivery location" className="aspect-[2.8/1] w-full object-cover" />
        </div>

        <CheckoutRow icon={<img src={locationImg} alt="" className="h-[22px] w-[22px] object-contain" />}>
          <p className="text-[17px] font-medium leading-tight">7428 Willow Creek Dr</p>
          <p className="mt-0.5 text-[15px] text-checkout-muted">Charlotte, NC</p>
        </CheckoutRow>
        <Divider inset />

        <CheckoutRow icon={<img src={userIconImg} alt="" className="h-[22px] w-[22px] object-contain" />}>
          <p className="text-[17px] font-medium leading-tight">Meet at my door</p>
          <p className="mt-0.5 text-[15px] text-checkout-green">Add delivery instructions &amp; photos</p>
        </CheckoutRow>
        <Divider inset />

        <CheckoutRow icon={<img src={`${mediaPath}/phone-call.png`} alt="" className="h-5 w-5 object-contain" />}>
          <p className="text-[17px] font-medium">+1 650 769 8710</p>
        </CheckoutRow>
        <Divider inset />

        <div className="flex items-center justify-between gap-3 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex w-9 shrink-0 justify-center"><Clock3 className="h-[22px] w-[22px] text-checkout-muted" strokeWidth={1.8} /></span>
            <span className="text-[17px] font-medium">{fulfillment === "delivery" ? "Delivery time" : "Pickup time"}</span>
          </div>
          <span className="shrink-0 text-[16px] font-medium text-checkout-muted">8:34–9:02 AM</span>
        </div>

        <div className="-mx-4 flex min-w-0 items-stretch gap-2.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <DeliveryOption
            selected={option === "priority"}
            onClick={() => setOption("priority")}
          >
            <div className="flex items-center gap-1.5 whitespace-nowrap text-[16px] font-medium leading-6">
              <span>8:27–8:53 AM</span>
              <img src={priorityImg} alt="Priority" className="h-[18px] w-[13px] shrink-0 object-contain" />
            </div>
            <p className="mt-0.5 text-[13px] leading-5 text-checkout-muted">Priority</p>
            <p className="text-[13px] leading-5 text-checkout-green">Direct to you. Top-rated couriers</p>
            <p className="text-[13px] leading-5 text-checkout-muted">+$1.49</p>
          </DeliveryOption>
          <DeliveryOption selected={option === "standard"} onClick={() => setOption("standard")}>
            <p className="whitespace-nowrap text-[16px] font-medium leading-6">8:34–9:02 AM</p>
            <p className="mt-0.5 text-[13px] leading-5 text-checkout-muted">Standard</p>
          </DeliveryOption>
          <DeliveryOption selected={option === "schedule"} onClick={() => setOption("schedule")}>
            <p className="whitespace-nowrap text-[16px] font-medium leading-6">Schedule</p>
            <p className="mt-0.5 text-[13px] leading-5 text-checkout-muted">Earliest: 9:18 AM</p>
          </DeliveryOption>
        </div>
      </section>

      <div aria-hidden="true" className="mt-5 h-2 bg-checkout-surface" />

      <section className="px-4 pt-4">
        <h2 className="text-[22px] font-bold">Order summary</h2>

        <Button variant="ghost" className="mt-2 flex h-auto min-h-16 w-full justify-start gap-3 whitespace-normal px-0 py-2.5 text-left hover:bg-transparent">
          <img src={order.restaurant.image} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" />
          <span className="min-w-0 flex-1">
            <span className="block text-[17px] font-medium leading-tight">{storeName}</span>
            <span className="mt-0.5 block text-[15px] font-normal text-checkout-muted">{order.itemCount} items</span>
          </span>
          <ChevronDown className="h-5 w-5 shrink-0 text-checkout-subtle" strokeWidth={2.4} />
        </Button>
        <Divider inset />

        <Button variant="ghost" className="flex h-auto min-h-16 w-full justify-start gap-3 whitespace-normal px-0 py-2.5 text-left hover:bg-transparent">
          <span className="flex w-9 shrink-0 justify-center"><img src={giftImg} alt="" className="h-[30px] w-[30px] object-contain" /></span>
          <span className="min-w-0 flex-1">
            <span className="block text-[17px] font-medium leading-tight">Send as a gift</span>
            <span className="mt-0.5 block text-[15px] font-normal text-checkout-muted">Add a personal message</span>
          </span>
          <ChevronRight className="h-5 w-5 shrink-0 text-checkout-subtle" strokeWidth={2.4} />
        </Button>
        <Divider inset />

        <Button
          variant="ghost"
          onClick={() => setSheetOpen(true)}
          className="flex h-auto min-h-16 w-full items-center justify-start gap-3 whitespace-normal px-0 py-2.5 text-left hover:bg-transparent"
        >
          <span className="flex w-9 shrink-0 items-center justify-center">
            <img src={promoAppliedImg} alt="" className="h-8 w-8 object-contain" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[16px] font-medium leading-[1.3]">2 promotions applied, 1 promotion available</span>
            <span className="mt-0.5 block text-[15px] font-normal leading-snug text-checkout-muted">Discounted Service Fee on us</span>
            {codeApplied && <span className="mt-1 block text-[14px] font-medium text-checkout-green">Promo code {codeApplied} applied</span>}
          </span>
          <ChevronRight className="h-5 w-5 shrink-0 text-checkout-subtle" strokeWidth={2.4} />
        </Button>
      </section>

      <Divider className="mx-4 mt-1" />

      <section aria-label="Order totals" className="px-4 pt-3">
        <PriceRow label="Subtotal" value={money(prices.subtotal)} compact />
        {codeApplied && (
          <PriceRow label="Uber Credit Applied" value={`−${money(totals.codeDiscount)}`} highlight compact />
        )}
        <PriceRow
          label={<span className="flex items-center gap-1.5">Delivery Fee <Info className="h-[17px] w-[17px] text-checkout-subtle" /></span>}
          value={<FeeValues original={prices.originalDeliveryFee} current={prices.deliveryFee} />}
          compact
        />
        <PriceRow
          label={<span className="flex items-center gap-1.5">Other Fees <Info className="h-[17px] w-[17px] text-checkout-subtle" /></span>}
          value={<FeeValues original={prices.originalOtherFees} current={prices.otherFees} />}
          compact
        />
        <PriceRow label="Taxes" value={money(prices.taxes)} compact />
        <PriceRow
          label="Total"
          value={
            <span className="flex items-baseline gap-1.5 font-semibold">
              <span className="text-[17px] font-normal text-checkout-strike line-through decoration-1">{money(totals.originalTotal)}</span>
              <span className="text-[20px]">{money(totals.total)}</span>
            </span>
          }
          strong
          compact
        />
      </section>

      <section className="px-4 pt-3">
        <Button variant="ghost" className="flex h-auto w-full items-center justify-start gap-3 whitespace-normal px-0 py-3 text-left hover:bg-transparent">
          <span className="flex w-9 shrink-0 justify-center"><img src={visaImg} alt="Visa" className="h-[33px] w-[33px] object-contain" /></span>
          <span className="min-w-0 flex-1 text-[17px] font-medium">Visa ••••5841 (Caseys)</span>
          <ChevronRight className="h-5 w-5 shrink-0 text-checkout-subtle" strokeWidth={2.4} />
        </Button>

        <label className="mt-3 grid cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-center gap-3 bg-checkout-surface px-4 py-4">
          <span className="min-w-0 text-[16px] font-medium leading-snug">Sign up to receive email offers and news from {storeName}</span>
          <input type="checkbox" className="h-5 w-5 shrink-0 accent-foreground" />
        </label>

        <p className="mt-5 text-[14px] leading-[1.5] text-checkout-muted">
          Privacy Notice: By checking the box, you agree to share your name, email, and order history with this restaurant to receive personalized marketing emails. Stop sharing at any time in the app and unsubscribe using the link in emails from the restaurant.
        </p>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-[480px] bg-background">
        <div className="checkout-savings grid min-h-[64px] grid-cols-[40px_minmax(0,1fr)] items-center gap-3 px-4 py-2 text-foreground">
          <img src={discountImg} alt="" className="h-10 w-10 shrink-0 object-contain" />
          <span className="min-w-0 text-[17px] font-medium leading-tight">Saving {money(savings)} <span className="mt-0.5 block text-[15px] font-normal text-checkout-muted">with Offers</span></span>
        </div>
        <div className="bg-background px-4 pb-[max(20px,env(safe-area-inset-bottom))] pt-4">
          <Button className="h-[56px] w-full rounded-lg bg-foreground text-[20px] font-medium !text-background hover:bg-foreground/90">Next</Button>
        </div>
      </div>

      {sheetOpen && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-background">
          <PromotionsSheet
            open={sheetOpen}
            onClose={() => setSheetOpen(false)}
            codeApplied={codeApplied}
            onApplyCode={setCodeApplied}
            onRemoveCode={() => setCodeApplied(null)}
            fourOffSelected={fourOff}
            onToggleFourOff={() => setFourOff((selected) => !selected)}
            couponImg={couponImg}
            discountImg={discountImg}
            restaurantName={storeName}
          />
        </div>
      )}
    </main>
  );
}

function CheckoutRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid min-h-[66px] grid-cols-[36px_minmax(0,1fr)_20px] items-center gap-3 py-3">
      <span className="flex w-9 shrink-0 items-center justify-center text-checkout-muted">{icon}</span>
      <div className="min-w-0 flex-1">{children}</div>
      <ChevronRight className="h-5 w-5 shrink-0 text-checkout-subtle" strokeWidth={2.4} />
    </div>
  );
}

function Divider({ inset = false, className = "" }: { inset?: boolean; className?: string }) {
  return <div aria-hidden="true" className={`h-px bg-checkout-separator ${inset ? "ml-12" : ""} ${className}`} />;
}

function DeliveryOption({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`flex min-h-[122px] w-[154px] shrink-0 flex-col items-stretch justify-start overflow-hidden rounded-xl bg-background px-3 py-3 text-left transition-colors ${selected ? "border-[3px] border-foreground" : "border-2 border-checkout-separator"}`}
    >
      {children}
    </button>
  );
}

function PriceRow({
  label,
  value,
  highlight = false,
  strong = false,
  compact = false,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  highlight?: boolean;
  strong?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 ${compact ? (strong ? "min-h-[40px] py-0.5" : "min-h-[32px] py-0.5") : (strong ? "min-h-[58px] py-2" : "min-h-[50px] py-2")}`}>
      <span className={`min-w-0 text-[16px] ${highlight ? "font-medium text-checkout-green" : strong ? "text-[20px] font-semibold text-foreground" : "text-checkout-muted"}`}>{label}</span>
      <span className={`shrink-0 text-[16px] ${highlight ? "font-medium text-checkout-green" : strong ? "text-foreground" : "text-checkout-muted"}`}>{value}</span>
    </div>
  );
}

function FeeValues({ original, current }: { original: number; current: number }) {
  return (
    <span className="flex items-baseline gap-1.5">
      <span className="text-[16px] text-checkout-strike line-through decoration-1">{money(original)}</span>
      <span>{money(current)}</span>
    </span>
  );
}
