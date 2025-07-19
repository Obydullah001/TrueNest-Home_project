import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import useAuth from '../../hooks/UseAuth/useAuth';
import useAxiosSecure from '../../hooks/AxiosHooks/useAxiosSecure';
import { Link } from 'react-router';

const WishList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ['wishlist', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/${user.email}`);
      return res.data;
    },
  });

  console.log(wishlist);
  

  const { mutate: removeFromWishlist } = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/wishlist/${id}`);
    },
    onSuccess: () => {
      toast.success("Removed from wishlist");
      queryClient.invalidateQueries(['wishlist', user.email]);
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {wishlist.map(item => (
        <div key={item._id} className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
          <div className="p-4 space-y-2">
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p className="text-gray-600">{item.location}</p>
            <p><strong>Agent:</strong> {item.agentName}</p>
            <p><strong>Price:</strong> ৳{item.startingPrice} - ৳{item.endingPrice}</p>
            <div className="flex gap-3 mt-2">
              <Link to={`/dashboard/make-offer/${item.propertyId}`} className="btn btn-sm btn-primary">Make Offer</Link>
              <button onClick={() => removeFromWishlist(item._id)} className="btn btn-sm btn-error">Remove</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishList;
