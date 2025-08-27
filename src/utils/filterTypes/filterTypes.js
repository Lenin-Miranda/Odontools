export const filterAll = (products) => {
  return products;
};

export const filterInStock = (products) => {
  return products.filter((product) => product.stock > 0);
};

export const filterOnSale = (products) => {
  return products.filter((product) => product.discount === true);
};

export const filterByRatingAbove = (products, minRating = 4) => {
  return products.filter((product) => product.rating >= minRating);
};
