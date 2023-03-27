import axios from 'axios';


const apiBaseUrl = import.meta.env.VITE_BASE_URL;


const api = axios.create({
  baseURL: (apiBaseUrl) || 'https://your-api-url.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ...






export const LoginUser = async (cpf: string, password: string) => {
  console.log(apiBaseUrl)

  try {
    const response = await api.post( `/users/login` , { cpf:cpf, password:password }); // Substitua '/login' pelo endpoint correto da sua API
    return response.data;
  } catch (error:any) {
    throw error.response?.data || new Error('Ocorreu um erro ao realizar o login');
  }
};
