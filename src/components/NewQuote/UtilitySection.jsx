// src/sections/UtilitySection.jsx
import React from 'react';
import SelectInput from '../SelectInput';
import { NumericFormat } from 'react-number-format';

export default function UtilitySection({ utility, onUtilityChange }) {
  return (
    <div className="utility-block">
      <h4 className="section-label">Utilidad del Producto</h4>
      <div className="utility-grid">
        <div className="utility-field">
          <label>Utilidad por Unidad</label>
          <NumericFormat
            customInput="input"
            className="tu-clase-css"
            value={utility.porUnidad}
            thousandSeparator prefix="$"
            onValueChange={v=>onUtilityChange({ target:{ name:'porUnidad', value:v.value }})}
          />
        </div>
        <div className="utility-field">
          <label>Margen Bruto</label>
          <SelectInput
            name="margenBruto"
            value={utility.margenBruto}
            onChange={onUtilityChange}
            options={[
              { value:'10%',label:'10%' },
              { value:'15%',label:'15%' },
              { value:'20%',label:'20%' }
            ]}
          />
        </div>
      </div>
      <div className="utility-field">
        <label>Utilidad Total</label>
        <NumericFormat
          customInput="input"
          className="tu-clase-css"
          value={utility.total}
          thousandSeparator prefix="$"
          onValueChange={v=>onUtilityChange({ target:{ name:'total', value:v.value }})}
        />
      </div>
    </div>
  );
}
