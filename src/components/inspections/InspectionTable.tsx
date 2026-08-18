import type { Apiary, Inspection, Colony } from '../../types/hive';
import { INSPECTION_STATUS_LABELS, INSPECTION_TYPE_LABELS } from '../../types/hive';
import { formatCurrency, formatIsoDate } from '../../utils/format';

interface InspectionTableProps {
  records: Inspection[];
  colonies: Colony[];
  apiaries: Apiary[];
  onEdit: (record: Inspection) => void;
  onDelete: (id: string) => void;
}

export function InspectionTable({ records, colonies, apiaries, onEdit, onDelete }: InspectionTableProps) {
  const colonyLabel = (id: string) => colonies.find((item) => item.id === id)?.sku ?? id;
  const apiaryName = (id: string) => apiaries.find((apiary) => apiary.id === id)?.name ?? id;

  return (
    <div className="table-wrap">
      <table className="data-table">
        <caption className="visually-hidden">Inspection tickets</caption>
        <thead>
          <tr>
            <th scope="col">Inspection</th>
            <th scope="col">Colony</th>
            <th scope="col">Apiary</th>
            <th scope="col">Window</th>
            <th scope="col">Status</th>
            <th scope="col">Cost</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>
                <strong>{INSPECTION_TYPE_LABELS[record.type]}</strong>
                <div className="muted">{record.editor}</div>
              </td>
              <td>{colonyLabel(record.colonyId)}</td>
              <td>{apiaryName(record.apiaryId)}</td>
              <td>{formatIsoDate(record.startDate)} – {formatIsoDate(record.endDate)}</td>
              <td>{INSPECTION_STATUS_LABELS[record.status]}</td>
              <td>{formatCurrency(record.cost)}</td>
              <td>
                <button type="button" className="button tiny" aria-label={`Edit ${INSPECTION_TYPE_LABELS[record.type]} for ${colonyLabel(record.colonyId)}`} onClick={() => onEdit(record)}>Edit</button>
                <button type="button" className="button tiny danger" aria-label={`Remove ${INSPECTION_TYPE_LABELS[record.type]} for ${colonyLabel(record.colonyId)}`} onClick={() => onDelete(record.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
