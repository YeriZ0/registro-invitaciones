import { useState } from 'react'
import { actualizarDatos, eliminarRegistro } from '../services/api'
import { generarSlug } from '../utils/text'

import { 
    IconoGuardar,
    IconoEditar,
    IconoEliminar,
    IconoCopiar
 } from '../assets/icon/IconTable'

export const TablaInvitados = ({ datos, recargar }) => {
    const [editando, setEditando] = useState(null)

    const guardarCambios = async (id, nuevaReserva, nuevoEstado) => {
        await actualizarDatos(id, nuevaReserva, nuevoEstado)
        setEditando(null)
        recargar() // Actualiza la lista tras guardar
    }

    const borrar = async (id) => {
        await eliminarRegistro(id)
        recargar() // Actualiza la lista tras borrar
    }

    const copiarEnlace = (nombre) => {
        const slug = generarSlug(nombre)
        const urlCompleta = `${window.location.origin}/invitacion/${slug}`

        navigator.clipboard.writeText(urlCompleta)
            .then(() => alert(`Enlace de ${nombre} copiado`))
            .catch(err => console.error("Error al copiar el texto: ", err))
    }

    // Verifica si hay datos antes
    if (!datos || datos.length === 0) {
        return <p>Cargando lista de invitados...</p>
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Invitado</th>
                    <th>Reserva</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {datos.map((inv, index) => (
                    <tr key={inv.id || `fila-${index}`}>
                        <td>{inv.id}</td>
                        <td>{inv.nombre}</td>
                        <td>
                            {editando === inv.id ? 
                                <input type="number" defaultValue={inv.reserva} id={`res-${inv.id}`} /> 
                                : inv.reserva}
                        </td>
                        <td>
                            {editando === inv.id ?
                                <select defaultValue={inv.estado} id={`est-${inv.id}`}>
                                    <option value="pendiente">pendiente</option>
                                    <option value="confirmado">confirmado</option>
                                    <option value="cancelado">cancelado</option>
                                </select>
                                : inv.estado}
                        </td>
                        <td>
                            <div className="grupo-botones">
                                {editando === inv.id ? 
                                    <button onClick={() => guardarCambios(
                                        inv.id, 
                                        document.getElementById(`res-${inv.id}`).value,
                                        document.getElementById(`est-${inv.id}`).value
                                    )}> <IconoGuardar size='24' /> </button>
                                    : <button onClick={() => setEditando(inv.id)}> <IconoEditar /> </button>
                                }
                                <button onClick={() => borrar(inv.id)}> <IconoEliminar /> </button>
                                {/* Boton para generar y copiar el enlace personalizado */}
                                <button 
                                    onClick={() => copiarEnlace(inv.nombre)}
                                    className="btn-copiar"
                                >
                                    <IconoCopiar size='24' />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}