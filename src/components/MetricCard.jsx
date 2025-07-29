// src/components/MetricCard.jsx
import React from 'react';

export default function MetricCard({ title, value, details = [] }) {
  return (
    <div className="metric-card">
      <h4 className="metric-title">{title}</h4>
      <p className="metric-value">{value}</p>

      <div
        className="metric-details-grid"
        style={{ gridTemplateColumns: `repeat(${details.length}, 1fr)` }}
      >
        {details.map((d, i) => (
          <div key={i} className="detail-item">
            <div className="detail-label">{d.label}</div>
            <div className={`detail-value${d.highlight ? ' highlight' : ''}`}>
              {d.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
