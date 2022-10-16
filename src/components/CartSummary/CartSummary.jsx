import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import '../../App.css';

export default class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isEmpty: true,
      price: 0,

      isLogged: null,
      logInInfoReceived: false
    };
  }

  componentWillUnmount() {
    if (this.state.isLogged === false) {
      this.props.sendAlertMessage(
        'danger',
        'Zaloguj się!',
        'Zaloguj się, żeby zobaczyć swoje potwierdzenie koszyka.'
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
    let url = 'http://localhost:9000/summary';
    fetch(url, {
      method: 'get',
      credentials: 'include',
      headers: new Headers({ 'content-type': 'application/json' })
    })
      .then((response) => response.text())
      .then((response) => {
        let responseWithCartItems = JSON.parse(response);
        if (responseWithCartItems.produkty.length !== 0) {
          let price = 0;
          for (let iter in responseWithCartItems.produkty) {
            price =
              price +
              responseWithCartItems.produkty[iter].cena *
                responseWithCartItems.produkty[iter].ilosc;
          }
          this.setState({
            isEmpty: false,
            price: price
          });
        }
        this.setState({
          apiResponse: response,
          isLoading: false
        });
      })
      .catch((err) => err);
  }

  handleRowClick(event, id) {
    event.preventDefault();
    this.props.history.push('/product?id=' + id);
  }

  handleBuyClick() {
    let url = 'http://localhost:9000/buy';
    fetch(url, {
      method: 'post',
      credentials: 'include',
      headers: new Headers({ 'content-type': 'application/json' })
    })
      .then((response) => response.text())
      .then((response) => {
        if (response === 'kupiono') {
          this.props.sendUpdatedCartItems(true);
          this.props.history.push('/purchaseconfirmation');
        }
      });
  }

  render() {
    if (this.state.isLogged === false && this.state.logInInfoReceived === true) {
      return <Redirect to="/login" />;
    } else if (this.state.isLoading) {
      return <div>Loading...</div>;
    } else {
      if (this.state.isEmpty === false) {
        let apiResponse = JSON.parse(this.state.apiResponse);
        return (
          <div className="container-fluid">
            <div className="row navbar-padding">
              <div className="col-xl-3"></div>
              <div className="col-xl-6 mt-5 componentBackgroundColor mt-3 mb-3 shadow-sm p-3 bg-white rounded">
                <div className="row">
                  <div className="col-xl-12">
                    <span className="p-2 m-2 font-weight-bold text-center">
                      <h2>PODSUMOWANIE</h2>
                    </span>
                    <span className="p-3 m-3 font-weight-bold text-left">
                      <h4>Zamawiane przedmioty</h4>
                    </span>

                    <table className="table table-hover mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th className="font-weight-bold">Nazwa produktu</th>
                          <th className="font-weight-bold">Cena za sztukę</th>
                          <th className="font-weight-bold">Ilość</th>
                          <th className="font-weight-bold">Łączna cena</th>
                        </tr>
                      </thead>
                      <tbody className="table-striped">
                        {apiResponse.produkty.map((api) => (
                          <tr
                            className="cursor-pointer"
                            key={api.id_produktu}
                            onClick={(e) => this.handleRowClick(e, api.id_produktu)}>
                            <td className="font-weight-bold">
                              {api.producent + ' ' + api.nazwa_produktu}
                            </td>
                            <td className="font-weight-bold">
                              {api.cena.toFixed(2).replace('.', ',')} zł
                            </td>
                            <td className="font-weight-bold">{api.ilosc}</td>
                            <td className="font-weight-bold">
                              {(api.cena * api.ilosc).toFixed(2).replace('.', ',') + ' zł'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="border-bottom border border-primary"></div>
                    <div className="text-right pb-3 pr-4 pt-2">
                      <h4>
                        cena całkowita: {this.state.price.toFixed(2).replace('.', ',') + ' zł'}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-12">
                    <div className="p-3 m-3 font-weight-bold text-left">
                      <h4>Dane dostawy</h4>
                    </div>
                    <table className="table table-hover">
                      <thead className="thead-light">
                        <tr>
                          <th className="font-weight-bold">Imie i nazwisko</th>
                          <th className="font-weight-bold">Miejsce dostawy</th>
                          <th className="font-weight-bold">Nazwa Firmy</th>
                        </tr>
                      </thead>
                      <tbody className="table-striped">
                        <tr className="cursor-pointer" key={apiResponse.dane_dostawy.imie}>
                          <td className="font-weight-bold">{`${apiResponse.dane_dostawy.imie} ${apiResponse.dane_dostawy.nazwisko}`}</td>
                          <td className="font-weight-bold">{`${apiResponse.dane_dostawy.miasto} ul. ${apiResponse.dane_dostawy.ulica} ${apiResponse.dane_dostawy.kod}`}</td>
                          <td className="font-weight-bold">
                            {apiResponse.dane_dostawy.nazwa_firmy === null
                              ? ' '
                              : apiResponse.dane_dostawy.nazwa_firmy}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row pt-5">
                  <div className="col-3"></div>
                  <div className="col-6">
                    <button
                      className="btn btn-lg btn-block mt-1 pt-1 btn-primary"
                      onClick={() => this.handleBuyClick()}>
                      Kup produkty <i className="fas fa-sign-out-alt"></i>
                    </button>
                  </div>
                  <div className="col-3"></div>
                </div>
              </div>
              <div className="col-xl-3"></div>
            </div>
            <div className="row pt-4 pb-5 mb-5">
              <div className="col-lg-4"></div>
              <div className="col-lg-4 text-left">
                <Link className="btn btn-outline-secondary" to="/cart">
                  <i className="fas fa-chevron-left"></i> Wróć do koszyka
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
