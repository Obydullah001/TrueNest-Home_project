import React from 'react';
import useAxiosSecure from '../../../hooks/AxiosHooks/useAxiosSecure';
import useAuth from '../../../hooks/UseAuth/useAuth';
import { useQuery } from '@tanstack/react-query';

const AdvertiseProperty = () => {
    const axiosSecure = useAxiosSecure();
    const {user}= useAuth();


    const {data: properties = [], isLoading} = useQuery({
        queryKey: ['all-properties', user?.email],
        queryFn: () => axiosSecure.get('/properties/verifiedStatus').then(res => res.data), 
    });


      if (isLoading) {
    return <p className="text-center py-20 text-lg font-medium">Loading properties...</p>;
  }
    return (
        <div>
            This is advertise property 

        </div>
    );
};

export default AdvertiseProperty;