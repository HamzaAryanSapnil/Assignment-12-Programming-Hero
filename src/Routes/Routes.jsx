import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

import PrivateRoutes from "./PrivateRoutes";
import Secrec from "../Pages/Secrec";
import AdminDashboard from "../Pages/Admin/Admin_Dashboard/AdminDashboard";
import AdminLayout from "../Layout/Admin_Layout/AdminLayout";
import AddPackages from "../Pages/Admin/Admin_Pages/Add_Packages/AddPackages";

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
        path: "/secret",
        element: (
          <PrivateRoutes>
            <Secrec />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: (
          <PrivateRoutes>
            <AdminDashboard />
          </PrivateRoutes>
        ),
      },
      {
        path: "add_packages",
        element: (
          <PrivateRoutes>
            <AddPackages></AddPackages>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
