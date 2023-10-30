import { render, screen } from '@testing-library/react';
import { MockProviders } from '../../../setupTests';
import ProductSpecification from './ProductSpecification';
const resMocks = require('../../../mocks/resMocks.js');

describe('ProductSpecification subcomponent tests', () => {
  it('should render product specification section', async () => {
    const productID_13 = resMocks.productID_13;
    render(
      <MockProviders>
        <ProductSpecification productData={productID_13} />
      </MockProviders>
    );

    const idElement = await screen.findByText(/Pełna specyfikacja/);
    expect(idElement).toBeInTheDocument();
  });

  it('should render proper number of data cells in a specification table', async () => {
    const productID_13 = resMocks.productID_13;
    const attributes = productID_13.Attributes;
    const expectedNumberOfCells = 10 + 2 * attributes.filter((obj) => obj.property !== 'image').length;
    render(
      <MockProviders>
        <ProductSpecification productData={productID_13} />
      </MockProviders>
    );

    const numberOfDataCells = await screen.getAllByRole('cell');
    expect(numberOfDataCells.length).toEqual(expectedNumberOfCells);
  });
});
