import { useParams } from "react-router-dom";
import useTourGuideDetails from "../../Hooks/useTourGuideDetails";


const Tour_Guide_Details = () => {
    const { id } = useParams()
    // eslint-disable-next-line no-unused-vars
    const [tourGuideDetails, loading] = useTourGuideDetails(id);
    console.log(loading);
    
   if (loading) {
     return (
       <div className="flex justify-center items-center h-screen">
         <span className="loading loading-spinner loading-lg"></span>
       </div>
     );
   }
    
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              src={
                tourGuideDetails?.photoURL
                  ? tourGuideDetails?.photoURL
                  : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              }
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Tour Guide&apos;s Name: {tourGuideDetails?.displayName}{" "}
            </h2>
            <p> Tour Guide&apos;s Email: {tourGuideDetails?.email} </p>
            <p> Role: {tourGuideDetails?.role} </p>
            <p> Status: {tourGuideDetails?.status} </p>
          </div>
        </div>
      </div>
    );
};

export default Tour_Guide_Details;