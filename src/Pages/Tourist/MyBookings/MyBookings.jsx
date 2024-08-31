import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import MyBookingsRow from "./MyBookingsRow";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import CommonBtn from "../../../Components/Buttons/CommonBtn";

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], refetch, isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });
    
    
    // i need to delete payment after booking
    const handleDelete = (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
              axiosSecure.delete(`/payments/${id}`).then((res) => {
                if (res.data.deletedCount > 0) {
                  refetch();
                   Swal.fire({
                     title: "Deleted!",
                     text: "Your file has been deleted.",
                     icon: "success",
                   });
                }
              })

           
          }
        });
    }
    
    if (isLoading) {    
        <div className="flex justify-center items-center h-screen" >
            <span className="loading loading-spinner loading-lg"></span>
        </div>
        
  }
  
  if (payments.length === 0) {
    return (
      <div className="flex flex-col gap-10 justify-center items-center h-screen">
        <h1 className="text-4xl font-bold">No Bookings!</h1>
        <Link to="/">
          <CommonBtn text="Go To Home" />
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full container mx-auto">
      <h1 className="text-3xl font-bold mb-5">My Bookings</h1>
      <p className="text-lg mb-5 text-dark-03 font-extralight font-libre-franklin" >Please Donot Forget to Share Your Story If Your Status is Approved</p>
      <table className="table ">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Package  </th>
            <th> Price And Date </th>
            <th>Status</th>
            <th>Action</th>
      
          </tr>
        </thead>
        <tbody>
          {payments?.map((payment, index) => (
            <MyBookingsRow key={payment._id} index={index} payment={payment} refetch={refetch} handleDelete={handleDelete} ></MyBookingsRow>
          ))}
        </tbody>
      </table>
      {/* Share Your Story Section */}
      
    </div>
  );
};

export default MyBookings;
