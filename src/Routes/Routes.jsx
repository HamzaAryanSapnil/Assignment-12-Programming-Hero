import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

import PrivateRoutes from "./PrivateRoutes";

import AddPackages from "../Pages/Admin/Admin_Pages/Add_Packages/AddPackages";
import Hiking from "../Pages/Hiking_Category/Hiking";
import Sports from "../Pages/Categories/Sports";
import Walking from "../Pages/Categories/Walking";
import WildLife from "../Pages/Categories/WildLife";
import AirRides from "../Pages/Categories/AirRides";
import Dashboard from "../Layout/Dashboard/Dashboard";
import MyWishlist from "../Pages/Tourist/MyWishList/MyWishlist";
import ManageUsers from "../Pages/Admin/Admin_Pages/Manage_Users/ManageUsers";
import AdminRoutes from "./AdminRoutes";
import PackageDetails from "../Pages/Package_Details/PackageDetails";

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
        path: "/packageDetails/:id",
        element: <PackageDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/ourPackages/${params.id}`),
      },

      {
        path: "/blogs",
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
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      // admin only routes
      {
        path: "my_profife",
        element: (
          <AdminRoutes>
            <AddPackages></AddPackages>
          </AdminRoutes>
        ),
      },
      {
        path: "add_packages",
        element: (
          <AdminRoutes>
            <AddPackages></AddPackages>
          </AdminRoutes>
        ),
      },
      {
        path: "manage_users",
        element: (
          <AdminRoutes>
            <ManageUsers></ManageUsers>
          </AdminRoutes>
        ),
      },
      // tour guide and admin only routes

      // user only routes

      {
        path: "my_wishlist",
        element: <MyWishlist></MyWishlist>,
      },
    ],
  },
]);
