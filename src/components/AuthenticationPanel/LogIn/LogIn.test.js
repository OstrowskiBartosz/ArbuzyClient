import { rest } from 'msw';
import { server } from '../../../mocks/server';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockProviders } from '../../../setupTests';
import LogIn from './LogIn';

import { act } from 'react-dom/test-utils';
import store from '../../../store/store';
import { sessionChange } from '../../../store/storeSlices/sessionSlice';

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
    act(() => store.dispatch(sessionChange(false)));
    render(
      <MockProviders>
        <LogIn redirect={'/'} />
      </MockProviders>
    );
    fireEvent.change(screen.getByPlaceholderText(/login/), { target: { value: 'bartek' } });
    fireEvent.change(screen.getByPlaceholderText(/password/), { target: { value: 'bartek123' } });
    fireEvent.click(screen.getByText('Login'));
    const errorElement = await screen.findByText(/Ooops, spróbuj ponownie później!/);
    expect(errorElement).toBeInTheDocument();
  });
  it('should show wrong password/login combination', async () => {
    act(() => store.dispatch(sessionChange(false)));
    render(
      <MockProviders>
        <LogIn redirect={'/'} />
      </MockProviders>
    );
    fireEvent.change(screen.getByPlaceholderText(/login/), { target: { value: 'bartek' } });
    fireEvent.change(screen.getByPlaceholderText(/password/), { target: { value: 'wrong-pass' } });
    fireEvent.click(screen.getByText('Login'));
    const spanElement = await screen.findByText(/Wrong combination of login and password./);
    expect(spanElement).toBeInTheDocument();
  });
  it('should log in with correct password', async () => {
    act(() => store.dispatch(sessionChange(false)));
    render(
      <MockProviders>
        <LogIn />
      </MockProviders>
    );
    fireEvent.change(screen.getByPlaceholderText(/login/), { target: { value: 'bartek' } });
    fireEvent.change(screen.getByPlaceholderText(/password/), { target: { value: 'bartek123' } });
    fireEvent.click(screen.getByText('Login'));
    await waitFor(() => {
      expect(
        screen.queryByText(/Wrong combination of login and password./)
      ).not.toBeInTheDocument();
    });
  });
});
