import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { editRefuelId, getRefuelById } from "../../../services/Fuel/service";

interface Refuel {
    id: number,
    amount: number,
    fuelType: string,
    price: number,
    vehicleId: number,
}

interface CustomError {
    message: string;
}

export const EditRefuelModal: React.FC<{ open: boolean; onClose: () => void; onRefresh: () => void; id: number[] }> = ({
    open,
    onClose,
    onRefresh,
    id
}) => {
    const [newRefuel, setNewRefuel] = useState<Refuel>({
        id: 0,
        amount: 0,
        fuelType: "",
        price: 0,
        vehicleId: 0,
    });
    const [shouldUpdateList, setShouldUpdateList] = useState(false);

    useEffect(() => {
        if (open) {
            const fetchRefuel = async () => {
                const fetchedRefuel = await getRefuelById(id[0]);
                setNewRefuel(fetchedRefuel as Refuel);
            }
            fetchRefuel();
        }
    }, [open]);

    const saveRefuel = async (data: Refuel) => {
        try {
            await editRefuelId(data.id, data.vehicleId, data.amount, data.fuelType, data.price);
            console.log(data, "data do modal");
            onRefresh();
            handleClose();
        } catch (error: unknown) {
            const customError = error as CustomError;
            alert(customError.message);
        }
    }

    const handleClose = () => {
        setShouldUpdateList(true);
        setNewRefuel({
            id: 0,
            amount: 0,
            fuelType: "",
            price: 0,
            vehicleId: 0,
            
        });
        onClose();
    };

    const handleCancel = () => {
        handleClose();
        setNewRefuel({
            id: 0,
            amount: 0,
            fuelType: "",
            price: 0,
            vehicleId: 0,
        });
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Abastecimento</DialogTitle>
            <DialogContent>
                <TextField
                    label="Quantidade de Combustível"
                    fullWidth
                    placeholder="50"
                    value={newRefuel.amount}
                    onChange={(e) => setNewRefuel({ ...newRefuel, amount: Number(e.target.value) })}
                />
                <FormControl fullWidth>
                    <InputLabel>Tipo de Combustível</InputLabel>
                    <Select
                        value={newRefuel.fuelType}
                        onChange={(e) => setNewRefuel({ ...newRefuel, fuelType: e.target.value as string })}
                    >
                        <MenuItem value="Gasolina">Gasolina</MenuItem>
                        <MenuItem value="Álcool">Álcool</MenuItem>
                        <MenuItem value="Diesel">Diesel</MenuItem>
                        <MenuItem value="GNV">GNV</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Preço"
                    placeholder="100"
                    fullWidth
                    value={newRefuel.price}
                    onChange={(e) => setNewRefuel({ ...newRefuel, price: Number(e.target.value) })}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancelar</Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => saveRefuel(newRefuel)}
                >
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};
