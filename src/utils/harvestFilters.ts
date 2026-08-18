import type { HarvestFilters } from '../types/filters';
import type { Harvest } from '../types/hive';
import { compareStrings, matchesQuery } from './format';

export function harvestSearchBlob(harvest: Harvest): string {
  return [harvest.name, harvest.origin, harvest.destination, harvest.notes].join(' ');
}

export function filterHarvests(harvests: Harvest[], filters: HarvestFilters): Harvest[] {
  const filtered = harvests.filter((harvest) => {
    if (!matchesQuery(harvestSearchBlob(harvest), filters.query)) return false;
    if (filters.status !== 'all' && harvest.status !== filters.status) return false;
    if (filters.apiaryId !== 'all' && harvest.apiaryId !== filters.apiaryId) return false;
    if (filters.dateFrom && harvest.date < filters.dateFrom) return false;
    if (filters.dateTo && harvest.date > filters.dateTo) return false;
    return true;
  });

  const direction = filters.sortDirection === 'asc' ? 1 : -1;
  return [...filtered].sort((a, b) => {
    switch (filters.sortBy) {
      case 'durationMin':
        return (a.durationMin - b.durationMin) * direction;
      case 'name':
        return compareStrings(a.name, b.name) * direction;
      default:
        return compareStrings(a.date + a.startTime, b.date + b.startTime) * direction;
    }
  });
}
