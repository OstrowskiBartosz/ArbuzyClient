import { rest } from 'msw';
import { server } from '../../mocks/server';
import { render, screen, fireEvent, waitFor, findByText } from '@testing-library/react';
import { MockProviders } from '../../setupTests';
import MainPage from './MainPage';
const resMocks = require('../../mocks/resMocks.js');

import { act } from 'react-dom/test-utils';
import store from '../../store/store';
import { updateProducts } from '../../store/storeSlices/productsSlice';

describe('MainPage component tests', () => {
  it('should render', async () => {
    render(
      <MockProviders>
        <MainPage setSearchValueToSend={() => {}} />
      </MockProviders>
    );

    const spanElement = await screen.findByText('Kategorie Produktów');
    expect(spanElement).toBeInTheDocument();
  });
  it('should have category list', async () => {
    render(
      <MockProviders>
        <MainPage setSearchValueToSend={() => {}} />
      </MockProviders>
    );

    const spanElement = await screen.findByText(/Kategorie Produktów/);
    expect(spanElement).toBeInTheDocument();
  });
  it('should move to search results after click category name', async () => {
    render(
      <MockProviders>
        <MainPage
          setSearchValueToSend={() => {
            return '';
          }}
        />
      </MockProviders>
    );

    fireEvent.click(screen.getByText(/Karty graficzne/));
    await waitFor(() => {
      expect(window.location.pathname + window.location.search).toBe('/search?filterCategory=[3]');
    });
  });
  it('should refresh and load all new promo and listed products after clicking refresh button', async () => {
    render(
      <MockProviders>
        <MainPage setSearchValueToSend={() => {}} />
      </MockProviders>
    );

    const refreshButton = screen.getByRole('button', { name: /refresh products button/i });
    fireEvent.click(refreshButton);
    await screen.findByText(/Core i5-12600K, 3.7 GHz/);

    const elements = await screen.findAllByRole('img');
    expect(elements.length).toEqual(26);
  });

  it('should have discounted products list', async () => {
    render(
      <MockProviders>
        <MainPage setSearchValueToSend={() => {}} />
      </MockProviders>
    );

    const elements = await screen.findByText(/Dzisiaj przecenione produkty/);
    expect(elements).toBeInTheDocument();
  });

  it('should have most bought products list', async () => {
    render(
      <MockProviders>
        <MainPage setSearchValueToSend={() => {}} />
      </MockProviders>
    );

    const elements = await screen.findByText(/Najczęściej kupowane produkty/);
    expect(elements).toBeInTheDocument();
  });

  it('should have most bought category products list', async () => {
    render(
      <MockProviders>
        <MainPage setSearchValueToSend={() => {}} />
      </MockProviders>
    );

    const elements = await screen.findByText(/Najczęściej kupowana kategoria/);
    expect(elements).toBeInTheDocument();
  });

  it('should have you might like it products list', async () => {
    render(
      <MockProviders>
        <MainPage setSearchValueToSend={() => {}} />
      </MockProviders>
    );

    const elements = await screen.findByText(/Może Ci się spodobać/);
    expect(elements).toBeInTheDocument();
  });
  it('should handle server error', async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_API}/product/frontPageProducts`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    act(() =>
      store.dispatch(
        updateProducts({
          mostBoughtCategoryProducts: [],
          mostBoughtProducts: [],
          youMayLikeProducts: [],
          dailyPromoProduct: {},
          weeklyPromoProduct: {},
          dailyDiscountProducts: [],
          lastUpdate: new Date().getTime()
        })
      )
    );
    render(
      <MockProviders>
        <MainPage setSearchValueToSend={() => {}} />
      </MockProviders>
    );
    const errorElement = await screen.findByText(/Ooops/);
    expect(errorElement).toBeInTheDocument();
  });
});
