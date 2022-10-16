import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorLogin: false,
      errorMessageLogin: '',
      errorSignup: false,
      errorMessageSignup: '',
      activeTab: 1,
      isLoading: true,
      userEdit: false,
      userDelete: false,
      logout: false,

      isLogged: null,
      logInInfoReceived: false
    };
  }

  componentWillUnmount() {
    if (this.state.isLogged === false) {
      this.props.sendAlertMessage(
        'danger',
        'Zaloguj się!',
        'Zaloguj się, żeby zobaczyć swój profil.'
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
    this.fetchProfileOrders();
  }

  fetchProfileOrders() {
    let url = 'http://localhost:9000/profileOrders';
    fetch(url, {
      method: 'post',
      credentials: 'include'
    })
      .then((response) => response.text())
      .then((response) => {
        var responseObject = JSON.parse(response);
        this.setState({
          activeTab: 1,
          response: responseObject,
          isLoading: false
        });
      })
      .catch((err) => err);
  }

  handleTabChange(event) {
    switch (event.currentTarget.id) {
      case 'orders-btn':
      default:
        let url = 'http://localhost:9000/profileOrders';
        fetch(url, {
          method: 'post',
          credentials: 'include'
        })
          .then((response) => response.text())
          .then((response) => {
            var responseObject = JSON.parse(response);
            this.setState({ activeTab: 1, response: responseObject });
          })
          .catch((err) => err);
        break;
      case 'products-btn':
        this.setState({ activeTab: 2 });
        break;
      case 'complaints-btn':
        this.setState({ activeTab: 3 });
        break;
      case 'settings-btn':
        this.setState({ activeTab: 4 });
        break;
    }
  }

  editUserData() {
    if (this.state.userEdit === false) {
      var userEdit = !this.state.userEdit;
      this.setState({ userEdit: userEdit });
    } else {
      let url = 'http://localhost:9000/updateUser';
      let myForm = document.getElementById('updateForm');
      let formData = new FormData(myForm);
      var object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      fetch(url, {
        body: JSON.stringify(object),
        method: 'post',
        credentials: 'include',
        headers: new Headers({ 'content-type': 'application/json' })
      })
        .then((response) => response.text())
        .then((response) => {
          var userEdit = !this.state.userEdit;
          this.setState({ userEdit: userEdit });
          window.location.reload();
        })
        .catch((err) => err);
    }
  }

  deleteUser() {
    if (this.state.userDelete) {
      let url = 'http://localhost:9000/deleteUser';
      fetch(url, {
        method: 'post',
        credentials: 'include'
      })
        .then((response) => response.text())
        .then((response) => {
          this.setState({
            isLoading: false,
            logout: true,
            isisLogged: false
          });
        })
        .catch((err) => err);
    } else {
      var userDelete = !this.state.userDelete;
      this.setState({ userDelete: userDelete });
    }
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
      return (
        <>
          <div className="container options shadow-sm bg-white rounded">
            <div className="d-flex flex-wrap">
              <div className="col">
                <button
                  id="orders-btn"
                  className="btn btn-primary option"
                  onClick={(event) => this.handleTabChange(event)}>
                  <i className="fa fa-shopping-bag"></i> Zamówienia
                </button>
              </div>
              <div className="col d-none">
                <button
                  id="products-btn"
                  className="btn btn-primary option"
                  onClick={(event) => this.handleTabChange(event)}>
                  <i className="fab fa-product-hunt"></i> Produkty
                </button>
              </div>
              <div className="col">
                <button
                  id="complaints-btn"
                  className="btn btn-primary option"
                  onClick={(event) => this.handleTabChange(event)}>
                  <i className="fa fa-share-square"></i> Reklamacje
                </button>
              </div>
              <div className="col">
                <button
                  id="settings-btn"
                  className="btn btn-primary option"
                  onClick={(event) => this.handleTabChange(event)}>
                  <i className="fas fa-cog"></i> Ustawienia
                </button>
              </div>
            </div>
            <div className={'container orders ' + (this.state.activeTab === 1 ? '' : 'd-none')}>
              <div className="row">
                <div className="col mt-3 pb-3">
                  <h1>Twoje zamówienia</h1>
                  {this.state.response.invoice !== undefined ? (
                    <table className="table table-hover mt-4">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Data</th>
                          <th scope="col">Wartość netto</th>
                          <th scope="col">Wartość brutto</th>
                          <th scope="col">Akcja</th>
                        </tr>
                      </thead>
                      <tbody className="table-striped">
                        {this.state.response.invoice.map((faktura, index) => (
                          <tr key={faktura.id_faktury}>
                            <td>{faktura.id_faktury}</td>
                            <td>
                              {new Intl.DateTimeFormat('pl-PL', {
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit'
                              }).format(new Date(faktura.data))}
                            </td>
                            <td>
                              {faktura.wartosc_netto.toLocaleString('pl-PL', {
                                minimumFractionDigits: 2
                              })}{' '}
                              zł
                            </td>
                            <td>
                              {faktura.wortosc_brutto.toLocaleString('pl-PL', {
                                minimumFractionDigits: 2
                              })}{' '}
                              zł
                            </td>
                            <td>
                              <Link
                                className="btn btn-primary"
                                to={'/invoice?id=' + faktura.id_faktury}>
                                Szczegóły
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="row">
                      <div className="col-12">
                        <h1>Brak zamówionych towarów, kup coś :-)</h1>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col"></div>
              </div>
              <div className="row">
                <div className="col"></div>
              </div>
            </div>
            <div className={'container products ' + (this.state.activeTab === 2 ? '' : 'd-none')}>
              <div className="row">
                <div className="col">
                  <h1>Twoje produkty</h1>
                </div>
              </div>
              <div className="row">
                <div className="col"></div>
              </div>
              <div className="row">
                <div className="col"></div>
              </div>
            </div>
            <div className={'container complaints ' + (this.state.activeTab === 3 ? '' : 'd-none')}>
              <div className="row">
                <div className="col mt-3 mb-3">
                  <h1>Reklamacje w sklepie Arbuzy.com</h1>
                </div>
              </div>
              <div className="row">
                <div className="col left">
                  <p>
                    W celu złożenia reklamacji w sklepie Arbuzy.com należy wysłać reklamowany towar
                    na adres:
                  </p>
                  <p className="pb-0 mb-0 pt-0 mt-0">Arbuzy.com</p>
                  <p className="pb-0 mb-0 pt-0 mt-0">Dział Obsługi Reklamacji</p>
                  <p className="pb-0 mb-0 pt-0 mt-0">ul. Owocowa 16/5b</p>
                  <p className="pb-0 mb-0 pt-0 mt-0">12-123 Warszawa</p>
                  <p className="fw-bold mt-3 pb-0 mb-0">
                    Do paczki powinien zostać dołączony numer zamówienia, którego dotyczy przesyłana
                    reklamacja.
                  </p>
                  <p className="mb-4">
                    Towar powinien zostać zapakowany w bezpieczny sposób, aby nie uległ uszkodzeniu
                    podczas wysyłki. Za wszelkie uszkodzenia wynikłe z tego tytułu odpowiada
                    kupujący.
                  </p>
                </div>
              </div>
            </div>
            <div className={'container settings ' + (this.state.activeTab === 4 ? '' : 'd-none')}>
              <div className="row">
                <div className="col mt-3 mb-3">
                  <h1>Ustawienia konta</h1>
                </div>
              </div>
              {this.state.response.user.map((user, index) => (
                <div key={index} className="row">
                  <div className={this.state.userEdit ? 'd-none' : 'col left'}>
                    <h3>Dane użytkownika</h3>
                    <hr className="m-bot-10"></hr>
                    <strong className={user.nazwa_firmy == null ? 'd-none' : ''}>
                      Nazwa firmy
                    </strong>
                    <div className={user.nazwa_firmy == null ? 'd-none' : 'm-left-10'}>
                      {user.nazwa_firmy}
                    </div>
                    <strong className={user.nazwa_firmy == null ? '' : 'd-none'}>
                      Imię i nazwisko
                    </strong>
                    <div className={user.numer_nip == null ? 'm-left-10' : 'd-none'}>
                      {user.imie} {user.nazwisko}
                    </div>
                    <strong>Ulica, numer domu/mieszkania</strong>
                    <div className="m-left-10">{user.ulica_zamieszkania}</div>
                    <strong>Miasto, kod pocztowy</strong>
                    <div className="m-left-10">
                      {user.miasto_zamieszkania} {user.kod_pocztowy}
                    </div>
                    <strong className={user.numer_nip == null ? 'd-none' : ''}>
                      Miasto, kod pocztowy
                    </strong>
                    <div className={user.numer_nip == null ? 'd-none' : 'm-left-10'}>
                      {user.numer_nip}
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary m-top-10"
                      onClick={() => this.editUserData()}>
                      Edytuj dane
                    </button>
                  </div>
                  <div className={this.state.userEdit ? 'col left' : 'd-none'}>
                    <h3>Dane użytkownika</h3>
                    <hr className="m-bot-10"></hr>
                    <form id="updateForm">
                      <div className={user.numer_nip == null ? 'd-none' : 'form-row m-bot-10'}>
                        <div className="col">
                          <label htmlFor="firma">Nazwa firmy</label>
                          <input
                            name="firma"
                            id="firma"
                            type="text"
                            className="form-control"
                            maxLength="100"
                            defaultValue={user.nazwa_firmy}></input>
                        </div>
                      </div>
                      <div className={user.numer_nip == null ? 'form-row m-bot-10' : 'd-none'}>
                        <div className="col">
                          <label htmlFor="imie">Imię</label>
                          <input
                            name="imie"
                            id="imie"
                            type="text"
                            className="form-control"
                            maxLength="20"
                            defaultValue={user.imie}></input>
                        </div>
                        <div className="col">
                          <label htmlFor="nazwisko">Nazwisko</label>
                          <input
                            name="nazwisko"
                            id="nazwisko"
                            type="text"
                            className="form-control"
                            maxLength="30"
                            defaultValue={user.nazwisko}></input>
                        </div>
                      </div>
                      <div className="form-row m-bot-10">
                        <div className="col">
                          <label htmlFor="ulica">Ulica, numer domu/mieszkania</label>
                          <input
                            name="ulica"
                            id="ulica"
                            type="text"
                            className="form-control"
                            maxLength="50"
                            defaultValue={user.ulica_zamieszkania}></input>
                        </div>
                      </div>
                      <div className="form-row m-bot-10">
                        <div className="col">
                          <label htmlFor="kod">Kod pocztowy</label>
                          <input
                            name="kod"
                            id="kod"
                            type="text"
                            className="form-control"
                            maxLength="6"
                            defaultValue={user.kod_pocztowy}></input>
                        </div>
                        <div className="col">
                          <label htmlFor="miasto">Miasto</label>
                          <input
                            name="miasto"
                            id="miasto"
                            type="text"
                            className="form-control"
                            maxLength="50"
                            defaultValue={user.miasto_zamieszkania}></input>
                        </div>
                      </div>
                      <div className={user.numer_nip == null ? 'd-none' : 'form-row m-bot-10'}>
                        <div className="col">
                          <label htmlFor="nip">Numer NIP</label>
                          <input
                            name="nip"
                            id="nip"
                            type="text"
                            className="form-control"
                            maxLength="10"
                            defaultValue={user.numer_nip}></input>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col">
                          <button
                            type="button"
                            className="btn btn-primary btn-block"
                            onClick={() => this.editUserData()}>
                            Zapisz zmiany
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              ))}
              <div className="row m-top-10 pb-3">
                <div className="col left">
                  <h3>Usuwanie konta</h3>
                  <hr className="m-bot-10"></hr>
                  <button
                    type="button"
                    className={this.state.userDelete ? 'd-none' : 'btn btn-primary'}
                    onClick={() => this.deleteUser()}>
                    Usuń konto
                  </button>
                  <button
                    type="button"
                    className={this.state.userDelete ? 'btn btn-danger' : 'd-none'}
                    onClick={() => this.deleteUser()}>
                    Na pewno?
                  </button>
                  <div className={this.state.userDelete ? 'red' : 'd-none'}>
                    UWAGA!!! Tej akcji nie można cofnąć!
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row pt-5 mt-2">
            <div className="col-lg-3"></div>
            <div className="col-lg-5 text-left">
              <Link className="btn btn-outline-secondary" to="/">
                <i className="fas fa-chevron-left"></i> Wróć do strony głównej
              </Link>
            </div>
            <div className="col-lg-4"></div>
          </div>
        </>
      );
    }
  }
}

export default Profile;
