import history from '../../history';

export const setURLPrice = (priceValue, fetchSearchData) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set('priceFrom', priceValue[0]);
  searchParams.set('priceTo', priceValue[1]);
  history.push(`${window.location.pathname}?${searchParams}`);
  fetchSearchData();
};

export const checkValues = (priceValue, priceRange) => {
  if (priceValue[0] > priceValue[1]) return false;
  if (priceValue[0] > Math.ceil(priceRange.maxPrice)) return false;
  if (priceValue[0] < Math.floor(priceRange.minPrice)) return false;
  if (priceValue[1] > Math.ceil(priceRange.maxPrice)) return false;
  if (priceValue[1] < Math.floor(priceRange.minPrice)) return false;
  return true;
};

export const readyToRequest = async (priceValue, priceRange, setPriceValue, fetchSearchData) => {
  const bool = await checkValues(priceValue, priceRange);
  if (bool) setURLPrice(priceValue, fetchSearchData);
  else setPriceValue([Math.ceil(priceRange.minPrice), Math.floor(priceRange.maxPrice)]);
};
