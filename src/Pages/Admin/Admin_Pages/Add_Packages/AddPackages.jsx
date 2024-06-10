import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;
console.log(image_hosting_key);
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPackages = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
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
      };
      // i have to make it in axios secure not public
      const ourPackageRes = await axiosPublic.post("/ourPackages", packageItem);
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

  return (
    <div className="hero min-h-screen bg-base-200 p-4">
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
              <input
                type="text"
                placeholder="tourType"
                {...register("tourType", { required: true })}
                className="input input-bordered"
              />
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
