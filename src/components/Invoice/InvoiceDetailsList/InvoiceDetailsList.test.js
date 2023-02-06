import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockProviders } from '../../../setupTests';
import InvoiceDetailsList from './InvoiceDetailsList';
const resMocks = require('../../../mocks/resMocks.js');

describe('InvoiceDetailsList subcomponent tests', () => {
  const invoiceData = resMocks.InvoiceItems3Items;
  const invoiceDataCancelled = JSON.parse(JSON.stringify(resMocks.InvoiceItems3Items));
  invoiceDataCancelled.status = 'Cancelled';

  it('should show Cancel button if status is Pending', async () => {
    render(
      <MockProviders>
        <InvoiceDetailsList invoiceData={invoiceData} handleCancelClick={() => {}} />
      </MockProviders>
    );

    const cancelButton = await screen.findByText(/Anuluj/);

    expect(cancelButton).toBeInTheDocument();
  });

  it('should show cancelled', async () => {
    render(
      <MockProviders>
        <InvoiceDetailsList invoiceData={invoiceDataCancelled} handleCancelClick={() => {}} />
      </MockProviders>
    );

    const cancelledElement = await screen.findByText(/Anulowany/);

    expect(cancelledElement).toBeInTheDocument();
  });

  it('should not show cancel button when status is not pending', async () => {
    render(
      <MockProviders>
        <InvoiceDetailsList invoiceData={invoiceDataCancelled} handleCancelClick={() => {}} />
      </MockProviders>
    );

    await waitFor(() => {
      const cancelButton = screen.queryByText(/Anuluj/);
      expect(cancelButton).not.toBeInTheDocument();
    });
  });
});
