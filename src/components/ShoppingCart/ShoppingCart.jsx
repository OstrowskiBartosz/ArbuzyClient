import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './ShoppingCart.css';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      fullPrice: 0,
      isEmpty: false,
      purchase: false,

      isLogged: null,
      logInInfoReceived: false
    };
  }

  componentWillUnmount() {
    if (this.state.isLogged === false) {
      this.props.sendAlertMessage(
        'danger',
        'Zaloguj się!',
        'Zaloguj się, żeby zobaczyć swój koszyk.'
      );
    }
  }

  componentDidUpdate(prevState, prevProps) {
    if (prevProps.isLogged !== this.props.isLogged) {
      this.setState({
        isLogged: this.props.isLogged,
        logInInfoReceived: true
      });
    }
  }

  componentDidMount() {
    if (this.props.isLogged !== this.state.isLogged) {
      this.setState({
        isLogged: this.props.isLogged,
        logInInfoReceived: true
      });
    }
    this.fetchCartData();
  }

  fetchCartData() {
    let url = 'http://localhost:9000/cart';
    fetch(url, {
      method: 'get',
      credentials: 'include',
      headers: new Headers({ 'content-type': 'application/json' })
    })
      .then((response) => response.text())
      .then((response) => {
        let cena = 0;
        let apiOBject = JSON.parse(response);
        if (apiOBject.length === 0) {
          this.setState({
            isEmpty: true
          });
        }
        let produktyWKoszykach = new Array(apiOBject.length);
        for (let i = 0; i < produktyWKoszykach.length; i++) {
          produktyWKoszykach[i] = new Array(2);
          produktyWKoszykach[i][0] = apiOBject[i].id_produktu_w_koszyku;
          produktyWKoszykach[i][1] = apiOBject[i].ilosc;

          produktyWKoszykach[i][2] = apiOBject[i].cena_brutto;

          produktyWKoszykach[i][6] = apiOBject[i].cena_brutto.toFixed(2);
          let cenastr = produktyWKoszykach[i][6].toString();
          produktyWKoszykach[i][6] = cenastr.replace('.', ',');

          produktyWKoszykach[i][3] =
            apiOBject[i].nazwa_producenta + ' ' + apiOBject[i].nazwa_produktu;
          produktyWKoszykach[i][4] = apiOBject[i].zdjecie;
          produktyWKoszykach[i][5] = apiOBject[i].id_produktu;
          cena = cena + produktyWKoszykach[i][1] * produktyWKoszykach[i][2];
        }

        this.setState({
          ApiResponse: response,
          isLoading: false,
          cartNumberElements: apiOBject.length,
          cartArray: produktyWKoszykach,
          fullPrice: cena,
          disableEverything: false
        });
      })
      .catch((err) => err);
  }

  handleTrashClick(id_produktu_w_koszyku, id_produktu) {
    let url = 'http://localhost:9000/cart';
    let object = {};
    object.id_produktu_w_koszyku = id_produktu_w_koszyku;
    object.id_produktu = id_produktu;
    fetch(url, {
      method: 'delete',
      credentials: 'include',
      body: JSON.stringify(object),
      headers: new Headers({ 'content-type': 'application/json' })
    })
      .then((response) => response.text())
      .then((response) => {
        if (response === 'Product has been removed from cart.') {
          this.props.sendAlertMessage(
            'danger',
            'Usunięto produkt',
            'Produkt został usunięty z koszyka.'
          );
          let produktyWKoszykach = this.state.cartArray;
          let index = produktyWKoszykach.findIndex((e) => e[0] === id_produktu_w_koszyku);
          let cena =
            this.state.fullPrice - produktyWKoszykach[index][2] * produktyWKoszykach[index][1];

          produktyWKoszykach.splice(index, 1);
          this.setState({
            cartArray: produktyWKoszykach,
            fullPrice: cena
          });
          if (produktyWKoszykach.length === 0) {
            this.setState({
              isEmpty: true
            });
          }
          this.props.sendUpdatedCartItems(true);
        } else {
        }
      })
      .catch((err) => err);
  }

  handleQuantityClick(event, cartProductID, productID, operationSign) {
    let produktyWKoszykach = this.state.cartArray;
    let index = produktyWKoszykach.findIndex((e) => e[0] === cartProductID);

    if (
      produktyWKoszykach[index][1] > 1 ||
      (produktyWKoszykach[index][1] === 1 && operationSign !== '-')
    ) {
      this.setState({
        disableEverything: true
      });
      let object = {};
      object.productID = productID;
      object.cartProductID = cartProductID;
      object.operationSign = operationSign;
      let url = 'http://localhost:9000/cart';
      fetch(url, {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify(object),
        headers: new Headers({ 'content-type': 'application/json' })
      })
        .then((response) => response.text())
        .then((response) => {
          if (response === 'The quantity has been updated.') {
            let cena = 0;
            let produktyWKoszykach = this.state.cartArray;
            let index = produktyWKoszykach.findIndex((e) => e[0] === cartProductID);
            if (operationSign === '+') {
              this.props.sendAlertMessage(
                'primary',
                'Zwiększono ilość',
                'Ilość danego produktu została zwiększona.'
              );
              produktyWKoszykach[index][1] = produktyWKoszykach[index][1] + 1;
              cena = produktyWKoszykach[index][2];
            } else {
              this.props.sendAlertMessage(
                'primary',
                'Zmniejszono ilość',
                'Ilość danego produktu została zmniejszona.'
              );
              produktyWKoszykach[index][1] = produktyWKoszykach[index][1] - 1;
              cena = -produktyWKoszykach[index][2];
            }

            this.setState({
              cartArray: produktyWKoszykach,
              fullPrice: this.state.fullPrice + cena
            });
          } else if (response === 'Quantity limit.') {
            this.props.sendAlertMessage(
              'danger',
              'Limit produktu.',
              'Brak dodatkowych sztuk produktu.'
            );
          }
        })
        .catch((err) => err);
    } else {
      this.props.sendAlertMessage(
        'danger',
        'Usunięcie produktu',
        'Aby usunąć produkt nacisnij znak usunięcia produktu.'
      );
    }
    this.setState({
      disableEverything: false
    });
  }

  handlePurchaseClick(event) {
    this.setState({
      purchase: true
    });
  }

  render() {
    if (this.state.isLogged === false && this.state.logInInfoReceived === true) {
      return <Redirect to="/login" />;
    } else if (this.state.isLoading) {
      return (
        <div className="container-fluid">
          <div className="row navbar-padding">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
              <div className="row">
                <div className="col-12 mt-5 componentBackgroundColor mt-3 mb-3 shadow-sm p-3 bg-white rounded">
                  <div className="row">
                    <div className="col-11">
                      <div className="font-weight-bold text-left">
                        <h3>Twój Koszyk</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 componentBackgroundColor shadow-sm p-3 bg-white rounded">
                <div className="d-flex justify-content-center pt-5 pb-5">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
      );
    } else {
      if (this.state.isEmpty === false && this.state.purchase === false) {
        return (
          <div className="container-fluid">
            <div className="row navbar-padding">
              <div className="col-sm-3"></div>
              <div className="col-sm-6">
                <div className="row">
                  <div className="col-12 mt-5 componentBackgroundColor mt-3 mb-3 shadow-sm p-3 bg-white rounded">
                    <div className="row">
                      <div className="col-11">
                        <div className="font-weight-bold text-left">
                          <h3>Twój Koszyk</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row hide-l">
                  <div className="col-12 componentBackgroundColor shadow-sm p-3 bg-white rounded">
                    <div className="row CartBorder pb-2">
                      <div className="col-2 p-0"></div>
                      <div className="col-5 align-text-center">
                        <div className="text-left fw-bold">Nazwa</div>
                      </div>
                      <div className="col-2 align-text-center">
                        <div className="text-left fw-bold">Cena</div>
                      </div>
                      <div className="col-2 align-text-center">
                        <div className=" align-left fw-bold">Ilość</div>
                      </div>
                      <div className="col-1 align-text-center"></div>
                    </div>
                  </div>
                </div>
                {this.state.cartArray.map((produkt) => (
                  <div className="row" key={produkt[0]}>
                    <div className="col-12 componentBackgroundColor shadow-sm p-3 bg-white rounded">
                      <div className="row">
                        <div className="col-xl-2 vertical-center">
                          <div className="image-container2">
                            <img
                              alt="obraz produktu"
                              className=" center-Element-vertical feature_image2"
                              src={produkt[4]}></img>
                          </div>
                        </div>
                        <div className="col-xl-5 align-text-center fs-5 vertical-center">
                          <div className="text-left fw-bold">
                            <Link to={`/product/${produkt[5]}`}>{produkt[3]}</Link>
                          </div>
                        </div>
                        <div className="col-xl-2 align-text-center fs-4 fw-bold vertical-center">
                          <div className="text-left">{produkt[6] + ' zł'}</div>
                          <div className="placement-bottomAddToCart"></div>
                        </div>
                        <div className="col-xl-2 align-text-center vertical-center">
                          <i
                            className={
                              'fas fa-minus cursor-pointer ' +
                              (this.state.disableEverything ? 'disabled' : '')
                            }
                            onClick={(event) =>
                              this.handleQuantityClick(event, produkt[0], produkt[5], '-')
                            }
                            disabled={this.state.disableEverything ? 'disabled' : false}></i>
                          <div className="text-left pl-2 pr-2">
                            <input
                              className="text-center fw-bold"
                              size="1"
                              value={produkt[1]}
                              readOnly></input>
                          </div>
                          <i
                            className={
                              'fas fa-plus cursor-pointer ' +
                              (this.state.disableEverything ? 'disabled' : '')
                            }
                            onClick={(event) =>
                              this.handleQuantityClick(event, produkt[0], produkt[5], '+')
                            }
                            disabled={this.state.disableEverything ? 'disabled' : false}></i>
                        </div>
                        <div className="col-xl-1 align-text-center vertical-center">
                          <span>
                            <i
                              className="fas fa-trash-alt cursor-pointer"
                              onClick={() => this.handleTrashClick(produkt[0], produkt[5])}
                              disabled={this.state.disableEverything ? false : 'disabled'}></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="row">
                  <div className="col-xl-6"></div>
                  <div className="col-xl-6 mt-2 componentBackgroundColor mt-3 mb-3 shadow-sm p-3 bg-white rounded">
                    <div className="row pb-2">
                      <div className="col-md-6">
                        <span className="fs-4 fw-bold text-left">łączna cena:</span>
                      </div>
                      <div className="col-md-6">
                        <span className="fw-bold fs-4 pr-3 text-right">
                          {this.state.fullPrice.toFixed(2).replace('.', ',')} zł
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <Link
                          className="btn btn-lg btn-block mt-1 pt-1 btn-primary"
                          to={'/cartsummary'}>
                          Przejdz do podsumowania <i className="fas fa-sign-out-alt"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3"></div>
            </div>
            <div className="row pt-4 pb-5 mb-5">
              <div className="col-lg-3"></div>
              <div className="col-lg-5 text-left">
                <Link className="btn btn-outline-secondary" to="/">
                  <i className="fas fa-chevron-left"></i> Wróć do strony głównej
                </Link>
              </div>
              <div className="col-lg-4"></div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="container-fluid">
            <div className="row navbar-padding">
              <div className="col-3"></div>
              <div className="col-6 mt-5 componentBackgroundColor mt-3 mb-3 shadow-sm p-3 bg-white rounded">
                <div className="row">
                  <div className="col-12">
                    <h1>Koszyk jest pusty, dodaj coś do niego :-) </h1>
                  </div>
                </div>
              </div>
              <div className="col-3"></div>
            </div>
          </div>
        );
      }
    }
  }
}

export default ShoppingCart;
