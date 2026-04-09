export const precargarImagenes = (rutas) => {
    const promesas = rutas.map((ruta) => {
        return new Promise((resolve) => {
            const img = new Image()
            img.src = ruta
            // Se resuelve la promesa tanto si hay exito como si hay error
            // Esto evita que la app se quede en carga infinita si una imagen falla
            img.onload = resolve
            img.onerror = resolve 
        })
    })
    return Promise.all(promesas)
}