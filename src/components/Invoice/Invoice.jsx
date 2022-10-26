import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import newAlert from '../../features/newAlert';
import InvoiceItemsList from './InvoiceItemsList/InvoiceItemsList';
import InvoiceDetailsList from './InvoiceDetailsList/InvoiceDetailsList';
import './Invoice.css';
import MoveBack from '../../features/additionalComponents/MoveBack/MoveBack';

const Invoice = (props) => {
  const isLogged = useSelector((state) => state.session.isLogged);

  const [invoiceData, setInvoiceData] = useState({});
  const [isLoadingInvoiceData, setIsLoadingInvoiceData] = useState(true);
  const [error, setError] = useState(null);
  const [blockUI, setBlockUI] = useState(false);
  let { invoiceID } = useParams();

  const handleCancelClick = async (invoiceID) => {
    try {
      setBlockUI(true);
      const url = `${process.env.REACT_APP_API}/invoice/${invoiceID}`;
      const response = await fetch(url, { method: 'put', credentials: 'include' });
      const json = await response.json();
      if (response.ok) {
        newAlert('primary', 'Anulowane!', 'Zamówienie zostało anulowane.');
        fetchInvoiceData();
      } else {
        setError(json.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchInvoiceData = useCallback(async () => {
    try {
      setBlockUI(true);
      const url = `${process.env.REACT_APP_API}/invoice/${invoiceID}`;
      const response = await fetch(url, { method: 'get', credentials: 'include' });
      const json = await response.json();

      setInvoiceData(json.data[0]);
      setIsLoadingInvoiceData(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setBlockUI(false);
    }
  }, []);

  useEffect(() => {
    if (isLogged) fetchInvoiceData();

    return () => {
      if (isLogged === false) {
        newAlert('danger', 'Zaloguj się!', 'Zaloguj się, żeby zobaczyć faktury.');
      }
    };
  }, [invoiceID, isLogged, fetchInvoiceData]);

  if (isLogged === false) {
    return <Redirect to="/login" />;
  } else if (isLoadingInvoiceData || error) {
    return (
      <div className="container options shadow-sm bg-white rounded">
        <div className="text-center pb-3">
          <span className="fs-1 fw-bold">Szczegóły zamowienia</span>
        </div>
        {isLoadingInvoiceData && (
          <div className="d-flex justify-content-center pt-5 pb-5">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {error && (
          <div className="d-flex justify-content-center pt-5 pb-5">
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <>
        <div className="container options shadow-sm bg-white rounded">
          <div className={blockUI ? 'blockedUIScreen text-center row position-relative' : ''}>
            <div
              className={blockUI ? 'spinner-border position-absolute blockUISpinner' : ''}
              role="status"></div>
            <div className="text-center pb-3">
              <span className="fs-1 fw-bold">Szczegóły zamowienia</span>
            </div>
            <InvoiceDetailsList invoiceData={invoiceData} handleCancelClick={handleCancelClick} />
            <InvoiceItemsList invoiceData={invoiceData} />
          </div>
        </div>
        <MoveBack moveBackText="Wróć do profilu" moveBackURL="/profile/orders" />
      </>
    );
  }
};
export default Invoice;
