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
    await screen.findByText(/Asus DRW-24D5MT\/BLK\/B\/AS/);
    const productElements = await screen.findAllByRole('link');
    expect(productElements.length).toBe(3);
  });

  it('should move to product url after clicking product', async () => {
    const cartItems = resMocks.cartItems3Items;
    render(
      <MockProviders>
        <ProductTable cartData={cartItems} />
      </MockProviders>
    );
    const productElement = await screen.findByText(/Asus DRW-24D5MT\/BLK\/B\/AS/);
    fireEvent.click(productElement);
    await waitFor(() => {
      expect(window.location.pathname).toBe('/product/52');
    });
  });

  it('should have original price crossed', async () => {
    const cartItems = resMocks.cartItems3Items;
    render(
      <MockProviders>
        <ProductTable cartData={cartItems} />
      </MockProviders>
    );
    const productElement = await screen.findByText(/174,84/);
    expect(productElement.classList.contains('text-decoration-line-through')).toBe(true);
  });

  it('should have proper total price of products', async () => {
    const cartItems = resMocks.cartItems3Items;
    render(
      <MockProviders>
        <ProductTable cartData={cartItems} />
      </MockProviders>
    );
    const productElement = await screen.findByText(/Cena całkowita: 1249,68 zł/);
    expect(productElement).toBeInTheDocument();
  });
});
