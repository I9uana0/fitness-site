export function formatPrice(priceAmount: number) {
  return new Intl.NumberFormat("ru-RU", {
    currency: "RUB",
    style: "currency",
    minimumFractionDigits: 0,
  }).format(priceAmount / 100);
}
