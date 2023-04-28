import { render, screen, fireEvent, findAllByRole } from '@testing-library/react';
import { MockProviders } from '../../../setupTests';
import FilterPanel from './FilterPanel';

const resMocks = require('../../../mocks/resMocks.js');

describe('FilterPanel subcomponent tests', () => {
  it('should show searched value at the top of filter panel as text', async () => {
    const productsData = resMocks.searchResultsWithBar;
    const priceSettings = resMocks.priceSettings;
    const priceRange = resMocks.priceRange;
    const searchValue = `Wyszukiwanie: "bar"`;
    render(
      <MockProviders>
        <FilterPanel
          searchValue={'bar'}
          isLoading={false}
          filtersData={productsData}
          productsData={productsData && productsData.products}
          priceSettings={priceSettings}
          priceRange={priceRange}
          showResetButton={false}
          fetchSearchData={() => {}}
        />
      </MockProviders>
    );

    const element = await screen.findByText(searchValue);
    expect(element).toBeInTheDocument();
  });
  it('should load all filters as checkboxes', async () => {
    const productsData = resMocks.searchResultsWithBar;
    const priceSettings = resMocks.priceSettings;
    const priceRange = resMocks.priceRange;
    render(
      <MockProviders>
        <FilterPanel
          searchValue={'bar'}
          isLoading={false}
          filtersData={productsData}
          productsData={productsData && productsData.products}
          priceSettings={priceSettings}
          priceRange={priceRange}
          showResetButton={false}
          fetchSearchData={() => {}}
        />
      </MockProviders>
    );

    const elements = await screen.findAllByRole('checkbox');
    expect(elements.length).toEqual(17);
  });
  it('should allow to check checkboxes', async () => {
    const productsData = resMocks.searchResultsWithBar;
    const priceSettings = resMocks.priceSettings;
    const priceRange = resMocks.priceRange;
    render(
      <MockProviders>
        <FilterPanel
          searchValue={'bar'}
          isLoading={false}
          filtersData={productsData}
          productsData={productsData && productsData.products}
          priceSettings={priceSettings}
          priceRange={priceRange}
          showResetButton={false}
          fetchSearchData={() => {}}
        />
      </MockProviders>
    );

    const element = await screen.findByText(/Dyski SSD/);
    fireEvent.click(element);
    const checkboxes = await screen.findAllByRole('checkbox');
    expect(checkboxes[1].checked).toBe(true);
  });
  it('should allow to write price range', async () => {
    const productsData = resMocks.searchResultsWithBar;
    const priceSettings = resMocks.priceSettings;
    const priceRange = resMocks.priceRange;
    render(
      <MockProviders>
        <FilterPanel
          searchValue={'bar'}
          isLoading={false}
          filtersData={productsData}
          productsData={productsData && productsData.products}
          priceSettings={priceSettings}
          priceRange={priceRange}
          showResetButton={false}
          fetchSearchData={() => {}}
        />
      </MockProviders>
    );

    const element = await screen.findAllByDisplayValue(161);
    fireEvent.change(element[1], { target: { value: '189' } });
    const input = await screen.findAllByDisplayValue(189);
    expect(input[1]).toBeInTheDocument();
  });
  it('should show reset filters button', async () => {
    const productsData = resMocks.searchResultsWithBar;
    const priceSettings = resMocks.priceSettings;
    const priceRange = resMocks.priceRange;
    render(
      <MockProviders>
        <FilterPanel
          searchValue={'bar'}
          isLoading={false}
          filtersData={productsData}
          productsData={productsData && productsData.products}
          priceSettings={priceSettings}
          priceRange={priceRange}
          showResetButton={true}
          fetchSearchData={() => {}}
        />
      </MockProviders>
    );
    const element = await screen.findAllByRole('button', { name: /Reset Filtrów/ });
    expect(element.length).toBe(2);
  });
});
