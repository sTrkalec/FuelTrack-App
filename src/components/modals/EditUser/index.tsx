import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { deleteUser, editUser } from "../../../services/Home/services";
import { ConfirmDeleteModal } from "../ConfirmDeleteModal";

interface User {
  cpf: string,
  novaSenha: string,
  userId: number,
  confirmarSenha: string
}

interface CustomError {
  message: string;
}

function clearDatas() {
  localStorage.clear()
  sessionStorage.clear()
}



export const UserFormModal: React.FC<{ open: boolean; onClose: () => void; userCpf: string, userId: number }> = ({
  open,
  onClose,
  userCpf,
  userId
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    cpf: userCpf,
    userId: userId,
    novaSenha: "",
    confirmarSenha: ""
  });

  const [editModalOpen, setEditdalOpen] = useState(false);




  const resetPassword = async (data: User) => {
    try {
      await editUser(data.userId, data.cpf, data.novaSenha);
      handleClose(); // fecha o modal
    } catch (error: unknown) {
      const customError = error as CustomError;
      alert(customError.message)
    }
  }

  const handledeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      clearDatas();
      handleClose(); // fecha o modal
      navigate("/login"); // redireciona para a página de login
    } catch (error: unknown) {
      const customError = error as CustomError;
      alert(customError.message);
    }
  };

  const handleClose = () => {
    setUser({
      cpf: userCpf,
      userId: userId,
      novaSenha: "",
      confirmarSenha: ""
    });
    onClose();
  };

  const handleDeleteUserWrapper = async() => {
    await handledeleteUser(user.userId);
  };

  const handleEditCloseModal = () => {
    setEditdalOpen(false);
  };

  const handleEditModal = () => {
    setEditdalOpen(true);
  };

  return (

    <>
      <Dialog open={open} onClose={onClose} classes={{ paper: 'custom-dialog' }}>
        <DialogTitle>Editar Usuário</DialogTitle>
        <DialogContent className="custom-dialog-content">
          <TextField
            label="CPF"
            fullWidth
            value={user.cpf}
            disabled
          />
          <TextField
            label="Nova Senha"
            fullWidth
            value={user.novaSenha}
            autoComplete="current-password"
            onChange={(e) => setUser({ ...user, novaSenha: e.target.value })}
            type="password"
          />
          <TextField
            label="Confirmar Senha"
            fullWidth
            value={user.confirmarSenha}
            onChange={(e) => setUser({ ...user, confirmarSenha: e.target.value })}
            type="password"
            autoComplete="current-password"

          />
        </DialogContent>
        <DialogActions>
          <Button  className="buttonCancel" onClick={handleEditModal}>Excluir Usuário</Button>
          <Button  onClick={handleClose}>Cancelar</Button>
          <Button
            className="buttonSave"
            variant="contained"
            color="primary"
            onClick={() => resetPassword(user)}
            disabled={!user.novaSenha || user.novaSenha !== user.confirmarSenha}
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>


      <ConfirmDeleteModal
        open={editModalOpen}
        onClose={handleEditCloseModal}
        onSubmit={handleDeleteUserWrapper}
        message="Você tem certeza que deseja excluir o usuário?"
        buttonText="Cancelar"
      />
    </>

  );
};
