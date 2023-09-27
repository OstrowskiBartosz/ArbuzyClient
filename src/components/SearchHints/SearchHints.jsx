import React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import './SearchHints.css';
import useDebounce from '../../features/useDebounce';
import ListHints from './ListHints/ListHints';
import ListLastSearched from './ListLastSearched/ListLastSearched';
import { getData } from '../../features/sharableMethods/httpRequests';

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

  const debouncedGetHints = useCallback(
    useDebounce(() => getHints(searchValue), 750),
    []
  );

  const fetchData = async (resource, searchValue) => {
    try {
      const endpoint = `${resource}/${resource}Hints/${searchValue}`;
      const request = await getData(endpoint);
      const response = await request.json();
      return response;
    } catch (err) {
      setError(err.message);
    }
  };

  const getHints = async (searchValue) => {
    if (searchValue === '') return;
    setError(null);
    setIsLoadingHints(true);
    let [productResponse, categoryResponse, manufacturerResponse] = await Promise.all([
      fetchData('product', searchValue),
      fetchData('category', searchValue),
      fetchData('manufacturer', searchValue)
    ]);
    setHintsData({
      products: productResponse?.data ?? [],
      categories: categoryResponse?.data ?? [],
      manufacturers: manufacturerResponse?.data ?? []
    });

    if (productResponse && categoryResponse && manufacturerResponse) setIsLoadingHints(false);
  };

  useEffect(() => {
    lastSearchedValues();
    let el = document.getElementById('searchInput');

    el?.addEventListener('focus', () => {
      setShowLastSearched(true);
    });
    document.addEventListener('click', hideHintsByMouseClick, false);

    return () => {
      document.removeEventListener('click', hideHintsByMouseClick, false);
      el?.removeEventListener('focus', null);
    };
  }, [hideHintsByMouseClick]);

  useEffect(() => {
    lastSearchedValues();
    debouncedGetHints();
  }, [searchValue, debouncedGetHints]);

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
          {error ? (
            <table className="w-100">
              <tbody className="text-center">
                <tr className="text-center mb-5">
                  <td id="error">Error: {error}</td>
                </tr>
              </tbody>
            </table>
          ) : null}

          {isLoadingHints && searchValue.length > 0 ? (
            <table className="w-100 mb-5">
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
            </table>
          ) : null}

          {!isLoadingHints && searchValue.length > 0 ? (
            <>
              <ListHints
                data={hintsData.products}
                resource={'product'}
                hideHints={hideHints}
                searchResource={'Produkty'}
              />
              <ListHints
                data={hintsData.categories}
                resource={'category'}
                hideHints={hideHints}
                searchResource={'Kategorie'}
              />
              <ListHints
                data={hintsData.manufacturers}
                resource={'manufacturer'}
                hideHints={hideHints}
                searchResource={'Producenci'}
              />
            </>
          ) : null}

          {lastSearchedData.length > 0 ? (
            <ListLastSearched
              data={lastSearchedData}
              hideHints={hideHints}
              removeLastSearched={removeLastSearched}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default SearchHints;
