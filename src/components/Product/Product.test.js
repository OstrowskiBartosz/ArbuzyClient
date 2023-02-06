import { rest } from 'msw';
import { server } from '../../mocks/server';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockProviders } from '../../setupTests';
import Product from './Product';

import store from '../../store/store';
import { sessionChange } from '../../store/storeSlices/sessionSlice';

describe('Product component tests', () => {
  it('should render proper product based on url ID', async () => {
    render(
      <MockProviders>
        <MemoryRouter initialEntries={['/product/13']}>
          <Route path="/product/:productID">
            <Product />
          </Route>
        </MemoryRouter>
      </MockProviders>
    );

    const idElement = await screen.findByText(/Id produktu: 13/);
    expect(idElement).toBeInTheDocument();
  });

  it('should add product after clicking', async () => {
    render(
      <MockProviders>
        <MemoryRouter initialEntries={['/product/13']}>
          <Route path="/product/:productID">
            <Product />
          </Route>
        </MemoryRouter>
      </MockProviders>
    );

    const cartButton = await screen.findByText(/Dodaj do koszyka/);
    fireEvent.click(cartButton);

    expect(await screen.findByText(/Dodawanie.../)).toBeInTheDocument();
  });

  it('should add product and move to initial state', async () => {
    render(
      <MockProviders>
        <MemoryRouter initialEntries={['/product/13']}>
          <Route path="/product/:productID">
            <Product />
          </Route>
        </MemoryRouter>
      </MockProviders>
    );

    const cartButton = await screen.findByText(/Dodaj do koszyka/);
    fireEvent.click(cartButton);
    const addingButton = await screen.findByText(/Dodawanie.../);
    expect(cartButton).toBeInTheDocument();
  });

  it('should show limit if no more product is available', async () => {
    server.use(
      rest.post(`${process.env.REACT_APP_API}/cartItem`, (req, res, ctx) => {
        return res(ctx.json({ data: [], message: 'Quantity limit.' }));
      })
    );

    render(
      <MockProviders>
        <MemoryRouter initialEntries={['/product/13']}>
          <Route path="/product/:productID">
            <Product />
          </Route>
        </MemoryRouter>
      </MockProviders>
    );

    const cartButton = await screen.findByText(/Dodaj do koszyka/);
    fireEvent.click(cartButton);
    const limitButton = await screen.findByText(/Limit w koszyku/);
    expect(limitButton).toBeInTheDocument();
  });

  it('should redirect to search category after clicking category', async () => {
    const setSearchValueToSend = jest.fn();
    render(
      <MockProviders>
        <MemoryRouter initialEntries={['/product/13']}>
          <Route path="/product/:productID">
            <Product setSearchValueToSend={setSearchValueToSend} />
          </Route>
        </MemoryRouter>
      </MockProviders>
    );

    const redirectButton = await screen.findByRole('link', { name: 'Dyski HDD' });
    fireEvent.click(redirectButton);

    await waitFor(() => {
      expect(screen.queryByText(/Opis produktu/)).not.toBeInTheDocument();
    });
  });

  it('should redirect to search manufacturer after clicking manufacturer', async () => {
    const setSearchValueToSend = jest.fn();
    render(
      <MockProviders>
        <MemoryRouter initialEntries={['/product/13']}>
          <Route path="/product/:productID">
            <Product setSearchValueToSend={setSearchValueToSend} />
          </Route>
        </MemoryRouter>
      </MockProviders>
    );

    const redirectButton = await screen.findByRole('link', { name: 'Seagate' });
    fireEvent.click(redirectButton);
    await waitFor(() => {
      expect(screen.queryByText(/Opis produktu/)).not.toBeInTheDocument();
    });
  });

  it('should redirect to search product name after clicking product name', async () => {
    const setSearchValueToSend = jest.fn();
    render(
      <MockProviders>
        <MemoryRouter initialEntries={['/product/13']}>
          <Route path="/product/:productID">
            <Product setSearchValueToSend={setSearchValueToSend} />
          </Route>
        </MemoryRouter>
      </MockProviders>
    );

    const redirectButton = await screen.findByRole('link', {
      name: 'Barracuda Pro 1 TB 2.5" SATA III (ST1000LM049)'
    });
    fireEvent.click(redirectButton);
    await waitFor(() => {
      expect(screen.queryByText(/Opis produktu/)).not.toBeInTheDocument();
    });
  });

  it('should not show login instead of add to cart when user is not authorized', async () => {
    render(
      <MockProviders>
        <MemoryRouter initialEntries={['/product/13']}>
          <Route path="/product/:productID">
            <Product />
          </Route>
        </MemoryRouter>
      </MockProviders>
    );

    await waitFor(() => {
      const loginButton = screen.queryByText(/Zaloguj sie/);
      expect(loginButton).not.toBeInTheDocument();
    });
  });

  it('should show login instead of add to cart when user is not authorized', async () => {
    store.dispatch(sessionChange(false));

    render(
      <MockProviders>
        <MemoryRouter initialEntries={['/product/13']}>
          <Route path="/product/:productID">
            <Product />
          </Route>
        </MemoryRouter>
      </MockProviders>
    );

    const loginButton = await screen.findByText(/Zaloguj sie/);
    expect(loginButton).toBeInTheDocument();
  });
});
