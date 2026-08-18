import type { HarvestStatus, InspectionStatus, InspectionType, ColonyFormat, ColonyRole, ColonyStatus } from './hive';

export type SortDirection = 'asc' | 'desc';

export interface ColonyFilters {
  query: string;
  role: ColonyRole | 'all';
  status: ColonyStatus | 'all';
  apiaryId: string | 'all';
  format: ColonyFormat | 'all';
  sortBy: 'sku' | 'columnInches' | 'wordCount' | 'curator';
  sortDirection: SortDirection;
}

export interface HarvestFilters {
  query: string;
  status: HarvestStatus | 'all';
  apiaryId: string | 'all';
  dateFrom: string;
  dateTo: string;
  sortBy: 'date' | 'durationMin' | 'name';
  sortDirection: SortDirection;
}

export interface InspectionFilters {
  query: string;
  type: InspectionType | 'all';
  status: InspectionStatus | 'all';
  apiaryId: string | 'all';
  sortBy: 'startDate' | 'cost' | 'type';
  sortDirection: SortDirection;
}

export const DEFAULT_COLONY_FILTERS: ColonyFilters = {
  query: '',
  role: 'all',
  status: 'all',
  apiaryId: 'all',
  format: 'all',
  sortBy: 'sku',
  sortDirection: 'asc',
};

export const DEFAULT_HARVEST_FILTERS: HarvestFilters = {
  query: '',
  status: 'all',
  apiaryId: 'all',
  dateFrom: '',
  dateTo: '',
  sortBy: 'date',
  sortDirection: 'asc',
};

export const DEFAULT_INSPECTION_FILTERS: InspectionFilters = {
  query: '',
  type: 'all',
  status: 'all',
  apiaryId: 'all',
  sortBy: 'startDate',
  sortDirection: 'asc',
};
