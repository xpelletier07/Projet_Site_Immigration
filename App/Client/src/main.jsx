import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DashboardClient } from './Client/Dashboard_client.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DashboardClient />
  </StrictMode>,
)
