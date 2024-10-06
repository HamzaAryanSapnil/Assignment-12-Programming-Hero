import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import queryString from "query-string";
import useOurPackages from "../../../Hooks/useOurPackages";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [ourPackages, loading, refetch] = useOurPackages();

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

    const handleSearch = () => {

      let currentQuery = { title: search };
      const url = queryString.stringifyUrl({
        url: "/allPackages",
        query: currentQuery,
      });
      console.log(url);
      navigate(url);
      refetch();
      
    };



  const navLinks = (
    <>
      <li className=" hover:transition-all hover:duration-300 hover:bg-signBtn hover:text-white hover:rounded-lg hover:shadow-lg hover:shadow-signBtn hover:font-manrope hover:font-medium">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className=" hover:transition-all hover:duration-300 hover:bg-signBtn hover:text-white hover:rounded-lg hover:shadow-lg hover:shadow-signBtn hover:font-manrope hover:font-medium">
        <NavLink to="/allPackages">All Packages</NavLink>
      </li>
      <li className=" hover:transition-all hover:duration-300 hover:bg-signBtn hover:text-white hover:rounded-lg hover:shadow-lg hover:shadow-signBtn hover:font-manrope hover:font-medium">
        <NavLink to="/all_story">All Stories</NavLink>
      </li>

      <li className="w-56">
        <div className=" group hover:bg-white flex items-center bg-white rounded-full text-black w-64 p-2">
          <input
            type="text"
            className="w-full group  transition-all duration-500 outline-none font-semibold bg-transparent border-none"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e?.target?.value)}
          />
          <FaSearch
            className="ml-2"
            onClick={handleSearch}
          />
        </div>
      </li>
      {/* <li className=" hover:transition-all hover:duration-300 hover:bg-signBtn hover:text-white hover:rounded-lg hover:shadow-lg hover:shadow-signBtn hover:font-manrope hover:font-medium">
        <NavLink to="/admin">Admin</NavLink>
      </li> */}
    </>
  );
  return (
    <div className=" z-10  ">
      <div className="navbar fixed z-10 bg-black bg-opacity-70 font-mulish text-white h-20">
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
            <div className="inline-block relative dropdown dropdown-hover  dropdown-end ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar tooltip  tooltip-left "
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
                className="dropdown-content flex flex-col justify-center items-center text-center z-40 menu p-2 mt-3 shadow bg-base-100 rounded-box  "
              >
                <li>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-3 hover:bg-neutral-100 transition text-black font-semibold"
                  >
                    Dashboard
                  </Link>
                </li>

                <li className="text-black">
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
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

// import { AiOutlineMenu } from "react-icons/ai";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// import HostModal from "../../Modal/HostRequestModal";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import toast from "react-hot-toast";
// import useAuth from "../../../Hooks/useAuth";
// import Container from "../Container";

// const Navbar = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user, logOut } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);

//   // for modal
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const closeModal = () => {
//     setIsModalOpen(false);
//   };
//   const modalHandler = async () => {
//     console.log("I want to be a host");
//     try {
//       const currentUser = {
//         email: user?.email,
//         role: "guest",
//         status: "Requested",
//       };
//       const { data } = await axiosSecure.put(`/user`, currentUser);
//       console.log(data);
//       if (data.modifiedCount > 0) {
//         toast.success("Success! Please wait for admin confirmation");
//       } else {
//         toast.success("Please!, Wait for admin approval👊");
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error(err.message);
//     } finally {
//       closeModal();
//     }
//   };

//   return (
//     <div className="fixed w-full bg-white z-10 shadow-sm">
//       <div className="py-4 border-b-[1px]">
//         <Container>
//           <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
//             {/* Logo */}
//             <Link to="/">
//               <img
//                 // className='hidden md:block'
//                 src="https://i.ibb.co/4ZXzmq5/logo.png"
//                 alt="logo"
//                 width="100"
//                 height="100"
//               />
//             </Link>
//             {/* Dropdown Menu */}
//             <div className="relative">
//               <div className="flex flex-row items-center gap-3">
//                 {/* Become A Host btn */}
//                 <div className="hidden md:block">
//                   {/* {!user && ( */}
//                   <button
//                     // disabled={!user}
//                     onClick={() => setIsModalOpen(true)}
//                     className="disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition"
//                   >
//                     Host your home
//                   </button>
//                   {/* )} */}
//                 </div>
//                 {/* Modal */}
//                 <HostModal
//                   isOpen={isModalOpen}
//                   closeModal={closeModal}
//                   modalHandler={modalHandler}
//                 />
//                 {/* Dropdown btn */}
//                 <div
//                   onClick={() => setIsOpen(!isOpen)}
//                   className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
//                 >
//                   <AiOutlineMenu />
//                   <div className="hidden md:block">
//                     {/* Avatar */}
//                     <img
//                       className="rounded-full"
//                       referrerPolicy="no-referrer"
//                       src={
//                         user && user.photoURL
//                           ? user.photoURL
//                           : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//                       }
//                       alt="profile"
//                       height="30"
//                       width="30"
//                     />
//                   </div>
//                 </div>
//               </div>
//               {isOpen && (
//                 <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
//                   <div className="flex flex-col cursor-pointer">
//                     <Link
//                       to="/"
//                       className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
//                     >
//                       Home
//                     </Link>

//                     {user ? (
//                       <>
//                         <Link
//                           to="/dashboard"
//                           className="block px-4 py-3 hover:bg-neutral-100 transition font-semibold"
//                         >
//                           Dashboard
//                         </Link>
//                         <div
//                           onClick={logOut}
//                           className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
//                         >
//                           Logout
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <Link
//                           to="/login"
//                           className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
//                         >
//                           Login
//                         </Link>
//                         <Link
//                           to="/signup"
//                           className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
//                         >
//                           Sign Up
//                         </Link>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
