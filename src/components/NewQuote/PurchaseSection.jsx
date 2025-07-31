// src/sections/PurchaseSection.jsx
import { NumericFormat } from 'react-number-format';
import SelectInput from '../SelectInput';
import TextInput from '../TextInput';

export default function PurchaseSection({ purchase, onPurchaseChange }) {
  return (
    <section className="section pricing">
      <h4 className="section-label">Precio de compra</h4>
      <div className="purchase-grid">
        <TextInput
          name="proveedor"
          label="Proveedor"
          value={purchase.proveedor}
          onChange={onPurchaseChange}
        />
        <SelectInput
          name="tiempoEntrega"
          label="Tiempo de Entrega"
          options={[{ value:'Inmediata', label:'Inmediata' }]}
          value={purchase.tiempoEntrega}
          onChange={onPurchaseChange}
        />
        <SelectInput
          name="fleteProv"
          label="Flete proveedor"
          options={[{ value:'15%',label:'15%'},{value:'20%',label:'20%'}]}
          value={purchase.fleteProv}
          onChange={onPurchaseChange}
        />
        <SelectInput
          name="ivaProv"
          label="IVA proveedor"
          options={[{ value:'19%',label:'19%'},{value:'5%',label:'5%'}]}
          value={purchase.ivaProv}
          onChange={onPurchaseChange}
        />
        <SelectInput
          name="monedaCliente"
          label="Moneda Cliente"
          options={[{ value:'COP',label:'COP'},{value:'USD',label:'USD'}]}
          value={purchase.monedaCliente}
          onChange={onPurchaseChange}
        />
        <NumericFormat
          name="puAntesIva"
          label="P/U Antes de IVA"
          customInput={TextInput}
          value={purchase.puAntesIva}
          thousandSeparator prefix="$"
          onValueChange={v=>onPurchaseChange({ target:{ name:'puAntesIva', value:v.value } })}
        />
        {/* …y lo mismo para cuAntesIva, ctAntesIva, valorTotal… */}
      </div>
    </section>
  );
}
