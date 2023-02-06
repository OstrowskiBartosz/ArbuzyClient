import { rest } from 'msw';
import { server } from '../../mocks/server';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockProviders } from '../../setupTests';
import AuthenticationPanel from './AuthenticationPanel';

import { act } from 'react-dom/test-utils';
import store from '../../store/store';
import { sessionChange } from '../../store/storeSlices/sessionSlice';

describe('AuthenticationPanel component tests', () => {
  it('should render LogIn component', async () => {
    act(() => store.dispatch(sessionChange(false)));
    render(
      <MockProviders>
        <AuthenticationPanel redirect={'/'} />
      </MockProviders>
    );

    const spanElement = screen.getByText(/Logowanie użytkownika/);
    expect(spanElement).toBeInTheDocument();
  });
  it('should render SignUp component', async () => {
    act(() => store.dispatch(sessionChange(false)));
    render(
      <MockProviders>
        <AuthenticationPanel redirect={'/'} />
      </MockProviders>
    );

    fireEvent.click(screen.getByText('Rejestracja'));

    const spanElement = screen.getByText(/Rejestracja użytkownika/);
    expect(spanElement).toBeInTheDocument();
  });
  it('should render back LogIn component after switching back from SignUp component', async () => {
    act(() => store.dispatch(sessionChange(false)));
    render(
      <MockProviders>
        <AuthenticationPanel redirect={'/'} />
      </MockProviders>
    );

    fireEvent.click(screen.getByText('Rejestracja'));
    fireEvent.click(screen.getByText('Logowanie'));

    const spanElement = screen.getByText(/Logowanie użytkownika/);
    expect(spanElement).toBeInTheDocument();
  });
  // it('should get back to main page', async () => {
  //   act(() => store.dispatch(sessionChange(false)));
  //   render(
  //     <MockProviders>
  //       <AuthenticationPanel redirect={'/'} />
  //     </MockProviders>
  //   );

  //   fireEvent.click(screen.getByText(/Wróć do strony głównej/));
  //   await waitFor(() => {
  //     expect(screen.queryByText(/Logowanie użytkownika/)).not.toBeInTheDocument();
  //   });
  // });
  it('should not be able to show authentication component if logged in', async () => {
    render(
      <MockProviders>
        <AuthenticationPanel redirect={'/'} />
      </MockProviders>
    );

    await waitFor(() => {
      expect(screen.queryByText('Logowanie użytkownika')).not.toBeInTheDocument();
    });
  });
});
