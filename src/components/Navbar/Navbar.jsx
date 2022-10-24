import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import newAlert from '../../features/newAlert';

import ShoppingCart from '../ShoppingCart/ShoppingCart.jsx';
import SearchResults from '../SearchResults/SearchResults.jsx';
import LogOut from '../AuthenticationPanel/LogOut/LogOut.jsx';
import AuthenticationPanel from '../AuthenticationPanel/AuthenticationPanel.jsx';
import PageFooter from '../PageFooter/PageFooter.jsx';
import MainPage from '../MainPage/MainPage.jsx';
import Profile from '../Profile/Profile.jsx';
import Invoice from '../Invoice/Invoice.jsx';
import Product from '../Product/Product.jsx';
import CartSummary from '../CartSummary/CartSummary.jsx';
import PurchaseConfirmation from '../PurchaseConfirmation/PurchaseConfirmation.jsx';
import SearchHints from '../SearchHints/SearchHints.jsx';
import RouteNotFound from '../RouteNotFound/RouteNotFound.jsx';
import MessageAlert from '../MessageAlert/MessageAlert.jsx';

import { cartItemsChange } from '../../store/storeSlices/cartItemsSlice';

import './Navbar.css';
import ScrollToTop from '../../features/scrollToTop/scrollToTop.jsx';

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const Navbar = (props) => {
  const isLogged = useSelector((state) => state.session.isLogged);
  const numberOfProducts = useSelector((state) => state.cartItems.numberOfProducts);
  const updateCartItems = useSelector((state) => state.cartItems.updateCartItems);
  const dispatch = useDispatch();

  const params = new URLSearchParams(window.location.search);

  const [isLoadingCartData, setIsLoadingCartData] = useState(true);

  const [searchValue, setSearchValue] = useState(params.has('q') ? params.get('q') : '');
  const [searchValueToSend, setSearchValueToSend] = useState(
    params.has('q') ? params.get('q') : ''
  );

  const [searchCategory, setSearchCategory] = useState(
    params.has('w') ? params.get('w') : 'Wszędzie'
  );
  const [searchCategoryURL, setSearchCategoryURL] = useState('');

  const categoryList = [
    { categoryName: 'Dyski HDD', categoryID: 1 },
    { categoryName: 'Dyski SSD', categoryID: 2 },
    { categoryName: 'Karty graficzne', categoryID: 3 },
    { categoryName: 'Napędy optyczne', categoryID: 4 },
    { categoryName: 'Obudowy', categoryID: 5 },
    { categoryName: 'Pamieci RAM', categoryID: 6 },
    { categoryName: 'Płyty główne', categoryID: 7 },
    { categoryName: 'Procesory', categoryID: 8 },
    { categoryName: 'Zasilacze', categoryID: 9 }
  ];

  const fetchCartData = useCallback(async () => {
    const url = `${process.env.REACT_APP_API}/cart/getItemsNumber`;
    const response = await fetch(url, { method: 'get', credentials: 'include' });
    const json = await response.json();
    setIsLoadingCartData(false);
    dispatch(
      cartItemsChange({
        numberOfProducts: json.data.numberOfProducts ?? 0,
        updateCartItems: false
      })
    );
  }, [dispatch]);

  const getHintsSearchValue = (searchValueFromHints, urlFromHints, isProduct) => {
    if (isProduct) {
      setSearchValueToSend(searchValueFromHints ?? '');
      setSearchValue(searchValueFromHints ?? '');
    }

    let lastSearched = JSON.parse(localStorage.lastSearched);
    if (lastSearched.find((e) => e.value === searchValueFromHints)) return;
    lastSearched.push({ value: searchValueFromHints, url: urlFromHints, isProduct: isProduct });
    if (lastSearched.length > 5) lastSearched.shift();
    localStorage.lastSearched = JSON.stringify(lastSearched);
  };

  const handleCategoryChange = (categoryID, categoryName) => {
    if (categoryID === 0) {
      setSearchCategory(`Wszędzie`);
      setSearchCategoryURL('');
    } else {
      setSearchCategory(`${categoryName}`);
      setSearchCategoryURL(`&filterCategory=[${categoryID}]`);
    }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    if (searchValue.length === 0) {
      event.preventDefault();
      newAlert('danger', 'Wpisz coś!', 'Wpisz przynajmniej jeden znak.');
    } else {
      setSearchValueToSend(searchValue);
      getHintsSearchValue(searchValue);
    }
  };

  useEffect(() => {
    if (isLogged === true && updateCartItems) {
      fetchCartData();
    } else if (isLogged === false) {
      setIsLoadingCartData(false);
      dispatch(
        cartItemsChange({
          numberOfProducts: 0,
          updateCartItems: false
        })
      );
    }
  }, [fetchCartData, isLogged, dispatch, updateCartItems]);

  return (
    <Router history={history}>
      <div id="all">
        <nav className="navbar navbar-expand-lg navbar-light bg-light Navbar-border fixed-top d-flex justify-content-between">
          <div>
            <Link className="navbar-brand" to="/">
              <div className="NavbarLogoPart3 mr-4 ml-2">
                <svg
                  height="35px"
                  viewBox="0 0 512 512"
                  transform="translate(0,-8)"
                  width="35px"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="m430.640625 7.296875-6.820313-7.296875-242.65625 242.652344 14.585938 48.59375c.625 5.875-3.578125 11.945312-9.800781 13.976562l-15.503907 5.0625-4.617187 14.296875c-3.230469 10.011719-10.160156 17.132813-18.984375 19.957031h-.007812c-3.160157 0-12.535157-6.125-17.5625-9.421874-9.984376-6.535157-18.644532-12.167969-26.75-11.058594l-3.21875.4375-99.304688 99.324218 7.285156 6.832032c58.007813 54.316406 131.394532 81.347656 204.691406 81.347656 76.582032 0 153.070313-29.507812 211.792969-88.230469 114.925781-114.933593 117.949219-297.867187 6.871094-416.472656zm-311.9375 343.996094c11.839844 7.734375 23.050781 15.03125 33.371094 11.800781 15.300781-4.773438 27.023437-16.652344 32.164062-32.578125l1.574219-4.917969 6.136719-2c15.464843-5.054687 25.265625-20.5 22.808593-35.925781l-11.761718-39.519531 169.511718-169.5c35.59375 35.539062 54.886719 79.695312 55.917969 128.234375 1.191407 55.503906-22.933593 112.140625-66.175781 155.378906-43.238281 43.238281-99.808594 67.449219-155.378906 66.175781-48.535156-1.035156-92.695313-20.335937-128.230469-55.921875l28.328125-28.328125c3.335938 1.613282 8.390625 4.917969 11.734375 7.101563zm291.402344 58.800781c-105.152344 105.144531-271.144531 110.152344-382.195313 13.144531l37.257813-37.257812c38.757812 38.652343 88.464843 60.648437 141.300781 61.769531 1.441406.027344 2.878906.046875 4.320312.046875 59.351563 0 119.308594-26.046875 165.140626-71.886719 46.941406-46.941406 73.125-108.71875 71.839843-169.460937-1.132812-52.828125-23.121093-102.542969-61.777343-141.300781l37.257812-37.253907c97.003906 111.066407 91.996094 277.058594-13.144531 382.199219zm0 0" />
                  <path d="m71.886719 178.042969c0 8.007812-6.492188 14.496093-14.496094 14.496093-8.007813 0-14.496094-6.488281-14.496094-14.496093 0-8.003907 6.488281-14.496094 14.496094-14.496094 8.003906 0 14.496094 6.492187 14.496094 14.496094zm0 0" />
                  <path d="m187.863281 390.667969c0 8.007812-6.492187 14.5-14.496093 14.5-8.007813 0-14.496094-6.492188-14.496094-14.5 0-8.003907 6.488281-14.496094 14.496094-14.496094 8.003906 0 14.496093 6.492187 14.496093 14.496094zm0 0" />
                  <path d="m279.367188 261.460938c0 8.003906-6.488282 14.496093-14.496094 14.496093-8.003906 0-14.496094-6.492187-14.496094-14.496093 0-8.007813 6.492188-14.496094 14.496094-14.496094 8.007812 0 14.496094 6.488281 14.496094 14.496094zm0 0" />
                  <path d="m327.210938 213.621094c0 8.003906-6.492188 14.496094-14.496094 14.496094-8.007813 0-14.5-6.492188-14.5-14.496094 0-8.007813 6.492187-14.5 14.5-14.5 8.003906 0 14.496094 6.492187 14.496094 14.5zm0 0" />
                  <path d="m299.867188 377.640625c0 8.007813-6.492188 14.496094-14.496094 14.496094-8.007813 0-14.496094-6.488281-14.496094-14.496094s6.488281-14.496094 14.496094-14.496094c8.003906 0 14.496094 6.488281 14.496094 14.496094zm0 0" />
                  <path d="m347.707031 329.800781c0 8.003907-6.488281 14.496094-14.496093 14.496094-8.003907 0-14.496094-6.492187-14.496094-14.496094 0-8.007812 6.492187-14.496093 14.496094-14.496093 8.007812 0 14.496093 6.488281 14.496093 14.496093zm0 0" />
                  <path d="m395.550781 281.960938c0 8.003906-6.492187 14.496093-14.5 14.496093-8.003906 0-14.496093-6.492187-14.496093-14.496093 0-8.007813 6.492187-14.5 14.496093-14.5 8.007813 0 14.5 6.492187 14.5 14.5zm0 0" />
                  <path d="m375.050781 165.78125c0 8.003906-6.492187 14.496094-14.496093 14.496094-8.007813 0-14.496094-6.492188-14.496094-14.496094 0-8.007812 6.488281-14.496094 14.496094-14.496094 8.003906 0 14.496093 6.488282 14.496093 14.496094zm0 0" />
                  <path d="m245.203125 363.964844c0 8.007812-6.492187 14.496094-14.496094 14.496094-8.007812 0-14.496093-6.488282-14.496093-14.496094 0-8.003906 6.488281-14.496094 14.496093-14.496094 8.003907 0 14.496094 6.492188 14.496094 14.496094zm0 0" />
                  <path d="m294.175781 313.351562c0 8.003907-6.492187 14.496094-14.496093 14.496094-8.007813 0-14.496094-6.492187-14.496094-14.496094 0-8.007812 6.488281-14.496093 14.496094-14.496093 8.003906 0 14.496093 6.488281 14.496093 14.496093zm0 0" />
                  <path d="m342.5 265.027344c0 8.007812-6.492188 14.496094-14.5 14.496094-8.003906 0-14.496094-6.488282-14.496094-14.496094 0-8.007813 6.492188-14.496094 14.496094-14.496094 8.007812 0 14.5 6.488281 14.5 14.496094zm0 0" />
                  <path d="m100.878906 274.691406c0 8.007813-6.488281 14.496094-14.496094 14.496094-8.007812 0-14.496093-6.488281-14.496093-14.496094 0-8.007812 6.488281-14.496094 14.496093-14.496094 8.007813 0 14.496094 6.488282 14.496094 14.496094zm0 0" />
                  <path d="m158.867188 197.375c0 8.003906-6.488282 14.496094-14.496094 14.496094-8.007813 0-14.496094-6.492188-14.496094-14.496094 0-8.007812 6.488281-14.496094 14.496094-14.496094 8.007812 0 14.496094 6.488282 14.496094 14.496094zm0 0" />
                  <path d="m388.714844 220.453125c0 8.007813-6.488282 14.496094-14.496094 14.496094s-14.496094-6.488281-14.496094-14.496094 6.488282-14.496094 14.496094-14.496094 14.496094 6.488281 14.496094 14.496094zm0 0" />
                </svg>
              </div>
              <div className="NavbarLogoPart1 pr-1">A</div>
              <div className="NavbarLogoPart2">r b u z y . c o</div>
              <div className="NavbarLogoPart1 pl-1">m</div>
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggler"
            aria-controls="navbarToggler"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarToggler">
            <div className="center-Element-horizontal">
              <form className="form-inline" id="searchBar">
                <div className="position-relative">
                  <input
                    autoComplete="off"
                    className="form-control"
                    type="text"
                    placeholder="Nazwa produktu..."
                    aria-label="Search"
                    id="searchInput"
                    value={searchValue}
                    onChange={(event) => handleSearchChange(event)}
                    required></input>
                  <i
                    className={
                      searchValue.length > 0
                        ? 'fa fa-times position-absolute removeSearchValueCross'
                        : ''
                    }
                    onClick={() => {
                      setSearchValue('');
                    }}></i>
                </div>
                <div className="searchResultsHintsDisabler"></div>
                <SearchHints searchValue={searchValue} sendHintsSearchValue={getHintsSearchValue} />
                <li
                  className={'nav-item dropdown' + (searchCategory !== 'Wszędzie' ? ' pr-4' : '')}
                  id="searchBarDropdown">
                  <div
                    className="nav-link"
                    id="navbarCategory"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    {searchCategory} <i className="fas fa-chevron-down"></i>
                  </div>
                  <div className="position-relative">
                    <div className="dropdown-menu" aria-labelledby="navbarCategory">
                      <div
                        className="dropdown-item"
                        id="Wszędzie"
                        onClick={(event) => handleCategoryChange(0, 'Wszędzie')}>
                        Wszędzie
                      </div>
                      <div className="dropdown-divider"></div>
                      {categoryList.map((category, index) => (
                        <div
                          key={index}
                          className="dropdown-item"
                          onClick={(event) =>
                            handleCategoryChange(category.categoryID, category.categoryName)
                          }>
                          {category.categoryName}
                        </div>
                      ))}
                    </div>
                    <i
                      className={
                        searchCategory !== 'Wszędzie'
                          ? 'fa fa-times position-absolute removeSearchCategoryCross'
                          : ''
                      }
                      onClick={() => {
                        setSearchCategory('Wszędzie');
                      }}></i>
                  </div>
                </li>
                <Link
                  to={`/search?q=${searchValue}&s=domyślne&l=10&p=1${searchCategoryURL}`}
                  onClick={(event) => handleSearchSubmit(event)}>
                  <button type="submit">
                    Wyszukaj <i className="fa fa-search"></i>
                  </button>
                </Link>
              </form>
            </div>
            <div>
              <ul className="navbar-nav mr-auto">
                <li className={'nav-item pr-3'}>
                  <Link
                    className="font-weight-bold navbar-Font-Size nav-link cursor-pointer"
                    to="/profile/orders">
                    <span className="pr-2">Profil</span>
                    <i className="bigicon fas fa-user"></i>
                  </Link>
                </li>
                <li className={'nav-item pr-3'}>
                  <Link
                    className="font-weight-bold navbar-Font-Size nav-link cursor-pointer position-relative"
                    to="/cart">
                    <span className="pr-2">Koszyk</span>
                    <i className="bigicon fas fa-shopping-cart"></i>
                    <span className="badge badge-primary navbarCartStyle position-absolute">
                      {isLoadingCartData ? (
                        <div className="spinner-border smallSpinnerNavbar" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        numberOfProducts
                      )}
                    </span>
                  </Link>
                </li>
                {isLogged ? (
                  <li className={'nav-item'}>
                    <Link
                      className="font-weight-bold navbar-Font-Size nav-link cursor-pointer"
                      to="/logout">
                      <span className="pr-2">Wyloguj</span>
                      <i className="bigicon fas fa-sign-in-alt"></i>
                    </Link>
                  </li>
                ) : (
                  <li className={'nav-item small-left'}>
                    <Link
                      className="font-weight-bold navbar-Font-Size nav-link cursor-pointer"
                      to="/login">
                      <span className="pr-2">Zaloguj</span>
                      <i className="bigicon fas fa-sign-out-alt"></i>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <MessageAlert />
        <ScrollToTop>
          <Switch>
            <Route exact path="/">
              {<MainPage />}
            </Route>
            <Route path="/login">
              <AuthenticationPanel
                redirect={window.location.pathname + window.location.search}
                hasExpired={props.hasExpired}
              />
            </Route>
            <Route path="/logout">
              <LogOut />
            </Route>
            <Route path="/profile/:tabName?">
              <Profile />
            </Route>
            <Route path="/invoice/:invoiceID?">
              <Invoice />
            </Route>
            <Route path="/product/:productID?">
              <Product />
            </Route>
            <Route path="/search">
              <SearchResults searchValue={searchValueToSend} history={history} />
            </Route>
            <Route path="/cart">
              <ShoppingCart history={history} />
            </Route>
            <Route exact path="/cartsummary">
              <CartSummary history={history} />
            </Route>
            <Route exact path="/purchaseconfirmation/:invoiceID?">
              <PurchaseConfirmation history={history} />
            </Route>
            <Route>
              <RouteNotFound />
            </Route>
          </Switch>
        </ScrollToTop>
        <PageFooter />
      </div>
    </Router>
  );
};

export default Navbar;
