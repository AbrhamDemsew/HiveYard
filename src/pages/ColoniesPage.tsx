import { useEffect, useMemo, useState } from 'react';
import { ColonyFilterBar } from '../components/colonies/ColonyFilters';
import { ColonyForm } from '../components/colonies/ColonyForm';
import { ColonyTable } from '../components/colonies/ColonyTable';
import { UI_COPY } from '../constants/featureFlags';
import { useHiveStore } from '../hooks/useHiveStore';
import { useSelection } from '../hooks/useSelection';
import { DEFAULT_COLONY_FILTERS, type ColonyFilters } from '../types/filters';
import type { Colony } from '../types/hive';
import { filterColonies } from '../utils/colonyFilters';

export function ColoniesPage() {
  const { colonies, apiaries, addColony, updateColony, deleteColony } = useHiveStore();
  const [filters, setFilters] = useState<ColonyFilters>(DEFAULT_COLONY_FILTERS);
  const [editing, setEditing] = useState<Colony | null>(null);
  const [showForm, setShowForm] = useState(false);

  const visible = useMemo(() => filterColonies(colonies, filters), [colonies, filters]);
  const selection = useSelection(visible.map((item) => item.id));
  const { clear: clearSelection } = selection;

  useEffect(() => {
    clearSelection();
  }, [filters, clearSelection]);

  return (
    <section className="page">
      <div className="page-toolbar">
        <div>
          <p className="eyebrow">Yards</p>
          <p className="muted">
            {visible.length} of {colonies.length} colonies in view
          </p>
        </div>
        <button
          type="button"
          className="button"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          Add colony
        </button>
      </div>

      <ColonyFilterBar
        filters={filters}
        apiaries={apiaries}
        onChange={setFilters}
        onReset={() => setFilters(DEFAULT_COLONY_FILTERS)}
      />

      <p className="selection-status" role="status" aria-live="polite">
        {UI_COPY.selectionStatus(selection.selectedIds.length)}
      </p>

      {showForm ? (
        <ColonyForm
          apiaries={apiaries}
          initial={editing}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSubmit={(value) => {
            if (value.id) {
              updateColony(value.id, value);
            } else {
              addColony({
                slug: value.slug,
                beat: value.beat,
                headline: value.headline,
                wordCount: value.wordCount,
                role: value.role,
                status: value.status,
                format: value.format,
                apiaryId: value.apiaryId,
                sectionCode: value.sectionCode,
                columnInches: value.columnInches,
                dayRate: value.dayRate,
                curator: value.curator,
                email: value.email,
                filedAt: value.filedAt,
                notes: value.notes,
                tags: value.tags,
              });
            }
            setShowForm(false);
            setEditing(null);
          }}
        />
      ) : null}

      {visible.length === 0 ? (
        <p className="empty">{UI_COPY.emptyColonies}</p>
      ) : (
        <ColonyTable
          colonies={visible}
          apiaries={apiaries}
          selectedIds={selection.selectedIds}
          allVisibleSelected={selection.allVisibleSelected}
          someVisibleSelected={selection.someVisibleSelected}
          onToggle={selection.toggle}
          onToggleAll={selection.toggleAllVisible}
          onEdit={(item) => {
            setEditing(item);
            setShowForm(true);
          }}
          onDelete={deleteColony}
        />
      )}
    </section>
  );
}
