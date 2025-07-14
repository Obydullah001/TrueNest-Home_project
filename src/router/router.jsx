import { createBrowserRouter } from "react-router";
import MainLayOut from "../LayOut/MainLayOut";
import { Component } from "react";
import Home from "../Home/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AllProperties from "../pages/AllProperties/AllProperties";
import PrivateRoute from "../Routes/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children: [
        {
            path: "/",
            Component: Home
        },
          {
        path: '/all-properties',
        element: 
          <PrivateRoute>
            <AllProperties></AllProperties>
          </PrivateRoute>
          },
        {
          path: '/login',
          Component: Login,
        },
        {
          path: '/register',
          Component: Register,
        }
    ]
  },
]);