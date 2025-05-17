import { navigate } from "@/src/lib/navigationRef";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const api = axios.create({
  baseURL: "http://api-5semestre.ddns.net:3000", // URL base da API
  headers: {
    "Content-Type": "application/json",
    'Client-Type': 'mobile'
  },
});

// Interceptor para incluir token
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor para lidar com erro de autenticação
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem("authToken"); // Remove token inválido
      navigate('/login') // Redireciona para login
    }
    return Promise.reject(error);
  }
);

export default api;
