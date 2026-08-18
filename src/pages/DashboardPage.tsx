import { useMemo, useState } from 'react';
import { caseloadPercent } from '../utils/capacity';
import { averageLoad, countByStatus, delayedHarvestCount, inspectionBacklog, utilizationRate } from '../utils/analytics';
import { STATUS_LABELS } from '../types/hive';
import { useHiveStore } from '../hooks/useHiveStore';
import { formatNumber } from '../utils/format';

export function DashboardPage() {
  const { colonies, apiaries, harvests, inspections } = useHiveStore();
  const [query, setQuery] = useState('');
  const statusCounts = useMemo(() => countByStatus(colonies), [colonies]);
  const apiariesInView = useMemo(
    () => apiaries.filter((apiary) => apiary.name.toLowerCase().includes(query.toLowerCase())),
    [apiaries, query],
  );

  return (
    <section className="page">
      <div className="stat-grid">
        <article className="stat-card">
          <h2>Utilization</h2>
          <p className="stat-value">{utilizationRate(colonies)}%</p>
          <p className="muted">Draft and editing copy versus the whole book.</p>
        </article>
        <article className="stat-card">
          <h2>Average arrival load</h2>
          <p className="stat-value">{averageLoad(harvests)}%</p>
          <p className="muted">Mean slot load across non-spiked harvests.</p>
        </article>
        <article className="stat-card">
          <h2>Inspection backlog</h2>
          <p className="stat-value">{formatNumber(inspectionBacklog(inspections))}</p>
          <p className="muted">Queued, overdue, or assigned editor work.</p>
        </article>
        <article className="stat-card">
          <h2>Delayed harvests</h2>
          <p className="stat-value">{delayedHarvestCount(harvests)}</p>
          <p className="muted">Arrivals currently marked delayed on the board.</p>
        </article>
      </div>
      <div className="split">
        <article className="panel">
          <h2>Status mix</h2>
          <ul className="status-list">
            {statusCounts.map((row) => (
              <li key={row.status}>
                <span>{STATUS_LABELS[row.status]}</span>
                <strong>{row.count}</strong>
              </li>
            ))}
          </ul>
        </article>
        <article className="panel">
          <div className="panel-head">
            <h2>Apiary load</h2>
            <div className="field">
              <label htmlFor="yrd-search">Find apiary</label>
              <input id="yrd-search" value={query} onChange={(event) => setQuery(event.target.value)} />
            </div>
          </div>
          <ul className="occupancy-list">
            {apiariesInView.map((apiary) => {
              const percent = caseloadPercent(apiary, colonies);
              return (
                <li key={apiary.id}>
                  <div>
                    <strong>{apiary.name}</strong>
                    <p className="muted">{apiary.city} · {apiary.code}</p>
                  </div>
                  <div className="meter" aria-label={`${apiary.name} occupancy ${percent} percent`}>
                    <span style={{ width: `${percent}%` }} />
                  </div>
                  <span>{percent}%</span>
                </li>
              );
            })}
          </ul>
        </article>
      </div>
    </section>
  );
}
