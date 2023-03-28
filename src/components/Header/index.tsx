import { Link } from 'react-router-dom';
import './style.css';

export function Header() {
  const handleLogout = () => {
    sessionStorage.clear(); // Limpa todo o sessionStorage
    // ou
    // sessionStorage.removeItem('token'); // Remove apenas o token do sessionStorage
  };

  return (
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
            <Link to="/login" className="nav-link" onClick={handleLogout}>
              Sair
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
