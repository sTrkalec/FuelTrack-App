import { Button, Slide } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FuelDataGrid } from "../../components/DatagridFuel";
import { ConfirmDeleteModal } from "../../components/modals/ConfirmDeleteModal";
import { EditRefuelModal } from "../../components/modals/EditRefuelModal";
import { deleteRefuel, getUserFuel } from "../../services/Fuel/service";
import "./styles.css";

export function Fuel() {
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [userRefuels, setUserRefuels] = useState([]); // Adicionar estado para armazenar os veículos do usuário
    const [selectedRefuelIds, setSelectedRefuelIds] = useState<number[]>([]);
    const [editModalOpen, setEditdalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);



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
        setSelectedRefuelIds(vehicleIds);
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
                    setUserRefuels(fetchedUserVehicles);
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


    const handleDeleteVehicle = async () => {
        try {
            setDeleteModalOpen(false);

            await Promise.all(selectedRefuelIds.map(async (vehicleId) => {
                await deleteRefuel(vehicleId);
            }));

            const fetchedUserVehicles = await getUserFuel();
            setUserRefuels(fetchedUserVehicles);

        } catch (error) {
            console.error('Erro ao apagar veículo:', error);
        }
    };

    const test = async () => {
        const fetchedUserVehicles = await getUserFuel();
        setUserRefuels(fetchedUserVehicles);
    }

    const handleEditModal = () => {
        setEditdalOpen(true);
    };


    const handleEditCloseModal = () => {
        setEditdalOpen(false);
    };

    const handleOpenDeleteModal = () => {
        setDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
    };


    return (
        <>

            <div className="refuel-buttons">
                <Slide in={selectedRefuelIds.length === 1} direction="left">
                    <div>
                        <Button
                            variant="contained"
                            className="buttons-refuel"
                            style={{ backgroundColor: 'blue', color: 'white' }} 
                            disabled={selectedRefuelIds.length !== 1}
                            onClick={handleEditModal}
                        >
                            Editar
                        </Button>
                    </div>
                </Slide>

                <Slide in={selectedRefuelIds.length > 0} direction="left">
                    <div>
                        <Button
                            variant="contained"
                            className="buttons-refuel"
                            style={{ backgroundColor: 'red', color: 'white' }} 
                            onClick={handleOpenDeleteModal}
                            disabled={selectedRefuelIds.length === 0}
                        >
                            Apagar
                        </Button>
                    </div>
                </Slide>
            </div>

            <FuelDataGrid fueling={userRefuels} onVehicleSelect={handleVehicleSelect} />

            <EditRefuelModal open={editModalOpen} onClose={handleEditCloseModal} id={selectedRefuelIds} onRefresh={test} />

            <ConfirmDeleteModal
                open={deleteModalOpen}
                onClose={handleCloseDeleteModal}
                onSubmit={handleDeleteVehicle}
                message="Tem certeza de que deseja apagar o veículo selecionado?"
                buttonText="Cancelar"
            />


        </>
    );
}
