import "./SearchFilter.css"

const LEAD_STATUSES = ["New", "Contacted", "Follow-up", "Converted", "Lost"]

function SearchFilter({ search, filterStatus, sortBy, onSearchChange, onFilterChange, onSortChange }) {
  return (
    <div className="search-filter-bar">

      {/* Search Input */}
      <input
        className="search-input"
        type="text"
        placeholder="Search by name or company..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {/* Status Filter Dropdown */}
      <select
        className="filter-select"
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

      {/* Sort Dropdown */}
      <select
        className="filter-select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="status">Status</option>
        <option value="date">Date</option>
      </select>

    </div>
  )
}

export default SearchFilter