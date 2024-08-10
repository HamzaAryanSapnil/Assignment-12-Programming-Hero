import PropTypes from 'prop-types'
const CommonBtn = ({text}) => {
    return (
      <button className="btn btn-outline rounded-full font-libre-franklin  font-medium
       text-sm md:text-lg  text-vdo-btn ">
        {" "}
        {text}
      </button>
    );
};
CommonBtn.propTypes = {
    text: PropTypes.string
}
export default CommonBtn;