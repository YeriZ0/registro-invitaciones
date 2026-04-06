const URL_BASE = import.meta.env.VITE_API_URL

// Obtiene la informacion del invitado por su nombre
export const leerInvitadoUnico = async (invitado) => {
    const query = `?ruta=invitadoUnico&invitado=${invitado}`
    const res = await fetch(`${URL_BASE}${query}`)
    return await res.json()
}

// Obtiene la lista de invitados desde la ruta correspondiente
export const leerInvitados = async () => {
    try {
        const res = await fetch(`${URL_BASE}?ruta=invitados&t=${Date.now()}`)
        const data = await res.json()
        return Array.isArray(data) ? data : []
    } catch (error) {
        console.error("Error al obtener invitados:", error)
        return []
    }
    
}

// Obtiene los datos de la tabla de totales
export const leerTotales = async () => {
    try {
        const res = await fetch(`${URL_BASE}?ruta=totales&t=${Date.now()}`)
        const data = await res.json()
        return Array.isArray(data) ? data : []
    } catch (error) {
        console.error("Error al obtener totales:", error)
        return []
    }
}

// Envia datos para actualizar reserva y estado
export const actualizarDatos = async (id, reserva, estado) => {
    const query = `?ruta=actualizar&id=${id}&reserva=${reserva}&estado=${estado}`
    const res = await fetch(`${URL_BASE}${query}`)
    return await res.json()
}

// Envia peticion para remover un registro
export const eliminarRegistro = async (id) => {
    const res = await fetch(`${URL_BASE}?ruta=eliminar&id=${id}`)
    return await res.json()
}

/* // Crea un nuevo registro en la tabla
export const agregarRegistro = async (id, nombre, reserva) => {
    const query = `?ruta=agregar&id=${id}&nombre=${nombre}&reserva=${reserva}`
    const res = await fetch(`${URL_BASE}${query}`)
    return await res.json()
} */
export const agregarNuevoInvitado = async (invitado) => {
    try {
        const id = Date.now().toString()
        // URLSearchParams es una API nativa para estructurar parametros de red
        const params = new URLSearchParams({
            ruta: "agregar",
            id: id,
            nombre: invitado.nombre,
            reserva: invitado.reserva
        })
        
        const res = await fetch(`${URL_BASE}?${params.toString()}`)
        return await res.json()
    } catch (error) {
        console.error("Error al agregar invitado:", error)
        return { completado: false }
    }
}