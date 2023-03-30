// components/VehicleDataGrid.tsx
import * as React from 'react';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import moment from "moment";
import { createTheme, ThemeProvider } from '@mui/material/styles';


interface Vehicle {
  id: number;
  brand: string;
  model: string;
  color: string;
  plate: string;
  power: number;
  renavam: string;
  userId: number;
  refuelings: any[];
  createdAt: string;
}

interface VehicleDataGridProps {
  vehicles: Vehicle[];
  onVehicleSelect: (vehicleId: any | null) => void;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'brand', headerName: 'Marca', width: 130 },
  { field: 'model', headerName: 'Modelo', width: 130 },
  { field: 'color', headerName: 'Cor', width: 130 },
  { field: 'plate', headerName: 'Placa', width: 130 },
  { field: 'power', headerName: 'Potência', width: 130 },
  { field: 'renavam', headerName: 'Renavam', width: 130 },
  {
    field: 'createdAt',
    headerName: 'Data de criação',
    width: 200,
    valueFormatter: (params) => moment(params.value).format('DD/MM/YYYY HH:mm:ss'),
  },
];

const customTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const VehicleDataGrid: React.FC<VehicleDataGridProps> = ({ vehicles, onVehicleSelect }) => {

  const handleSelectionModelChange = (newSelection: GridRowId[]) => {
    const selectedVehicleIds = newSelection.map((selection) => Number(selection));
    onVehicleSelect(selectedVehicleIds);
  };

  return (
    <div style={{ height: "85vh", width: '100%' }}>
      <ThemeProvider theme={customTheme}>
        <DataGrid
          rows={vehicles}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={handleSelectionModelChange}
        />
      </ThemeProvider>
    </div>
  );
};