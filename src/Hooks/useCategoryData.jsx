import { GiHiking } from "react-icons/gi";
import { MdSportsCricket } from "react-icons/md";
import { BsPersonWalking } from "react-icons/bs";
import { GiCircleForest } from "react-icons/gi";
import { GiParachute } from "react-icons/gi";

const useCategoryData = () => {
     const categories = [
       {
         image:
           "https://i.ibb.co/r710Nvn/mesmerizing-scenery-green-mountains-with-cloudy-sky-surface.jpg",
         label: "hiking",
         icon: GiHiking,
       },
       {
         image: "https://i.ibb.co/LJ9J44y/mirpur-stadium.jpg",
         label: "sports",
         icon: MdSportsCricket,
       },
       {
         image:
           "https://i.ibb.co/H2PnTZf/ashraful-pranto-s-Z90-UEv0-CHw-unsplash-1.jpg",
         label: "walking",
         icon: BsPersonWalking,
       },
       {
         image: "https://i.ibb.co/xYm9nHf/amazing-bengal-tiger-nature.jpg",
         label: "wildlife",
         icon: GiCircleForest,
       },
       {
         image: "https://i.ibb.co/vdFvFz4/parasallingcox-sbazar.jpg",
         label: "airRides",
         icon: GiParachute,
       },
     ];
  return [categories];
};

export default useCategoryData;
