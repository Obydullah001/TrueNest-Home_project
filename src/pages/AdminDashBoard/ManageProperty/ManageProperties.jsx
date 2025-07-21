import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/AxiosHooks/useAxiosSecure';

const ManageProperties = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all properties
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['all-properties'],
    queryFn: async () => {
      const res = await axiosSecure.get('/properties');
      return res.data;
    }
  });

  // Mutation for verifying/rejecting
  const mutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return axiosSecure.patch(`/properties/status/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['all-properties']);
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-secondary/30 flex flex-col items-center py-12 px-2">
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-primary drop-shadow-lg tracking-wide">
            Manage Properties
          </h1>
          <p className="mt-2 text-lg text-neutral font-medium">
            All properties added by agents. Verify or reject as needed.
          </p>
        </div>
        <div className="overflow-x-auto rounded-3xl shadow-2xl bg-white/80 backdrop-blur-lg border border-primary/20">
          <table className="table table-zebra min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
                <th className="text-primary font-bold text-base">Title</th>
                <th className="text-secondary font-bold text-base">Location</th>
                <th className="text-accent font-bold text-base">Agent Name</th>
                <th className="text-info font-bold text-base">Agent Email</th>
                <th className="text-success font-bold text-base">Price Range</th>
                <th className="text-warning font-bold text-base">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <span className="loading loading-spinner loading-lg text-secondary"></span>
                  </td>
                </tr>
              ) : properties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-neutral font-semibold text-xl">
                    No properties found.
                  </td>
                </tr>
              ) : (
                properties.map((item) => (
                  <tr key={item._id} className="transition hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10">
                    <td className="font-semibold text-primary">{item.title}</td>
                    <td className="text-secondary">{item.location}</td>
                    <td className="text-accent">{item.agentName}</td>
                    <td className="text-info">{item.agentEmail}</td>
                    <td className="text-success font-bold">
                      ${item.startingPrice} - ${item.endingPrice}
                    </td>
                    <td>
                      {item.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            className="btn btn-success btn-xs"
                            onClick={() => mutation.mutate({ id: item._id, status: "verified" })}
                            disabled={mutation.isLoading}
                          >
                            Verify
                          </button>
                          <button
                            className="btn btn-error btn-xs"
                            onClick={() => mutation.mutate({ id: item._id, status: "rejected" })}
                            disabled={mutation.isLoading}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {item.status === "verified" && (
                        <span className="badge badge-success text-base-100">Verified</span>
                      )}
                      {item.status === "rejected" && (
                        <span className="badge badge-error text-base-100">Rejected</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageProperties;