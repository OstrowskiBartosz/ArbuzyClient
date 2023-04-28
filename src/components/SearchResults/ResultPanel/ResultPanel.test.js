import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockProviders } from '../../../setupTests';
import ResultPanel from './ResultPanel';
import { act } from 'react-dom/test-utils';
import store from '../../../store/store';
import { sessionChange } from '../../../store/storeSlices/sessionSlice';

const resMocks = require('../../../mocks/resMocks.js');

describe('ResultPanel subcomponent tests', () => {
  it('should load 10 of products', async () => {
    const productsData = resMocks.searchResultsWithB.products;
    render(
      <MockProviders>
        <ResultPanel
          ProductsData={productsData}
          searchValue={'b'}
          isLoading={false}
          fetchSearchData={() => {}}
        />
      </MockProviders>
    );

    const elements = await screen.findAllByRole('img');
    expect(elements.length).toEqual(10);
  });

  it('should load 20 of products', async () => {
    const productsData = resMocks.searchResultsWithB20Elements.products;
    render(
      <MockProviders>
        <ResultPanel
          ProductsData={productsData}
          searchValue={'b'}
          isLoading={false}
          fetchSearchData={() => {}}
        />
      </MockProviders>
    );

    const elements = await screen.findAllByRole('img');
    expect(elements.length).toEqual(20);
  });
  it('should show cart button with text to login in before adding product to cart', async () => {
    const productsData = resMocks.searchResultsWithB.products;
    act(() => store.dispatch(sessionChange(false)));
    render(
      <MockProviders>
        <ResultPanel
          ProductsData={productsData}
          searchValue={'b'}
          isLoading={false}
          fetchSearchData={() => {}}
        />
      </MockProviders>
    );

    const elements = await screen.findAllByRole('button', { name: /Zaloguj sie/ });
    expect(elements.length).toEqual(10);
  });

  it('should show cart button as red for not logged users', async () => {
    const productsData = resMocks.searchResultsWithB.products;
    act(() => store.dispatch(sessionChange(false)));
    render(
      <MockProviders>
        <ResultPanel
          ProductsData={productsData}
          searchValue={'b'}
          isLoading={false}
          fetchSearchData={() => {}}
        />
      </MockProviders>
    );

    const elements = await screen.findAllByRole('button');
    expect(elements[0]).toHaveClass('btn-danger');
  });
  it('should show cart button as blue for logged users', async () => {
    const productsData = resMocks.searchResultsWithB.products;
    act(() => store.dispatch(sessionChange(true)));
    render(
      <MockProviders>
        <ResultPanel
          ProductsData={productsData}
          searchValue={'b'}
          isLoading={false}
          fetchSearchData={() => {}}
        />
      </MockProviders>
    );

    const elements = await screen.findAllByRole('button');
    expect(elements[0]).toHaveClass('btn-primary');
  });
  it('should show cart button with text to add product to cart to logged users', async () => {
    const productsData = resMocks.searchResultsWithB.products;
    act(() => store.dispatch(sessionChange(true)));
    render(
      <MockProviders>
        <ResultPanel
          ProductsData={productsData}
          searchValue={'b'}
          isLoading={false}
          fetchSearchData={() => {}}
        />
      </MockProviders>
    );

    const elements = await screen.findAllByRole('button', { name: /Dodaj do koszyka/ });
    expect(elements.length).toEqual(10);
  });
  it('should move user to product page after clicking product name', async () => {
    const productsData = resMocks.searchResultsWithB.products;
    act(() => store.dispatch(sessionChange(true)));
    render(
      <MockProviders>
        <ResultPanel
          ProductsData={productsData}
          searchValue={'b'}
          isLoading={false}
          fetchSearchData={() => {}}
        />
      </MockProviders>
    );

    const productName = await screen.findByText(/Western Digital Blue 500 GB 2.5" SATA III/);
    fireEvent.click(productName);
    expect(window.location.pathname + window.location.search).toBe('/product/4?searchURL=');
  });
  it('should change clicked button text to "adding..." ', async () => {
    const productsData = resMocks.searchResultsWithB.products;
    act(() => store.dispatch(sessionChange(true)));
    render(
      <MockProviders>
        <ResultPanel
          ProductsData={productsData}
          searchValue={'b'}
          isLoading={false}
          fetchSearchData={() => {}}
        />
      </MockProviders>
    );

    const elements = await screen.findAllByRole('button', { name: 'Dodaj do koszyka' });
    await fireEvent.click(elements[0]);
    const clickedElement = await screen.findByRole('button', { name: /Dodawanie.../ });
    expect(clickedElement).toBeInTheDocument();
  });
});
