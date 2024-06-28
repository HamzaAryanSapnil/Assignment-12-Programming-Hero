import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
// import { DateRangePicker } from "react-date-range";
import { DateRange } from "react-date-range";
// import { addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

import useLoadAllTourGuides from "../../Hooks/useLoadAllTourGuides";
// import addDays  from "react-datepicker/dist/date_utils";



const PackageDetails = () => {
  const [tourGuides, refetch, isLoading] = useLoadAllTourGuides();




  console.log(tourGuides);
  // destructure tourGuides data


  


  const navigate = useNavigate();
  useEffect(() => {
    refetch();
  }, [refetch]);

 
  // console.log(tourGuides);
  const data = useLoaderData();
  const { image, price, title, tourType, from, to } = data;
  console.log(data);
  // const [state, setState] = useState({
  //   selection: {
  //     startDate: new Date(),
  //     endDate: null,
  //     key: "selection",
  //   },
  //   compare: {
  //     startDate: new Date(),
  //     endDate: addDays(new Date(), 3),
  //     key: "compare",
  //   },
  // });
  const [state, setState] = useState([
    {
      startDate: new Date(from),
      endDate: new Date(to),
      key: "selection",
    },
  ]);

  const { user } = useAuth();

  const givenDate = {
    from: new Date(state[0].startDate).toLocaleDateString("en-GB"),
    to: new Date(state[0].endDate).toLocaleDateString("en-GB"),
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
    navigate("/dashboard/payment", { state: bookingData });
   
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen" >
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

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
            <div className="card shrink-0 w-full  shadow-2xl bg-base-100">
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
                  <img
                    src={user?.photoURL}
                    className="w-10 h-10 rounded-full"
                  />
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
                    {/* <DateRangePicker
                      onChange={(item) => setState({ ...state, ...item })}
                      months={1}
                      minDate={addDays(new Date(), -30)}
                      maxDate={addDays(new Date(), 30)}
                      direction="vertical"
                      scroll={{ enabled: true }}
                      ranges={[state.selection, state.compare]}
                    /> */}
                    {/* <DateRangePicker
                      onChange={(item) => setState({ ...state, ...item })}
                      months={1}
                      minDate={new Date()}
                      maxDate={addDays(new Date(), 7)}
                      direction="vertical"
                      scroll={{ enabled: true }}
                      ranges={[state.selection, state.compare]}
                    /> */}
                    <DateRange
                      onChange={(item) => {
                        console.log("item", item);
                        setState([
                          {
                            startDate: new Date(from),
                            endDate: new Date(to),
                            key: "selection",
                          },
                        ]);
                      }}
                      moveRangeOnFirstSelection={false}
                      ranges={state}
                    />
                    ;
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
