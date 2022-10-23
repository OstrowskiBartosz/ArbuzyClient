const pagination = (NumberOfpages) => {
  const pages = [];
  for (let i = 1; i <= NumberOfpages; i++) {
    pages.push(i);
    if (i === 5) break;
  }
  return pages;
};

export default pagination;
