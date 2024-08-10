import Banner from "../Banner/Banner";
import Tour_Category from "../Tour_Category/Tour_Category";
import TourismSection from "../TourismAndTravelGuideSection/TourismSection";
import ReviewData from "../Tourist_Story_Section/ReviewData";
import {Helmet} from "react-helmet-async"

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Tourist Guide || Vacation Tourist Places && Packages Rentals </title>
            </Helmet>
            <Banner />
            <TourismSection />
            <Tour_Category />
            <ReviewData />
        </div>
    );
};

export default Home;