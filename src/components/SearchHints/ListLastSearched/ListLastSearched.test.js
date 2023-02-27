import { render, screen } from '@testing-library/react';

import { MockProviders } from '../../../setupTests';
import ListLastSearched from './ListLastSearched';
const resMocks = require('../../../mocks/resMocks.js');

describe('ListLastSearched subcomponent tests', () => {
  it('should show last search values', async () => {
    render(
      <MockProviders>
        <ListLastSearched
          data={[]}
          hideHints={() => {}}
          removeLastSearched={() => {}}></ListLastSearched>
      </MockProviders>
    );
    const spanElement = await screen.queryByText(
      'GeForce RTX 3080 Vision OC 10GB GDDR6X (GV-N3080VISION OC-10GD 2.0)'
    );
    expect(spanElement).not.toBeInTheDocument();
  });

  it('should not show last search values', async () => {
    const lastSearched = resMocks.lastSearched;
    localStorage.removeItem('lastSearched');
    render(
      <MockProviders>
        <ListLastSearched
          data={lastSearched}
          hideHints={() => {}}
          removeLastSearched={() => {}}></ListLastSearched>
      </MockProviders>
    );

    const spanElement = await screen.findByText(
      'GeForce RTX 3080 Vision OC 10GB GDDR6X (GV-N3080VISION OC-10GD 2.0)'
    );
    expect(spanElement).toBeInTheDocument();
  });

  it('should show 5 last search values', async () => {
    const lastSearched = resMocks.lastSearched;
    render(
      <MockProviders>
        <ListLastSearched
          data={lastSearched}
          hideHints={() => {}}
          removeLastSearched={() => {}}></ListLastSearched>
      </MockProviders>
    );

    const elements = (await screen.findAllByTitle(/Remove last search value/)).length;
    expect(elements).toBe(5);
  });
});
