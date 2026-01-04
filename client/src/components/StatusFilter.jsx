export default function StatusFilter({ selectedStatus, onStatusChange }) {
  return (
    <div className="mb-6">
      <label htmlFor="status-filter" className="block text-sm font-semibold text-gray-700 mb-2">
        Filter by Status
      </label>
      <select
        id="status-filter"
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
      >
        <option value="">All Jobs</option>
        <option value="1">Applied</option>
        <option value="2">Interviewing</option>
        <option value="3">Rejected</option>
        <option value="4">Offer</option>
        <option value="5">Accepted</option>
      </select>
    </div>
  );
}
