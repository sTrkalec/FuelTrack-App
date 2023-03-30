import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, TextField } from "@mui/material";
import { chown } from "fs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VehicleDataGrid } from "../../components/DataGrid";
import { Header } from "../../components/Header";
import { ConfirmDeleteModal } from "../../components/modals/ConfirmDeleteModal";
import { EditVehicleModal } from "../../components/modals/EditVehicleModal";
import { FuelFormModal } from "../../components/modals/FuelFormModal";
import { VehicleFormModal } from "../../components/modals/VehicleFormModal";
import { deleteVehicle, getUserVehicle } from "../../services/Home/services";
import './style.css'


export function Home() {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [userVehicles, setUserVehicles] = useState([]); // Adicionar estado para armazenar os veículos do usuário
  const [openModal, setOpenModal] = useState(false);
  const [openRefueModal, setOpenRefuelModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditdalOpen] = useState(false);


  const [selectedVehicleIds, setSelectedVehicleIds] = useState<number[]>([]);


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


  useEffect(() => {
    const handleStorageChange = async () => {
      let token = sessionStorage.getItem('token');

      if (!token || isTokenExpired(token)) {
        console.log(token ? 'Token expirado' : 'Não possui token');
        navigate('/login');
      } else {
        try {
          const fetchedUserVehicles = await getUserVehicle();
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

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleOpenRefuelModal = () => {
    setOpenRefuelModal(true);
  };

  const handleEditModal = () => {
    setEditdalOpen(true);
  };


  const handleEditCloseModal = () => {
    setEditdalOpen(false);
  };
  const handleRefuelCloseModal = () => {
    setOpenRefuelModal(false);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const test = async () => {
    const fetchedUserVehicles = await getUserVehicle();
    setUserVehicles(fetchedUserVehicles);
  }

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleVehicleSelect = (vehicleIds: number[]) => {
    setSelectedVehicleIds(vehicleIds);
  };

  const handleDeleteVehicle = async () => {
    try {
      setDeleteModalOpen(false);

      await Promise.all(selectedVehicleIds.map(async (vehicleId) => {
        await deleteVehicle(vehicleId);
      }));

      const fetchedUserVehicles = await getUserVehicle();
      setUserVehicles(fetchedUserVehicles);

    } catch (error) {
      console.error('Erro ao apagar veículo:', error);
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };


  return (
    <div>

      <div className="buttons-home">

        <Button variant="contained" style={{ backgroundColor: 'green', color: 'white'}} className="home-button" onClick={handleOpenModal}>
          Novo Veículo
        </Button>

        <Slide in={selectedVehicleIds.length !== 0} direction="left">
          <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} className="home-button" onClick={handleOpenDeleteModal}>
            Apagar
          </Button>
        </Slide>



        <Slide in={selectedVehicleIds.length !== 0} direction="left">
          <Button variant="contained" style={{ backgroundColor: 'orange', color: 'white' }} className="home-button"
            onClick={handleOpenRefuelModal}>
            Abastecer
          </Button>
        </Slide>

        <Slide in={selectedVehicleIds.length == 1} direction="left">
          <Button variant="contained" style={{ backgroundColor: 'blue', color: 'white' }} className="home-button"
            onClick={handleEditModal}>
            Editar
          </Button>
        </Slide>

      </div>

      <div className="grid">
        <VehicleDataGrid vehicles={userVehicles} onVehicleSelect={handleVehicleSelect} />
      </div>


      <VehicleFormModal open={openModal} onClose={handleCloseModal} onRefresh={test} />


      <FuelFormModal open={openRefueModal} onClose={handleRefuelCloseModal} id={selectedVehicleIds} />


      <ConfirmDeleteModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onSubmit={handleDeleteVehicle}
        message="Tem certeza de que deseja apagar o veículo selecionado?"
        buttonText="Cancelar"
      />

      <EditVehicleModal open={editModalOpen} onClose={handleEditCloseModal} onRefresh={test} id={selectedVehicleIds} />
    </div>
  );
}
