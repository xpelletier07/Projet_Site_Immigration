import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MenuClient from './components/MenuClient'
import MenuUtilisateur from './components/MenuUtilisateur'
import SuiviDemande from './pages/SuiviDemande'
import './App.css'

function App() {
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier le rôle de l'utilisateur depuis le token ou localStorage
    const role = localStorage.getItem('userRole')
    setUserRole(role)
    setLoading(false)
  }, [])

  if (loading) {
    return <div>Chargement...</div>
  }

  return (
    <Router>
      <div className="app-container">
        {userRole === 'client' && <MenuClient />}
        {userRole === 'utilisateur' && <MenuUtilisateur />}
        
        <main className="main-content">
          <Routes>
            {/* Routes Client */}
            {userRole === 'client' && (
              <>
                <Route path="/client/suivi" element={<SuiviDemande />} />
                <Route path="/client/*" element={<Navigate to="/client/suivi" />} />
              </>
            )}
            
            {/* Routes Utilisateur */}
            {userRole === 'utilisateur' && (
              <>
                <Route path="/utilisateur/suivi" element={<SuiviDemande />} />
                <Route path="/utilisateur/*" element={<Navigate to="/utilisateur/suivi" />} />
              </>
            )}
            
            {/* Redirection par défaut */}
            <Route path="/" element={<Navigate to={userRole === 'client' ? '/client/suivi' : '/utilisateur/suivi'} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
