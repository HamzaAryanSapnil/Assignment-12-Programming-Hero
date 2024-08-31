import useLoadAllTourGuides from "../../Hooks/useLoadAllTourGuides";
import MeetTourGuidesRow from "./MeetTourGuidesRow";

const MeetOurTourGuides = () => {
  const [tourGuides, refetch, isLoading] = useLoadAllTourGuides();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto w-full container mx-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
          {tourGuides.map((tourGuide, index) => (
            <MeetTourGuidesRow
              key={tourGuide._id}
              tourGuide={tourGuide}
              index={index}
              refetch={refetch}
              // handleTourGuideId={handleTourGuideId}
            ></MeetTourGuidesRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeetOurTourGuides;
