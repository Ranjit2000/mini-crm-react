import { useState, useEffect } from "react"
import "./LeadForm.css"

const LEAD_SOURCES = ["Website", "Referral", "LinkedIn", "Other"]
const LEAD_STATUSES = ["New", "Contacted", "Follow-up", "Converted", "Lost"]

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  company: "",
  source: "",
  status: "New",
  notes: "",
  followUpDate: ""  // ← bonus: follow-up reminder field
}

function validate(form) {
  const errors = {}

  if (!form.name.trim())
    errors.name = "Name is required"

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
    <div className="form-overlay">
      <div className="form-box">
        <h2 className="form-title">
          {editingLead ? "Edit Lead" : "Add New Lead"}
        </h2>

        <div className="form-grid">

          {/* Lead Name */}
          <div className="form-group">
            <label className="form-label">Lead Name *</label>
            <input
              className={`form-input ${errors.name ? "input-error" : ""}`}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full name"
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email *</label>
            <input
              className={`form-input ${errors.email ? "input-error" : ""}`}
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@example.com"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label className="form-label">Phone Number *</label>
            <input
              className={`form-input ${errors.phone ? "input-error" : ""}`}
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="10 digit number"
              maxLength={10}
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </div>

          {/* Company */}
          <div className="form-group">
            <label className="form-label">Company Name *</label>
            <input
              className={`form-input ${errors.company ? "input-error" : ""}`}
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Company name"
            />
            {errors.company && <p className="error-text">{errors.company}</p>}
          </div>

          {/* Lead Source */}
          <div className="form-group">
            <label className="form-label">Lead Source *</label>
            <select
              className={`form-input ${errors.source ? "input-error" : ""}`}
              name="source"
              value={form.source}
              onChange={handleChange}
            >
              <option value="">Select source</option>
              {LEAD_SOURCES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.source && <p className="error-text">{errors.source}</p>}
          </div>

          {/* Lead Status */}
          <div className="form-group">
            <label className="form-label">Lead Status *</label>
            <select
              className={`form-input ${errors.status ? "input-error" : ""}`}
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.status && <p className="error-text">{errors.status}</p>}
          </div>

          {/* Follow-up Reminder */}
          <div className="form-group">
            <label className="form-label">Follow-up Date (Optional)</label>
            <input
              className="form-input"
              type="date"
              name="followUpDate"
              value={form.followUpDate || ""}
              onChange={handleChange}
            />
          </div>

          {/* Notes */}
          <div className="form-group form-full">
            <label className="form-label">Notes (Optional)</label>
            <textarea
              className="form-input form-textarea"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any additional notes"
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="form-footer">
          <button className="btn-form-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-form-save" onClick={handleSubmit}>
            {editingLead ? "Save Changes" : "Add Lead"}
          </button>
        </div>

      </div>
    </div>
  )
}

export default LeadForm