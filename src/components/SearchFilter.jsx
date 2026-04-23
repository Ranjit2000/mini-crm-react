const LEAD_STATUSES = ["New", "Contacted", "Follow-up", "Converted", "Lost"]

function SearchFilter({ search, filterStatus, onSearchChange, onFilterChange }) {
  return (
    <div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or company..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {/* Status Filter Dropdown */}
      <select
        value={filterStatus}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="">All Statuses</option>
        {LEAD_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

    </div>
  )
}

export default SearchFilter