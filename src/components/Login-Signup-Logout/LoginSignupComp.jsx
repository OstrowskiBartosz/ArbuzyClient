import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './LoginSignup.css';

class LoginSignupComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      czyfirma: false,
      activeLogin: true,
      activeSignup: false,
      isLogged: false,
      errorLogin: false,
      errorMessageLogin: '',
      errorSignup: false,
      errorMessageSignup: ''
    };
  }

  componentDidUpdate(prevState, prevProps) {
    if (prevState.isLogged !== this.props.isLogged) {
      this.setState({
        isLogged: this.props.isLogged
      });
    }
  }

  handleSignupSubmit(event) {
    event.preventDefault();
    this.setState({
      errorSignup: false,
      errorMessageSignup: ''
    });
    let myForm = document.getElementById('SignupForm');
    let formData = new FormData(myForm);
    var object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    let url = 'http://localhost:9000/users';
    fetch(url, {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(object),
      headers: new Headers({ 'content-type': 'application/json' })
    })
      .then((response) => response.text())
      .then((response) => {
        if (response !== 'signedup') {
          this.setState({
            errorSignup: true,
            errorMessageSignup: response
          });
        } else {
          this.setState({
            isLogged: true
          });
          this.props.sendLoggedUser(this.state.isLogged);
          this.props.sendAlertMessage(
            'primary',
            'Zarejestrowano i zalogowano!',
            'Rejestracja konta przebiegła pomyślnie. Uzytkownik został zalogowany automatycznie.'
          );
        }
      })
      .catch((err) => err);
  }

  componentDidMount() {
    if (this.props.hasExpired === true) {
      this.setState({
        errorLogin: true,
        errorMessageLogin: 'Sesja wygasła. Proszę zalogować się ponownie.'
      });
    }
  }
  handleLoginSubmit(event) {
    event.preventDefault();
    this.setState({
      errorLogin: false,
      errorMessageLogin: ''
    });
    let myForm = document.getElementById('loginForm');
    let formData = new FormData(myForm);
    var object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    let url = 'http://localhost:9000/login';
    fetch(url, {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(object),
      headers: new Headers({ 'content-type': 'application/json' })
    })
      .then((response) => response.text())
      .then((response) => {
        if (response !== 'logged') {
          this.setState({
            errorLogin: true,
            errorMessageLogin: response
          });
        } else {
          this.setState({
            isLogged: true
          });
          this.props.sendLoggedUser(this.state.isLogged);
          this.props.sendAlertMessage('primary', 'Zalogowano!', 'Uzytkownik został zalogowany.');
        }
      })
      .catch((err) => err);
  }

  handleFirmaChange(event) {
    var czyfirma = event.target.checked ? true : false;
    this.setState({
      czyfirma: czyfirma
    });
  }

  handleSLChange(event) {
    let activeSignup;
    let activeLogin;
    if (event.target.id === 'Signuptab') {
      activeSignup = true;
      activeLogin = false;
    } else if (event.target.id === 'Logintab') {
      activeSignup = false;
      activeLogin = true;
    }
    this.setState({
      activeLogin: activeLogin,
      activeSignup: activeSignup
    });
  }

  render() {
    if (this.state.isLogged === true) {
      if (this.props.redirect === '/login') {
        return <Redirect to="/" />;
      }
      return <Redirect to={this.props.redirect} />;
    }
    return (
      <div className="container-fluid">
        <div className="row navbar-padding">
          <div className="col-xl-4"></div>
          <div className="col-xl-4 mt-5 componentBackgroundColor shadow-sm p-3 mb-5 bg-white rounded">
            <div className="card-body">
              <div
                id="Logintab"
                className={'outlinetab col-lg-6 ' + (this.state.activeLogin ? ' activeTab' : '')}
                onClick={(event) => this.handleSLChange(event)}>
                Logowanie
              </div>
              <div
                id="Signuptab"
                className={'outlinetab col-lg-6 ' + (this.state.activeSignup ? ' activeTab' : '')}
                onClick={(event) => this.handleSLChange(event)}>
                Rejestracja
              </div>
            </div>
            <div className={'card-body ' + (this.state.activeSignup ? '' : 'd-none')}>
              <div className="p-3 text-left">
                <h5 className="card-title bigfont">Rejestracja użytkownika/firmy</h5>
                <form id="SignupForm" onSubmit={(event) => this.handleSignupSubmit(event)}>
                  <div>Dane logowania</div>
                  <div className="row">
                    <div className="col-lg-6 signupinput">
                      <input
                        type="text"
                        name="login"
                        maxLength="30"
                        className="form-control"
                        placeholder="login"
                        autoComplete="username"
                        required></input>
                    </div>
                    <div className="col-lg-6 signupinput">
                      <input
                        type="password"
                        name="haslo"
                        className="form-control"
                        placeholder="hasło"
                        maxLength="60"
                        autoComplete="current-password"
                        required></input>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 signupinput">
                      <input
                        type="email"
                        name="email"
                        maxLength="70"
                        className="form-control"
                        placeholder="adres e-mail"
                        required></input>
                    </div>
                  </div>

                  <div>Dane personalne</div>
                  <div className="row">
                    <div className="col-lg-6 signupinput">
                      <input
                        type="text"
                        name="imie"
                        maxLength="20"
                        className="form-control"
                        placeholder="imię"
                        required></input>
                    </div>
                    <div className="col-lg-6 signupinput">
                      <input
                        type="text"
                        name="nazwisko"
                        maxLength="30"
                        className="form-control"
                        placeholder="nazwisko"
                        required></input>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6 signupinput">
                      <input
                        type="text"
                        name="telefon_o"
                        className="form-control"
                        placeholder="numer telefonu"
                        maxLength="9"
                        required></input>
                    </div>
                  </div>

                  <div className="SignupCompanyCheckbox pb-2">
                    Czy zakładane jest konto firmowe?{' '}
                    <input
                      type="checkbox"
                      onChange={(event) => this.handleFirmaChange(event)}></input>
                  </div>

                  <div className={'' + (this.state.czyfirma ? '' : 'd-none')}>Dane firmy</div>
                  <div className={'row ' + (this.state.czyfirma ? '' : 'd-none')}>
                    <div className="col-lg-6 signupinput">
                      <input
                        type="text"
                        name="nazwa_firmy"
                        className="form-control"
                        placeholder="nazwa firmy"
                        maxLength="100"
                        required={this.state.czyfirma ? ' required' : ''}></input>
                    </div>
                    <div className="col-lg-6 signupinput">
                      <input
                        type="text"
                        name="nip"
                        maxLength="10"
                        className="form-control"
                        placeholder="numer nip"
                        required={this.state.czyfirma ? ' required' : ''}></input>
                    </div>
                  </div>

                  <div className={'' + (this.state.czyfirma ? 'd-none' : '')}>
                    Dane zamieszkania
                  </div>
                  <div className="row">
                    <div className="col-12 signupinput">
                      <input
                        type="text"
                        name="ulica"
                        className="form-control"
                        placeholder="ulica, numer domu i mieszkania"
                        maxLength="50"
                        required></input>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6 signupinput">
                      <input
                        type="text"
                        name="miasto"
                        className="form-control"
                        placeholder="miasto"
                        maxLength="50"
                        required></input>
                    </div>
                    <div className="col-lg-6 signupinput">
                      <input
                        type="text"
                        name="kod"
                        className="form-control"
                        placeholder="kod pocztowy"
                        size="5"
                        maxLength="5"
                        required
                        onChange={(event) => {
                          event.currentTarget.value = event.currentTarget.value.replace(
                            /[^\d]/,
                            ''
                          );
                        }}></input>
                    </div>
                  </div>
                  <small id="notka" className="form-text text-muted">
                    Nigdy nie podzielimy się z nikim twoimi danymi.
                  </small>

                  <div className={'error ' + (this.state.errorSignup ? '' : 'd-none')}>
                    <div className="errorWarning">
                      <i className="fas fa-exclamation-triangle errorWarning"></i>
                      <div className="errorMessage">{this.state.errorMessageSignup}</div>
                    </div>
                  </div>
                  <div className="loginSignupSubmitButton">
                    <input
                      type="submit"
                      value="Utwórz konto"
                      className="btn btn-outline-primary"></input>
                  </div>
                </form>
              </div>
            </div>

            <div className={'card-body ' + (this.state.activeLogin ? '' : 'd-none')}>
              <div className="p-3 text-left">
                <h5 className="card-title bigfont">Logowanie użytkownika/firmy</h5>
                <form id="loginForm" onSubmit={(event) => this.handleLoginSubmit(event)}>
                  <div>Dane logowania</div>
                  <div className="signupinput">
                    <input
                      type="text"
                      name="login"
                      className="form-control"
                      placeholder="login"
                      maxLength="30"
                      autoComplete="username"
                      required></input>
                  </div>
                  <div className="signupinput">
                    <input
                      type="password"
                      name="haslo"
                      maxLength="60"
                      className="form-control"
                      placeholder="hasło"
                      autoComplete="current-password"
                      required></input>
                  </div>
                  <div className={'error ' + (this.state.errorLogin ? '' : 'd-none')}>
                    <div className="errorWarning">
                      <i className="fas fa-exclamation-triangle errorWarning"></i>
                      <div className="errorMessage">{this.state.errorMessageLogin}</div>
                    </div>
                  </div>
                  <div className="loginSignupSubmitButton">
                    <input
                      type="submit"
                      value="Zaloguj"
                      className="btn btn-outline-primary"></input>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-xl-4"></div>
        </div>
        <div className="row pt-4">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <Link className="btn btn-outline-secondary m-bot-10" to="/">
              {' '}
              <i className="fas fa-chevron-left"></i> Wróć do strony głównej
            </Link>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    );
  }
}

export default LoginSignupComp;
