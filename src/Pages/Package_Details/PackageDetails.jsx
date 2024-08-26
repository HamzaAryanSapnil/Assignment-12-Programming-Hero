import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import "react-datepicker/dist/react-datepicker.css";

import useLoadAllTourGuides from "../../Hooks/useLoadAllTourGuides";
import Container from "../Shared/Container";
import usePackageDetails from "../../Hooks/usePackageDetails";
import { useState } from "react";
import DatePicker from "react-datepicker";

const PackageDetails = () => {
  const [tourGuides, isLoading] = useLoadAllTourGuides();
  const { id } = useParams();
  console.log("all tour guides from package details: ", tourGuides);
 
  
  


  const navigate = useNavigate();

  // const [packageDetails, loading, reload] = usePackageDetails(id);
  const [packageDetails, loading] = usePackageDetails(id);
  const { image, price, title, tourType, from, to } = packageDetails;
  // console.log(packageDetails, to, image, price, title, loading, reload);


  
  
  
  //? react date picker
   const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;



  const { user } = useAuth();

  const givenDate = {
    from: new Date(startDate).toLocaleDateString("en-GB"),
    to: new Date(endDate).toLocaleDateString("en-GB"),
  };

  
  // const [startDate, setStartDate] = useState(new Date());
  // const [startDate, setStartDate] = useState(new Date());
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const date = givenDate;
    const price = form.price.value;
    const tourGuideName = form.tourGuideName.value;
    const selectedTourGuide = tourGuides.find(
      (tourGuide) => tourGuide.displayName === tourGuideName
    );

    const {
      _id,
      displayName,
      email: tourGuideEmail,
      ...otherProps
    } = selectedTourGuide;
    console.log("Selected Tour Guide from package details: ",selectedTourGuide);
    

    console.log(name, email, date, price, tourGuideName, tourGuideEmail, _id);
    const bookingData = {
      name,
      email,
      date,
      price,
      tourGuideName,
      title,
      tourType,
      image,
      tourGuide: {
        _id,
        displayName,
        email: tourGuideEmail,
        ...otherProps,
      },
    };

    console.log(bookingData);
    
    navigate("/dashboard/payment", { state: bookingData });
  };
  if (isLoading && loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <Container>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content max-w-full w-full flex-col ">
          <div
            style={{
              backgroundImage: image
                ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`
                : "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg)",
            }}
            className="w-full md:h-[550px] rounded-lg shadow-2xl bg-no-repeat bg-cover bg-center flex justify-center items-center  md:justify-start md:items-end  p-6 "
          >
            <div className=" flex flex-col justify-center items-center py-6">
              <h1 className="text-center text-2xl md:text-5xl font-bold text-white font-fira-sans">
                {title ? title : "Tour Details"}
              </h1>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-around items-start w-full box-border">
            <div className=" flex flex-col items-start gap-3  md:ml-10 md:my-10">
              <h3 className="font-bold text-3xl">
                {title ? title : "loading"}
              </h3>

              <p className=" my-3  w-full xl:w-9/12 font-poppins font-extralight text-dark-03 ">
                {packageDetails?.description
                  ? packageDetails?.description
                  : "This is a very good tour. This area is so relaxing, you can enjoy here. You can sun bath, play games, watch movies. There are some hotels nearby. Also there are some 5 star restaurants. You Can enjoy meals here if you are a real foodie"}
              </p>
              {/* img */}
              {/* <div className="w-10 rounded-full bg-red-400 relative">
                <div className="bg-black absolute top-0 ring-0 w-10 rounded-full h-full bg-opacity-15"></div>
                <img
                  className="w-full rounded-full"
                  src={user?.photoURL}
                  alt=""
                />
              </div> */}
            </div>
            <div className="card   shrink-0   shadow-2xl bg-base-100 w-full md:w-7/12">
              <form
                onSubmit={handleSubmit}
                className="card-body"
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>

                    <input
                      name="name"
                      type="text"
                      value={user?.displayName}
                      className="input input-bordered"
                      disabled
                      required
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                    <input
                      name="email"
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
                      name="price"
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
                    <span className="label-text">Tour Date </span>
                    <DatePicker
                      className="border-2 border-slate-900"
                      selectsRange={true}
                      minDate={from}
                      maxDate={to}
                      startDate={startDate}
                      endDate={endDate}
                      onChange={(update) => {
                        setDateRange(update);
                      }}
                      isClearable={true}
                      withPortal
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Tour Guide Name</span>
                    <select
                      name="tourGuideName"
                      className="select select-bordered w-full max-w-xs"
                      defaultValue="Please Select Your Tour Guide"
                    >
                      <option
                        disabled
                        defaultValue="Please Select Your Tour Guide"
                      >
                        Please Select Your Tour Guide
                      </option>
                      {tourGuides?.map((tourGuide) => (
                        <option
                          key={tourGuide._id}
                          value={tourGuide?.displayName}
                        >
                          {tourGuide?.displayName}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-outline text-black">Book Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PackageDetails;
