import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

import PrivateRoutes from "./PrivateRoutes";
import AdminDashboard from "../Pages/Admin/Admin_Dashboard/AdminDashboard";
import AdminLayout from "../Layout/Admin_Layout/AdminLayout";
import AddPackages from "../Pages/Admin/Admin_Pages/Add_Packages/AddPackages";
import Hiking from "../Pages/Hiking_Category/Hiking";
import Sports from "../Pages/Categories/Sports";
import Walking from "../Pages/Categories/Walking";
import WildLife from "../Pages/Categories/WildLife";
import AirRides from "../Pages/Categories/AirRides";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/hiking",
        element: <Hiking />,
      },
      {
        path: "/sports",
        element: <Sports />,
      },
      {
        path: "/walking",
        element: <Walking />,
      },
      {
        path: "/wildlife",
        element: <WildLife />,
      },
      {
        path: "/airRides",
        element: <AirRides />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <AdminLayout />,
    children: [
      {
        path: "admin_dashBoard",
        element: <AdminDashboard />,
      },
      {
        path: "add_packages",
        element: <AddPackages></AddPackages>,
      },
    ],
  },
]);
