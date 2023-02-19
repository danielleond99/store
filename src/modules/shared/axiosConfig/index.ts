import axios, { AxiosError, AxiosRequestConfig } from "axios";

const customAxiosConfig = (url: string) => {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    baseURL: url,
  };

  return axiosConfig;
};
const customAxiosApp = axios.create(
  customAxiosConfig("http://localhost:3000/api/")
);
export const customAxiosAppAuth = axios.create(
  customAxiosConfig("http://localhost:3000/api/")
);

customAxiosApp.interceptors.request.use(
  (config) => {
    config.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customAxiosApp.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // if (error.response?.status === 500) {
    //   window.location.replace('/server-error');
    // }
    // if (error.response?.status === 401 || error.response?.status === 403) {
    //   localStorage.clear();
    //   window.location.replace('/auth/login');
    // }
    return Promise.reject(error);
  }
);

export default customAxiosApp;
