import { render, screen } from '@testing-library/react';
import { MockProviders } from '../../../setupTests';
import TotalPrice from './TotalPrice';
const resMocks = require('../../../mocks/resMocks.js');

describe('TotalPrice component tests', () => {
  it('should display total price of products', async () => {
    const { totalPriceOfProducts } = resMocks.cartItems3Items.cartData;
    const price = String(parseFloat(String(totalPriceOfProducts)).toFixed(2)).replace('.', ',');
    render(
      <MockProviders>
        <TotalPrice blockUI={() => {}} TotalPrice={totalPriceOfProducts} />
      </MockProviders>
    );

    console.log;
    expect(await screen.findByText(`${price} zł`)).toBeInTheDocument();
  });
  it('should display button with cartsummary url', async () => {
    const { totalPriceOfProducts } = resMocks.cartItems3Items.cartData;
    render(
      <MockProviders>
        <TotalPrice blockUI={() => {}} TotalPrice={totalPriceOfProducts} />
      </MockProviders>
    );

    const button = await screen.findByText(/Przejdz do podsumowania/);
    expect(button).toHaveAttribute('href', '/cartsummary');
  });
});
