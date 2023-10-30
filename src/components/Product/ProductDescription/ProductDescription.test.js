import { render, screen } from '@testing-library/react';
import { MockProviders } from '../../../setupTests';
import ProductDescription from './ProductDescription';
const resMocks = require('../../../mocks/resMocks.js');

describe('ProductDescription subcomponent tests', () => {
  it('should render product description section', async () => {
    const productID_13 = resMocks.productID_13;
    render(
      <MockProviders>
        <ProductDescription rawDescription={resMocks.productID_13.description} />
      </MockProviders>
    );

    const idElement = await screen.findByText(/Opis produktu/);
    expect(idElement).toBeInTheDocument();
  });

  it('should render proper number of data cells in a specification table', async () => {
    const productID_13 = resMocks.productID_13;
    render(
      <MockProviders>
        <ProductDescription rawDescription={resMocks.productID_13.description} />
      </MockProviders>
    );

    const numberOfDataCells = await screen.getAllByRole('img');
    expect(numberOfDataCells.length).toEqual(2);
  });
});
