import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterUser} from './router/RouterUser.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterUser/>
  </StrictMode>,
)
