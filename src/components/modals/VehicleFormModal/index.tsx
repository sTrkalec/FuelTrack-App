import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { type } from "os";
import { useState } from "react"; 
import { setUserVehicle } from "../../../services/Home/services";
7


interface Vehicle {
  plate: string,
  renavam: string,
  color: string,
  power: number,
  model: string,
  brand: string
}

interface CustomError {
  message: string;
}

export const VehicleFormModal: React.FC<{ open: boolean; onClose: () => void; onRefresh: () => void }> = ({
  open,
  onClose,
  onRefresh,
}) => {
  const [newVehicle, setNewVehicle] = useState<Vehicle>({
    plate: "",
    renavam: "",
    color: "",
    power: 0,
    model: "",
    brand: ""
  });
  const [shouldUpdateList, setShouldUpdateList] = useState(false);

  const setVehicle = async (data: Vehicle) => {
    try {
      console.log(data.color)
      let setVehicle: object = await setUserVehicle(data.plate, data.renavam, data.color, Number(data.power), data.model, data.brand)
      console.log(setVehicle) 
      onRefresh(); // atualiza a lista de veículos
      handleClose(); // fecha o modal
    } catch (error:unknown) {
      const customError = error as CustomError;

      alert(customError.message)
    }
  }

  const handleClose = () => {
    setShouldUpdateList(true);
    setNewVehicle({
      plate: "",
      renavam: "",
      color: "",
      power: 0,
      model: "",
      brand: ""
    });
    onClose();
  };




  const handleCancel = () => {
    handleClose();
    setNewVehicle({
      plate: "",
      renavam: "",
      color: "",
      power: 0,
      model: "",
      brand: ""
    });
  }

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Criar novo veículo</DialogTitle>
      <DialogContent>
        <TextField
          label="Marca"
          fullWidth
          placeholder="Porsher"
          value={newVehicle.brand}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, brand: capitalizeFirstLetter(e.target.value) })
          }
        />
        <TextField
          label="Modelo"
          placeholder="911-GT3-RS"
          fullWidth
          value={newVehicle.model}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, model: capitalizeFirstLetter(e.target.value) })
          }
        />
        <TextField
          label="Cor"
          placeholder="Cinza"
          fullWidth
          value={newVehicle.color}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, color: capitalizeFirstLetter(e.target.value) })
          }
        />
        <TextField
          label="Placa"
          fullWidth
          placeholder="AAA-0000"
          value={newVehicle.plate}
          onChange={(e) => {
            let plate = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
            if (plate.length > 3) {
              plate = `${plate.slice(0, 3)}-${plate.slice(3, 7)}`;
            }
            setNewVehicle({ ...newVehicle, plate });
          }}
          inputProps={{ maxLength: 8 }}
        />
        <TextField
          label="Potência"
          fullWidth
          value={newVehicle.power}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, power: Number(e.target.value) })
          }
          onKeyPress={(e) => {
            const regex = /[0-9]|\./;
            const key = String.fromCharCode(e.charCode);
            if (!regex.test(key)) {
              e.preventDefault();
            }
          }}
          InputProps={{
            inputProps: {
              pattern: "[0-9]*"
            }
          }}
        />
        <TextField
          label="RENAVAM"
          fullWidth
          value={newVehicle.renavam}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, renavam: capitalizeFirstLetter(e.target.value) })
          }
          inputProps={{ maxLength: 11 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancelar</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setVehicle(newVehicle)}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
