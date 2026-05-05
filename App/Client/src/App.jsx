import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MenuClient from './components/MenuClient'
import MenuUtilisateur from './components/MenuUtilisateur'
import Login from './pages/Login'
import './App.css'

function App() {
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
<<<<<<< Updated upstream
    const token = sessionStorage.getItem('token')
    const role = sessionStorage.getItem('userRole')

    setUserRole(token && role ? role : null)
=======
    const role = localStorage.getItem('userRole')
    setUserRole(role)
>>>>>>> Stashed changes
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="loading">Chargement...</div>
  }

  return (
    <Router>
      {!userRole ? (
        <Routes>
          <Route path="/login" element={<Login onSetRole={setUserRole} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : userRole === 'client' ? (
        <MenuClient />
      ) : userRole === 'utilisateur' ? (
        <MenuUtilisateur />
      ) : (
        <Navigate to="/login" />
      )}
    </Router>
  )
}

export default App
