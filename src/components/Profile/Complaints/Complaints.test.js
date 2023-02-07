import { render, screen } from '@testing-library/react';
import { MockProviders } from '../../../setupTests';
import Complaints from './Complaints';

describe('Complaints component tests', () => {
  it('should render Complaints component', async () => {
    render(
      <MockProviders>
        <Complaints />
      </MockProviders>
    );

    const complaintsHeading = screen.getByText(/Reklamacje w sklepie Arbuzy.com/);

    expect(complaintsHeading).toBeInTheDocument();
  });
});
