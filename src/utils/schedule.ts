import type { Harvest, Colony } from '../types/hive';

export function minutesBetween(startTime: string, endTime: string): number {
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);
  return endH * 60 + endM - (startH * 60 + startM);
}

export function overlappingHarvests(a: Harvest, b: Harvest): boolean {
  if (a.colonyId !== b.colonyId || a.date !== b.date || a.id === b.id) return false;
  if (a.status === 'spiked' || b.status === 'spiked') return false;
  return a.startTime < b.endTime && b.startTime < a.endTime;
}

export function coloniesDueSoon(colonies: Colony[], withinFeet: number, cycleEvery = 30): Colony[] {
  return colonies.filter((item) => {
    const remainder = item.columnInches % cycleEvery;
    return cycleEvery - remainder <= withinFeet;
  });
}
