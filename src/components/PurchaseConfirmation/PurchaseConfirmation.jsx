import React from 'react';
import { useState, useEffect } from 'react';
import { Redirect, Link, withRouter, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import newAlert from '../../features/newAlert';
import '../../App.css';

const PurchaseConfirmation = (props) => {
  const { invoiceID } = useParams();
  const isLogged = useSelector((state) => state.session.isLogged);

  useEffect(() => {
    if (isLogged) newAlert('primary', 'Zakupione!', 'Produkty zostały kupione.');

    return () => {
      if (isLogged === false) {
        newAlert(
          'danger',
          'Zaloguj się!',
          'Zaloguj się, żeby zobaczyć swoje potwierdzenie koszyka.'
        );
      }
    };
  }, [isLogged]);

  if (isLogged === false) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div className="container-fluid">
        <div className="row navbar-padding">
          <div className="col-3"></div>
          <div className="col-6 mt-5 componentBackgroundColor mt-3 mb-3 shadow p-3 bg-white rounded">
            <div className="row">
              <div className="col-12">
                <div className="pb-5 text-center">
                  <h1>Przedmioty zostały kupione!</h1>
                </div>
                <div className="row pt-5 pb-5">
                  <div className="col-1"></div>
                  <div className="col-5">
                    <Link className="btn btn-primary" to="/">
                      <button className="btn btn-lg btn-block mt-1 pt-1 btn-primary">
                        <i className="fas fa-chevron-left"></i>
                        <span> Powrót do strony głównej</span>
                      </button>
                    </Link>
                  </div>
                  <div className="col-5">
                    <Link className="btn btn-primary" to={`/invoice/${invoiceID}`}>
                      <button className="btn btn-lg btn-block mt-1 pt-1 btn-primary">
                        <span> Przejdź do faktury </span>
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </Link>
                  </div>
                  <div className="col-1"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    );
  }
};

export default withRouter(PurchaseConfirmation);
