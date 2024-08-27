import useReviewData from "../../Hooks/useReviewData";
import Banner from "../Home/Banner/Banner";
import Container from "../Shared/Container";
import EmptyState from "../Shared/EmptyState";
import All_StoryCard from "./All_StoryCard";


const All_Stories = () => {
    const [tour_reviews, refetch, loading] = useReviewData();
    console.log(refetch);
    
     if (loading) {
       return (
         <div className="flex justify-center items-center h-screen">
           <span className="loading loading-spinner loading-lg"></span>
         </div>
       );
     }

     if (tour_reviews.length === 0 || tour_reviews.length === null) {
       return (
         <>
           <EmptyState
             label={"Tour Review"}
             address={"/"}
             message={"No Data Available"}
           ></EmptyState>
         </>
       );
     }
    return (
      <Container>
        <div>
          <Banner></Banner>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 my-10 container mx-auto justify-center items-center justify-items-center">
            {tour_reviews.map((item, index) => (
           <All_StoryCard key={index} item={item}  />
            ))}
          </div>
        </div>
      </Container>
    );
};

export default All_Stories;