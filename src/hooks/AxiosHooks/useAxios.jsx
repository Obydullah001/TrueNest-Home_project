import axios from "axios";

const axiosInstance = axios.create({
        baseURL: `https://truenest-server-app.vercel.app`
    })
const useAxios = () => {
    
    return axiosInstance
};

export default useAxios;