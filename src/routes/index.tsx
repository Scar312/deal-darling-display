import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Clock,
  Zap,
  ChevronRight,
  ChevronDown,
  Info,
} from "lucide-react";
import { PromotionsSheet } from "@/components/PromotionsSheet";
import mapImg from "@/assets/uber/map.jpg";
import savingsImg from "@/assets/uber/savings.jpg";
import burgerImg from "@/assets/uber/burger.jpg";
import storeImg from "@/assets/uber/store.png";
import locationImg from "@/assets/uber/location.png";
import userIconImg from "@/assets/uber/user.png";
import couponImg from "@/assets/uber/coupon.png";
import priorityImg from "@/assets/uber/priority.png";
import uberOneImg from "@/assets/uber/uberone.png";
import applePayImg from "@/assets/uber/applepay.png";
import footerMarkImg from "@/assets/uber/footermark.png";

export const Route = createFileRoute("/")({
  component: Checkout,
});

const money = (n: number) => `US$${n.toFixed(2)}`;

function Checkout() {
  const [tab, setTab] = useState<"delivery" | "pickup">("delivery");
  const [option, setOption] = useState("standard");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [codeApplied, setCodeApplied] = useState<string | null>(null);
  const [fourOff, setFourOff] = useState(true);

  const subtotal = 82.22;
  const deliveryFee = 0;
  const otherFees = 5.18;
  const taxes = 9.6;
  const baseTotal = +(subtotal + deliveryFee + otherFees + taxes).toFixed(2);
  const codeDiscount = codeApplied ? +(baseTotal * 0.85).toFixed(2) : 0;
  const total = +(baseTotal - codeDiscount).toFixed(2);
  const originalTotal = baseTotal + 22.51;

  const savingsLabel = codeApplied
    ? "Uber One, promotions & promo code"
    : "Uber One and promotions";

  return (
    <div className="mx-auto min-h-screen w-full max-w-[480px] bg-background pb-36 text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center bg-background px-4 pb-2 pt-3">
        <button aria-label="Back" className="flex h-8 w-8 items-center justify-center">
          <ArrowLeft className="h-6 w-6" strokeWidth={2.5} />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-semibold">Checkout</h1>
        <div className="h-8 w-8" />
      </header>

      <div className="px-4">
        {/* Delivery / Pickup toggle */}
        <div className="mt-1 flex rounded-full bg-[#eeeeee] p-1">
          {(["delivery", "pickup"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-full py-2.5 text-[15px] font-semibold capitalize transition-colors ${
                tab === t ? "bg-white text-black shadow-sm" : "text-[#333]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Map */}
        <div className="relative mt-3 overflow-hidden rounded-2xl">
          <img src={mapImg} alt="Delivery location map" className="w-full" />
        </div>

        {/* Address */}
        <Row
          icon={<img src={locationImg} alt="" className="h-6 w-6 object-contain" />}
          chevron
          className="pt-3"
        >
          <div className="text-[16px] font-semibold leading-tight">
            7428 Willow Creek Dr
          </div>
          <div className="text-[14px] font-medium text-[#6b6b6b]">
            Charlotte, NC
          </div>
        </Row>
        <Divider />

        {/* Meet at door */}
        <Row icon={<img src={userIconImg} alt="" className="h-6 w-6 object-contain" />} chevron>
          <div className="text-[16px] font-semibold leading-tight">Meet at my door</div>
          <div className="text-[14px] font-medium text-[#0b8a3d]">
            Add delivery instructions &amp; photos
          </div>
        </Row>
        <Divider />

        {/* Phone */}
        <Row
          icon={
            <span className="flex h-6 w-6 items-center justify-center text-[#111]">
              <PhoneGlyph />
            </span>
          }
          chevron
        >
          <div className="text-[16px] font-semibold tracking-wide">+*** *** *** ****</div>
        </Row>
        <Divider />

        {/* Delivery time */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-4">
            <Clock className="h-6 w-6" strokeWidth={2} />
            <span className="text-[16px] font-semibold">Delivery time</span>
          </div>
          <span className="text-[16px] font-semibold text-[#4a4a4a]">3:20–3:42 PM</span>
        </div>

        {/* Delivery options */}
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <OptionCard
            selected={option === "priority"}
            onClick={() => setOption("priority")}
            title={
              <span className="flex items-center gap-1">
                Priority{" "}
                <img src={priorityImg} alt="" className="h-4 w-4 object-contain" />
              </span>
            }
          >
            <div className="text-[13px] font-medium text-[#6b6b6b]">3:17–3:35 PM</div>
            <div className="mt-0.5 text-[13px] font-semibold text-[#0b8a3d]">Direct to you</div>
            <div className="text-[13px] font-medium text-[#6b6b6b]">+$4.99</div>
          </OptionCard>

          <OptionCard
            selected={option === "standard"}
            onClick={() => setOption("standard")}
            title="Standard"
          >
            <div className="text-[13px] font-medium text-[#6b6b6b]">3:20–3:42 PM</div>
          </OptionCard>

          <OptionCard
            selected={option === "schedule"}
            onClick={() => setOption("schedule")}
            title="Schedule"
          >
            <div className="text-[13px] font-medium text-[#6b6b6b]">Earliest: 3:50 PM</div>
          </OptionCard>
        </div>
      </div>

      {/* grey separator */}
      <div className="mt-4 h-2 bg-[#f2f2f2]" />

      {/* Order summary */}
      <div className="px-4 pt-4">
        <h2 className="text-[21px] font-semibold">Order summary</h2>

        <button className="mt-3 flex w-full items-center gap-3">
          <img src={storeImg} alt="Dunkin'" className="h-10 w-10 rounded-full object-cover" />
          <div className="flex-1 text-left">
            <div className="text-[16px] font-semibold leading-tight">Dunkin'</div>
            <div className="text-[14px] font-medium text-[#6b6b6b]">20 items</div>
          </div>
          <ChevronDown className="h-5 w-5 text-[#6b6b6b]" strokeWidth={2.5} />
        </button>

        <div className="mt-3 h-px bg-[#eee]" />

        {/* Promotion row -> opens sheet */}
        <button
          onClick={() => setSheetOpen(true)}
          className="mt-3 flex w-full items-start gap-3 text-left"
        >
          <img src={couponImg} alt="" className="mt-0.5 h-6 w-6 shrink-0 object-contain" />
          <div className="flex-1 min-w-0">
            <div className="text-[16px] font-semibold leading-snug">
              {codeApplied
                ? "2 promotions applied"
                : "1 promotion applied, 1 promotion available"}
            </div>
            <div className="mt-0.5 text-[14px] font-medium text-[#5a5a5a]">
              {codeApplied ? `${codeApplied} · 85% off` : "$4 off"}
            </div>
            <div className="text-[14px] leading-snug text-[#5a5a5a]">
              May exclude alcohol or other regulated items
            </div>
          </div>
          <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-[#9a9a9a]" strokeWidth={2.5} />
        </button>
      </div>

      {/* Uber One benefits banner */}
      <div className="mx-4 mt-5 flex items-stretch justify-between overflow-hidden rounded-2xl bg-[#f6efdd]">
        <div className="flex flex-col justify-center px-4 py-4">
          <div className="text-[18px] font-semibold leading-tight">
            7 days left of your Uber One benefits
          </div>
          <button className="mt-3 flex w-fit items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-[13px] font-semibold">
            Join free for 1 month <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
        <img src={burgerImg} alt="" className="w-24 shrink-0 object-cover" />
      </div>

      {/* Price breakdown */}
      <div className="px-4 pt-5">
        <PriceRow label="Subtotal" value={money(subtotal)} bold />
        {codeApplied && (
          <div className="flex items-center justify-between py-2">
            <span className="text-[16px] font-semibold">mastersaver.site discount</span>
            <span className="rounded-md bg-[#e01a2b] px-2 py-0.5 text-[15px] font-semibold text-white">
              -{money(codeDiscount)}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between py-2">
          <span className="flex items-center gap-2 text-[16px] font-semibold">
            Delivery Fee <Info className="h-4 w-4 text-[#9a9a9a]" strokeWidth={2} />
          </span>
          <span className="flex items-center gap-1.5 text-[16px] font-semibold">
            <span className="text-[#9a9a9a] line-through">US$7.49</span>
            <UberOneMark img={uberOneImg} />
            <span className="text-[#8a5a12]">US$0.00</span>
          </span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="flex items-center gap-2 text-[16px] font-semibold">
            Other Fees <Info className="h-4 w-4 text-[#9a9a9a]" strokeWidth={2} />
          </span>
          <span className="flex items-center gap-1.5 text-[16px] font-semibold">
            <span className="text-[#9a9a9a] line-through">US$14.99</span>
            <UberOneMark img={uberOneImg} />
            <span className="text-[#8a5a12]">US$5.18</span>
          </span>
        </div>
        <PriceRow label="Taxes" value={money(taxes)} bold />
        <div className="flex items-center justify-between py-2">
          <span className="text-[19px] font-semibold">Total</span>
          <span className="flex items-center gap-1.5 text-[19px] font-semibold">
            <span className="text-[#9a9a9a] line-through">US${originalTotal.toFixed(2)}</span>
            <UberOneMark img={uberOneImg} />
            <span className="text-[#8a5a12]">{money(total)}</span>
          </span>
        </div>

        {/* Savings banner */}
        <img src={savingsImg} alt="Savings summary" className="mt-3 w-full rounded-2xl" />

        {/* Payment */}
        <button className="mt-4 flex w-full items-center gap-3 py-1">
          <img src={applePayImg} alt="Apple Pay" className="h-7 w-11 object-contain" />
          <span className="flex-1 text-left text-[16px] font-semibold">Apple Pay</span>
          <ChevronRight className="h-5 w-5 text-[#9a9a9a]" strokeWidth={2.5} />
        </button>
      </div>

      {/* Bottom sticky */}
      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-[480px] bg-background">
        <div className="flex items-center gap-2 bg-[#9a6a12] px-4 py-2.5">
          <img src={footerMarkImg} alt="" className="h-5 w-5 shrink-0 object-contain" />
          <span className="text-[14px] font-semibold text-white">
            Saving ${(codeDiscount + 18.73).toFixed(2)} with {savingsLabel}
          </span>
        </div>
        <div className="px-4 pb-5 pt-2.5">
          <button className="w-full rounded-xl bg-black py-3.5 text-[16px] font-semibold text-white active:opacity-90">
            Next
          </button>
        </div>
      </div>

      <PromotionsSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        codeApplied={codeApplied}
        onApplyCode={(c) => setCodeApplied(c)}
        onRemoveCode={() => setCodeApplied(null)}
        fourOffSelected={fourOff}
        onToggleFourOff={() => setFourOff((v) => !v)}
        couponImg={couponImg}
      />
    </div>
  );
}

function PhoneGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function Row({
  icon,
  children,
  chevron,
  className = "",
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  chevron?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 py-3 ${className}`}>
      <span className="shrink-0 text-[#111]">{icon}</span>
      <div className="flex-1 min-w-0">{children}</div>
      {chevron && <ChevronRight className="h-5 w-5 shrink-0 text-[#9a9a9a]" strokeWidth={2.5} />}
    </div>
  );
}

function Divider() {
  return <div className="ml-10 h-px bg-[#eee]" />;
}

function OptionCard({
  title,
  children,
  selected,
  onClick,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`min-w-[42%] shrink-0 rounded-2xl bg-white px-3.5 py-3 text-left transition-all ${
        selected ? "border-2 border-black" : "border border-[#e6e6e6]"
      }`}
    >
      <div className="text-[17px] font-semibold">{title}</div>
      <div className="mt-1.5">{children}</div>
    </button>
  );
}

function PriceRow({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className={`text-[16px] ${bold ? "font-semibold" : "font-medium"}`}>{label}</span>
      <span className={`text-[16px] ${bold ? "font-semibold" : "font-medium"}`}>{value}</span>
    </div>
  );
}

function UberOneMark({ light, img }: { light?: boolean; img?: string }) {
  if (img) {
    return <img src={img} alt="Uber One" className={`h-5 w-5 object-contain ${light ? "brightness-0 invert" : ""}`} />;
  }
  return (
    <span
      className={`inline-flex h-5 w-5 items-center justify-center rounded-full border-2 text-[11px] font-semibold leading-none ${
        light ? "border-white text-white" : "border-[#8a5a12] text-[#8a5a12]"
      }`}
    >
      1
    </span>
  );
}
