import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button } from '@mui/material';

type Vehicle = {
  id: number;
  placa: string;
  renavam: string;
  cor: string;
  potencia: string;
  modelo: string;
  marca: string;
};

export function VehicleList(){
  const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    // Carregar os dados dos veículos aqui (substituir este exemplo de veículos)
    const fetchVehicles = async () => {
      const fetchedVehicles: Vehicle[] = [
        { id: 1, placa: 'ABC-1234', renavam: '123456789', cor: 'Vermelho', potencia: '120cv', modelo: 'Modelo X', marca: 'Marca Y' },
        // ...
      ];
      setVehicles(fetchedVehicles);
    };
    fetchVehicles();
  }, []);

  const handleEditVehicle = () => {
    if (selectedVehicle !== undefined) {
      // Lógica para editar o veículo selecionado
    }
  };

  const handleRemoveVehicle = () => {
    if (selectedVehicle !== undefined) {
      // Lógica para remover o veículo selecionado
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>Placa</TableCell>
              <TableCell>Renavam</TableCell>
              <TableCell>Cor</TableCell>
              <TableCell>Potência</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Marca</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow
                key={vehicle.id}
                onClick={() => setSelectedVehicle(selectedVehicle === vehicle.id ? undefined : vehicle.id)}
                selected={selectedVehicle === vehicle.id}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={selectedVehicle === vehicle.id} />
                </TableCell>
                <TableCell>{vehicle.placa}</TableCell>
                <TableCell>{vehicle.renavam}</TableCell>
                <TableCell>{vehicle.cor}</TableCell>
                <TableCell>{vehicle.potencia}</TableCell>
                <TableCell>{vehicle.modelo}</TableCell>
                <TableCell>{vehicle.marca}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={handleEditVehicle} disabled={selectedVehicle === undefined}>
        Editar
      </Button>
      <Button variant="contained" color="secondary" onClick={handleRemoveVehicle} disabled={selectedVehicle === undefined}>
        Remover
      </Button>
    </div>
  );
};

