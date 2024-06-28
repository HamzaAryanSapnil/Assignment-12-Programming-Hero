import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import MyBookingsRow from "./MyBookingsRow";

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
    
    if (isLoading) {    
        <div className="flex justify-center items-center h-screen" >
            <span className="loading loading-spinner loading-lg"></span>
        </div>
        
    }

  return (
    <div className="overflow-x-auto w-full container mx-auto">
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
            <MyBookingsRow key={payment._id} index={index} payment={payment} refetch={refetch}></MyBookingsRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookings;
