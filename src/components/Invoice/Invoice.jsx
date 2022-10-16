import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Invoice.css';

class Invoice extends React.Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(window.location.search);
    this.state = {
      errorLogin: false,
      errorMessageLogin: '',
      errorSignup: false,
      errorMessageSignup: '',
      activeTab: 1,
      isLoading: true,
      invoiceID: params.get('id'),

      isLogged: null,
      logInInfoReceived: false
    };
  }

  componentWillUnmount() {
    if (this.state.isLogged === false) {
      this.props.sendAlertMessage(
        'danger',
        'Zaloguj się!',
        'Zaloguj się, żeby zobaczyć swoje faktury.'
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
    this.fetchInvoice();
  }

  fetchInvoice() {
    let url = 'http://localhost:9000/invoice';
    fetch(url, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'invoiceID=' + this.state.invoiceID
    })
      .then((response) => response.text())
      .then((response) => {
        var responseObject = JSON.parse(response);
        this.setState({ response: responseObject, isLoading: false });
      })
      .catch((err) => err);
  }

  render() {
    if (this.state.logout === true) {
      return <Redirect to="/" />;
    }
    if (this.state.isLogged === false && this.state.logInInfoReceived === true) {
      return <Redirect to="/login" />;
    } else if (this.state.isLoading) {
      return <div>Loading...</div>;
    } else {
      if (this.state.response.error) {
        return <Redirect to="/profil" />;
      } else {
        return (
          <div className="container options shadow-sm bg-white rounded">
            <h1>Szczegóły zamówienia</h1>
            <div className="row align-left bordered">
              <div className="col">
                <div>
                  <strong>Szczegóły:</strong>
                  <hr></hr>
                </div>
                <div>
                  Status: <strong>Zrealizowane</strong>
                </div>
                <div>
                  Data wystawienia:{' '}
                  <strong>
                    {new Intl.DateTimeFormat('pl-PL', {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(new Date(this.state.response.invoiceDate))}
                  </strong>
                </div>
                <div>
                  Typ rachunku: <strong>Faktura</strong>
                </div>
              </div>
            </div>
            <div className="row align-left bordered">
              <div className="col">
                <div>
                  <strong>Nabywca:</strong>
                  <hr></hr>
                </div>
                <div className={this.state.response.invoiceFirma == null ? '' : 'd-none'}>
                  {this.state.response.invoiceNazwa}
                </div>
                <div className={this.state.response.invoiceFirma == null ? 'd-none' : ''}>
                  {this.state.response.invoiceFirma}
                </div>
                <div>
                  {this.state.response.invoiceKod} {this.state.response.invoiceMiasto}
                </div>
                <div>{this.state.response.invoiceUlica}</div>
                <div className={this.state.response.invoiceNIP == null ? 'd-none' : ''}>
                  NIP: {this.state.response.invoiceNIP}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col margin-5">
                <table className="table table-hover">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Nazwa produktu</th>
                      <th scope="col">Ilość</th>
                      <th scope="col">Cena</th>
                      <th scope="col">Wartość</th>
                      <th scope="col">VAT</th>
                    </tr>
                  </thead>
                  <tbody className="table-striped">
                    {this.state.response.produkty.map((produkt, index) => (
                      <tr key={index}>
                        <td>
                          <Link to={'/product?id=' + produkt.id_produktu}>
                            {produkt.nazwa_kategorii} {produkt.nazwa_producenta}{' '}
                            {produkt.nazwa_produktu}
                          </Link>
                        </td>
                        <td>{produkt.ilosc}</td>
                        <td>
                          {produkt.cena_brutto.toLocaleString('pl-PL', {
                            minimumFractionDigits: 2
                          })}{' '}
                          zł
                        </td>
                        <td>
                          {(produkt.cena_brutto * produkt.ilosc).toLocaleString('pl-PL', {
                            minimumFractionDigits: 2
                          })}{' '}
                          zł
                        </td>
                        <td>{produkt.procent_vat}%</td>
                      </tr>
                    ))}
                    <tr>
                      <td>
                        <strong>Całkowita wartość faktury:</strong>
                      </td>
                      <td></td>
                      <td></td>
                      <td>
                        {this.state.response.invoiceBrutto.toLocaleString('pl-PL', {
                          minimumFractionDigits: 2
                        })}{' '}
                        zł
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

export default Invoice;
