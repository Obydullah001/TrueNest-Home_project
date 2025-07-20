import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/AxiosHooks/useAxiosSecure';
import useAuth from '../../hooks/UseAuth/useAuth';
import { Link } from 'react-router';

const PropertyBought = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: offers = [], isLoading } = useQuery({
    queryKey: ['offers', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers/buyer/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
      {offers.map(offer => (
        <div key={offer._id} className="card bg-base-100 shadow-xl border border-secondary">
          <figure><img src={offer.propertyImage} alt={offer.propertyTitle} className="h-52 w-full object-cover" /></figure>
          <div className="card-body">
            <h2 className="card-title">{offer.propertyTitle}</h2>
            <p><strong>Location:</strong> {offer.propertyLocation}</p>
            <p><strong>Agent:</strong> {offer.agentName}</p>
            <p><strong>Offered Amount:</strong> ৳{offer.offerAmount}</p>
            <p><strong>Status:</strong> 
              <span className={`ml-1 font-semibold capitalize ${offer.status === 'pending' ? 'text-yellow-500' : offer.status === 'accepted' ? 'text-green-500' : 'text-blue-600'}`}>
                {offer.status}
              </span>
            </p>

            {offer.status === 'accepted' && !offer.transactionId && (
              <Link to={`/dashboard/payment/${offer._id}`} className="btn btn-primary mt-2">Pay</Link>
            )}

            {offer.transactionId && (
              <p className="mt-2 text-green-600 text-sm">
                Payment Successful. Txn ID: <br /><strong>{offer.transactionId}</strong>
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyBought;
