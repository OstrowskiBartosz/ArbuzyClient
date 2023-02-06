import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockProviders } from '../../../setupTests';
import ProductTable from './ProductTable';
const resMocks = require('../../../mocks/resMocks.js');

describe('ProductTable subcomponent tests', () => {
  it('should show list of products', async () => {
    const cartItems = resMocks.cartItems3Items;
    render(
      <MockProviders>
        <ProductTable cartData={cartItems} />
      </MockProviders>
    );
    await screen.findByText(/Gigabyte B660M DS3H DDR4/);
    const productElements = await screen.findAllByRole('link');
    expect(productElements.length).toBe(3);
  });

  it('should show move to product url after clicking product', async () => {
    const cartItems = resMocks.cartItems3Items;
    render(
      <MockProviders>
        <ProductTable cartData={cartItems} />
      </MockProviders>
    );
    const productElement = await screen.findByText(/Gigabyte B660M DS3H DDR4/);
    fireEvent.click(productElement);
    await waitFor(() => {
      expect(window.location.pathname).toBe('/product/58');
    });
  });
});
