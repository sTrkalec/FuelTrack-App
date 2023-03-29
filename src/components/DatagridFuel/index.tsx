// components/VehicleDataGrid.tsx
import * as React from 'react';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import moment from "moment";
import { createTheme, ThemeProvider } from '@mui/material/styles';



interface Fuel {
  model: string;
  plate: string;
  amount: number;
  renavam: string;
  fuelType: number;
  price: number;
  vehicle: {
    id: number;
    plate: string;
    renavam: string;
    color: string;
    power: number;
    model: string;
    brand: string;
    userId: number;
    createdAt: string;
  };
  createdAt: string;
}

interface FuelDataGridProps {
  fueling: Fuel[];
  onVehicleSelect: (vehicleId: any | null) => void;
}

const customTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const columns: GridColDef[] = [
  {
    field: 'vehicle.model',
    headerName: 'Modelo',
    width: 130,
    valueGetter: (params) => params.row.vehicle?.model ?? '',
  },
  {
    field: 'vehicle.plate',
    headerName: 'Placa',
    width: 130,
    valueGetter: (params) => params.row.vehicle?.plate ?? '',
  },
  { field: 'amount', headerName: 'Quantidade de litros', width: 170, align: 'center' },
  { field: 'fuelType', headerName: 'Tipo gás', width: 130 },
  {
    field: 'price',
    headerName: 'Preço',
    width: 130,
    valueFormatter: (params) => `R$ ${params.value}`,
  },
  {
    field: 'createdAt',
    headerName: 'Data de criação',
    width: 200,
    valueFormatter: (params) => moment(params.value).format('DD/MM/YYYY HH:mm:ss'),
  },
];


export const FuelDataGrid: React.FC<FuelDataGridProps> = ({ fueling, onVehicleSelect }) => {

  const handleSelectionModelChange = (newSelection: GridRowId[]) => {
    const selectedVehicleIds = newSelection.map((selection) => Number(selection));
    onVehicleSelect(selectedVehicleIds);
  };

  return (
    <div style={{ height: "85vh", width: '100%' }}>
      <ThemeProvider theme={customTheme}>
        <DataGrid
          rows={fueling}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={handleSelectionModelChange}
        />
      </ThemeProvider>


    </div>
  );
};