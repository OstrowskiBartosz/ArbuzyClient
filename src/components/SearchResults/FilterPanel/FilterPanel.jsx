import React from 'react';
import { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { withRouter } from 'react-router-dom';
import newAlert from '../../../features/newAlert';
import history from '../../history';
import '../SearchResults.css';

const FilterPanel = ({
  searchValue,
  isLoading,
  filtersData,
  ProductsData,
  showResetButton,
  fetchSearchData
}) => {
  const [toggleFilters, setToggleFilters] = useState(false);

  const handleFilterChange = (event) => {
    const searchParams = new URLSearchParams(window.location.search);
    const filters = ['filterCategory', 'filterManufacturer'];
    const clickedFilter = event.currentTarget.id;

    filters.forEach((filter) => {
      if (clickedFilter.includes(filter)) {
        if (event.target.checked) {
          if (searchParams.has(filter)) {
            const clickedFilterID = Number(clickedFilter.slice(filter.length));
            const URLFilterString = searchParams.get(filter);
            const URLFilterArray = JSON.parse(URLFilterString);

            if (URLFilterArray.indexOf(clickedFilterID) === -1) {
              URLFilterArray.push(clickedFilterID);
              searchParams.set(filter, `[${[...URLFilterArray]}]`);
            }
          } else {
            searchParams.set(filter, `[${clickedFilter.slice(filter.length)}]`);
          }
        } else {
          const clickedFilterID = clickedFilter.slice(filter.length);
          const URLFilterString = searchParams.get(filter);
          const URLFilterArray = JSON.parse(URLFilterString);

          URLFilterArray.splice(URLFilterArray.indexOf(clickedFilterID), 1);
          searchParams.set(filter, `[${[...URLFilterArray]}]`);
        }
      }
    });
    history.push(`${window.location.pathname}?${searchParams}`);
    fetchSearchData();
  };

  const handleAtributeChange = (event) => {
    const searchParams = new URLSearchParams(window.location.search);
    const clickedFilter = event.currentTarget.id;
    if (event.target.checked) {
      searchParams.set(clickedFilter, 1);
    } else {
      searchParams.delete(clickedFilter);
    }
    history.push({ search: searchParams.toString() });
    fetchSearchData();
  };

  const handleResetFiltersClick = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchParamsCopy = Array.from(searchParams);
    const skipedParams = ['q', 'w', 's', 'l', 'p'];

    for (const searchParam of searchParamsCopy) {
      const [key] = searchParam;
      if (!skipedParams.includes(key)) {
        searchParams.delete(key);
      }
    }

    history.push(`${window.location.pathname}?${searchParams}`);
    newAlert('primary', 'Zresetowano!', 'Filtry zostały zresetowane.');
    fetchSearchData();
  };

  if (isLoading && filtersData && filtersData.categories === undefined) {
    return (
      <div className="d-flex justify-content-center pt-5 pb-5 blockedUIScreen">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else if ((ProductsData && ProductsData.length === 0) || ProductsData === null) {
    return (
      <div className="row">
        <span className="fs-1 fw-bold text-center mt-5 mb-5 pt-5 pb-5">Nie ma filtrów :-(</span>
      </div>
    );
  } else {
    return (
      <>
        <div className={toggleFilters ? 'filtersSwitch f1' : 'filtersSwitch f2'} id="filters">
          <div className={isLoading ? 'blockedUIScreen opaciTySwitch' : 'opaciTySwitch'}>
            <div className="fs-1 fw-bold pb-4">Filtry</div>
            <div className="text-left fw-bold">Wyszukiwanie: "{searchValue}"</div>
            <div>
              <div className="dropdown-divider mt-4 mb-4"></div>
              <div className="text-left">
                <div className="fs-3 fw-bold mb-4">Kategorie</div>
                {filtersData &&
                  filtersData.categories.map((category) => (
                    <div className=" text-left mb-2" key={'filterCategory' + category.categoryID}>
                      <label className="filterContainer">
                        <span className="ml-2">{category.categoryName}</span>
                        <span className="text-right fw-bold">
                          {` (${category.numberOfProducts})`}
                        </span>
                        <input
                          type="checkbox"
                          id={'filterCategory' + category.categoryID}
                          onChange={(event) => {
                            handleFilterChange(event);
                          }}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  ))}
                <div className="dropdown-divider mt-4 mb-4"></div>
              </div>
              <div className="text-left pb-2">
                <div className="fs-3 fw-bold mb-4">Producenci</div>
                {filtersData &&
                  filtersData.manufacturers.map((manufacturer) => (
                    <div
                      className=" text-left mb-2"
                      key={'filterManufacturer' + manufacturer.ManufacturerID}>
                      <label className="filterContainer">
                        <span className="ml-2">{manufacturer.ManufacturerName}</span>
                        <span className="text-right fw-bold">
                          {` (${manufacturer.numberOfProducts})`}
                        </span>
                        <input
                          type="checkbox"
                          id={`filterManufacturer${manufacturer.ManufacturerID}`}
                          onChange={(event) => {
                            handleFilterChange(event);
                          }}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  ))}
                <div className="dropdown-divider mt-4 mb-4"></div>
              </div>
              <div className="text-left pb-2">
                <div className="fs-3 fw-bold mb-4">Atrybuty</div>
                {filtersData &&
                  filtersData.filters.map((attribute, index) => (
                    <div className="text-left mb-4" key={`groupFilter${index}`}>
                      <div className="mb-3">
                        <span className="fw-bold fs-5">{attribute.property}</span>
                        <span className="text-right fw-bold fs-5">
                          {` (${attribute.numberOfProducts})`}
                        </span>
                      </div>
                      <div className=" mt-2">
                        {attribute.values.map((value, index) => (
                          <div
                            className="mb-2"
                            key={`group_F${attribute.property}value_F${value.value}`}>
                            <label className="filterContainer">
                              <span className="ml-2 fs-6">{value.value}</span>
                              <span className="text-right fw-bold fs-6">
                                {` (${value.numberOfProducts})`}
                              </span>
                              <input
                                type="checkbox"
                                id={`group_F${attribute.property}value_F${value.value}`}
                                onChange={(event) => {
                                  handleAtributeChange(event);
                                }}
                              />
                              <span className="checkmark"></span>
                            </label>
                          </div>
                        ))}
                      </div>
                      <div className="dropdown-divider mt-4 mb-4"></div>
                    </div>
                  ))}
              </div>
            </div>
            {showResetButton ? (
              <button
                type="button"
                className="btn btn-danger btn-lg btn-block mt-1 pt-1 resetFilterButton"
                onClick={() => handleResetFiltersClick()}>
                Reset Filtrów
              </button>
            ) : null}
            <HashLink smooth to={window.location.search + '#results'}>
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block mt-1 pt-1 HideFiltersButton"
                onClick={() => setToggleFilters(!toggleFilters)}>
                Zwiń filtry
              </button>
            </HashLink>
          </div>
        </div>
        <div className={toggleFilters ? 'filtersSwitch f2' : 'filtersSwitch f1'}>
          <h3 className="pb-3">Filtry</h3>
          <HashLink smooth to={window.location.search + '#filters'}>
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block mt-1 pt-1 HideFiltersButton"
              onClick={() => setToggleFilters(!toggleFilters)}>
              Rozwiń filtry
            </button>
          </HashLink>
        </div>
      </>
    );
  }
};

export default withRouter(FilterPanel);
