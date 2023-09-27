import React from 'react';
import { Link } from 'react-router-dom';

const TotalPrice = ({ blockUI, TotalPrice }) => {
  return (
    <div className="row">
      <div className="col-xl-6"></div>
      <div className="col-xl-6 mt-2 componentBackgroundColor mt-3 mb-3 shadow p-3 bg-white rounded">
        <div className={blockUI ? 'blockedUIScreen text-center' : ''}>
          <div className="row pb-2">
            <div className="col-6">
              <span className="fs-4 fw-bold text-left">łączna cena:</span>
            </div>
            <div className="col-6">
              <span id="totalPrice" className="fw-bold fs-4 pr-3 text-right">
                {String(parseFloat(String(TotalPrice)).toFixed(2)).replace('.', ',')} zł
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Link className="btn btn-lg btn-block mt-1 pt-1 btn-primary" to={'/cartsummary'}>
                Przejdz do podsumowania <i className="fas fa-sign-out-alt"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalPrice;
