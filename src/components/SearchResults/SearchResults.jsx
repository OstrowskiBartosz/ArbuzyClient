import React from 'react';
import { Link, withRouter, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import './SearchResults.css';

import ResultPanel from './ResultPanel/ResultPanel';
import SortPanel from './SortPanel/SortPanel';
import FilterPanel from './FilterPanel/FilterPanel';
import { uncheckAll, checkFilters, checkAttributes, resetButtonCheck } from './utils';
import MoveBack from '../../features/additionalComponents/MoveBack/MoveBack';

const SearchResults = ({ searchValue }) => {
  let location = useLocation();
  const params = new URLSearchParams(window.location.search);

  const [isLoadingProductsData, setIsLoadingProductsData] = useState(true);
  const [productsData, setProductsData] = useState({});
  const [error, setError] = useState(null);
  const [numberOFProducts, setNumberOFProducts] = useState(0);
  const [showResetButton, setShowResetButton] = useState(false);

  const [sortSettings, setSortSettings] = useState({
    productLimit: params.get('l') ?? 10,
    productSort: params.get('s') ?? 'domyślne',
    productPage: params.get('p') ?? 1
  });
  const [priceSettings, setPriceSettings] = useState({ priceFrom: 0, priceTo: 0 });
  const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 0 });

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

    setPriceSettings({
      priceFrom: searchParams.get('priceFrom') ?? json.data.minPrice,
      priceTo: searchParams.get('priceTo') ?? json.data.maxPrice
    });

    setPriceRange({
      minPrice: json.data.minPrice,
      maxPrice: json.data.maxPrice
    });

    setSortSettings({
      productLimit: productLimit,
      productSort: productSort,
      productPage: productPage
    });
  }, [searchValue]);

  const resetButtonCheck = () => {
    setShowResetButton(false);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.forEach((value, key) => {
      if (key !== 'q' && key !== 'w' && key !== 's' && key !== 'l' && key !== 'p') {
        if (key === 'filterCategory' && JSON.parse(value).length > 0) setShowResetButton(true);
        if (key === 'filterManufacturer' && JSON.parse(value).length > 0) setShowResetButton(true);
        if (key === 'priceFrom' && Number(value) !== Math.floor(priceRange.minPrice))
          setShowResetButton(true);
        if (key === 'priceTo' && Number(value) !== Math.ceil(priceRange.maxPrice))
          setShowResetButton(true);
        if (
          key !== 'filterManufacturer' &&
          key !== 'filterCategory' &&
          key !== 'priceFrom' &&
          key !== 'priceTo'
        )
          setShowResetButton(true);
      }
    });
  };

  const setActiveFilters = useCallback(() => {
    uncheckAll();
    checkFilters();
    checkAttributes();
  }, []);

  useEffect(() => {
    fetchSearchData();
  }, [location, fetchSearchData]);

  useEffect(() => {
    setActiveFilters();
    resetButtonCheck();
  });

  return (
    <>
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
                searchValue={searchValue}
                isLoading={isLoadingProductsData}
                filtersData={productsData}
                ProductsData={productsData && productsData.products}
                priceSettings={priceSettings}
                priceRange={{ minPrice: productsData.minPrice, maxPrice: productsData.maxPrice }}
                showResetButton={showResetButton}
                fetchSearchData={fetchSearchData}
              />
            </div>
          </div>
          <div className="col-sm-7">
            <div className="row">
              <div className="col componentBackgroundColor mt-3 shadow-sm pt-3 bg-white rounded">
                <SortPanel
                  isLoading={isLoadingProductsData}
                  NumberOfpages={productsData && productsData.NumberOfpages}
                  activePage={productsData && productsData.activePage}
                  ProductsData={productsData && productsData.products}
                  sortSettings={sortSettings}
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
                  isLoading={isLoadingProductsData}
                  NumberOfpages={productsData && productsData.NumberOfpages}
                  activePage={productsData && productsData.activePage}
                  ProductsData={productsData && productsData.products}
                  sortSettings={sortSettings}
                  fetchSearchData={fetchSearchData}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-2"></div>
        </div>
      </div>
      <MoveBack moveBackText="Wróć do strony głównej" moveBackURL="/" />
    </>
  );
};

export default withRouter(SearchResults);
