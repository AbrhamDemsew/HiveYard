import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HiveYardApp from './HiveYardApp';
import { __resetHiveStoreForTests } from './hooks/useHiveStore';

describe('HiveYardApp', () => {
  beforeEach(() => {
    window.localStorage.clear();
    __resetHiveStoreForTests();
  });

  it('opens the colonies workspace from the sidebar', async () => {
    const user = userEvent.setup();
    render(<HiveYardApp />);
    expect(screen.getByText(/Yard-to-colony apiary operations/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /^colonies/i }));
    expect(await screen.findByLabelText('Search yards')).toBeInTheDocument();
  });

  it('opens help without ambiguous controls', async () => {
    const user = userEvent.setup();
    render(<HiveYardApp />);
    await user.click(screen.getByRole('button', { name: /^help/i }));
    expect(screen.getByLabelText('Search procedures')).toBeInTheDocument();
  });
});
