import { render, screen, fireEvent } from '@testing-library/react';

import { MockProviders } from '../../../setupTests';
import SortPanel from './SortPanel';
const resMocks = require('../../../mocks/resMocks.js');

describe('SortPanel subcomponent tests', () => {
  it('should mark 10 products per page as active', async () => {
    const searchResults = resMocks.searchResultsWithB;
    const sortSettings = resMocks.sortSettings;
    render(
      <MockProviders>
        <SortPanel
          isLoading={false}
          NumberOfpages={searchResults.NumberOfpages}
          activePage={searchResults.activePage}
          ProductsData={searchResults.products}
          sortSettings={sortSettings}
          fetchSearchData={() => {}}
        />
      </MockProviders>
    );

    expect((await screen.findByText('10')).parentNode.classList.contains('active')).toBe(true);
  });
  it('should mark 20 products per page as not active', async () => {
    const searchResults = resMocks.searchResultsWithB;
    const sortSettings = resMocks.sortSettings;
    render(
      <MockProviders>
        <SortPanel
          isLoading={false}
          NumberOfpages={searchResults.NumberOfpages}
          activePage={searchResults.activePage}
          ProductsData={searchResults.products}
          sortSettings={sortSettings}
          fetchSearchData={() => {}}
        />
      </MockProviders>
    );

    expect((await screen.findByText('20')).parentNode.classList.contains('active')).toBe(false);
  });
  it('should allow to switch active products on page by clicking on 30 products per page button', async () => {
    const searchResults = resMocks.searchResultsWithB;
    const sortSettings = resMocks.sortSettings;
    render(
      <MockProviders>
        <SortPanel
          isLoading={false}
          NumberOfpages={searchResults.NumberOfpages}
          activePage={searchResults.activePage}
          ProductsData={searchResults.products}
          sortSettings={sortSettings}
          fetchSearchData={() => {}}
        />
      </MockProviders>
    );

    fireEvent.click(await screen.getByText('30'));
    expect((await screen.findByText('30')).parentNode.classList.contains('active')).toBe(true);
  });
  it('should have 4 page as active', async () => {
    const searchResults = resMocks.searchResultsWithB;
    const sortSettings = resMocks.sortSettings;
    render(
      <MockProviders>
        <SortPanel
          isLoading={false}
          NumberOfpages={searchResults.NumberOfpages}
          activePage={searchResults.activePage}
          ProductsData={searchResults.products}
          sortSettings={sortSettings}
          fetchSearchData={() => {}}
        />
      </MockProviders>
    );

    expect((await screen.findByText('4')).parentNode.classList.contains('active')).toBe(true);
  });
  it('should have default sorting method', async () => {
    const searchResults = resMocks.searchResultsWithB;
    const sortSettings = resMocks.sortSettings;
    render(
      <MockProviders>
        <SortPanel
          isLoading={false}
          NumberOfpages={searchResults.NumberOfpages}
          activePage={searchResults.activePage}
          ProductsData={searchResults.products}
          sortSettings={sortSettings}
          fetchSearchData={() => {}}
        />
      </MockProviders>
    );

    expect(await screen.findByRole('button', { name: 'domyślne' })).toBeInTheDocument();
  });
  it('should not have sorting method set as price descending', async () => {
    const searchResults = resMocks.searchResultsWithB;
    const sortSettings = resMocks.sortSettings;
    render(
      <MockProviders>
        <SortPanel
          isLoading={false}
          NumberOfpages={searchResults.NumberOfpages}
          activePage={searchResults.activePage}
          ProductsData={searchResults.products}
          sortSettings={sortSettings}
          fetchSearchData={() => {}}
        />
      </MockProviders>
    );

    expect(await screen.queryByRole('button', { name: 'cena malejąco' })).not.toBeInTheDocument();
  });
  it('should allow changing sorting method by clicking on it', async () => {
    const searchResults = resMocks.searchResultsWithB;
    const sortSettings = resMocks.sortSettings;
    render(
      <MockProviders>
        <SortPanel
          isLoading={false}
          NumberOfpages={searchResults.NumberOfpages}
          activePage={searchResults.activePage}
          ProductsData={searchResults.products}
          sortSettings={sortSettings}
          fetchSearchData={() => {}}
        />
      </MockProviders>
    );

    fireEvent.click(await screen.findByRole('button', { name: 'domyślne' }));
    fireEvent.click(await screen.findByText('cena malejąco'));

    expect(await screen.findByRole('button', { name: 'cena malejąco' })).toBeInTheDocument();
  });
});

// isLoading={isLoadingProductsData} // true false
// NumberOfpages={productsData && productsData.NumberOfpages}
// activePage={productsData && productsData.activePage}
// ProductsData={productsData && productsData.products}
// sortSettings={sortSettings}
// fetchSearchData={fetchSearchData}
