
import { SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./swiper_style.css";
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom';
const SwiperSlideReview = ({review, handleToggleText, toggleText, reviewId, reviewText,setToggleText}) => {
    return (
      <SwiperSlide
        style={{
          width: "384px !important",
        }}
        key={review?._id}
        className="w-full md:w-96 bg-center bg-cover bg-white mx-10 swiper-slide-custom"
      >
       
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src={
                  review?.package_image
                    ? review?.package_image
                    : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                }
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{review?.title}</h2>
              <p
                className={
                  toggleText && reviewId === review?._id ? "hidden" : "block"
                }
              >
                {review?.storyDetailsReview.length > 100 ? (
                  <>
                    {review?.storyDetailsReview.slice(0, 100)}...
                    <span className="link link-hover hover:cursor-pointer hover:text-primary">
                      <button
                        onClick={() =>
                          handleToggleText(
                            review?.storyDetailsReview,
                            review?._id
                          )
                        }
                      >
                        Read More
                      </button>
                    </span>
                  </>
                ) : (
                  review?.storyDetailsReview
                )}
              </p>
              <p
                className={
                  !toggleText && reviewId === review?._id ? "hidden" : "block"
                }
              >
                {reviewId === review?._id && toggleText && reviewText}
                <span className="link link-hover hover:cursor-pointer hover:text-primary">
                  <button
                    onClick={() => {
                      setToggleText(!toggleText);
                    }}
                  >
                    Read Less
                  </button>
                </span>
              </p>
              <div className="card-actions justify-center">
                {/* tourist image */}
                <div className="avatar">
                  <div className="w-12 rounded-full ">
                    <img
                      src={
                        review?.tourist_photo
                          ? review?.tourist_photo
                          : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                </div>
                {/* tourist and tour guide's data */}
                <div className="flex flex-col items-center justify-center">
                  <h2 className="card-title">{review?.tourist_name}</h2>
                  <p>
                    {" "}
                    <span className="text-amber-500">Tour Guide:</span>{" "}
                    {review?.tourGuideName}
                  </p>
                  {/* <h1 className=" font-bold"> Tour Guide Name: </h1>
                    <p className=""> {review?.tourGuideName} </p> */}
                  {/* <h1 className=" font-bold"> Tour Guide Email: </h1>
                    <p className=""> {review?.tourGuideEmail} </p> */}
                </div>
              </div>
            </div>
          </div>
       
      </SwiperSlide>
    );
};

SwiperSlideReview.propTypes = {
  review: PropTypes.object,
    handleToggleText: PropTypes.func,
    toggleText: PropTypes.bool,
    reviewId: PropTypes.any,
    reviewText: PropTypes.any,
  setToggleText: PropTypes.any,
};
export default SwiperSlideReview;