import type { Apiary } from '../../types/hive';
import { INSPECTION_STATUS_LABELS, INSPECTION_STATUSES, INSPECTION_TYPE_LABELS, INSPECTION_TYPES } from '../../types/hive';
import type { InspectionFilters } from '../../types/filters';

interface InspectionFilterBarProps {
  filters: InspectionFilters;
  apiaries: Apiary[];
  onChange: (filters: InspectionFilters) => void;
  onReset: () => void;
}

export function InspectionFilterBar({ filters, apiaries, onChange, onReset }: InspectionFilterBarProps) {
  return (
    <form className="filter-bar" aria-label="Inspection filters" onSubmit={(event) => event.preventDefault()}>
      <div className="field">
        <label htmlFor="insp-query">Search haul-outs</label>
        <input id="insp-query" type="search" value={filters.query} onChange={(event) => onChange({ ...filters, query: event.target.value })} />
      </div>
      <div className="field">
        <label htmlFor="insp-type">Type</label>
        <select id="insp-type" value={filters.type} onChange={(event) => onChange({ ...filters, type: event.target.value as InspectionFilters['type'] })}>
          <option value="all">All types</option>
          {INSPECTION_TYPES.map((type) => (<option key={type} value={type}>{INSPECTION_TYPE_LABELS[type]}</option>))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="insp-status">Status</label>
        <select id="insp-status" value={filters.status} onChange={(event) => onChange({ ...filters, status: event.target.value as InspectionFilters['status'] })}>
          <option value="all">All statuses</option>
          {INSPECTION_STATUSES.map((status) => (<option key={status} value={status}>{INSPECTION_STATUS_LABELS[status]}</option>))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="insp-apiary">Apiary</label>
        <select id="insp-apiary" value={filters.apiaryId} onChange={(event) => onChange({ ...filters, apiaryId: event.target.value })}>
          <option value="all">All apiaries</option>
          {apiaries.map((apiary) => (<option key={apiary.id} value={apiary.id}>{apiary.name}</option>))}
        </select>
      </div>
      <button type="button" className="button ghost" onClick={onReset}>Clear filters</button>
    </form>
  );
}
