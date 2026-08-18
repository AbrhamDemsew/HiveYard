import { useMemo, useState } from 'react';
import { HarvestFilterBar } from '../components/harvests/HarvestFilters';
import { HarvestForm } from '../components/harvests/HarvestForm';
import { HarvestTable } from '../components/harvests/HarvestTable';
import { UI_COPY } from '../constants/featureFlags';
import { useHiveStore } from '../hooks/useHiveStore';
import { DEFAULT_HARVEST_FILTERS, type HarvestFilters } from '../types/filters';
import type { Harvest } from '../types/hive';
import { filterHarvests } from '../utils/harvestFilters';

export function HarvestsPage() {
  const { harvests, colonies, apiaries, addHarvest, updateHarvest, deleteHarvest } = useHiveStore();
  const [filters, setFilters] = useState<HarvestFilters>(DEFAULT_HARVEST_FILTERS);
  const [editing, setEditing] = useState<Harvest | null>(null);
  const [showForm, setShowForm] = useState(false);
  const visible = useMemo(() => filterHarvests(harvests, filters), [harvests, filters]);

  return (
    <section className="page">
      <div className="page-toolbar">
        <p className="muted">{visible.length} of {harvests.length} harvests in view</p>
        <button type="button" className="button" onClick={() => { setEditing(null); setShowForm(true); }}>Add harvest</button>
      </div>
      <HarvestFilterBar filters={filters} apiaries={apiaries} onChange={setFilters} onReset={() => setFilters(DEFAULT_HARVEST_FILTERS)} />
      {showForm ? (
        <HarvestForm
          apiaries={apiaries}
          colonies={colonies}
          initial={editing}
          onCancel={() => { setShowForm(false); setEditing(null); }}
          onSubmit={(value) => {
            if (value.id) updateHarvest(value.id, value);
            else {
              addHarvest({
                name: value.name, colonyId: value.colonyId, apiaryId: value.apiaryId, origin: value.origin,
                destination: value.destination, date: value.date, startTime: value.startTime, endTime: value.endTime,
                status: value.status, durationMin: value.durationMin, loadPercent: value.loadPercent, notes: value.notes,
              });
            }
            setShowForm(false);
            setEditing(null);
          }}
        />
      ) : null}
      {visible.length === 0 ? (
        <p className="empty">{UI_COPY.emptyHarvests}</p>
      ) : (
        <HarvestTable
          harvests={visible}
          colonies={colonies}
          apiaries={apiaries}
          onEdit={(harvest) => { setEditing(harvest); setShowForm(true); }}
          onDelete={deleteHarvest}
        />
      )}
    </section>
  );
}
