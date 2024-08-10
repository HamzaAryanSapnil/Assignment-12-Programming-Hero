import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import { Link } from "react-router-dom";
import ToggleBtn from "../../../Components/ToggleBtn/ToggleBtn";
import Sidebar_Items from "./Sidebar_Items/Sidebar_Items";
import { BsGraphUp } from "react-icons/bs";
import Tourist_Sidebar from "./Sidebar_Items/Tourist_Sidebar";
import Tour_Guide_Sidebar from "./Sidebar_Items/Tour_Guide_Sidebar";
import Admin_Sidebar from "./Sidebar_Items/Admin_Sidebar";
import { FcSettings } from "react-icons/fc";
import { GrLogout } from "react-icons/gr";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [role, isLoading] = useRole();
  console.log(role, isLoading);

  const handleToggle = () => {
    setActive(!isActive);
  };

  const toggleHandler = (event) => {
    setToggle(event.target.checked);
  };
  return (
    <div>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img
                // className='hidden md:block'
                src="https://i.ibb.co/4ZXzmq5/logo.png"
                alt="logo"
                width="100"
                height="100"
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto">
              <Link to="/">
                <img
                  // className='hidden md:block'
                  src="https://i.ibb.co/4ZXzmq5/logo.png"
                  alt="logo"
                  width="100"
                  height="100"
                />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}
            {role === "host" && (
              <ToggleBtn
                toggleHandler={toggleHandler}
                toggle={toggle}
              />
            )}

            {/*  Sidebar Items */}
            <nav>
              {/* My Profile */}
              <Sidebar_Items
                label="My Profile"
                address="/dashboard"
                icon={BsGraphUp}
              />
              {role === "tourist" && <Tourist_Sidebar />}
              {role === "tour_guide" ? (
                toggle ? (
                  <Tour_Guide_Sidebar />
                ) : (
                  <Tourist_Sidebar />
                )
              ) : undefined}
              {role === "admin" && <Admin_Sidebar />}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <Sidebar_Items
            label="Profile"
            address="/dashboard/profile"
            icon={FcSettings}
          />

          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
