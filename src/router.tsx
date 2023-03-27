import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import { Home } from './Pages/Home';
import Login from './Pages/Login';
import { Register } from './Pages/Register';

const token = sessionStorage.getItem('token');
const isAuthenticated = token !== null && token !== '';


export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
        <Route index element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
