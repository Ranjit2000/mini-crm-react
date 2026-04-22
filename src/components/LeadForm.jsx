import { useState, useEffect } from "react"

const LEAD_SOURCES = ["Website", "Referral", "LinkedIn", "Other"]
const LEAD_STATUSES = ["New", "Contacted", "Follow-up", "Converted", "Lost"]

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  company: "",
  source: "",
  status: "New",
  notes: ""
}

function validate(form) {
  const errors = {}

// Name — just checks it's not empty
  if (!form.name.trim())
    errors.name = "Name is required"
// Email — checks not empty AND valid format
  if (!form.email.trim())
    errors.email = "Email is required"
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email"

  if (!form.phone.trim())
    errors.phone = "Phone is required"
  else if (!/^\d{10}$/.test(form.phone))
    errors.phone = "Phone must be exactly 10 digits"

  if (!form.company.trim())
    errors.company = "Company name is required"

  if (!form.source)
    errors.source = "Please select a lead source"

  if (!form.status)
    errors.status = "Please select a lead status"

  return errors
}

function LeadForm({ editingLead, onSave, onClose }) {

  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  // When editingLead changes, fill the form
  useEffect(() => {
    if (editingLead) {
      setForm(editingLead)
    } else {
      setForm(EMPTY_FORM)
    }
    setErrors({})
  }, [editingLead])

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))

    // Clear error for that field as user types
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated[name]
        return updated
      })
    }
  }

  // Handle save button
  const handleSubmit = () => {
    const validationErrors = validate(form)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    onSave(form)
  }

  return (
    <div>
      <h2>{editingLead ? "Edit Lead" : "Add New Lead"}</h2>

      {/* Lead Name */}
      <div>
        <label>Lead Name *</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full name"
        />
        {errors.name && <p>{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label>Email *</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="email@example.com"
        />
        {errors.email && <p>{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label>Phone Number *</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="10 digit number"
          maxLength={10}
        />
        {errors.phone && <p>{errors.phone}</p>}
      </div>

      {/* Company */}
      <div>
        <label>Company Name *</label>
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company name"
        />
        {errors.company && <p>{errors.company}</p>}
      </div>

      {/* Lead Source */}
      <div>
        <label>Lead Source *</label>
        <select
          name="source"
          value={form.source}
          onChange={handleChange}
        >
          <option value="">Select source</option>
          {LEAD_SOURCES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.source && <p>{errors.source}</p>}
      </div>

      {/* Lead Status */}
      <div>
        <label>Lead Status *</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.status && <p>{errors.status}</p>}
      </div>

      {/* Notes */}
      <div>
        <label>Notes (Optional)</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Any additional notes"
        />
      </div>

      {/* Buttons */}
      <button onClick={onClose}>Cancel</button>
      <button onClick={handleSubmit}>
        {editingLead ? "Save Changes" : "Add Lead"}
      </button>

    </div>
  )
}

export default LeadForm