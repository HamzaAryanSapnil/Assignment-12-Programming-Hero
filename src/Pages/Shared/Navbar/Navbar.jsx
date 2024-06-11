import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useWishlist from "../../../Hooks/useWishlist";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [wishList ] = useWishlist();

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("Logout", user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navLinks = (
    <>
      <li className=" hover:transition-all hover:duration-300 hover:bg-signBtn hover:text-white hover:rounded-lg hover:shadow-lg hover:shadow-signBtn hover:font-manrope hover:font-medium">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className=" hover:transition-all hover:duration-300 hover:bg-signBtn hover:text-white hover:rounded-lg hover:shadow-lg hover:shadow-signBtn hover:font-manrope hover:font-medium">
        <NavLink to="/community">Community</NavLink>
      </li>
      <li className=" hover:transition-all hover:duration-300 hover:bg-signBtn hover:text-white hover:rounded-lg hover:shadow-lg hover:shadow-signBtn hover:font-manrope hover:font-medium">
        <NavLink to="/blogs">Blogs</NavLink>
      </li>

      <li className=" hover:transition-all hover:duration-300 hover:bg-signBtn hover:text-white hover:rounded-lg hover:shadow-lg hover:shadow-signBtn hover:font-manrope hover:font-medium">
        <NavLink to="/about_us">About Us</NavLink>
      </li>
      <li className=" hover:transition-all hover:duration-300 hover:bg-signBtn hover:text-white hover:rounded-lg hover:shadow-lg hover:shadow-signBtn hover:font-manrope hover:font-medium">
        <NavLink to="/dashboard/my_wishlist">WishList({ wishList.length })</NavLink>
      </li>
      <li className=" hover:transition-all hover:duration-300 hover:bg-signBtn hover:text-white hover:rounded-lg hover:shadow-lg hover:shadow-signBtn hover:font-manrope hover:font-medium">
        <NavLink to="/food_gallery"> Contact Us</NavLink>
      </li>
      {/* <li className=" hover:transition-all hover:duration-300 hover:bg-signBtn hover:text-white hover:rounded-lg hover:shadow-lg hover:shadow-signBtn hover:font-manrope hover:font-medium">
        <NavLink to="/admin">Admin</NavLink>
      </li> */}
    </>
  );
  return (
    <div className=" z-10  ">
      <div className="navbar fixed z-10 bg-black bg-opacity-70 font-mulish text-white h-28">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-40 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <Link
            to={"/"}
            className="btn btn-ghost text-xl font-titillium font-bold text-descolor inline-flex gap-0  "
          >
            Advenza
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        {user ? (
          <div className="navbar-end md:mr-4">
            <div className="inline-block relative dropdown dropdown-hover  dropdown-left ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar tooltip "
                data-tip={user?.displayName ? user?.displayName : "User"}
              >
                <div
                  className="w-10 rounded-full "
                  tabIndex={0}
                  role="button"
                >
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={
                      user?.photoURL
                        ? user?.photoURL
                        : "https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content flex flex-col justify-center items-center text-center z-40 menu p-2 mt-3 shadow bg-base-100 rounded-box md:w-52 w-40"
              >
                <li>
                  <Link
                    to={"/dashboard"}
                    className="my-2"
                  >
                    <button className="btn">Dashboard</button>
                  </Link>
                </li>
               
                <li className="my-2" >
                  {" "}
                  <button className="btn btn-disabled text-xs text-black font-black" >{user?.email}</button>
                </li>
              </ul>
            </div>

            <button
              onClick={handleLogout}
              className=" btn text-error btn-outline btn-error font-medium "
            >
              SignOut
            </button>
          </div>
        ) : (
          <div className="navbar-end">
            <Link
              to="/login"
              className="btn btn-neutral font-bold"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
