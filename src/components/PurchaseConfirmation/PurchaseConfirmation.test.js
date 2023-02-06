import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockProviders } from '../../setupTests';
import PurchaseConfirmation from './PurchaseConfirmation';
import { MemoryRouter, Route } from 'react-router-dom';
const resMocks = require('../../mocks/resMocks.js');

describe('PurchaseConfirmation component tests', () => {
  it('should display move to main page button', async () => {
    render(
      <MockProviders>
        <MemoryRouter initialEntries={['/purchaseconfirmation/4']}>
          <Route path="/purchaseconfirmation/:invoiceID">
            <PurchaseConfirmation />
          </Route>
        </MemoryRouter>
      </MockProviders>
    );

    expect(await screen.findByText(/Powrót do strony głównej/)).toBeInTheDocument();
  });

  it('should display move to order button', async () => {
    render(
      <MockProviders>
        <MemoryRouter initialEntries={['/purchaseconfirmation/4']}>
          <Route path="/purchaseconfirmation/:invoiceID">
            <PurchaseConfirmation />
          </Route>
        </MemoryRouter>
      </MockProviders>
    );

    expect(await screen.findByText(/Przejdź do faktury/)).toBeInTheDocument();
  });

  it('should display move to order button with proper url to invoice 4', async () => {
    render(
      <MockProviders>
        <MemoryRouter initialEntries={['/purchaseconfirmation/4']}>
          <Route path="/purchaseconfirmation/:invoiceID">
            <PurchaseConfirmation />
          </Route>
        </MemoryRouter>
      </MockProviders>
    );

    const invoiceButton = screen.getByRole('button', { name: 'Przejdź do faktury' });
    expect(invoiceButton.parentElement).toHaveAttribute('href', '/invoice/4');
  });

  it('should display move to order button with url to main page', async () => {
    render(
      <MockProviders>
        <MemoryRouter initialEntries={['/purchaseconfirmation/4']}>
          <Route path="/purchaseconfirmation/:invoiceID">
            <PurchaseConfirmation />
          </Route>
        </MemoryRouter>
      </MockProviders>
    );

    const invoiceButton = screen.getByRole('button', { name: 'Powrót do strony głównej' });
    expect(invoiceButton.parentElement).toHaveAttribute('href', '/');
  });
});
