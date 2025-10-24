import React from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Tasks from './pages/Tasks'
import TaskEdit from './pages/TaskEdit'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('access')
  return token ? children : <Navigate to="/login" replace />
}

function Nav() {
  const loggedIn = !!localStorage.getItem('access')
  const handleLogout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    window.location.href = '/login'
  }
  return (
    <nav style={{ display:'flex', gap:12, padding:12, borderBottom:'1px solid #ddd', marginBottom:16 }}>
      <Link to="/">Tasks</Link>
      {!loggedIn && <Link to="/login">Login</Link>}
      {!loggedIn && <Link to="/register">Register</Link>}
      {loggedIn && <button onClick={handleLogout}>Logout</button>}
    </nav>
  )
}

export default function App() {
  return (
    <div style={{ maxWidth:900, margin:'0 auto', padding:16, fontFamily:'system-ui, Arial' }}>
      <Nav />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
        <Route path="/tasks/:id" element={<ProtectedRoute><TaskEdit /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}
