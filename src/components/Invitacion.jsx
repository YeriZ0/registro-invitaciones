import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { leerInvitadoUnico, actualizarDatos } from '../services/api'

export const Invitacion = () => {
    const [datos, setDatos] = useState(null)
    const [cargando, setCargando] = useState(true)
    const { slug } = useParams()
    
    useEffect(() => {
        const traerDatos = async () => {
            try {
                const resultado = await leerInvitadoUnico(slug)
                setDatos(resultado)
            } catch (error) {
                console.error("Error al cargar la invitacion: ", error)
            } finally {
                setCargando(false)
            }
        }
        traerDatos()
    }, [slug])

    const confirmar = async (nuevoEstado) => {
        const res = await actualizarDatos(datos.id, datos.reserva, nuevoEstado)
        if (res.completado) {
            setDatos({...datos, estado: nuevoEstado})
        }
    }

    if (cargando) return <p>Cargando invitacion...</p>
    if (!datos || !datos.encontrado) return <p>Invitacion no encontrada</p>

    return (
        <div className="card-invitacion">
        <h1>¡Hola {datos.nombre}!</h1>
        <p>Has sido invitado a nuestra celebracion</p>
        <p>Lugares reservados: <strong>{datos.reserva}</strong></p>
        <p>Tu estado actual: {datos.estado}</p>
        
        <div className="acciones">
            <button onClick={() => confirmar('confirmado')}>Confirmar Asistencia</button>
            <button onClick={() => confirmar('cancelado')}>No podre asistir</button>
        </div>
        </div>
    )
}