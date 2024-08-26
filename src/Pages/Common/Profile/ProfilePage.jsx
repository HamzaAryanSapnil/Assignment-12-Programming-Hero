import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Helmet } from "react-helmet";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
// import CommonBtn from "../../../Components/Buttons/CommonBtn";
const ProfilePage = () => {
    const { user, loading } = useAuth() || {};
    
    
  const [role, isLoading] = useRole();
  if (isLoading || loading)
    return (
        <div className="flex justify-center items-center min-h-screen">
            <AiOutlineLoading3Quarters className="animate-spin" ></AiOutlineLoading3Quarters>
      </div>
    );
  return (
    <div  >
      <h2 className="my-10 text-3xl text-center font-bold textarea-accent font-libre-franklin">
        {" "}
        Welcome to Dashboard{" "}
      </h2>
      <div className="flex justify-center items-center h-screen">
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <div className="bg-white shadow-lg rounded-2xl w-3/5">
        
          <div className="flex flex-col items-center justify-center p-4 -mt-16">
            <a
              href="#"
              className="relative block"
            >
              <img
                alt="profile"
                src={user?.photoURL}
                className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
              />
            </a>

            <p className="p-2 uppercase px-4 text-xs text-white bg-yellow-600 rounded-full">
              {role}
            </p>
            
            <div className="w-full p-2 mt-4 rounded-lg">
              <div className="flex flex-col flex-wrap items-center justify-start text-sm text-gray-600 ">
                <p className="flex flex-col">
                  Name
                  <span className="font-bold text-black ">
                    {user?.displayName}
                  </span>
                </p>
                <p className="flex flex-col">
                  Email
                  <span className="font-bold text-black ">{user?.email}</span>
                </p>

                {/* <div>
                  <CommonBtn text={"Update Profile"} ></CommonBtn>
                  <button className="bg-[#F43F5E] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]">
                    Change Password
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
