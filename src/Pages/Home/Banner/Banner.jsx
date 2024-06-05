import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true} ariaLabel="Banner"  >
      <div>
        <img src="https://i.postimg.cc/hGMnhgJx/tranquil-scene-old-wood-bench-outdoors-generated-by-ai.jpg" />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src="https://i.postimg.cc/hGMnhgJx/tranquil-scene-old-wood-bench-outdoors-generated-by-ai.jpg" />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src="https://i.postimg.cc/hGMnhgJx/tranquil-scene-old-wood-bench-outdoors-generated-by-ai.jpg" />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
};

export default Banner;
