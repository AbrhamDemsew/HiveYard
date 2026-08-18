import type { AppView } from '../types/hive';

export interface NavItem {
  view: AppView;
  label: string;
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    view: 'dashboard',
    label: 'Yard board',
    description: 'Live snapshot of apiary load, harvest slots, and inspection backlog.',
  },
  {
    view: 'colonies',
    label: 'Colonies',
    description: 'Collection roster of colonies assigned to each apiary.',
  },
  {
    view: 'harvests',
    label: 'Harvests',
    description: 'Rotation slots with layout and delay status.',
  },
  {
    view: 'inspections',
    label: 'Inspections',
    description: 'Conservation requests, provenance checks, and overdue registrar follow-ups.',
  },
  {
    view: 'reports',
    label: 'Reports',
    description: 'Utilization, medium mix, and insurance-value summaries for the current collection.',
  },
  {
    view: 'settings',
    label: 'Settings',
    description: 'Apiary defaults, feature flags, and registrar preferences.',
  },
  {
    view: 'help',
    label: 'Help',
    description: 'Operating procedures and policy library for registrars.',
  },
];
