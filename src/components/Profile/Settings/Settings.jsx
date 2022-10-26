import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sessionChange } from '../../../store/storeSlices/sessionSlice.js';
import { updateCartItems } from '../../../store/storeSlices/cartItemsSlice';
import newAlert from '../../../features/newAlert';

const Settings = ({ isLoadingUser, userData, fetchUserData, setError }) => {
  const [showUserEdit, setShowUserEdit] = useState(false);
  const [userDelete, setUserDelete] = useState(false);
  const [blockUI, setBlockUI] = useState(false);
  const dispatch = useDispatch();

  const showUserEditForm = () => setShowUserEdit(!showUserEdit);

  const editUserData = async () => {
    try {
      setBlockUI(true);
      let myForm = document.getElementById('updateForm');
      let formData = new FormData(myForm);
      let object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      const url = `${process.env.REACT_APP_API}/user`;
      const response = await fetch(url, {
        body: JSON.stringify(object),
        method: 'put',
        credentials: 'include',
        headers: new Headers({ 'content-type': 'application/json' })
      });
      setShowUserEdit(!showUserEdit);
      if (response.ok) {
        fetchUserData();
        newAlert('primary', 'Zmieniono dane', 'Dane użytkownika zostały zmienione.');
      }
      setBlockUI(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteUserComfirmation = () => {
    setUserDelete(true);
  };

  const deleteUser = () => {
    try {
      setBlockUI(true);
      if (userDelete) {
        const url = `${process.env.REACT_APP_API}/user`;
        const response = fetch(url, { method: 'delete', credentials: 'include' });
        if (response.ok) {
          newAlert('danger', 'Użytkownik usuniety', 'Użytkownik został usunięty.');
          dispatch(sessionChange(false));
          dispatch(updateCartItems(true));
          setBlockUI(false);
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoadingUser) {
    return (
      <div className="container settings">
        <div className="row">
          <div className="col mt-3 mb-3">
            <h1>Ustawienia konta</h1>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-center pt-5 pb-5">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container settings">
        <div className={blockUI ? 'blockedUIScreen text-center row position-relative' : ''}>
          <div className="row">
            <div className="col mt-3 mb-3">
              <h1>Ustawienia konta</h1>
            </div>
          </div>
          <div className="border-bottom border border-primary"></div>
          <div className="mt-3"></div>
          <div className="fs-2 fw-bold">Dane użytkownika</div>
          <div className="mb-3"></div>
          <div className={blockUI ? 'blockedUIScreen text-center row position-relative' : ' row'}>
            <div className={showUserEdit ? 'd-none' : 'col left'}>
              <span>Imię i nazwisko</span>
              <div className={'m-left-10 fw-bold'}>
                {userData.firstName} {userData.lastName}
              </div>

              <span>Ulica, numer domu/mieszkania</span>
              <div className="m-left-10  fw-bold">{userData.streetName}</div>

              <span>kod pocztowy</span>
              <div className="m-left-10  fw-bold">{userData.ZIPCode}</div>

              <span>Miasto zamieszkania</span>
              <div className="m-left-10  fw-bold">{userData.cityName}</div>

              <span className={userData.companyName === null ? 'd-none' : ''}>Nazwa firmy</span>
              <div className={userData.companyName === null ? 'd-none' : 'm-left-10'}>
                {userData.companyName}
              </div>

              <span className={userData.VATNumber == null ? 'd-none' : ''}>Numer Nip</span>
              <div className={userData.VATNumber == null ? 'd-none' : 'm-left-10'}>
                {userData.VATNumber}
              </div>

              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={() => showUserEditForm()}>
                Edytuj dane
              </button>
            </div>
            <div className={showUserEdit ? 'col left' : 'd-none'}>
              <div
                className={blockUI ? 'spinner-border position-absolute blockUISpinner' : ''}
                role="status"></div>
              <form id="updateForm">
                <div className="form-row m-bot-10">
                  <div className="col">
                    <label htmlFor="firstName">Imię</label>
                    <input
                      name="firstName"
                      id="firstName"
                      type="text"
                      className="form-control"
                      maxLength="20"
                      defaultValue={userData.firstName}></input>
                  </div>
                  <div className="col">
                    <label htmlFor="lastName">Nazwisko</label>
                    <input
                      name="lastName"
                      id="lastName"
                      type="text"
                      className="form-control"
                      maxLength="30"
                      defaultValue={userData.lastName}></input>
                  </div>
                </div>
                <div className="form-row m-bot-10">
                  <div className="col">
                    <label htmlFor="streetName">Ulica, numer domu/mieszkania</label>
                    <input
                      name="streetName"
                      id="streetName"
                      type="text"
                      className="form-control"
                      maxLength="50"
                      defaultValue={userData.streetName}></input>
                  </div>
                </div>
                <div className="form-row m-bot-10">
                  <div className="col">
                    <label htmlFor="ZIPCode">Kod pocztowy</label>
                    <input
                      name="ZIPCode"
                      id="ZIPCode"
                      type="text"
                      className="form-control"
                      maxLength="6"
                      pattern="[0-9]*"
                      defaultValue={userData.ZIPCode}></input>
                  </div>
                  <div className="col">
                    <label htmlFor="cityName">Miasto</label>
                    <input
                      name="cityName"
                      id="cityName"
                      type="text"
                      className="form-control"
                      maxLength="50"
                      defaultValue={userData.cityName}></input>
                  </div>
                </div>
                <div className={userData.numer_nip == null ? 'd-none' : 'form-row m-bot-10'}>
                  <div className="col">
                    <label htmlFor="companyName">Nazwa firmy</label>
                    <input
                      name="companyName"
                      id="companyName"
                      type="text"
                      className="form-control"
                      maxLength="100"
                      defaultValue={userData.companyName}></input>
                  </div>
                </div>
                <div className={userData.VATNumber == null ? 'd-none' : 'form-row m-bot-10'}>
                  <div className="col">
                    <label htmlFor="VATNumber">Numer NIP</label>
                    <input
                      name="VATNumber"
                      id="VATNumber"
                      type="text"
                      className="form-control"
                      maxLength="10"
                      defaultValue={userData.VATNumber}></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-primary btn-block"
                      onClick={() => editUserData()}>
                      Zapisz zmiany
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="row pb-3 mt-3">
            <div className={blockUI ? 'position-absolute blockUISpinner' : ''} role="status"></div>
            <div className="col left">
              <div className="border-bottom border border-primary"></div>
              <div className="mt-3"></div>
              <div className="fs-2 fw-bold"> Usuwanie konta</div>
              <div className="mb-3"></div>
              <button
                type="button"
                className={userDelete ? 'd-none' : 'btn btn-primary'}
                onClick={() => deleteUserComfirmation()}>
                Usuń konto
              </button>
              <button
                type="button"
                className={userDelete ? 'btn btn-danger' : 'd-none'}
                onClick={() => deleteUser()}>
                Na pewno?
              </button>
              <div className={userDelete ? 'red' : 'd-none'}>
                UWAGA!!! Tej akcji nie można cofnąć!
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Settings;
