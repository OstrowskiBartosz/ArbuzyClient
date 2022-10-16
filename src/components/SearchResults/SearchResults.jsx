import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import history from '../history';
import './SearchResults.css';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    const params = new URLSearchParams(window.location.search);
    this.state = {
      searchValue: params.has('q') ? params.get('q') : '',
      searchCategory: params.has('w') ? params.get('w') : 'Wszędzie',

      prevPageAvailable: false,
      nextPageAvailable: false,
      page: params.has('p') ? params.get('p') : 1,
      numberOfPages: 0,
      resItemWord: 'produktów',
      resItemCount: 0,

      activeSearchLimit: params.has('l') ? params.get('l') : 10,
      searchLimit10: false,
      searchLimit20: false,
      searchLimit30: false,
      ['searchLimit' + (params.has('l') ? params.get('l') : 10)]: 'true',

      activeSearchSorting: params.has('s') ? params.get('s') : 'domyślne',

      isLoading: true,
      ApiResponse: [],
      ProductLoading: [],
      LastPage: ''
    };
  }

  componentDidUpdate(prevState, prevProps) {
    window.onpopstate = (e) => {
      this.setStateWithParams();
    };

    if (
      prevState.searchValue !== this.props.searchValue ||
      prevState.searchCategory !== this.props.searchCategory
    ) {
      this.setStateWithParams();
    }
    const params = new URLSearchParams(window.location.search);
    params.forEach((value, key) => {
      if (
        key !== 'q' &&
        key !== 'w' &&
        key !== 's' &&
        key !== 'l' &&
        key !== 'p' &&
        null !== document.getElementById(key)
      ) {
        document.getElementById(key).checked = true;
      }
    });
    if (new URLSearchParams(window.location.search).has('q')) {
      if (new URLSearchParams(window.location.search).get('q') !== this.state.searchValue) {
        this.setStateWithParams();
      }
    }
    if (new URLSearchParams(window.location.search).has('w')) {
      if (new URLSearchParams(window.location.search).get('w') !== this.state.searchCategory) {
        this.setStateWithParams();
      }
    }
  }

  componentDidMount() {
    this.fetchSearchData();
    this.newLastSearch();
    this.props.sendHintsSearchValue(this.state.searchValue);
  }

  newLastSearch() {
    let lastSearched = JSON.parse(localStorage.lastSearched);

    if (lastSearched.includes(this.state.searchValue) === false && this.state.searchValue !== '') {
      lastSearched.push(this.state.searchValue);
      if (lastSearched.length > 5) {
        lastSearched.shift();
      }
      localStorage.lastSearched = JSON.stringify(lastSearched);
    }
  }

  setStateWithParams() {
    const params = new URLSearchParams(window.location.search);
    this.setState(
      {
        searchValue: params.has('q') ? params.get('q') : ' ',
        searchCategory: params.has('w') ? params.get('w') : 'Wszędzie',

        pageLimit: 0,
        prevPageAvailable: false,
        nextPageAvailable: false,
        page: params.has('p') ? params.get('p') : 1,
        numberOfPages: 0,
        resItemWord: 'produktów',
        resItemCount: 0,

        activeSearchLimit: params.has('l') ? params.get('l') : 10,
        searchLimit10: false,
        searchLimit20: false,
        searchLimit30: false,
        ['searchLimit' + (params.has('l') ? params.get('l') : 10)]: 'true',

        activeSearchSorting: params.has('s') ? params.get('s') : 'domyślne',

        isLoading: true,
        ApiResponse: [],
        ProductLoading: [],
        hideFilters: false
      },
      () => this.fetchSearchData()
    );
  }

  handleFilterClick() {
    const params = new URLSearchParams(window.location.search);
    params.set('p', 1);
    this.setState({
      page: 1
    });
    this.fetchSearchData();
  }

  fetchSearchData() {
    const data = {
      nazwa_produktu: this.state.searchValue,
      kategoria: this.state.searchCategory,
      strona: this.state.page,
      limit: this.state.activeSearchLimit,
      sort: this.state.activeSearchSorting,
      link: window.location.search
    };
    fetch('http://localhost:9000/search', {
      method: 'post',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.text())
      .then((response) => {
        var responseobject = JSON.parse(response);

        let produkt = '';
        if (responseobject.liczba_przedmiotow === 0 || responseobject.liczba_przedmiotow > 4) {
          produkt = 'produktów';
        } else if (responseobject.liczba_przedmiotow > 1 && responseobject.liczba_przedmiotow < 5) {
          produkt = 'produkty';
        } else {
          produkt = 'produkt';
        }

        var nextPageAvailable, prevPageAvailable;
        if (
          Math.ceil(responseobject.liczba_przedmiotow / this.state.activeSearchLimit) ===
          this.state.page
        ) {
          nextPageAvailable = false;
        } else {
          nextPageAvailable = true;
        }

        if (this.state.page > 1) {
          prevPageAvailable = true;
        } else {
          prevPageAvailable = false;
        }

        if (undefined !== responseobject.produkty) {
          var produkty = new Array(responseobject.produkty.length);
          for (var i = 0; i < responseobject.produkty.length; i++) {
            produkty[i] = new Array(2);
            produkty[i][0] = responseobject.produkty[i].id_produktu;
            produkty[i][1] = false;
          }
        }

        this.setState({
          ApiResponse: response,
          isLoading: false,
          resItemCount: responseobject.liczba_przedmiotow,
          numberOfPages: Math.ceil(
            responseobject.liczba_przedmiotow / this.state.activeSearchLimit
          ),
          resItemWord: produkt,
          nextPageAvailable: nextPageAvailable,
          prevPageAvailable: prevPageAvailable,
          ProductLoading: produkty,
          pageLimit: Math.ceil(responseobject.liczba_przedmiotow / this.state.activeSearchLimit)
        });
        window.scrollTo(0, 0);
      })
      .catch((err) => err);
  }

  handlePageChange(event) {
    this.setState(
      {
        page: parseInt(event.target.id),
        LastPage: window.location.search
      },
      () => {
        this.fetchSearchData();
        const params = new URLSearchParams(window.location.search);
        params.set('p', this.state.page);
        this.props.history.push(window.location.pathname + '?' + params);
      }
    );
  }

  handlePageChangeArrow(sign) {
    if (this.state.prevPageAvailable === false && sign === 'minus') {
      return;
    }
    if (this.state.nextPageAvailable === false && sign === 'plus') {
      return;
    }
    this.setState(
      {
        page: sign === 'plus' ? this.state.page + 1 : this.state.page - 1,
        LastPage: window.location.search
      },
      () => {
        this.fetchSearchData();
        const params = new URLSearchParams(window.location.search);
        params.set('p', this.state.page);
        history.push(window.location.pathname + '?' + params);
      }
    );
  }

  switchHiddenFilters(bool) {
    this.setState({
      hideFilters: bool
    });
  }

  handleSortChange(event) {
    event.preventDefault();
    this.setState(
      {
        activeSearchSorting: event.target.id,
        page: 1
      },
      () => {
        this.fetchSearchData();
        const params = new URLSearchParams(window.location.search);
        params.set('s', this.state.activeSearchSorting);
        history.push(window.location.pathname + '?' + params);
      }
    );
  }

  handleLimitChange(event) {
    var searchLimit = event.target.id;
    searchLimit = searchLimit.substring(1, event.target.id.length - 2);
    this.setState(
      {
        searchLimit10: false,
        searchLimit20: false,
        searchLimit30: false,
        ['searchLimit' + searchLimit]: 'true',
        activeSearchLimit: searchLimit,
        page: 1
      },
      () => {
        this.fetchSearchData();
        const params = new URLSearchParams(window.location.search);
        params.set('l', this.state.activeSearchLimit);
        params.set('p', 1);
        history.push(window.location.pathname + '?' + params);
      }
    );
  }

  handleToCartClick(event, buttonID) {
    event.preventDefault();

    let produkty = this.state.ProductLoading;
    var index = produkty.findIndex((e) => e[0] === buttonID);
    produkty[index][1] = true;
    this.setState({
      ProductLoading: produkty
    });

    const data = {
      id_produktu: event.currentTarget.id,
      ilosc: 1
    };
    fetch('http://localhost:9000/cart', {
      method: 'post',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.text())
      .then((response) => {
        if (response === 'Product has been added to cart.') {
          this.props.sendAlertMessage(
            'primary',
            'Dodano produkt',
            'Produkt został dodany do koszyka.'
          );
          this.props.sendUpdatedCartItems(true);
          produkty[index][1] = false;
          this.setState({
            ProductLoading: produkty
          });
        } else if (response === 'Limit koszyka.') {
          this.props.sendAlertMessage('danger', 'Limit w koszyku.', 'Osiągnięto limit w koszyku.');
          this.props.sendUpdatedCartItems(true);
          produkty[index][1] = false;
          this.setState({
            ProductLoading: produkty
          });
        } else if (response === 'Quantity limit.') {
          this.props.sendAlertMessage(
            'danger',
            'Limit produktu.',
            'Brak dodatkowych sztuk produktu.'
          );
          this.props.sendUpdatedCartItems(true);
          produkty[index][1] = false;
          this.setState({
            ProductLoading: produkty
          });
        } else {
          this.props.sendAlertMessage('danger', 'Wystąpił błąd.', 'Wystąpił nieoczekiwany błąd.');
          this.props.sendUpdatedCartItems(true);
          produkty[index][1] = false;
          this.setState({
            ProductLoading: produkty
          });
        }
      })
      .catch((err) => err);
  }

  handleFilterChange = (event) => {
    const params = new URLSearchParams(window.location.search);
    var filter = event.currentTarget.id;
    if (event.target.checked) {
      if (filter.includes('g_f')) {
        filter = filter.replace('g_f', 'm_f');
        var subfilters = document.querySelectorAll("[id^='" + filter + "']");
        for (let i = 0; i < subfilters.length; i++) {
          document.getElementById(subfilters[i].id).checked = true;
          params.set(subfilters[i].id, 'tak');
        }
      } else if (filter.includes('g_k')) {
        //console.log(event.currentTarget.id);
      } else if (filter.includes('g_p')) {
        //console.log(event.currentTarget.id);
      } else if (filter.includes('m_f')) {
        //console.log(event.currentTarget.id);
      }
      params.set(event.currentTarget.id, 'tak');
    } else {
      if (filter.includes('g_f')) {
        filter = filter.replace('g_f', 'm_f');
        subfilters = document.querySelectorAll("[id^='" + filter + "']");
        for (let i = 0; i < subfilters.length; i++) {
          document.getElementById(subfilters[i].id).checked = false;
          params.delete(subfilters[i].id);
        }
      } else if (filter.includes('m_f')) {
        filter = filter.replace('m_f', 'g_f');
        let filter_index = filter.indexOf('_w_');
        filter = filter.substring(0, filter_index);
        document.getElementById(filter).checked = false;
        params.delete(filter);
      }

      params.delete(event.currentTarget.id);
    }
    history.push(window.location.pathname + '?' + params);
  };

  render() {
    if (this.state.isLoading) {
      return <div className="loading"></div>;
    } else {
      let ApiResponse = JSON.parse(this.state.ApiResponse);
      const pages = [];
      var active;
      for (let i = 0; i < this.state.pageLimit; i++) {
        if (i === this.state.page - 1) active = 'page-item active';
        else active = 'page-item';
        pages.push(
          <li className={active} key={'page' + (i + 1)}>
            <div className="page-link" id={i + 1} onClick={(event) => this.handlePageChange(event)}>
              {i + 1}
            </div>
          </li>
        );
        if (i === 5) {
          break;
        }
      }

      if (
        undefined !== ApiResponse &&
        undefined !== ApiResponse.produkty &&
        ApiResponse.produkty.length
      ) {
        return (
          <div className="container-fluid pb-5 mb-5">
            <div className="row navbar-padding p-relative">
              <div className="col-1"></div>
              <div className="col-10 pt-5 text-left">
                <div>
                  <h4>
                    Znaleziono{' '}
                    <span className="font-weight-bold">{this.state.resItemCount + ' '}</span>
                    {this.state.resItemWord} dla{' '}
                    {this.state.searchValue.length !== 0 ? (
                      <>
                        <span>hasła </span>
                        <span className="font-weight-bold">"{this.state.searchValue}"</span>
                      </>
                    ) : (
                      <>
                        <span>kategorii </span>
                        <span className="font-weight-bold">{this.state.searchCategory}</span>
                      </>
                    )}
                  </h4>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-1"></div>
              <div className={'col-sm-2 ' + (this.state.hideFilters ? 'd-none' : '')}>
                <div className="col-12 componentBackgroundColor mt-3 shadow-sm p-3 mb-1 bg-white rounded">
                  <h3 className="pb-3">Filtry</h3>
                  <div className="text-left pb-4 font-weight-bold">
                    Wyszukiwanie: "{this.state.searchValue}"
                  </div>
                  <div>
                    <div className="text-left pb-2">
                      <h5>Kategorie</h5>
                      {ApiResponse.kategorie.map((api) => (
                        <div className=" text-left mb-2" key={'g_k' + api.id_kategorii}>
                          <label className="filterContainer">
                            <span className="ml-2">{api.nazwa_kategorii}</span>
                            <span className="text-right">{' (' + api.liczba_produktow})</span>
                            <input
                              type="checkbox"
                              id={'g_k' + api.id_kategorii}
                              onChange={this.handleFilterChange}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      ))}
                      <div className="dropdown-divider mt-4 mb-4"></div>
                    </div>
                    <div className="text-left pb-2">
                      <h5>Producenci</h5>
                      {ApiResponse.producenci.map((api) => (
                        <div className=" text-left mb-2" key={'g_p' + api.id_producenta}>
                          <label className="filterContainer">
                            <span className="ml-2">{api.nazwa_producenta}</span>
                            <span className="text-right">{' (' + api.liczba_produktow})</span>
                            <input
                              type="checkbox"
                              id={'g_p' + api.id_producenta}
                              onChange={this.handleFilterChange}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      ))}
                      <div className="dropdown-divider mt-4 mb-4"></div>
                    </div>
                    <div className="text-left pb-2">
                      <h5>Filtry</h5>
                      {ApiResponse.filtry.map((filtry, index) => (
                        <div className=" text-left mb-4" key={'g_f' + index}>
                          <label className="filterContainer">
                            <span className="ml-2">{filtry.atrybut}</span>
                            <span className="text-right">{' (' + filtry.liczba_produktow})</span>
                            <input
                              type="checkbox"
                              id={'g_f' + filtry.atrybut}
                              onChange={this.handleFilterChange}
                            />
                            <span className="checkmark"></span>
                          </label>
                          <div className="ml-3 mt-2">
                            {filtry.wartosci.map((wartosci, index) => (
                              <div
                                className="mb-2"
                                key={'m_f' + filtry.atrybut + '_w_f' + wartosci.wartosc}>
                                <label className="filterContainer">
                                  <span className="ml-2">{wartosci.wartosc}</span>
                                  <span className="text-right">
                                    {' (' + wartosci.liczba_produktow})
                                  </span>
                                  <input
                                    type="checkbox"
                                    id={'m_f' + filtry.atrybut + '_w_f' + wartosci.wartosc}
                                    onChange={this.handleFilterChange}
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
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block mt-1 pt-1 FilterButton"
                    onClick={() => this.handleFilterClick()}>
                    filtruj
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block mt-1 pt-1 HideFiltersButton"
                    onClick={() => this.switchHiddenFilters(true)}>
                    Zwiń filtry
                  </button>
                </div>
              </div>
              <div className={'col-sm-2 pb-5 ' + (this.state.hideFilters ? '' : 'd-none')}>
                <div className="col-12 componentBackgroundColor mt-3 shadow-sm p-3 mb-1 bg-white rounded">
                  <h3 className="pb-3">Filtry</h3>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block mt-1 pt-1 HideFiltersButton"
                    onClick={() => this.switchHiddenFilters(false)}>
                    Rozwiń filtry
                  </button>
                </div>
              </div>
              <div className="col-sm-7">
                <div className="row">
                  <div className="col componentBackgroundColor mt-3 shadow-sm pt-3 bg-white rounded">
                    <div className="d-flex flex-row flex-wrap justify-content-between">
                      <div>
                        <ul className="pagination">
                          <div className="btn btn-secondary">wyników na stronie</div>
                          <li className={'page-item ' + (this.state.searchLimit10 ? 'active' : '')}>
                            <div
                              className="page-link"
                              id="l10-1"
                              onClick={(event) => this.handleLimitChange(event)}>
                              10
                            </div>
                          </li>
                          <li className={'page-item ' + (this.state.searchLimit20 ? 'active' : '')}>
                            <div
                              className="page-link"
                              id="l20-1"
                              onClick={(event) => this.handleLimitChange(event)}>
                              20
                            </div>
                          </li>
                          <li className={'page-item ' + (this.state.searchLimit30 ? 'active' : '')}>
                            <div
                              className="page-link"
                              id="l30-1"
                              onClick={(event) => this.handleLimitChange(event)}>
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
                              {this.state.activeSearchSorting}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="activeSearchSorting2">
                              <div
                                className="dropdown-item pointer"
                                id="domyślne"
                                onClick={(event) => this.handleSortChange(event)}>
                                domyślne
                              </div>
                              <div className="dropdown-divider"></div>
                              <div
                                className="dropdown-item pointer"
                                id="cena malejąco"
                                onClick={(event) => this.handleSortChange(event)}>
                                cena malejąco
                              </div>
                              <div
                                className="dropdown-item pointer"
                                id="cena rosnąco"
                                onClick={(event) => this.handleSortChange(event)}>
                                cena rosnąco
                              </div>
                              <div
                                className="dropdown-item pointer"
                                id="nazwa produktu A-Z"
                                onClick={(event) => this.handleSortChange(event)}>
                                nazwa produktu A-Z
                              </div>
                              <div
                                className="dropdown-item pointer"
                                id="nazwa produktu Z-A"
                                onClick={(event) => this.handleSortChange(event)}>
                                nazwa produktu Z-A
                              </div>
                            </div>
                          </div>
                        </ul>
                      </div>
                      <div>
                        <nav>
                          <ul className="pagination">
                            <div className="btn btn-secondary d-inline">strona</div>
                            <div
                              className={
                                'page-item ' + (this.state.prevPageAvailable ? '' : 'disabled')
                              }
                              onClick={(event) => this.handlePageChangeArrow('minus')}
                              disabled={this.state.prevPageAvailable ? false : 'disabled'}>
                              <div className="page-link">
                                <i className="fas fa-chevron-left"></i>
                              </div>
                            </div>
                            {pages}
                            <div
                              className={
                                'page-item ' + (this.state.nextPageAvailable ? '' : 'disabled')
                              }
                              onClick={(event) => this.handlePageChangeArrow('plus')}
                              disabled={this.state.nextPageAvailable ? false : 'disabled'}>
                              <div className="page-link">
                                <i className="fas fa-chevron-right"></i>
                              </div>
                            </div>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
                {ApiResponse.produkty.map((produkt, index) => (
                  <div className="row" key={'produkt' + produkt.id_produktu}>
                    <div className="col-12 componentBackgroundColor mt-3 shadow-sm p-3 bg-white rounded">
                      <div className="row">
                        <div className="col-xl-2 pr-0 mr-0">
                          <div className="image-container">
                            <img
                              className="center-Element-vertical feature_image"
                              alt="obraz produktu"
                              src={produkt.zdjecie}></img>
                          </div>
                        </div>
                        <div className="col-xl-7">
                          <div className="font-weight-bold center-product-name">
                            <h4>
                              <Link
                                className="clear-link"
                                to={`/product/${produkt.id_produktu}?searchURL=${window.location.search}`}>
                                {produkt.producent + ' ' + produkt.nazwa_produktu}
                              </Link>
                            </h4>
                          </div>
                          <div className="idProduktu d-block">
                            <span>id produktu: {produkt.id_produktu}</span>
                          </div>
                          <div className="d-inline text-left">
                            <div className="placement-bottomAtributes"></div>
                            <ul>
                              {produkt.atrybuty.map((atrybut) => (
                                <div
                                  className="d-block"
                                  key={'produkt' + produkt.id_produktu + '-w' + atrybut.atrybut}>
                                  <li>
                                    <span className="d-inline">{atrybut.atrybut}:</span>
                                    <span className="font-weight-bold pl-2">{atrybut.wartosc}</span>
                                  </li>
                                </div>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="col-xl-3">
                          <div className="font-weight-bold text-left center-price">
                            <h3>{produkt.cena_brutto.toFixed(2).replace('.', ',') + ' zł'}</h3>
                          </div>
                          <div className="placement-bottomAddToCart"></div>
                          <button
                            type="button"
                            id={'p' + produkt.id_produktu}
                            className={
                              'btn btn-lg btn-block mt-1 pt-1 ' +
                              (this.props.isLogged ? 'btn-primary ' : 'btn-secondary disabled')
                            }
                            disabled={this.state.ProductLoading[index][1] ? 'disabled' : false}
                            onClick={(event) =>
                              this.props.isLogged
                                ? this.handleToCartClick(event, produkt.id_produktu)
                                : this.props.sendAlertMessage(
                                    'danger',
                                    'Zaloguj się!',
                                    'Zaloguj się, żeby dodać produkt do koszyka.'
                                  )
                            }>
                            <span
                              className={
                                'spinner-border spinner-border-sm mb-1 text-light mr-3 ' +
                                (this.state.ProductLoading[index][1] ? '' : 'hidden')
                              }></span>
                            <span
                              className={
                                ' ' + (this.state.ProductLoading[index][1] ? '' : 'hidden')
                              }>
                              dodawanie ...
                            </span>
                            <span
                              className={
                                ' ' + (this.state.ProductLoading[index][1] ? 'hidden' : '')
                              }>
                              dodaj do koszyka
                            </span>
                            <i
                              className={
                                'fas fa-cart-plus ' +
                                (this.state.ProductLoading[index][1] ? 'hidden' : '')
                              }></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="row">
                  <div className="col componentBackgroundColor mt-3 shadow-sm pt-3 bg-white rounded">
                    <div className="d-flex flex-row flex-wrap justify-content-between">
                      <div>
                        <ul className="pagination">
                          <div className="btn btn-secondary">wyników na stronie</div>
                          <li className={'page-item ' + (this.state.searchLimit10 ? 'active' : '')}>
                            <div
                              className="page-link"
                              id="l10-2"
                              onClick={(event) => this.handleLimitChange(event)}>
                              10
                            </div>
                          </li>
                          <li className={'page-item ' + (this.state.searchLimit20 ? 'active' : '')}>
                            <div
                              className="page-link"
                              id="l20-2"
                              onClick={(event) => this.handleLimitChange(event)}>
                              20
                            </div>
                          </li>
                          <li className={'page-item ' + (this.state.searchLimit30 ? 'active' : '')}>
                            <div
                              className="page-link"
                              id="l30-2"
                              onClick={(event) => this.handleLimitChange(event)}>
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
                              {this.state.activeSearchSorting}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="activeSearchSorting2">
                              <div
                                className="dropdown-item pointer"
                                id="domyślne"
                                onClick={(event) => this.handleSortChange(event)}>
                                domyślne
                              </div>
                              <div className="dropdown-divider"></div>
                              <div
                                className="dropdown-item pointer"
                                id="cena malejąco"
                                onClick={(event) => this.handleSortChange(event)}>
                                cena malejąco
                              </div>
                              <div
                                className="dropdown-item pointer"
                                id="cena rosnąco"
                                onClick={(event) => this.handleSortChange(event)}>
                                cena rosnąco
                              </div>
                              <div
                                className="dropdown-item pointer"
                                id="nazwa produktu A-Z"
                                onClick={(event) => this.handleSortChange(event)}>
                                nazwa produktu A-Z
                              </div>
                              <div
                                className="dropdown-item pointer"
                                id="nazwa produktu Z-A"
                                onClick={(event) => this.handleSortChange(event)}>
                                nazwa produktu Z-A
                              </div>
                            </div>
                          </div>
                        </ul>
                      </div>
                      <div>
                        <nav>
                          <ul className="pagination">
                            <div className="btn btn-secondary d-inline">strona</div>
                            <div
                              className={
                                'page-item ' + (this.state.prevPageAvailable ? '' : 'disabled')
                              }
                              onClick={(event) => this.handlePageChangeArrow('minus')}
                              disabled={this.state.prevPageAvailable ? false : 'disabled'}>
                              <div className="page-link">
                                <i className="fas fa-chevron-left"></i>
                              </div>
                            </div>
                            {pages}
                            <div
                              className={
                                'page-item ' + (this.state.nextPageAvailable ? '' : 'disabled')
                              }
                              onClick={(event) => this.handlePageChangeArrow('plus')}
                              disabled={this.state.nextPageAvailable ? false : 'disabled'}>
                              <div className="page-link">
                                <i className="fas fa-chevron-right"></i>
                              </div>
                            </div>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row pt-4 mb-5 pt-5">
                  <div className="col-lg-2"></div>{' '}
                  <div className="col-lg-8">
                    <Link className="btn btn-outline-secondary m-bot-10" to="/">
                      {' '}
                      <i className="fas fa-chevron-left"></i>
                      <i className="fas fa-chevron-left"></i> Wróć do strony głównej
                    </Link>
                  </div>
                  <div className="col-lg-2"></div>
                </div>
              </div>
              <div className="col-sm-2"></div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="container-fluid">
            <div>
              <div className="row navbar-padding">
                <div className="col-3"></div>
                <div className="col-6 mt-5 componentBackgroundColor mt-3 mb-3 shadow-sm p-3 bg-white rounded">
                  <div className="row">
                    <div className="col-12">
                      <h1>Nie mamy takich przedmiotów :-() </h1>
                    </div>
                  </div>
                </div>
                <div className="col-3"></div>
              </div>
              <div className="row pt-4">
                <div className="col-lg-3"></div>
                <div className="col-lg-5 text-left">
                  <Link className="btn btn-outline-secondary" to={this.state.LastPage}>
                    {' '}
                    <i className="fas fa-chevron-left"></i> Cofnij do poprzedniej strony
                  </Link>
                </div>
                <div className="col-lg-4"></div>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

export default withRouter(SearchResults);
