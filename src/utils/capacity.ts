import type { Apiary, Colony } from '../types/hive';

export function apiaryLoad(apiary: Apiary, colonies: Colony[]): number {
  return colonies.filter((item) => item.apiaryId === apiary.id && item.status !== 'deaccessioned').length;
}

export function caseloadPercent(apiary: Apiary, colonies: Colony[]): number {
  if (apiary.capacity <= 0) return 0;
  return Math.min(100, Math.round((apiaryLoad(apiary, colonies) / apiary.capacity) * 100));
}

export function remainingCapacity(apiary: Apiary, colonies: Colony[]): number {
  return Math.max(0, apiary.capacity - apiaryLoad(apiary, colonies));
}

export function totalDailyValue(colonies: Colony[]): number {
  return colonies.reduce((sum, item) => sum + item.dayRate, 0);
}

export function availableDailyValue(colonies: Colony[]): number {
  return colonies
    .filter((item) => item.status === 'draft' || item.status === 'cataloging')
    .reduce((sum, item) => sum + item.dayRate, 0);
}
