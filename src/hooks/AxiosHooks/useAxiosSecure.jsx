import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: `http://localhost:5000`
});

// 🛡 Attach token securely
axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem('access-token');
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  } else {
    console.warn("No token found in localStorage!");
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// ✅ Custom hook
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
