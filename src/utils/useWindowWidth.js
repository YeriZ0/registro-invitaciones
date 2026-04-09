import { useState, useEffect } from 'react'

// Utilidad personalizada para obtener el ancho de la ventana
// Utiliza los hooks nativos de React para manejar el estado y los ciclos de vida
export const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        // Funcion manejadora que actualiza el estado con el ancho actual
        const handleResize = () => setWidth(window.innerWidth)

        // Se agrega un escuchador de eventos al objeto global window
        window.addEventListener('resize', handleResize)

        // Funcion de limpieza para evitar fugas de memoria al desmontar
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return width
}