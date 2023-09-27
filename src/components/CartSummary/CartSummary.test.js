import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockProviders } from '../../setupTests';
import CartSummary from './CartSummary';
const resMocks = require('../../mocks/resMocks.js');

describe('CartSummary component tests', () => {
  it('should render without crashing', async () => {
    render(
      <MockProviders>
        <CartSummary />
      </MockProviders>
    );

    expect(await screen.findByText(/Loading.../)).toBeInTheDocument();
  });
  it('should load data', async () => {
    render(
      <MockProviders>
        <CartSummary />
      </MockProviders>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../)).not.toBeInTheDocument();
    });
  });
  it('should show error after clicking move to payment without choosing payment method', async () => {
    render(
      <MockProviders>
        <CartSummary />
      </MockProviders>
    );

    const paymentButton = await screen.findByText(/Przejdz do płatności/);
    fireEvent.click(paymentButton);
    const errorMessage = await screen.findByText(/Metoda płatności nie została wybrana/);
    expect(errorMessage).toBeInTheDocument();
  });
  it('should not show error message without prior clicking move to payment', async () => {
    render(
      <MockProviders>
        <CartSummary />
      </MockProviders>
    );

    await screen.findByText(/Asus DRW-24D5MT\/BLK\/B\/AS/);
    await waitFor(() => {
      const errorMessage = screen.queryByText(/Metoda płatności nie została wybrana/);
      expect(errorMessage).not.toBeInTheDocument();
    });
  });
  it('should not show error message after clicking move to payment with payment method active', async () => {
    render(
      <MockProviders>
        <CartSummary />
      </MockProviders>
    );

    fireEvent.click(await screen.findByText(/Karta kredytowa/));
    fireEvent.click(await screen.findByText(/Przejdz do płatności/));
    await waitFor(() => {
      const errorMessage = screen.queryByText(/Metoda płatności nie została wybrana/);
      expect(errorMessage).not.toBeInTheDocument();
    });
  });
});
