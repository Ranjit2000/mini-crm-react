import LeadCard from "./LeadCard"
import "./LeadList.css"

function LeadList({ leads, onEdit, onDelete }) {

  if (leads.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-icon">🔍</p>
        <p>No leads found.</p>
      </div>
    )
  }

  return (
    <div className="table-wrapper">
      <table className="leads-table">
        <thead>
          <tr>
            <th>Lead</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Source</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeadList