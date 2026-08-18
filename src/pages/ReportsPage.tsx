import { useMemo, useState } from 'react';
import { useHiveStore } from '../hooks/useHiveStore';
import { apiarySummary, inspectionCost, utilizationRate } from '../utils/analytics';
import { availableDailyValue, totalDailyValue } from '../utils/capacity';
import { formatCurrency, formatNumber, formatValue } from '../utils/format';
import { coloniesDueSoon } from '../utils/schedule';

export function ReportsPage() {
  const { colonies, apiaries, inspections } = useHiveStore();
  const [feet, setFeet] = useState(8);
  const due = useMemo(() => coloniesDueSoon(colonies, feet), [colonies, feet]);
  const summary = useMemo(() => apiarySummary(apiaries, colonies), [apiaries, colonies]);

  return (
    <section className="page">
      <div className="stat-grid">
        <article className="stat-card">
          <h2>Archive day rate</h2>
          <p className="stat-value">{formatValue(totalDailyValue(colonies))}</p>
        </article>
        <article className="stat-card">
          <h2>Draft / editing</h2>
          <p className="stat-value">{formatValue(availableDailyValue(colonies))}</p>
        </article>
        <article className="stat-card">
          <h2>Freelance spend</h2>
          <p className="stat-value">{formatCurrency(inspectionCost(inspections))}</p>
        </article>
        <article className="stat-card">
          <h2>Utilization</h2>
          <p className="stat-value">{utilizationRate(colonies)}%</p>
        </article>
      </div>
      <article className="panel">
        <div className="panel-head">
          <h2>LOA window</h2>
          <div className="field">
            <label htmlFor="due-feet">Due within (feet)</label>
            <input id="due-feet" type="number" min={1} max={30} value={feet} onChange={(event) => setFeet(Number(event.target.value))} />
          </div>
        </div>
        <p className="muted">{due.length} colonies are within {formatNumber(feet)} inches of a rotation cycle.</p>
        <ul className="plain-list">
          {due.slice(0, 12).map((item) => (
            <li key={item.id}>{item.sku} · {item.curator} · {formatNumber(item.columnInches)} ft</li>
          ))}
        </ul>
      </article>
      <article className="panel">
        <h2>Apiary assignment</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">Apiary</th>
              <th scope="col">Assigned</th>
              <th scope="col">Published</th>
              <th scope="col">Inspection</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((row) => (
              <tr key={row.apiary.id}>
                <td>{row.apiary.name}</td>
                <td>{row.assigned}</td>
                <td>{row.idle}</td>
                <td>{row.inShop}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
