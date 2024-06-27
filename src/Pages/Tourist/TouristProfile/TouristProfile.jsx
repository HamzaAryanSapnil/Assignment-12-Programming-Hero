import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";


const TouristProfile = () => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useRole();
  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen" >
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }
    return (
      <div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              src={ user?.photoURL ? user?.photoURL : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Hello {user?.displayName} </h2>
            <p> {user?.email} </p>
            {role?.status === "requested" ? <p>You have requested to the admin to set your role</p> : role?.role === "admin" ? <p>You are an Admin</p> : role?.role === "tourGuide" ? <p>You are a tour guide</p> : <p>You are a Tourist</p>}
          </div>
        </div>
      </div>
    );
};

export default TouristProfile;