
import PropTypes from 'prop-types'
const OurPackagesCards = ({ item }) => {
    console.log(item);
    return (
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src={ item?.image || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"}
            alt="Shoes"
            className="w-full h-64"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{ item?.tourType }</h2>
          <h2 className="card-title">{ item?.title }</h2>
          <p>{ item?.price } tk</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Book Now</button>
          </div>
        </div>
      </div>
    );
};

OurPackagesCards.propTypes = {
    item: PropTypes.object
}
export default OurPackagesCards;