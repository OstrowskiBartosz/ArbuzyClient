import { render, screen } from '@testing-library/react';
import { MockProviders } from '../../../setupTests';
import RefreshTimer from './RefreshTimer';
import { act } from 'react-dom/test-utils';
const resMocks = require('../../../mocks/resMocks.js');

describe('RefreshTimer subcomponent tests', () => {
  const mainPageProducts = resMocks.mainPageProducts;

  it('should render timer', async () => {
    render(
      <MockProviders>
        <RefreshTimer dataTopCategory={mainPageProducts} handleFetchData={() => {}} />
      </MockProviders>
    );

    expect(await screen.findByText(/Aut. Odświeżenie za/)).toBeInTheDocument();
  });

  it('should render timer 10 sec later showing 4 minutes and 49 seconds', async () => {
    jest.useFakeTimers();
    render(
      <MockProviders>
        <RefreshTimer dataTopCategory={mainPageProducts} handleFetchData={() => {}} />
      </MockProviders>
    );
    act(() => jest.advanceTimersByTime(10000));
    expect(await screen.findByText('49')).toBeInTheDocument();
    jest.useRealTimers();
  });

  it('should render timer 10 sec later showing 4 minutes and 49 seconds', async () => {
    jest.useFakeTimers();
    render(
      <MockProviders>
        <RefreshTimer dataTopCategory={mainPageProducts} handleFetchData={() => {}} />
      </MockProviders>
    );
    act(() => jest.advanceTimersByTime(10000));
    expect(await screen.findByText('49')).toBeInTheDocument();
    jest.useRealTimers();
  });
});
