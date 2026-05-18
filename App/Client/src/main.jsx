import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GlobalRouter from './router/Global.router.jsx'
import { BrowserRouter } from "react-router-dom";
import Menu from './commun/menu.jsx'
import { ToastProvider } from './commun/Toast.jsx'

import "./assets/Bulma/css/bulma.min.css";
import './assets/css/global.css'
import './assets/css/login.css'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <Menu />
        <GlobalRouter />
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
