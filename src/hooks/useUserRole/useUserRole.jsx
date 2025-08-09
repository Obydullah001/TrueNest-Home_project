import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../AxiosHooks/useAxiosSecure';

const useUserRole = (email) => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading: roleLoading, refetch } = useQuery({
    queryKey: ['user-role', email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${email}`);
      return res.data;
    },
  });

  return { role: data?.role, fraud: !!data?.fraud, roleLoading, refetch };
};

export default useUserRole;