import PropTypes from 'prop-types'

const Tour_Category_Card = ({image, label, icon: Icon}) => {
    return (
      <div className="card w-full md:w-96 bg-base-100 shadow-xl p-2  h-56 md:h-64 xl:h-64">
        <figure>
          <img
            src={
              image
                ? image
                : "https://i.ibb.co/r710Nvn/mesmerizing-scenery-green-mountains-with-cloudy-sky-surface.jpg"
            }
            alt="Shoes"
            className="w-full h-56 "
          />
        </figure>
            <div className="card-body">
                <div className='flex gap-6 justify-around items-center' >
                <h2 className="card-title text-xs md:text-xl text-nowrap">{ label? label : "Tour Category" }</h2>
                    <Icon size={ 30 } />
                </div>
        </div>
      </div>
    );
};

Tour_Category_Card.propTypes = {
    image: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.elementType
}
export default Tour_Category_Card;