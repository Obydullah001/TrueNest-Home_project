import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/UseAuth/useAuth';
import useAxiosSecure from '../../hooks/AxiosHooks/useAxiosSecure';
import { Link } from 'react-router';
import useUserRole from '../../hooks/useUserRole/useUserRole';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const WishList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { role, roleLoading } = useUserRole(user?.email);

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ['wishlist', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/${user.email}`);
      return res.data;
    },
  });

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
    <div className="min-h-screen bg-gradient-to-br from-[#f7e9e9] via-[#f5f5f5] to-[#e6f0ea] py-10 px-4">
      <h2 className="text-3xl font-bold text-[#A23E48] mb-8 text-center">My Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlist.length === 0 && (
          <div className="col-span-3 text-center text-gray-400 text-lg">
            No properties in your wishlist yet.
          </div>
        )}
        {wishlist.map(item => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-xl border border-[#dfadb2] flex flex-col"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              {/* Verification badge */}
              <span className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold shadow
                bg-[#729F72] text-white"
              >
                {item.status === "verified" ? (
                  <>
                    <FaCheckCircle className="text-white" /> Verified
                  </>
                ) : (
                  <>
                    <FaTimesCircle className="text-red-200" /> Pending
                  </>
                )}
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h2 className="text-xl font-bold text-[#A23E48] mb-1">{item.title}</h2>
              <p className="text-gray-600 mb-1">{item.location}</p>
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={item.agentImage || "/default-avatar.png"}
                  alt={item.agentName}
                  className="w-8 h-8 rounded-full border-2 border-[#729F72] object-cover"
                />
                <span className="text-sm text-[#729F72] font-semibold">{item.agentName}</span>
              </div>
              <div className="mb-2">
                <span className="text-gray-500 text-sm">Price Range: </span>
                <span className="font-semibold text-[#A23E48]">
                  ৳{item.startingPrice} - ৳{item.endingPrice}
                </span>
              </div>
              <div className="flex gap-3 mt-auto">
                {!roleLoading && role === 'user' && (
                  <>
                    <Link
                      to={`/dashboard/make-offer/${item.propertyId}`}
                      className="btn btn-sm bg-[#A23E48] text-white hover:bg-[#922d37] border-none rounded-lg shadow"
                    >
                      Make Offer
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(item._id)}
                      className="btn btn-sm bg-[#dfadb2] text-[#A23E48] hover:bg-[#A23E48] hover:text-white border-none rounded-lg shadow"
                    >
                      Remove
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;