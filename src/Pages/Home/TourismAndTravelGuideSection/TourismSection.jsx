import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOurPackages from "../../../Hooks/useOurPackages";
import OurPackagesCards from "../../../Components/OurPackagesCards/OurPackagesCards";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Videosection from "../Video/Videosection";
import MeetOurTourGuides from "../../../Components/MeetOurTourGuides/MeetOurTourGuides";
import CommonBtn from "../../../Components/Buttons/CommonBtn";
import Container from "../../Shared/Container";
import Heading from "../../Shared/Heading";

const TourismSection = () => {
  const [wishListPackageIds, setWishListPackageIds] = useState([]);
  const auth = useAuth();
  const { user } = auth;
  const axiosSecure = useAxiosSecure();
  const [ourPackages, loading, refetch] = useOurPackages();

  useEffect(() => {
    axiosSecure.get(`/wishList?email=${user?.email}`).then((data) => {
      const wishlistData = data.data;
      const packageId = wishlistData?.map((item) => item?.packageId);
      setWishListPackageIds(packageId);
    });
  }, [axiosSecure, user?.email]);

  // i need to write tabs function
  const [toggleTabs, setToggleTabs] = useState(1);
  const handleToggleTabs = (index) => {
    setToggleTabs(index);
  };
  return loading ? (
    <div className="flex justify-center items-center min-h-screen">
      {" "}
      <span className="loading loading-spinner loading-lg"></span>{" "}
    </div>
  ) : (
    <Container>
      <div className="my-20">
        <div
          role="tablist"
          className="tabs tabs-lg"
        >
          <Link
            onClick={() => handleToggleTabs(1)}
            role="tab"
            className={`${
              toggleTabs === 1 ? "tab tab-active   border-b-4" : "tab"
            } text-base md:text-xl text-dark-03`}
            style={{
              borderBottom: toggleTabs === 1 && "4px solid rgb(249 115 22)",
            }}
          >
            Overview
          </Link>
          <Link
            onClick={() => handleToggleTabs(2)}
            role="tab"
            className={`${
              toggleTabs === 2 ? "tab tab-active   border-b-4" : "tab"
            } text-base md:text-xl text-dark-03`}
            style={{
              borderBottom: toggleTabs === 2 && "4px solid rgb(249 115 22)",
            }}
          >
            Our Packages
          </Link>
          <Link
            onClick={() => handleToggleTabs(3)}
            role="tab"
            className={`${
              toggleTabs === 3 ? "tab tab-active   border-b-4" : "tab"
            } text-base md:text-xl text-dark-03`}
            style={{
              borderBottom: toggleTabs === 3 && "4px solid rgb(249 115 22)",
            }}
          >
            Meet Our Tour Guides
          </Link>
        </div>
        {/* i need to write the content for these tabs */}
        {/* tab 1 */}
        <div className={toggleTabs === 1 ? "" : "tab-content mt-10 "}>
          <Videosection></Videosection>
        </div>
        {/* tab 2 */}
        <div className={toggleTabs === 2 ? "" : "tab-content "}>
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 my-10  mx-auto justify-start  items-center justify-items-center mt-16 p-2 md:p-4">
              {ourPackages && ourPackages.length > 0 ? (
                ourPackages.slice(0, 6).map((item, index) => (
                  <OurPackagesCards
                    key={index}
                    item={item}
                    isWishlisted={wishListPackageIds.includes(item?._id)}
                    refetch={refetch}
                  ></OurPackagesCards>
                ))
              ) : (
                <Heading
                  center={true}
                  title="No Rooms Available In This Category!"
                  subtitle="Please Select Other Categories."
                />
              )}
            </div>
          </Container>
          {ourPackages.length > 6 && (
            <Link
              to="/allPackages"
              className="text-center mx-auto flex justify-center items-center "
            >
              {/* <button className="btn btn-primary">View all packages</button> */}
              <CommonBtn text="View all packages"></CommonBtn>
            </Link>
          )}
        </div>
        {/* tab 3 */}
        <div className={toggleTabs === 3 ? "" : "tab-content mt-10 "}>
          <MeetOurTourGuides></MeetOurTourGuides>
        </div>
      </div>
    </Container>
  );
};

export default TourismSection;
