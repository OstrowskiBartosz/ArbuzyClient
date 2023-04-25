import { render, screen, fireEvent } from '@testing-library/react';

import { MockProviders } from '../../../setupTests';
import ListHints from './ListHints';
const resMocks = require('../../../mocks/resMocks.js');

describe('ListHints subcomponent tests', () => {
  it('should show 5 manufacturer values', async () => {
    const searchHintsManufacturersWithB = resMocks.searchHintsManufacturersWithB;
    render(
      <MockProviders>
        <ListHints
          data={searchHintsManufacturersWithB}
          resource={'manufacturer'}
          hideHints={() => {}}></ListHints>
      </MockProviders>
    );

    const hrefElements = await (await screen.findAllByRole('link')).length;
    expect(hrefElements).toBe(5);
  });

  it('should move user to product url after clicking product name', async () => {
    const searchHintsProductsWithB = resMocks.searchHintsProductsWithB;
    render(
      <MockProviders>
        <ListHints
          data={searchHintsProductsWithB}
          resource={'product'}
          hideHints={() => {}}></ListHints>
      </MockProviders>
    );

    const element = await screen.findByText('Barracuda 1 TB 3.5" SATA III (ST1000DM010)');
    const elementHref = element.getAttribute('href');
    expect(elementHref).toBe(
      '/search?q=Barracuda 1 TB 3.5" SATA III (ST1000DM010)&s=domyślne&l=10&p=1'
    );
  });

  it('should move user to manufacturer url after clicking manufacturer name', async () => {
    const searchHintsManufacturersWithB = resMocks.searchHintsManufacturersWithB;
    render(
      <MockProviders>
        <ListHints
          data={searchHintsManufacturersWithB}
          resource={'manufacturer'}
          hideHints={() => {}}></ListHints>
      </MockProviders>
    );

    const element = await screen.findByText('Toshiba');
    const elementHref = element.getAttribute('href');
    expect(elementHref).toBe('/search?filterManufacturer=[2]&s=domyślne&l=10&p=1');
  });

  it('should move user to category url after clicking category name', async () => {
    const searchHintsCategoriesWithB = resMocks.searchHintsCategoriesWithB;
    render(
      <MockProviders>
        <ListHints
          data={searchHintsCategoriesWithB}
          resource={'category'}
          hideHints={() => {}}></ListHints>
      </MockProviders>
    );

    const element = await screen.findByText('Obudowy');
    const elementHref = element.getAttribute('href');
    expect(elementHref).toBe('/search?filterCategory=[5]&s=domyślne&l=10&p=1');
  });
});
