import { rest } from 'msw';
import { server } from '../../mocks/server';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { MockProviders } from '../../setupTests';
import AuthenticationPanel from './AuthenticationPanel';
import LogOut from './LogOut/LogOut';

describe('AuthenticationPanel component tests', () => {
  it('should render LogIn component', async () => {
    render(
      <MockProviders>
        <AuthenticationPanel redirect={'/'} />
      </MockProviders>
    );

    const spanElement = screen.getByText(/Logowanie użytkownika/);
    expect(spanElement).toBeInTheDocument();
  });
  it('should render SignUp component', async () => {
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
  it('should get back to main page', async () => {
    render(
      <MockProviders>
        <AuthenticationPanel redirect={'/'} />
      </MockProviders>
    );

    fireEvent.click(screen.getByText('Wróć do strony głównej'));
    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });
});

describe('LogIn component tests', () => {
  it('should handle server error', async () => {
    server.use(
      rest.post(`${process.env.REACT_APP_API}/session`, async (req, res, ctx) => {
        return res(ctx.status(500));
      }),
      rest.get(`${process.env.REACT_APP_API}/session`, (req, res, ctx) => {
        return res(ctx.json({ data: [], message: 'Not logged.' }));
      })
    );
    render(
      <MockProviders>
        <AuthenticationPanel redirect={'/'} />
      </MockProviders>
    );
    fireEvent.click(screen.getByText('Logowanie'));
    fireEvent.change(screen.getByPlaceholderText(/login/), { target: { value: 'bartek' } });
    fireEvent.change(screen.getByPlaceholderText(/password/), { target: { value: 'bartek123' } });
    fireEvent.click(screen.getByText('Login'));
    const errorElement = await screen.findByText(/Ooops, spróbuj ponownie później!/);
    expect(errorElement).toBeInTheDocument();
  });
  it('should show wrong password/login combination', async () => {
    render(
      <MockProviders>
        <AuthenticationPanel redirect={'/'} />
      </MockProviders>
    );
    fireEvent.click(screen.getByText('Logowanie'));
    fireEvent.change(screen.getByPlaceholderText(/login/), { target: { value: 'bartek' } });
    fireEvent.change(screen.getByPlaceholderText(/password/), { target: { value: 'wrong-pass' } });
    fireEvent.click(screen.getByText('Login'));
    const spanElement = await screen.findByText(/Wrong combination of login and password./);
    expect(spanElement).toBeInTheDocument();
  });
  it('should log in with correct password', async () => {
    render(
      <MockProviders>
        <AuthenticationPanel redirect={'/'} />
      </MockProviders>
    );
    fireEvent.change(screen.getByPlaceholderText(/login/), { target: { value: 'bartek' } });
    fireEvent.change(screen.getByPlaceholderText(/password/), { target: { value: 'bartek123' } });
    fireEvent.click(screen.getByText('Login'));
    await waitFor(
      () => {
        expect(screen.queryByText(/Logowanie użytkownika/)).not.toBeInTheDocument();
      },
      { timeout: 15000, interval: 1 }
    );
  });
});

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
});

describe('SignUp sub-component tests', () => {
  it('should show company fields after checking company account option', async () => {
    render(
      <MockProviders>
        <AuthenticationPanel redirect={'/'} />
      </MockProviders>
    );
    fireEvent.click(screen.getByText('Rejestracja'));
    const companyCheckbox = screen.getByLabelText(/Czy zakładane jest konto firmowe?/);
    fireEvent.click(companyCheckbox);
    expect(companyCheckbox.checked).toBe(true);
    const spanElement = await screen.findByText(/Dane firmowe/);
    expect(spanElement).toBeInTheDocument();
  });
  it('should not show company fields after checking company account option', async () => {
    render(
      <MockProviders>
        <AuthenticationPanel redirect={'/'} />
      </MockProviders>
    );
    fireEvent.click(screen.getByText('Rejestracja'));
    const spanElement = screen.queryByText('Dane firmowe');
    expect(spanElement).not.toBeInTheDocument();
  });
  it('should handle server error', async () => {
    server.use(
      rest.post(`${process.env.REACT_APP_API}/user`, async (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(
      <MockProviders>
        <AuthenticationPanel redirect={'/'} />
      </MockProviders>
    );
    fireEvent.click(screen.getByText('Rejestracja'));
    fireEvent.change(screen.getByPlaceholderText(/login/), { target: { value: 'bartek' } });
    fireEvent.change(screen.getByPlaceholderText(/hasło/), { target: { value: 'bartek123' } });
    fireEvent.change(screen.getByPlaceholderText(/e-mail/), {
      target: { value: 'b.ostrowski@gmail.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/imię/), { target: { value: 'Bartosz' } });
    fireEvent.change(screen.getByPlaceholderText(/nazwisko/), { target: { value: 'Ostrowski' } });
    fireEvent.change(screen.getByPlaceholderText(/numer telefonu/), {
      target: { value: '123456789' }
    });
    fireEvent.change(screen.getByPlaceholderText(/ulica/), { target: { value: 'Asnyka' } });
    fireEvent.change(screen.getByPlaceholderText(/miasto/), { target: { value: 'Opole' } });
    fireEvent.change(screen.getByPlaceholderText(/kod/), { target: { value: '45-341' } });
    fireEvent.click(screen.getByText(/Utwórz konto/));
    const errorElement = await screen.findByText(/Ooops, spróbuj ponownie później!/);
    expect(errorElement).toBeInTheDocument();
  });
  it('should show warning if email is already used', async () => {
    render(
      <MockProviders>
        <AuthenticationPanel redirect={'/'} />
      </MockProviders>
    );
    fireEvent.click(screen.getByText('Rejestracja'));
    fireEvent.change(screen.getByPlaceholderText(/login/), { target: { value: 'bartek' } });
    fireEvent.change(screen.getByPlaceholderText(/hasło/), { target: { value: 'bartek123' } });
    fireEvent.change(screen.getByPlaceholderText(/e-mail/), {
      target: { value: 'b.ostrowski@gmail.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/imię/), { target: { value: 'Bartosz' } });
    fireEvent.change(screen.getByPlaceholderText(/nazwisko/), { target: { value: 'Ostrowski' } });
    fireEvent.change(screen.getByPlaceholderText(/numer telefonu/), {
      target: { value: '123456789' }
    });
    fireEvent.change(screen.getByPlaceholderText(/ulica/), { target: { value: 'Asnyka' } });
    fireEvent.change(screen.getByPlaceholderText(/miasto/), { target: { value: 'Opole' } });
    fireEvent.change(screen.getByPlaceholderText(/kod/), { target: { value: '45-341' } });
    fireEvent.click(screen.getByText(/Utwórz konto/));
    const errorElement = await screen.findByText(/User with that login or email already exists./);
    expect(errorElement).toBeInTheDocument();
  });
  it('should register and redirect to main page', async () => {
    render(
      <MockProviders>
        <AuthenticationPanel redirect={'/'} />
      </MockProviders>
    );
    fireEvent.click(screen.getByText('Rejestracja'));
    fireEvent.change(screen.getByPlaceholderText(/login/), { target: { value: 'bartek1' } });
    fireEvent.change(screen.getByPlaceholderText(/hasło/), { target: { value: 'bartek123' } });
    fireEvent.change(screen.getByPlaceholderText(/e-mail/), {
      target: { value: 'b.ostrowski1@gmail.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/imię/), { target: { value: 'Bartosz' } });
    fireEvent.change(screen.getByPlaceholderText(/nazwisko/), { target: { value: 'Ostrowski' } });
    fireEvent.change(screen.getByPlaceholderText(/numer telefonu/), {
      target: { value: '123456789' }
    });
    fireEvent.change(screen.getByPlaceholderText(/ulica/), { target: { value: 'Asnyka' } });
    fireEvent.change(screen.getByPlaceholderText(/miasto/), { target: { value: 'Opole' } });
    fireEvent.change(screen.getByPlaceholderText(/kod/), { target: { value: '45-341' } });
    fireEvent.click(screen.getByText(/Utwórz konto/));
    await waitFor(() => {
      expect(screen.queryByText(/Rejestracja użytkownika/)).not.toBeInTheDocument();
    });
  });
});
