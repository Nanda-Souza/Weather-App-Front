import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const cadastrarClima = async (data: any) => {
  const response = await api.post('/clima/cadastrar', data);
  return response.data;
};