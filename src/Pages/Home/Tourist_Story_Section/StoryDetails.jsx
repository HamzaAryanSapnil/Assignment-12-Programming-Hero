import { useParams } from "react-router-dom";
import useStoryDetails from "../../../Hooks/useStoryDetails";
import Container from "../../Shared/Container";
import { TbLoaderQuarter } from "react-icons/tb";

const StoryDetails = () => {
    const { id } = useParams()
    console.log(id);
    
    const [storyDetails, isLoading , ] = useStoryDetails(id);
    console.log(storyDetails);
    const {
      package_image,
      storyDetailsReview,
      title,
      tourGuideEmail,
      tourGuideName,
      tourist_email,
      tourist_name,

      
    } = storyDetails;
    
    if (isLoading) {
        return (
          <div className="flex justify-center items-center min-h-screen" >
            <TbLoaderQuarter className="animate-spin h-10 w-10" />
          </div>
        );
    }
    
    return (
      <Container>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content  flex-col lg:flex-row-reverse">
            <img
              src={
                package_image
                  ? package_image
                  : "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              }
              className=" w-full lg:max-w-sm rounded-lg shadow-2xl"
            />
            <div>
              <h1 className="text-5xl font-bold">{title}</h1>
              <p className="py-6">{storyDetailsReview}</p>
              <h3 className="text-3xl font-serif"> Tourist and Tour Guide </h3>
              <div className="flex flex-col lg:flex-row justify-between font-poppins">
                <div className="md:text-xl">
                  <p className="text-red-400" >Tourist</p>
                  <p className="text-dark-03" >Tourist&apos;s Name: {tourist_name} </p>
                  <p className="text-dark-03" >Tourist&apos;s Email: {tourist_email} </p>
                </div>
                <div className="md:text-xl ">
                  <p className="text-yellow-600" >Tour Guide</p>
                  <p className="text-dark-03" >Tour Guide&apos;s Name: {tourGuideName} </p>
                  <p className="text-dark-03" >Tour Guide&apos;s Email: {tourGuideEmail} </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </Container>
    );
};

export default StoryDetails;