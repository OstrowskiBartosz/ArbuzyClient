import React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import './SearchHints.css';
import useDebounce from '../../features/useDebounce';
import ListHints from './ListHints';
import ListLastSearched from './ListLastSearched';

const SearchHints = ({ searchValue, sendHintsSearchValue }) => {
  const searchHintsRef = useRef(null);

  const [showHints, setShowHints] = useState(false);

  const [hintsData, setHintsData] = useState([]);
  const [isLoadingHints, setIsLoadingHints] = useState(true);
  const [error, setError] = useState(null);

  const [showLastSearched, setShowLastSearched] = useState(false);
  const [lastSearchedData, setLastSearchedData] = useState([]);

  const hideHints = (searchValue, urlValue, isProduct) => {
    sendHintsSearchValue(searchValue, urlValue, isProduct);
    setShowLastSearched(false);
    setShowHints(false);
  };

  const hideHintsByMouseClick = useCallback((event) => {
    const clickedInside = searchHintsRef.current.contains(event.target);
    lastSearchedValues();

    if (!clickedInside && event.target.id !== 'searchInput') {
      setShowHints(false);
      setShowLastSearched(false);
    }
  }, []);

  const lastSearchedValues = () => {
    if (localStorage.lastSearched) {
      setLastSearchedData(JSON.parse(localStorage.lastSearched));
    } else {
      localStorage.lastSearched = JSON.stringify([]);
      setLastSearchedData(JSON.parse(localStorage.lastSearched));
    }
  };

  const removeLastSearched = (url) => {
    let lastSearched = JSON.parse(localStorage.lastSearched);
    const index = lastSearched.findIndex((e) => e.url === url);
    lastSearched.splice(index, 1);
    localStorage.lastSearched = JSON.stringify(lastSearched);
    lastSearchedValues();
  };

  const debouncedGetHints = useDebounce(
    () => (searchValue.length > 0 ? getHints(searchValue) : null),
    500
  );

  const fetchData = async (resource, searchValue) => {
    try {
      const url = `${process.env.REACT_APP_API}/${resource}/${resource}Name/${searchValue}`;
      const response = await fetch(url, { method: 'get', credentials: 'include' });
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
    }
  };

  const getHints = async (searchValue) => {
    setIsLoadingHints(true);
    let [productResponse, categoryResponse, manufacturerResponse] = await Promise.all([
      fetchData('product', searchValue),
      fetchData('category', searchValue),
      fetchData('manufacturer', searchValue)
    ]);

    setHintsData({
      products: productResponse?.data?.products ?? [],
      categories: categoryResponse?.data ?? [],
      manufacturers: manufacturerResponse?.data ?? []
    });

    if (productResponse && categoryResponse && manufacturerResponse) setIsLoadingHints(false);
  };

  useEffect(() => {
    lastSearchedValues();
    let el = document.getElementById('searchInput');

    el.addEventListener('focus', () => {
      setShowLastSearched(true);
    });
    document.addEventListener('click', hideHintsByMouseClick, false);

    return () => {
      document.removeEventListener('click', hideHintsByMouseClick, false);
      el.removeEventListener('focus');
    };
  }, [hideHintsByMouseClick]);

  useEffect(() => {
    lastSearchedValues();
    if (searchValue.length > 0) debouncedGetHints();
  }, [searchValue]);

  return (
    <div className="hintsContainer">
      <div
        id="searchHints"
        className={showHints || showLastSearched ? '' : 'hidden'}
        ref={searchHintsRef}>
        <div
          className={
            lastSearchedData.length > 0 || searchValue.length > 0
              ? 'hintsTable pl-2 pb-3'
              : 'hidden'
          }>
          <table className="w-100">
            {error ? (
              <tbody className="text-center">
                <tr className="text-center mb-5">
                  <td id="error">Error: {error}</td>
                </tr>
              </tbody>
            ) : null}

            {isLoadingHints && searchValue.length > 0 ? (
              <>
                <thead>
                  <tr>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr className="spinner-border" role="status">
                    <td className="sr-only">Loading...</td>
                  </tr>
                </tbody>
              </>
            ) : null}

            {!isLoadingHints && searchValue.length > 0 ? (
              <>
                <thead>
                  <tr>
                    <th>Produkty:</th>
                  </tr>
                </thead>
                <tbody>
                  {hintsData.products.length > 0 ? (
                    <ListHints
                      data={hintsData.products}
                      resource={'product'}
                      hideHints={hideHints}
                    />
                  ) : (
                    <tr>
                      <td>brak produktów</td>
                    </tr>
                  )}
                </tbody>
                <thead>
                  <tr>
                    <th>Kategorie:</th>
                  </tr>
                </thead>
                <tbody>
                  {hintsData.categories.length > 0 ? (
                    <ListHints
                      data={hintsData.categories}
                      resource={'category'}
                      hideHints={hideHints}
                    />
                  ) : (
                    <tr>
                      <td>brak kategorii</td>
                    </tr>
                  )}
                </tbody>
                <thead>
                  <tr>
                    <th>Producenci:</th>
                  </tr>
                </thead>
                <tbody>
                  {hintsData.manufacturers.length > 0 ? (
                    <ListHints
                      data={hintsData.manufacturers}
                      resource={'manufacturer'}
                      hideHints={hideHints}
                    />
                  ) : (
                    <tr>
                      <td>brak producentów</td>
                    </tr>
                  )}
                </tbody>
              </>
            ) : null}

            {lastSearchedData.length > 0 ? (
              <>
                <thead>
                  <tr>
                    <th>Ostatnio szukane:</th>
                  </tr>
                </thead>
                <tbody>
                  <ListLastSearched
                    data={lastSearchedData}
                    hideHints={hideHints}
                    removeLastSearched={removeLastSearched}
                  />
                </tbody>
              </>
            ) : null}
          </table>
        </div>
      </div>
    </div>
  );
};
export default SearchHints;
