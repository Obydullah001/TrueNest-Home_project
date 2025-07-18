import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaHome, FaUser, FaHeart, FaClipboardCheck, FaTachometerAlt } from 'react-icons/fa';
import { MdReviews } from 'react-icons/md';
import ThemeController from '../Component/Shared/ThemeController';
import useAuth from '../hooks/UseAuth/useAuth';

const AdminDashboardLayout = () => {
  const { user } = useAuth();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Page content */}
      <div className="drawer-content flex flex-col">
        {/* Top navbar for mobile */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 font-bold">Admin Dashboard</div>
        </div>

        {/* Routed content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay" aria-label="close sidebar"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2">
          
          {/* User Info */}
          <div className="flex items-center space-x-4 p-2 mb-4">
            <img
              src={user?.photoURL || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"}
              alt="User Avatar"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-bold">{user?.displayName || user?.email?.split('@')[0]}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>

          <ThemeController />

          {/* Common Links */}
          <li>
            <NavLink to="/" end>
              <FaHome className="inline-block mr-2" /> Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "font-extrabold underline text-primary" : "font-medium"}>
              <FaTachometerAlt className="inline-block mr-2" /> Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? "font-extrabold underline text-primary" : "font-medium"}>
              <FaUser className="inline-block mr-2" /> My Profile
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/wishlist" className={({ isActive }) => isActive ? "font-extrabold underline text-primary" : "font-medium"}>
              <FaHeart className="inline-block mr-2" /> Wishlist
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/purchased" className={({ isActive }) => isActive ? "font-extrabold underline text-primary" : "font-medium"}>
              <FaClipboardCheck className="inline-block mr-2" /> Property Bought
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/reviews" className={({ isActive }) => isActive ? "font-extrabold underline text-primary" : "font-medium"}>
              <MdReviews className="inline-block mr-2" /> My Reviews
            </NavLink>
          </li>

          {/* Admin-specific links */}
          <div className="divider">Admin Panel</div>

          <li>
            <NavLink to="/dashboard/manage-users" className={({ isActive }) => isActive ? "font-extrabold underline text-primary" : "font-medium"}>
              👤 Manage Users
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/manage-properties" className={({ isActive }) => isActive ? "font-extrabold underline text-primary" : "font-medium"}>
              🏠 Manage Properties
            </NavLink>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
