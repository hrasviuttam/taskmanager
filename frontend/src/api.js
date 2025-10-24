const API_BASE = 'http://127.0.0.1:8000/api'

async function api(path, { method='GET', body, auth=true } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = localStorage.getItem('access')
    if (token) headers['Authorization'] = 'Bearer ' + token
  }
  const res = await fetch(API_BASE + path, { method, headers, body: body ? JSON.stringify(body) : undefined })
  if (!res.ok) {
    let msg = 'Request failed'
    try { const data = await res.json(); msg = data.detail || JSON.stringify(data) } catch {}
    throw new Error(msg)
  }
  if (res.status === 204) return null
  return res.json()
}

export async function login(username, password) {
  const data = await api('/auth/login/', { method:'POST', body:{ username, password }, auth:false })
  localStorage.setItem('access', data.access)
  localStorage.setItem('refresh', data.refresh)
}

export async function register(username, password) {
  await api('/auth/register/', { method:'POST', body:{ username, password }, auth:false })
}

export async function getMe() {
  return api('/me/')
}

export async function listTasks() {
  return api('/tasks/')
}

export async function createTask(task) {
  return api('/tasks/', { method:'POST', body:task })
}

export async function getTask(id) {
  return api(`/tasks/${id}/`)
}

export async function updateTask(id, task) {
  return api(`/tasks/${id}/`, { method:'PUT', body:task })
}

export async function deleteTask(id) {
  return api(`/tasks/${id}/`, { method:'DELETE' })
}
