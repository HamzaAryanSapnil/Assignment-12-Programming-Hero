import PropTypes from 'prop-types'
import { FaSpinner } from "react-icons/fa6";
const CommonBtn = ({text, loading}) => {
    return (
      <button className="btn btn-outline rounded-full font-libre-franklin  font-medium
       text-sm md:text-lg  text-vdo-btn ">
        {" "}
        {loading ? <FaSpinner className='animate-spin' ></FaSpinner> : text }
      </button>
    );
};
CommonBtn.propTypes = {
  text: PropTypes.string,
  loading:PropTypes.bool,
}
export default CommonBtn;