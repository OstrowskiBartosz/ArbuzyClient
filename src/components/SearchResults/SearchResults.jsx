import React from 'react';
import { Link, withRouter, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import './SearchResults.css';

import ResultPanel from './ResultPanel/ResultPanel';
import SortPanel from './SortPanel/SortPanel';
import FilterPanel from './FilterPanel/FilterPanel';

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
    if (
      key !== 'q' &&
      key !== 'w' &&
      key !== 's' &&
      key !== 'l' &&
      key !== 'p' &&
      key !== 'filterCategory' &&
      key !== 'filterManufacturer'
    ) {
      if (document.getElementById(key) !== null) {
        document.getElementById(key).checked = true;
      }
    }
  });
};

const SearchResults = ({ searchValue }) => {
  let location = useLocation();
  const params = new URLSearchParams(window.location.search);

  const [isLoadingProductsData, setIsLoadingProductsData] = useState(true);
  const [productsData, setProductsData] = useState({});
  const [numberOFProducts, setNumberOFProducts] = useState(0);
  const [showResetButton, setShowResetButton] = useState(false);

  const [sortSettings, setSortSettings] = useState({
    productLimit: Number(params.get('l')) ?? 10,
    productSort: params.get('s') ?? 'domyślne',
    productPage: Number(params.get('p')) ?? 1
  });

  const fetchSearchData = useCallback(async () => {
    setIsLoadingProductsData(true);
    const searchParams = new URLSearchParams(window.location.search);

    const productLimit = searchParams.get('l') ?? sortSettings.productLimit;
    const productSort = searchParams.get('s') ?? sortSettings.productSort;
    const productPage = searchParams.get('p') ?? sortSettings.productPage;

    searchParams.delete('s');
    searchParams.delete('p');
    searchParams.delete('l');
    searchParams.delete('q');
    searchParams.delete('w');

    const url = `${process.env.REACT_APP_API}/product/productName/${searchValue}?s=${productSort}&p=${productPage}&l=${productLimit}&${searchParams}`;
    const response = await fetch(url, { method: 'get', credentials: 'include' });
    const json = await response.json();

    setIsLoadingProductsData(false);
    setProductsData(json.data);
    setNumberOFProducts((json.data && json.data.numberOfProducts) ?? 0);
    setSortSettings({
      productLimit: productLimit,
      productSort: productSort,
      productPage: productPage
    });
  }, [searchValue]);

  const setActiveFilters = useCallback(() => {
    uncheckAll();
    checkFilters();
    checkAttributes();
  }, []);

  const resetButtonCheck = () => {
    setShowResetButton(false);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.forEach((value, key) => {
      if (key !== 'q' && key !== 'w' && key !== 's' && key !== 'l' && key !== 'p') {
        if (key === 'filterCategory' && JSON.parse(value).length > 0) setShowResetButton(true);
        if (key === 'filterManufacturer' && JSON.parse(value).length > 0) setShowResetButton(true);
        if (key !== 'filterManufacturer' && key !== 'filterCategory') setShowResetButton(true);
      }
    });
  };

  const getUpdatedSortSettings = (sortSettings) => {
    setSortSettings(sortSettings);
  };

  useEffect(() => {
    fetchSearchData();
  }, [location, fetchSearchData]);

  useEffect(() => {
    setActiveFilters();
    resetButtonCheck();
  });

  return (
    <div className="container-fluid pb-5 mb-5">
      <div className="row navbar-padding p-relative">
        <div className="col-1"></div>
        <div className="col-11 pt-5 text-left">
          <div>
            <h4>
              Znaleziono <span className="font-weight-bold">{numberOFProducts + ' '}</span>
              produktów
            </h4>
          </div>
        </div>
      </div>
      <div className="row" id="results">
        <div className="col-1"></div>
        <div className={'col-sm-2 pb-5 '}>
          <div className="col-12 componentBackgroundColor mt-3 shadow-sm p-3 mb-1 bg-white rounded">
            <FilterPanel
              filtersData={productsData}
              searchValue={searchValue}
              isLoading={isLoadingProductsData}
              ProductsData={productsData && productsData.products}
              showResetButton={showResetButton}
              fetchSearchData={fetchSearchData}
            />
          </div>
        </div>
        <div className="col-sm-7">
          <div className="row">
            <div className="col componentBackgroundColor mt-3 shadow-sm pt-3 bg-white rounded">
              <SortPanel
                sortData={productsData}
                ProductsData={productsData && productsData.products}
                sortSettings={sortSettings}
                isLoading={isLoadingProductsData}
                sendUpdatedSortSettings={getUpdatedSortSettings}
                fetchSearchData={fetchSearchData}
              />
            </div>
          </div>
          <div>
            <ResultPanel
              ProductsData={productsData && productsData.products}
              searchValue={searchValue}
              isLoading={isLoadingProductsData}
              fetchSearchData={fetchSearchData}
            />
          </div>
          <div className="row">
            <div className="col componentBackgroundColor mt-3 shadow-sm pt-3 bg-white rounded">
              <SortPanel
                sortData={productsData}
                ProductsData={productsData && productsData.products}
                sortSettings={sortSettings}
                isLoading={isLoadingProductsData}
                sendUpdatedSortSettings={getUpdatedSortSettings}
                fetchSearchData={fetchSearchData}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-2"></div>
      </div>
      <div className="row pt-4 mb-5 pt-5">
        <div className="col-lg-3"></div>{' '}
        <div className="col-lg-6">
          <Link className="btn btn-outline-secondary m-bot-10" to="/">
            <i className="fas fa-chevron-left"></i>
            <i className="fas fa-chevron-left"></i> Wróć do strony głównej
          </Link>
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
};

export default withRouter(SearchResults);
