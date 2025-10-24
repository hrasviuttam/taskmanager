import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../api'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await register(username, password)
      nav('/login')
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit} style={{ display:'grid', gap:8, maxWidth:320 }}>
        <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Create account</button>
      </form>
      {error && <p style={{ color:'crimson' }}>{error}</p>}
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  )
}
