import { useQuery } from '@tanstack/react-query';
import useAxios from '../AxiosHooks/useAxios';


const useUserRole = (email) => {
  const axiosSecure = useAxios();

  const { data: role, isLoading:roleLoading, refetch } = useQuery({
    queryKey: ['user-role', email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${email}`);
      return res.data.role;
    },
    enabled: !!email,
  });

  return { role, roleLoading , refetch};
};

export default useUserRole;