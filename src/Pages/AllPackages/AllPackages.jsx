import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Banner from "../Home/Banner/Banner";
import OurPackagesCards from "../../Components/OurPackagesCards/OurPackagesCards";
import { useSearchParams } from "react-router-dom";
import EmptyState from "../Shared/EmptyState";
import useOurPackages from "../../Hooks/useOurPackages";

const AllPackages = () => {
  const [wishListPackageIds, setWishListPackageIds] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [params, setParams] = useSearchParams()
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const tourType = params.get("tourType");
    const title = params.get("title"); 
  const [ourPackages, loading, refetch] = useOurPackages(tourType, title);
  

  useEffect(() => {
    axiosSecure.get(`/wishList?email=${user?.email}`).then((data) => {
      const wishlistData = data.data;
      const packageId = wishlistData?.map((item) => item?.packageId);
      setWishListPackageIds(packageId);
    });
  }, [axiosSecure, user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (ourPackages.length === 0 || ourPackages.length === null) {
    return (
      <>
        <EmptyState
          label={tourType}
          address={"/"}
          message={"No Data Available"}
        ></EmptyState>
      </>
    );
  }

  return (
    <div>
      <Banner></Banner>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 my-10 container mx-auto justify-center items-center justify-items-center">
        {ourPackages.map((item, index) => (
          <OurPackagesCards
            key={index}
            item={item}
            isWishlisted={wishListPackageIds.includes(item?._id)}
            refetch={refetch}
          ></OurPackagesCards>
        ))}
      </div>
    </div>
  );
};

export default AllPackages;
