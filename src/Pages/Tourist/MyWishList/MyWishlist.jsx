import { FaTrash } from "react-icons/fa";
import useWishlist from "../../../Hooks/useWishlist";
import {  FaTableList } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyWishlist = () => {
  const [wishList, refetch] = useWishlist();
  const totalPrice = wishList.reduce((sum, item) => sum + item.price, 0);
  const axiosSecure = useAxiosSecure();
  const handleDelete = (id) => {
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
        if (result.isConfirmed) {
          axiosSecure
            .delete(`/wishList/${id}`)
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
            text: "Your tour package is safe :)",
            icon: "error",
          });
        }
      });
  };
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center">
        Total Price: {totalPrice}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Tour Type</th>
              <th>Price</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {wishList.map((item, index) => (
              <tr key={item._id}>
                <th> {index + 1} </th>
                <td> {item?.title} </td>
                <td> {item?.tourType} </td>
                <td> {item?.price} </td>
                <td>
                  <span
                    className="tooltip font-bold btn bg-transparent p-4 border-none"
                    data-tip="View Details"
                  >
                    <FaTableList />
                  </span>
                </td>
                <td>
                  <span
                    className="tooltip text-red-700 font-bold btn bg-transparent p-4 border-none "
                    data-tip="Delete"
                    onClick={() => handleDelete(item?._id)}
                  >
                    <FaTrash />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyWishlist;
