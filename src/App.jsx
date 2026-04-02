import { useState, useEffect } from 'react'
import { TablaInvitados } from './components/TablaInvitados'
import { leerInvitados } from '../src/services/api'
import './App.css'

function App() {

  const [datos, setDatos] = useState([])

  const cargarDatos = async () => {
    try {
      const invitados = await leerInvitados()
      if (Array.isArray(invitados)) {
        setDatos(invitados)
      } else {
        console.error("La API no devolvio un arreglo: ", invitados)
      }
      
    } catch (error) {
      console.error("Error al obtener los datos: ", error)
    }
  }

  useEffect(() => {
    cargarDatos
  }, [])

  return (
    <>
      <TablaInvitados datos={datos} recargar={cargarDatos} />
    </>
  )
}

export default App
