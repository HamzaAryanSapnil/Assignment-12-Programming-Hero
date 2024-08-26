import { MdOutlineDownhillSkiing } from "react-icons/md";
import MenuNav from "../MenuNav";

 

const TourGuideMenu = () => {
    return (
      <MenuNav
        icon={MdOutlineDownhillSkiing}
        label="My Assigned Tours"
        address="my_assigned_tours"
      />
    );
};

export default TourGuideMenu;