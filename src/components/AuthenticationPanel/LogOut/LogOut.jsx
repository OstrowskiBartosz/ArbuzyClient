import React from 'react';
import { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sessionChange } from '../../../store/storeSlices/sessionSlice.js';
import { updateCartItems } from '../../../store/storeSlices/cartItemsSlice';
import newAlert from '../../../features/newAlert';

const LogOut = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const isLogged = useSelector((state) => state.session.isLogged);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    setIsLoading(true);
    const url = `http://localhost:9000/sessionv1`;
    fetch(url, { method: 'delete', credentials: 'include' })
      .then((response) => response.text())
      .then((data) => {
        setIsLoading(false);
        dispatch(sessionChange(false));
        dispatch(updateCartItems(true));
        newAlert('danger', 'Wylogowano!', 'Użytkownik został wylogowany.');
      });
  };

  if (isLogged === false) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="container-fluid">
        <div className="row navbar-padding">
          <div className="col-lg-4"></div>
          <div className="col-lg-4 mt-5 componentBackgroundColor shadow-sm p-3 mb-5 bg-white rounded">
            <div className="card-body ">
              <div className="p-3 text-left">
                <h5 className="card-title bigfont">Czy na pewno chcesz się wylogować?</h5>
                <div className="loginSignupSubmitButton">
                  <button
                    className="btn btn-outline-primary"
                    onClick={(event) => handleLogout(event)}>
                    Wyloguj {isLoading ? <div className="spinner-border smallSpinner"></div> : null}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4"></div>
        </div>
        <div className="row pt-4">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <Link className="btn btn-outline-secondary m-bot-10" to="/">
              <i className="fas fa-chevron-left"></i> Wróć do strony głównej
            </Link>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    );
  }
};
export default LogOut;
