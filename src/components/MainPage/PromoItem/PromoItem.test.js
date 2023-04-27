import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { MockProviders } from '../../../setupTests';
import PromoItem from './PromoItem';
const resMocks = require('../../../mocks/resMocks.js');

describe('MainPage component tests', () => {
  it('should show load product data', async () => {
    const productDataWeekly = resMocks.productDataWeekly;
    render(
      <MockProviders>
        <PromoItem productData={productDataWeekly} promoType={'Weekly'} />
      </MockProviders>
    );

    const spanElement = await screen.findByText(/Barracuda Pro 1 TB 2.5"/);
    await expect(spanElement).toBeInTheDocument();
  });
  it('should show the button', async () => {
    const productDataWeekly = resMocks.productDataWeekly;
    render(
      <MockProviders>
        <PromoItem productData={productDataWeekly} promoType={'Weekly'} />
      </MockProviders>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('should show text on the button', async () => {
    const productDataWeekly = resMocks.productDataWeekly;
    render(
      <MockProviders>
        <PromoItem productData={productDataWeekly} promoType={'Weekly'} />
      </MockProviders>
    );

    expect(screen.getByRole('button')).toHaveTextContent(/Sprawdź produkt/);
  });
  it('should show manufacturer name together with product name', async () => {
    const productDataWeekly = resMocks.productDataWeekly;
    render(
      <MockProviders>
        <PromoItem productData={productDataWeekly} promoType={'Weekly'} />
      </MockProviders>
    );

    const spanElement = await screen.findByText(
      'Seagate Barracuda Pro 1 TB 2.5" SATA III (ST1000LM049)'
    );
    await expect(spanElement).toBeInTheDocument();
  });
  it('should move to product page after clicking product button', async () => {
    const productDataWeekly = resMocks.productDataWeekly;
    render(
      <MockProviders>
        <PromoItem productData={productDataWeekly} promoType={'Weekly'} />
      </MockProviders>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText(/Sprawdź produkt/));
    });

    await waitFor(() => {
      expect(window.location.pathname + window.location.search).toBe(
        `/product/${productDataWeekly.productID}`
      );
    });
  });
  it('should change text color to blue on mouse over', async () => {
    const productDataWeekly = resMocks.productDataWeekly;
    render(
      <MockProviders>
        <PromoItem productData={productDataWeekly} promoType={'Weekly'} />
      </MockProviders>
    );

    await waitFor(() => {
      fireEvent.mouseOver(screen.getByText(/Mega oferta/));
    });
    expect(screen.getByText(/Mega oferta/)).toHaveStyle('color: rgb(0, 123, 255, 1)');
  });
  it('should have black color text as default', async () => {
    const productDataWeekly = resMocks.productDataWeekly;
    render(
      <MockProviders>
        <PromoItem productData={productDataWeekly} promoType={'Weekly'} />
      </MockProviders>
    );

    const spanElement = await screen.findByText('Cena standardowa:');

    expect(spanElement).toHaveStyle('color: #343a40!important');
  });
});
