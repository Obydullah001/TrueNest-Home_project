import { createBrowserRouter } from "react-router";
import MainLayOut from "../LayOut/MainLayOut";
import { Component } from "react";
import Home from "../Home/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AllProperties from "../pages/AllProperties/AllProperties";
import PrivateRoute from "../Routes/PrivateRoute";
import DashBoard from "../pages/DashBoard/DashBoard";
import DashBoardLayout from "../LayOut/DashBoardLayout";
import MyProfile from "../pages/DashBoard/MyProfile";
import WishList from "../pages/DashBoard/WishList";
import MyReviews from "../pages/DashBoard/MyReviews";
import PropertyBought from "../pages/DashBoard/PropertyBought";
import AdminDashBoardLayout from "../LayOut/AdminDashBoardLayout";
import ManageUsers from "../pages/AdminDashBoard/ManageUsers/ManageUsers";
import AddProperty from "../pages/AgentProperties/AddProperty/AddProperty";
import AgentAddedProperty from "../pages/AgentProperties/AgentAddedProperty/AgentAddedProperty";
import UpdateProperty from "../pages/AgentProperties/UpdateProperty/UpdateProperty";
import Properties from "../pages/AllProperties/Properties";
import PropertyDetails from "../pages/AllProperties/PropertyDetails";
import MakeOffer from "../pages/DashBoard/MakeOffer";
import RequestedProperty from "../pages/AgentProperties/RequestedProperty/RequestedProperty";
import Payment from "../pages/Payment/Payment";
import SoldProperties from "../pages/AgentProperties/PropertySold/SoldProperties";
import ManageProperties from "../pages/AdminDashBoard/ManageProperty/ManageProperties";
import ManageReviews from "../pages/AdminDashBoard/ManageReviews/ManageReviews";
import AdminProfile from "../pages/AdminDashBoard/AdminProfile/AdminProfile";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "../Routes/AdminRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: '/forbidden',
        Component: Forbidden,
      }
    ],
  },
  {
    path: "/all-properties",
    element: (
      <PrivateRoute>
        <AllProperties></AllProperties>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Properties></Properties>,
      },
      {
        path: "details/:id",
        element: <PropertyDetails></PropertyDetails>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "wishlist",
        element: <WishList></WishList>,
      },
      {
        path: "purchased",
        element: <PropertyBought></PropertyBought>,
      },
      {
        path: "reviews",
        element: <MyReviews></MyReviews>,
      },
      {
        path: "manage-users",
        element: <AdminRoute><ManageUsers></ManageUsers>,</AdminRoute>
      },
      {
        path: "add-property",
        element: <AddProperty></AddProperty>,
      },
      {
        path: "my-properties",
        element: <AgentAddedProperty></AgentAddedProperty>,
      },
      {
        path: "update-property/:id",
        element: <UpdateProperty></UpdateProperty>,
      },
      {
        path: "make-offer/:id",
        element: <MakeOffer></MakeOffer>,
      },
      {
        path: 'property-bought',
        element: <PropertyBought></PropertyBought>
      },
      {
        path: 'requested-properties',
        element: <RequestedProperty></RequestedProperty>
      },
      {
        path: 'payment/:parcelId',
        element: <Payment></Payment>
      },
      {
        path: 'admin-profile',
        element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
      },
      {
        path: 'sold-properties',
        element: <SoldProperties></SoldProperties>
      },
      {
        path: 'manage-properties',
        element: <AdminRoute><ManageProperties></ManageProperties></AdminRoute>
      },
      {
        path: 'manage-reviews',
        element: <AdminRoute><ManageReviews></ManageReviews></AdminRoute>
      }
    ],
  },
  // {
  //   path:'/adminDashboard',
  //   element:<AdminDashBoardLayout></AdminDashBoardLayout>,
  //   children:[
  //     {

  //     }
  //   ]
  // }
]);
