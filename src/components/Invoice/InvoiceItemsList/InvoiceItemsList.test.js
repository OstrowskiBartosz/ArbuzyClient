import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockProviders } from '../../../setupTests';
import InvoiceItemsList from './InvoiceItemsList';
const resMocks = require('../../../mocks/resMocks.js');

describe('InvoiceItemsList subcomponent tests', () => {
  const invoiceData = resMocks.InvoiceItems3Items;
  it('should show all invoice items', async () => {
    render(
      <MockProviders>
        <InvoiceItemsList invoiceData={invoiceData} />
      </MockProviders>
    );

    const invoiceItems = await screen.findAllByRole('link');
    expect(invoiceItems.length).toBe(3);
  });
});
