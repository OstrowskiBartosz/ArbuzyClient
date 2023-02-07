import { fireEvent, render, screen } from '@testing-library/react';
import { MockProviders } from '../../../setupTests';
import CartItem from './CartItem';
const resMocks = require('../../../mocks/resMocks.js');

describe('CartItem component tests', () => {
  it('should properly display manufacturer together with product name', async () => {
    const cartItem = resMocks.cartItems3Items.cartItemsData[0];
    render(
      <MockProviders>
        <CartItem
          cartItem={cartItem}
          blockUI={false}
          setError={null}
          fetchCartData={() => {}}
          setBlockUI={() => {}}
        />
      </MockProviders>
    );

    expect(await screen.findByText(/Gigabyte B660M DS3H DDR4/)).toBeInTheDocument();
  });
  it('should move to proper product name after clicking product name', async () => {
    const cartItem = resMocks.cartItems3Items.cartItemsData[0];
    render(
      <MockProviders>
        <CartItem
          cartItem={cartItem}
          blockUI={false}
          setError={null}
          fetchCartData={() => {}}
          setBlockUI={() => {}}
        />
      </MockProviders>
    );

    const productName = screen.getByRole('link');
    expect(productName).toHaveAttribute('href', '/product/58');
  });
  it('should show delete from cart icon', async () => {
    const cartItem = resMocks.cartItems3Items.cartItemsData[0];
    render(
      <MockProviders>
        <CartItem
          cartItem={cartItem}
          blockUI={false}
          setError={null}
          fetchCartData={() => {}}
          setBlockUI={() => {}}
        />
      </MockProviders>
    );

    const deleteIcon = await screen.findByTitle(/Delete product from cart/);
    expect(deleteIcon).toBeInTheDocument();
  });
  it('should show increase quantity icon', async () => {
    const cartItem = resMocks.cartItems3Items.cartItemsData[0];
    render(
      <MockProviders>
        <CartItem
          cartItem={cartItem}
          blockUI={false}
          setError={null}
          fetchCartData={() => {}}
          setBlockUI={() => {}}
        />
      </MockProviders>
    );

    const increaseIcon = await screen.findByTitle(/Increase quantity/);
    expect(increaseIcon).toBeInTheDocument();
  });
  it('should show decrease quantity icon', async () => {
    const cartItem = resMocks.cartItems3Items.cartItemsData[0];
    render(
      <MockProviders>
        <CartItem
          cartItem={cartItem}
          blockUI={false}
          setError={null}
          fetchCartData={() => {}}
          setBlockUI={() => {}}
        />
      </MockProviders>
    );

    const decreaseIcon = await screen.findByTitle(/Decrease quantity/);
    expect(decreaseIcon).toBeInTheDocument();
  });
  it('should show show quantity of product', async () => {
    const cartItem = resMocks.cartItems3Items.cartItemsData[0];
    render(
      <MockProviders>
        <CartItem
          cartItem={cartItem}
          blockUI={false}
          setError={null}
          fetchCartData={() => {}}
          setBlockUI={() => {}}
        />
      </MockProviders>
    );

    const quantity = await screen.findByDisplayValue(cartItem.quantity);
    expect(quantity).toBeInTheDocument();
  });
  it('should show correct total price of product', async () => {
    const cartItem = resMocks.cartItems3Items.cartItemsData[0];
    const priceSum = String(
      (cartItem.Product.Prices[0].grossPrice * cartItem.quantity).toFixed(2)
    ).replace('.', ',');

    render(
      <MockProviders>
        <CartItem
          cartItem={cartItem}
          blockUI={false}
          setError={null}
          fetchCartData={() => {}}
          setBlockUI={() => {}}
        />
      </MockProviders>
    );

    const totalPrice = await screen.findByText(`${priceSum} zł`);
    expect(totalPrice).toBeInTheDocument();
  });
});
