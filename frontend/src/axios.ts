import axios from "axios";
//http://18.191.203.223/
//baseURL: 'http://localhost:8000/api',
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'http://18.191.203.223/api',
  headers: {'Content-Type': 'application/json'}
});

export default axiosInstance;