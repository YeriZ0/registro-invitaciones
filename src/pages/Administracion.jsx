import { useState, useEffect } from 'react'
import { FormAgregar } from '../components/FormAgregar'
import { TablaTotales } from '../components/TablaTotales'
import { TablaInvitados } from '../components/TablaInvitados'
import { Loader } from '../components/Loader'

import { Toaster, toast } from 'vibe-toast'
import { leerInvitados, leerTotales, agregarNuevoInvitado, actualizarDatos, eliminarRegistro } from '../services/api'
import { generarSlug } from '../utils/text'

import '../styles/admin.css'

export const Administracion = () => {
    const [invitados, setInvitados] = useState([])
    const [totales, setTotales] = useState([])
    const [cargando, setCargando] = useState(true)

    const cargarDatos = async () => {
        try {
            const [lista, resumen] = await Promise.all([
                leerInvitados(),
                leerTotales()
            ])
            setInvitados(lista)
            setTotales(resumen)
        } catch (error) {
            console.error("Error al sincronizar datos:", error)
        } finally {
            setCargando(false)
        }
    }

    useEffect(() => {
        cargarDatos()
    }, [])

    const handleAgregar = async (nuevo) => {
        // Se pasa la ejecucion de la promesa y los mensajes para cada estado
        toast.promise(agregarNuevoInvitado(nuevo), {
            loading: 'Registrando invitado...',
            success: (resultado) => {
                if (resultado.completado) {
                    const slug = generarSlug(nuevo.nombre)
                    const urlInvitacion = `${window.location.origin}/invitacion/${slug}`
                    navigator.clipboard.writeText(urlInvitacion)
                    cargarDatos()
                    return 'Invitado registrado y enlace copiado'
                }
                throw new Error('Error en el registro')
            },
            error: 'No se pudo registrar al invitado'
        })
    }

    // Ejecuta la peticion de actualizacion y sincroniza los datos
    const handleActualizar = async (id, reserva, estado) => {
        toast.promise(actualizarDatos(id, reserva, estado), {
            loading: 'Actualizando registro...',
            success: () => {
                cargarDatos()
                return 'Registro del invitado actualizado'
            },
            error: 'Error al actualizar el registro'
        })
    }

    const handleEliminar = async (id) => {
        // La promesa maneja el estado de carga mientras se ejecuta eliminarRegistro
        toast.promise(eliminarRegistro(id), {
            loading: 'Eliminando registro...',
            success: () => {
                cargarDatos()
                return 'Invitado eliminado correctamente'
            },
            error: 'Error al intentar eliminar'
        })
    }

    if (cargando) return <Loader />

    return (
        <div className="admin-layout">
            <h1 className="titulo-admin" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                Panel de Gestion de Invitados
            </h1>

            <section className="admin-section">
                <h3>Registrar Nuevo Invitado</h3>
                <FormAgregar alGuardar={handleAgregar} />
            </section>

            <section className="admin-section">
                <TablaTotales totales={totales} />
            </section>

            <section className="admin-section">
                <h3>Lista de Invitados</h3>
                <TablaInvitados 
                    invitados={invitados} 
                    onActualizar={handleActualizar}
                    onEliminar={handleEliminar}
                />
            </section>

            <Toaster position="top-center" />
        </div>
    )   
}