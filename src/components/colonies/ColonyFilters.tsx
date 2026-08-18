import {
  MEDIUM_LABELS,
  MEDIUM_TYPES,
  ROLE_LABELS,
  STATUS_LABELS,
  COLONY_ROLES,
  COLONY_STATUSES,
  type Apiary,
} from '../../types/hive';
import type { ColonyFilters } from '../../types/filters';

interface ColonyFiltersProps {
  filters: ColonyFilters;
  apiaries: Apiary[];
  onChange: (filters: ColonyFilters) => void;
  onReset: () => void;
}

export function ColonyFilterBar({ filters, apiaries, onChange, onReset }: ColonyFiltersProps) {
  return (
    <form className="filter-bar" aria-label="Colony filters" onSubmit={(event) => event.preventDefault()}>
      <div className="field">
        <label htmlFor="colony-query">Search yards</label>
        <input
          id="colony-query"
          type="search"
          value={filters.query}
          placeholder="SKU, curator, beat, or notes"
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="colony-role">Class</label>
        <select
          id="colony-role"
          value={filters.role}
          onChange={(event) => onChange({ ...filters, role: event.target.value as ColonyFilters['role'] })}
        >
          <option value="all">All classes</option>
          {COLONY_ROLES.map((role) => (
            <option key={role} value={role}>
              {ROLE_LABELS[role]}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="colony-status">Status</label>
        <select
          id="colony-status"
          value={filters.status}
          onChange={(event) => onChange({ ...filters, status: event.target.value as ColonyFilters['status'] })}
        >
          <option value="all">All statuses</option>
          {COLONY_STATUSES.map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="colony-apiary">Apiary</label>
        <select
          id="colony-apiary"
          value={filters.apiaryId}
          onChange={(event) => onChange({ ...filters, apiaryId: event.target.value })}
        >
          <option value="all">All apiaries</option>
          {apiaries.map((apiary) => (
            <option key={apiary.id} value={apiary.id}>
              {apiary.name}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="colony-hull">Hull</label>
        <select
          id="colony-hull"
          value={filters.format}
          onChange={(event) => onChange({ ...filters, format: event.target.value as ColonyFilters['format'] })}
        >
          <option value="all">All formats</option>
          {MEDIUM_TYPES.map((type) => (
            <option key={type} value={type}>
              {MEDIUM_LABELS[type]}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="colony-sort">Sort</label>
        <select
          id="colony-sort"
          value={`${filters.sortBy}:${filters.sortDirection}`}
          onChange={(event) => {
            const [sortBy, sortDirection] = event.target.value.split(':') as [
              ColonyFilters['sortBy'],
              ColonyFilters['sortDirection'],
            ];
            onChange({ ...filters, sortBy, sortDirection });
          }}
        >
          <option value="sku:asc">SKU</option>
          <option value="curator:asc">Curator A–Z</option>
          <option value="columnInches:desc">Highest inches</option>
          <option value="wordCount:desc">Highest word count</option>
        </select>
      </div>
      <button type="button" className="button ghost" onClick={onReset}>
        Clear filters
      </button>
    </form>
  );
}
