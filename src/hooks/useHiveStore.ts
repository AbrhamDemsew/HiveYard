import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { DEFAULT_FEATURE_FLAGS, type FeatureFlag } from '../constants/featureFlags';
import { seedApiaries } from '../data/seedApiaries';
import { seedHarvests } from '../data/seedHarvests';
import { seedInspections } from '../data/seedInspections';
import { seedColonies } from '../data/seedColonies';
import type { Apiary, Harvest, Inspection, Colony } from '../types/hive';
import { nextSku } from '../utils/colonyUtils';
import { shortId } from '../utils/ids';

export interface HiveState {
  apiaries: Apiary[];
  colonies: Colony[];
  harvests: Harvest[];
  inspections: Inspection[];
  flags: FeatureFlag[];
}

const listeners = new Set<() => void>();

let state: HiveState = {
  apiaries: seedApiaries,
  colonies: seedColonies,
  harvests: seedHarvests,
  inspections: seedInspections,
  flags: DEFAULT_FEATURE_FLAGS,
};

function emit() {
  listeners.forEach((listener) => listener());
}

function setState(updater: (current: HiveState) => HiveState) {
  state = updater(state);
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

export function useHiveStore() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const addColony = useCallback((input: Omit<Colony, 'id' | 'sku'>) => {
    setState((current) => {
      const next: Colony = {
        ...input,
        id: shortId('col'),
        sku: nextSku(current.colonies),
      };
      return { ...current, colonies: [...current.colonies, next] };
    });
  }, []);

  const updateColony = useCallback((id: string, patch: Partial<Colony>) => {
    setState((current) => ({
      ...current,
      colonies: current.colonies.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  }, []);

  const deleteColony = useCallback((id: string) => {
    setState((current) => ({
      ...current,
      colonies: current.colonies.filter((item) => item.id !== id),
      harvests: current.harvests.filter((harvest) => harvest.colonyId !== id),
      inspections: current.inspections.filter((record) => record.colonyId !== id),
    }));
  }, []);

  const addHarvest = useCallback((input: Omit<Harvest, 'id'>) => {
    setState((current) => ({
      ...current,
      harvests: [...current.harvests, { ...input, id: shortId('hvt') }],
    }));
  }, []);

  const updateHarvest = useCallback((id: string, patch: Partial<Harvest>) => {
    setState((current) => ({
      ...current,
      harvests: current.harvests.map((harvest) => (harvest.id === id ? { ...harvest, ...patch } : harvest)),
    }));
  }, []);

  const deleteHarvest = useCallback((id: string) => {
    setState((current) => ({
      ...current,
      harvests: current.harvests.filter((harvest) => harvest.id !== id),
    }));
  }, []);

  const addInspection = useCallback((input: Omit<Inspection, 'id'>) => {
    setState((current) => ({
      ...current,
      inspections: [...current.inspections, { ...input, id: shortId('insp') }],
    }));
  }, []);

  const updateInspection = useCallback((id: string, patch: Partial<Inspection>) => {
    setState((current) => ({
      ...current,
      inspections: current.inspections.map((record) => (record.id === id ? { ...record, ...patch } : record)),
    }));
  }, []);

  const deleteInspection = useCallback((id: string) => {
    setState((current) => ({
      ...current,
      inspections: current.inspections.filter((record) => record.id !== id),
    }));
  }, []);

  const toggleFlag = useCallback((key: string) => {
    setState((current) => ({
      ...current,
      flags: current.flags.map((flag) => (flag.key === key ? { ...flag, enabled: !flag.enabled } : flag)),
    }));
  }, []);

  const resetArchive = useCallback(() => {
    setState(() => ({
      apiaries: seedApiaries,
      colonies: seedColonies,
      harvests: seedHarvests,
      inspections: seedInspections,
      flags: DEFAULT_FEATURE_FLAGS,
    }));
  }, []);

  return useMemo(
    () => ({
      ...snapshot,
      addColony,
      updateColony,
      deleteColony,
      addHarvest,
      updateHarvest,
      deleteHarvest,
      addInspection,
      updateInspection,
      deleteInspection,
      toggleFlag,
      resetArchive,
    }),
    [
      snapshot,
      addColony,
      updateColony,
      deleteColony,
      addHarvest,
      updateHarvest,
      deleteHarvest,
      addInspection,
      updateInspection,
      deleteInspection,
      toggleFlag,
      resetArchive,
    ],
  );
}

export function __resetHiveStoreForTests() {
  state = {
    apiaries: seedApiaries,
    colonies: seedColonies,
    harvests: seedHarvests,
    inspections: seedInspections,
    flags: DEFAULT_FEATURE_FLAGS,
  };
  emit();
}
