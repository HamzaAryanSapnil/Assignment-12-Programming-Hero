import useAuth from "../../../../Hooks/useAuth";

const AdminProfile = () => {
    const { user } = useAuth();
    console.log(user.role);
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src={
              user?.photoURL
                ? user?.photoURL
                : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            }
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Hello {user?.displayName} </h2>
                  <p> {user?.email} </p>
                  <p> You are an Admin </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
