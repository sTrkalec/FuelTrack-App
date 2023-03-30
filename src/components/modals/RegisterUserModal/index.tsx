import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField
} from "@mui/material";
import { validate as validateCpf } from "gerador-validador-cpf";
import { RegisterUser } from "../../../services/LoginUser/service";

interface User {
  cpf: string;
  password: string;
  confirmPassword: string;
}

interface CustomError {
  message: string;
}

export const UserRegistrationModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const [newUser, setNewUser] = useState<User>({
    cpf: "",
    password: "",
    confirmPassword: ""
  });

  const [cpfValid, setCpfValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState<boolean>(
    false
  );

  const handleInputChange = (field: keyof User, value: string) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      [field]: value
    }));

    if (field === "cpf") {
      setCpfValid(validateCpf(value));
    } else if (field === "password") {
      setPasswordValid(value.length >= 8);
      setConfirmPasswordValid(
        value.length >= 8 && value === newUser.confirmPassword
      );
    } else if (field === "confirmPassword") {
      setConfirmPasswordValid(value === newUser.password);
    }
  };

  const handleRegister = async () => {
    try {
      await RegisterUser(newUser.cpf, newUser.confirmPassword)
      handleClose();
    } catch (error: unknown) {
      const customError = error as CustomError;
      alert(customError.message);
    }
  };

  const handleClose = () => {
    setNewUser({
      cpf: "",
      password: "",
      confirmPassword: ""
    });
    setCpfValid(false);
    setPasswordValid(false);
    setConfirmPasswordValid(false);
    onClose();
  };

  const registerEnabled =
    cpfValid && passwordValid && confirmPasswordValid;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: "custom-dialog" }}
    >
      <DialogTitle>Registrar usuário</DialogTitle>
      <DialogContent className="custom-dialog-content">
        <FormControl fullWidth>
          <TextField
            label="CPF"
            fullWidth
            value={newUser.cpf}
            autoComplete="username" // Adicionando o atributo autocomplete
            onChange={(e) => handleInputChange("cpf", e.target.value)}
            type="text"
            error={!cpfValid && newUser.cpf !== ""}
            helperText={
              !cpfValid && newUser.cpf !== "" ? "CPF inválido" : ""
            }
          />
          <TextField
            label="Senha"
            fullWidth
            value={newUser.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            type="password"
            autoComplete="current-password" // Adicionando o atributo autocomplete
            error={!passwordValid && newUser.password !== ""}
            helperText={
              !passwordValid && newUser.password !== ""
                ? "A senha deve ter no mínimo 8 caracteres" : ""
            }
          />
          <TextField
            label="Confirmar senha"
            fullWidth
            autoComplete="current-password" // Adicionando o atributo autocomplete
            value={newUser.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            type="password"
            error={!confirmPasswordValid && newUser.confirmPassword !== ""}
            helperText={
              !confirmPasswordValid && newUser.confirmPassword !== ""
                ? "As senhas não coincidem"
                : ""
            }
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button className="buttonCancel" onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          className="buttonSave"
          variant="contained"
          color="primary"
          onClick={handleRegister}
          disabled={!registerEnabled}
        >
          Registrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
