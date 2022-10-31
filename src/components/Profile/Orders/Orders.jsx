import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { paymentMethod, status } from '../../../features/DBTranslation';
import {
  StyledTableCell,
  StyledTableRow,
  statusColors
} from '../../../features/materialStyles/table';
import '../Profile.css';

const Orders = ({ invoiceData, isLoadingInvoice }) => {
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
                      <StyledTableCell>Sposób płatności</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
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
                        <StyledTableCell> {paymentMethod[invoice.paymentMethod]}</StyledTableCell>
                        <StyledTableCell sx={statusColors[invoice.status]}>
                          {status[invoice.status]}
                        </StyledTableCell>
                        <StyledTableCell>
                          <Link to={`/invoice/${invoice.invoiceID}`}>
                            <button className="btn btn-primary">Szczegóły</button>
                          </Link>
                        </StyledTableCell>
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
    );
  }
};

export default Orders;
