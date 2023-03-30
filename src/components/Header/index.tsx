import { Button } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { number } from 'zod';
import { UserFormModal } from '../modals/EditUser';
import './style.css';

export function Header() {
  const handleLogout = () => {
    sessionStorage.clear(); // Limpa todo o sessionStorage
    localStorage.clear();
    // ou
    // sessionStorage.removeItem('token'); // Remove apenas o token do sessionStorage
  };

  const [cpf, setCpf] = useState(localStorage.getItem('cpf'));
  const [userId, setUserId] = useState(localStorage.getItem('id'));
  const [openModal, setOpenModal] = useState(false);

  function handleClose(){
    setOpenModal(false);
  }

  function handleOpen(){
    setOpenModal(true);
  }

  return (
    <>
      <header className="header">
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                Veículos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/fuel" className="nav-link">
                Abastecimentos
              </Link>
            </li>
          </ul>
          <ul className="nav-list">
            <li className="nav-item">
              <button onClick={handleOpen}>Editar</button>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link" onClick={handleLogout}>
                Sair
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <UserFormModal open={openModal} onClose={handleClose} userCpf={String(cpf)}  userId={Number(userId)} ></UserFormModal>

    </>
  );
}