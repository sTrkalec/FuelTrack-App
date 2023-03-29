import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FuelDataGrid } from "../../components/DatagridFuel";
import { EditRefuelModal } from "../../components/modals/EditRefuelModal";
import { EditVehicleModal } from "../../components/modals/EditVehicleModal";
import { getUserFuel } from "../../services/Fuel/service";


export function Fuel() {
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [userVehicles, setUserVehicles] = useState([]); // Adicionar estado para armazenar os veículos do usuário
    const [selectedVehicleIds, setSelectedVehicleIds] = useState<number[]>([]);
    const [editModalOpen, setEditdalOpen] = useState(false);


    const navigate = useNavigate();

    const isTokenExpired = (token: string) => {
        try {
            const [, payload] = token.split('.');
            const decodedPayload = JSON.parse(atob(payload));
            const currentTime = Math.floor(Date.now() / 1000);
            if (decodedPayload.exp < currentTime) {
                return true;
            }
            return false;
        } catch (err) {
            return true;
        }
    };

    const handleVehicleSelect = (vehicleIds: number[]) => {
        setSelectedVehicleIds(vehicleIds);
    };


    useEffect(() => {
        const handleStorageChange = async () => {
            let token = sessionStorage.getItem('token');

            if (!token || isTokenExpired(token)) {
                console.log(token ? 'Token expirado' : 'Não possui token');
                navigate('/login');
            } else {
                try {
                    const fetchedUserVehicles = await getUserFuel();
                    setUserVehicles(fetchedUserVehicles);
                } catch (error) {
                    console.error('Erro ao buscar veículos do usuário:', error);
                }
            }
            setIsAuthChecked(true);
        };

        handleStorageChange();
    }, [navigate, setIsAuthChecked]);

    if (!isAuthChecked) {
        return null; // Não renderiza nada até a verificação de autenticação ser concluída
    }

    const test = async () => {
        const fetchedUserVehicles = await getUserFuel();
        setUserVehicles(fetchedUserVehicles);
    }

    const handleEditModal = () => {
        setEditdalOpen(true);
    };


    const handleEditCloseModal = () => {
        setEditdalOpen(false);
    };

    return (
        <>
            <FuelDataGrid fueling={userVehicles} onVehicleSelect={handleVehicleSelect} />

            <EditRefuelModal open={editModalOpen} onClose={handleEditCloseModal} id={selectedVehicleIds}  onRefresh={test} />

            <Button variant="contained" color="warning"
                disabled={selectedVehicleIds.length != 1}
                onClick={handleEditModal}>
                Editar
            </Button>
        </>
    );
}
