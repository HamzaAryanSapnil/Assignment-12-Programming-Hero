import { FaTrash } from "react-icons/fa";
import useLoadUsers from "../../../../Hooks/useLoadUsers";
import { MdOutlineTour } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const ManageUsers = () => {
  const [users, refetch] = useLoadUsers();
    // i have to make axiosSecure here to delete user
    
    const axiosSecure = useAxiosSecure();
  const handleDeleteUser = (user) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result?.isConfirmed) {
          axiosSecure
            .delete(`/users/${user._id}`)
            .then((res) => {
              if (res.data.deletedCount > 0) {
                refetch();
                swalWithBootstrapButtons.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
              }
            })
            .catch((err) => {
              swalWithBootstrapButtons.fire({
                title: "Error",
                text: { err },
                icon: "error",
              });
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your Food is safe :)",
            icon: "error",
          });
        }
      });
  };

  const handleMakeAdmin = (user) => {
    axiosSecure
      .patch(`/users/admin/${user?._id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Success",
            text: `${user?.displayName} made admin successfully`,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.message,
        });
      });
  };

  const handleMakeTourGuide = (user) => {
    axiosSecure
      .patch(`/users/tourGuide/${user?._id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Success",
            text: `${user?.displayName} made tour guide successfully`,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.message,
        });
      });
  };

  return (
    <div className="w-full h-full">
      <h2 className="text-5xl text-center font-medium">Manage Users</h2>
      <h2 className="text-3xl text-center ">Total Users: {users.length} </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra my-12 ">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Action</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((row, index) => (
              <tr key={row?._id}>
                <th>{index + 1}</th>
                <td> {row?.displayName} </td>
                <td>{row?.role ? row?.role : "user"}</td>
                <td>{row?.email}</td>
                <td>
                
                  <button
                    onClick={() => handleMakeAdmin(row)}
                    className="btn bg-transparent border-none text-black text-xl tooltip"
                    data-tip="make admin"
                  >
                    <MdAdminPanelSettings />
                  </button>
                </td>
                <td>
                 
                  <button
                    onClick={() => handleMakeTourGuide(row)}
                    className="btn bg-transparent border-none text-black text-xl tooltip"
                    data-tip="make tour guide"
                  >
                    <MdOutlineTour />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(row)}
                    className="btn bg-transparent border-none text-red-700 text-xl tooltip"
                    data-tip="Delete User"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
