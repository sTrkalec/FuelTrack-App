// components/VehicleDataGrid.tsx
import * as React from 'react';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import moment from "moment";


interface Fuel {
  model: string;
  plate: string;
  amount: number;
  renavam: string;
  fuelType: number;
  price: number;
  vehicle: any[];
  createdAt: string;
}

interface FuelDataGridProps {
  fueling: Fuel[];
  onVehicleSelect: (vehicleId: any | null) => void;
}

const columns: GridColDef[] = [
  { field: 'model', headerName: 'Modelo', width: 130 },
  { field: 'plate', headerName: 'Placa', width: 130 },
  { field: 'amount', headerName: 'Quantidade de litros', width: 170 },
  { field: 'fuelType', headerName: 'Tipo gás', width: 130 },
  { field: 'price', headerName: 'Preço', width: 130 },
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
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={fueling}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={handleSelectionModelChange}
      />
    </div>
  );
};