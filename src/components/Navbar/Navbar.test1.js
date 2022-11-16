import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockProviders } from '../../setupTests';
import Navbar from './Navbar';

it('should render PageFooter', async () => {
  render(
    <MockProviders>
      <Navbar />
    </MockProviders>
  );

  const spanElement = screen.getByText('Sklep komputerowy Arbuzy.com');
  expect(spanElement).toBeInTheDocument();
});
