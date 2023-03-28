import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import { DefaultLayout } from './layouts';
import { Fuel } from './Pages/Fuel';
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
      <Route element={< DefaultLayout />}>
        <Route path='/dashboard' element={<Home />} />
        <Route path='/fuel' element={<Fuel />} />
      </Route>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
