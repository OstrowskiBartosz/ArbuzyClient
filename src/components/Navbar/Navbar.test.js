import { rest } from 'msw';
import { server } from '../../mocks/server';

import { render, screen, fireEvent } from '@testing-library/react';
import { MockProviders } from '../../setupTests';
import Navbar from './Navbar';

import { act } from 'react-dom/test-utils';
import store from '../../store/store';
import { sessionChange } from '../../store/storeSlices/sessionSlice';
window.scrollTo = jest.fn();

describe('CartSummary component tests', () => {
  it('should show 8 if there are 8 products in cart', async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_API}/cart/getItemsNumber`, (req, res, ctx) => {
        return res(ctx.json({ data: { numberOfProducts: 8 }, message: 'Cart found.' }));
      })
    );
    act(() => store.dispatch(sessionChange(true)));

    render(
      <MockProviders>
        <Navbar />
      </MockProviders>
    );

    expect(await screen.findByTitle('Number of products in cart')).toHaveTextContent('8');
  });

  it('should render PageFooter', async () => {
    render(
      <MockProviders>
        <Navbar />
      </MockProviders>
    );

    const spanElement = screen.getByText(/r b u z y . c o/);
    expect(spanElement).toBeInTheDocument();
  });

  it('should show input written by user', async () => {
    render(
      <MockProviders>
        <Navbar />
      </MockProviders>
    );

    const inputElement = screen.getByPlaceholderText(/Nazwa produktu.../);
    fireEvent.change(inputElement, { target: { value: 'Barracuda' } });
    expect(screen.getByDisplayValue(/Barracuda/)).toBeInTheDocument();
  });

  it('should move to search after clicking search button', async () => {
    render(
      <MockProviders>
        <Navbar />
      </MockProviders>
    );

    const inputElement = screen.getByPlaceholderText(/Nazwa produktu.../);
    fireEvent.change(inputElement, { target: { value: 'Barracuda' } });
    fireEvent.click(screen.getByText(/Wyszukaj/));

    expect(decodeURIComponent(window.location.pathname + window.location.search)).toBe(
      '/search?q=Barracuda&s=domyślne&l=10&p=1'
    );
  });

  it('should show login if logged out', async () => {
    act(() => store.dispatch(sessionChange(false)));
    render(
      <MockProviders>
        <Navbar />
      </MockProviders>
    );

    const spanElement = screen.getByText(/Zaloguj/);
    expect(spanElement).toBeInTheDocument();
  });

  it('should show logout if logged out', async () => {
    act(() => store.dispatch(sessionChange(true)));
    render(
      <MockProviders>
        <Navbar />
      </MockProviders>
    );

    const spanElement = screen.getByText(/Wyloguj/);
    expect(spanElement).toBeInTheDocument();
  });
});
