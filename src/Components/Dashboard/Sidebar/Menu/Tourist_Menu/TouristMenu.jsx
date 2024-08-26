import MenuNav from "../MenuNav";
import { SiWish } from "react-icons/si";
import { MdBookmarkAdded } from "react-icons/md";
import { FaBook } from "react-icons/fa";

const TouristMenu = () => {
    return (
      <div>
        <MenuNav
          label={"My Bookings"}
          address={"my_bookings"}
          icon={MdBookmarkAdded}
        />
        <MenuNav
          label={"My Wishlist"}
          address={"my_wishlist"}
          icon={SiWish}
        />
        <MenuNav
          label={"Request To Be A Tour Guide To Admin"}
          address={"request_to_admin"}
          icon={FaBook}
        />
      </div>
    );
};

export default TouristMenu;