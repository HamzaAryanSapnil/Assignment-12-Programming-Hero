import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { Link, NavLink } from "react-router-dom";
import { GoSidebarCollapse } from "react-icons/go";
import { GoSidebarExpand } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import useRole from "../../../Hooks/useRole";
import TourGuideMenu from "./Menu/TourGuideMenu/TourGuideMenu";
import AdminMenu from "./Menu/Admin_Menu/AdminMenu";
import TouristMenu from "./Menu/Tourist_Menu/TouristMenu";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// import { GrUserAdmin } from "react-icons/gr";
// import TourGuideReqModal from "../../Modal/TourGuideReqModal";

const Sidebar = () => {
  const { user, logOut , loading} = useAuth();
  const [isActive, setIsActive] = useState(false);
  // const [toggle, setToggle] = useState(true);
  const [userRole, isLoading] = useRole();

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  // const toggleHandler = (event) => {
  //   setToggle(event.target.checked);
  // };
    if (isLoading || loading)
      return (
        <div className="flex justify-center items-center min-h-screen">
          <AiOutlineLoading3Quarters className="animate-spin"></AiOutlineLoading3Quarters>
        </div>
      );
  return (
    <div>
      {/* small devices navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to={"/"}>
              <h2 className="text-xl font-titillium font-bold text-descolor inline-flex gap-0">
                Advenza
              </h2>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200 text-2xl"
        >
          {isActive ? (
            <GoSidebarCollapse></GoSidebarCollapse>
          ) : (
            <GoSidebarExpand></GoSidebarExpand>
          )}
        </button>
      </div>

      {/* sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        } md:translate-x-0 transition duration-300 ease-in-out `}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bgba mx-auto">
              <Link to={"/"}>
                <h2 className="text-xl font-titillium font-bold text-descolor inline-flex gap-0">
                  Advenza
                </h2>
              </Link>
            </div>
          </div>
          {/* nav items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {/* Common Profile */}

              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5 tooltip  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600 "
                  }`
                }
                data-tip={user?.displayName ? user?.displayName : "User"}
              >
                {/* <BsGraphUp className="w-5 h-5" /> */}
                {user?.photoURL ? (
                  <div className="avatar   ">
                    <div className="w-7 h-7 rounded-xl">
                      <img
                        src={
                          user?.photoURL
                            ? user?.photoURL
                            : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <CgProfile></CgProfile>
                )}

                <span className="mx-4 font-medium">My Profile</span>
              </NavLink>
              {/* admin menu */}

              {userRole === "admin" && <AdminMenu></AdminMenu>}
              {/* tourguide menu */}
              {userRole === "tourGuide" && <TourGuideMenu></TourGuideMenu>}
              {/* Tourist or user menu */}
              {userRole === "user" && <TouristMenu></TouristMenu>}
            </nav>
          </div>
        </div>

        {/* Logout button */}
        <div>
          <hr />

         
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <IoLogOutOutline className="w-7 h-7" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
