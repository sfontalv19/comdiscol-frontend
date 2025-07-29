import React from 'react';

export default function QuickActions({ actions = [] }) {
  return (
    <div className="quick-card">
      <h4 className="quick-title">Acciones rápidas</h4>
      <ul className="quick-list">
        {actions.map((a, i) => (
          <li key={i}>
            {/* Si el action tiene target, usamos <a> normal con target="_blank" */}
            {a.target === '_blank' ? (
              <a
                href={a.href}
                className="link-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                {a.label}
              </a>
            ) : (
              /* Si no, Link interno */
              <a href={a.href} className="link-sm">
                {a.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}