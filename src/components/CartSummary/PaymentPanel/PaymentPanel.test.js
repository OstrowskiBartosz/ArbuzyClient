import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockProviders } from '../../../setupTests';
import PaymentPanel from './PaymentPanel';
const resMocks = require('../../../mocks/resMocks.js');

describe('PaymentPanel subcomponent tests', () => {
  it('should not show error message', async () => {
    render(
      <MockProviders>
        <PaymentPanel
          paymentMethod={null}
          setPaymenthMethod={() => {}}
          showWarning={false}
          setShowWarning={() => {}}
        />
      </MockProviders>
    );

    await waitFor(() => {
      const errorMessage = screen.queryByText(/Metoda płatności nie została wybrana/);
      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  it('should show error message', async () => {
    render(
      <MockProviders>
        <PaymentPanel
          paymentMethod={null}
          setPaymenthMethod={() => {}}
          showWarning={true}
          setShowWarning={() => {}}
        />
      </MockProviders>
    );

    await waitFor(() => {
      const errorMessage = screen.queryByText(/Metoda płatności nie została wybrana/);
      expect(errorMessage).toBeInTheDocument();
    });
  });
  it('should show chosen payment method with proper class', async () => {
    render(
      <MockProviders>
        <PaymentPanel
          paymentMethod={'Credit card'}
          setPaymenthMethod={() => {}}
          setShowWarning={() => {}}
        />
      </MockProviders>
    );

    fireEvent.click(await screen.findByText(/Karta kredytowa/));
    const clickedMethod = await screen.findByText(/Karta kredytowa/);
    expect(clickedMethod.parentElement.classList.contains('payment-block-active')).toBe(true);
  });

  it('should show not chosen methods as grey', async () => {
    render(
      <MockProviders>
        <PaymentPanel
          paymentMethod={'Cash'}
          setPaymenthMethod={() => {}}
          setShowWarning={() => {}}
        />
      </MockProviders>
    );

    fireEvent.click(await screen.findByText(/Karta kredytowa/));
    const clickedMethod = await screen.findByText(/Karta kredytowa/);
    expect(clickedMethod.parentElement.classList.contains('payment-block-active')).toBe(false);
  });
});
