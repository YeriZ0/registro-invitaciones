import { useState, useMemo } from 'react'
import { generarSlug } from '../utils/text'
import { useWindowWidth } from '../utils/useWindowWidth'
import { toast } from 'vibe-toast'

import { DataGrid } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'

import { 
    IconoGuardar,
    IconoEditar,
    IconoEliminar,
    IconoCopiar
 } from '../assets/icon/IconTable'

export const TablaInvitados = ({ invitados, onActualizar, onEliminar }) => {
    const [editando, setEditando] = useState(null)

    const anchoPantalla = useWindowWidth()
    const esMovil = anchoPantalla < 500

    const guardarCambios = async (id, nuevaReserva, nuevoEstado) => {
        await onActualizar(id, nuevaReserva, nuevoEstado)
        setEditando(null)
    }

    const borrar = async (inv) => {
        await onEliminar(inv.id)
        toast.error.promise(onEliminar, {
            loading: 'Eliminando...',
            success: `Invitación de ${inv.nombre} eliminada!`,
            error: `Error al intentar eliminar a ${inv.nombre}`
        })
    }

    const copiarEnlace = (nombre) => {
        const slug = generarSlug(nombre)
        const urlCompleta = `${window.location.origin}/invitacion/${slug}`

        navigator.clipboard.writeText(urlCompleta)
            .then(() => toast.success(`Enlace de ${nombre} copiado`))
            .catch(err => console.error("Error al copiar el texto: ", err))
    }

    const columns = useMemo (() => [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 20,
            sortable: false,
            disableColumnMenu: true,
        },
        { 
            field: 'nombre', 
            headerName: 'Invitado', 
            flex: 1,
            minWidth: 150,
        },
        {
            field: 'reserva',
            headerName: 'Reserva',
            width: 100,
            // renderCell permite inyectar componentes personalizados en las celdas
            renderCell: (params) => {
                if (editando === params.row.id) {
                    return <input type="number" defaultValue={params.value} id={`res-${params.row.id}`} style={{ width: '100%', height: '60%' }} />
                }
                return params.value
            }
        },
        {
            field: 'estado',
            headerName: 'Estado',
            width: 150,
            renderCell: (params) => {
                if (editando === params.row.id) {
                    return (
                        <select defaultValue={params.value} id={`est-${params.row.id}`} style={{ width: '100%' }}>
                            <option value="pendiente">pendiente</option>
                            <option value="confirmado">confirmado</option>
                            <option value="cancelado">cancelado</option>
                        </select>
                    )
                }
                return params.value
            }
        },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: esMovil ? 170 : 250,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const inv = params.row
                return (
                    <div className="grupo-botones">
                        {editando === inv.id ? 
                            <button 
                                onClick={() => guardarCambios(
                                    inv.id, 
                                    document.getElementById(`res-${inv.id}`).value,
                                    document.getElementById(`est-${inv.id}`).value
                                )}
                                title='Guardar'
                            > 
                                <IconoGuardar size='24' color='var(--text-lienzo-accent-2)' /> 
                            </button>
                            : 
                            <button 
                                onClick={() => setEditando(inv.id)}
                                title='Editar'
                            > 
                                <IconoEditar color='var(--text-lienzo-accent-2)' /> 
                            </button>
                        }
                        <button 
                            onClick={() => borrar(inv)}
                            className='btn-eliminar'
                            title='Eliminar'
                        > <IconoEliminar size='24' color='var(--text-lienzo-accent-2)' /> 
                        </button>

                        <button 
                            onClick={() => copiarEnlace(inv.nombre)}
                            className="btn-copiar"
                            title='Copiar'
                        >
                            <IconoCopiar size='24' color='var(--text-lienzo-accent-2)'/>
                        </button>
                    </div>
                )
            }
        }
    ], [esMovil, editando])

    return (
        <Paper sx={{ 
            height: 600, 
            width: esMovil ? '100%' : '75%',
            borderRadius: '500px' 
        }}>
            <DataGrid
                rows={invitados}
                columns={columns}
                initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
                pageSizeOptions={[10, 20]}
                sx={{ 
                    border: 0,
                    backgroundColor: '#fdfbf7', // Cambia el fondo de la cuadricula
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f5f2eb', // Color diferenciado para la cabecera
                    },
                    '& .MuiDataGrid-row.Mui-selected': {
                        backgroundColor: '#e8e5de',
                        '&:hover': {
                            backgroundColor: '#dfdbd3', 
                        }
                    }
                }}
            />
        </Paper>
    )
}