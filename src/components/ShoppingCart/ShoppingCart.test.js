import { waitFor, fireEvent, render, screen } from '@testing-library/react';
import { MockProviders } from '../../setupTests';
import ShoppingCart from './ShoppingCart';
import { act } from 'react-dom/test-utils';
import store from '../../store/store';
import { sessionChange } from '../../store/storeSlices/sessionSlice';
const resMocks = require('../../mocks/resMocks.js');

describe('ShoppingCart component tests', () => {
  it('should increase quantity of the product', async () => {
    act(() => store.dispatch(sessionChange(true)));
    render(
      <MockProviders>
        <ShoppingCart />
      </MockProviders>
    );

    const plusIcon = await screen.findAllByTitle(/Increase quantity/);
    await fireEvent.click(plusIcon[0]);
    expect(await screen.findByDisplayValue(/4/)).toBeInTheDocument();
  });

  it('should decrease quantity of the product', async () => {
    act(() => store.dispatch(sessionChange(true)));
    render(
      <MockProviders>
        <ShoppingCart />
      </MockProviders>
    );

    const minusIcon = await screen.findAllByTitle(/Decrease quantity/);
    await fireEvent.click(minusIcon[0]);
    expect(await screen.findByDisplayValue(/2/)).toBeInTheDocument();
  });

  it('should remove first product from cart', async () => {
    act(() => store.dispatch(sessionChange(true)));
    render(
      <MockProviders>
        <ShoppingCart />
      </MockProviders>
    );

    const binIcon = await screen.findAllByTitle(/Delete product from cart/);
    await fireEvent.click(binIcon[0]);
    await waitFor(() => {
      expect(screen.queryByText(/Gigabyte B660M DS3H DDR4/)).not.toBeInTheDocument();
    });
  });

  it('should remove third product from cart', async () => {
    act(() => store.dispatch(sessionChange(true)));
    render(
      <MockProviders>
        <ShoppingCart />
      </MockProviders>
    );

    const binIcon = await screen.findAllByTitle(/Delete product from cart/);
    await fireEvent.click(binIcon[2]);

    await waitFor(() => {
      expect(screen.queryByText(/Intel Core i9-12900K, 3.2 GHz/)).not.toBeInTheDocument();
    });
  });

  it('should show empty cart message after manually deleting all products from cart', async () => {
    act(() => store.dispatch(sessionChange(true)));
    render(
      <MockProviders>
        <ShoppingCart />
      </MockProviders>
    );

    const binIcon = await screen.findAllByTitle(/Delete product from cart/);
    await fireEvent.click(binIcon[2]);
    await fireEvent.click(binIcon[1]);
    await fireEvent.click(binIcon[0]);

    expect(await screen.findByText(/Koszyk jest pusty, dodaj coś do niego/)).toBeInTheDocument();
  });

  it('should remove first product from cart', async () => {
    act(() => store.dispatch(sessionChange(true)));
    render(
      <MockProviders>
        <ShoppingCart />
      </MockProviders>
    );

    const binIcon = await screen.findByTitle(/Delete whole cart/);
    await fireEvent.click(binIcon);
    expect(await screen.findByText(/Koszyk jest pusty, dodaj coś do niego/)).toBeInTheDocument();
  });

  it('should show correct total price when deleting from cart', async () => {
    act(() => store.dispatch(sessionChange(true)));
    render(
      <MockProviders>
        <ShoppingCart />
      </MockProviders>
    );

    const binIcon = await screen.findAllByTitle(/Delete product from cart/);
    await fireEvent.click(binIcon[2]);

    await waitFor(() => {
      expect(screen.queryByText(/5004,99/)).toBeInTheDocument();
    });
  });
});
