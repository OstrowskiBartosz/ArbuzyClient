const pagination = (NumberOfpages) => {
  const pages = [];
  for (let i = 1; i <= NumberOfpages; i++) {
    pages.push(i);
    if (i === 5) break;
  }
  return pages;
};

const sortingMethods = [
  { api: 'default', display: 'domyślne' },
  { api: 'price descending', display: 'cena malejąco' },
  { api: 'price ascending', display: 'cena rosnąco' },
  { api: 'product A-Z', display: 'nazwa produktu A-Z' },
  { api: 'product Z-A', display: 'nazwa produktu Z-A' }
];

export { pagination, sortingMethods };
