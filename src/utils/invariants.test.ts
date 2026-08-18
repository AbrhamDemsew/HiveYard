import { seedApiaries } from '../data/seedApiaries';
import { seedInspections } from '../data/seedInspections';
import { seedHarvests } from '../data/seedHarvests';
import { seedColonies } from '../data/seedColonies';
import { helpArticles } from '../content/helpArticles';
import { policyLibrary } from '../content/policyLibrary';
import { DEFAULT_INSPECTION_FILTERS, DEFAULT_HARVEST_FILTERS, DEFAULT_COLONY_FILTERS } from '../types/filters';
import { caseloadPercent } from './capacity';
import { filterInspections } from './inspectionFilters';
import { filterHarvests } from './harvestFilters';
import { filterColonies } from './colonyFilters';
import { matchesQuery } from './format';

describe('colony filter invariants', () => {
  it.each(seedColonies.map((item) => [item.id, item.sku, item.apiaryId]))(
    'keeps %s (%s) when filtering to its apiary',
    (id, _sku, apiaryId) => {
      const rows = filterColonies(seedColonies, { ...DEFAULT_COLONY_FILTERS, apiaryId });
      expect(rows.some((item) => item.id === id)).toBe(true);
    },
  );

  it.each(seedColonies.map((item) => [item.id, item.status]))(
    'keeps %s when filtering to status %s',
    (id, status) => {
      const rows = filterColonies(seedColonies, { ...DEFAULT_COLONY_FILTERS, status });
      expect(rows.some((item) => item.id === id)).toBe(true);
    },
  );

  it.each(seedColonies.map((item) => [item.id, item.role]))(
    'keeps %s when filtering to class %s',
    (id, role) => {
      const rows = filterColonies(seedColonies, { ...DEFAULT_COLONY_FILTERS, role });
      expect(rows.some((item) => item.id === id)).toBe(true);
    },
  );

  it.each(seedColonies.map((item) => [item.sku]))(
    'finds %s by sku search',
    (sku) => {
      const rows = filterColonies(seedColonies, { ...DEFAULT_COLONY_FILTERS, query: sku });
      expect(rows.some((item) => item.sku === sku)).toBe(true);
    },
  );
});

describe('harvest filter invariants', () => {
  it.each(seedHarvests.map((harvest) => [harvest.id, harvest.status]))(
    'keeps harvest %s for status %s',
    (id, status) => {
      const rows = filterHarvests(seedHarvests, { ...DEFAULT_HARVEST_FILTERS, status });
      expect(rows.some((harvest) => harvest.id === id)).toBe(true);
    },
  );

  it.each(seedHarvests.map((harvest) => [harvest.id, harvest.name]))(
    'finds harvest %s by name',
    (id, name) => {
      const rows = filterHarvests(seedHarvests, { ...DEFAULT_HARVEST_FILTERS, query: name });
      expect(rows.some((harvest) => harvest.id === id)).toBe(true);
    },
  );
});

describe('inspection filter invariants', () => {
  it.each(seedInspections.map((record) => [record.id, record.status]))(
    'keeps haul-out %s for status %s',
    (id, status) => {
      const rows = filterInspections(seedInspections, { ...DEFAULT_INSPECTION_FILTERS, status });
      expect(rows.some((record) => record.id === id)).toBe(true);
    },
  );
});

describe('catalog and content invariants', () => {
  it.each(seedApiaries.map((apiary) => [apiary.id, apiary.name]))(
    'computes occupancy for %s',
    (id) => {
      const apiary = seedApiaries.find((item) => item.id === id)!;
      const percent = caseloadPercent(apiary, seedColonies);
      expect(percent).toBeGreaterThanOrEqual(0);
      expect(percent).toBeLessThanOrEqual(100);
    },
  );

  it.each(helpArticles.map((article) => [article.id, article.title]))(
    'indexes help article %s',
    (_id, title) => {
      expect(matchesQuery(title, title.slice(0, 8))).toBe(true);
    },
  );

  it.each(policyLibrary.map((policy) => [policy.id, policy.title]))(
    'indexes policy %s',
    (_id, title) => {
      expect(title.length).toBeGreaterThan(8);
    },
  );
});
