import { useState } from 'react';
import './LogIn.css';
import { useDispatch } from 'react-redux';
import { sessionChange } from '../../../store/storeSlices/sessionSlice.js';
import { updateCartItems } from '../../../store/storeSlices/cartItemsSlice';
import newAlert from '../../../features/newAlert';
import getFormData from '../utils/getFormData';

const LogIn = (props) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const loginData = getFormData('loginForm');
      const url = `${process.env.REACT_APP_API}/session`;
      const response = await fetch(url, {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify(loginData),
        headers: new Headers({ 'content-type': 'application/json' })
      });
      if (response.status === 400 || response.status === 500)
        throw new Error('Ooops, spróbuj ponownie później!');

      const json = await response.json();

      if (json.message === 'Logged.') {
        dispatch(sessionChange(true));
        dispatch(updateCartItems(true));
        newAlert('primary', 'Zalogowano!', 'Uzytkownik został zalogowany.');
      } else {
        setError(json.message);
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div className={'card-body'}>
      <div className="p-3 text-left">
        <h5 className="card-title bigfont">Logowanie użytkownika/firmy</h5>
        <form id="loginForm" onSubmit={(event) => handleLoginSubmit(event)}>
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
              name="password"
              maxLength="60"
              className="form-control"
              placeholder="password"
              autoComplete="current-password"
              required></input>
          </div>
          <div className={error ? 'error' : 'd-none'}>
            <div className="errorWarning">
              <i className="fas fa-exclamation-triangle errorWarning"></i>
              <div className="errorMessage">{error}</div>
            </div>
          </div>
          <div className="loginSignupSubmitButton ">
            <button className="btn btn-outline-primary">
              <input className="inputNoStyle" type="submit" value="Login"></input>{' '}
              {isLoading ? <div className="spinner-border smallSpinner"></div> : null}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
