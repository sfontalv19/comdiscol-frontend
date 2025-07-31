// src/sections/MarginSection.jsx
import { NumericFormat } from 'react-number-format';
import SelectInput from '../SelectInput';

export default function MarginSection({
  margins, onMargins,
  prices,  onPrices
}) {
  const { margenFijo, margenAjustado, variacion } = margins;
  const { setMargenFijo, setMargenAjustado, setVariacion } = onMargins;
  const { puVenta, ptVenta, valorVenta } = prices;
  const { setPuVenta, setPtVenta, setValorVenta } = onPrices;

  return (
    <section className="section margin-price">
      <div className="summary-card">
        <h4 className="summary-title">Margen</h4>
        <div className="summary-grid">
          <div className="summary-field">
            <label>Margen Fijo</label>
            <SelectInput
              name="margenFijo"
              value={margenFijo}
              onChange={e=>setMargenFijo(e.target.value)}
              options={[{v:'15%',l:'15%'},{v:'20%',l:'20%'},{v:'25%',l:'25%'}]}
            />
          </div>
          {/* Ajustado y Variación igual */}
        </div>
      </div>

      <div className="summary-card">
        <h4 className="summary-title">Precio de Venta</h4>
        <div className="summary-grid">
          <div className="summary-field">
            <label>P/U Antes de IVA</label>
            <NumericFormat
              customInput="input"
              className="tu-clase-css"
              value={puVenta}
              thousandSeparator prefix="$"
              onValueChange={v=>setPuVenta(v.value)}
            />
          </div>
          {/* P/T y Total igual */}
        </div>
      </div>
    </section>
  );
}
