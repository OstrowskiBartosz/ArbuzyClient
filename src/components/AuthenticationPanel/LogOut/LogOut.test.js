import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockProviders } from '../../../setupTests';
import LogOut from './LogOut';
import { act } from 'react-dom/test-utils';
import store from '../../../store/store';
import { sessionChange } from '../../../store/storeSlices/sessionSlice';

describe('LogOut component tests', () => {
  it('should render LogOut component', async () => {
    render(
      <MockProviders>
        <LogOut />
      </MockProviders>
    );
    const spanElement = await screen.findByText(/Czy na pewno chcesz się wylogować?/);
    expect(spanElement).toBeInTheDocument();
  });

  it('should log out user after clicking button', async () => {
    act(() => store.dispatch(sessionChange(true)));
    render(
      <MockProviders>
        <LogOut />
      </MockProviders>
    );

    fireEvent.click(screen.getByText(/Wyloguj/));
    await waitFor(() => {
      expect(screen.queryByText(/Czy na pewno chcesz się wylogować?/)).not.toBeInTheDocument();
    });
  });

  it('should not be able to see logout if not logged in', async () => {
    act(() => store.dispatch(sessionChange(false)));
    render(
      <MockProviders>
        <LogOut />
      </MockProviders>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Czy na pewno chcesz się wylogować?/)).not.toBeInTheDocument();
    });
  });
});
