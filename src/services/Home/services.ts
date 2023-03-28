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
export const getUserVehicle = async () => {
  const api = createApiInstance();
  try {
    const response = await api.get('/vehicle'); // Substitua '/login' pelo endpoint correto da sua API
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error('Ocorreu um erro ao realizar o login');
  }
};

export const setUserVehicle = async (plate:String, renevam:String, color:String, power:Number, model: string, brand:string) => {
  const api = createApiInstance();

  try {
    const response = await api.post( `/vehicle` , { plate:plate, renavam: renevam , color: color, power:power, model: model, brand:brand,  }); // Substitua '/login' pelo endpoint correto da sua API
    return response.data;
  } catch (error:any) {
    throw error.response?.data || new Error('Ocorreu um erro ao realizar o login');
  }
};

export const getVehicleById = async (id:number) => {
  const api = createApiInstance();

  try {
    const response = await api.get( `/vehicle/${id}`); // Substitua '/login' pelo endpoint correto da sua API
    return response.data;
  } catch (error:any) {
    throw error.response?.data || new Error('Ocorreu um erro ao realizar o login');
  }
};

export const deleteVehicle = async (id:number) => {
  const api = createApiInstance();

  try {
    const response = await api.delete( `/vehicle/${id}`); // Substitua '/login' pelo endpoint correto da sua API
    return response.data;
  } catch (error:any) {
    throw error.response?.data || new Error('Ocorreu um erro ao realizar o login');
  }
};

export const editVehicle = async (id:number, plate:String, renevam:String, color:String, power:Number, model: string, brand:string) => {
  const api = createApiInstance();

  try {
    const response = await api.put( `/vehicle/${id}`, { plate:plate, renavam: renevam , color: color, power:power, model: model, brand:brand, }); // Substitua '/login' pelo endpoint correto da sua API
    return response.data;
  } catch (error:any) {
    throw error.response?.data || new Error('Ocorreu um erro ao realizar o login');
  }
};