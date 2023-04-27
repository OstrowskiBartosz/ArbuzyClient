import { render, screen, fireEvent } from '@testing-library/react';

import { MockProviders } from '../../../setupTests';
import ListHints from './ListHints';
const resMocks = require('../../../mocks/resMocks.js');

describe('ListHints subcomponent tests', () => {
  it('should show 5 manufacturer values', async () => {
    const hintsManufacturersWithB = resMocks.hintsManufacturersWithB;
    render(
      <MockProviders>
        <ListHints
          data={hintsManufacturersWithB}
          resource={'manufacturer'}
          hideHints={() => {}}></ListHints>
      </MockProviders>
    );

    const hrefElements = await (await screen.findAllByRole('link')).length;
    expect(hrefElements).toBe(5);
  });

  it('should move user to product url after clicking product name', async () => {
    const hintsProductsWithB = resMocks.hintsProductsWithB;
    render(
      <MockProviders>
        <ListHints data={hintsProductsWithB} resource={'product'} hideHints={() => {}}></ListHints>
      </MockProviders>
    );

    const element = await screen.findByText('Barracuda 1 TB 3.5" SATA III (ST1000DM010)');
    const elementHref = element.getAttribute('href');
    expect(elementHref).toBe(
      '/search?q=Barracuda 1 TB 3.5" SATA III (ST1000DM010)&s=domyślne&l=10&p=1'
    );
  });

  it('should move user to manufacturer url after clicking manufacturer name', async () => {
    const hintsManufacturersWithB = resMocks.hintsManufacturersWithB;
    render(
      <MockProviders>
        <ListHints
          data={hintsManufacturersWithB}
          resource={'manufacturer'}
          hideHints={() => {}}></ListHints>
      </MockProviders>
    );

    const element = await screen.findByText('Toshiba');
    const elementHref = element.getAttribute('href');
    expect(elementHref).toBe('/search?filterManufacturer=[2]&s=domyślne&l=10&p=1');
  });

  it('should move user to category url after clicking category name', async () => {
    const hintsCategoriesWithB = resMocks.hintsCategoriesWithB;
    render(
      <MockProviders>
        <ListHints
          data={hintsCategoriesWithB}
          resource={'category'}
          hideHints={() => {}}></ListHints>
      </MockProviders>
    );

    const element = await screen.findByText('Obudowy');
    const elementHref = element.getAttribute('href');
    expect(elementHref).toBe('/search?filterCategory=[5]&s=domyślne&l=10&p=1');
  });
});
