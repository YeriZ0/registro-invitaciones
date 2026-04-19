import { useState } from 'react'
import { IconoGuardar } from '../assets/icon/IconTable'

export const FormAgregar = ({ alGuardar }) => {
  const [datos, setDatos] = useState({ nombre: '', reserva: 1 })

  const manejarEnvio = (e) => {
    e.preventDefault()
    if (datos.nombre.trim() === '') return
    alGuardar(datos)
    setDatos({ nombre: '', reserva: 1 })
  }

  return (
    <form className="form-agregar-invitado" onSubmit={manejarEnvio}>
      <div className='container-inputs'>
        <input 
          type="text" 
          placeholder="Nombre completo"
          value={datos.nombre}
          onChange={(e) => setDatos({...datos, nombre: e.target.value})}
        />
        <input 
          type="number" 
          min="1"
          value={datos.reserva}
          onChange={(e) => setDatos({...datos, reserva: e.target.value})}
        />
      </div>
      <button type="submit" className="btn-icon-save">
        <IconoGuardar size="20px" color="white" />
        <span>Agregar</span>
      </button>
    </form>
  )
}