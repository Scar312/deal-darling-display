export const checkoutPriceLines = {
  subtotal: 101.53,
  deliveryFee: 0,
  originalDeliveryFee: 2.99,
  otherFees: 12.96,
  originalOtherFees: 14.99,
  taxes: 10.87,
} as const;

const roundMoney = (amount: number) => Math.round((amount + Number.EPSILON) * 100) / 100;

export function calculateCheckoutTotals(codeApplied: boolean) {
  const originalTotal = roundMoney(
    checkoutPriceLines.subtotal +
      checkoutPriceLines.originalDeliveryFee +
      checkoutPriceLines.originalOtherFees +
      checkoutPriceLines.taxes,
  );
  const total = roundMoney(
    checkoutPriceLines.subtotal +
      checkoutPriceLines.deliveryFee +
      checkoutPriceLines.otherFees +
      checkoutPriceLines.taxes,
  );
  const codeDiscount = codeApplied ? roundMoney(total * 0.87) : 0;

  return {
    originalTotal,
    total: roundMoney(total - codeDiscount),
    codeDiscount,
  };
}