import { AppProvider, useAppContext } from './context/AppContext';
import { AppShell } from './components/layout/AppShell';
import { DashboardPage } from './pages/DashboardPage';
import { HarvestsPage } from './pages/HarvestsPage';
import { InspectionsPage } from './pages/InspectionsPage';
import { HelpPage } from './pages/HelpPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ColoniesPage } from './pages/ColoniesPage';

function AppView() {
  const { view, denseTables } = useAppContext();
  return (
    <div className={denseTables ? 'is-dense' : undefined}>
      <AppShell>
        {view === 'dashboard' ? <DashboardPage /> : null}
        {view === 'colonies' ? <ColoniesPage /> : null}
        {view === 'harvests' ? <HarvestsPage /> : null}
        {view === 'inspections' ? <InspectionsPage /> : null}
        {view === 'reports' ? <ReportsPage /> : null}
        {view === 'settings' ? <SettingsPage /> : null}
        {view === 'help' ? <HelpPage /> : null}
      </AppShell>
    </div>
  );
}

export default function HiveYardApp() {
  return (
    <AppProvider>
      <AppView />
    </AppProvider>
  );
}
