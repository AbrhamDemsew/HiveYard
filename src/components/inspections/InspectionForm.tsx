import { useState } from 'react';
import type { Apiary, Inspection, InspectionStatus, InspectionType, Colony } from '../../types/hive';
import { INSPECTION_STATUS_LABELS, INSPECTION_STATUSES, INSPECTION_TYPE_LABELS, INSPECTION_TYPES } from '../../types/hive';

interface InspectionFormProps {
  apiaries: Apiary[];
  colonies: Colony[];
  initial?: Inspection | null;
  onCancel: () => void;
  onSubmit: (value: Omit<Inspection, 'id'> & { id?: string }) => void;
}

export function InspectionForm({ apiaries, colonies, initial, onCancel, onSubmit }: InspectionFormProps) {
  const [colonyId, setColonyId] = useState(initial?.colonyId ?? colonies[0]?.id ?? '');
  const [apiaryId, setApiaryId] = useState(initial?.apiaryId ?? apiaries[0]?.id ?? '');
  const [type, setType] = useState<InspectionType>(initial?.type ?? 'conservation');
  const [status, setStatus] = useState<InspectionStatus>(initial?.status ?? 'queued');
  const [startDate, setStartDate] = useState(initial?.startDate ?? '2026-07-01');
  const [endDate, setEndDate] = useState(initial?.endDate ?? '2026-07-08');
  const [editor, setEditor] = useState(initial?.editor ?? 'Metro Editor');
  const [cost, setCost] = useState(initial?.cost ?? 400);
  const [notes, setNotes] = useState(initial?.notes ?? '');

  return (
    <form
      className="panel-form"
      aria-label={initial ? 'Edit inspection' : 'Add inspection'}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({
          id: initial?.id, colonyId, apiaryId, type, status, startDate, endDate, editor, cost: Number(cost), notes,
        });
      }}
    >
      <div className="form-grid">
        <div className="field">
          <label htmlFor="insp-colony">Colony</label>
          <select id="insp-colony" value={colonyId} onChange={(event) => setColonyId(event.target.value)}>
            {colonies.map((item) => (<option key={item.id} value={item.id}>{item.sku}</option>))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="insp-apiary-form">Apiary</label>
          <select id="insp-apiary-form" value={apiaryId} onChange={(event) => setApiaryId(event.target.value)}>
            {apiaries.map((apiary) => (<option key={apiary.id} value={apiary.id}>{apiary.name}</option>))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="insp-type-form">Type</label>
          <select id="insp-type-form" value={type} onChange={(event) => setType(event.target.value as InspectionType)}>
            {INSPECTION_TYPES.map((item) => (<option key={item} value={item}>{INSPECTION_TYPE_LABELS[item]}</option>))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="insp-status-form">Status</label>
          <select id="insp-status-form" value={status} onChange={(event) => setStatus(event.target.value as InspectionStatus)}>
            {INSPECTION_STATUSES.map((item) => (<option key={item} value={item}>{INSPECTION_STATUS_LABELS[item]}</option>))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="insp-start">Start</label>
          <input id="insp-start" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="insp-end">End</label>
          <input id="insp-end" type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="insp-editor">Editor</label>
          <input id="insp-editor" value={editor} onChange={(event) => setEditor(event.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="insp-cost">Cost</label>
          <input id="insp-cost" type="number" min={0} value={cost} onChange={(event) => setCost(Number(event.target.value))} />
        </div>
        <div className="field field-span">
          <label htmlFor="insp-notes">Notes</label>
          <textarea id="insp-notes" rows={3} value={notes} onChange={(event) => setNotes(event.target.value)} />
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="button ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="button">{initial ? 'Save inspection' : 'Add inspection'}</button>
      </div>
    </form>
  );
}
