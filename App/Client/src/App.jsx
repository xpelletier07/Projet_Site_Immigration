import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MenuClient from './components/MenuClient'
import MenuUtilisateur from './components/MenuUtilisateur'
import Home from './pages/Home'
import DashboardClient from './pages/DashboardClient'
import DemandChangementStatus from './pages/DemandChangementStatus'
import SuiviDemande from './pages/SuiviDemande'
import './App.css'

function App() {
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier le rôle de l'utilisateur depuis localStorage
    const role = localStorage.getItem('userRole')
    setUserRole(role)
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
            {/* Page d'accueil */}
            <Route path="/" element={!userRole ? <Home onSetRole={setUserRole} /> : <Navigate to={userRole === 'client' ? '/client/dashboard' : '/utilisateur/dashboard'} />} />
            
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
            {userRole && <Route path="/*" element={<Navigate to={userRole === 'client' ? '/client/dashboard' : '/utilisateur/dashboard'} />} />}
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
