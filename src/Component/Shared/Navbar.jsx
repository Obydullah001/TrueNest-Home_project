import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import TrueNestLogo from "./TrueNestLogo";
import ThemeController from "./ThemeController";
import useAuth from "../../hooks/UseAuth/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);

  // console.log(user);

  // const userImage = user.photoURL || ' ' ;
  // // console.log(userImage);

  const handleLogOut = () => {
    logOut()
      .then((data) => {
        console.log(data);
        toast.success("Signed Out Successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const adminLinks = (
  //   <>
  //         <li>
  //       <NavLink
  //         className={({ isActive }) =>
  //           isActive ? "font-extrabold underline text-primary" : "font-medium"
  //         }
  //         to="/adminDashboard"
  //       >
  //         AdminDashBoard 
  //       </NavLink>
  //     </li>
  //   </>
  // );


  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "font-extrabold underline text-primary" : "font-medium"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "font-extrabold underline text-primary" : "font-medium"
          }
          to="/all-properties"
        >
          All Properties
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar shadow-sm bg-base-100 dracula:bg-gray-900 my-4 sticky top-0 z-50 mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 dark:text-white dark:bg-gray-800 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
            <>
            {user && (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-extrabold underline text-primary"
                      : "font-medium"
                  }
                  to="/dashboard"
                >
                  DashBoard
                </NavLink>
              </li>
            )}
          </>
          </ul>
        </div>
        <Link className=" text-xl ">
          <TrueNestLogo></TrueNestLogo>
        </Link>
        {/* {user && <p>{user.email}</p>} */}
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1 ">
          {links}
          
          <>
            {user && (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-extrabold underline text-primary"
                      : "font-medium"
                  }
                  to="/dashboard"
                >
                  DashBoard
                </NavLink>
              </li>
            )}
          </>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="mr-6">
          <ThemeController></ThemeController>
        </div>
        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user?.photoURL
                        ? user.photoURL
                        : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                    }
                    alt="User Avatar"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li className="text-center font-bold">
                  {user?.displayName || "Anonymous User"}
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="btn btn-sm btn-primary mt-2 hover:bg-red-800 hover:text-secondary"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="btn btn-primary rounded-4xl px-6 hover:bg-red-800 hover:text-secondary"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
