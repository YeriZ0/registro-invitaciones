const URL_BASE = import.meta.env.VITE_API_URL

// Obtiene la informacion del invitado por su nombre
export const leerInvitadoUnico = async (invitado) => {
    const query = `?ruta=invitadoUnico&invitado=${invitado}`
    const res = await fetch(`${URL_BASE}${query}`)
    return await res.json()
}

// Obtiene la lista de invitados desde la ruta correspondiente
export const leerInvitados = async () => {
    const res = await fetch(`${URL_BASE}?ruta=invitados`)
    return await res.json()
}

// Obtiene los datos de la tabla de totales
export const leerTotales = async () => {
    const res = await fetch(`${URL_BASE}?ruta=totales`)
    return await res.json()
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

// Crea un nuevo registro en la tabla
export const agregarRegistro = async (id, nombre, reserva) => {
    const query = `?ruta=agregar&id=${id}&nombre=${nombre}&reserva=${reserva}`
    const res = await fetch(`${URL_BASE}${query}`)
    return await res.json()
}