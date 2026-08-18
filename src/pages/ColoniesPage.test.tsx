import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider } from '../context/AppContext';
import { seedColonies } from '../data/seedColonies';
import { __resetHiveStoreForTests } from '../hooks/useHiveStore';
import { ColoniesPage } from '../pages/ColoniesPage';

function renderColonys() {
  __resetHiveStoreForTests();
  return render(
    <AppProvider>
      <ColoniesPage />
    </AppProvider>,
  );
}

describe('ColoniesPage', () => {
  it('renders the roster with labeled search and status text', () => {
    renderColonys();
    expect(screen.getByLabelText('Search yards')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('No colonies selected');
    expect(screen.getByLabelText(`Select ${seedColonies[0].sku}`)).toBeInTheDocument();
  });

  it('filters the table by search query', () => {
    renderColonys();
    fireEvent.change(screen.getByLabelText('Search yards'), {
      target: { value: seedColonies[0].sku },
    });
    expect(screen.getByLabelText(`Select ${seedColonies[0].sku}`)).toBeInTheDocument();
    expect(screen.queryByLabelText(`Select ${seedColonies[1].sku}`)).not.toBeInTheDocument();
  });

  it('lets a clerk select a visible row', async () => {
    const user = userEvent.setup();
    renderColonys();
    await user.click(screen.getByLabelText(`Select ${seedColonies[0].sku}`));
    expect(screen.getByRole('status')).toHaveTextContent('1 colony selected');
  });
});
