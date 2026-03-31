import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'
const AuthContext = createContext()
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const verify = async () => {
      if (token) {
        try { await api.get('/auth/verify'); setIsAdmin(true) }
        catch { setToken(null); setIsAdmin(false); localStorage.removeItem('adminToken') }
      }
      setLoading(false)
    }
    verify()
  }, [token])
  const login = (t) => { setToken(t); setIsAdmin(true); localStorage.setItem('adminToken', t) }
  const logout = () => { setToken(null); setIsAdmin(false); localStorage.removeItem('adminToken') }
  return <AuthContext.Provider value={{ token, isAdmin, loading, login, logout }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
