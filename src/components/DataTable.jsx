// components/DataTable.jsx
import React from 'react';
import TextInput from './TextInput';
export default function DataTable({ columns, data, onCellChange }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.field}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map(col => (
              <td key={col.field}>
                {/* Si tienes un TextInput reutilizable: */}
                <TextInput
                  name={col.field}
                  value={row[col.field]}
                  onChange={e =>
                    onCellChange({
                      rowIndex,
                      field: col.field,
                      value: e.target.value
                    })
                  }
                />
                {/* Si prefieres usar un <input> nativo: */}
                {/*
                <input
                  name={col.field}
                  value={row[col.field]}
                  onChange={e =>
                    onCellChange({
                      rowIndex,
                      field: col.field,
                      value: e.target.value
                    })
                  }
                />
                */}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
