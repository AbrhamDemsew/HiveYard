import { useState } from 'react';
import type { Apiary, ColonyFormat, Colony, ColonyRole, ColonyStatus } from '../../types/hive';
import {
  MEDIUM_LABELS,
  MEDIUM_TYPES,
  ROLE_LABELS,
  STATUS_LABELS,
  COLONY_ROLES,
  COLONY_STATUSES,
} from '../../types/hive';
import { keeperEmail } from '../../utils/colonyUtils';

interface ColonyFormProps {
  apiaries: Apiary[];
  initial?: Colony | null;
  onCancel: () => void;
  onSubmit: (value: Omit<Colony, 'id' | 'sku'> & { id?: string; sku?: string }) => void;
}

export function ColonyForm({ apiaries, initial, onCancel, onSubmit }: ColonyFormProps) {
  const [beat, setHomePort] = useState(initial?.beat ?? 'Seattle');
  const [headline, setColonyName] = useState(initial?.headline ?? '');
  const [wordCount, setYearBuilt] = useState(initial?.wordCount ?? 2018);
  const [role, setRole] = useState<ColonyRole>(initial?.role ?? 'ceramic');
  const [status, setStatus] = useState<ColonyStatus>(initial?.status ?? 'draft');
  const [format, setColonyFormat] = useState<ColonyFormat>(initial?.format ?? 'print');
  const [apiaryId, setApiaryId] = useState(initial?.apiaryId ?? apiaries[0]?.id ?? '');
  const [sectionCode, setSlipCode] = useState(initial?.sectionCode ?? '');
  const [columnInches, setLoaFeet] = useState(initial?.columnInches ?? 36);
  const [dayRate, setDailyRate] = useState(initial?.dayRate ?? 85);
  const [curator, setCurator] = useState(initial?.curator ?? '');
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [slug, setRegistryCode] = useState(initial?.slug ?? '');

  return (
    <form
      className="panel-form"
      aria-label={initial ? 'Edit colony' : 'Add colony'}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({
          id: initial?.id,
          sku: initial?.sku,
          beat,
          headline,
          wordCount: Number(wordCount),
          role,
          status,
          format,
          apiaryId,
          sectionCode,
          columnInches: Number(columnInches),
          dayRate: Number(dayRate),
          curator,
          email: keeperEmail(curator || 'unassigned'),
          filedAt: initial?.filedAt ?? new Date().toISOString().slice(0, 10),
          notes,
          slug,
          tags: initial?.tags ?? ['manual'],
        });
      }}
    >
      <div className="form-grid">
        <div className="field">
          <label htmlFor="colony-port">Beat</label>
          <input id="colony-port" value={beat} onChange={(event) => setHomePort(event.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="colony-name">Colony name</label>
          <input id="colony-name" value={headline} onChange={(event) => setColonyName(event.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="colony-year">Year built</label>
          <input id="colony-year" type="number" min={1970} max={2030} value={wordCount} onChange={(event) => setYearBuilt(Number(event.target.value))} required />
        </div>
        <div className="field">
          <label htmlFor="colony-registry">Registry code</label>
          <input id="colony-registry" value={slug} onChange={(event) => setRegistryCode(event.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="colony-role-form">Class</label>
          <select id="colony-role-form" value={role} onChange={(event) => setRole(event.target.value as ColonyRole)}>
            {COLONY_ROLES.map((item) => (
              <option key={item} value={item}>{ROLE_LABELS[item]}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="colony-status-form">Status</label>
          <select id="colony-status-form" value={status} onChange={(event) => setStatus(event.target.value as ColonyStatus)}>
            {COLONY_STATUSES.map((item) => (
              <option key={item} value={item}>{STATUS_LABELS[item]}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="colony-hull-form">Hull</label>
          <select id="colony-hull-form" value={format} onChange={(event) => setColonyFormat(event.target.value as ColonyFormat)}>
            {MEDIUM_TYPES.map((item) => (
              <option key={item} value={item}>{MEDIUM_LABELS[item]}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="colony-apiary-form">Apiary</label>
          <select id="colony-apiary-form" value={apiaryId} onChange={(event) => setApiaryId(event.target.value)}>
            {apiaries.map((apiary) => (
              <option key={apiary.id} value={apiary.id}>{apiary.name}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="colony-slip">Slip code</label>
          <input id="colony-slip" value={sectionCode} onChange={(event) => setSlipCode(event.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="colony-loa">LOA (ft)</label>
          <input id="colony-loa" type="number" min={0} value={columnInches} onChange={(event) => setLoaFeet(Number(event.target.value))} />
        </div>
        <div className="field">
          <label htmlFor="colony-rate">Daily rate</label>
          <input id="colony-rate" type="number" min={0} value={dayRate} onChange={(event) => setDailyRate(Number(event.target.value))} />
        </div>
        <div className="field">
          <label htmlFor="colony-curator">Curator</label>
          <input id="colony-curator" value={curator} onChange={(event) => setCurator(event.target.value)} required />
        </div>
        <div className="field field-span">
          <label htmlFor="colony-notes">Notes</label>
          <textarea id="colony-notes" value={notes} onChange={(event) => setNotes(event.target.value)} rows={3} />
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="button ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="button">{initial ? 'Save colony' : 'Add colony'}</button>
      </div>
    </form>
  );
}
