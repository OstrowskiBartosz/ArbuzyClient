import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockProviders } from '../../../setupTests';
import DeliveryTable from './DeliveryTable';
const resMocks = require('../../../mocks/resMocks.js');

describe('DeliveryTable subcomponent tests', () => {
  it('should move to profile to edit data', async () => {
    const userData = resMocks.profilelUserData;
    render(
      <MockProviders>
        <DeliveryTable userData={userData} />
      </MockProviders>
    );
    const profileElement = await screen.findByText(/Bartosz Ostrowski/);
    fireEvent.click(profileElement);
    await waitFor(() => {
      expect(window.location.pathname).toBe('/profile/settings');
    });
  });
});
