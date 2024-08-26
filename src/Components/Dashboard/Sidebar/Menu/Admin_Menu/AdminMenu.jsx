import { MdOutlineDownhillSkiing } from "react-icons/md";
import MenuNav from "../MenuNav";
import { FaUsers } from "react-icons/fa";


const AdminMenu = () => {
    return (
      <>
        <MenuNav
          label={"Add Packages"}
          address={"add_packages"}
          icon={MdOutlineDownhillSkiing}
        />

        <MenuNav
          label={"Manage Users"}
          address={"manage_users"}
          icon={FaUsers}
        />
      </>
    );
};

export default AdminMenu;