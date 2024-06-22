import useAuth from "../../../Hooks/useAuth";

const TourGuideProfie = () => {
  const { user } = useAuth();
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
          <h2 className="card-title">Hello {user?.displayName}. </h2>
          <p> {user?.email} </p>
          <p>Your are a tour guide</p>
        </div>
      </div>
    </div>
  );
};

export default TourGuideProfie;
