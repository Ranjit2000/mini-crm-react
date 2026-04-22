import { useState, useEffect } from "react"
import axios from "axios"

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

  return (
    <div>
      {loading ? (
        <p>Loading leads...</p>
      ) : (
        <p>Leads loaded: {leads.length}</p>
      )}
    </div>
  )
}

export default App