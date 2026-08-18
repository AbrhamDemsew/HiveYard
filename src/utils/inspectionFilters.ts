import type { InspectionFilters } from '../types/filters';
import type { Inspection } from '../types/hive';
import { compareStrings, matchesQuery } from './format';

export function inspectionSearchBlob(record: Inspection): string {
  return [record.editor, record.notes, record.type].join(' ');
}

export function filterInspections(records: Inspection[], filters: InspectionFilters): Inspection[] {
  const filtered = records.filter((record) => {
    if (!matchesQuery(inspectionSearchBlob(record), filters.query)) return false;
    if (filters.type !== 'all' && record.type !== filters.type) return false;
    if (filters.status !== 'all' && record.status !== filters.status) return false;
    if (filters.apiaryId !== 'all' && record.apiaryId !== filters.apiaryId) return false;
    return true;
  });

  const direction = filters.sortDirection === 'asc' ? 1 : -1;
  return [...filtered].sort((a, b) => {
    switch (filters.sortBy) {
      case 'cost':
        return (a.cost - b.cost) * direction;
      case 'type':
        return compareStrings(a.type, b.type) * direction;
      default:
        return compareStrings(a.startDate, b.startDate) * direction;
    }
  });
}
