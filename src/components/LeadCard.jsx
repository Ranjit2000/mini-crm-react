function LeadCard({ lead, onEdit, onDelete }) {
  return (
    <tr>
      <td>
        <p>{lead.name}</p>
        <p>{lead.email}</p>
      </td>
      <td>{lead.phone}</td>
      <td>{lead.company}</td>
      <td>{lead.source}</td>
      <td>{lead.status}</td>
      <td>
        <button onClick={() => onEdit(lead)}>
          Edit
        </button>
        <button onClick={() => onDelete(lead.id)}>
          Delete
        </button>
      </td>
    </tr>
  )
}

export default LeadCard