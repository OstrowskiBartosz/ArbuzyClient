import React from 'react';
import { useState, useEffect } from 'react';
import history from '../../history';
import './SortPanel.css';
import { pagination, sortingMethods } from './utils';

const SortPanel = ({
  isLoading,
  NumberOfpages,
  activePage,
  ProductsData,
  sortSettings,
  fetchSearchData
}) => {
  const [productLimit, setProductLimit] = useState(sortSettings.productLimit);
  const [productSort, setProductSort] = useState(sortSettings.productSort);
  const [productPage, setProductPage] = useState(sortSettings.productPage);

  const [pages, setPages] = useState(pagination(NumberOfpages, activePage));
  const [nextPage, setNextPage] = useState(NumberOfpages !== activePage ? true : false);
  const [prevPage, setPrevPage] = useState(activePage > 1 ? true : false);

  const handlePageChange = (event) => {
    setProductPage(parseInt(event.target.id));
    const params = new URLSearchParams(window.location.search);
    params.set('p', parseInt(event.target.id));
    history.push(window.location.pathname + '?' + params);
    fetchSearchData({
      ...sortSettings,
      productPage: parseInt(event.target.id)
    });
    window.scrollTo(0, 0);
  };

  const handlePageChangeArrow = (sign) => {
    if (prevPage === false && sign === '-') return;
    if (nextPage === false && sign === '+') return;

    setProductPage(sign === '+' ? Number(productPage) + 1 : Number(productPage) - 1);
    const params = new URLSearchParams(window.location.search);
    params.set('p', sign === '+' ? Number(productPage) + 1 : Number(productPage) - 1);
    history.push(window.location.pathname + '?' + params);
    fetchSearchData({
      ...sortSettings,
      productPage: sign === '+' ? productPage + 1 : productPage - 1
    });
    window.scrollTo(0, 0);
  };

  const handleSortChange = (productSort) => {
    setProductSort(productSort);
    setProductPage(1);
    const params = new URLSearchParams(window.location.search);
    params.set('s', productSort);
    params.set('p', 1);
    history.push(window.location.pathname + '?' + params);
    fetchSearchData({
      ...sortSettings,
      productSort: productSort,
      productPage: 1
    });
    window.scrollTo(0, 0);
  };

  const handleLimitChange = (limit) => {
    setProductLimit(Number(limit));
    const params = new URLSearchParams(window.location.search);
    params.set('l', limit);
    params.set('p', 1);
    history.push(window.location.pathname + '?' + params);
    fetchSearchData({ ...sortSettings, productLimit: limit, productPage: 1 });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setProductLimit(sortSettings.productLimit);
    setProductSort(sortSettings.productSort);
    setProductPage(sortSettings.productPage);
  }, [sortSettings]);

  useEffect(() => {
    setPrevPage(activePage > 1 ? true : false);
    setNextPage(NumberOfpages !== activePage ? true : false);
    setPages(pagination(NumberOfpages, activePage));
  }, [NumberOfpages, activePage, ProductsData]);

  if (isLoading && ProductsData === undefined) {
    return (
      <div className="d-flex flex-row flex-wrap justify-content-between position-relative blockedUIScreen">
        <div>
          <ul className="pagination">
            <div className="btn btn-secondary">wyników na stronie</div>
            <li className="page-item active">
              <div className="page-link">10</div>
            </li>
            <li className="page-item">
              <div className="page-link">20</div>
            </li>
            <li className="page-item">
              <div className="page-link">30</div>
            </li>
          </ul>
        </div>
        <div>
          <ul className="pagination">
            <div className="btn btn-secondary">sortowanie </div>
            <div className="dropdown d-inline">
              <button className="btn btn-primary dropdown-toggle" type="button">
                domyślne
              </button>
            </div>
          </ul>
        </div>
        <div>
          <nav>
            <ul className="pagination">
              <div className="btn btn-secondary d-inline">strona</div>
              <div className="page-item disabled">
                <div className="page-link">
                  <i className="fas fa-chevron-left"></i>
                </div>
              </div>
              <li className="page-item active">
                <div className="page-link">1</div>
              </li>
              <li className="page-item">
                <div className="page-link">2</div>
              </li>
              <li className="page-item">
                <div className="page-link">3</div>
              </li>
              <div className="page-item disabled">
                <div className="page-link">
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
            </ul>
          </nav>
        </div>
      </div>
    );
  } else if ((ProductsData && ProductsData.length === 0) || ProductsData === null) {
    return (
      <div className="row">
        <div className="col-12 componentBackgroundColor shadow pb-3 bg-white rounded">
          <span className="fs-5 fw-bold text-center">Nie ma co sortować :-(</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className={isLoading ? 'blockedUIScreen opaciTySwitch' : 'opaciTySwitch'}>
        <div className="d-flex flex-row flex-wrap justify-content-between">
          <div>
            <ul className="pagination">
              <div className="btn btn-secondary">wyników na stronie</div>
              <li className={'page-item ' + (Number(productLimit) === 10 ? 'active' : '')}>
                <div className="page-link page-size" onClick={() => handleLimitChange(10)}>
                  10
                </div>
              </li>
              <li className={'page-item ' + (Number(productLimit) === 20 ? 'active' : '')}>
                <div className="page-link page-size" onClick={() => handleLimitChange(20)}>
                  20
                </div>
              </li>
              <li className={'page-item ' + (Number(productLimit) === 30 ? 'active' : '')}>
                <div className="page-link page-size" onClick={() => handleLimitChange(30)}>
                  30
                </div>
              </li>
            </ul>
          </div>
          <div>
            <ul className="pagination">
              <div className="btn btn-secondary">sortowanie </div>
              <div className="dropdown d-inline">
                <button
                  className="btn btn-primary dropdown-toggle"
                  type="button"
                  id="activeSearchSorting2"
                  data-toggle="dropdown">
                  {productSort}
                </button>
                <div className="dropdown-menu" aria-labelledby="activeSearchSorting2">
                  {sortingMethods.map((sorting, index) => (
                    <div
                      key={index}
                      className="dropdown-item pointer"
                      id={sorting.display}
                      onClick={() => handleSortChange(sorting.display)}>
                      {sorting.display}
                    </div>
                  ))}
                </div>
              </div>
            </ul>
          </div>
          <div>
            <nav>
              <ul className="pagination pagination-size">
                <div className="btn btn-secondary d-inline">strona</div>
                <div
                  className={'page-item ' + (prevPage ? '' : 'disabled')}
                  onClick={() => handlePageChangeArrow('-')}
                  disabled={prevPage ? false : 'disabled'}>
                  <div className="page-link page-size">
                    <i className="fas fa-chevron-left"></i>
                  </div>
                </div>
                {pages.map((page, index) =>
                  page !== '...' ? (
                    <li
                      className={page === activePage ? 'page-item active' : 'page-item'}
                      key={`page${index}`}>
                      <div
                        className="page-link page-size"
                        id={page}
                        onClick={(event) => handlePageChange(event)}>
                        {page}
                      </div>
                    </li>
                  ) : (
                    <li
                      className={page === activePage ? 'page-item active' : 'page-item'}
                      key={`page${index}`}>
                      <div className="page-link disabled pagination-disabled page-size" id={page}>
                        {page}
                      </div>
                    </li>
                  )
                )}
                <div
                  className={'page-item ' + (nextPage ? '' : 'disabled')}
                  onClick={() => handlePageChangeArrow('+')}
                  disabled={nextPage ? false : 'disabled'}>
                  <div className="page-link page-size">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                </div>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
};

export default SortPanel;
