
import { Link } from 'react-router-dom';
import useAxiosLoadCategory from '../../Hooks/useAxiosLoadCategory';
import Banner from '../Home/Banner/Banner';

const Sports = () => {
    const {sports} = useAxiosLoadCategory();
    return (
      <div className="">
        <Banner></Banner>
        <h1 className="text-center text-5xl font-bold ">
          {" "}
          This is Sports Category{" "}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 my-10 container mx-auto justify-center items-center justify-items-center">
          {sports.map((item, index) => (
            <div
              key={index}
              className="card w-96 bg-base-100 shadow-xl"
            >
              <figure>
                <img
                  src={
                    item?.image
                      ? item?.image
                      : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  }
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {item?.title ? item?.title : "Title"}
                </h2>
                <p>{item?.tourType}</p>
                <p>{item?.price} tk</p>
                <div className="card-actions justify-end">
                  <Link to={`/packageDetails/${item?._id}`}>
                    <button className="btn btn-primary">View Package</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Sports;