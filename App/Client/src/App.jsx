import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MenuClient from './components/MenuClient'
import MenuUtilisateur from './components/MenuUtilisateur'
import Login from './pages/Login'
import Home from './pages/Home'
import DashboardClient from './pages/DashboardClient'
import DemandChangementStatus from './pages/DemandChangementStatus'
import SuiviDemande from './pages/SuiviDemande'
import './App.css'

function App() {
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    const role = sessionStorage.getItem('userRole')

    setUserRole(token && role ? role : null)
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="loading">Chargement...</div>
  }

  return (
    <Router>
      <div className="app-container">
        {userRole === 'client' && <MenuClient />}
        {userRole === 'utilisateur' && <MenuUtilisateur />}
        
        <main className="main-content">
          <Routes>
            {/* Pages publiques */}
            <Route path="/login" element={<Login onSetRole={setUserRole} />} />
            <Route path="/home" element={<Home onSetRole={setUserRole} />} />
            
            {/* Routes Client */}
            {userRole === 'client' && (
              <>
                <Route path="/client/dashboard" element={<DashboardClient />} />
                <Route path="/client/suivi" element={<SuiviDemande />} />
                <Route path="/client/changement-status" element={<DemandChangementStatus />} />
                <Route path="/client/*" element={<Navigate to="/client/dashboard" />} />
              </>
            )}
            
            {/* Routes Utilisateur */}
            {userRole === 'utilisateur' && (
              <>
                <Route path="/utilisateur/dashboard" element={<DashboardClient />} />
                <Route path="/utilisateur/suivi" element={<SuiviDemande />} />
                <Route path="/utilisateur/changement-status" element={<DemandChangementStatus />} />
                <Route path="/utilisateur/*" element={<Navigate to="/utilisateur/dashboard" />} />
              </>
            )}
            
            {/* Route par défaut */}
            <Route path="/" element={
              userRole ? (
                <Navigate to={userRole === 'client' ? '/client/dashboard' : '/utilisateur/dashboard'} />
              ) : (
                <Navigate to="/login" />
              )
            } />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
