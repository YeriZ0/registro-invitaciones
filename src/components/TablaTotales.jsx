export const TablaTotales = ({ totales = [] }) => {
  return (
    <div className="contenedor-totales">
      <h3>Resumen de Asistencia</h3>
      <table className="tabla-admin">
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Invitados</th>
            <th>Reservas</th>
          </tr>
        </thead>
        <tbody>
          {totales.map((item, index) => (
            <tr key={index}>
              <td>{item.tipo}</td>
              <td>{item.invitados}</td>
              <td>{item.reservas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}