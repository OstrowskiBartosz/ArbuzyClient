import { rest } from 'msw';
import { server } from '../../../mocks/server';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockProviders } from '../../../setupTests';
import SignUp from './SignUp';

import { act } from 'react-dom/test-utils';
import store from '../../../store/store';
import { sessionChange } from '../../../store/storeSlices/sessionSlice';

describe('SignUp sub-component tests', () => {
  it('should show company fields after checking company account option', async () => {
    act(() => store.dispatch(sessionChange(false)));
    render(
      <MockProviders>
        <SignUp />
      </MockProviders>
    );
    const companyCheckbox = screen.getByLabelText(/Czy zakładane jest konto firmowe?/);
    fireEvent.click(companyCheckbox);
    expect(companyCheckbox.checked).toBe(true);
    const spanElement = await screen.findByText(/Dane firmowe/);
    expect(spanElement).toBeInTheDocument();
  });
  it('should not show company fields after checking company account option', async () => {
    act(() => store.dispatch(sessionChange(false)));
    render(
      <MockProviders>
        <SignUp />
      </MockProviders>
    );

    const spanElement = screen.queryByText('Dane firmowe');
    expect(spanElement).not.toBeInTheDocument();
  });
  it('should handle server error', async () => {
    server.use(
      rest.post(`${process.env.REACT_APP_API}/user`, async (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    act(() => store.dispatch(sessionChange(false)));
    render(
      <MockProviders>
        <SignUp />
      </MockProviders>
    );

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
    act(() => store.dispatch(sessionChange(false)));
    render(
      <MockProviders>
        <SignUp />
      </MockProviders>
    );

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
    act(() => store.dispatch(sessionChange(false)));
    render(
      <MockProviders>
        <SignUp />
      </MockProviders>
    );

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
      expect(
        screen.queryByText(/User with that login or email already exists./)
      ).not.toBeInTheDocument();
    });
  });
});
