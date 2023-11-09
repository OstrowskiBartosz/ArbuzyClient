import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import newAlert from '../../features/newAlert';
import watermelon from '../../images/watermelon.svg';

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
import { getData } from '../../features/sharableMethods/httpRequests';

import './Navbar.css';
import ScrollToTop from '../../features/additionalComponents/scrollToTop/scrollToTop.jsx';

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
  const [searchValueToSend, setSearchValueToSend] = useState(params.has('q') ? params.get('q') : '');

  const [searchCategory, setSearchCategory] = useState(params.has('w') ? params.get('w') : 'Wszędzie');
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
    try {
      const endpoint = `cart/getItemsNumber`;
      const fetch = await getData(endpoint);
      const response = await fetch.json();
      setIsLoadingCartData(false);
      dispatch(
        cartItemsChange({
          numberOfProducts: response?.data?.numberOfProducts ?? 0,
          updateCartItems: false
        })
      );
    } catch (err) {}
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
    document.getElementById('navbarCategoryDropDown').classList.remove('show');
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
      getHintsSearchValue(searchValue, `/search?q=${searchValue}&s=domyślne&l=10&p=1`, false);
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

  useEffect(() => {
    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach((l) => {
      l.addEventListener('click', () => {
        document.getElementById('navbarToggler').classList.remove('show');
      });
    });
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', () => {
      document.getElementById('navbarToggler').classList.remove('show');
    });
    const searchHints = document.getElementById('searchHints');
    searchHints.addEventListener('click', () => {
      document.getElementById('navbarToggler').classList.remove('show');
    });
  }, []);

  return (
    <Router>
      <div id="all">
        <nav className="navbar navbar-expand-lg navbar-light bg-light Navbar-border fixed-top d-flex justify-content-between">
          <div>
            <Link className="navbar-brand" to="/">
              <div className="NavbarLogoPart3 mr-4 ml-2">
                <img className="watermelonLogo" src={watermelon} alt="Watermelon logo" />
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
                    className={searchValue.length > 0 ? 'fa fa-times position-absolute removeSearchValueCross' : ''}
                    onClick={() => {
                      setSearchValue('');
                    }}></i>
                </div>
                <div className="searchResultsHintsDisabler"></div>
                <SearchHints searchValue={searchValue} sendHintsSearchValue={getHintsSearchValue} />
                <li className={'nav-item dropdown' + (searchCategory !== 'Wszędzie' ? ' pr-4' : '')} id="searchBarDropdown">
                  <div className="nav-link" id="navbarCategory" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {searchCategory} <i className="fas fa-chevron-down"></i>
                  </div>
                  <div className="position-relative">
                    <div className="dropdown-menu" aria-labelledby="navbarCategory" id="navbarCategoryDropDown">
                      <div className="dropdown-item" id="Wszędzie" onClick={(event) => handleCategoryChange([1, 2, 3, 4, 5, 6, 7, 8, 9], 'Wszędzie')}>
                        Wszędzie
                      </div>
                      <div className="dropdown-divider"></div>
                      {categoryList.map((category, index) => (
                        <div
                          key={index}
                          className="dropdown-item"
                          onClick={(event) => handleCategoryChange(category.categoryID, category.categoryName)}>
                          {category.categoryName}
                        </div>
                      ))}
                    </div>
                    <i
                      className={searchCategory !== 'Wszędzie' ? 'fa fa-times position-absolute removeSearchCategoryCross' : ''}
                      onClick={() => {
                        setSearchCategory('Wszędzie');
                      }}></i>
                  </div>
                </li>
                <Link
                  id="searchButton"
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
                  <Link className="font-weight-bold navbar-Font-Size nav-link cursor-pointer" to="/profile/orders">
                    <span className="pr-2">Profil</span>
                    <i className="bigicon fas fa-user"></i>
                  </Link>
                </li>
                <li className={'nav-item pr-3'}>
                  <Link className="font-weight-bold navbar-Font-Size nav-link cursor-pointer position-relative" to="/cart">
                    <span className="pr-2">Koszyk</span>
                    <i className="bigicon fas fa-shopping-cart"></i>
                    <span className="badge badge-primary navbarCartStyle position-absolute">
                      {isLoadingCartData ? (
                        <div className="spinner-border smallSpinnerNavbar" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span title="Number of products in cart"> {numberOfProducts}</span>
                      )}
                    </span>
                  </Link>
                </li>
                {isLogged ? (
                  <li className={'nav-item'}>
                    <Link className="font-weight-bold navbar-Font-Size nav-link cursor-pointer" to="/logout">
                      <span className="pr-2">Wyloguj</span>
                      <i className="bigicon fas fa-sign-in-alt"></i>
                    </Link>
                  </li>
                ) : (
                  <li className={'nav-item small-left'}>
                    <Link className="font-weight-bold navbar-Font-Size nav-link cursor-pointer" to="/login">
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
              {<MainPage setSearchValueToSend={setSearchValueToSend} />}
            </Route>
            <Route path="/login">
              <AuthenticationPanel redirect={window.location.pathname + window.location.search} hasExpired={props.hasExpired} />
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
              <Product setSearchValueToSend={setSearchValueToSend} />
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
