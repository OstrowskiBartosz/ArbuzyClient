import React from 'react';

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

const InvoiceDetails = ({ invoiceData, handleCancelClick }) => {
  return (
    <div className="container-fluid p-1 mb-4">
      <div className="row">
        <span className="fs-2 fw-bold">Dostawa i status</span>
        <div className="col mb-2 mt-4">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Nabywca</StyledTableCell>
                  <StyledTableCell>Nazwa ulicy i nr</StyledTableCell>
                  <StyledTableCell>Miasto i kod pocztowy</StyledTableCell>
                  <StyledTableCell>Typ rachunku</StyledTableCell>
                  <StyledTableCell>Data wystawienia</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  {invoiceData.status === 'W trakcie' && <StyledTableCell></StyledTableCell>}
                </StyledTableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>{invoiceData.name}</StyledTableCell>
                  <StyledTableCell>{invoiceData.streetName}</StyledTableCell>
                  <StyledTableCell>
                    {invoiceData.ZIPCode} {invoiceData.cityName}
                  </StyledTableCell>
                  <StyledTableCell>Faktura</StyledTableCell>
                  <StyledTableCell>
                    {new Intl.DateTimeFormat('pl-PL', {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(new Date(invoiceData.invoiceDate))}
                  </StyledTableCell>
                  <StyledTableCell sx={statusColors[invoiceData.status]} component="th" scope="row">
                    {invoiceData.status}
                  </StyledTableCell>
                  {invoiceData.status === 'W trakcie' && (
                    <StyledTableCell>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleCancelClick(invoiceData.invoiceID)}>
                        Anuluj
                      </button>
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
