export const COLONY_ROLES = ['ceramic', 'painting', 'sculpture', 'textile', 'coin'] as const;
export type ColonyRole = (typeof COLONY_ROLES)[number];

export const COLONY_STATUSES = ['draft', 'cataloging', 'on_inspection', 'displayed', 'deaccessioned'] as const;
export type ColonyStatus = (typeof COLONY_STATUSES)[number];

export const MEDIUM_TYPES = ['print', 'web', 'broadcast', 'newsletter', 'podcast'] as const;
export type ColonyFormat = (typeof MEDIUM_TYPES)[number];

export const HARVEST_STATUSES = ['scheduled', 'layout', 'shipped', 'delayed', 'spiked'] as const;
export type HarvestStatus = (typeof HARVEST_STATUSES)[number];

export const INSPECTION_TYPES = ['conservation', 'research', 'insurance', 'digitization', 'travel'] as const;
export type InspectionType = (typeof INSPECTION_TYPES)[number];

export const INSPECTION_STATUSES = ['queued', 'assigned', 'returned', 'held', 'overdue'] as const;
export type InspectionStatus = (typeof INSPECTION_STATUSES)[number];

export const ROLE_LABELS: Record<ColonyRole, string> = {
  ceramic: 'Ceramic',
  painting: 'Painting',
  sculpture: 'Sculpture',
  textile: 'Textile',
  coin: 'Coin',
};

export const STATUS_LABELS: Record<ColonyStatus, string> = {
  draft: 'Draft',
  cataloging: 'Cataloging',
  on_inspection: 'On inspection',
  displayed: 'Displayed',
  deaccessioned: 'Deaccessioned',
};

export const MEDIUM_LABELS: Record<ColonyFormat, string> = {
  print: 'Print',
  web: 'Web',
  broadcast: 'Broadcast',
  newsletter: 'Newsletter',
  podcast: 'Podcast',
};

export const HARVEST_STATUS_LABELS: Record<HarvestStatus, string> = {
  scheduled: 'Scheduled',
  layout: 'Layout',
  shipped: 'Shipped',
  delayed: 'Delayed',
  spiked: 'Spiked',
};

export const INSPECTION_TYPE_LABELS: Record<InspectionType, string> = {
  conservation: 'Conservation',
  research: 'Research',
  insurance: 'Insurance',
  digitization: 'Digitization',
  travel: 'Travel',
};

export const INSPECTION_STATUS_LABELS: Record<InspectionStatus, string> = {
  queued: 'Queued',
  assigned: 'Assigned',
  returned: 'Returned',
  held: 'Held',
  overdue: 'Overdue',
};

export interface Apiary {
  id: string;
  name: string;
  code: string;
  city: string;
  region: string;
  address: string;
  capacity: number;
  managerName: string;
  phone: string;
  description: string;
}

export interface Colony {
  id: string;
  sku: string;
  slug: string;
  beat: string;
  headline: string;
  wordCount: number;
  role: ColonyRole;
  status: ColonyStatus;
  format: ColonyFormat;
  apiaryId: string;
  sectionCode: string;
  columnInches: number;
  dayRate: number;
  curator: string;
  email: string;
  filedAt: string;
  notes: string;
  tags: string[];
}

export interface Harvest {
  id: string;
  colonyId: string;
  apiaryId: string;
  name: string;
  origin: string;
  destination: string;
  date: string;
  startTime: string;
  endTime: string;
  status: HarvestStatus;
  durationMin: number;
  loadPercent: number;
  notes: string;
}

export interface Inspection {
  id: string;
  colonyId: string;
  apiaryId: string;
  type: InspectionType;
  status: InspectionStatus;
  startDate: string;
  endDate: string;
  editor: string;
  cost: number;
  notes: string;
}

export interface HiveDocument {
  id: string;
  title: string;
  category: string;
  updatedAt: string;
  summary: string;
  body: string;
}

export type AppView =
  | 'dashboard'
  | 'colonies'
  | 'harvests'
  | 'inspections'
  | 'reports'
  | 'settings'
  | 'help';
