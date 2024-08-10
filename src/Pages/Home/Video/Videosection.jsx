import { Link } from "react-router-dom";
import Container from "../../Shared/Container";
const Videosection = () => {
  return (
    <Container>
      <div className="my-10 flex flex-col lg:flex-row justify-around items-center gap-5 p-4  mx-auto ">
        <div className="flex-1">
          <div className="card  w-full h-full xl:h-[360px] bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl md:text-4xl font-bold text-descolor font-cabin">
                Watch Our Naricel Ginjira in Saint Martin
              </h2>
              <p className="font-mulish text-dark-03 text-cardDescolor">
                Dive deeper into the world of artisanal mastery with our
                captivating video section. Immerse yourself in the enchanting
                process of crafting exquisite , where every creation is and
                tradition. Click the button below as you discover the weave, and
                carve. guiding you to our comprehensive All Tours page where you
                can explore and acquire your own piece of artisanal beauty.
              </p>
              <div className="card-actions justify-start">
                <Link to={"/allPackages"}>
                  <button className="btn btn-outline rounded-full font-libre-franklin  font-semibold  text-xs md:text-xl text-vdo-btn ">
                    {" "}
                    See All Our Packages
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full h-full">
          <div className="card w-full h-full bg-base-100 shadow-xl ">
            <div className="card-body w-full">
              <div className="w-full h-full object-cover">
                <iframe
                  className="w-full h-full object-cover rounded-xl md:h-[380px] lg:h-[300px] "
                  // width="560"
                  // height="315"
                  src="https://www.youtube.com/embed/xcCCAqhuMcc?si=UCUnFsQlMQ7BTNXC"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Videosection;
