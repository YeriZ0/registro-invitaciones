// Icono para guardar cambios en la tabla
export const IconoGuardar = ({ size = "24px", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      fill={color} 
      d="M20 7.423v10.962q0 .69-.462 1.153T18.384 20H5.616q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h10.961zm-6.587 8.529q.587-.586.587-1.414t-.587-1.413T12 12.539t-1.413.586T10 14.538t.587 1.414t1.413.586t1.414-.586M6.768 9.769h7.423v-3H6.77z" 
    />
  </svg>
)

// Icono para editar registros existentes
export const IconoEditar = ({ size = "24px", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      fill={color} 
      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z" 
    />
  </svg>
)

// Icono para eliminar filas de la tabla
export const IconoEliminar = ({ size = "24px", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      fill={color} 
      d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z" 
    />
  </svg>
)

// Icono para copiar el enlace de invitacion
export const IconoCopiar = ({ size = "24px", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="14" height="14" x="8" y="2" fill={color} rx="2" ry="2" />
    <path 
      fill={color} 
      d="M8.5 18A2.5 2.5 0 0 1 6 15.5V8H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-2z" 
    />
  </svg>
)