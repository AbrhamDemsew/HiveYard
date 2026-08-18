import type { Apiary, Harvest, Inspection, Colony, ColonyStatus } from '../types/hive';

export interface StatusCount {
  status: ColonyStatus;
  count: number;
}

export function countByStatus(colonies: Colony[]): StatusCount[] {
  const counts: Record<ColonyStatus, number> = {
    draft: 0,
    cataloging: 0,
    on_inspection: 0,
    displayed: 0,
    deaccessioned: 0,
  };
  for (const item of colonies) {
    counts[item.status] += 1;
  }
  return (Object.keys(counts) as ColonyStatus[]).map((status) => ({
    status,
    count: counts[status],
  }));
}

export function utilizationRate(colonies: Colony[]): number {
  if (colonies.length === 0) return 0;
  const working = colonies.filter((item) => item.status === 'draft' || item.status === 'cataloging').length;
  return Math.round((working / colonies.length) * 100);
}

export function averageLoad(harvests: Harvest[]): number {
  const live = harvests.filter((harvest) => harvest.status !== 'spiked');
  if (live.length === 0) return 0;
  return Math.round(live.reduce((sum, harvest) => sum + harvest.loadPercent, 0) / live.length);
}

export function inspectionBacklog(records: Inspection[]): number {
  return records.filter(
    (record) => record.status === 'queued' || record.status === 'overdue' || record.status === 'assigned',
  ).length;
}

export function inspectionCost(records: Inspection[]): number {
  return records.reduce((sum, record) => sum + record.cost, 0);
}

export function apiarySummary(apiaries: Apiary[], colonies: Colony[]) {
  return apiaries.map((apiary) => {
    const assigned = colonies.filter((item) => item.apiaryId === apiary.id);
    return {
      apiary,
      assigned: assigned.length,
      idle: assigned.filter((item) => item.status === 'displayed').length,
      inShop: assigned.filter((item) => item.status === 'on_inspection').length,
    };
  });
}

export function delayedHarvestCount(harvests: Harvest[]): number {
  return harvests.filter((harvest) => harvest.status === 'delayed').length;
}
