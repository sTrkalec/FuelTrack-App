import axios from 'axios';


const apiBaseUrl = import.meta.env.VITE_BASE_URL;


const api = axios.create({
  baseURL: (apiBaseUrl) || 'https://fueltrack-api-production.up.railway.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const LoginUser = async (cpf: string, password: string) => {
  try {
    const response = await api.post( `/users/login` , { cpf:cpf, password:password }); // Substitua '/login' pelo endpoint correto da sua API
    localStorage.setItem('cpf', response.data.user.cpf.toString())
    localStorage.setItem('id', response.data.user.id)
    return response.data;
  } catch (error:any) {
    throw error.response?.data || new Error('Ocorreu um erro ao realizar o login');
  }
};

export const RegisterUser = async (cpf: string, password: string) => {
  try {
    const response = await api.post( `/users/register` , { cpf:cpf, password:password }); // Substitua '/login' pelo endpoint correto da sua API
    return response.data;
  } catch (error:any) {
    throw error.response?.data || new Error('Ocorreu um erro ao realizar o login');
  }
};

