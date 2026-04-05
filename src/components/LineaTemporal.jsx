import '../styles/lineaTemporal.css'

export const LineaTemporal = ({ data = [] }) => {
  // Verificamos si hay datos para evitar errores de renderizado
  if (!data || data.length === 0) return null

  return (
    <>
        <div className="timeline-container">
        <ul className="timeline-list">
            {data.map((item, index) => (
                <li 
                key={index} 
                style={{ '--accent-color': item.accentColor || 'var(--accent)' }}
                className="timeline-item"
                >
                <div className="date">{item.date}</div>
                <div className="title">{item.title}</div>
                <div className="descr">{item.descr}</div>
                </li>
            ))}
        </ul>
        </div>
    </>
  )
}