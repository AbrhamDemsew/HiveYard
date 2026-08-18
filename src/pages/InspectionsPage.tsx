import { useMemo, useState } from 'react';
import { InspectionFilterBar } from '../components/inspections/InspectionFilters';
import { InspectionForm } from '../components/inspections/InspectionForm';
import { InspectionTable } from '../components/inspections/InspectionTable';
import { UI_COPY } from '../constants/featureFlags';
import { useHiveStore } from '../hooks/useHiveStore';
import { DEFAULT_INSPECTION_FILTERS, type InspectionFilters } from '../types/filters';
import type { Inspection } from '../types/hive';
import { filterInspections } from '../utils/inspectionFilters';

export function InspectionsPage() {
  const { inspections, colonies, apiaries, addInspection, updateInspection, deleteInspection } = useHiveStore();
  const [filters, setFilters] = useState<InspectionFilters>(DEFAULT_INSPECTION_FILTERS);
  const [editing, setEditing] = useState<Inspection | null>(null);
  const [showForm, setShowForm] = useState(false);
  const visible = useMemo(() => filterInspections(inspections, filters), [inspections, filters]);

  return (
    <section className="page">
      <div className="page-toolbar">
        <p className="muted">{visible.length} of {inspections.length} inspections in view</p>
        <button type="button" className="button" onClick={() => { setEditing(null); setShowForm(true); }}>Add inspection</button>
      </div>
      <InspectionFilterBar filters={filters} apiaries={apiaries} onChange={setFilters} onReset={() => setFilters(DEFAULT_INSPECTION_FILTERS)} />
      {showForm ? (
        <InspectionForm
          apiaries={apiaries}
          colonies={colonies}
          initial={editing}
          onCancel={() => { setShowForm(false); setEditing(null); }}
          onSubmit={(value) => {
            if (value.id) updateInspection(value.id, value);
            else {
              addInspection({
                colonyId: value.colonyId, apiaryId: value.apiaryId, type: value.type, status: value.status,
                startDate: value.startDate, endDate: value.endDate, editor: value.editor, cost: value.cost, notes: value.notes,
              });
            }
            setShowForm(false);
            setEditing(null);
          }}
        />
      ) : null}
      {visible.length === 0 ? (
        <p className="empty">{UI_COPY.emptyInspections}</p>
      ) : (
        <InspectionTable
          records={visible}
          colonies={colonies}
          apiaries={apiaries}
          onEdit={(record) => { setEditing(record); setShowForm(true); }}
          onDelete={deleteInspection}
        />
      )}
    </section>
  );
}
