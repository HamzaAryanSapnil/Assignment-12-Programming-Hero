import { useLoaderData } from "react-router-dom";

const PackageDetails = () => {
  const data = useLoaderData();
  console.log(data);
  const { image, price, title, tourType } = data;

  return (
    <div className="">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col ">
          <img
            src={
              image
                ? image
                : "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            }
            className="w-full md:h-[550px] rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">
              {title ? title : "Tour Details"}
            </h1>
            <p className="py-6">{tourType ? tourType : "Tour Details"}</p>
            <p className="py-6">{price ? price : "Price"}</p>
            <button className="btn btn-primary"></button>
          </div>
        </div>
      </div>

      <div className="p-5 my-5 md:w-1/2 text-center mx-auto">
        <h1 className="text-3xl font-bold my-5">
          {data?.title ? data?.title : "Tour Details"}
        </h1>
        <p>
          {data?.packageDetails
            ? data?.packageDetails
            : "This is a very good tour. This area is so relaxing, you can enjoy here. You can sun bath, play games, watch movies. There are some hotels nearby. Also there are some 5 star restaurants. You Can enjoy meals here if you are a real foodie"}
        </p>
      </div>
    </div>
  );
};

export default PackageDetails;
