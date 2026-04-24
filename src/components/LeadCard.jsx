import "./LeadCard.css"

const STATUS_COLORS = {
  New:        { background: "#EFF6FF", color: "#1D4ED8" },
  Contacted:  { background: "#FFFBEB", color: "#B45309" },
  "Follow-up":{ background: "#F5F3FF", color: "#6D28D9" },
  Converted:  { background: "#F0FDF4", color: "#15803D" },
  Lost:       { background: "#FEF2F2", color: "#B91C1C" },
}

function LeadCard({ lead, onEdit, onDelete }) {
  const statusStyle = STATUS_COLORS[lead.status] || {}

  return (
    <tr>
      <td>
        <p className="lead-name">{lead.name}</p>
        <p className="lead-email">{lead.email}</p>

        {/* Show follow-up date if it exists */}
        {lead.followUpDate && (
          <p className="follow-up-date">
            📅 Follow-up: {new Date(lead.followUpDate).toLocaleDateString()}
          </p>
        )}

      </td>
      <td className="lead-phone">{lead.phone}</td>
      <td className="lead-company">{lead.company}</td>
      <td>
        <span className="source-badge">{lead.source}</span>
      </td>
      <td>
        <span className="status-badge" style={statusStyle}>
          {lead.status}
        </span>
      </td>
      <td>
        <button className="btn-edit" onClick={() => onEdit(lead)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(lead.id)}>
          Delete
        </button>
      </td>
    </tr>
  )
}

export default LeadCard