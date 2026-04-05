export const sizeVariable = (min, vw, max) => {
    // Retorna una regla clamp para manejar escalas fluidas
    return `clamp(${min}px, ${vw}vw, ${max}px)`
}