import {
  FaBook,
  FaCalendar,
  FaHistory,
  FaHome,
  FaList,
  FaShoppingCart,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useWishlist from "../../Hooks/useWishlist";
import Footer from "../../Pages/Shared/Footer/Footer";

const Dashboard = () => {
  const { user } = useAuth();
  console.log(user?.displayName);
  const [wishlistData] = useWishlist();
  const isAdmin = true;
  const isTourGuide = false;
  const tourGuideNavLinks = (
    <>
     
      <li>
        <NavLink to={"/dashboard/my_profife"}>
          {" "}
          <FaHome /> My Profile
        </NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/my_assigned_tours"}>
          {" "}
          <FaHome /> My Assigned Tours
        </NavLink>
      </li>
    </>
  );
  const adminNavLinks = (
    <>
     
      <li>
        <NavLink to={"/dashboard/my_profife"}>
          {" "}
          <FaHome /> My Profile
        </NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/add_packages"}> Add Packages</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/manage_users"}>
          {" "}
          <FaList /> Manage Users
        </NavLink>
      </li>
    </>
  );
  const userNavLinks = (
    <>
     
      <li>
        <NavLink to={"/dashboard/my_profife"}>
          {" "}
          <FaHome />
          My Profile
        </NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/my_bookings"}>
          {" "}
          <FaCalendar /> My Bookings
        </NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/my_wishlist"}>
          {" "}
          <FaShoppingCart /> My wishlist{" "}
          <span className="badge badge-secondary">({wishlistData.length})</span>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/request_to_admin"}>
          {" "}
          <FaHistory /> Request To Admin
        </NavLink>
      </li>
    </>
  );
  const sharedLinks = (
    <>
      <li>
        <NavLink to={"/"}>
          {" "}
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to={"/blogs"}>
          {" "}
          <FaBook /> Blogs
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="">
      <div className="drawer lg:drawer-open">
        <input
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content flex flex-col items-center justify-center ">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden text-black font-bold border-none bg-transparent"
          >
            <FaList />
          </label>
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}

            {isAdmin
              ? adminNavLinks
              : isTourGuide
              ? tourGuideNavLinks
              : userNavLinks}
            <div className="divider"></div>
            {sharedLinks}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
