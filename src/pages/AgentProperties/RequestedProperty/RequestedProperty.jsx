import React from 'react';
import useAuth from '../../../hooks/UseAuth/useAuth';
import useAxiosSecure from '../../../hooks/AxiosHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const RequestedProperty = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: offers = [], refetch } = useQuery({
    queryKey: ['agent-offers', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers/agent/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDecision = async (id, propertyId, decision) => {
    try {
      // Update clicked offer
      await axiosSecure.patch(`/offers/${id}`, { status: decision });

      if (decision === 'accepted') {
        // Reject all other offers for the same property
        await axiosSecure.patch(`/offers/reject-others`, {
          propertyId,
          excludeId: id
        });
      }

      refetch();
    } catch (error) {
      console.error('Error updating offer status:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Requested/Offered Properties</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Property Title</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Buyer Email</th>
              <th className="px-4 py-2">Buyer Name</th>
              <th className="px-4 py-2">Offered Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer._id} className="border-t">
                <td className="px-4 py-2">{offer.propertyTitle}</td>
                <td className="px-4 py-2">{offer.propertyLocation}</td>
                <td className="px-4 py-2">{offer.buyerEmail}</td>
                <td className="px-4 py-2">{offer.buyerName}</td>
                <td className="px-4 py-2">${offer.offerAmount}</td>
                <td className="px-4 py-2 capitalize text-sm font-medium">
                  <span
                    className={`px-2 py-1 rounded ${
                      offer.status === 'accepted'
                        ? 'bg-green-100 text-green-800'
                        : offer.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {offer.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {offer.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleDecision(offer._id, offer.propertyId, 'accepted')}
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDecision(offer._id, offer.propertyId, 'rejected')}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedProperty;
