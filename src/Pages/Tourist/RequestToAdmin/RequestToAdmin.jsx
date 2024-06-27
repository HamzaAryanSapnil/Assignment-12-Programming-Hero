import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const RequestToAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const handleRequestTourGuide = async () => {
    Swal.fire({
      title: "Do You Want To Become a Tour Guide?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const currentUser = {
            email: user?.email,
            name: user?.displayName,
            photo: user?.photoURL,
            role: "user",
            status: "requested",
          };
          const { data } = await axiosSecure.put("/users", currentUser);
          console.log(data);
          if (data.modifiedCount > 0) {
            Swal.fire({
              title: "Your Request Has Been Sent!",
              text: "An Admin will contact you soon. Please wait for confirmation. Thank you!",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Your Request Has Been Sent!",
              text: "An Admin will contact you soon. Thank you!",
              icon: "success",
            });
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Something went wrong! ${error.message}`,
          });
        }
      }
    });
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10 container mx-auto justify-center items-center justify-items-center">
        {user?.role === "tourGuide" || user?.role === "admin" ? (
          <div>
            <button
              disabled
              onClick={handleRequestTourGuide}
              className="btn btn-primary mx-4"
            >
              Requesting To Admin
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={handleRequestTourGuide}
              className="btn btn-primary mx-4"
            >
              Requesting To Admin
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestToAdmin;
