// Banner.jsx
import "./Banner.css"

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// Import images
import firstImg from '../../../assets/img/amazing-bengal-tiger-nature.jpg'
import secondImg from '../../../assets/img/CoxsBazarBeachView.jpeg'
import thirdImg from '../../../assets/img/coxsBazarSayman.jpg'
import fourthImg from "../../../assets/img/hakaluki-haor-2.jpg";
import fifthImg from "../../../assets/img/hakaluki-haor-3.jpg";
import sixthImg from "../../../assets/img/hakaluki-haor-4.jpg";
import seventhImg from "../../../assets/img/hakaluki-haor-5.jpg";

const images = [
  {
    img: firstImg,
    location: "Sundarban",
    photo_collect_credit: "Hamza Aryan Sapnil",
    ocupassion: "Junior Front End Web Developer",
  },
  {
    img: secondImg,
    location: "Cox's Bazar Sea Beach",
    photo_collect_credit: "Hamza Aryan Sapnil",
    ocupassion: "Junior Front End Web Developer",
  },
  {
    img: thirdImg,
    location: "Cox's Bazar Sayman Resort",
    photo_collect_credit: "Hamza Aryan Sapnil",
    ocupassion: "Junior Front End Web Developer",
  },
  {
    img: fourthImg,
    location: "Hakaluki Haor Maulovi-Bazar Shylhet",
    photo_collect_credit: "Hamza Aryan Sapnil",
    ocupassion: "Junior Front End Web Developer",
  },
  {
    img: fifthImg,
    location: "Hakaluki Haor Maulovi-Bazar Shylhet",
    photo_collect_credit: "Hamza Aryan Sapnil",
    ocupassion: "Junior Front End Web Developer",
  },
  {
    img: sixthImg,
    location: "Hakaluki Haor Maulovi-Bazar Shylhet",
    photo_collect_credit: "Hamza Aryan Sapnil",
    ocupassion: "Junior Front End Web Developer",
  },
  {
    img: seventhImg,
    location: "Hakaluki Haor Maulovi-Bazar Shylhet",
    photo_collect_credit: "Hamza Aryan Sapnil",
    ocupassion: "Junior Front End Web Developer",
  },
];

const Banner = () => {
  return (
    <div className="carousel-container bg-slate-900 text-slate-100 font-poppins w-full overflow-hidden relative">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        ariaLabel="Banner"
        showThumbs={false} // Hide thumbnails if not needed
        showStatus={false} // Hide current slide status
        interval={5000} // Slide interval in milliseconds
        transitionTime={700} // Transition duration in milliseconds
        className="min-h-screen w-full"
        // Optional: Add additional props as needed
      >
        {images.map((item, index) => (
          <div
            key={index}
            className="flex justify-center items-center"
          >
            {/* Image Container */}
            <div className="w-full h-[80vh] md:h-[90vh] lg:h-[100vh] relative">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={
                  item?.img ||
                  "https://i.postimg.cc/hGMnhgJx/tranquil-scene-old-wood-bench-outdoors-generated-by-ai.jpg"
                }
                alt={item?.location || "Location"}
              />
              {/* Overlay Content */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-center p-4 rounded-md w-11/12 md:w-2/3 lg:w-1/2">
                <h3 className="text-xl md:text-2xl font-semibold">
                  {item.photo_collect_credit}
                </h3>
                <h2 className="text-orange-400 font-bold text-lg md:text-xl">
                  {item.ocupassion}
                </h2>
                <p className="text-lg md:text-2xl">{item.location}</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
