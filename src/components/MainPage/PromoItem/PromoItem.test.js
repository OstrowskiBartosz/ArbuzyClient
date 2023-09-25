import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { MockProviders } from '../../../setupTests';
import PromoItem from './PromoItem';
const resMocks = require('../../../mocks/resMocks.js');
import { act } from 'react-dom/test-utils';

describe('PromoItem subcomponent tests', () => {
  it('should show load product data', async () => {
    const promoItemWeekly = resMocks.promoItemWeekly;
    render(
      <MockProviders>
        <PromoItem productData={promoItemWeekly} promoType={'Weekly'} />
      </MockProviders>
    );

    const spanElement = await screen.findByText(/Ryzen 5 5600G, 3.9 GHz, 16 MB, BOX/);
    await expect(spanElement).toBeInTheDocument();
  });
  it('should show manufacturer name together with product name', async () => {
    const promoItemWeekly = resMocks.promoItemWeekly;
    render(
      <MockProviders>
        <PromoItem productData={promoItemWeekly} promoType={'Weekly'} />
      </MockProviders>
    );

    const spanElement = await screen.findByText('AMD Ryzen 5 5600G, 3.9 GHz, 16 MB, BOX');
    await expect(spanElement).toBeInTheDocument();
  });
  it('should show the button', async () => {
    const promoItemWeekly = resMocks.promoItemWeekly;
    render(
      <MockProviders>
        <PromoItem productData={promoItemWeekly} promoType={'Weekly'} />
      </MockProviders>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('should show text on the button', async () => {
    const promoItemWeekly = resMocks.promoItemWeekly;
    render(
      <MockProviders>
        <PromoItem productData={promoItemWeekly} promoType={'Weekly'} />
      </MockProviders>
    );

    expect(screen.getByRole('button')).toHaveTextContent(/Sprawdź produkt/);
  });
  it('should move to product page after clicking product button', async () => {
    const promoItemWeekly = resMocks.promoItemWeekly;
    render(
      <MockProviders>
        <PromoItem productData={promoItemWeekly} promoType={'Weekly'} />
      </MockProviders>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText(/Sprawdź produkt/));
    });

    await waitFor(() => {
      expect(window.location.pathname + window.location.search).toBe(
        `/product/${promoItemWeekly.productID}`
      );
    });
  });
  it('regular price should not be bold', async () => {
    const promoItemWeekly = resMocks.promoItemWeekly;
    render(
      <MockProviders>
        <PromoItem productData={promoItemWeekly} promoType={'Weekly'} />
      </MockProviders>
    );

    const spanElement = await screen.findByText('Cena regularna:');

    expect(spanElement.classList.contains('fw-bold')).toBe(false);
  });
  it('regular price should be bold', async () => {
    const promoItemWeekly = resMocks.promoItemWeekly;
    render(
      <MockProviders>
        <PromoItem productData={promoItemWeekly} promoType={'Weekly'} />
      </MockProviders>
    );

    const spanElement = await screen.findByText('Cena tylko teraz:');

    expect(spanElement.classList.contains('fw-bold')).toBe(true);
  });
});
