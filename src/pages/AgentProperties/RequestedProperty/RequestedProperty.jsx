import React from 'react';
import useAuth from '../../../hooks/UseAuth/useAuth';
import useAxiosSecure from '../../../hooks/AxiosHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const statusStyles = {
  accepted:
    'bg-green-100 text-green-700 border border-green-300 ' +
    'dark:bg-green-900/30 dark:text-green-300 dark:border-green-700',
  rejected:
    'bg-red-100 text-red-700 border border-red-300 ' +
    'dark:bg-red-900/30 dark:text-red-300 dark:border-red-700',
  pending:
    'bg-yellow-100 text-yellow-700 border border-yellow-300 ' +
    'dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700',
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
    const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${actionText.toLowerCase()} this offer?`,
      icon,
      showCancelButton: true,
      // Keep consistent colors in both themes
      confirmButtonColor: actionColor,
      cancelButtonColor: isDark ? '#4b5563' : '#6b7280',
      confirmButtonText: `Yes, ${actionText}`,
      cancelButtonText: 'Cancel',
      customClass: {
        popup: `rounded-xl ${isDark ? 'swal-dark' : 'swal-light'}`,
        confirmButton:
          'px-6 py-2 rounded font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
          'ring-offset-white dark:ring-offset-gray-900',
        cancelButton:
          'px-6 py-2 rounded font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
          'ring-offset-white dark:ring-offset-gray-900',
      },
      backdrop: true,
      focusConfirm: false,
      // Make SweetAlert respect theme without fighting Tailwind CSS load order
      background: isDark ? '#0b1220' : '#ffffff',
      color: isDark ? '#e5e7eb' : '#111827',
    });

    if (result.isConfirmed) {
      try {
        if (decision === 'accepted') {
          await axiosSecure.patch(`/offers/${id}`, { status: decision, propertyId });
        } else {
          await axiosSecure.patch(`/offers/${id}`, { status: decision });
        }

        await refetch();

        const isDarkNow =
          typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

        if (decision === 'accepted') {
          await Swal.fire({
            title: 'Offer Accepted!',
            icon: 'success',
            timer: 1400,
            showConfirmButton: false,
            background: isDarkNow ? '#0b1220' : '#ffffff',
            color: isDarkNow ? '#e5e7eb' : '#111827',
            customClass: { popup: 'rounded-xl' },
            iconColor: '#22c55e',
          });
        } else {
          await Swal.fire({
            title: 'Offer Rejected',
            text: 'This offer has been marked as rejected.',
            icon: 'error',
            timer: 1800,
            showConfirmButton: false,
            background: isDarkNow ? '#0b1220' : '#ffffff',
            color: isDarkNow ? '#e5e7eb' : '#111827',
            customClass: { popup: 'rounded-xl' },
            iconColor: '#ef4444',
          });
        }
      } catch (error) {
        const isDarkNow =
          typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

        await Swal.fire({
          title: 'Error!',
          text: 'Something went wrong. Please try again.',
          icon: 'error',
          background: isDarkNow ? '#0b1220' : '#ffffff',
          color: isDarkNow ? '#e5e7eb' : '#111827',
          customClass: { popup: 'rounded-xl' },
          iconColor: '#ef4444',
        });
        console.error('Error updating offer status:', error);
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500 dark:border-green-400" />
      </div>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto text-gray-900 dark:text-gray-100 transition-colors">
      <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-400 flex items-center gap-2">
        <svg
          className="w-7 h-7 text-green-500 dark:text-green-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10l1.664 1.664A2 2 0 007.05 12h9.9a2 2 0 001.386-.336L21 10M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        Requested/Offered Properties
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 transition-colors">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-green-50 text-green-900 dark:bg-gray-800 dark:text-green-100 transition-colors">
              <th className="px-4 py-3 font-semibold text-left">Property</th>
              <th className="px-4 py-3 font-semibold text-left">Location</th>
              <th className="px-4 py-3 font-semibold text-left">Buyer Email</th>
              <th className="px-4 py-3 font-semibold text-left">Buyer Name</th>
              <th className="px-4 py-3 font-semibold text-left">Offered Price</th>
              <th className="px-4 py-3 font-semibold text-left">Status</th>
              <th className="px-4 py-3 font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No offers found.
                </td>
              </tr>
            ) : (
              offers.map((offer) => (
                <tr
                  key={offer._id}
                  className="border-t border-gray-200 dark:border-gray-800 hover:bg-green-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{offer.propertyTitle}</td>
                  <td className="px-4 py-3">{offer.propertyLocation}</td>
                  <td className="px-4 py-3">{offer.buyerEmail}</td>
                  <td className="px-4 py-3">{offer.buyerName}</td>
                  <td className="px-4 py-3 font-semibold text-green-700 dark:text-green-400">
                    ${offer.offerAmount}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[offer.status]} capitalize`}
                    >
                      {offer.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {offer.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDecision(offer._id, offer.propertyId, 'accepted')}
                          className="bg-green-600 hover:bg-green-500 text-white px-4 py-1 rounded-full font-semibold shadow transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 dark:focus-visible:ring-green-500"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleDecision(offer._id, offer.propertyId, 'rejected')}
                          className="bg-red-600 hover:bg-red-500 text-white px-4 py-1 rounded-full font-semibold shadow transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 dark:focus-visible:ring-red-500"
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