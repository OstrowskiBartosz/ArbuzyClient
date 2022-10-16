import React from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './Product.css';

class Product extends React.Component {
  constructor(props) {
    super(props);

    const productID = this.props.match.params.productID;
    const params = new URLSearchParams(window.location.search);
    window.history.replaceState(null, '', `${window.location.origin}${window.location.pathname}`);

    this.state = {
      logged: false,
      errorLogin: false,
      errorMessageLogin: '',
      errorSignup: false,
      errorMessageSignup: '',
      isLoading: true,
      productID: productID,
      searchURL: params.get('searchURL') ?? null
    };
  }

  componentDidMount() {
    let url = 'http://localhost:9000/product';
    fetch(url, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'productID=' + this.state.productID
    })
      .then((response) => response.text())
      .then((response) => {
        let responseObject = JSON.parse(response);
        let splitted_opis = responseObject.productOpis.split('|');
        splitted_opis.forEach((part, index) => {
          if (part.startsWith('http')) {
            splitted_opis[index] = <img className="img-fluid" src={part} alt="Opis produktu" />;
          }
        });
        this.setState({
          response: responseObject,
          isLoading: false,
          currentImage: responseObject.zdjecia[0].wartosc,
          opis: splitted_opis
        });
      })
      .catch((err) => err);
  }

  imageClick(image) {
    this.setState({ currentImage: image });
  }

  handleToCartClick(event) {
    event.preventDefault();
    const data = {
      id_produktu: 'p' + event.currentTarget.id,
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
        if (response === 'Przedmiot został dodany do koszyka.') {
          this.props.sendAlertMessage(
            'primary',
            'Dodano produkt',
            'Produkt został dodany do koszyka.'
          );
          this.props.sendUpdatedCartItems(true);
        } else {
          this.props.sendAlertMessage('danger', 'Wystąpił błąd.', 'Wystąpił nieoczekiwany błąd.');
          this.props.sendUpdatedCartItems(true);
        }
      })
      .catch((err) => err);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="container options shadow-sm bg-white rounded mb-5">
          <div className="d-flex justify-content-center pt-5 pb-5">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      );
    } else {
      if (this.state.response.error) {
        return <Redirect to="/" />;
      } else {
        return (
          <>
            <div className="container-fluid" id="top">
              <div className="row navbar-padding">
                <div className="col-sm-1"></div>
                <div className="col-sm-10">
                  <div className="options shadow-sm bg-white rounded mb-5 mt-5">
                    <div className="row">
                      <div className="col product-tree ml-2 mt-2">
                        <Link
                          className="clear-link fw-bold"
                          to={`/search?w=${this.state.response.productNazwaKategorii}`}>
                          {this.state.response.productNazwaKategorii}{' '}
                        </Link>
                        <i className="fas fa-long-arrow-alt-right"></i>{' '}
                        <Link
                          className="clear-link fw-bold"
                          to={`/search?g_p${this.state.response.produktIDProducenta}=tak`}>
                          {this.state.response.productNazwaProducenta}{' '}
                        </Link>
                        <i className="fas fa-long-arrow-alt-right"></i>{' '}
                        <Link
                          className="clear-link fw-bold"
                          to={`/search?q=${this.state.response.productNazwa}`}>
                          {this.state.response.productNazwa}{' '}
                        </Link>
                      </div>
                    </div>
                    <div className="dropdown-divider mt-4 mb-4"></div>
                    <div className="row m-bot-10">
                      <div className="col col-thumbnail">
                        {this.state.response.zdjecia.map((zdjecie, index) => (
                          <div className="image-thumbnail" key={index}>
                            <img
                              className="img-thumbnail"
                              src={zdjecie.wartosc}
                              key={index}
                              alt="Zdjęcie produktu"
                              onClick={() => this.imageClick(zdjecie.wartosc)}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="col-md-auto">
                        <div className="main-image">
                          <img
                            className="img-thumbnail"
                            src={this.state.currentImage}
                            alt="Zdjęcie produktu"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="product-name pl-2">
                          <h2>
                            {' '}
                            {this.state.response.productNazwaProducenta}{' '}
                            {this.state.response.productNazwa}
                          </h2>
                        </div>
                        <div className="product-id text-muted pl-2">
                          <span>Id produktu: {this.state.response.productID}</span>
                        </div>
                        <div>
                          <div className="text-left mt-3 mb-3 pl-2">
                            <h4>Główne parametry produktu:</h4>
                          </div>
                          <div>
                            {this.state.response.atrybutMain.map((atrybut, index) => (
                              <div className="left pl-2" key={index}>
                                {atrybut.atrybut}: <strong>{atrybut.wartosc}</strong>
                              </div>
                            ))}
                          </div>
                          <div className="text-left mb-3 mt-3 fw-bold pl-2">
                            <HashLink to={`/product/${this.state.productID}#productSpecification`}>
                              <i className="fas fa-angle-double-down"></i> Przejdz do pełnej
                              specyfikacji <i className="fas fa-angle-double-down"></i>
                            </HashLink>
                          </div>
                        </div>
                        <div className="price-tag fw-bold pb-5">
                          {this.state.response.ceny[0].cena_brutto.toLocaleString('pl-PL', {
                            minimumFractionDigits: 2
                          })}{' '}
                          zł
                        </div>
                        <div>
                          <button
                            className="btn btn-primary btn-lg btn-block"
                            id={this.state.response.productID}
                            onClick={(event) => this.handleToCartClick(event)}>
                            Dodaj do koszyka
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-divider mt-4 mb-4"></div>
                    <div id="productDescription" className="mt-5 mb-5">
                      <h1>Opis produktu</h1>
                      <div className="row m-bot-10 mt-5">
                        <div className="col">
                          {this.state.opis.map((part, index) => (
                            <div className="m-bot-10" key={index}>
                              {part}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-divider mt-4 mb-4"></div>
                    <div id="productSpecification" className="mt-5 mb-5">
                      <h1>Pełna specyfikacja</h1>
                      <div className="row m-bot-10 mt-5">
                        <span className="text-center fw-bold fs-5 mb-2">Dane produktu</span>
                        <div className="col col-left">
                          <span>Nazwa produktu:</span>
                          <span>Producent:</span>
                          <span>Kod produktu producenta:</span>
                          <span className="pb-4">Kategoria produktu:</span>
                        </div>
                        <div className="col col-right">
                          <span className="fw-bold">{this.state.response.productNazwa}</span>
                          <span className="fw-bold">
                            {this.state.response.productNazwaProducenta}
                          </span>
                          <span className="fw-bold">
                            {this.state.response.productNazwa.match(/\(([^)]+)\)/g)}
                          </span>
                          <span className="fw-bold  pb-4">
                            {this.state.response.productNazwaKategorii}
                          </span>
                        </div>

                        <span className="text-center fw-bold fs-5 mb-2">Specyfikacja produktu</span>
                        <div className="col col-left">
                          {this.state.response.atrybutMain.map((atrybut, index) => (
                            <div key={index}>{atrybut.atrybut}</div>
                          ))}
                          {this.state.response.atrybutSub.map((atrybut, index) => (
                            <div key={index}>{atrybut.atrybut + ':'}</div>
                          ))}
                        </div>
                        <div className="col col-right">
                          {this.state.response.atrybutMain.map((atrybut, index) => (
                            <div key={index}>
                              <span className="fw-bold">
                                {atrybut.wartosc}{' '}
                                {this.state.response.atrybutMain[index].atrybut.match(/\[(.*)\]/g)}
                              </span>
                            </div>
                          ))}
                          {this.state.response.atrybutSub.map((atrybut, index) => (
                            <div key={index}>
                              <span className="fw-bold">
                                {atrybut.wartosc}{' '}
                                {this.state.response.atrybutSub[index].atrybut.match(/\[(.*)\]/g)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-11"></div>
                      <div className="col-1">
                        <HashLink smooth to={`/product/${this.state.productID}#top`}>
                          {' '}
                          <div className="text-right backToTop">
                            <div className=" text-center pb-2">do góry</div>
                            <div className="text-center">
                              {' '}
                              <i className="fas fa-arrow-up"></i>
                            </div>
                          </div>
                        </HashLink>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-1"></div>
              </div>
            </div>
            <div className="row pt-4 mb-5">
              <div className="col-lg-2"></div>{' '}
              <div className="col-lg-4">
                <Link className="btn btn-outline-secondary m-bot-10" to="/">
                  {' '}
                  <i className="fas fa-chevron-left"></i>
                  <i className="fas fa-chevron-left"></i> Wróć do strony głównej
                </Link>
              </div>
              {this.state.searchURL !== null ? (
                <div className="col-lg-4">
                  <Link
                    className="btn btn-outline-primary m-bot-10"
                    to={`/search${this.state.searchURL}`}>
                    {' '}
                    <i className="fas fa-chevron-left"></i> Wróć do wyników wyszukiwania
                  </Link>
                </div>
              ) : null}
              <div className="col-lg-2"></div>
            </div>
          </>
        );
      }
    }
  }
}

export default withRouter(Product);
