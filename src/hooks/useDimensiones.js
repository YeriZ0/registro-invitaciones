/* import { useState, useEffect, useRef } from 'react'

export const useDimensiones = () => {
    // Almacena el ancho y alto calculados para forzar el renderizado al cambiar
    const [dimensiones, setDimensiones] = useState({ ancho: 0, alto: 0 })
    
    // Proporciona acceso directo al nodo del DOM que se desea medir
    const elementoRef = useRef(null)

    useEffect(() => {
        const elemento = elementoRef.current
        if (!elemento) return

        // Interfaz nativa del navegador para rastrear modificaciones en las dimensiones de un elemento
        const observador = new ResizeObserver((entradas) => {
            const entrada = entradas[0]
            setDimensiones({
                ancho: entrada.contentRect.width,
                alto: entrada.contentRect.height
            })
        })

        // Inicia el rastreo del elemento vinculado
        observador.observe(elemento)

        // Detiene el rastreo al desmontar el componente para prevenir fugas de memoria
        return () => observador.disconnect()
    }, [])

    return [elementoRef, dimensiones]
} */