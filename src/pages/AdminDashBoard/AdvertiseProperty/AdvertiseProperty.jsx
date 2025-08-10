// src/pages/dashboard/admin/AdvertiseProperty.jsx
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/AxiosHooks/useAxiosSecure';

const currency = (n) =>
  typeof n === 'number'
    ? n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
    : n;

const AdvertiseProperty = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Verified properties (admin-only route already protected by your guard and verifyJWT on backend)
  const { data: properties = [], isLoading: loadingProps } = useQuery({
    queryKey: ['verified-properties'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/properties/verifiedStatus');
      return data;
    },
  });

  // Existing advertisements (to disable "Advertise" for already advertised ones)
  const { data: ads = [], isLoading: loadingAds } = useQuery({
    queryKey: ['advertisements'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/advertisements'); // admin route
      return data;
    },
  });

  const advertisedSet = new Set((ads || []).map((a) => String(a.propertyId)));

  const { mutate: advertise, isLoading: advertising } = useMutation({
    mutationFn: async (propertyId) => {
      const { data } = await axiosSecure.post('/advertisements', { propertyId });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['advertisements']);
      Swal.fire('Success', 'Property has been added to advertisements.', 'success');
    },
    onError: (err) =>
      Swal.fire('Error', err?.response?.data?.error || 'Failed to advertise property', 'error'),
  });

  if (loadingProps || loadingAds) {
    return <p className="text-center py-20 text-lg font-medium">Loading properties...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Advertise Property</h2>
          <p className="text-sm text-base-content/60 mt-1">
            Verified properties. Click “Advertise” to create an ad entry.
          </p>
        </div>
        <span className="badge badge-outline">{properties.length} verified</span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-base-300 bg-base-100">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>Image</th>
              <th>Property</th>
              <th>Price range</th>
              <th>Agent</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => {
              const isAdvertised = advertisedSet.has(String(p._id));
              return (
                <tr key={p._id}>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-16 h-16">
                        <img src={p.image} alt={p.title} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-semibold">{p.title}</div>
                      <div className="text-sm opacity-70">{p.location}</div>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm">
                      {currency(Number(p.startingPrice))} — {currency(Number(p.endingPrice))}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {p.agentPhoto && (
                        <img
                          src={p.agentPhoto}
                          alt={p.agentName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      <span className="text-sm">{p.agentName}</span>
                    </div>
                  </td>
                  <td className="text-center">
                    {isAdvertised ? (
                      <span className="badge badge-success">Advertised</span>
                    ) : (
                      <button
                        className="btn btn-sm btn-primary"
                        disabled={advertising}
                        onClick={() => advertise(p._id)}
                      >
                        Advertise
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
            {properties.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-base-content/70">
                  No verified properties found to advertise.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvertiseProperty;