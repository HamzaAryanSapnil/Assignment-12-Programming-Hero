import { Swiper, SwiperSlide } from "swiper/react";
import "./Tour_Category.css";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const Tour_Category = () => {
  
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
        <Link to="/hiking">
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
        </Link>
      </SwiperSlide>

      {/* Sports */}
      <SwiperSlide>
        <Link to="/sports">
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
        </Link>
      </SwiperSlide>
      {/* walking */}
      <SwiperSlide>
        <Link to="/walking">
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
        </Link>
      </SwiperSlide>
      {/* wildlife */}
      <SwiperSlide>
        <Link to="/wildlife">
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
        </Link>
      </SwiperSlide>
      {/* air rides */}
      <SwiperSlide>
        <Link to="/airRides">
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
        </Link>
      </SwiperSlide>
    </Swiper>
  );
};

export default Tour_Category;
