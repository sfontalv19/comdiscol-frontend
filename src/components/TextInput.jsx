// src/components/TextInput.jsx
import React from 'react';

export default function TextInput({
  name,
  label,
  type = 'text',         // admite “text”, “number”, etc.
  list,                  // para el datalist (autocomplete)
  value,
  onChange,
  disabled = false,
  placeholder = '',
  ...rest                // para pasar cualquier otro atributo
}) {
  return (
    <div className="input-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        list={list}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
}
