import { useNavigate,  } from "react-router-dom";

import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import CommonBtn from "../../../Components/Buttons/CommonBtn";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Container from "../../Shared/Container";
import { imageUpload } from "../../../Api";

const Tourist_Story_Sec_Review_Form = () => {

  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();



  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const package_image = form.package_image.value;
    const tourist_name = form.tourist_name.value;
    const tourist_email = form.tourist_email.value;
    const image = form.image.files[0];
    const tourGuideName = form.tourGuideName.value;
    const tourGuideEmail = form.tourGuideEmail.value;
    const storyDetailsReview = form.storyDetailsReview.value;

     

    const storyDetails = {
      title,
      package_image,
      tourist_name,
      tourist_email,
      
      tourGuideName,
      tourGuideEmail,
      storyDetailsReview,
    };
    console.log(storyDetails);

    try {
      const image_url = await imageUpload(image);

      const { data } = await axiosSecure.post(`/tour_story`, {...storyDetails, image_url});
      if (data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Success",
          text: "Story added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  return (
    <Container>
      <div className=" hero max-w-full w-full place-items-center bg-base-200  min-h-screen p-4 ">
        <div className=" flex w-full justify-between  flex-col lg:flex-row gap-10 my-28">
          <div
            className="hero w-4/12"
            style={{
              backgroundImage:
                "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="">
                <h1 className="mb-5 text-5xl font-bold">Tell Your Story</h1>
                <p className="mb-5">
                  Kindly share the details of your experiences and adventures
                  from this tour.
                </p>
              </div>
            </div>
          </div>
          <div className="card  w-6/12 bg-base-100   shrink-0 shadow-2xl p-4 flex-1 ">
            <form
              onSubmit={handleSubmit}
              className="max-w-full grid grid-cols-1 lg:grid-cols-3  justify-items-center items-center justify-center gap-4"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Package&apos;s Title</span>
                </label>
                <input
                  name="title"
                  type="text"
                  placeholder="Please Enter the Title Of Your Tour Package which you want to review"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Please Give us a single Photo From Your Tour
                  </span>
                </label>
                <input
                 
                  name="image"
                  type="file"
                  className='file-input w-full' 
                />
               
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tourist&apos;s Name</span>
                </label>
                <input
                  name="tourist_name"
                  type="text"
                  value={user?.displayName}
                  className="input input-bordered"
                  required
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tourist&apos;s Email</span>
                </label>
                <input
                  name="tourist_email"
                  type="email"
                  value={user?.email}
                  className="input input-bordered"
                  required
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tourist&apos;s Photo Url</span>
                </label>
                <input
                  name="tourist_photo"
                  type="text"
                  value={
                    user?.photoURL
                      ? user?.photoURL
                      : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  }
                  className="input input-bordered"
                  required
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tour Guide&apos;s Name</span>
                </label>
                <input
                  name="tourGuideName"
                  type="text"
                  placeholder="Please Enter the tour guide name of your tour package"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control  ">
                <label className="label">
                  <span className="label-text">Tour Guide&apos;s Email</span>
                </label>
                <input
                  name="tourGuideEmail"
                  type="email"
                  placeholder="Enter the email of tour guide"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">
                    Please share your experiences and adventures from this tour.
                  </span>
                </label>
                <textarea
                  name="storyDetailsReview"
                  type="text"
                  placeholder="Bio"
                  className="textarea textarea-bordered textarea-lg w-full max-w-xs"
                ></textarea>
              </div>
              <div className="form-control mt-6 justify-self-center lg:col-span-3  my-4">
                <CommonBtn text="Submit"></CommonBtn>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Tourist_Story_Sec_Review_Form;
