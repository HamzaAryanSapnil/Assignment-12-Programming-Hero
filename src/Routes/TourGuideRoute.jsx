import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useTourGuide from "../Hooks/useTourGuide";

import PropTypes from 'prop-types'
const TourGuideRoute = ({ children }) => {
    const [isTourGuide, isTourGuideLoading] = useTourGuide();
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading || isTourGuideLoading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      );
    }

    if (user && isTourGuide) {
      return children;
    }
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      ></Navigate>
    );
};

TourGuideRoute.propTypes = {
  children: PropTypes.node,
};
export default TourGuideRoute;