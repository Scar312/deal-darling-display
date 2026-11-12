import assert from "node:assert/strict";
import { calculateCheckoutTotals, checkoutPriceLines, randomizeCheckoutPrices } from "./checkout-pricing";

assert.deepEqual(
  {
    subtotal: checkoutPriceLines.subtotal,
    deliveryFee: checkoutPriceLines.deliveryFee,
    otherFees: checkoutPriceLines.otherFees,
    taxes: checkoutPriceLines.taxes,
  },
  { subtotal: 101.53, deliveryFee: 0, otherFees: 12.96, taxes: 10.87 },
);
assert.deepEqual(calculateCheckoutTotals(false), {
  originalTotal: 130.38,
  total: 125.36,
  codeDiscount: 0,
});

assert.deepEqual(calculateCheckoutTotals(true), {
  originalTotal: 130.38,
  total: 16.3,
  codeDiscount: 109.06,
});

// Every randomized line-item sum, including crossed-out fees, stays below $131.
for (let seed = 0; seed <= 1000; seed++) {
  const prices = randomizeCheckoutPrices(() => seed / 1000);
  const totals = calculateCheckoutTotals(false, prices);
  assert.ok(totals.originalTotal <= 131);
  assert.ok(totals.total <= 131);
  assert.equal(totals.total, Number((prices.subtotal + prices.deliveryFee + prices.otherFees + prices.taxes).toFixed(2)));
}

// Refresh generation changes amounts while retaining similar prices.
assert.notDeepEqual(randomizeCheckoutPrices(() => 0), randomizeCheckoutPrices(() => 1));
assert.equal(randomizeCheckoutPrices(() => 0).subtotal, 95.44);
assert.equal(randomizeCheckoutPrices(() => 1).subtotal, 101.53);

// The existing 87% promo also applies to randomized amounts.
const prices = randomizeCheckoutPrices(() => 0);
assert.deepEqual(calculateCheckoutTotals(true, prices), {
  originalTotal: 122.56,
  total: 15.32,
  codeDiscount: 102.52,
});