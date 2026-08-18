export interface FeatureFlag {
  key: string;
  label: string;
  description: string;
  enabled: boolean;
}

export const DEFAULT_FEATURE_FLAGS: FeatureFlag[] = [
  {
    key: 'bulk-assign',
    label: 'Bulk yard assign',
    description: 'Allow registrars to move several draft colonies onto a apiary at once.',
    enabled: true,
  },
  {
    key: 'odometer-alerts',
    label: 'Case depth alerts',
    description: 'Highlight colonies that are within 8 inches of a case limit.',
    enabled: true,
  },
  {
    key: 'electric-priority',
    label: 'Ceramics first',
    description: 'Prefer ceramic pieces for overflow when a apiary is near capacity.',
    enabled: false,
  },
  {
    key: 'night-dispatch',
    label: 'Night rotation lane',
    description: 'Keep the overnight rotation lane visible on the archive board.',
    enabled: true,
  },
];

export const UI_COPY = {
  appName: 'HiveYard',
  tagline: 'Yard-to-colony apiary operations',
  emptyColonies: 'No colonies match the current yard filters.',
  emptyHarvests: 'No harvests match the current harvest filters.',
  emptyInspections: 'No inspections match the current inspection filters.',
  selectionStatus: (count: number) =>
    count === 0 ? 'No colonies selected' : `${count} ${count === 1 ? 'colony' : 'colonies'} selected`,
};
