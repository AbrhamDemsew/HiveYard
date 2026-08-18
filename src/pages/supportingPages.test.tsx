import type { ReactNode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider } from '../context/AppContext';
import { DashboardPage } from '../pages/DashboardPage';
import { HelpPage } from '../pages/HelpPage';
import { HarvestsPage } from '../pages/HarvestsPage';
import { SettingsPage } from '../pages/SettingsPage';
import { __resetHiveStoreForTests } from '../hooks/useHiveStore';
import { helpArticles } from '../content/helpArticles';

function wrap(node: ReactNode) {
  __resetHiveStoreForTests();
  return render(<AppProvider>{node}</AppProvider>);
}

describe('supporting pages', () => {
  it('shows utilization on the yard board', () => {
    wrap(<DashboardPage />);
    expect(screen.getByText('Utilization')).toBeInTheDocument();
    expect(screen.getByLabelText('Find apiary')).toBeInTheDocument();
  });

  it('filters harvests by search', () => {
    wrap(<HarvestsPage />);
    fireEvent.change(screen.getByLabelText('Search harvests'), {
      target: { value: 'does-not-match-any-harvest' },
    });
    expect(screen.getByText(/No harvests match/)).toBeInTheDocument();
  });

  it('toggles a feature flag', async () => {
    const user = userEvent.setup();
    wrap(<SettingsPage />);
    const box = screen.getByLabelText(/Bulk yard assign/);
    expect(box).toBeChecked();
    await user.click(box);
    expect(box).not.toBeChecked();
  });

  it('opens a help article', async () => {
    const user = userEvent.setup();
    wrap(<HelpPage />);
    await user.click(screen.getByRole('button', { name: new RegExp(helpArticles[2].title, 'i') }));
    expect(screen.getByRole('heading', { name: helpArticles[2].title })).toBeInTheDocument();
  });
});
