import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'https://andrezitob.pythonanywhere.com/api',
  //baseURL: 'http://localhost:8000/api',
  headers: {'Content-Type': 'application/json'}
});

export default axiosInstance;