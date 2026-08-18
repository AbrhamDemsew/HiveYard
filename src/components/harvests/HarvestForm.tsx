import { useState } from 'react';
import type { Apiary, Harvest, HarvestStatus, Colony } from '../../types/hive';
import { HARVEST_STATUS_LABELS, HARVEST_STATUSES } from '../../types/hive';

interface HarvestFormProps {
  apiaries: Apiary[];
  colonies: Colony[];
  initial?: Harvest | null;
  onCancel: () => void;
  onSubmit: (value: Omit<Harvest, 'id'> & { id?: string }) => void;
}

export function HarvestForm({ apiaries, colonies, initial, onCancel, onSubmit }: HarvestFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [colonyId, setColonyId] = useState(initial?.colonyId ?? colonies[0]?.id ?? '');
  const [apiaryId, setApiaryId] = useState(initial?.apiaryId ?? apiaries[0]?.id ?? '');
  const [origin, setOrigin] = useState(initial?.origin ?? '');
  const [destination, setDestination] = useState(initial?.destination ?? '');
  const [date, setDate] = useState(initial?.date ?? '2026-06-01');
  const [startTime, setStartTime] = useState(initial?.startTime ?? '07:00');
  const [endTime, setEndTime] = useState(initial?.endTime ?? '09:00');
  const [status, setStatus] = useState<HarvestStatus>(initial?.status ?? 'scheduled');
  const [durationMin, setDurationMin] = useState(initial?.durationMin ?? 90);
  const [loadPercent, setLoadPercent] = useState(initial?.loadPercent ?? 70);
  const [notes, setNotes] = useState(initial?.notes ?? '');

  return (
    <form
      className="panel-form"
      aria-label={initial ? 'Edit harvest' : 'Add harvest'}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({
          id: initial?.id, name, colonyId, apiaryId, origin, destination, date, startTime, endTime, status,
          durationMin: Number(durationMin), loadPercent: Number(loadPercent), notes,
        });
      }}
    >
      <div className="form-grid">
        <div className="field field-span">
          <label htmlFor="hvt-name">Harvest name</label>
          <input id="hvt-name" value={name} onChange={(event) => setName(event.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="hvt-colony">Colony</label>
          <select id="hvt-colony" value={colonyId} onChange={(event) => setColonyId(event.target.value)}>
            {colonies.map((item) => (<option key={item.id} value={item.id}>{item.sku}</option>))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="hvt-apiary-form">Apiary</label>
          <select id="hvt-apiary-form" value={apiaryId} onChange={(event) => setApiaryId(event.target.value)}>
            {apiaries.map((apiary) => (<option key={apiary.id} value={apiary.id}>{apiary.name}</option>))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="hvt-origin">From</label>
          <input id="hvt-origin" value={origin} onChange={(event) => setOrigin(event.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="hvt-dest">To</label>
          <input id="hvt-dest" value={destination} onChange={(event) => setDestination(event.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="hvt-date">Date</label>
          <input id="hvt-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="hvt-start">Start</label>
          <input id="hvt-start" type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="hvt-end">End</label>
          <input id="hvt-end" type="time" value={endTime} onChange={(event) => setEndTime(event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="hvt-status-form">Status</label>
          <select id="hvt-status-form" value={status} onChange={(event) => setStatus(event.target.value as HarvestStatus)}>
            {HARVEST_STATUSES.map((item) => (<option key={item} value={item}>{HARVEST_STATUS_LABELS[item]}</option>))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="hvt-min">Duration (min)</label>
          <input id="hvt-min" type="number" min={1} value={durationMin} onChange={(event) => setDurationMin(Number(event.target.value))} />
        </div>
        <div className="field">
          <label htmlFor="hvt-load">Load %</label>
          <input id="hvt-load" type="number" min={0} max={100} value={loadPercent} onChange={(event) => setLoadPercent(Number(event.target.value))} />
        </div>
        <div className="field field-span">
          <label htmlFor="hvt-notes">Notes</label>
          <textarea id="hvt-notes" rows={3} value={notes} onChange={(event) => setNotes(event.target.value)} />
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="button ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="button">{initial ? 'Save harvest' : 'Add harvest'}</button>
      </div>
    </form>
  );
}
