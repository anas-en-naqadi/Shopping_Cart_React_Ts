const CURRENCY_FORMATTER = new Intl.NumberFormat('fr-MA', {
    currency: "MAD",
    style: "currency",
  });
  

export function formatCurr(price: number) {
  return CURRENCY_FORMATTER.format(price);
}
