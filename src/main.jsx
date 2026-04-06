import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App.jsx'
import { Administracion } from './pages/Administracion.jsx'
import { Invitacion } from './pages/Invitacion.jsx'

import './styles/font.css'
import './styles/index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/gestion-invitados-boda" element={<Administracion />} />
        <Route path="/invitacion/:slug" element={<Invitacion />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
