import { Swiper, SwiperSlide } from "swiper/react";
import "./Tour_Category.css";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useOurPackages from "../../../Hooks/useOurPackages";

const Tour_Category = () => {
  const [packages] = useOurPackages();
  const hiking = packages.filter((item) => item.tourType === "hiking");
  const sports = packages.filter((item) => item.tourType === "sports");
  const walking = packages.filter(
    (item) => item.tourType === "Relaxing" || item.tourType === "walking"
  );
  const wildLife = packages.filter(
    (item) => item.tourType === "Adventure" || item.tourType === "Wildlife"
  );
  const airRides = packages.filter((item) => item.tourType === "airRides");
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={30}
      centeredSlides={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper my-24"
    >
      {/* hiking */}
      <SwiperSlide>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Hiking</h2>
          </div>
        </div>
      </SwiperSlide>
      {/* Sports */}
      <SwiperSlide>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Sports</h2>
          </div>
        </div>
      </SwiperSlide>
      {/* walking */}
      <SwiperSlide>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Walking</h2>
          </div>
        </div>
      </SwiperSlide>
      {/* wildlife */}
      <SwiperSlide>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">WildLIfe</h2>
          </div>
        </div>
      </SwiperSlide>
      {/* air rides */}
      <SwiperSlide>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Air RIdes</h2>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Tour_Category;
