import { fireEvent, render, screen } from '@testing-library/react';
import { MockProviders } from '../../../setupTests';
import Settings from './Settings';
const resMocks = require('../../../mocks/resMocks.js');

describe('Settings component tests', () => {
  it('should display first name and last name data properly', async () => {
    const profilelUserData = resMocks.profilelUserData;
    render(
      <MockProviders>
        <Settings userData={profilelUserData} />
      </MockProviders>
    );

    expect(await screen.findByText('Bartosz Ostrowski')).toBeInTheDocument();
  });

  it('should display steet data properly', async () => {
    const profilelUserData = resMocks.profilelUserData;
    render(
      <MockProviders>
        <Settings userData={profilelUserData} />
      </MockProviders>
    );

    expect(await screen.findByText('Ozimska 215/55')).toBeInTheDocument();
  });

  it('should show save button after clicking edit', async () => {
    const profilelUserData = resMocks.profilelUserData;
    render(
      <MockProviders>
        <Settings userData={profilelUserData} />
      </MockProviders>
    );

    fireEvent.click(await screen.findByText(/Edytuj dane/));

    expect(await screen.findByRole('button', { name: 'Zapisz zmiany' })).toBeInTheDocument();
  });

  it('should show address input', async () => {
    const profilelUserData = resMocks.profilelUserData;
    render(
      <MockProviders>
        <Settings userData={profilelUserData} />
      </MockProviders>
    );

    fireEvent.click(await screen.findByText(/Edytuj dane/));
    const addressInput = await screen.findByDisplayValue('Ozimska 215/55');
    fireEvent.change(addressInput, { target: { value: 'Ozimska 215/10' } });
    expect(screen.getByDisplayValue('Ozimska 215/10')).toBeInTheDocument();
  });

  it('should not show address input without prior edit button click', async () => {
    const profilelUserData = resMocks.profilelUserData;
    render(
      <MockProviders>
        <Settings userData={profilelUserData} />
      </MockProviders>
    );

    expect(await screen.queryByDisplayValue('Ozimska 215/55')).not.toBeInTheDocument();
  });

  it('should show cancellation button after clicking edit button', async () => {
    const profilelUserData = resMocks.profilelUserData;
    render(
      <MockProviders>
        <Settings userData={profilelUserData} />
      </MockProviders>
    );

    fireEvent.click(await screen.findByText(/Edytuj dane/));
    expect(await screen.findByText('Anuluj zmiany')).toBeInTheDocument();
  });

  it('should not show cancellation button without prior clicking edit button', async () => {
    const profilelUserData = resMocks.profilelUserData;
    render(
      <MockProviders>
        <Settings userData={profilelUserData} />
      </MockProviders>
    );

    expect(await screen.queryByDisplayValue('Anuluj zmiany')).not.toBeInTheDocument();
  });

  it('should show delete account button', async () => {
    const profilelUserData = resMocks.profilelUserData;
    render(
      <MockProviders>
        <Settings userData={profilelUserData} />
      </MockProviders>
    );

    expect(await screen.findByText(/Usuń konto/)).toBeInTheDocument();
  });

  it('should show confirmation button after clicking delete account button', async () => {
    const profilelUserData = resMocks.profilelUserData;
    render(
      <MockProviders>
        <Settings userData={profilelUserData} />
      </MockProviders>
    );

    fireEvent.click(await screen.findByText(/Usuń konto/));
    expect(await screen.findByText(/Na pewno?/)).toBeInTheDocument();
  });

  it('should show cancellaction button after clicking delete account button', async () => {
    const profilelUserData = resMocks.profilelUserData;
    render(
      <MockProviders>
        <Settings userData={profilelUserData} />
      </MockProviders>
    );

    fireEvent.click(await screen.findByText(/Usuń konto/));
    expect(await screen.findByText(/Anuluj/)).toBeInTheDocument();
  });

  it('should NOT show delete account confirmation button without prior clicking delete button', async () => {
    const profilelUserData = resMocks.profilelUserData;
    render(
      <MockProviders>
        <Settings userData={profilelUserData} />
      </MockProviders>
    );

    expect(await screen.queryByText(/Na pewno?/)).not.toBeInTheDocument();
  });
});
