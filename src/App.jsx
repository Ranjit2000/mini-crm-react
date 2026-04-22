import { useState, useEffect } from "react"
import axios from "axios"
import Header from "./components/Header"
import LeadList from "./components/LeadList"
import LeadForm from "./components/LeadForm"

const API_URL = "https://jsonplaceholder.typicode.com/users"
const LS_KEY = "mini_crm_leads"

const LEAD_SOURCES = ["Website", "Referral", "LinkedIn", "Other"]
const LEAD_STATUSES = ["New", "Contacted", "Follow-up", "Converted", "Lost"]

function mapApiToLead(user, index) {
  return {
    id: Date.now().toString() + index,
    name: user.name,
    email: user.email,
    phone: user.phone.replace(/\D/g, "").slice(0, 10).padEnd(10, "0"),
    company: user.company.name,
    source: LEAD_SOURCES[index % LEAD_SOURCES.length],
    status: LEAD_STATUSES[index % LEAD_STATUSES.length],
    notes: "",
    createdAt: new Date().toISOString()
  }
}

function App() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingLead, setEditingLead] = useState(null)

  useEffect(() => {
    // Check localStorage first
    const stored = localStorage.getItem(LS_KEY)
    if (stored) {
      // Data already exists — no need to call API
      setLeads(JSON.parse(stored))
      setLoading(false)
      return
    }
    // No data in localStorage — fetch from API
    axios.get(API_URL)
      .then((response) => {
        const mapped = response.data.map(mapApiToLead)
        setLeads(mapped)
        localStorage.setItem(LS_KEY, JSON.stringify(mapped))
      })
      .catch((error) => {
        console.error("Failed to fetch leads:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, []) // empty array means this runs only once on first load

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(LS_KEY, JSON.stringify(leads))
    }
  }, [leads])

  // Open form for adding
  const handleAddClick = () => {
    setEditingLead(null)
    setShowForm(true)
  }

  // Open form for editing
  const handleEdit = (lead) => {
    setEditingLead(lead)
    setShowForm(true)
  }
   // Close form
  const handleClose = () => {
    setShowForm(false)
    setEditingLead(null)
  }
  // Save — handles both add and edit
  const handleSave = (formData) => {
    if (editingLead) {
      // Edit mode — update existing lead
      const updated = leads.map((lead) =>
        lead.id === editingLead.id
          ? { ...lead, ...formData }
          : lead
      )
      setLeads(updated)
    } else {
      // Add mode — create new lead
      const newLead = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      }
      setLeads([newLead, ...leads])
    }
    handleClose()
  }

  // Delete
  const handleDelete = (id) => {
    const updated = leads.filter((lead) => lead.id !== id)
    setLeads(updated)
  }

 return (
    <div>
      <Header totalLeads={leads.length} />

      <button onClick={handleAddClick}>+ Add Lead</button>

      {showForm && (
        <LeadForm
          editingLead={editingLead}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}

      {loading ? (
        <p>Loading leads...</p>
      ) : (
        <LeadList
          leads={leads}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default App