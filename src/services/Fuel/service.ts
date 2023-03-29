import axios from 'axios';


const apiBaseUrl = import.meta.env.VITE_BASE_URL;

const createApiInstance = () => {
  const token = sessionStorage.getItem('token');
  return axios.create({
    baseURL: apiBaseUrl || 'https://your-api-url.com',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : undefined,
    },
  });
};

// ...
export const getUserFuel = async () => {
  const api = createApiInstance();
  try {
    const response = await api.get('/refueling'); // Substitua '/login' pelo endpoint correto da sua API
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error('Ocorreu um erro ao realizar o login');
  }
};

export const getRefuelById = async (id:number) => {
  const api = createApiInstance();

  try {
    const response = await api.get( `/refueling/${id}`); // Substitua '/login' pelo endpoint correto da sua API
    return response.data;
  } catch (error:any) {
    throw error.response?.data || new Error('Ocorreu um erro ao realizar o login');
  }
};

export const editRefuelId = async (id:number,idVehicle:number, amount: number, fuelType: string, price:number) => {
  const api = createApiInstance();

  try {
    const response = await api.put( `refueling/vehicle/${idVehicle}/${id}`, { amount, fuelType, price }); // Substitua '/login' pelo endpoint correto da sua API
    return response.data;
  } catch (error:any) {
    throw error.response?.data || new Error('Ocorreu um erro ao realizar o login');
  }
};

export const deleteRefuel = async (id:number) => {
  const api = createApiInstance();

  try {
    const response = await api.delete( `/refueling/${id}`); // Substitua '/login' pelo endpoint correto da sua API
    return response.data;
  } catch (error:any) {
    throw error.response?.data || new Error('Ocorreu um erro ao realizar o login');
  }
};