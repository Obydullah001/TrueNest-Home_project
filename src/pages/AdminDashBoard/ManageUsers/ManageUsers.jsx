import React from 'react';
import Swal from 'sweetalert2';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/AxiosHooks/useAxiosSecure';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  const { mutate: updateRole } = useMutation({
    mutationFn: ({ id, role }) => axiosSecure.patch(`/users/role/${id}`, { role }),
    onSuccess: () => queryClient.invalidateQueries(['all-users']),
  });

  const { mutate: markFraud } = useMutation({
    mutationFn:async ({ userId, email }) => {
      await axiosSecure.patch(`/users/fraud/${email}`);
     // await axiosSecure.delete(`/properties/user-by-email/${email}`);
    },
    onSuccess: () => queryClient.invalidateQueries(['all-users']),
  });

  const { mutate: deleteUser } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/users/${id}`);
      await fetch(`/firebase/deleteUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: data.firebaseUid }),
      });
    },
    onSuccess: () => queryClient.invalidateQueries(['all-users']),
  });

  const handleConfirm = (title, text, confirmText, action) => {
    Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) action();
    });
  };

  if (isLoading) return <div className="text-center py-10">Loading users...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full text-sm">
          <thead>
            <tr className="bg-base-200 text-base-content">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name || 'N/A'}</td>
                <td className="break-words max-w-[200px]">{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td>
                  <div className="flex flex-col md:flex-row md:space-x-2 space-y-1 md:space-y-0">
                    {user.fraud ? (
                      <span className="text-red-500 font-bold">Fraud</span>
                    ) : (
                      <>
                        {user.role !== 'admin' && (
                          <button
                            className="btn btn-xs btn-secondary"
                            onClick={() =>
                              handleConfirm(
                                'Make Admin?',
                                `Are you sure to make ${user.email} an Admin?`,
                                'Yes, Make Admin',
                                () => updateRole({ id: user._id, role: 'admin' })
                              )
                            }
                          >
                            Make Admin
                          </button>
                        )}
                        {user.role !== 'agent' && (
                          <button
                            className="btn btn-xs btn-accent"
                            onClick={() =>
                              handleConfirm(
                                'Make Agent?',
                                `Are you sure to make ${user.email} an Agent?`,
                                'Yes, Make Agent',
                                () => updateRole({ id: user._id, role: 'agent' })
                              )
                            }
                          >
                            Make Agent
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </td>
                <td>
                  {user.role === 'agent' && !user.fraud && (
                    <button
                      className="btn btn-xs btn-warning"
                      onClick={() =>
                        handleConfirm(
                          'Mark as Fraud?',
                          `This will mark ${user.email} as fraud and delete their properties.`,
                          'Yes, Mark Fraud',
                          () => markFraud({ userId: user._id, email: user.email })
                        )
                      }
                    >
                      Mark as Fraud
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() =>
                      handleConfirm(
                        'Delete User?',
                        `Are you sure to delete ${user.email}? This action is irreversible.`,
                        'Yes, Delete',
                        () => deleteUser(user._id)
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
