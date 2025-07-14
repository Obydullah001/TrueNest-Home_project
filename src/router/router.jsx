import { createBrowserRouter } from "react-router";
import MainLayOut from "../LayOut/MainLayOut";
import { Component } from "react";
import Home from "../Home/Home/Home";
import Login from "../pages/Authentication/Login";

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
          path: '/login',
          Component: Login,
        }
    ]
  },
]);