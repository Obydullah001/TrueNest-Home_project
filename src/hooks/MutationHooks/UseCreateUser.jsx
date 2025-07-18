import { useMutation } from '@tanstack/react-query';
import useAxios from '../AxiosHooks/useAxios';
import axios from 'axios';

const UseCreateUser = () => {
    const axiosInstance = useAxios();
     
    const mutation = useMutation({
        mutationFn: async (userData)=>{
            const res = await axiosInstance.post('/users', userData);
            return res.data
        }
    })
    return mutation ;
};

export default UseCreateUser;