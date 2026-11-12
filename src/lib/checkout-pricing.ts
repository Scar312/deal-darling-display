export const checkoutPriceLines = {
  subtotal: 101.53,
  deliveryFee: 0,
  originalDeliveryFee: 2.99,
  otherFees: 12.96,
  originalOtherFees: 14.99,
  taxes: 10.87,
} as const;

const roundMoney = (amount: number) => Math.round((amount + Number.EPSILON) * 100) / 100;

export type CheckoutPriceLines = { [Key in keyof typeof checkoutPriceLines]: number };

export function randomizeCheckoutPrices(random: () => number = Math.random): CheckoutPriceLines {
  const similarAmount = (amount: number) =>
    roundMoney(amount * (0.94 + Math.min(1, Math.max(0, random())) * 0.06));
  return {
    subtotal: similarAmount(checkoutPriceLines.subtotal),
    deliveryFee: 0,
    originalDeliveryFee: similarAmount(checkoutPriceLines.originalDeliveryFee),
    otherFees: similarAmount(checkoutPriceLines.otherFees),
    originalOtherFees: similarAmount(checkoutPriceLines.originalOtherFees),
    taxes: similarAmount(checkoutPriceLines.taxes),
  };
}

export function calculateCheckoutTotals(codeApplied: boolean, prices: CheckoutPriceLines = checkoutPriceLines) {
  const originalTotal = roundMoney(
    prices.subtotal + prices.originalDeliveryFee + prices.originalOtherFees + prices.taxes,
  );
  const total = roundMoney(
    prices.subtotal + prices.deliveryFee + prices.otherFees + prices.taxes,
  );
  const codeDiscount = codeApplied ? roundMoney(total * 0.87) : 0;

  return {
    originalTotal,
    total: roundMoney(total - codeDiscount),
    codeDiscount,
  };
}