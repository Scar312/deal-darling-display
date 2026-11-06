import { describe, expect, it } from "bun:test";
import { calculateCheckoutTotals, checkoutPriceLines } from "./checkout-pricing";

describe("checkout pricing shown in the reference", () => {
  it("adds the reference subtotal, discounted fees, and taxes", () => {
    expect(checkoutPriceLines).toMatchObject({
      subtotal: 101.53,
      deliveryFee: 0,
      otherFees: 12.96,
      taxes: 10.87,
    });
    expect(calculateCheckoutTotals(false)).toEqual({
      originalTotal: 130.38,
      total: 125.36,
      codeDiscount: 0,
    });
  });

  it("takes 87% off the discounted total when a promo code is applied", () => {
    expect(calculateCheckoutTotals(true)).toEqual({
      originalTotal: 130.38,
      total: 16.3,
      codeDiscount: 109.06,
    });
  });
});