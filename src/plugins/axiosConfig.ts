
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import router from "../router/index";

const createAxiosInstance = (): AxiosInstance => {
  // Configuração do Axios
  const axiosInstance = axios.create({
    timeout: 10000, // Timeout de 10 segundos (em milissegundos)
    // Você pode adicionar outras configurações aqui, como baseURL, headers, etc.
  });

  // Interceptor para lidar com erros de timeout
  axiosInstance.interceptors.request.use(
    (config) => config,
    (error) => {
      if (axios.isCancel(error)) {
        console.error('Request canceled:', error.message);
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};


const axiosInstance = createAxiosInstance();
export default axiosInstance;