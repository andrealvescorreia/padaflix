import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  //baseURL: 'https://18.191.203.223:8000/api',
  baseURL: 'http://localhost:8000/api',
  headers: {'Content-Type': 'application/json'}
});

export default axiosInstance;