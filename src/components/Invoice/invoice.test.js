import { rest } from 'msw';
import { server } from '../../mocks/server';
import { act } from 'react-dom/test-utils';
import { render, screen, waitFor } from '@testing-library/react';
import store from '../../store/store';
import { sessionChange } from '../../store/storeSlices/sessionSlice';
import { MockProviders } from '../../setupTests';
import Invoice from './Invoice';

describe('Invoice component tests', () => {
  it('should render without crashing', async () => {
    render(
      <MockProviders>
        <Invoice />
      </MockProviders>
    );

    expect(screen.getByText(/Szczegóły zamowienia/)).toBeInTheDocument();
  });
  it('should load data', async () => {
    render(
      <MockProviders>
        <Invoice />
      </MockProviders>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../)).not.toBeInTheDocument();
    });
  });
  it('should show fetch error', async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_API}/invoice/:invoiceID`, (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );

    render(
      <MockProviders>
        <Invoice />
      </MockProviders>
    );

    const errorElement = await screen.findByText(/Ooops, spróbuj ponownie później!/);

    expect(errorElement).toBeInTheDocument();
  });
  it('should move to /login if user is not logged', async () => {
    render(
      <MockProviders>
        <Invoice />
      </MockProviders>
    );
    act(() => store.dispatch(sessionChange(false)));

    await waitFor(() => {
      expect(window.location.pathname + window.location.search).toBe('/login');
    });
  });
});
