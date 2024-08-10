import { FaUserCog } from "react-icons/fa";
import Sidebar_Items from "./Sidebar_Items";

const Admin_Sidebar = () => {
    return (
      <div>
        <Sidebar_Items
          icon={FaUserCog}
          label="Manage Users"
          address="manage-users"
        />
      </div>
    );
};

export default Admin_Sidebar;