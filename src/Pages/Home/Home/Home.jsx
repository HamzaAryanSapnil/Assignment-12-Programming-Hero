import Banner from "../Banner/Banner";
import Tour_Category from "../Tour_Category/Tour_Category";
import { Helmet } from "react-helmet-async";
import ReviewData from "../Tourist_Story_Section/ReviewData";
import TourismSection from "../TourismAndTravelGuideSection/TourismSection";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>
          Tourist Guide || Vacation Tourist Places && Packages Rentals{" "}
        </title>
      </Helmet>
      <Banner />
      <TourismSection />
      <Tour_Category />
      <ReviewData />
    </div>
  );
};

export default Home;
