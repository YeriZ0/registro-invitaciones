import '../styles/decoracion.css'

export const DecoracionHoja = ({ 
  fila = 1, 
  columna = 1, 
  size = '100px', 
  top, left, right, bottom, 
  rotation = 0 
}) => {
  // Clase dinámica basada en fila y columna
  const clasePosicion = `h-${fila}-${columna}`
  
  // Estilo en línea para controlar la posición y rotación libremente
  const wrapperStyle = {
    width: size,
    height: size,
    top,
    left,
    right,
    bottom,
    transform: `rotate(${rotation}deg)`
  }

  return (
    <div className="sprite-hoja-contenedor" style={wrapperStyle}>
      <div className={`sprite-hoja ${clasePosicion}`} />
    </div>
  )
}