import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
  const navLinks = (
    <>
      <li className=" hover:transition-all hover:duration-300 hover:bg-signBtn hover:text-white hover:rounded-lg hover:shadow-lg hover:shadow-signBtn hover:font-manrope hover:font-medium">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className=" hover:transition-all hover:duration-300 hover:bg-signBtn hover:text-white hover:rounded-lg hover:shadow-lg hover:shadow-signBtn hover:font-manrope hover:font-medium">
        <NavLink to="/my_profile">My Profile</NavLink>
      </li>
      <li className=" hover:transition-all hover:duration-300 hover:bg-signBtn hover:text-white hover:rounded-lg hover:shadow-lg hover:shadow-signBtn hover:font-manrope hover:font-medium">
        <NavLink to="add_packages">Add Packages</NavLink>
      </li>

      <li className=" hover:transition-all hover:duration-300 hover:bg-signBtn hover:text-white hover:rounded-lg hover:shadow-lg hover:shadow-signBtn hover:font-manrope hover:font-medium">
        <NavLink to="/manage_users">Manage Users</NavLink>
      </li>
    </>
  );
  return (
    <div className="drawer my-5 mx-4">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer"
          className="drawer-button"
        >
         <FaBars />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          {navLinks}
        </ul>
      </div>
    </div>
  );
};

export default AdminNavbar;
