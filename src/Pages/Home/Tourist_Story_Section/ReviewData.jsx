import useReviewData from "../../../Hooks/useReviewData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax } from "react-parallax";
import "./swiper_style.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination } from "swiper/modules";

import paralax_img from "../../../assets/img/paralax_img.jpeg";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import Container from "../../Shared/Container";
import { Link } from "react-router-dom";
import CommonBtn from "../../../Components/Buttons/CommonBtn";
const ReviewData = () => {
  const { user } = useAuth();
  const [reviewText, setReviewText] = useState("");
  const [toggleText, setToggleText] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const [tour_reviews] = useReviewData();
  console.log(tour_reviews);

  const handleToggleText = (storyDetails, id) => {
    setReviewId(id);
    setReviewText(storyDetails);
    setToggleText(!toggleText);
  };

  return (
    <Container>
      <div>
        <Parallax
          blur={{ min: -25, max: 25 }}
          bgImage={paralax_img}
          bgImageAlt="the dog"
          strength={-200}
        >
          <div
            className="hero h-[550px] bg-fixed "
            // style={{ backgroundImage: `url(${paralax_img})` }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">
                  Hello there {user?.displayName}
                </h1>
                <p className="mb-5 text-xl text-start">
                  Welcome to our Tourist Story Section. We are glad you are
                  here. Here you can see some of our reviews. We have many of
                  them. We will be very happy if you give us some feedback. For
                  that you have to visit some where right? Please buy any
                  package, visit there and give us some feedback. We will be
                  happy to help you and will be very glad to share your own
                  feedback in our website. Thank you. See ya!
                </p>
              </div>
            </div>
          </div>
        </Parallax>

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            //   slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
          breakpoints={{
            320: {
              slidesPerView: 1,
              rotate: 100,
              depth: 10,
            },
            640: {
              slidesPerView: 2,
              // spaceBetween: 20,
              // slidesOffsetAfter: 50,
              // slidesOffsetBefore: 50,
            },
            1024: {
              slidesPerView: 3,
              // spaceBetween: 30,
              // slidesOffsetAfter: 50,
              // slidesOffsetBefore: 50,
            },
          }}
        >
          {tour_reviews?.map((review) =>   (
            <SwiperSlide
              style={{
                width: "384px !important",
              }}
              key={review?._id}
              className="w-full md:w-96 bg-center bg-cover bg-white mx-10 swiper-slide-custom"
            >
              <Link to={`story_details/${review?._id}`}>
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
                        toggleText && reviewId === review?._id
                          ? "hidden"
                          : "block"
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
                        !toggleText && reviewId === review?._id
                          ? "hidden"
                          : "block"
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
                          <span className="text-amber-500">
                            Tour Guide:
                          </span>{" "}
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
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-center items-center w-full my-5" >
          <Link to={"/all_story"} >
            <CommonBtn text={"All Stories"} />
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default ReviewData;
