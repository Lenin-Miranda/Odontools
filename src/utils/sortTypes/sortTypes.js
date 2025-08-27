import { products } from "../../data/productsData";

export const sortByPriceAsc = (products) => {
  return [...products].sort((a, b) => a.price - b.price);
};

export const sortByPriceDesc = (products) => {
  return [...products].sort((a, b) => b.price - a.price);
};

export const sortByName = (products) => {
  return [...products].sort((a, b) => a.name.localeCompare(b.name));
};

export const sortByRating = (products) => {
  return [...products].sort((a, b) => b.rating - a.rating);
};
