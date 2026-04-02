/**
 * Transforma un texto en un formato apto para URL
 * @param {string} texto - Cadena a transformar
 */
export const generarSlug = (texto) => {
  if (!texto) return ""
  
  // normalize pertenece al prototipo String de Javascript
  // Se utiliza para descomponer caracteres con tildes en sus componentes base
  return texto
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remueve diacriticos mediante expresiones regulares
    .replace(/[^a-z0-9]/g, "-") // Sustituye caracteres no alfanumericos por guion
    .replace(/-+/g, "-") // Evita la duplicacion de guiones consecutivos
    .replace(/^-|-$/g, "") // Elimina guiones sobrantes en los extremos
}