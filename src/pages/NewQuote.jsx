// src/pages/NewQuote.jsx
import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import Sidebar      from '../components/Sidebar';
import Header       from '../components/Header';
import PageTitle    from '../components/PageTitle';
import Button       from '../components/Button';
import SelectInput  from '../components/SelectInput';
import TextInput    from '../components/TextInput';
import DataTable    from '../components/DataTable';
import '../styles/newQuotes.css';



 // ——— Datos de tabla de producto ———
  const productColumns = [
    { field: 'sku',            header: 'SKU' },
    { field: 'desc',           header: 'Descripción' },
    { field: 'categoria',      header: 'Categoría' },
    { field: 'marca',          header: 'Marca' },
    { field: 'cantidad',       header: 'Cantidad' },
    { field: 'medida',         header: 'Medida' },
    { field: 'moneda_cliente', header: 'Moneda Cliente' },
    { field: 'flete_cliente',  header: 'Flete Cliente' },
    { field: 'iva_cliente',    header: 'IVA Cliente' }
  ];
 
// ——— Estado inicial de productos ———
  const initialProductData = [
    {
      sku: 'XGH6K4Z',
      desc: 'RTX 5090 OC 12GB',
      categoria: 'Hardware',
      marca: 'ASUS',
      cantidad: 2,
      medida: 'Und',
      moneda_cliente: 'COP',
      flete_cliente: '15%',
      iva_cliente: '19%'
    }
  ];

export default function NewQuote() {
  // ——— Cliente y configuración ———
  const [client, setClient]               = useState('');
  const [validityNumber, setValidityNum]  = useState(30);
  const [validityUnit, setValidityUnit]   = useState('días');
  const [deliveryNumber, setDeliveryNum]  = useState(2);
  const [deliveryUnit, setDeliveryUnit]   = useState('días');
  const [warrantyNumber, setWarrantyNum]  = useState(12);
  const [warrantyUnit, setWarrantyUnit]   = useState('meses');
  const [paymentMethod, setPaymentMethod] = useState('Contado');

  // ——— Precio de Compra ———
  const [purchase, setPurchase] = useState({
    proveedor:     '',
    tiempoEntrega: '',
    fleteProv:     '',
    ivaProv:       '',
    monedaCliente: '',
    puAntesIva:    '',
    cuAntesIva:    '',
    ctAntesIva:    '',
    valorTotal:    ''
  });
  const handlePurchaseChange = e => {
    const { name, value } = e.target;
    setPurchase(prev => ({ ...prev, [name]: value }));
  };


 

  // ——— Utilidad del Producto ———
  const [utility, setUtility] = useState({
    porUnidad:   '',
    margenBruto: '',
    total:       ''
  });



  // ——— Datos de Contacto ———
const [contactData, setContactData] = useState({
    nit: '1234456',
    ciudad: 'Cartagena',
    telefono: '303 456 88 00'
  });

const handleContactChange = e => {
  const { name, value } = e.target;
  setContactData(prev => ({ ...prev, [name]: value }));
};



  const [products, setProducts] = useState(initialProductData);

  const handleProductChange = (rowIndex, field, value) => {
  setProducts(prev =>
    prev.map((item, i) =>
      i === rowIndex
        ? {
            ...item,
            [field]:
              field === 'cantidad'
                ? parseInt(value, 10) || 0
                : value
          }
        : item
    )
  );
};


  // ——— Margen y Precio de Venta ———
  const [margenFijo,     setMargenFijo]     = useState('15%');
  const [margenAjustado, setMargenAjustado] = useState('15%');
  const [variacion,      setVariacion]      = useState('-1%');
  const [puVenta,        setPuVenta]        = useState('');
  const [ptVenta,        setPtVenta]        = useState('');
  const [valorVenta,     setValorVenta]     = useState('');

  // ——— Fecha formateada ———
  const today = new Date(2025, 9, 11).toLocaleDateString();

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header user="Sergio Fontalvo" />

        {/* Page Header */}
        <div className="page-header">
          <PageTitle text="Nueva Cotización" subtitle={`Fecha: ${today}`} />
          <div className="actions">
            <Button>Guardar Cotización</Button>
            <Button variant="text">Cancelar</Button>
          </div>
        </div>

        {/* Cliente & Configuración */}
        <section className="section client-info">
          <div className="field client-field">
            <TextInput
              name="client"
              label="Cliente"
              value={client}
              onChange={e => setClient(e.target.value)}
              placeholder="Escribe el nombre..."
            />
          </div>

          <div className="field validity-field">
            <label>Validez de la Oferta</label>
            <div className="number-unit-group">
              <TextInput
                name="validityNumber"
                type="number"
                value={validityNumber}
                onChange={e => setValidityNum(e.target.value)}
              />
              <SelectInput
                name="validityUnit"
                label=""
                options={[
                  { value: 'días',    label: 'días' },
                  { value: 'semanas', label: 'semanas' },
                  { value: 'meses',   label: 'meses' }
                ]}
                value={validityUnit}
                onChange={e => setValidityUnit(e.target.value)}
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
                onChange={e => setDeliveryNum(e.target.value)}
              />
              <SelectInput
                name="deliveryUnit"
                label=""
                options={[
                  { value: 'días',    label: 'días' },
                  { value: 'semanas', label: 'semanas' },
                  { value: 'meses',   label: 'meses' }
                ]}
                value={deliveryUnit}
                onChange={e => setDeliveryUnit(e.target.value)}
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
                onChange={e => setWarrantyNum(e.target.value)}
              />
              <SelectInput
                name="warrantyUnit"
                label=""
                options={[
                  { value: 'meses', label: 'meses' },
                  { value: 'años',  label: 'años'   }
                ]}
                value={warrantyUnit}
                onChange={e => setWarrantyUnit(e.target.value)}
              />
            </div>
          </div>

          <div className="field payment-field">
            <SelectInput
              name="paymentMethod"
              label="Forma de pago"
              options={[
                { value: 'Contado',       label: 'Contado' },
                { value: 'Crédito',       label: 'Crédito' },
                { value: 'Transferencia', label: 'Transferencia' }
              ]}
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
            />
          </div>

   <div className="contact-data">
  <TextInput
    name="nit"
    label="NIT"
    value={contactData.nit}
    onChange={handleContactChange}
  />
  <TextInput
    name="ciudad"
    label="Ciudad"
    value={contactData.ciudad}
    onChange={handleContactChange}
  />
  <TextInput
    name="telefono"
    label="Teléfono"
    value={contactData.telefono}
    onChange={handleContactChange}
  />
</div>

    </section>

   <section className="section product-table">
  <h4 className="section-label">Producto</h4>
  <DataTable
    columns={productColumns}
    data={products}
    onCellChange={({ rowIndex, field, value }) => handleProductChange(rowIndex, field, value)}
  />
</section>
       

        {/* Precio de Compra */}
        <h4 className="section-label">Precio de compra</h4>
        <section className="section pricing">
          <div className="purchase-grid">
            <TextInput
              name="proveedor"
              label="Proveedor"
              value={purchase.proveedor}
              onChange={handlePurchaseChange}
            />
            <SelectInput
              name="tiempoEntrega"
              label="Tiempo de Entrega"
              options={[{ value: 'Inmediata', label: 'Inmediata' }]}
              value={purchase.tiempoEntrega}
              onChange={handlePurchaseChange}
            />
            <SelectInput
              name="fleteProv"
              label="Flete proveedor"
              options={[{ value: '15%', label: '15%' }, { value: '20%', label: '20%' }]}
              value={purchase.fleteProv}
              onChange={handlePurchaseChange}
            />
            <SelectInput
              name="ivaProv"
              label="IVA proveedor"
              options={[{ value: '19%', label: '19%' }, { value: '5%', label: '5%' }]}
              value={purchase.ivaProv}
              onChange={handlePurchaseChange}
            />
            <SelectInput
              name="monedaCliente"
              label="Moneda Cliente"
              options={[{ value: 'COP', label: 'COP' }, { value: 'USD', label: 'USD' }]}
              value={purchase.monedaCliente}
              onChange={handlePurchaseChange}
            />
            <NumericFormat
              name="puAntesIva"
              label="P/U Antes de IVA"
              customInput={TextInput}
              value={purchase.puAntesIva}
              thousandSeparator
              prefix="$"
              onValueChange={v => setPurchase(prev => ({ ...prev, puAntesIva: v.value }))}
            />
            <NumericFormat
              name="cuAntesIva"
              label="C/U Antes de IVA"
              customInput={TextInput}
              value={purchase.cuAntesIva}
              thousandSeparator
              prefix="$"
              onValueChange={v => setPurchase(prev => ({ ...prev, cuAntesIva: v.value }))}
            />
            <NumericFormat
              name="ctAntesIva"
              label="C/T Antes de IVA"
              customInput={TextInput}
              value={purchase.ctAntesIva}
              thousandSeparator
              prefix="$"
              onValueChange={v => setPurchase(prev => ({ ...prev, ctAntesIva: v.value }))}
            />
            <NumericFormat
              name="valorTotal"
              label="Valor Total"
              customInput={TextInput}
              value={purchase.valorTotal}
              thousandSeparator
              prefix="$"
              onValueChange={v => setPurchase(prev => ({ ...prev, valorTotal: v.value }))}
            />
          </div>

          {/* Utilidad del Producto */}
          <div className="utility-block">
            <h4 className="section-label">Utilidad del Producto</h4>
            <div className="utility-grid">
              <div className="utility-field">
                <label>Utilidad por Unidad</label>
                <NumericFormat
                  value={utility.porUnidad}
                  thousandSeparator
                  prefix="$"
                  onValueChange={v => setUtility(u => ({ ...u, porUnidad: v.value }))}
                  customInput="input"
                  className="tu-clase-css"
                />
              </div>
              <div className="utility-field">
                <label>Margen Bruto</label>
                <SelectInput
                  name="margenBruto"
                  value={utility.margenBruto}
                  onChange={e => setUtility(u => ({ ...u, margenBruto: e.target.value }))}
                  options={[
                    { value: '10%', label: '10%' },
                    { value: '15%', label: '15%' },
                    { value: '20%', label: '20%' }
                  ]}
                />
              </div>
            </div>
            <div className="utility-field">
              <label>Utilidad Total</label>
              <NumericFormat
                value={utility.total}
                thousandSeparator
                prefix="$"
                onValueChange={v => setUtility(u => ({ ...u, total: v.value }))}
                customInput="input"
                className="tu-clase-css"
              />
            </div>
          </div>
        </section>

        {/* Margen y Precio de Venta */}
        <section className="section margin-price">
          {/* Margen */}
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

          {/* Precio de Venta */}
          <div className="summary-card">
            <h4 className="summary-title">Precio de Venta</h4>
            <div className="summary-grid">
              <div className="summary-field">
                <label>P/U Antes de IVA</label>
                <NumericFormat
                  value={puVenta}
                  thousandSeparator
                  prefix="$"
                  onValueChange={v => setPuVenta(v.value)}
                  customInput="input"
                  className="tu-clase-css"
                />
              </div>
              <div className="summary-field">
                <label>P/T Antes de IVA</label>
                <NumericFormat
                  value={ptVenta}
                  thousandSeparator
                  prefix="$"
                  onValueChange={v => setPtVenta(v.value)}
                  customInput="input"
                  className="tu-clase-css"
                />
              </div>
              <div className="summary-field">
                <label>Valor Total</label>
                <NumericFormat
                  value={valorVenta}
                  thousandSeparator
                  prefix="$"
                  onValueChange={v => setValorVenta(v.value)}
                  customInput="input"
                  className="tu-clase-css"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Botones finales */}
        <div className="footer-actions">
          <Button variant="text">Cancelar</Button>
          <Button>Guardar Cotización</Button>
        </div>
      </div>
    </div>
  );
}
