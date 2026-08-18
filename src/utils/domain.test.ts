import { remainingCapacity, caseloadPercent, totalDailyValue, availableDailyValue } from './capacity';
import { seedApiaries } from '../data/seedApiaries';
import { seedColonies } from '../data/seedColonies';
import { canInspect, nextSku, keeperEmail, statusTone } from './colonyUtils';
import { minutesBetween, overlappingHarvests, coloniesDueSoon } from './schedule';
import { averageLoad, countByStatus, delayedHarvestCount, inspectionBacklog, utilizationRate } from './analytics';
import { seedHarvests } from '../data/seedHarvests';
import { seedInspections } from '../data/seedInspections';
import { DEFAULT_COLONY_FILTERS } from '../types/filters';
import { filterColonies } from './colonyFilters';
import { filterHarvests } from './harvestFilters';
import { filterInspections } from './inspectionFilters';

describe('capacity and colony utils', () => {
  it('computes occupancy against apiary capacity', () => {
    const apiary = seedApiaries[0];
    const percent = caseloadPercent(apiary, seedColonies);
    expect(percent).toBeGreaterThanOrEqual(0);
    expect(percent).toBeLessThanOrEqual(100);
    expect(remainingCapacity(apiary, seedColonies)).toBeGreaterThanOrEqual(0);
  });

  it('sums daily rate and berthed transient value', () => {
    expect(totalDailyValue(seedColonies)).toBeGreaterThan(0);
    expect(availableDailyValue(seedColonies)).toBeGreaterThanOrEqual(0);
  });

  it('creates the next SKU and curator email', () => {
    expect(nextSku(seedColonies)).toBe('HY-121');
    expect(keeperEmail('Lena Brood')).toBe('lena.brood@hiveyard.local');
    expect(canInspect(seedColonies.find((item) => item.status === 'draft')!)).toBe(true);
    expect(statusTone('deaccessioned')).toBe('danger');
  });
});

describe('schedule and analytics', () => {
  it('measures harvest windows and overlaps', () => {
    expect(minutesBetween('06:00', '10:30')).toBe(270);
    const a = seedHarvests[0];
    const b = { ...a, id: 'other', startTime: a.startTime, endTime: a.endTime };
    expect(overlappingHarvests(a, b)).toBe(true);
  });

  it('summarizes archive health', () => {
    expect(countByStatus(seedColonies).reduce((sum, row) => sum + row.count, 0)).toBe(seedColonies.length);
    expect(utilizationRate(seedColonies)).toBeGreaterThanOrEqual(0);
    expect(averageLoad(seedHarvests)).toBeGreaterThan(0);
    expect(inspectionBacklog(seedInspections)).toBeGreaterThan(0);
    expect(delayedHarvestCount(seedHarvests)).toBeGreaterThan(0);
    expect(coloniesDueSoon(seedColonies, 8).length).toBeGreaterThanOrEqual(0);
  });
});

describe('default filters', () => {
  it('returns the full roster with default colony filters', () => {
    expect(filterColonies(seedColonies, DEFAULT_COLONY_FILTERS)).toHaveLength(seedColonies.length);
  });

  it('narrows harvests and haul-outs with status filters', () => {
    expect(
      filterHarvests(seedHarvests, {
        query: '',
        status: 'delayed',
        apiaryId: 'all',
        dateFrom: '',
        dateTo: '',
        sortBy: 'date',
        sortDirection: 'asc',
      }).every((harvest) => harvest.status === 'delayed'),
    ).toBe(true);

    expect(
      filterInspections(seedInspections, {
        query: '',
        type: 'all',
        status: 'overdue',
        apiaryId: 'all',
        sortBy: 'startDate',
        sortDirection: 'asc',
      }).every((record) => record.status === 'overdue'),
    ).toBe(true);
  });
});
