import { useState } from 'react';
import './SignUp.css';
import { useDispatch } from 'react-redux';
import { sessionChange } from '../../../store/storeSlices/sessionSlice.js';
import { updateCartItems } from '../../../store/storeSlices/cartItemsSlice';
import newAlert from '../../../features/newAlert';
import getFormData from '../utils/getFormData';

const SignUp = (props) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [companyAccount, setcompanyAccount] = useState(false);

  const dispatch = useDispatch();

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const signupData = getFormData('SignupForm');
      const url = `${process.env.REACT_APP_API}/user`;
      const response = await fetch(url, {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify(signupData),
        headers: new Headers({ 'content-type': 'application/json' })
      });
      if (response.status === 400 || response.status === 500)
        throw new Error('Ooops, spróbuj ponownie później!');

      const json = await response.json();
      if (json.message !== 'signedup') {
        setError(json.message);
      } else {
        dispatch(sessionChange(true));
        dispatch(updateCartItems(true));
        newAlert('primary', 'Zarejestrowano!', 'Rejestracja i logowanie pomyślne.');
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const handleCompanyAccount = (event) => {
    setcompanyAccount(event.target.checked ? true : false);
  };

  return (
    <div className={'card-body '}>
      <div className="p-3 text-left">
        <h5 className="card-title bigfont">Rejestracja użytkownika/firmy</h5>
        <form id="SignupForm" onSubmit={(event) => handleSignupSubmit(event)}>
          <div className="fw-bold">Dane logowania</div>
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
                name="password"
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

          <div className="fw-bold">Dane personalne</div>
          <div className="row">
            <div className="col-lg-6 signupinput">
              <input
                type="text"
                name="firstName"
                maxLength="20"
                className="form-control"
                placeholder="imię"
                required></input>
            </div>
            <div className="col-lg-6 signupinput">
              <input
                type="text"
                name="lastName"
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
                name="phoneNumber"
                className="form-control"
                placeholder="numer telefonu"
                maxLength="9"
                required></input>
            </div>
          </div>

          <div className="SignupCompanyCheckbox pb-2">
            <label className="fw-bold text-decoration-none" htmlFor="companyAccount">
              Czy zakładane jest konto firmowe?
            </label>{' '}
            <input
              id="companyAccount"
              type="checkbox"
              onChange={(event) => handleCompanyAccount(event)}></input>
          </div>
          {companyAccount ? (
            <>
              <div className="fw-bold ">Dane firmowe</div>
              <div className="row">
                <div className="col-lg-6 signupinput">
                  <input
                    type="text"
                    name="companyName"
                    className="form-control"
                    placeholder="nazwa firmy"
                    maxLength="100"
                    required={companyAccount ? ' required' : ''}></input>
                </div>
                <div className="col-lg-6 signupinput">
                  <input
                    type="text"
                    name="VATNumber"
                    maxLength="10"
                    className="form-control"
                    placeholder="numer NIP"
                    required={companyAccount ? ' required' : ''}></input>
                </div>
              </div>
            </>
          ) : null}

          <div className={'fw-bold ' + (companyAccount ? 'd-none' : '')}>Dane zamieszkania</div>
          <div className="row">
            <div className="col-12 signupinput">
              <input
                type="text"
                name="streetName"
                className="form-control"
                placeholder="ulica, numer budynku i/lub mieszkania"
                maxLength="50"
                required></input>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 signupinput">
              <input
                type="text"
                name="cityName"
                className="form-control"
                placeholder="miasto"
                maxLength="50"
                required></input>
            </div>
            <div className="col-lg-6 signupinput">
              <input
                type="text"
                name="ZIPCode"
                className="form-control"
                placeholder="kod pocztowy"
                size="5"
                maxLength="5"
                required
                onChange={(event) => {
                  event.currentTarget.value = event.currentTarget.value.replace(/[^\d]/, '');
                }}></input>
            </div>
          </div>
          <small id="comment" className="form-text text-muted">
            Nigdy nie podzielimy się z nikim twoimi danymi.
          </small>

          <div className={error ? 'error ' : 'd-none'}>
            <div className="errorWarning">
              <i className="fas fa-exclamation-triangle errorWarning"></i>
              <div className="errorMessage">{error}</div>
            </div>
          </div>
          <div className="loginSignupSubmitButton">
            <button className="btn btn-outline-primary">
              <input className="inputNoStyle" type="submit" value="Utwórz konto"></input>{' '}
              {isLoading ? <div className="spinner-border smallSpinner"></div> : null}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
