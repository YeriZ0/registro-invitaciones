import { useState, useEffect } from 'react'
import { TablaInvitados } from './components/TablaInvitados'
import { leerInvitados } from '../src/services/api'
import { Loader } from './components/Loader'

function App() {

  const [datos, setDatos] = useState([])
  const [cargando, setCargando] = useState(true)

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
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarDatos()
  }, [])

  if(cargando) return <Loader />

  return (
    <>
      <TablaInvitados datos={datos} recargar={cargarDatos} />
    </>
  )
}

export default App
