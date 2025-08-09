import React from "react";
import Navbar from "../Component/Shared/Navbar";
import SideBar from "../Component/SideBar/SideBar";
import Footer from "../Home/Home/Footer/Footer";
import { RiAdminFill } from "react-icons/ri";
import { AiFillFund } from "react-icons/ai";
import {
  FaHome,
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaSearchLocation,
  FaUserEdit,
  FaUser,
  FaHeart,
  FaClipboardCheck,
  FaTachometerAlt,
  FaStreetView,
  FaRProject,
  FaUserNinja,
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";
import useAuth from "../hooks/UseAuth/useAuth";
import ThemeController from "../Component/Shared/ThemeController";
import { FaRadiation } from "react-icons/fa6";
import { MdReviews } from "react-icons/md";
import useUserRole from "../hooks/useUserRole/useUserRole";

const DashBoardLayout = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole(user?.email);
  console.log(role);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Page content */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar for small devices */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2">Dashboard</div>
        </div>

        {/* Routed content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          className="drawer-overlay"
          aria-label="close sidebar"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2">
          {/* Profile info */}
          <div className="flex items-center space-x-4 p-2 mb-4">
            <img
              src={
                user?.photoURL ||
                "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
              }
              alt="User Avatar"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-bold">{user?.displayName || "User"}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <div>
            <ThemeController></ThemeController>
          </div>

          {/* Navigation Links */}
          <li>
            <NavLink to="/" end>
              <FaHome className="inline-block mr-2" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                isActive
                  ? "font-extrabold underline text-primary"
                  : "font-medium"
              }
            >
              <FaTachometerAlt className="inline-block mr-2" /> Dashboard
            </NavLink>
          </li>

          {user && role === "user" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "font-extrabold underline text-primary"
                      : "font-medium"
                  }
                >
                  <FaUser className="inline-block mr-2" /> My Profile
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/wishlist"
                  className={({ isActive }) =>
                    isActive
                      ? "font-extrabold underline text-primary"
                      : "font-medium"
                  }
                >
                  <FaHeart className="inline-block mr-2" /> Wishlist
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/purchased"
                  className={({ isActive }) =>
                    isActive
                      ? "font-extrabold underline text-primary"
                      : "font-medium"
                  }
                >
                  <FaClipboardCheck className="inline-block mr-2" /> Property
                  Bought
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/reviews"
                  className={({ isActive }) =>
                    isActive
                      ? "font-extrabold underline text-primary"
                      : "font-medium"
                  }
                >
                  <MdReviews className="inline-block mr-2" /> My reviews
                </NavLink>
              </li>
            </>
          )}

          {!roleLoading && role === "agent" && (
            <>
              <li>
                <NavLink to="profile" className="block">
                  Agent Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="add-property" className="block">
                  Add Property
                </NavLink>
              </li>
              <li>
                <NavLink to="my-properties" className="block">
                  My Added Properties
                </NavLink>
              </li>
              <li>
                <NavLink to="sold-properties" className="block">
                  My Sold Properties
                </NavLink>
              </li>
              <li>
                <NavLink to="requested-properties" className="block">
                  Requested Properties
                </NavLink>
              </li>
            </>
          )}

          {!roleLoading && role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/admin-profile"
                  className={({ isActive }) =>
                    isActive
                      ? "font-extrabold underline text-primary"
                      : "font-medium"
                  }
                >
                  <RiAdminFill className="inline-block mr-2" /> Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manage-users"
                  className={({ isActive }) =>
                    isActive
                      ? "font-extrabold underline text-primary"
                      : "font-medium"
                  }
                >
                  <FaUserNinja className="inline-block mr-2" />
                  Manage Users
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/manage-properties"
                  className={({ isActive }) =>
                    isActive
                      ? "font-extrabold underline text-primary"
                      : "font-medium"
                  }
                >
                  🏠 Manage Properties
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manage-reviews"
                  className={({ isActive }) =>
                    isActive
                      ? "font-extrabold underline text-primary"
                      : "font-medium"
                  }
                >
                  <MdReviews className="inline-block mr-2" /> Manage reviews
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/advertise-property"
                  className={({ isActive }) =>
                    isActive
                      ? "font-extrabold underline text-primary"
                      : "font-medium"
                  }
                >
                  <AiFillFund className="inline-block mr-2" /> Advertise Property 
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
