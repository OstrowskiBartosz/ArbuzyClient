import { render, screen, fireEvent } from '@testing-library/react';

import { MockProviders } from '../../setupTests';
import SearchHints from './SearchHints';
const resMocks = require('../../mocks/resMocks.js');

describe('SearchHints component tests', () => {
  it('should show 4 last searched values after deleting one', async () => {
    const lastSearched = resMocks.lastSearched;
    localStorage.setItem('lastSearched', JSON.stringify(lastSearched));
    render(
      <MockProviders>
        <SearchHints searchValue={'b'}></SearchHints>
      </MockProviders>
    );

    const elements = await screen.findAllByTitle(/Remove last search value/);
    fireEvent.click(elements[0]);
    const elementsAfterDelete = await (
      await screen.findAllByTitle(/Remove last search value/)
    ).length;
    expect(elementsAfterDelete).toBe(4);
  });

  it('should show 2 last searched values after deleting 3', async () => {
    const lastSearched = resMocks.lastSearched;
    localStorage.setItem('lastSearched', JSON.stringify(lastSearched));
    render(
      <MockProviders>
        <SearchHints searchValue={'b'}></SearchHints>
      </MockProviders>
    );

    const elements = await screen.findAllByTitle(/Remove last search value/);
    fireEvent.click(elements[0]);
    fireEvent.click(elements[1]);
    fireEvent.click(elements[2]);
    const elementsAfterDelete = await (
      await screen.findAllByTitle(/Remove last search value/)
    ).length;
    expect(elementsAfterDelete).toBe(2);
  });

  it('should show last search values', async () => {
    const lastSearched = resMocks.lastSearched;
    localStorage.setItem('lastSearched', JSON.stringify(lastSearched));
    render(
      <MockProviders>
        <SearchHints searchValue={'b'}></SearchHints>
      </MockProviders>
    );
    const spanElement = await screen.findByText(/Ostatnio szukane:/);
    expect(spanElement).toBeInTheDocument();
  });

  it('should not show last search values', async () => {
    localStorage.removeItem('lastSearched');
    render(
      <MockProviders>
        <SearchHints searchValue={'b'}></SearchHints>
      </MockProviders>
    );
    const spanElement = await screen.queryByText(/Ostatnio szukane:/);
    expect(spanElement).not.toBeInTheDocument();
  });

  it('should not show products if no value has been input', async () => {
    render(
      <MockProviders>
        <SearchHints searchValue={''}></SearchHints>
      </MockProviders>
    );

    const spanElement = await screen.queryByText(/Produkty:/);
    expect(spanElement).not.toBeInTheDocument();
  });

  it('should show no categories if there are none available with written search value', async () => {
    render(
      <MockProviders>
        <SearchHints searchValue={'bar'}></SearchHints>
      </MockProviders>
    );

    const spanElement = await screen.findByText(/brak kategorii/);
    expect(spanElement).toBeInTheDocument();
  });

  it('should show no manufacturers if there are none available with written search value', async () => {
    render(
      <MockProviders>
        <SearchHints searchValue={'bar'}></SearchHints>
      </MockProviders>
    );

    const spanElement = await screen.findByText(/brak producentów/);
    expect(spanElement).toBeInTheDocument();
  });
});
