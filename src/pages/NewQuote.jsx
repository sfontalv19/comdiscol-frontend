// src/pages/NewQuote.jsx
import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import PageTitle from '../components/PageTitle';
import TextInput from '../components/TextInput';
import SelectInput from '../components/SelectInput';
import Button from '../components/Button';
import DataTable from '../components/DataTable';
import { getClients, createClient, createQuote } from '../services/api';
import '../styles/newQuotes.css';

// Columnas para la tabla de productos
const productColumns = [
  { field: 'sku', header: 'SKU' },
  { field: 'desc', header: 'Descripción' },
  { field: 'categoria', header: 'Categoría' },
  { field: 'marca', header: 'Marca' },
  { field: 'cantidad', header: 'Cantidad' },
  { field: 'medida', header: 'Medida' },
  { field: 'moneda_cliente', header: 'Moneda Cliente' },
  { field: 'flete_cliente', header: 'Flete Cliente' },
  { field: 'iva_cliente', header: 'IVA Cliente' }
];

const initialProductData = [
  { sku: '', desc: '', categoria: '', marca: '', cantidad: 1, medida: '', moneda_cliente: '', flete_cliente: '', iva_cliente: '' }
];

export default function NewQuote() {
  // ——— Clientes & Configuración ———
  const [clients, setClients] = useState([]);
  const [clientData, setClientData] = useState({
     name: '', email: '', phone: '', address: '', nit: ''
  });

  useEffect(() => {
    getClients()
      .then(setClients)
      .catch(err => console.error('Error cargando clientes:', err));
  }, []);

  const handleClientChange = e => {
    const { name, value } = e.target;
    setClientData(prev => ({ ...prev, [name]: value }));
  };

  // ——— Plazos y formas de pago ———
  const [validityNumber, setValidityNum] = useState(30);
  const [validityUnit, setValidityUnit]   = useState('días');
  const [deliveryNumber, setDeliveryNum]   = useState(2);
  const [deliveryUnit, setDeliveryUnit]     = useState('días');
  const [warrantyNumber, setWarrantyNum]   = useState(12);
  const [warrantyUnit, setWarrantyUnit]     = useState('meses');
  const [paymentMethod, setPaymentMethod]   = useState('Contado');

  // ——— Productos dinámicos ———
  const [products, setProducts] = useState(initialProductData);
  const handleProductChange = (rowIndex, field, value) => {
    setProducts(p =>
      p.map((item,i) => i===rowIndex
        ? { ...item, [field]: field==='cantidad' ? parseInt(value,10)||0 : value }
        : item
      )
    );
  };

  // ——— Precio de compra ———
  const [purchase, setPurchase] = useState({
    proveedor:'', tiempoEntrega:'', fleteProv:'', ivaProv:'',
    monedaCliente:'', puAntesIva:'', cuAntesIva:'', ctAntesIva:'', valorTotal:''
  });
  const handlePurchaseChange = e => {
    const { name, value } = e.target;
    setPurchase(p => ({ ...p, [name]: value }));
  };

  // ——— Utilidad del producto ———
  const [utility, setUtility] = useState({ porUnidad:'', margenBruto:'', total:'' });
  const handleUtilityChange = e => {
    const { name, value } = e.target;
    setUtility(u => ({ ...u, [name]: value }));
  };

  // ——— Margen y precio de venta ———
  const [margenFijo, setMargenFijo]         = useState('15%');
  const [margenAjustado, setMargenAjustado] = useState('15%');
  const [variacion, setVariacion]           = useState('-1%');
  const [puVenta, setPuVenta]               = useState('');
  const [ptVenta, setPtVenta]               = useState('');
  const [valorVenta, setValorVenta]         = useState('');

  const today = new Date().toLocaleDateString();

  // ——— Guardar cliente + cotización ———
  const handleSave = async () => {
    try {
      // 1) Si no hay ID: creamos cliente
      let clientId = clientData.id;
      if (!clientId) {
        const newCli = await createClient({
          name: clientData.name,
          email: clientData.email,
          phone: clientData.phone,
          address: clientData.address
        });
        clientId = newCli.id;
      }

      // 2) Armar payload de cotización
      const payload = {
        clienteId:     clientId,
        validez:      `${validityNumber} ${validityUnit}`,
        tiempoEntrega:`${deliveryNumber} ${deliveryUnit}`,
        garantia:     `${warrantyNumber} ${warrantyUnit}`,
        formaPago:    paymentMethod,
        detallesCompra: purchase,
        items: products.map(p => ({
          sku: p.sku,
          cantidad: p.cantidad,
          fleteCliente: p.flete_cliente,
          ivaCliente: p.iva_cliente
        })),
        calculos: {
          porUnidad: utility.porUnidad,
          margenBruto: utility.margenBruto,
          utilidadTotal: utility.total,
          margenFijo, margenAjustado, variacion,
          puVenta, ptVenta, valorVenta
        }
      };

      await createQuote(payload);
      alert('Cotización creada con éxito');
    } catch(err) {
      console.error(err);
      alert('Error al guardar: '+err.message);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar/>

      <div className="main-content">
        <Header user="Sergio Fontalvo"/>

        {/* Page Header */}
        <div className="page-header">
          <PageTitle text="Nueva Cotización" subtitle={`Fecha: ${today}`}/>
          <div className="actions">
            <Button onClick={handleSave}>Guardar Cotización</Button>
            <Button variant="text">Cancelar</Button>
          </div>
        </div>

        {/* Cliente & Configuración */}
        <section className="section client-info">
          <div className="field client-field">
            <TextInput
              name="name"
              label="Cliente"
              placeholder='nombre del cliente'
              options={clients.map(c=>({value:c.id,label:c.name}))}
              value={clientData.id}
              onChange={handleClientChange}
            />
          </div>

          <div className="field validity-field">
            <label>Validez de la Oferta</label>
            <div className="number-unit-group">
              <TextInput
                name="validityNumber"
                type="number"
                value={validityNumber}
                onChange={e=>setValidityNum(e.target.value)}
              />
              <SelectInput
                name="validityUnit"
                options={[{value:'días',label:'días'},{value:'meses',label:'meses'}]}
                value={validityUnit}
                onChange={e=>setValidityUnit(e.target.value)}
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
                onChange={e=>setDeliveryNum(e.target.value)}
              />
              <SelectInput
                name="deliveryUnit"
                options={[{value:'días',label:'días'},{value:'meses',label:'meses'}]}
                value={deliveryUnit}
                onChange={e=>setDeliveryUnit(e.target.value)}
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
                onChange={e=>setWarrantyNum(e.target.value)}
              />
              <SelectInput
                name="warrantyUnit"
                options={[{value:'meses',label:'meses'},{value:'años',label:'años'}]}
                value={warrantyUnit}
                onChange={e=>setWarrantyUnit(e.target.value)}
              />
            </div>
          </div>

          <div className="field payment-field">
            <SelectInput
              name="paymentMethod"
              label="Forma de pago"
              options={[
                {value:'Contado',label:'Contado'},
                {value:'Crédito',label:'Crédito'},
                {value:'Transferencia',label:'Transferencia'}
              ]}
              value={paymentMethod}
              onChange={e=>setPaymentMethod(e.target.value)}
            />
          </div>

          <div className="contact-data">
            <TextInput
              name="nit"
              label="nit"
              type="nit"
              value={clientData.nit}
              onChange={handleClientChange}
            />
            <TextInput
              name="email"
              label="Correo"
              type="email"
              value={clientData.email}
              onChange={handleClientChange}
            />
            <TextInput
              name="phone"
              label="Teléfono"
              type="tel"
              value={clientData.phone}
              onChange={handleClientChange}
            />
            <TextInput
              name="address"
              label="Ciudad"
              value={clientData.address}
              onChange={handleClientChange}
            />
          </div>
        </section>

        {/* Productos */}
        <section className="section product-table">
          <h4 className="section-label">Producto</h4>
          <DataTable
            columns={productColumns}
            data={products}
            onCellChange={({rowIndex,field,value})=>
              handleProductChange(rowIndex,field,value)
            }
          />
        </section>

        {/* Precio de compra */}
        <h4 className="section-label">Precio de compra</h4>
        <section className="section pricing">
          <div className="purchase-grid">
            <TextInput name="proveedor"      label="Proveedor"     value={purchase.proveedor}      onChange={handlePurchaseChange}/>
            <SelectInput name="tiempoEntrega" label="Tiempo de Entrega" options={[{value:'Inmediata',label:'Inmediata'}]} value={purchase.tiempoEntrega} onChange={handlePurchaseChange}/>
            <SelectInput name="fleteProv"     label="Flete prov."     options={[{value:'15%',label:'15%'},{value:'20%',label:'20%'}]} value={purchase.fleteProv} onChange={handlePurchaseChange}/>
            <SelectInput name="ivaProv"       label="IVA prov."       options={[{value:'19%',label:'19%'},{value:'5%',label:'5%'}]} value={purchase.ivaProv} onChange={handlePurchaseChange}/>
            <SelectInput name="monedaCliente" label="Moneda Cliente" options={[{value:'COP',label:'COP'},{value:'USD',label:'USD'}]} value={purchase.monedaCliente} onChange={handlePurchaseChange}/>
            <NumericFormat name="puAntesIva" label="P/U Antes de IVA" customInput={TextInput} value={purchase.puAntesIva} thousandSeparator prefix="$" onValueChange={v=>handlePurchaseChange({target:{name:'puAntesIva',value:v.value}})}/>
            <NumericFormat name="cuAntesIva" label="C/U Antes de IVA" customInput={TextInput} value={purchase.cuAntesIva} thousandSeparator prefix="$" onValueChange={v=>handlePurchaseChange({target:{name:'cuAntesIva',value:v.value}})}/>
            <NumericFormat name="ctAntesIva" label="C/T Antes de IVA" customInput={TextInput} value={purchase.ctAntesIva} thousandSeparator prefix="$" onValueChange={v=>handlePurchaseChange({target:{name:'ctAntesIva',value:v.value}})}/>
            <NumericFormat name="valorTotal" label="Valor Total"      customInput={TextInput} value={purchase.valorTotal} thousandSeparator prefix="$" onValueChange={v=>handlePurchaseChange({target:{name:'valorTotal',value:v.value}})}/>
          </div>

          {/* Utilidad del producto */}
          <div className="utility-block">
            <h4 className="section-label">Utilidad</h4>
            <div className="utility-grid">
              <div className="utility-field">
                <label>por Unidad</label>
                <NumericFormat customInput="input" className="tu-clase-css" value={utility.porUnidad} thousandSeparator prefix="$" onValueChange={v=>handleUtilityChange({target:{name:'porUnidad',value:v.value}})}/>
              </div>
              <div className="utility-field">
                <label>Margen Bruto</label>
                <SelectInput name="margenBruto" value={utility.margenBruto} onChange={handleUtilityChange} options={[{value:'10%',label:'10%'},{value:'15%',label:'15%'},{value:'20%',label:'20%'}]}/>
              </div>
            </div>
            <div className="utility-field">
              <label>Total</label>
              <NumericFormat customInput="input" className="tu-clase-css" value={utility.total} thousandSeparator prefix="$" onValueChange={v=>handleUtilityChange({target:{name:'total',value:v.value}})}/>
            </div>
          </div>
        </section>

        {/* Margen y precio de venta */}
        <section className="section margin-price">
          <div className="summary-card">
            <h4 className="summary-title">Margen</h4>
            <div className="summary-grid">
              <div className="summary-field"><label>Fijo</label><SelectInput name="margenFijo" value={margenFijo} onChange={e=>setMargenFijo(e.target.value)} options={[{value:'15%',label:'15%'},{value:'20%',label:'20%'},{value:'25%',label:'25%'}]}/></div>
              <div className="summary-field"><label>Ajustado</label><SelectInput name="margenAjustado" value={margenAjustado} onChange={e=>setMargenAjustado(e.target.value)} options={[{value:'15%',label:'15%'},{value:'20%',label:'20%'},{value:'25%',label:'25%'}]}/></div>
              <div className="summary-field"><label>Variación</label><SelectInput name="variacion" value={variacion} onChange={e=>setVariacion(e.target.value)} options={[{value:'-5%',label:'-5%'},{value:'-1%',label:'-1%'},{value:'0%',label:'0%'}]}/></div>
            </div>
          </div>
          <div className="summary-card">
            <h4 className="summary-title">Precio de Venta</h4>
            <div className="summary-grid">
              <div className="summary-field"><label>P/U</label><NumericFormat customInput="input" className="tu-clase-css" value={puVenta} thousandSeparator prefix="$" onValueChange={v=>setPuVenta(v.value)}/></div>
              <div className="summary-field"><label>P/T</label><NumericFormat customInput="input" className="tu-clase-css" value={ptVenta} thousandSeparator prefix="$" onValueChange={v=>setPtVenta(v.value)}/></div>
              <div className="summary-field"><label>Total</label><NumericFormat customInput="input" className="tu-clase-css" value={valorVenta} thousandSeparator prefix="$" onValueChange={v=>setValorVenta(v.value)}/></div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="footer-actions">
          <Button variant="text">Cancelar</Button>
          <Button onClick={handleSave}>Guardar Cotización</Button>
        </div>
      </div>
    </div>
  );
}
