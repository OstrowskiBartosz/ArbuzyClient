import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { MockProviders } from '../../../setupTests';
import ListedProducts from './ListedProducts';
const resMocks = require('../../../mocks/resMocks.js');

describe('ListedProducts subcomponent tests', () => {
  it('should load 6 discounted product images', async () => {
    const discountProducts = resMocks.frontPageProducts.discountProducts;
    render(
      <MockProviders>
        <ListedProducts
          listedID={'dailyDiscountProducts'}
          products={discountProducts}
          isLoadingData={false}
          topSold={false}
          error={null}
        />
      </MockProviders>
    );

    const elements = await screen.findAllByRole('img');
    expect(elements.length).toEqual(6);
  });

  it('should load 6 % signs as all products have discount tag on top of image', async () => {
    const discountProducts = resMocks.frontPageProducts.discountProducts;
    render(
      <MockProviders>
        <ListedProducts
          listedID={'dailyDiscountProducts'}
          products={discountProducts}
          isLoadingData={false}
          topSold={false}
          error={null}
        />
      </MockProviders>
    );

    const elements = await screen.findAllByText(/%/);
    expect(elements.length).toEqual(6);
  });

  it('should show horizontal arrow scroll right', async () => {
    const discountProducts = resMocks.frontPageProducts.discountProducts;
    render(
      <MockProviders>
        <ListedProducts
          listedID={'dailyDiscountProducts'}
          products={discountProducts}
          isLoadingData={false}
          topSold={false}
          error={null}
        />
      </MockProviders>
    );

    const element = await screen.findByTitle(/Horizontal Scroll Right/);
    expect(element).toBeInTheDocument();
  });

  it('should not show horizontal arrow scroll left', async () => {
    const discountProducts = resMocks.frontPageProducts.discountProducts;
    render(
      <MockProviders>
        <ListedProducts
          listedID={'dailyDiscountProducts'}
          products={discountProducts}
          isLoadingData={false}
          topSold={false}
          error={null}
        />
      </MockProviders>
    );

    const element = screen.queryByTitle(/Horizontal Scroll Left/);
    expect(element).not.toBeInTheDocument();
  });

  it('should show horizontal arrow scroll left after clicking once on horizontal scroll right to scroll', async () => {
    const discountProducts = resMocks.frontPageProducts.discountProducts;
    render(
      <MockProviders>
        <ListedProducts
          listedID={'dailyDiscountProducts'}
          products={discountProducts}
          isLoadingData={false}
          topSold={false}
          error={null}
        />
      </MockProviders>
    );

    fireEvent.click(await screen.findByTitle(/Horizontal Scroll Right/));

    const element = await screen.findByTitle(/Horizontal Scroll Left/);
    expect(element).toBeInTheDocument();
  });
});
