import { render, screen } from '@testing-library/react';
import { MockProviders } from '../../../setupTests';
import ProductNavbar from './ProductNavbar';
const resMocks = require('../../../mocks/resMocks.js');

describe('ProductNavbar subcomponent tests', () => {
  it('should render product navbar', async () => {
    const productID_13 = resMocks.productID_13;
    render(
      <MockProviders>
        <ProductNavbar productID={13} scrollWithOffset={() => {}} />
      </MockProviders>
    );

    const element = await screen.findByText(/Podsumowanie produktu/);
    expect(element).toBeInTheDocument();
  });
});
