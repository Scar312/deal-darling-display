import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Clock3,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PromotionsSheet } from "@/components/PromotionsSheet";
import { calculateCheckoutTotals, checkoutPriceLines } from "@/lib/checkout-pricing";

const mediaPath = "/assets/all-images/png/media";
const couponImg = `${mediaPath}/coupon.png`;
const giftImg = `${mediaPath}/gift.png`;
const locationImg = `${mediaPath}/location.png`;
const mapImg = `${mediaPath}/map.jpg`;
const priorityImg = `${mediaPath}/priority.png`;
const storeImg = `${mediaPath}/mcdonalds-store.png`;
const userIconImg = `${mediaPath}/user.png`;
const visaImg = `${mediaPath}/visa-card.png`;
const discountImg = `${mediaPath}/promo-discount.png`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Delivery checkout | McDonald's" },
      { name: "description", content: "Review your McDonald's delivery details, offers, and order total." },
      { property: "og:title", content: "Delivery checkout | McDonald's" },
      { property: "og:description", content: "Review your McDonald's delivery details, offers, and order total." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Checkout,
});

const money = (amount: number) => `$${amount.toFixed(2)}`;

function Checkout() {
  const [option, setOption] = useState("standard");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [codeApplied, setCodeApplied] = useState<string | null>(null);
  const [fourOff, setFourOff] = useState(true);
  const totals = calculateCheckoutTotals(Boolean(codeApplied));

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[480px] overflow-x-hidden bg-background pb-52 text-foreground">
      <header className="sticky top-0 z-30 flex items-center bg-background px-5 pb-2 pt-3">
        <Button variant="ghost" size="icon" aria-label="Back" className="h-9 w-9 shrink-0">
          <ArrowLeft className="h-6 w-6" strokeWidth={2} />
        </Button>
        <h1 className="flex-1 text-center text-[17px] font-medium">Checkout</h1>
        <span aria-hidden="true" className="h-9 w-9 shrink-0" />
      </header>

      <section className="px-5 pt-2">
        <div className="overflow-hidden rounded-2xl">
          <img src={mapImg} alt="Map showing your delivery location" className="h-[122px] w-full object-cover" />
        </div>

        <CheckoutRow icon={<img src={locationImg} alt="" />}>
          <p className="text-[17px] font-medium leading-tight">7428 Willow Creek Dr</p>
          <p className="mt-0.5 text-[15px] text-checkout-muted">Charlotte, NC</p>
        </CheckoutRow>
        <Divider inset />

        <CheckoutRow icon={<img src={userIconImg} alt="" />}>
          <p className="text-[17px] font-medium leading-tight">Meet at my door</p>
          <p className="mt-0.5 text-[15px] text-checkout-green">Add delivery instructions &amp; photos</p>
        </CheckoutRow>
        <Divider inset />

        <CheckoutRow icon={<img src={`${mediaPath}/phone-call.png`} alt="" className="scale-125" />}>
          <p className="text-[17px] font-medium">+16507698710</p>
        </CheckoutRow>
        <Divider inset />

        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Clock3 className="h-6 w-6 text-checkout-muted" strokeWidth={1.8} />
            <span className="text-[17px] font-medium">Delivery time</span>
          </div>
          <span className="text-[16px] font-medium text-checkout-muted">8:34–9:02 AM</span>
        </div>

        <div className="-mx-5 flex min-w-0 gap-2.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <DeliveryOption
            selected={option === "priority"}
            onClick={() => setOption("priority")}
            className="w-[42%] basis-[42%]"
          >
            <div className="flex items-center gap-2 text-[16px] font-medium">
              <span>8:27–8:53 AM</span>
              <img src={priorityImg} alt="Priority" className="h-5 w-4 object-contain" />
            </div>
            <p className="mt-1 text-[14px] text-checkout-muted">Priority</p>
            <p className="mt-1 text-[14px] leading-6 text-checkout-green">Direct to you. Top-rated couriers</p>
            <p className="mt-0.5 text-[14px] text-checkout-muted">+$1.49</p>
          </DeliveryOption>
          <DeliveryOption selected={option === "standard"} onClick={() => setOption("standard")} className="w-[42%] basis-[42%]">
            <p className="text-[16px] font-medium">8:34–9:02 AM</p>
            <p className="mt-1 text-[14px] text-checkout-muted">Standard</p>
          </DeliveryOption>
          <DeliveryOption selected={option === "schedule"} onClick={() => setOption("schedule")} className="w-[42%] basis-[42%]">
            <p className="text-[16px] font-medium">Schedule</p>
            <p className="mt-1 text-[14px] text-checkout-muted">Earliest: 9:18 AM</p>
          </DeliveryOption>
        </div>
      </section>

      <div aria-hidden="true" className="mt-5 h-2 bg-checkout-surface" />

      <section className="px-5 pt-4">
        <h2 className="text-[22px] font-semibold">Order summary</h2>

        <Button variant="ghost" className="mt-3 flex h-auto w-full justify-start gap-3 px-0 py-3 text-left">
          <img src={storeImg} alt="" className="h-11 w-11 shrink-0 rounded-full object-cover" />
          <span className="min-w-0 flex-1">
            <span className="block text-[17px] font-medium leading-tight">McDonald&apos;s®</span>
            <span className="mt-1 block text-[16px] text-checkout-muted">15 items</span>
          </span>
          <ChevronDown className="h-5 w-5 shrink-0 text-checkout-subtle" strokeWidth={2.4} />
        </Button>
        <Divider inset />

        <Button variant="ghost" className="flex h-auto w-full justify-start gap-3 px-0 py-3 text-left">
          <img src={giftImg} alt="" className="h-11 w-11 shrink-0 object-contain" />
          <span className="min-w-0 flex-1">
            <span className="block text-[17px] font-medium leading-tight">Send as a gift</span>
            <span className="mt-1 block text-[16px] text-checkout-muted">Add a personal message</span>
          </span>
          <ChevronRight className="h-5 w-5 shrink-0 text-checkout-subtle" strokeWidth={2.4} />
        </Button>
        <Divider inset />

        <Button
          variant="ghost"
          onClick={() => setSheetOpen(true)}
          className="flex h-auto w-full items-center justify-start gap-3 px-0 py-3 text-left"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center">
            <img src={couponImg} alt="" className="h-8 w-8 object-contain" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[17px] font-medium leading-snug">2 promotions applied, 1 promotion available</span>
            <span className="mt-1 block text-[16px] leading-snug text-checkout-muted">Discounted Service Fee on us</span>
            {codeApplied && <span className="mt-1 block text-[14px] font-medium text-checkout-green">Promo code {codeApplied} applied</span>}
          </span>
          <ChevronRight className="h-5 w-5 shrink-0 text-checkout-subtle" strokeWidth={2.4} />
        </Button>
      </section>

      <Divider className="mx-5 mt-1" />

      <section aria-label="Order totals" className="px-5 pt-3">
        <PriceRow label="Subtotal" value={money(checkoutPriceLines.subtotal)} compact />
        {codeApplied && (
          <PriceRow label="Uber Credit Applied" value={`−${money(totals.codeDiscount)}`} highlight compact />
        )}
        <PriceRow
          label={<span className="flex items-center gap-1.5">Delivery Fee <Info className="h-[17px] w-[17px] text-checkout-subtle" /></span>}
          value={<FeeValues original={checkoutPriceLines.originalDeliveryFee} current={checkoutPriceLines.deliveryFee} />}
          compact
        />
        <PriceRow
          label={<span className="flex items-center gap-1.5">Other Fees <Info className="h-[17px] w-[17px] text-checkout-subtle" /></span>}
          value={<FeeValues original={checkoutPriceLines.originalOtherFees} current={checkoutPriceLines.otherFees} />}
          compact
        />
        <PriceRow label="Taxes" value={money(checkoutPriceLines.taxes)} compact />
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

      <section className="px-5 pt-3">
        <Button variant="ghost" className="flex h-auto w-full justify-start gap-4 px-2 py-2 text-left">
          <img src={visaImg} alt="Visa" className="h-12 w-12 shrink-0 object-contain" />
          <span className="min-w-0 flex-1 text-[18px] font-medium">Visa ••••5841 (Caseys)</span>
          <ChevronRight className="h-5 w-5 shrink-0 text-checkout-subtle" strokeWidth={2.4} />
        </Button>

        <label className="mt-4 flex cursor-pointer items-center gap-3 bg-checkout-surface px-4 py-4">
          <span className="flex-1 text-[17px] font-medium leading-snug">Sign up to receive email offers and news from McDonald&apos;s</span>
          <input type="checkbox" className="h-5 w-5 shrink-0 accent-foreground" />
        </label>

        <p className="mt-4 text-[14px] leading-[1.75] text-checkout-muted">
          <span className="font-medium text-foreground">Privacy Notice:</span> By checking the box, you agree to McDonald&apos;s Terms &amp; Conditions and that Uber may share your name, email, and order information and history with McDonald&apos;s. McDonald&apos;s will use that information to send you promotional emails and personalize your McDonald&apos;s experience in accordance with McDonald&apos;s Privacy Statement. You can stop sharing in your app settings and find an unsubscribe link in each email from McDonald&apos;s. <a href="#" className="text-checkout-green">View Terms &amp; Conditions.</a> <a href="#" className="text-checkout-green">View Privacy Statement.</a>
        </p>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-[480px] bg-background">
        <div className="checkout-savings flex min-h-[82px] items-center gap-4 px-5 py-3 text-foreground">
          <img src={discountImg} alt="" className="h-12 w-12 shrink-0 object-contain" />
          <span className="text-[19px] font-medium">Saving $5.02 <span className="mt-1 block text-[16px] text-checkout-muted">with Offers</span></span>
        </div>
        <div className="bg-background px-5 pb-5 pt-3">
          <Button className="h-[60px] w-full rounded-xl bg-foreground text-[20px] font-medium !text-background hover:bg-foreground/90">Next</Button>
        </div>
      </div>

      {sheetOpen && (
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
        />
      )}
    </main>
  );
}

function CheckoutRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex min-h-[72px] items-center gap-4 py-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center text-checkout-muted [&_img]:h-7 [&_img]:w-7 [&_img]:object-contain">{icon}</span>
      <div className="min-w-0 flex-1">{children}</div>
      <ChevronRight className="h-5 w-5 shrink-0 text-checkout-subtle" strokeWidth={2.4} />
    </div>
  );
}

function Divider({ inset = false, className = "" }: { inset?: boolean; className?: string }) {
  return <div aria-hidden="true" className={`h-px bg-checkout-separator ${inset ? "ml-11" : ""} ${className}`} />;
}

function DeliveryOption({
  selected,
  onClick,
  className,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`h-[138px] shrink-0 flex-col items-stretch justify-start whitespace-normal rounded-2xl border-2 px-3 py-3 text-left ${className} ${selected ? "border-foreground" : "border-checkout-separator"}`}
    >
      {children}
    </Button>
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
    <div className={`flex items-center justify-between gap-3 ${compact ? (strong ? "min-h-[40px] py-0.5" : "min-h-[34px] py-0.5") : (strong ? "min-h-[58px] py-2" : "min-h-[50px] py-2")}`}>
      <span className={`text-[17px] ${highlight ? "font-medium text-checkout-green" : strong ? "text-[20px] font-semibold text-foreground" : "text-checkout-muted"}`}>{label}</span>
      <span className={`shrink-0 text-[17px] ${highlight ? "font-medium text-checkout-green" : strong ? "text-foreground" : "text-checkout-muted"}`}>{value}</span>
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
