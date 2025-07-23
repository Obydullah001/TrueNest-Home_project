import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/UseAuth/useAuth";
import useAxiosSecure from "../../hooks/AxiosHooks/useAxiosSecure";

const MyProfile = () => {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#729F72]/10 via-[#dfadb2]/10 to-[#A23E48]/10">
      <div className="flex flex-col md:flex-row max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-[#729F72]">
        {/* Sidebar */}
        <div className="bg-[#729F72] flex flex-col items-center justify-center p-8 md:w-1/3">
          <img
            src={user.photoURL || "/default-avatar.png"}
            alt={dbUser.displayName || "User"}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover mb-4"
          />
          <h2 className="text-xl font-bold text-white">{user.displayName}</h2>
          <span className="mt-2 px-4 py-1 rounded-full bg-[#A23E48] text-white text-xs font-semibold shadow">
            {dbUser.role?.toUpperCase() || "USER"}
          </span>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-8 bg-[#f7e9e9] flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-[#A23E48] mb-4">My Profile</h3>
          <div className="mb-3">
            <span className="block text-gray-500 text-sm">Email</span>
            <span className="block text-gray-800 font-medium">{dbUser.email}</span>
          </div>
          {dbUser.createdAt && (
            <div className="mb-3">
              <span className="block text-gray-500 text-sm">Joined</span>
              <span className="block text-gray-800 font-medium">
                {new Date(dbUser.createdAt).toLocaleDateString()}
              </span>
            </div>
          )}
          <div className="mt-6">
            <button
              className="px-6 py-2 rounded-lg bg-[#A23E48] text-white font-semibold shadow hover:bg-[#922d37] transition"
              disabled
            >
              Edit Profile (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;