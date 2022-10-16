import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SearchHints.css';

const SearchHints = (props) => {
  const searchHintsRef = useRef(null);

  const [showSearchHints, setShowSearchHints] = useState(false);
  const [searchHints, setSearchHints] = useState([]);
  const [searchHintsLoaded, setSearchHintsLoaded] = useState(false);

  const [showLastSearched, setShowLastSearched] = useState(false);
  const [lastSearched, setLastSearched] = useState([]);

  const clickedOutsideSearchHints = (event) => {
    lastSearchedValues();
    if (
      searchHintsRef.current &&
      !searchHintsRef.current.contains(event.target) &&
      event.target.id !== 'NavbarLeftBar'
    ) {
      setShowSearchHints(false);
      setShowLastSearched(false);
    }
  };

  const lastSearchedValues = () => {
    if (localStorage.lastSearched) {
      setLastSearched(JSON.parse(localStorage.lastSearched));
    } else {
      localStorage.lastSearched = JSON.stringify([]);
      setLastSearched(JSON.parse(localStorage.lastSearched));
    }
  };

  const removeLastSearchedValue = (value) => {
    let lastSearched = JSON.parse(localStorage.lastSearched);
    const index = lastSearched.indexOf(value);
    lastSearched.splice(index, 1);
    localStorage.lastSearched = JSON.stringify(lastSearched);
    lastSearchedValues();
  };

  const fetchSearchData = () => {
    const data = {
      searchValue: props.searchValue,
      searchCategory: props.searchCategory
    };
    fetch('http://localhost:9000/searchHints', {
      method: 'post',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.text())
      .then((response) => {
        let responseobject = JSON.parse(response);
        setSearchHints(responseobject);
        setSearchHintsLoaded(true);
        lastSearchedValues();
      });
  };

  const hideAllHints = (searchValue) => {
    props.sendHintsSearchValue(searchValue);
    setShowLastSearched(false);
    setShowSearchHints(false);
  };

  useEffect(() => {
    lastSearchedValues();
    let el = document.getElementById('NavbarLeftBar');
    el.addEventListener('focus', () => {
      setShowLastSearched(true);
    });
    document.addEventListener('click', clickedOutsideSearchHints, false);
    return () => {
      document.removeEventListener('click', clickedOutsideSearchHints, false);
      el.removeEventListener('focus');
    };
  }, []);

  useEffect(() => {
    lastSearchedValues();
    if (props.searchValue.length > 0) {
      fetchSearchData();
    }
  }, [props.searchValue]);

  return (
    <div className="searchHintsTableParent">
      <div
        id="searchResultHints"
        className={showSearchHints || showLastSearched ? '' : 'hidden'}
        ref={searchHintsRef}>
        <div
          className={
            lastSearched.length > 0 || props.searchValue.length > 0
              ? 'searchHintsTable pl-2 pb-3'
              : 'hidden'
          }>
          <table className="tableWidth">
            {lastSearched.length > 0 && showLastSearched && props.searchValue.length === 0 ? (
              <>
                <thead>
                  <tr>
                    <th>Ostatnio szukane:</th>
                  </tr>
                </thead>
                <tbody>
                  {lastSearched.map(
                    (searchTerm, index) =>
                      index < 8 && (
                        <tr key={'searchTerm' + index}>
                          <td>
                            <Link
                              to={`/search?q=${searchTerm}`}
                              onClick={() => hideAllHints(searchTerm)}>
                              <i className="fa fa-search pr-1"></i>
                              {searchTerm}
                            </Link>
                            <i
                              className="fa fa-times float-right mr-2 pt-1 lastSearchedCross"
                              onClick={() => removeLastSearchedValue(searchTerm)}></i>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </>
            ) : null}
            {searchHintsLoaded && props.searchValue.length > 0 ? (
              <>
                <thead>
                  <tr>
                    <th>Produkty:</th>
                  </tr>
                </thead>
                <tbody>
                  {searchHints.products.map(
                    (product, index) =>
                      index < 5 && (
                        <tr key={'product' + index}>
                          <td>
                            <Link
                              to={`/search?q=${product.nazwa_produktu}`}
                              onClick={() => {
                                hideAllHints(product.nazwa_produktu);
                              }}>
                              <i className="fa fa-search pr-1"></i>
                              {product.nazwa_produktu}
                            </Link>
                          </td>
                        </tr>
                      )
                  )}
                  {searchHints.products.length === 0 && (
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
                  {searchHints.categories.map(
                    (category, index) =>
                      index < 5 && (
                        <tr key={'category' + index}>
                          <td>
                            <Link
                              to={`/search?w=${category.nazwa_kategorii}`}
                              onClick={() => hideAllHints()}>
                              <i className="fa fa-search pr-1"></i>
                              {category.nazwa_kategorii}
                            </Link>
                          </td>
                        </tr>
                      )
                  )}
                  {searchHints.categories.length === 0 && (
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
                  {searchHints.producers.map(
                    (producer, index) =>
                      index < 5 && (
                        <tr key={'producer' + index}>
                          <td>
                            <Link
                              to={`/search?g_p${producer.id_producenta}=${producer.nazwa_producenta}=tak`}
                              onClick={() => hideAllHints()}>
                              <i className="fa fa-search pr-1"></i>
                              {producer.nazwa_producenta}
                            </Link>
                          </td>
                        </tr>
                      )
                  )}
                  {searchHints.producers.length === 0 && (
                    <tr>
                      <td>brak producentów</td>
                    </tr>
                  )}
                </tbody>
                {lastSearched.length > 0 ? (
                  <>
                    <thead>
                      <tr>
                        <th>Ostatnio szukane:</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lastSearched.map(
                        (searchTerm, index) =>
                          index < 5 && (
                            <tr key={'searchTerm' + index}>
                              <td>
                                <Link to={`/search?q=${searchTerm}`} onClick={() => hideAllHints()}>
                                  <i className="fa fa-search pr-1"></i>
                                  {searchTerm}
                                </Link>
                                <i
                                  className="fa fa-times float-right mr-2 pt-1 lastSearchedCross"
                                  onClick={() => removeLastSearchedValue(searchTerm)}></i>
                              </td>
                            </tr>
                          )
                      )}
                    </tbody>
                  </>
                ) : null}
              </>
            ) : null}
            {!searchHintsLoaded && props.searchValue.length > 0 ? (
              <>
                <tbody>
                  <tr className="spinner-border mt-4" role="status">
                    <td className="sr-only">Loading...</td>
                  </tr>
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
