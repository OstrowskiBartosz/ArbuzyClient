import React from 'react';
import { Link } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import {
  StyledTableCell,
  StyledTableRow,
  tableCellStyle
} from '../../../features/materialStyles/table';

const InvoiceData = ({ invoiceData }) => {
  return (
    <div className="container-fluid p-1">
      <div className="row">
        <span className="fs-2 fw-bold">Lista produktów</span>
        <div className="col mb-2 mt-4">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <StyledTableRow>
                  <TableCell sx={tableCellStyle}>Nazwa produktu</TableCell>
                  <StyledTableCell>Kategoria</StyledTableCell>
                  <StyledTableCell>Producent</StyledTableCell>
                  <StyledTableCell>Cena Netto</StyledTableCell>
                  <StyledTableCell>Cena Brutto</StyledTableCell>
                  <StyledTableCell>Ilość</StyledTableCell>
                  <StyledTableCell>Wartość</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {invoiceData.InvoiceItems.map((invoiceItem, index) => (
                  <StyledTableRow key={index}>
                    <TableCell sx={{ fontWeight: 'bold' }} component="th" scope="row">
                      <Link to={`/product/${invoiceItem.Product.productID}`}>
                        {invoiceItem.Product.Manufacturer.manufacturerName}{' '}
                        {invoiceItem.Product.productName}
                      </Link>
                    </TableCell>
                    <StyledTableCell>{invoiceItem.Product.Category.categoryName}</StyledTableCell>
                    <StyledTableCell>
                      {invoiceItem.Product.Manufacturer.manufacturerName}
                    </StyledTableCell>
                    <StyledTableCell>
                      {invoiceItem.netPrice.toLocaleString('pl-PL', {
                        minimumFractionDigits: 2
                      })}{' '}
                      zł
                    </StyledTableCell>
                    <StyledTableCell>
                      {invoiceItem.grossPrice.toLocaleString('pl-PL', {
                        minimumFractionDigits: 2
                      })}{' '}
                      zł
                    </StyledTableCell>
                    <StyledTableCell>{invoiceItem.quantity}</StyledTableCell>
                    <StyledTableCell>
                      {(invoiceItem.grossPrice * invoiceItem.quantity).toLocaleString('pl-PL', {
                        minimumFractionDigits: 2
                      })}{' '}
                      zł
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="row">
        <div className="col fs-4 fw-bold text-right">
          Wartość zamówienia:{' '}
          {invoiceData.grossPrice.toLocaleString('pl-PL', {
            minimumFractionDigits: 2
          })}{' '}
          zł
        </div>
      </div>
      <div className="border-bottom border border-primary"></div>
    </div>
  );
};

export default InvoiceData;
