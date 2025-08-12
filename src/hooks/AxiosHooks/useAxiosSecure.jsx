import axios from 'axios';
import useAuth from '../UseAuth/useAuth';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const axiosSecure = axios.create({
  baseURL: `https://truenest-server-app.vercel.app`
});

// Attach token to every request
axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem('access-token');
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Add response interceptor ONCE
    const interceptor = axiosSecure.interceptors.response.use(
      res => res,
      error => {
        const status = error?.response?.status;
        if (status === 403) {
          navigate('/forbidden');
        } else if (status === 401) {
          logOut()
            .then(() => {
              navigate('/login');
            })
            .catch(err => {
              console.log(err);
            });
        }
        return Promise.reject(error); // Always reject so react-query can handle
      }
    );
    // Cleanup: remove interceptor on unmount
    return () => {
      axiosSecure.interceptors.response.eject(interceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;