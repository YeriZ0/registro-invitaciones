import { useState, useEffect } from 'react'
import { TablaInvitados } from './components/TablaInvitados'
import { leerInvitados } from '../src/services/api'
import './App.css'

function App() {

  const [datos, setDatos] = useState([])

  const cargarDatos = async () => {
    try {
      const invitados = await leerInvitados()
      setDatos(invitados)
    } catch (error) {
      console.error("Erroral obtener los datos: ", error)
    }
  }

  useEffect(() => {
    cargarDatos()
  }, [])

  return (
    <>
      <TablaInvitados datos={datos} recargar={cargarDatos}/>
    </>
  )
}

export default App
