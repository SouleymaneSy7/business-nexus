export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-En", {
    style: "currency",
    currency: "Us",
  }).format(amount);
};
