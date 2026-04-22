import LeadCard from "./LeadCard"

function LeadList({ leads, onEdit, onDelete }) {

  if (leads.length === 0) {
    return <p>No leads found.</p>
  }

  return (
    <table>
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
  )
}

export default LeadList