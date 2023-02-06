import React from 'react';
import './PaymentPanel.css';

const PaymentPanel = ({ paymentMethod, setPaymenthMethod, showWarning, setShowWarning }) => {
  const handlePaymentMethodClick = (event) => {
    setPaymenthMethod(event.currentTarget.id);
    setShowWarning(false);
  };

  return (
    <div className="mt-5">
      <div>
        <span className="fw-bold fs-4">Sposób płatności</span>
      </div>
      <div className="row pt-3">
        <div
          id="Credit card"
          className="col-xl-3 pb-4"
          onClick={(e) => handlePaymentMethodClick(e)}>
          <div
            className={
              paymentMethod === 'Credit card'
                ? 'payment-block-active d-inline fs-5 text-center'
                : showWarning
                ? 'payment-block d-inline fs-5 text-center warning'
                : 'payment-block d-inline fs-5 text-center'
            }>
            <span className="mr-3">
              <i className="fas fa-credit-card"></i>
            </span>
            <span className="fw-bold mr-3">Karta kredytowa</span>
            <span
              className={
                paymentMethod === 'Credit card' ? 'visible float-right' : 'invisible float-right'
              }>
              <i className="fa-solid fa-check"></i>
            </span>
          </div>
        </div>

        <div id="Cash" className="col-xl-3 pb-4" onClick={(e) => handlePaymentMethodClick(e)}>
          <div
            className={
              paymentMethod === 'Cash'
                ? 'payment-block-active d-inline fs-5 text-center'
                : showWarning
                ? 'payment-block d-inline fs-5 text-center warning'
                : 'payment-block d-inline fs-5 text-center'
            }>
            <span className="mr-3">
              <i className="fas fa-money-bill-wave"></i>
            </span>
            <span className="fw-bold mr-3">Gotówka</span>
            <span
              className={
                paymentMethod === 'Cash' ? 'visible float-right' : 'invisible float-right'
              }>
              <i className="fa-solid fa-check"></i>
            </span>
          </div>
        </div>

        <div id="PayU" className="col-xl-3 pb-4" onClick={(e) => handlePaymentMethodClick(e)}>
          <div
            className={
              paymentMethod === 'PayU'
                ? 'payment-block-active d-inline fs-5 text-center'
                : showWarning
                ? 'payment-block d-inline fs-5 text-center warning'
                : 'payment-block d-inline fs-5 text-center'
            }>
            <span className="mr-3">
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </span>
            <span className="fw-bold mr-3">PayU</span>
            <span
              className={
                paymentMethod === 'PayU' ? 'visible float-right' : 'invisible float-right'
              }>
              <i className="fa-solid fa-check"></i>
            </span>
          </div>
        </div>

        <div id="Paypal" className="col-xl-3 pb-4" onClick={(e) => handlePaymentMethodClick(e)}>
          <div
            className={
              paymentMethod === 'Paypal'
                ? 'payment-block-active d-inline fs-5 text-center'
                : showWarning
                ? 'payment-block d-inline fs-5 text-center warning'
                : 'payment-block d-inline fs-5 text-center'
            }>
            <span className="mr-3">
              <i className="fa fa-paypal"></i>
            </span>
            <span className="fw-bold mr-3">Paypal</span>
            <span
              className={
                paymentMethod === 'Paypal' ? 'visible float-right' : 'invisible float-right'
              }>
              <i className="fa-solid fa-check"></i>
            </span>
          </div>
        </div>
      </div>
      <div>
        {showWarning ? (
          <div
            className={
              showWarning ? 'visible text-center fw-bold fs-3 mt-5 text-danger' : 'invisible'
            }>
            <i className="fa-solid fa-triangle-exclamation"></i>
            <span className="ml-3">Metoda płatności nie została wybrana</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PaymentPanel;
