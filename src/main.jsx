import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App.jsx'
import { Invitacion } from './components/Invitacion.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/gestion-invitados-boda" element={<App />} />
        <Route path="/invitacion/:slug" element={<Invitacion />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
