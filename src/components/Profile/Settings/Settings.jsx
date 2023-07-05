import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sessionChange } from '../../../store/storeSlices/sessionSlice.js';
import { updateCartItems } from '../../../store/storeSlices/cartItemsSlice';
import newAlert from '../../../features/newAlert';
import { putData, deleteData } from '../../../features/sharableMethods/httpRequests';

const getUserFormData = async () => {
  let myForm = document.getElementById('updateForm');
  let formData = new FormData(myForm);
  let object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  return object;
};

const Settings = ({ isLoadingUser, userData, fetchUserData, setError }) => {
  const [showUserEdit, setShowUserEdit] = useState(false);
  const [showUserDelete, setShowUserDelete] = useState(false);
  const [blockUI, setBlockUI] = useState(false);
  const dispatch = useDispatch();

  const showUserEditForm = () => setShowUserEdit(!showUserEdit);

  const editUserData = async () => {
    try {
      setBlockUI(true);
      const userFormData = await getUserFormData();
      const request = await putData('user', userFormData);
      setShowUserEdit(!showUserEdit);
      if (request.ok) {
        fetchUserData();
        newAlert('primary', 'Zmieniono dane', 'Dane użytkownika zostały zmienione.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBlockUI(false);
    }
  };

  const deleteUserComfirmation = () => {
    setShowUserDelete(true);
  };

  const deleteUser = () => {
    try {
      setBlockUI(true);
      const request = deleteData('user');
      if (request.ok) {
        newAlert('danger', 'Użytkownik usuniety', 'Użytkownik został usunięty.');
        dispatch(sessionChange(false));
        dispatch(updateCartItems(true));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBlockUI(false);
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
          <div className="fs-2 fw-bold">Dane konta</div>
          <div className="mb-3"></div>
          <div className={blockUI ? 'blockedUIScreen text-center row position-relative' : ' row'}>
            <div className="col left">
              <div>
                <span>Unikalna nazwa użytkownika</span>
                <div className={'m-left-10 fw-bold fs-4'}>{userData?.login}</div>
              </div>
              <div>
                <span>Adres email konta</span>
                <div className={'m-left-10 fw-bold fs-4'}>
                  {String(userData?.email).slice(0, 4)}
                  {'*'.repeat(String(userData?.email).length - 8)}
                  {String(userData?.email).slice(-4)}
                </div>
              </div>
            </div>
          </div>

          <div className="border-bottom border border-primary mt-3"></div>
          <div className="mt-3"></div>
          <div className="fs-2 fw-bold">Dane użytkownika</div>
          <div className="mb-3"></div>
          <div className={blockUI ? 'blockedUIScreen text-center row position-relative' : ' row'}>
            {showUserEdit ? (
              <div className="col left">
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
                        defaultValue={userData?.firstName}></input>
                    </div>
                    <div className="col">
                      <label htmlFor="lastName">Nazwisko</label>
                      <input
                        name="lastName"
                        id="lastName"
                        type="text"
                        className="form-control"
                        maxLength="30"
                        defaultValue={userData?.lastName}></input>
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
                        defaultValue={userData?.streetName}></input>
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
                        defaultValue={userData?.ZIPCode}></input>
                    </div>
                    <div className="col">
                      <label htmlFor="cityName">Miasto</label>
                      <input
                        name="cityName"
                        id="cityName"
                        type="text"
                        className="form-control"
                        maxLength="50"
                        defaultValue={userData?.cityName}></input>
                    </div>
                  </div>
                  <div className={userData?.numer_nip == null ? 'd-none' : 'form-row m-bot-10'}>
                    <div className="col">
                      <label htmlFor="companyName">Nazwa firmy</label>
                      <input
                        name="companyName"
                        id="companyName"
                        type="text"
                        className="form-control"
                        maxLength="100"
                        defaultValue={userData?.companyName}></input>
                    </div>
                  </div>
                  <div className={userData?.VATNumber == null ? 'd-none' : 'form-row m-bot-10'}>
                    <div className="col">
                      <label htmlFor="VATNumber">Numer NIP</label>
                      <input
                        name="VATNumber"
                        id="VATNumber"
                        type="text"
                        className="form-control"
                        maxLength="10"
                        defaultValue={userData?.VATNumber}></input>
                    </div>
                  </div>
                  <div className="form-row mt-3">
                    <div className="col">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => editUserData()}>
                        Zapisz zmiany
                      </button>

                      <button
                        type="button"
                        className="btn btn-danger ml-3"
                        onClick={() => setShowUserEdit(false)}>
                        Anuluj zmiany
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="col left">
                <div>
                  <span>Imię i nazwisko</span>
                  <div className={'m-left-10 fw-bold fs-4'}>
                    {userData?.firstName} {userData?.lastName}
                  </div>
                </div>
                <div className="mt-2">
                  <span>Ulica, numer domu/mieszkania</span>
                  <div className="m-left-10  fw-bold fs-4">{userData?.streetName}</div>
                </div>
                <div className="mt-2">
                  <span>kod pocztowy</span>
                  <div className="m-left-10  fw-bold fs-4">{userData?.ZIPCode}</div>
                </div>
                <div className="mt-2">
                  <span>Miasto zamieszkania</span>
                  <div className="m-left-10  fw-bold fs-4">{userData?.cityName}</div>
                </div>
                <div className="mt-2">
                  <span>Kraj zamieszkania</span>
                  <div className="m-left-10  fw-bold fs-4">Polska</div>
                </div>
                {userData?.companyName === null ? null : (
                  <div className="mt-2">
                    <span>Nazwa firmy</span>
                    <div className="m-left-10  fw-bold fs-4">{userData?.companyName}</div>
                  </div>
                )}
                {userData?.VATNumber == null ? null : (
                  <div className="mt-2">
                    <span>Numer Nip</span>
                    <div className="m-left-10  fw-bold fs-4">{userData?.VATNumber}</div>
                  </div>
                )}
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={() => showUserEditForm()}>
                  Edytuj dane
                </button>
              </div>
            )}
          </div>
          <div className="row pb-3 mt-3">
            <div className={blockUI ? 'position-absolute blockUISpinner' : ''} role="status"></div>
            <div className="col left">
              <div className="border-bottom border border-primary"></div>
              <div className="mt-3"></div>
              <div className="fs-2 fw-bold"> Usuwanie konta</div>
              <div className="mb-3"></div>
              {showUserDelete ? (
                <>
                  <button type="button" className="btn btn-danger" onClick={() => deleteUser()}>
                    Na pewno?
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning ml-3"
                    onClick={() => setShowUserDelete(false)()}>
                    Anuluj
                  </button>
                  <div className="red">UWAGA!!! Tej akcji nie można cofnąć!</div>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => deleteUserComfirmation()}>
                    Usuń konto
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Settings;
