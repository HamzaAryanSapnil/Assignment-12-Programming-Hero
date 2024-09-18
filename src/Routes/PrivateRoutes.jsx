import { Navigate, useLocation } from "react-router-dom";

import PropTypes from "prop-types";
import useAuth from "../Hooks/useAuth";
import { TbLoader } from "react-icons/tb";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <TbLoader className="animate-spin h-24 w-24"></TbLoader>
        <p className="text-4xl text-pink-500" >Please reload if still loading</p>
      </div>
    );
  }

  if (user) {
    return children;
  }
  return (
    <Navigate
      state={{ from: location }}
      to={"/login"}
      replace
    ></Navigate>
  );
};

PrivateRoutes.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoutes;
