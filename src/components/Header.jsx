function Header({ totalLeads }) {
  return (
    <header>
      <h1>LeadFlow CRM</h1>
      <span>{totalLeads} Leads</span>
    </header>
  )
}

export default Header