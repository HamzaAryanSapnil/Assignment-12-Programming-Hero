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
import AllPackages from "../Pages/AllPackages/AllPackages";
import TourGuideRoute from "./TourGuideRoute";
import TouristProfile from "../Pages/Tourist/TouristProfile/TouristProfile";
import TourGuideProfie from "../Pages/TourGuide/TourGuideProfile/TourGuideProfie";
import AdminProfile from "../Pages/Admin/Admin_Pages/AdminProfile/AdminProfile";
import MyAssignedTours from "../Pages/TourGuide/MyAssignedTours/MyAssignedTours";
import MyBookings from "../Pages/Tourist/MyBookings/MyBookings";
import RequestToAdmin from "../Pages/Tourist/RequestToAdmin/RequestToAdmin";
import Payment from "../Pages/Package_Details/Payment";
import Blogs from "../Pages/Blogs/Blogs";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";

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
        path: "/allPackages",
        element: <AllPackages />,
      },
      {
        path: "/packageDetails/:id",
        element: (
          <PrivateRoutes>
            <PackageDetails />
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/ourPackages/${params.id}`),
      },

      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/about_us",
        element: <AboutUs />,
      },
      {
        path: "/contact_us",
        element: <ContactUs />,
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
        path: "admin_profife",
        element: (
          <AdminRoutes>
            <AdminProfile></AdminProfile>
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
      // tour guide only routes
      {
        path: "tour_guide_profife",
        element: (
          <TourGuideRoute>
            <TourGuideProfie></TourGuideProfie>
          </TourGuideRoute>
        ),
      },
      {
        path: "my_assigned_tours",
        element: (
          <TourGuideRoute>
            <MyAssignedTours></MyAssignedTours>
          </TourGuideRoute>
        ),
      },

      // user only routes

      {
        path: "my_wishlist",
        element: <MyWishlist></MyWishlist>,
      },
      {
        path: "my_profife",
        element: <TouristProfile></TouristProfile>,
      },
      {
        path: "my_bookings",
        element: <MyBookings></MyBookings>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },

      {
        path: "request_to_admin",
        element: <RequestToAdmin></RequestToAdmin>,
      },
    ],
  },
]);
