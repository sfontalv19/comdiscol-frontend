// src/sections/TermsSection.jsx
import React from 'react';
import TextInput from '../TextInput';
import SelectInput from '../SelectInput';

export default function TermsSection({
  validityNumber, validityUnit, onValidityNumber, onValidityUnit,
  deliveryNumber, deliveryUnit, onDeliveryNumber, onDeliveryUnit,
  warrantyNumber, warrantyUnit, onWarrantyNumber, onWarrantyUnit,
  paymentMethod, onPaymentMethod
}) {
  return (
    <section className="section client-info">
      <div className="field validity-field">
        <label>Validez de la Oferta</label>
        <div className="number-unit-group">
          <TextInput
            name="validityNumber"
            type="number"
            value={validityNumber}
            onChange={e => onValidityNumber(e.target.value)}
          />
          <SelectInput
            name="validityUnit"
            options={[
              { value: 'días',   label: 'días' },
              { value: 'meses',  label: 'meses' }
            ]}
            value={validityUnit}
            onChange={e => onValidityUnit(e.target.value)}
          />
        </div>
      </div>

      <div className="field delivery-field">
        <label>Tiempo de entrega</label>
        <div className="number-unit-group">
          <TextInput
            name="deliveryNumber"
            type="number"
            value={deliveryNumber}
            onChange={e => onDeliveryNumber(e.target.value)}
          />
          <SelectInput
            name="deliveryUnit"
            options={[
              { value: 'días',  label: 'días' },
              { value: 'meses', label: 'meses' }
            ]}
            value={deliveryUnit}
            onChange={e => onDeliveryUnit(e.target.value)}
          />
        </div>
      </div>

      <div className="field warranty-field">
        <label>Garantía</label>
        <div className="number-unit-group">
          <TextInput
            name="warrantyNumber"
            type="number"
            value={warrantyNumber}
            onChange={e => onWarrantyNumber(e.target.value)}
          />
          <SelectInput
            name="warrantyUnit"
            options={[
              { value: 'meses', label: 'meses' },
              { value: 'años',  label: 'años' }
            ]}
            value={warrantyUnit}
            onChange={e => onWarrantyUnit(e.target.value)}
          />
        </div>
      </div>

      <div className="field payment-field">
        <SelectInput
          name="paymentMethod"
          label="Forma de pago"
          options={[
            { value: 'Contado',      label: 'Contado' },
            { value: 'Crédito',      label: 'Crédito' },
            { value: 'Transferencia',label: 'Transferencia' }
          ]}
          value={paymentMethod}
          onChange={e => onPaymentMethod(e.target.value)}
        />
      </div>
    </section>
  );
}
