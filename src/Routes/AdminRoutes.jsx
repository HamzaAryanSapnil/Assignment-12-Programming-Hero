import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import PropTypes from 'prop-types'

const AdminRoutes = ({children}) => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading || isAdminLoading ) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if ((user && isAdmin) ) {
    return children;
  }

  return (
    <Navigate
      to="/"
      state={{ from: location }}
      replace
    ></Navigate>
  );
};

AdminRoutes.propTypes = {
  children: PropTypes.node
}
export default AdminRoutes;
