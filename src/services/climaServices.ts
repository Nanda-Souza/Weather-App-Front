import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const cadastrarClima = async (data: any) => {
  const response = await api.post('/clima/cadastrar', data);
  return response.data;
};

export const buscarClima = async (cidade?: string) => {
  const response = await api.get("/clima/buscar", {
    params: cidade ? { cidade } : {},
  });

  return response.data;
};

export const buscarClimaHoje = async (cidade: string) => {
  const response = await api.get("/clima/buscar/hoje", {
    params: { cidade },
  });

  return response.data;
};

export const buscarClima7Dias = async (cidade: string) => {
  const response = await api.get("/clima/buscar/proximos/7/dias", {
    params: { cidade },
  });

  return response.data;
};