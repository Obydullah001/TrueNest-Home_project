import React from 'react';
import useAuth from '../../../hooks/UseAuth/useAuth';
import useAxiosSecure from '../../../hooks/AxiosHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const statusStyles = {
  accepted: 'bg-green-100 text-green-700 border border-green-300',
  rejected: 'bg-red-100 text-red-700 border border-red-300',
  pending: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
};

const RequestedProperty = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: offers = [], refetch, isLoading } = useQuery({
    queryKey: ['agent-offers', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers/agent/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDecision = async (id, propertyId, decision) => {
    const actionText = decision === 'accepted' ? 'Accept' : 'Reject';
    const actionColor = decision === 'accepted' ? '#22c55e' : '#ef4444';
    const icon = decision === 'accepted' ? 'success' : 'error';

    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to ${actionText.toLowerCase()} this offer?`,
      icon,
      showCancelButton: true,
      confirmButtonColor: actionColor,
      cancelButtonColor: '#6b7280',
      confirmButtonText: `Yes, ${actionText}`,
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'rounded-xl',
        confirmButton: 'px-6 py-2 rounded font-semibold',
        cancelButton: 'px-6 py-2 rounded font-semibold',
      },
      backdrop: true,
      focusConfirm: false,
    });

    if (result.isConfirmed) {
      try {
        // Accept: send propertyId, Reject: propertyId not needed
        if (decision === 'accepted') {
          await axiosSecure.patch(`/offers/${id}`, { status: decision, propertyId });
        } else {
          await axiosSecure.patch(`/offers/${id}`, { status: decision });
        }

        await refetch();

        if (decision === 'accepted') {
          await Swal.fire({
            title: `Offer Accepted!`,
            icon: 'success',
            timer: 1400,
            showConfirmButton: false,
            background: '#f0fdf4',
            customClass: {
              popup: 'rounded-xl',
            },
          });
        } else {
          await Swal.fire({
            title: `Profile Rejected`,
            text: 'This offer has been marked as rejected.',
            icon: 'error',
            timer: 1800,
            showConfirmButton: false,
            background: '#fef2f2',
            customClass: {
              popup: 'rounded-xl',
            },
          });
        }
      } catch (error) {
        await Swal.fire({
          title: 'Error!',
          text: 'Something went wrong. Please try again.',
          icon: 'error',
          background: '#fef2f2',
          customClass: {
            popup: 'rounded-xl',
          },
        });
        console.error('Error updating offer status:', error);
      }
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center h-40">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-green-700 flex items-center gap-2">
        <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10l1.664 1.664A2 2 0 007.05 12h9.9a2 2 0 001.386-.336L21 10M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Requested/Offered Properties
      </h2>
      <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-green-50 text-green-900">
              <th className="px-4 py-3 font-semibold">Property</th>
              <th className="px-4 py-3 font-semibold">Location</th>
              <th className="px-4 py-3 font-semibold">Buyer Email</th>
              <th className="px-4 py-3 font-semibold">Buyer Name</th>
              <th className="px-4 py-3 font-semibold">Offered Price</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">
                  No offers found.
                </td>
              </tr>
            ) : (
              offers.map((offer) => (
                <tr key={offer._id} className="border-t hover:bg-green-50 transition">
                  <td className="px-4 py-3 font-medium">{offer.propertyTitle}</td>
                  <td className="px-4 py-3">{offer.propertyLocation}</td>
                  <td className="px-4 py-3">{offer.buyerEmail}</td>
                  <td className="px-4 py-3">{offer.buyerName}</td>
                  <td className="px-4 py-3 font-semibold text-green-700">${offer.offerAmount}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[offer.status]}`}>
                      {offer.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {offer.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDecision(offer._id, offer.propertyId, 'accepted')}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-full font-semibold shadow transition"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleDecision(offer._id, offer.propertyId, 'rejected')}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full font-semibold shadow transition"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedProperty;