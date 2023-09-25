import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { MockProviders } from '../../../../setupTests';
import FrontPageProduct from './FrontPageProduct';
const resMocks = require('../../../../mocks/resMocks.js');

describe('FrontPageProduct subcomponent tests', () => {
  it('should load discounted product image', async () => {
    const discountProduct = resMocks.frontPageProducts.discountProducts[2];
    render(
      <MockProviders>
        <FrontPageProduct product={discountProduct} key={0} />
      </MockProviders>
    );

    const elements = await screen.findAllByRole('img');
    expect(elements.length).toEqual(1);
  });

  it('should show % sign as product have discount tag on top of image', async () => {
    const discountProduct = resMocks.frontPageProducts.discountProducts[2];
    render(
      <MockProviders>
        <FrontPageProduct product={discountProduct} key={0} />
      </MockProviders>
    );

    const elements = await screen.findAllByText(/-8%/);
    expect(elements.length).toEqual(1);
  });

  it('should show old price as crossed text', async () => {
    const discountProduct = resMocks.frontPageProducts.discountProducts[2];
    render(
      <MockProviders>
        <FrontPageProduct product={discountProduct} key={0} />
      </MockProviders>
    );

    const elementSpan = await screen.findByText(/224,8/);
    expect(elementSpan.classList.contains('crossedText')).toBe(true);
  });

  it('should move user to product page after clicking discounted product price tag', async () => {
    const discountProduct = resMocks.frontPageProducts.discountProducts[2];
    render(
      <MockProviders>
        <FrontPageProduct product={discountProduct} key={0} />
      </MockProviders>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText(/206,82/));
    });

    await waitFor(() => {
      expect(window.location.pathname + window.location.search).toBe(`/product/22`);
    });
  });

  it('should move user to product page after clicking discounted product price tag', async () => {
    const discountProduct = resMocks.frontPageProducts.discountProducts[2];
    render(
      <MockProviders>
        <FrontPageProduct product={discountProduct} key={0} />
      </MockProviders>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText(/SU900 256GB SATA3/));
    });

    await waitFor(() => {
      expect(window.location.pathname + window.location.search).toBe(`/product/22`);
    });
  });

  it('should move user to product page after clicking move to product page button', async () => {
    const discountProduct = resMocks.frontPageProducts.discountProducts[2];
    render(
      <MockProviders>
        <FrontPageProduct product={discountProduct} key={0} />
      </MockProviders>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByTitle(/move to product page/));
    });

    await waitFor(() => {
      expect(window.location.pathname + window.location.search).toBe(`/product/22`);
    });
  });
});
224.8;
