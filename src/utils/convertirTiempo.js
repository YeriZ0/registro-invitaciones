/**
 * Convierte un valor numerico de segundos a formato legible
 * @param {number} segundosTotales - Tiempo en segundos
 * @returns {string} Cadena en formato HH:MM:SS
 */
export const convertirTiempo = (segundosTotales) => {
  // El metodo toFixed(2) de la clase Number limita los decimales
  // parseFloat asegura que el valor se mantenga numerico
  const valorBase = parseFloat(segundosTotales.toFixed(2))

  // La biblioteca Math provee metodos de redondeo para obtener enteros
  const horas = Math.floor(valorBase / 3600)
  const minutos = Math.floor((valorBase % 3600) / 60)
  const segundos = Math.floor(valorBase % 60)

  // padStart es un metodo de String para completar la longitud del texto con ceros
  const hh = horas.toString().padStart(2, '0')
  const mm = minutos.toString().padStart(2, '0')
  const ss = segundos.toString().padStart(2, '0')

  if (hh != '00') return `${hh}${mm}:${ss}`

  return `${mm}:${ss}`
}