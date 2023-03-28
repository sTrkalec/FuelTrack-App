import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { number } from "zod";
import { setRefuel } from "../../../services/Home/services";

interface Fuel {
    amount: number | null,
    fuelType: string,
    price: number | null
}

interface CustomError {
    message: string;
}

export const FuelFormModal: React.FC<{ open: boolean; onClose: () => void; id: number[] }> = ({
    open,
    onClose,
    id,
}) => {
    const [newFuel, setNewFuel] = useState<Fuel>({
        amount: null,
        fuelType: "",
        price: null
    });

    useEffect(() => {
        if (open) {
            console.log("Modal aberto");
        }
    }, [open]);

    const setFuelData = async (data: Fuel) => {
        try {
            console.log(data);
            await Promise.all(id.map(async (vehicleId) => {
                
                await setRefuel(vehicleId, Number(data.amount), data.fuelType, Number(data.price));
            }));
            handleClose(); // fecha o modal
        } catch (error: unknown) {
            const customError = error as CustomError;
            alert(customError.message)
        }
    }

    const handleClose = () => {
        setNewFuel({
            amount: null,
            fuelType: "",
            price: null
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Registrar abastecimento</DialogTitle>
            <DialogContent>
                <TextField
                    label="Quantidade (L)"
                    fullWidth
                    value={newFuel.amount === null ? "" : newFuel.amount}
                    onChange={(e) => setNewFuel({ ...newFuel, amount: e.target.value !== "" ? parseFloat(e.target.value) : null })}
                    type="number"
                />
                <FormControl fullWidth>
                    <InputLabel>Tipo de Combustível</InputLabel>
                    <Select
                        value={newFuel.fuelType}
                        onChange={(e) => setNewFuel({ ...newFuel, fuelType: e.target.value as string })}
                    >
                        <MenuItem value="gasolina">Gasolina</MenuItem>
                        <MenuItem value="alcool">Álcool</MenuItem>
                        <MenuItem value="diesel">Diesel</MenuItem>
                        <MenuItem value="gnv">GNV</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Preço (R$)"
                    fullWidth
                    value={newFuel.price === null ? "" : newFuel.price}
                    onChange={(e) => setNewFuel({ ...newFuel, price: e.target.value !== "" ? parseFloat(e.target.value) : null })}
                    type="number"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setFuelData(newFuel)}
                >
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};
