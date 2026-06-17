export default function AdminTable({ columns, rows, empty = 'No records found.' }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#1A1A1A] shadow-[0_20px_60px_rgba(0,0,0,.25)]">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead className="text-xs uppercase tracking-[0.14em] text-white/45">
          <tr>
            {columns.map((column) => <th key={column.key} className="p-4">{column.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id} className="border-t border-white/10">
              {columns.map((column) => <td key={column.key} className="p-4 text-white/75">{column.render ? column.render(row) : row[column.key]}</td>)}
            </tr>
          ))}
          {!rows.length && <tr><td className="p-5 text-white/45" colSpan={columns.length}>{empty}</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
