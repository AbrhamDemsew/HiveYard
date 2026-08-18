import type { Colony, ColonyStatus } from '../types/hive';

export function nextSku(colonies: Colony[]): string {
  const max = colonies.reduce((current, item) => {
    const match = item.sku.match(/HY-(\d+)/);
    const value = match ? Number(match[1]) : 0;
    return Math.max(current, value);
  }, 0);
  return `HY-${String(max + 1).padStart(3, '0')}`;
}

export function canInspect(item: Colony): boolean {
  return item.status === 'draft' || item.status === 'cataloging';
}

export function statusTone(status: ColonyStatus): 'ok' | 'warn' | 'danger' | 'neutral' {
  switch (status) {
    case 'draft':
    case 'cataloging':
      return 'ok';
    case 'on_inspection':
    case 'displayed':
      return 'warn';
    case 'deaccessioned':
      return 'danger';
  }
}

export function keeperEmail(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '.')
    .replace(/^\.+|\.+$/g, '');
  return `${slug}@hiveyard.local`;
}
