import React from 'react';
import SelectInput from './SelectInput';
import TextInput   from './TextInput';

export default function SummaryCard({ title, fields = [] }) {
  return (
    <div className="summary-card">
      <h4 className="summary-title">{title}</h4>
      <div className="summary-grid">
        {fields.map((f, i) => (
          <div key={i} className="summary-field">
            {f.type === 'select' ? (
              <SelectInput
                label={f.label}
                options={f.options}
                value={f.value}
                onChange={f.onChange}
                disabled={f.disabled}
              />
            ) : (
              <TextInput
                label={f.label}
                value={f.value}
                onChange={f.onChange}
                disabled={f.disabled}
                placeholder={f.placeholder}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}