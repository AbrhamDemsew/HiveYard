import type { Apiary } from '../../types/hive';
import { HARVEST_STATUS_LABELS, HARVEST_STATUSES } from '../../types/hive';
import type { HarvestFilters } from '../../types/filters';

interface HarvestFilterBarProps {
  filters: HarvestFilters;
  apiaries: Apiary[];
  onChange: (filters: HarvestFilters) => void;
  onReset: () => void;
}

export function HarvestFilterBar({ filters, apiaries, onChange, onReset }: HarvestFilterBarProps) {
  return (
    <form className="filter-bar" aria-label="Harvest filters" onSubmit={(event) => event.preventDefault()}>
      <div className="field">
        <label htmlFor="hvt-query">Search harvests</label>
        <input id="hvt-query" type="search" value={filters.query} onChange={(event) => onChange({ ...filters, query: event.target.value })} />
      </div>
      <div className="field">
        <label htmlFor="hvt-status">Status</label>
        <select id="hvt-status" value={filters.status} onChange={(event) => onChange({ ...filters, status: event.target.value as HarvestFilters['status'] })}>
          <option value="all">All statuses</option>
          {HARVEST_STATUSES.map((status) => (
            <option key={status} value={status}>{HARVEST_STATUS_LABELS[status]}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="hvt-apiary">Apiary</label>
        <select id="hvt-apiary" value={filters.apiaryId} onChange={(event) => onChange({ ...filters, apiaryId: event.target.value })}>
          <option value="all">All apiaries</option>
          {apiaries.map((apiary) => (
            <option key={apiary.id} value={apiary.id}>{apiary.name}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="hvt-from">From date</label>
        <input id="hvt-from" type="date" value={filters.dateFrom} onChange={(event) => onChange({ ...filters, dateFrom: event.target.value })} />
      </div>
      <div className="field">
        <label htmlFor="hvt-to">To date</label>
        <input id="hvt-to" type="date" value={filters.dateTo} onChange={(event) => onChange({ ...filters, dateTo: event.target.value })} />
      </div>
      <button type="button" className="button ghost" onClick={onReset}>Clear filters</button>
    </form>
  );
}
