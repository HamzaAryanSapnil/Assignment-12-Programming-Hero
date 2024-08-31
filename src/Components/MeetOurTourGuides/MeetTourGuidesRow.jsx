import PropTypes from "prop-types";
import { FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";

const MeetTourGuidesRow = ({
  tourGuide,
  index,
  refetch,

}) => {
  refetch();
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{tourGuide?.displayName}</td>
      <td>{tourGuide?.email}</td>
      <td>{tourGuide?.status}</td>
      <td>
        <Link
          
          to={`tour_guide_details/${tourGuide?._id}`}
        >
          <FaBook className="w-7 h-7" />
        </Link>
      </td>
    </tr>
  );
};

MeetTourGuidesRow.propTypes = {
  tourGuide: PropTypes.object,
  index: PropTypes.number,
  refetch: PropTypes.func,

};
export default MeetTourGuidesRow;
