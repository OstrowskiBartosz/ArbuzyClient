import React from 'react';
import { Redirect } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartItems } from '../../store/storeSlices/cartItemsSlice';
import MoveBack from '../../features/additionalComponents/MoveBack/MoveBack';
import newAlert from '../../features/newAlert';
import CartItem from './CartItem/CartItem';
import TotalPrice from './TotalPrice/TotalPrice';

import './ShoppingCart.css';

const ShoppingCart = (props) => {
  const [isLoadingCartData, setisLoadingCartData] = useState(true);
  const [cartData, setCartData] = useState({});
  const [error, setError] = useState(null);

  const [isEmpty, setIsEmpty] = useState(false);

  const [blockUI, setBlockUI] = useState(false);

  const isLogged = useSelector((state) => state.session.isLogged);
  const dispatch = useDispatch();

  const fetchCartData = useCallback(async () => {
    try {
      const url = `${process.env.REACT_APP_API}/cart`;
      const response = await fetch(url, { method: 'get', credentials: 'include' });
      const json = await response.json();
      if (json.data.cartItemsData.length === 0) setIsEmpty(true);
      setisLoadingCartData(false);
      setCartData(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setBlockUI(false);
    }
  }, []);

  const handleWholeCartTrashClick = async (cartID) => {
    try {
      setBlockUI(true);
      const url = `${process.env.REACT_APP_API}/cart/${cartID}`;
      const response = await fetch(url, { method: 'delete', credentials: 'include' });
      if (response.ok) {
        newAlert('danger', 'Usunięto koszyk', 'Cały koszyk został usunięty.');
        fetchCartData();
        dispatch(updateCartItems(true));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBlockUI(false);
    }
  };

  useEffect(() => {
    if (isLogged) fetchCartData();

    return () => {
      if (isLogged === false) {
        newAlert('danger', 'Zaloguj się!', 'Zaloguj się, żeby zobaczyć swój koszyk.');
      }
    };
  }, [isLogged, fetchCartData]);

  if (isLogged === false) {
    return <Redirect to="/login" />;
  } else if (isLoadingCartData || error) {
    return (
      <div className="container-fluid">
        <div className="row navbar-padding">
          <div className="col-sm-1"></div>
          <div className="col-sm-10">
            <div className="row">
              <div className="col-12 mt-5 componentBackgroundColor mt-3 mb-3 shadow p-3 bg-white rounded">
                <div className="row">
                  <div className="col-11">
                    <div className="font-weight-bold text-left">
                      <h3>Twój Koszyk</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 componentBackgroundColor shadow p-3 bg-white rounded">
                <div className="d-flex justify-content-center pt-5 pb-5">
                  {isLoadingCartData && (
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                  {error && (
                    <div id="error">
                      <span>{error}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    );
  } else {
    if (isEmpty === false) {
      return (
        <>
          <div className="container-fluid position-relative">
            <div className="row navbar-padding">
              <div className="col-sm-1"></div>
              <div className="col-sm-10">
                <div className="row">
                  <div className="col-12 mt-5 componentBackgroundColor mt-3 mb-3 shadow p-3 bg-white rounded">
                    <div className={blockUI ? 'blockedUIScreen text-center row' : 'row'}>
                      <div className="col-9 text-left">
                        <div className="font-weight-bold vertical-center text-left">
                          <span className="fs-3 fw-bold vertical-center text-left">
                            Twój Koszyk
                          </span>
                        </div>
                      </div>
                      <div className="col-2 ">
                        <span className="fs-6 fw-bold vertical-center text-center">Usuń</span>
                      </div>
                      <div className="col-1 align-text-center vertical-center align-right">
                        <span className="fs-6 fw-bold align-text-center vertical-center">
                          <i
                            className="fas fa-trash-alt cursor-pointer"
                            title="Delete whole cart"
                            onClick={() => handleWholeCartTrashClick(cartData.cartData.cartID)}
                            disabled={blockUI ? false : 'disabled'}></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={blockUI ? 'blockedUIScreen text-center' : ''}>
                  <div className="row hideLabels">
                    <div className="col-12 componentBackgroundColor shadow p-3 bg-white rounded">
                      <div className="row CartBorder pb-2">
                        <div className="col-2 p-0"></div>
                        <div className="col-4 align-text-center">
                          <div className="text-left fw-bold">Nazwa</div>
                        </div>
                        <div className="col-2 align-text-center">
                          <div className="text-left fw-bold">Cena</div>
                        </div>
                        <div className="col-1 align-text-center">
                          <div className=" align-left fw-bold">Ilość</div>
                        </div>
                        <div className="col-2 align-text-center">
                          <div className=" align-left fw-bold">Łączna cena</div>
                        </div>
                        <div className="col-1 align-text-center"></div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div
                      className={blockUI ? 'spinner-border position-absolute blockUISpinner' : ''}
                      role="status"></div>
                    {cartData.cartItemsData.map((cartItem) => (
                      <CartItem
                        key={cartItem.cartItemID}
                        cartItem={cartItem}
                        blockUI={blockUI}
                        setError={setError}
                        fetchCartData={fetchCartData}
                        setBlockUI={(bool) => setBlockUI(bool)}
                      />
                    ))}
                  </div>
                </div>
                <TotalPrice blockUI={blockUI} TotalPrice={cartData.cartData.totalPriceOfProducts} />
              </div>
              <div className="col-sm-1"></div>
            </div>
          </div>
          <MoveBack moveBackText="Wróć do strony głównej" moveBackURL="/" />
        </>
      );
    } else {
      return (
        <>
          <div className="container-fluid">
            <div className="row navbar-padding">
              <div className="col-sm-1"></div>
              <div className="col-sm-10">
                <div className="row">
                  <div className="col-12 mt-5 componentBackgroundColor mt-3 mb-3 shadow p-3 bg-white rounded">
                    <div className="row">
                      <div className="col-11">
                        <div className="font-weight-bold text-left">
                          <h3>Twój Koszyk</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-1"></div>
            </div>
            <div className="row">
              <div className="col-sm-1"></div>
              <div className="col-sm-10 componentBackgroundColor mb-3 shadow p-3 bg-white rounded">
                <div className="row pt-5 pb-5">
                  <div className="col-12 text-center">
                    <h1>Koszyk jest pusty, dodaj coś do niego :-) </h1>
                  </div>
                </div>
              </div>
              <div className="col-sm-1"></div>
            </div>
          </div>
          <MoveBack moveBackText="Wróć do strony głównej" moveBackURL="/" />
        </>
      );
    }
  }
};

export default ShoppingCart;
