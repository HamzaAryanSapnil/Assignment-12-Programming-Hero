import { Outlet } from "react-router-dom";
import Footer from "../../Pages/Shared/Footer/Footer";
import AdminNavbar from "../../Pages/Admin/Admin_Navbar/AdminNavbar";


const AdminLayout = () => {
    return (
        <div>
            <AdminNavbar></AdminNavbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default AdminLayout;