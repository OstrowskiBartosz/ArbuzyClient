import React from 'react';
import { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import { withRouter } from 'react-router-dom';
import useDebounce from '../../../features/useDebounce';
import newAlert from '../../../features/newAlert';

import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import history from '../../history';
import '../SearchResults.css';

import { readyToRequest } from './utils';

const FilterPanel = ({
  searchValue,
  isLoading,
  filtersData,
  ProductsData,
  priceSettings,
  priceRange,
  showResetButton,
  fetchSearchData
}) => {
  const [toggleFilters, setToggleFilters] = useState(false);
  const [priceValue, setPriceValue] = useState([]);

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
          searchParams.delete('priceFrom');
          searchParams.delete('priceTo');
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

  const handlePriceSliderChange = (e, newValue) => {
    setPriceValue([...newValue]);
    debounceReload();
  };

  const handlePriceInputChange = (event, index) => {
    let newPrice = [...priceValue];
    newPrice[index] = Number(event.target.value.replace(/\D/g, ''));
    setPriceValue(newPrice);
    debounceReload();
  };

  const debounceReload = useDebounce(
    () => readyToRequest(priceValue, priceRange, setPriceValue, fetchSearchData),
    2000
  );

  useEffect(() => {
    setPriceValue([
      Math.floor(Number(priceSettings.priceFrom)),
      Math.ceil(Number(priceSettings.priceTo))
    ]);
  }, [priceSettings]);

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
      <>
        <div className="row">
          <span className="fs-1 fw-bold text-center mt-5 mb-5 pt-5 pb-5">Nie ma filtrów :-(</span>
        </div>
        <div>
          {showResetButton ? (
            <button
              className="btn btn-danger btn-lg btn-block mt-1 pt-1 resetFilterButton"
              onClick={() => handleResetFiltersClick()}>
              Reset Filtrów
            </button>
          ) : null}
        </div>
      </>
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
                <div className="fs-3 fw-bold mb-4">Zakres cenowy</div>
                <div className="ml-4 mr-4">
                  <Slider
                    getAriaLabel={() => 'Price range'}
                    value={priceValue}
                    onChange={handlePriceSliderChange}
                    valueLabelDisplay="auto"
                    min={Math.floor(priceRange.minPrice)}
                    max={Math.ceil(priceRange.maxPrice)}
                    step={1}
                  />
                </div>
                <div className="pb-2"></div>
                <div className="d-flex justify-content-between ml-2 mr-2">
                  <FormControl sx={{ width: '12ch' }} variant="outlined">
                    <FormHelperText sx={{ marginLeft: '0ch' }} id="outlined-weight-helper-text">
                      Cena od:
                    </FormHelperText>
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      value={Math.floor(priceValue[0])}
                      onChange={(event) => handlePriceInputChange(event, 0)}
                      endAdornment={<InputAdornment position="end">zł</InputAdornment>}
                      aria-describedby="outlined-weight-helper-text"
                    />
                    <FormHelperText sx={{ marginLeft: '0ch' }} id="outlined-weight-helper-text">
                      min: {Math.floor(priceRange.minPrice)} zł
                    </FormHelperText>
                  </FormControl>
                  <FormControl sx={{ width: '12ch' }} variant="outlined">
                    <FormHelperText sx={{ marginLeft: '0ch' }} id="outlined-weight-helper-text">
                      Cena do:
                    </FormHelperText>
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      value={Math.ceil(priceValue[1])}
                      onChange={(event) => handlePriceInputChange(event, 1)}
                      endAdornment={<InputAdornment position="end">zł</InputAdornment>}
                      aria-describedby="outlined-weight-helper-text"
                    />
                    <FormHelperText sx={{ marginLeft: '0ch' }} id="outlined-weight-helper-text">
                      Max: {Math.ceil(priceRange.maxPrice)} zł
                    </FormHelperText>
                  </FormControl>
                </div>

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
                className="btn btn-danger btn-lg btn-block mt-1 pt-1 resetFilterButton"
                onClick={() => handleResetFiltersClick()}>
                Reset Filtrów
              </button>
            ) : null}
            <HashLink smooth to={window.location.search + '#results'}>
              <button
                className="btn btn-primary btn-lg btn-block mt-1 pt-1 HideFiltersButton"
                onClick={() => setToggleFilters(!toggleFilters)}>
                Zwiń filtry
              </button>
            </HashLink>
          </div>
        </div>
        <div className={toggleFilters ? 'filtersSwitch f2' : 'filtersSwitch f1'}>
          <h3 className="pb-3">Filtry</h3>
          {showResetButton ? (
            <button
              className="btn btn-danger btn-lg btn-block mt-1 pt-1 resetFilterButton"
              onClick={() => handleResetFiltersClick()}>
              Reset Filtrów
            </button>
          ) : null}
          <HashLink smooth to={window.location.search + '#filters'}>
            <button
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
