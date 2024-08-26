import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useState } from "react";
import CommonBtn from "../../../../Components/Buttons/CommonBtn";
import AddPackageBg from "../../../../assets/img/addPackageBg.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet-async";
// import useSaveAddPackagesInDB from "../../../../Hooks/useSaveAddPackagesInDB";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPackages = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  //? react date picker
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [imgPreview, setImgPreview] = useState();
  const [loading, setLoading] = useState(false)
  const [imgText, setImgText] = useState("Select Your Image");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    const imageFile = { image: data.image[0] };
    console.log(imageFile);
    console.log({
      startDate,
      endDate,
    });

    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const packageItem = {
        tourType: data.tourType,
        image: res?.data?.data?.display_url,
        price: parseFloat(data.price),
        title: data.title,
        description: data.packageDetails,
        to: endDate,
        from: startDate,
      };

      try {
        const ourPackageRes = await axiosSecure.post(
          "/ourPackages",
          packageItem
        );
        console.log(ourPackageRes.data);
        if (ourPackageRes?.data?.insertedId) {
          Swal.fire({
            title: `${data.title} package added successfully`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setLoading(false);
      } catch (error) {
        Swal.fire({
          title: `Failed to add ${data.title} package`,
          text: error.message || "An unexpected error occurred",
          icon: "error",
          showConfirmButton: true,
        });
        setLoading(false);
      }
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200 md:p-4 ">
      <Helmet>
        <title>Add Packages | DashBoard | Tourist Guide</title>
      </Helmet>
      <div className="hero-content max-w-full min-w-full justify-around gap-10 flex-col lg:flex-row-reverse">
        <div
          className="text-center lg:text-left w-full flex-1 lg:min-h-screen bg-black flex justify-center items-center flex-col bg-center bg-cover bg-no-repeat bg-fixed"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)), url(${AddPackageBg})`,
          }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-center text-white">
            Add a New Package
          </h1>

          <p className="text-base text-center my-3 text-yellow-500">
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
            <div className="form-control overflow-x-auto">
              <label className="label">
                <span className="label-text mx-3">Tour Date </span>
                <DatePicker
                  className="border-2 border-slate-900"
                  selectsRange={true}
                  minDate={new Date()}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update);
                  }}
                  isClearable={true}
                  withPortal
                />
              </label>
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
                onChange={(e) => {
                  const img = e.target.files[0];
                  setImgPreview(URL.createObjectURL(img));
                  setImgText(img.name);
                }}
                type="file"
                name="image"
                className="file-input w-full "
              />
              <div className="  md:h-40 md:w-64 border-none">
                <img
                  className="h-full w-full border-none"
                  src={imgPreview}
                  alt="Img"
                  
                />
                <p className="font-fira-sans text-dark-03 my-4">
                  {imgText.length > 30
                    ? imgText.split(".")[0].slice(0, 30) +
                      "..." +
                      imgText.split(".")[1]
                    : imgText}
                </p>
              </div>
            </div>

            <div className="form-control mt-6">
              <CommonBtn text={"Add Package"} loading={loading} ></CommonBtn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPackages;
