import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listTasks, createTask, deleteTask } from '../api'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  async function refresh() {
    try {
      const data = await listTasks()
      setTasks(data)
    } catch (e) {
      setError(e.message)
    }
  }

  useEffect(() => { refresh() }, [])

  const addTask = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await createTask({ title, description, is_completed:false })
      setTitle('')
      setDescription('')
      await refresh()
    } catch (e) {
      setError(e.message)
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete this task?')) return
    try {
      await deleteTask(id)
      await refresh()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div>
      <h1>Your Tasks</h1>
      <form onSubmit={addTask} style={{ display:'grid', gap:8, maxWidth:500, margin:'12px 0' }}>
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
        <textarea placeholder="Description (optional)" value={description} onChange={e=>setDescription(e.target.value)} />
        <button type="submit">Add Task</button>
      </form>
      {error && <p style={{ color:'crimson' }}>{error}</p>}
      <ul style={{ listStyle:'none', padding:0, display:'grid', gap:8 }}>
        {tasks.map(t => (
          <li key={t.id} style={{ border:'1px solid #ddd', padding:12, borderRadius:8 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <input type="checkbox" checked={t.is_completed} readOnly />
                <strong style={{ marginLeft:8 }}>{t.title}</strong>
              </div>
              <div style={{ display:'flex', gap:8 }}>
                <Link to={`/tasks/${t.id}`}>Edit</Link>
                <button onClick={() => remove(t.id)}>Delete</button>
              </div>
            </div>
            {t.description && <p style={{ marginTop:8 }}>{t.description}</p>}
            <small>Updated: {new Date(t.updated_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  )
}
