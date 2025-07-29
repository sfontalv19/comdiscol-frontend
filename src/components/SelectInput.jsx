import React from 'react';

export default function SelectInput({
  name,
  label,
  options = [],
  value,
  onChange,
  disabled = false,
  ...rest
}) {
  return (
    <div className="select-input">
      {label && <label htmlFor={name}>{label}</label>}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      >
        <option value="" disabled>– selecciona –</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
