import { useLoaderData } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PackageDetails = () => {
  const data = useLoaderData();
  const { user } = useAuth();
  console.log(data);
  const { image, price, title, tourType } = data;
  const [startDate, setStartDate] = useState(new Date());

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
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                    <input
                      type="text"
                      value={user?.displayName}
                      className="input input-bordered"
                      disabled
                      required
                    />
                  </label>
                  <img
                    src={user?.photoURL}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                    <input
                      type="email"
                      placeholder="email"
                      className="input input-bordered"
                      value={user?.email}
                      disabled
                      required
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price BDT</span>
                    <input
                      type="number"
                      placeholder="price"
                      className="input input-bordered"
                      value={price}
                      disabled
                      required
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Tour Date</span>

                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      className="input input-bordered"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Tour Guide Name</span>
                    <select className="select select-bordered w-full max-w-xs">
                      <option
                        disabled
                        selected
                      >
                        Please Select Your Tour Guide
                      </option>
                      <option>Han Solo</option>
                      <option>Greedo</option>
                    </select>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Book Now</button>
                </div>
               
              </form>
            </div>
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
