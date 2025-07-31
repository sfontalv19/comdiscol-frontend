// src/sections/PricingSection.jsx
import React from 'react';
import { NumericFormat } from 'react-number-format';
import SelectInput from '../SelectInput';

export default function PricingSection({
  margenFijo, setMargenFijo,
  margenAjustado, setMargenAjustado,
  variacion, setVariacion,
  puVenta, setPuVenta,
  ptVenta, setPtVenta,
  valorVenta, setValorVenta
}) {
  return (
    <section className="section margin-price">
      {/* ——— Margen ——— */}
      <div className="summary-card">
        <h4 className="summary-title">Margen</h4>
        <div className="summary-grid">
          <div className="summary-field">
            <label>Margen Fijo</label>
            <SelectInput
              name="margenFijo"
              options={[
                { value: '15%', label: '15%' },
                { value: '20%', label: '20%' },
                { value: '25%', label: '25%' }
              ]}
              value={margenFijo}
              onChange={e => setMargenFijo(e.target.value)}
            />
          </div>
          <div className="summary-field">
            <label>Margen Ajustado</label>
            <SelectInput
              name="margenAjustado"
              options={[
                { value: '15%', label: '15%' },
                { value: '20%', label: '20%' },
                { value: '25%', label: '25%' }
              ]}
              value={margenAjustado}
              onChange={e => setMargenAjustado(e.target.value)}
            />
          </div>
          <div className="summary-field">
            <label>Variación</label>
            <SelectInput
              name="variacion"
              options={[
                { value: '-5%', label: '-5%' },
                { value: '-1%', label: '-1%' },
                { value: '0%',  label: '0%'  }
              ]}
              value={variacion}
              onChange={e => setVariacion(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ——— Precio de Venta ——— */}
      <div className="summary-card">
        <h4 className="summary-title">Precio de Venta</h4>
        <div className="summary-grid">
          <div className="summary-field">
            <label>P/U Antes de IVA</label>
            <NumericFormat
              customInput="input"
              className="tu-clase-css"
              value={puVenta}
              thousandSeparator
              prefix="$"
              onValueChange={v => setPuVenta(v.value)}
            />
          </div>
          <div className="summary-field">
            <label>P/T Antes de IVA</label>
            <NumericFormat
              customInput="input"
              className="tu-clase-css"
              value={ptVenta}
              thousandSeparator
              prefix="$"
              onValueChange={v => setPtVenta(v.value)}
            />
          </div>
          <div className="summary-field">
            <label>Valor Total</label>
            <NumericFormat
              customInput="input"
              className="tu-clase-css"
              value={valorVenta}
              thousandSeparator
              prefix="$"
              onValueChange={v => setValorVenta(v.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}