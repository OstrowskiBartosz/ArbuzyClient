import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import {
  StyledTableCell,
  StyledTableRow,
  statusColors
} from '../../../features/materialStyles/table';
import '../Profile.css';
import newAlert from '../../../features/newAlert';

const Orders = ({ invoiceData, isLoadingInvoice, setError, fetchInvoiceData }) => {
  const [blockUI, setBlockUI] = useState(false);

  const CancelButton = invoiceData.find((el) => el.status === 'W trakcie');

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
    } finally {
      setBlockUI(false);
    }
  };

  if (isLoadingInvoice) {
    return (
      <div className={'container settings'}>
        <div className="row">
          <div className="col mt-3 pb-3 text-center">
            <h1>Twoje zamówienia</h1>
          </div>
        </div>
        <div className="col-12 componentBackgroundColor shadow-sm p-3 bg-white rounded">
          <div className="d-flex justify-content-center pt-5 pb-5">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (invoiceData.length === 0) {
    return (
      <div className="container">
        <div className="row">
          <div className="col mt-3 pb-3 text-center">
            <h1>Twoje zamówienia</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10 componentBackgroundColor mb-3 shadow-sm p-3 bg-white rounded">
            <div className="row pt-5 pb-5">
              <div className="col-12 text-center">
                <h1>Brak faktur do wyświetlenia! Kup coś :-) </h1>
              </div>
            </div>
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container orders p-1">
        <div className={blockUI ? 'blockedUIScreen text-center row position-relative' : ''}>
          <div
            className={blockUI ? 'spinner-border position-absolute blockUISpinner' : ''}
            role="status"></div>
          <div className="row">
            <div className="col mt-3 pb-3">
              <div className="fs-1 fw-bold mb-5 text-center">Twoje zamówienia</div>
              {invoiceData !== undefined ? (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell>Data</StyledTableCell>
                        <StyledTableCell>Wartość netto</StyledTableCell>
                        <StyledTableCell>Wartość brutto</StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        {CancelButton && <StyledTableCell></StyledTableCell>}
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {invoiceData.map((invoice, index) => (
                        <StyledTableRow
                          key={index}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <StyledTableCell>
                            {new Intl.DateTimeFormat('pl-PL', {
                              year: 'numeric',
                              month: 'long',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            }).format(new Date(invoice.invoiceDate))}
                          </StyledTableCell>
                          <StyledTableCell>
                            {invoice.netPrice.toLocaleString('pl-PL', {
                              minimumFractionDigits: 2
                            })}{' '}
                            zł
                          </StyledTableCell>
                          <StyledTableCell>
                            {invoice.grossPrice.toLocaleString('pl-PL', {
                              minimumFractionDigits: 2
                            })}{' '}
                            zł
                          </StyledTableCell>
                          <StyledTableCell sx={statusColors[invoice.status]}>
                            {invoice.status}
                          </StyledTableCell>
                          <StyledTableCell>
                            <Link to={`/invoice/${invoice.invoiceID}`}>
                              <button className="btn btn-primary">Szczegóły</button>
                            </Link>
                          </StyledTableCell>
                          {CancelButton && (
                            <StyledTableCell>
                              {invoice.status === 'W trakcie' && (
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleCancelClick(invoice.invoiceID)}>
                                  Anuluj
                                </button>
                              )}
                            </StyledTableCell>
                          )}
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <div className="row">
                  <div className="col-12">
                    <h1>Brak zamówionych towarów, kup coś :-)</h1>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col"></div>
          </div>
          <div className="row">
            <div className="col"></div>
          </div>
        </div>
      </div>
    );
  }
};

export default Orders;
