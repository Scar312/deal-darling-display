import assert from "node:assert/strict";
import { calculateCheckoutTotals, checkoutPriceLines } from "./checkout-pricing";

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