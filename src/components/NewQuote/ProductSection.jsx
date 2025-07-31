// src/sections/ProductsSection.jsx
import DataTable from '../DataTable';

/**
 * props:
 *  - products: array de items
 *  - onProductChange: (rowIndex, field, value) ⇒ …
 *  - columns: definido en NewQuotePage o importado
 */
export default function ProductsSection({ products, onProductChange, columns }) {
  return (
    <section className="section product-table">
      <h4 className="section-label">Producto</h4>
      <DataTable
        columns={columns}
        data={products}
        onCellChange={({ rowIndex, field, value }) =>
          onProductChange(rowIndex, field, value)
        }
      />
    </section>
  );
}
