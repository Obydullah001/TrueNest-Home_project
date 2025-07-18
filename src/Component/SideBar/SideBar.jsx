import React from 'react';
;
import { 
  FaTachometerAlt, FaSearch, FaComments, FaBoxOpen, FaHeart,
  FaCog, FaSignOutAlt, FaUser,
  FaClipboardCheck,
  FaStar,
  FaHome
} from 'react-icons/fa';
import { Link } from 'react-router';
import useAuth from '../../hooks/UseAuth/useAuth';


const SideBar = () => {
    const {user}= useAuth();
    console.log(user);
    
    return (
      <>
        <div className="h-full p-3 hidden lg:block space-y-2 w-60 dark:bg-gray-50 dark:text-gray-800">
  <div className="flex items-center p-2 space-x-4">
    <img src={user?.photoURL
            ? user.photoURL
            : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"} alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" />
    <div>
      <h2 className="text-lg font-semibold">{user?.displayName}</h2>
      <span className="flex items-center space-x-1">
        <Link to="/dashboard/profile" className="text-xs hover:underline dark:text-gray-600">View profile</Link>
      </span>
    </div>
  </div>

  <div className="divide-y dark:divide-gray-300">
<ul className="pt-2 pb-4 space-y-1 text-sm">
  <li>
    <Link to="/" className="flex items-center p-2 space-x-3 rounded-md">
      <FaHome className="w-5 h-5 text-gray-600" />
      <span>Home</span>
    </Link>
  </li>
  <li>
    <Link to="/dashboard" className="flex items-center p-2 space-x-3 rounded-md">
      <FaTachometerAlt className="w-5 h-5 text-gray-600" />
      <span>Dashboard</span>
    </Link>
  </li>
  <li>
    <Link to="/dashboard/profile" className="flex items-center p-2 space-x-3 rounded-md">
      <FaUser className="w-5 h-5 text-gray-600" />
      <span>My Profile</span>
    </Link>
  </li>
  <li>
    <Link to="/dashboard/wishlist" className="flex items-center p-2 space-x-3 rounded-md">
      <FaHeart className="w-5 h-5 text-gray-600" />
      <span>Wishlist</span>
    </Link>
  </li>
  <li>
    <Link to="/dashboard/purchased" className="flex items-center p-2 space-x-3 rounded-md">
      <FaClipboardCheck className="w-5 h-5 text-gray-600" />
      <span>Property Bought</span>
    </Link>
  </li>
  <li>
    <Link to="/dashboard/reviews" className="flex items-center p-2 space-x-3 rounded-md">
      <FaStar className="w-5 h-5 text-gray-600" />
      <span>My Reviews</span>
    </Link>
  </li>
</ul>


    <ul className="pt-4 pb-2 space-y-1 text-sm">
      <li>
        <Link to="/settings" className="flex items-center p-2 space-x-3 rounded-md">
          <FaCog className="w-5 h-5 text-gray-600" />
          <span>Settings</span>
        </Link>
      </li>
      <li>
        <Link to="/logout" className="flex items-center p-2 space-x-3 rounded-md">
          <FaSignOutAlt className="w-5 h-5 text-gray-600" />
          <span>Logout</span>
        </Link>
      </li>
    </ul>
  </div>
</div>


         <div className="drawer-side">
    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>

      </>

    );
};

export default SideBar;