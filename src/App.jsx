import { useState, useEffect, useMemo } from "react"
import axios from "axios"
import Header from "./components/Header"
import LeadList from "./components/LeadList"
import LeadForm from "./components/LeadForm"
import SearchFilter from "./components/SearchFilter"

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
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [showForm, setShowForm] = useState(false)        // ← added
  const [editingLead, setEditingLead] = useState(null)   // ← added
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("")

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
    if (!loading && leads.length >= 0) {
      localStorage.setItem(LS_KEY, JSON.stringify(leads))
    }
  }, [leads, loading])

  // useMemo — only recalculates when leads, search or filterStatus changes
  const filteredLeads = useMemo(() => {

    const query = search.toLowerCase()

    return leads.filter((lead) => {

      // Check if name or company matches search text
      const matchesSearch =
        lead.name.toLowerCase().includes(query) ||
        lead.company.toLowerCase().includes(query)

      // Check if status matches selected filter
      const matchesStatus =
        filterStatus === "" || lead.status === filterStatus

      // Lead must match BOTH conditions
      return matchesSearch && matchesStatus
    })

  }, [leads, search, filterStatus])

  // Open form for adding
  const handleAddClick = () => {
    setEditingLead(null)   // empty form
    setShowForm(true)      // show form
  }

  // Open form for editing
  const handleEdit = (lead) => {
    setEditingLead(lead)   // pre-fill form with lead data
    setShowForm(true)      // show form
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

  // Step 1 — user clicks Delete button, show confirmation
  const handleDeleteClick = (id) => {
    setDeleteConfirmId(id)
  }

  // Step 2 — user clicks Confirm, actually delete the lead
  const handleDeleteConfirm = () => {
    const updated = leads.filter((lead) => lead.id !== deleteConfirmId)
    setLeads(updated)
    setDeleteConfirmId(null)
  }

  // Step 3 — user clicks Cancel, close confirmation
  const handleDeleteCancel = () => {
    setDeleteConfirmId(null)
  }

  return (
    <div>
      <Header totalLeads={leads.length} />

      {/* Add Lead Button */}
      <button onClick={handleAddClick}>+ Add Lead</button>

      {/* Search and Filter */}
      <SearchFilter
        search={search}
        filterStatus={filterStatus}
        onSearchChange={setSearch}
        onFilterChange={setFilterStatus}
      />

      {/* Add / Edit Form */}
      {showForm && (
        <LeadForm
          editingLead={editingLead}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div>
          <p>Are you sure you want to delete this lead? This cannot be undone.</p>
          <button onClick={handleDeleteCancel}>Cancel</button>
          <button onClick={handleDeleteConfirm}>Yes, Delete</button>
        </div>
      )}

      {loading ? (
        <p>Loading leads...</p>
      ) : (
        <LeadList
          leads={filteredLeads}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}
    </div>
  )
}

export default App