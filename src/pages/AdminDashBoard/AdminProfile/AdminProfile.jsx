import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/AxiosHooks/useAxiosSecure";
import useAuth from "../../../hooks/UseAuth/useAuth";

const UserProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          setDbUser(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.email, axiosSecure]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!dbUser) return <div className="text-center py-10">User not found.</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7e9e9] via-[#f5f5f5] to-[#e6f0ea]">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#dfadb2]">
        <div className="bg-[#dfadb2] flex flex-col items-center py-8 px-4">
          <img
            src={user.photoURL || "/default-avatar.png"}
            alt={dbUser.displayName || "User"}
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <h2 className="text-2xl font-bold mt-4 text-[#A23E48]">{user.displayName}</h2>
          <span className="mt-1 px-3 py-1 rounded-full bg-[#A23E48] text-white text-xs font-semibold shadow">
            {dbUser.role?.toUpperCase() || "USER"}
          </span>
        </div>
        <div className="px-8 py-6 bg-[#f9f6f6]">
          <div className="mb-2">
            <span className="block text-gray-500 text-sm">Email</span>
            <span className="block text-gray-800 font-medium">{dbUser.email}</span>
          </div>
          {dbUser.createdAt && (
            <div className="mb-2">
              <span className="block text-gray-500 text-sm">Joined</span>
              <span className="block text-gray-800 font-medium">
                {new Date(dbUser.createdAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
        <div className="bg-[#a82b4e] text-white text-center py-3 rounded-b-3xl">
          <span className="font-semibold">Welcome to TrueNest!</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;