import PropTypes from "prop-types";
import { FaHeart } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import CommonBtn from "../Buttons/CommonBtn";
const OurPackagesCards = ({ item, isWishlisted, refetch }) => {
  const [red, setRed] = useState(isWishlisted);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    setRed(isWishlisted);
  }, [isWishlisted]);

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
      axiosSecure.post("/wishList", wishListItem).then((data) => {
        if (data.data.insertedId) {
          setRed(true);
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
    <div className="card w-full lg:w-96 bg-base-100 shadow-xl">
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
          <Link to={`/packageDetails/${item?._id}`} >
            {/* <button className="btn btn-primary">View Package</button> */}
            <CommonBtn text="View Details"></CommonBtn>
          </Link>
        </div>
      </div>
    </div>
  );
};

OurPackagesCards.propTypes = {
  item: PropTypes.object,
  refetch: PropTypes.func,
  isWishlisted: PropTypes.bool,
};
export default OurPackagesCards;
