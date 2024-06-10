import PropTypes from "prop-types";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useWishlist from "../../Hooks/useWishlist";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
const OurPackagesCards = ({ item }) => {
  const [red, setRed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [, refetch] = useWishlist();

  const handleWishlist = (item) => {
    const { image, price, tourType, title, _id } = item;
    if (user && user?.email) {
      const wishListItem = {
        packageId: _id,
        email: user?.email,
        title,
        tourType,
        image,
        price,
      };
      axiosPublic.post("/wishList", wishListItem).then((data) => {
        setRed(true);
        if (data.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${title} added on wishlist`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You aren't Logged In!",
        text: "Please Log In to add to wishlist",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, LogIn!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src={
            item?.image ||
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          }
          alt="Shoes"
          className="w-full h-64"
        />
        <button
          onClick={() => handleWishlist(item)}
          className={`btn btn-xs absolute top-3 right-4 text-2xl border-none bg-transparent ${
            red ? "text-red-500" : "text-black"
          }`}
        >
          <i>
            <FaHeart></FaHeart>
          </i>
        </button>
      </figure>
      <div className="card-body relative">
        <h2 className="card-title">{item?.tourType}</h2>
        <h2 className="card-title">{item?.title}</h2>
        <p>{item?.price} tk</p>

        <div className="card-actions justify-end">
          <button className="btn btn-primary">Book Now</button>
        </div>
      </div>
    </div>
  );
};

OurPackagesCards.propTypes = {
  item: PropTypes.object,
};
export default OurPackagesCards;
