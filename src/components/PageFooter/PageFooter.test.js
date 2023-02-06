import { render, screen } from '@testing-library/react';
import { fireEvent, waitFor } from '@testing-library/react';
import { MockProviders } from '../../setupTests';
import PageFooter from './PageFooter';

it('should render PageFooter', async () => {
  render(
    <MockProviders>
      <PageFooter />
    </MockProviders>
  );

  const spanElement = screen.getByText('Sklep komputerowy Arbuzy.com');
  expect(spanElement).toBeInTheDocument();
});

it('should show link to other components', async () => {
  render(
    <MockProviders>
      <PageFooter />
    </MockProviders>
  );
  expect(screen.getByText(/Zamowienia/i)).toBeInTheDocument();
});

it('should change url after clicking footer link', async () => {
  render(
    <MockProviders>
      <PageFooter />
    </MockProviders>
  );

  fireEvent.click(screen.getByText(/Koszyk/));
  await waitFor(() => {
    waitFor(() => {
      expect(window.location.pathname).toBe('/cart');
    });
  });
});

it('should change url after clicking footer link', async () => {
  render(
    <MockProviders>
      <PageFooter />
    </MockProviders>
  );

  fireEvent.click(screen.getByText(/Zamowienia/));
  await waitFor(() => {
    waitFor(() => {
      expect(window.location.pathname).toBe('/profile/orders');
    });
  });
});
