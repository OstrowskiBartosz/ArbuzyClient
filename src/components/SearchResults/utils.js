const uncheckAll = () => {
  const allFilters = document.querySelectorAll('input[type=checkbox]');
  allFilters.forEach((ID) => {
    if (document.getElementById(`${ID.id}`) !== null) {
      document.getElementById(`${ID.id}`).checked = false;
    }
  });
};

const checkFilters = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const filtersArray = ['filterCategory', 'filterManufacturer'];
  filtersArray.forEach((filter) => {
    if (searchParams.has(filter)) {
      const filterString = searchParams.get(filter);
      const filterArray = filterString.slice(1, filterString.length - 1).split(',');
      filterArray.forEach((ID) => {
        if (document.getElementById(`${filter}${Number(ID)}`) !== null) {
          document.getElementById(`${filter}${Number(ID)}`).checked = true;
        }
      });
    }
  });
};

const checkAttributes = () => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.forEach((value, key) => {
    if (document.getElementById(key) !== null) {
      document.getElementById(key).checked = true;
    }
  });
};

export { uncheckAll, checkFilters, checkAttributes };
