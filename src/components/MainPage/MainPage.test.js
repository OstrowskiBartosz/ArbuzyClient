import { rest } from 'msw';
import { server } from '../../mocks/server';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { MockProviders } from '../../setupTests';
import MainPage from './MainPage';

describe('MainPage component tests', () => {
  it('should render', async () => {
    render(
      <MockProviders>
        <MainPage setSearchValueToSend={() => {}} />
      </MockProviders>
    );

    const spanElement = screen.getByText('Najczęściej Kupowane Produkty');
    expect(spanElement).toBeInTheDocument();
  });

  it('should handle server error', async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_API}/product/youMayLikeThisProducts`, (req, res, ctx) => {
        return res(ctx.status(400));
      }),
      rest.get(`${process.env.REACT_APP_API}/product/mostBoughtProducts`, (req, res, ctx) => {
        return res(ctx.status(400));
      }),
      rest.get(`${process.env.REACT_APP_API}/product/youMayLikeThisProducts`, (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );

    render(
      <MockProviders>
        <MainPage setSearchValueToSend={() => {}} />
      </MockProviders>
    );
    const errorElements = await screen.findAllByText(/Ooops/);
    expect(errorElements.length).toEqual(3);
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

  it('should refresh and load new promo and listed products after clicking refresh button', async () => {
    render(
      <MockProviders>
        <MainPage setSearchValueToSend={() => {}} />
      </MockProviders>
    );

    const refreshButton = screen.getByRole('button', { name: /refresh products button/i });
    await fireEvent.click(refreshButton);

    const loadedProductName = await screen.findByText('Blue 500 GB 2.5" SATA III (WD5000LPCX)');

    const elements = await screen.findAllByRole('img');
    expect(elements.length).toEqual(20);
  });
});
