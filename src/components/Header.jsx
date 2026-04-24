import "./Header.css"

function Header({ totalLeads }) {
  return (
    <header className="header">
      <div className="header-logo">
        ◆ LeadFlow <span className="header-sub">CRM</span>
      </div>
      <div className="header-right">
        <span className="lead-count">{totalLeads} Leads</span>
      </div>
    </header>
  )
}

export default Header