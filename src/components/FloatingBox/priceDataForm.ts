export const priceDataForm = (price: number, count: number) => {
  const totalPrice = (count * price).toString();
  return '₩ ' + totalPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
