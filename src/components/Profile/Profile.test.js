import { fireEvent, render, screen } from '@testing-library/react';
import { MockProviders } from '../../setupTests';
import Profile from './Profile';

describe('Profile component tests', () => {
  it('should render profile component', async () => {
    render(
      <MockProviders>
        <Profile />
      </MockProviders>
    );

    const complaintsButton = screen.getByRole('button', { name: /reklamacje/i });

    expect(complaintsButton).toBeInTheDocument();
  });
  it('should render profile component', async () => {
    render(
      <MockProviders>
        <Profile />
      </MockProviders>
    );

    const ordersButton = screen.getByRole('button', { name: /zamówienia/i });

    expect(ordersButton).toBeInTheDocument();
  });
  it('should render profile component', async () => {
    render(
      <MockProviders>
        <Profile />
      </MockProviders>
    );

    const settingsButton = screen.getByRole('button', { name: /ustawienia/i });

    expect(settingsButton).toBeInTheDocument();
  });

  it('should render settings component after clicking button', async () => {
    render(
      <MockProviders>
        <Profile />
      </MockProviders>
    );

    fireEvent.click(await screen.findByText(/Ustawienia/));

    const settingsHeading = await screen.findByText(/Ustawienia konta/);
    expect(settingsHeading).toBeInTheDocument();
  });

  it('should render orders component after clicking button', async () => {
    render(
      <MockProviders>
        <Profile />
      </MockProviders>
    );

    fireEvent.click(await screen.findByText(/Ustawienia/));
    fireEvent.click(await screen.findByText(/Zamówienia/));

    const ordersHeading = await screen.findByText(/Twoje zamówienia/);
    expect(ordersHeading).toBeInTheDocument();
  });

  it('should render orders component after clicking button', async () => {
    render(
      <MockProviders>
        <Profile />
      </MockProviders>
    );

    fireEvent.click(await screen.findByText(/Reklamacje/));

    const complaintsHeading = await screen.findByText(/Reklamacje w sklepie Arbuzy.com/);
    expect(complaintsHeading).toBeInTheDocument();
  });
});
