import { useState } from 'react'
import { generarSlug } from '../utils/text'
import { toast } from 'vibe-toast'

import { 
    IconoGuardar,
    IconoEditar,
    IconoEliminar,
    IconoCopiar
 } from '../assets/icon/IconTable'

export const TablaInvitados = ({ invitados, onActualizar, onEliminar }) => {
    const [editando, setEditando] = useState(null)

    const guardarCambios = async (id, nuevaReserva, nuevoEstado) => {
        await onActualizar(id, nuevaReserva, nuevoEstado)
        setEditando(null)
    }

    const borrar = async (inv) => {
        await onEliminar(inv.id)
        toast.error(`Invitación de ${inv.nombre} eliminada!`)
    }

    const copiarEnlace = (nombre) => {
        const slug = generarSlug(nombre)
        const urlCompleta = `${window.location.origin}/invitacion/${slug}`

        navigator.clipboard.writeText(urlCompleta)
            .then(() => toast.success(`Enlace de ${nombre} copiado`))
            .catch(err => console.error("Error al copiar el texto: ", err))
    }

    return (
        <div className="table-container">
            <table className='tabla-invitados'>
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
                    {invitados.map((inv, index) => (
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
                                    <button onClick={() => borrar(inv)}> <IconoEliminar size='24' color='red' /> </button>
                                    <button 
                                        onClick={() => copiarEnlace(inv.nombre)}
                                        className="btn-copiar"
                                    >
                                        <IconoCopiar size='24' color='var(--text-lienzo-accent-2)'/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}