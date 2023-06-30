import React from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sessionChange } from '../../../store/storeSlices/sessionSlice.js';
import { updateCartItems } from '../../../store/storeSlices/cartItemsSlice';
import newAlert from '../../../features/newAlert';
import MoveBack from '../../../features/additionalComponents/MoveBack/MoveBack';
import './LogOut.css';

import { deleteData } from '../../../features/sharableMethods/httpRequests';

const LogOut = (props) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isLogged = useSelector((state) => state.session.isLogged);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetch = await deleteData('session');
      const response = await fetch.json();
      if ((response.message = 'Logged out.')) {
        dispatch(sessionChange(false));
        dispatch(updateCartItems(true));
        newAlert('danger', 'Wylogowano!', 'Użytkownik został wylogowany.');
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  if (isLogged === false) {
    return <Redirect to="/" />;
  } else {
    return (
      <>
        <div className="container-fluid">
          <div className="row navbar-padding">
            <div className="col-lg-4"></div>
            <div className="col-lg-4 mt-5 componentBackgroundColor shadow p-3 mb-5 bg-white rounded">
              <div className="card-body ">
                <div className="p-3 text-left">
                  <h5 className="card-title bigfont">Czy na pewno chcesz się wylogować?</h5>
                  <div className={error ? 'error' : 'd-none'}>
                    <div className="errorWarning">
                      <i className="fas fa-exclamation-triangle errorWarning"></i>
                      <div className="errorMessage">{error}</div>
                    </div>
                  </div>
                  <div className="loginSignupSubmitButton">
                    <button
                      className="btn btn-outline-primary"
                      onClick={(event) => handleLogout(event)}>
                      Wyloguj{' '}
                      {isLoading ? <div className="spinner-border smallSpinner"></div> : null}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4"></div>
          </div>
        </div>
        <MoveBack moveBackText="Wróć do strony głównej" moveBackURL="/" />
      </>
    );
  }
};
export default LogOut;
