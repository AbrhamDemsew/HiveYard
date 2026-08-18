import type { Apiary, Harvest, Colony } from '../../types/hive';
import { HARVEST_STATUS_LABELS } from '../../types/hive';
import { formatIsoDate, formatNumber, formatTime } from '../../utils/format';

interface HarvestTableProps {
  harvests: Harvest[];
  colonies: Colony[];
  apiaries: Apiary[];
  onEdit: (harvest: Harvest) => void;
  onDelete: (id: string) => void;
}

export function HarvestTable({ harvests, colonies, apiaries, onEdit, onDelete }: HarvestTableProps) {
  const colonyLabel = (id: string) => colonies.find((item) => item.id === id)?.sku ?? id;
  const apiaryName = (id: string) => apiaries.find((apiary) => apiary.id === id)?.name ?? id;

  return (
    <div className="table-wrap">
      <table className="data-table">
        <caption className="visually-hidden">Harvest arrivals</caption>
        <thead>
          <tr>
            <th scope="col">Harvest</th>
            <th scope="col">Colony</th>
            <th scope="col">Apiary</th>
            <th scope="col">Window</th>
            <th scope="col">Status</th>
            <th scope="col">Load</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {harvests.map((harvest) => (
            <tr key={harvest.id}>
              <td>
                <strong>{harvest.name}</strong>
                <div className="muted">{harvest.origin} → {harvest.destination}</div>
              </td>
              <td>{colonyLabel(harvest.colonyId)}</td>
              <td>{apiaryName(harvest.apiaryId)}</td>
              <td>{formatIsoDate(harvest.date)} {formatTime(harvest.startTime)}–{formatTime(harvest.endTime)}</td>
              <td>{HARVEST_STATUS_LABELS[harvest.status]}</td>
              <td>{harvest.loadPercent}% · {formatNumber(harvest.durationMin)} min</td>
              <td>
                <button type="button" className="button tiny" aria-label={`Edit ${harvest.name}`} onClick={() => onEdit(harvest)}>Edit</button>
                <button type="button" className="button tiny danger" aria-label={`Remove ${harvest.name}`} onClick={() => onDelete(harvest.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
