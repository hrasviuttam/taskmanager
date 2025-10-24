import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTask, updateTask } from '../api'

export default function TaskEdit() {
  const { id } = useParams()
  const nav = useNavigate()
  const [task, setTask] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const data = await getTask(id)
        setTask(data)
      } catch (e) {
        setError(e.message)
      }
    })()
  }, [id])

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateTask(id, task)
      nav('/')
    } catch (e) {
      setError(e.message)
    }
  }

  if (!task) return <p>Loading...</p>

  return (
    <div>
      <h1>Edit Task</h1>
      <form onSubmit={onSubmit} style={{ display:'grid', gap:8, maxWidth:500 }}>
        <input value={task.title} onChange={e=>setTask({ ...task, title:e.target.value })} required />
        <textarea value={task.description || ''} onChange={e=>setTask({ ...task, description:e.target.value })} />
        <label>
          <input type="checkbox" checked={task.is_completed} onChange={e=>setTask({ ...task, is_completed:e.target.checked })} />
          <span style={{ marginLeft:8 }}>Completed</span>
        </label>
        <button type="submit">Save</button>
      </form>
      {error && <p style={{ color:'crimson' }}>{error}</p>}
    </div>
  )
}
