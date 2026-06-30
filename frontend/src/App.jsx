import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [jobs, setJobs] = useState([])

  // The form's current input values
  const [form, setForm] = useState({
    company: '',
    role: '',
    status: 'APPLIED',
    appliedDate: '',
    location: '',
    source: ''
  })

  // Tracks which job is being edited (null = adding a new one)
  const [editingId, setEditingId] = useState(null)

  // Load jobs from the backend
  const loadJobs = () => {
    fetch('http://localhost:8080/api/jobs')
        .then(response => response.json())
        .then(data => setJobs(data))
        .catch(error => console.error('Error fetching jobs:', error))
  }

  useEffect(() => {
    loadJobs()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Clears the form back to empty "add" mode
  const resetForm = () => {
    setForm({ company: '', role: '', status: 'APPLIED', appliedDate: '', location: '', source: '' })
    setEditingId(null)
  }

  // Handles both creating a new job and updating an existing one
  const handleSubmit = () => {
    if (!form.company || !form.role) {
      alert('Please enter at least a company and role')
      return
    }

    const url = editingId
        ? `http://localhost:8080/api/jobs/${editingId}`
        : 'http://localhost:8080/api/jobs'
    const method = editingId ? 'PUT' : 'POST'

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
        .then(response => response.json())
        .then(() => {
          loadJobs()
          resetForm()
        })
        .catch(error => console.error('Error saving job:', error))
  }

  // Loads a job's data into the form for editing
  const handleEdit = (job) => {
    setForm({
      company: job.company || '',
      role: job.role || '',
      status: job.status || 'APPLIED',
      appliedDate: job.appliedDate || '',
      location: job.location || '',
      source: job.source || ''
    })
    setEditingId(job.id)
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/jobs/${id}`, {
      method: 'DELETE'
    })
        .then(() => loadJobs())
        .catch(error => console.error('Error deleting job:', error))
  }

  return (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Job Application Tracker</h1>

        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <input name="company" placeholder="Company" value={form.company} onChange={handleChange} />
          <input name="role" placeholder="Role" value={form.role} onChange={handleChange} />
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="SAVED">SAVED</option>
            <option value="APPLIED">APPLIED</option>
            <option value="INTERVIEWING">INTERVIEWING</option>
            <option value="OFFER">OFFER</option>
            <option value="REJECTED">REJECTED</option>
            <option value="ACCEPTED">ACCEPTED</option>
            <option value="WITHDRAWN">WITHDRAWN</option>
          </select>
          <input name="appliedDate" type="date" value={form.appliedDate} onChange={handleChange} />
          <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
          <input name="source" placeholder="Source" value={form.source} onChange={handleChange} />
          <button onClick={handleSubmit}>{editingId ? 'Update Job' : 'Add Job'}</button>
          {editingId && <button onClick={resetForm}>Cancel</button>}
        </div>

        <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
          <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Status</th>
            <th>Applied</th>
            <th>Location</th>
            <th>Source</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {jobs.map(job => (
              <tr key={job.id}>
                <td>{job.company}</td>
                <td>{job.role}</td>
                <td>{job.status}</td>
                <td>{job.appliedDate}</td>
                <td>{job.location}</td>
                <td>{job.source}</td>
                <td>
                  <button onClick={() => handleEdit(job)}>Edit</button>
                  {' '}
                  <button onClick={() => handleDelete(job.id)}>Delete</button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  )
}

export default App