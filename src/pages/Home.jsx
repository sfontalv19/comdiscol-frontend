import React, { useState, useEffect } from 'react';
import Sidebar      from '../components/Sidebar';
import Header       from '../components/Header';
import MetricCard   from '../components/MetricCard';
import QuickActions from '../components/QuickActions';
import DataTable    from '../components/DataTable';
import {
  fetchLatestQuote,
  fetchQuotesList
} from '../services/quotesServices';

export default function Home() {
  // ——— Estados para últimas y lista de cotizaciones ———
  const [latestQuote, setLatestQuote] = useState(null);
  const [quotesList,  setQuotesList]  = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);

  // ——— Carga de datos al montar ———
  useEffect(() => {
    Promise.all([fetchLatestQuote(), fetchQuotesList()])
      .then(([latest, list]) => {
        setLatestQuote(latest);
        setQuotesList(list);
      })
      .catch(err => {
        console.error(err);
        setError('Error cargando cotizaciones');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // ——— Definición de métricas dinámicas ———
  const metrics = [
    {
      title: 'Total Cotizaciones',
      value: loading
        ? '…'
        : error
          ? '–'
          : `${quotesList.length}`,
      details: loading || error
        ? []
        : [
            { label: 'Última ID',   value: `${latestQuote.id}` },
            { label: 'Cliente',     value: latestQuote.cliente },
            { label: 'Monto Total', value: `$${latestQuote.monto}` }
          ]
    }
  ];

  // ——— Acciones rápidas ———
  const actions = [
    { label: 'Nueva Cotización', href: '/nueva_cotizacion', primary: true },
    { label: 'Ver Cotizaciones', href: '/cotizaciones' }
  ];

  // ——— Columnas para la tabla de cotizaciones ———
  const columns = [
    { field: 'id',       header: 'ID' },
    { field: 'cliente',  header: 'Cliente' },
    { field: 'monto',    header: 'Monto' },
    { field: 'fecha',    header: 'Fecha' }
  ];

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Header user="Sergio Fontalvo" />

        {/* Métricas dinámicas + QuickActions */}
        <section className="metrics">
          {metrics.map((m, i) => <MetricCard key={i} {...m} />)}
          <QuickActions actions={actions} />
        </section>

        {/* Tabla de cotizaciones */}
        <section className="table-section">
          <h3>Últimas Cotizaciones</h3>

          {loading && <p>Cargando cotizaciones…</p>}
          {error   && <p style={{ color: 'red' }}>{error}</p>}

          {!loading && !error && (
            <div className="table-responsive">
              <DataTable columns={columns} data={quotesList} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}