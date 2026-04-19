import { DataGrid } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'

import { useWindowWidth } from '../utils/useWindowWidth'

export const TablaTotales = ({ totales }) => {

  const anchoPantalla = useWindowWidth()
  const esMovil = anchoPantalla < 500

  const columns = [
    {
      field: 'tipo',
      headerName: 'Categoria',
      minWidth: 120,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: 'invitados',
      headerName: '# Invitados',
      maxWidth: 200,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: 'reservas',
      headerName: '# Reservas',
      maxWidth: 200,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
    }
  ]

  return (
    <Paper sx={{ 
      height: '100%', 
      width: esMovil ? '100%' : '75%'
    }}>
      <DataGrid 
        rows={totales}
        columns={columns}
        hideFooter={true}
        getRowId={(row) => row.tipo}
        sx={{ 
          border: 0,
          backgroundColor: '#fdfbf7', // Cambia el fondo de la cuadricula
          '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f2eb', // Color diferenciado para la cabecera
          },
          '& .MuiDataGrid-row.Mui-selected': {
              backgroundColor: '#e8e5de',
              '&:hover': {
                  backgroundColor: '#dfdbd3', 
              }
          }
        }}
      />
    </Paper>
  )
}