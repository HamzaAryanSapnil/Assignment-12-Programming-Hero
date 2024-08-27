
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import CommonBtn from '../../Components/Buttons/CommonBtn';
const All_StoryCard = ({item}) => {
    return (
      <div className="card w-full lg:w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src={
              item?.package_image ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            }
            alt="Package Image"
            className="w-full h-64"
          />
        </figure>
        <div className="card-body relative">
          <h2 className="card-title">{item?.title}</h2>
          <p>{item?.storyDetailsReview}</p>

          <div className="card-actions justify-end">
            <Link to={`/story_details/${item?._id}`}>
              {/* <button className="btn btn-primary">View Package</button> */}
              <CommonBtn text="View Details"></CommonBtn>
            </Link>
          </div>
        </div>
      </div>
    );
};

All_StoryCard.propTypes = {
    item: PropTypes.object,
}
export default All_StoryCard;