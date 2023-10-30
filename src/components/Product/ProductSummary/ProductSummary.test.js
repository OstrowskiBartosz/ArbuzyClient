import { rest } from 'msw';
import { server } from '../../../mocks/server';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockProviders } from '../../../setupTests';
import ProductSummary from './ProductSummary';
const resMocks = require('../../../mocks/resMocks.js');

import store from '../../../store/store';
import { sessionChange } from '../../../store/storeSlices/sessionSlice';

describe('ProductSummary subcomponent tests', () => {
  it('should render proper product based on url ID', async () => {
    const productID_13 = resMocks.productID_13;
    const productID = productID_13.productID;
    render(
      <MockProviders>
        <ProductSummary
          productData={productID_13}
          productID={productID}
          blockUI={false}
          handleToCartClick={() => {}}
          productLimit={false}
          isLogged={true}
        />
      </MockProviders>
    );

    const idElement = await screen.findByText(/Id produktu: 13/);
    expect(idElement).toBeInTheDocument();
  });

  it('should show limit if no more product is available', async () => {
    const productID_13 = resMocks.productID_13;
    const productID = productID_13.productID;
    render(
      <MockProviders>
        <ProductSummary
          productData={productID_13}
          productID={productID}
          blockUI={false}
          handleToCartClick={() => {}}
          productLimit={true}
          isLogged={true}
        />
      </MockProviders>
    );

    const limitButton = await screen.findByText(/Limit w koszyku/);
    expect(limitButton).toBeInTheDocument();
  });

  it('should not show login button if user is authorized of add to cart when user is not authorized', async () => {
    const productID_13 = resMocks.productID_13;
    const productID = productID_13.productID;
    render(
      <MockProviders>
        <ProductSummary
          productData={productID_13}
          productID={productID}
          blockUI={false}
          handleToCartClick={() => {}}
          productLimit={true}
          isLogged={true}
        />
      </MockProviders>
    );

    await waitFor(() => {
      const loginButton = screen.queryByText(/Zaloguj sie/);
      expect(loginButton).not.toBeInTheDocument();
    });
  });

  it('should show login instead of add to cart when user is not authorized', async () => {
    const productID_13 = resMocks.productID_13;
    const productID = productID_13.productID;
    render(
      <MockProviders>
        <ProductSummary
          productData={productID_13}
          productID={productID}
          blockUI={false}
          handleToCartClick={() => {}}
          productLimit={true}
          isLogged={false}
        />
      </MockProviders>
    );

    const loginButton = await screen.findByText(/Zaloguj sie/);
    expect(loginButton).toBeInTheDocument();
  });
});
