import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;
console.log(image_hosting_key);
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPackages = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const packageItem = {
        tourType: data.tourType,
        image: res.data.data.display_url,
        price: parseFloat(data.price),
        title: data.title,
        description: data.packageDetails,
        to: state[0].endDate,
        from: state[0].startDate, 
      };
      const ourPackageRes = await axiosSecure.post("/ourPackages", packageItem);
      console.log(ourPackageRes.data);
      if (ourPackageRes.data.insertedId) {
        Swal.fire({
          title: `${data.title} package added successfully`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const handleDates = range => {
    setState(range.selection);
  }
  return (
    <div className="hero min-h-screen bg-base-200 p-4 ">
      <div className="hero-content max-w-full min-w-full justify-around gap-10 flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-full flex-1">
          <h1 className="text-5xl font-bold text-center">Add a New Package</h1>

          <p className="text-lg text-center my-3 text-gray-500">
            Add details of a new package such as spot photo, tour type, etc.
          </p>
        </div>
        <div className="card  w-full flex-1 shadow-2xl bg-base-100">
          <form
            className="card-body grid grid-cols-1 md:grid-cols-2 justify-center items-center justify-items-center gap-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Tour Type</span>
              </label>
              <select
                {...register("tourType", { required: true })}
                className="select select-bordered w-full"
              >
                <option
                  disabled
                  defaultValue="Select Tour Type"
                >
                  Select Tour Type
                </option>
                <option value="hiking">hiking</option>
                <option value="sports">sports</option>
                <option value="walking">walking</option>
                <option value="wildlife">wildlife</option>
                <option value="airRides">airRides</option>
              </select>
              {errors.tourType && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="title"
                {...register("title", { required: true })}
                className="input input-bordered"
              />
              {errors.title && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select Avability</span>
              </label>
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state} 
              />
              {errors.title && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Package Details</span>
              </label>
              <textarea
                type="text"
                placeholder="Enter Package Details"
                {...register("packageDetails", { required: true })}
                className="textarea textarea-bordered"
              />
              {errors.packageDetails && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                placeholder="price"
                {...register("price", { required: true })}
                className="input input-bordered"
              />
              {errors.price && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <input
                {...register("image", {
                  required: true,
                  message: "Image is required",
                })}
                type="file"
                className="file-input w-full "
              />
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary"
              >
                Add Package
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPackages;
