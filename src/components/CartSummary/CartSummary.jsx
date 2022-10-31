import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartItems } from '../../store/storeSlices/cartItemsSlice';
import DeliveryTable from './DeliveryTable/DeliveryTable';
import ProductTable from './ProductTable/ProductTable';
import PaymentPanel from './PaymentPanel/PaymentPanel';
import newAlert from '../../features/newAlert';
import MoveBack from '../../features/additionalComponents/MoveBack/MoveBack';

const CartSummary = (props) => {
  const [userData, setUserData] = useState(null);
  const [cartData, setCartData] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymenthMethod] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  const isLogged = useSelector((state) => state.session.isLogged);
  const dispatch = useDispatch();
  let history = useHistory();

  const handleBuyClick = async () => {
    try {
      if (!paymentMethod) {
        setShowWarning(true);
        newAlert('danger', 'Płatność!', 'Wybierz sposób płatności');
        return;
      }
      const url = `${process.env.REACT_APP_API}/invoice`;
      const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify({ paymentMethod: paymentMethod }),
        credentials: 'include',
        headers: new Headers({ 'content-type': 'application/json' })
      });
      const json = await response.json();
      if (response.ok) {
        dispatch(updateCartItems(true));
        history.push(`/purchaseconfirmation/${json.data.invoiceID}`);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFetchData = useCallback(async () => {
    const fetchData = async (resource) => {
      try {
        const url = `${process.env.REACT_APP_API}/${resource}`;
        const response = await fetch(url, { method: 'get', credentials: 'include' });
        const json = await response.json();
        return json.data;
      } catch (err) {
        setError(err.message);
      }
    };

    const [userData, cartData] = await Promise.all([
      await fetchData('user'),
      await fetchData('cart')
    ]);

    if (cartData && userData) {
      setCartData(cartData);
      setUserData(userData);
      setIsLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (isLogged) handleFetchData();

    return () => {
      if (isLogged === false) {
        newAlert(
          'danger',
          'Zaloguj się!',
          'Zaloguj się, żeby zobaczyć swoje potwierdzenie koszyka.'
        );
      }
    };
  }, [isLogged, handleFetchData]);

  if (isLogged === false) {
    return <Redirect to="/login" />;
  } else if (isLoadingData || error) {
    return (
      <div className="container-fluid">
        <div className="row navbar-padding">
          <div className="col-xl-3"></div>
          <div className="col-xl-6 mt-5 componentBackgroundColor mt-3 mb-3 shadow-sm p-3 bg-white rounded">
            <div className="row">
              <div className="col-xl-12">
                <span className="p-2 m-2 fw-bold text-center">
                  <h2>PODSUMOWANIE</h2>
                </span>
              </div>
            </div>
            {isLoadingData && (
              <div>
                <div className="d-flex justify-content-center pt-5 pb-5">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div>
                <div className="d-flex justify-content-center pt-5 pb-5">
                  <span>{error}</span>
                </div>
              </div>
            )}
          </div>
          <div className="col-sm-1"></div>
        </div>
        <div className="row pt-4 pb-5 mb-5">
          <div className="col-lg-4"></div>
          <div className="col-lg-4 text-left">
            <Link className="btn btn-outline-secondary" to="/cart">
              <i className="fas fa-chevron-left"></i> Wróć do koszyka
            </Link>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    );
  } else {
    if (cartData && cartData.cartItemsData && cartData.cartItemsData.length > 0) {
      return (
        <>
          <div className="container options shadow-sm bg-white rounded">
            <div className="row">
              <div className="col-xl-12">
                <span className="p-2 m-2 fs-1 fw-bold text-center">Podsumowanie</span>
                <ProductTable cartData={cartData} />
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <DeliveryTable userData={userData} />
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <PaymentPanel
                  paymentMethod={paymentMethod}
                  setPaymenthMethod={setPaymenthMethod}
                  showWarning={showWarning}
                  setShowWarning={setShowWarning}
                />
              </div>
            </div>
            <div className="row pt-5">
              <div className="col-xl-3"></div>
              <div className="col-xl-6">
                <button
                  className="btn btn-lg btn-block mt-1 pt-1 btn-primary"
                  onClick={() => handleBuyClick()}>
                  Przejdz do płatności <i className="fas fa-sign-out-alt"></i>
                </button>
              </div>
              <div className="col-xl-3"></div>
            </div>
          </div>
          <MoveBack moveBackText="Wróć do koszyka" moveBackURL="/cart" />
        </>
      );
    } else {
      return (
        <div className="container-fluid">
          <div className="row navbar-padding">
            <div className="col-3"></div>
            <div className="col-6 mt-5 componentBackgroundColor mt-3 mb-3 shadow-sm p-3 bg-white rounded">
              <div className="row">
                <div className="col-12">
                  <h1>Koszyk jest pusty, dodaj coś do niego :-) </h1>
                </div>
              </div>
            </div>
            <div className="col-3"></div>
          </div>
          <div className="row pt-4 pb-5 mb-5">
            <div className="col-lg-4"></div>
            <div className="col-lg-4 text-left">
              <Link className="btn btn-outline-secondary" to="/cart">
                <i className="fas fa-chevron-left"></i> Wróć do koszyka
              </Link>
            </div>
            <div className="col-lg-4"></div>
          </div>
        </div>
      );
    }
  }
};

export default CartSummary;
