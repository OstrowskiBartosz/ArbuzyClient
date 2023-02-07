import { render, screen } from '@testing-library/react';
import { MockProviders } from '../../../setupTests';
import Orders from './Orders';
const resMocks = require('../../../mocks/resMocks.js');

describe('Orders component tests', () => {
  it('should render Orders component', async () => {
    const profileInvoiceList = resMocks.profileInvoiceList;
    render(
      <MockProviders>
        <Orders invoiceData={profileInvoiceList} />
      </MockProviders>
    );

    const ordersHeading = screen.getByText(/Twoje zamówienia/);

    expect(ordersHeading).toBeInTheDocument();
  });
  it('should render all available orders', async () => {
    const profileInvoiceList = resMocks.profileInvoiceList;
    render(
      <MockProviders>
        <Orders invoiceData={profileInvoiceList} />
      </MockProviders>
    );

    const ordersCount = await (await screen.findAllByText(/Szczegóły/)).length;

    expect(ordersCount).toEqual(1);
  });
});
