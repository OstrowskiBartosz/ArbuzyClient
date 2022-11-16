const pagination = (NumberOfpages, activePage) => {
  const left = activePage - 3 >= 1 ? activePage - 3 : null;
  const right = activePage + 3 <= NumberOfpages ? activePage + 3 : null;
  const pages = [];
  for (let i = 1; i <= NumberOfpages; i++) {
    if (left && i > left && right && i < right) {
      pages.push(i);
      continue;
    }

    if (!right && left && i > left) {
      pages.push(i);
      continue;
    }
    if (!left && right && i < right) {
      pages.push(i);
      continue;
    }

    if (!left && !right) {
      pages.push(i);
      continue;
    }
  }
  if (left) pages.unshift('...');
  if (right) pages.push('...');
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
