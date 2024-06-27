import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useOurPackages from "../../Hooks/useOurPackages";
import Banner from "../Home/Banner/Banner";
import OurPackagesCards from "../../Components/OurPackagesCards/OurPackagesCards";

const AllPackages = () => {
  const [wishListPackageIds, setWishListPackageIds] = useState([]);
  const [ourPackages, loading, refetch] = useOurPackages();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
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
