import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme css file
import { useState, useEffect } from "react";
import CommonBtn from "../../../../Components/Buttons/CommonBtn";
import AddPackageBg from "../../../../assets/img/addPackageBg.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPackages = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError, // To manually set errors
    clearErrors, // To clear errors
  } = useForm();

  // State for date range picker
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // State for image handling
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const MAX_IMAGES = 4;

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  // Handle multiple image selection
  const handleImageChange = (event) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) {
      return; // No files selected
    }

    const newImages = [...images];

    // Basic file validation (optional)
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      if (!file.type.match("image/*")) {
        alert("Please select only image files.");
        return;
      }
    }

    if (newImages.length + selectedFiles.length > MAX_IMAGES) {
      alert(`You can only upload a maximum of ${MAX_IMAGES} images.`);
      return;
    }

    const selectedImages = Array.from(selectedFiles).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages([...newImages, ...selectedImages]);
  };

  // Remove image by index and revoke its object URL
  const handleImageRemove = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      URL.revokeObjectURL(updatedImages[index].preview);
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  // Form submission handler
  const onSubmit = async (data) => {
    // Validate that at least one image is selected
    if (images.length === 0) {
      setError("images", {
        type: "manual",
        message: "At least one image is required",
      });
      return;
    } else {
      clearErrors("images");
    }

    // Validate that both start and end dates are selected
    if (!startDate || !endDate) {
      Swal.fire({
        title: "Invalid Date Range",
        text: "Please select both start and end dates for the tour.",
        icon: "error",
        showConfirmButton: true,
      });
      return;
    }

    setLoading(true);
    console.log("Form Data:", data);

    try {
      // Upload each image to ImgBB and collect their URLs
      const uploadPromises = images.map((image) => {
        const formData = new FormData();
        formData.append("image", image.file);
        return axiosPublic.post(image_hosting_api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      });

      const uploadResponses = await Promise.all(uploadPromises);

      // Check if all uploads were successful
      const allSuccessful = uploadResponses.every((res) => res.data.success);
      if (!allSuccessful) {
        throw new Error("One or more image uploads failed.");
      }

      // Extract uploaded image URLs
      const uploadedImageUrls = uploadResponses.map(
        (res) => res.data.data.display_url
      );

      // Prepare the package data
      const packageItem = {
        tourType: data.tourType,
        image: uploadedImageUrls, // Array of image URLs
        price: parseFloat(data.price),
        title: data.title,
        description: data.packageDetails,
        to: endDate,
        from: startDate,
      };

      // Save the package to the secure endpoint
      const ourPackageRes = await axiosSecure.post("/ourPackages", packageItem);
      console.log("Package Response:", ourPackageRes.data);

      if (ourPackageRes.data.insertedId) {
        Swal.fire({
          title: `${data.title} package added successfully`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        // Reset form and states after successful submission
        // Revoke all object URLs
        images.forEach((image) => URL.revokeObjectURL(image.preview));
        setImages([]);
        setDateRange([null, null]);
      } else {
        throw new Error("Failed to add the package.");
      }
    } catch (error) {
      console.error("Error adding package:", error);
      Swal.fire({
        title: `Failed to add ${data.title} package`,
        text: error.message || "An unexpected error occurred",
        icon: "error",
        showConfirmButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200 md:p-4">
      <Helmet>
        <title>Add Packages | DashBoard | Tourist Guide</title>
      </Helmet>
      <div className="hero-content max-w-full min-w-full flex-col lg:flex-row-reverse gap-10 justify-between">
        {/* Background Section */}
        <div
          className="text-center lg:text-left w-full flex-1 lg:min-h-screen bg-black flex justify-center items-center flex-col bg-center bg-cover bg-no-repeat bg-fixed p-6 rounded-lg shadow-lg"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)), url(${AddPackageBg})`,
          }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-4">
            Add a New Package
          </h1>

          <p className="text-lg md:text-xl text-center my-4 text-yellow-400">
            Provide comprehensive details for your new package, including
            photos, tour type, and more.
          </p>
        </div>

        {/* Form Section */}
        <div className="card w-full flex-1 shadow-2xl bg-base-100 rounded-lg p-6">
          <form
            className="card-body grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Tour Type */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Tour Type</span>
              </label>
              <select
                {...register("tourType", { required: "Tour Type is required" })}
                className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-md transition duration-200"
              >
                <option
                  value=""
                  disabled
                  selected
                >
                  Select Tour Type
                </option>
                <option value="hiking">Hiking</option>
                <option value="sports">Sports</option>
                <option value="walking">Walking</option>
                <option value="wildlife">Wildlife</option>
                <option value="airRides">Air Rides</option>
              </select>
              {errors.tourType && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.tourType.message}
                </span>
              )}
            </div>

            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter Package Title"
                {...register("title", { required: "Title is required" })}
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-md transition duration-200"
              />
              {errors.title && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </span>
              )}
            </div>

            {/* Tour Date */}
            <div className="form-control col-span-1 md:col-span-2">
              <label className="label">
                <span className="label-text font-semibold">Tour Date</span>
              </label>
              <DatePicker
                className="border-2 border-slate-900 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
                selectsRange={true}
                minDate={new Date()}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                isClearable={true}
                withPortal
                placeholderText="Select tour date range"
              />
              {/* Validation Message */}
              {(!startDate || !endDate) && (
                <span className="text-red-500 text-sm mt-1">
                  Please select both start and end dates
                </span>
              )}
            </div>

            {/* Package Details */}
            <div className="form-control col-span-1 md:col-span-2">
              <label className="label">
                <span className="label-text font-semibold">
                  Package Details
                </span>
              </label>
              <textarea
                placeholder="Provide detailed information about the package"
                {...register("packageDetails", {
                  required: "Package details are required",
                })}
                className="textarea textarea-bordered w-full h-32 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-md transition duration-200"
              />
              {errors.packageDetails && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.packageDetails.message}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Price</span>
              </label>
              <input
                type="number"
                placeholder="Enter Price"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price must be a positive number" },
                })}
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-md transition duration-200"
              />
              {errors.price && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </span>
              )}
            </div>

            {/* Multiple Images */}
            <div className="form-control col-span-1 md:col-span-2">
              <label
                htmlFor="images"
                className="label"
              >
                <span className="label-text font-semibold">
                  Images (Max {MAX_IMAGES})
                </span>
              </label>
              <input
                type="file"
                multiple
                id="images"
                name="images"
                onChange={handleImageChange}
                className="file-input file-input-bordered w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-md transition duration-200"
              />
              {errors.images && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.images.message}
                </span>
              )}

              {/* Image Previews */}
              <div className="flex flex-wrap gap-4 mt-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 border rounded-md overflow-hidden shadow-sm"
                  >
                    <img
                      src={image.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageRemove(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none transition duration-200"
                      title="Remove Image"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>

              {/* Maximum Images Reached Message */}
              {images.length >= MAX_IMAGES && (
                <span className="text-red-500 text-sm mt-2">
                  Maximum number of images ({MAX_IMAGES}) reached.
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control col-span-1 md:col-span-2 mt-6">
              <CommonBtn
                text={"Add Package"}
                loading={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPackages;
