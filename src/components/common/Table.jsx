export default function Table({ columns, data, emptyMessage = "No data found" }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-50">
          {data.length === 0 ? (
            <tr><td colSpan={columns.length} className="px-5 py-10 text-center text-gray-400">{emptyMessage}</td></tr>
          ) : data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
              {columns.map(col => (
                <td key={col.key} className="px-5 py-4 text-gray-700">{col.render ? col.render(row[col.key], row) : row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
