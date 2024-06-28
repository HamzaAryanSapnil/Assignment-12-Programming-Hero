import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";


const MyAssignedTours = () => {
    // use tanstack query to load my assigned tours
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: my_assigned_tours = [], refetch} = useQuery({
        queryKey: ["my_assigned_tours", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
              `/tourGuideAssignedTours/${user?.email}`
            );
            return res.data;
        }
    })
    useEffect(() => {
      
    refetch()
    }, [refetch])
    


    // i need to change status in server to approved

    const handleApproveButton =  (tour) => {
        axiosSecure
          .patch(`/tourGuideAssignedTours/approved/${tour?._id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
            }
          })
          .catch((err) => {
            console.log(err);
          });
    }

    const handleRejectedButton = (tour) => {
        axiosSecure
          .patch(`/tourGuideAssignedTours/rejected/${tour?._id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
            }
          })
          .catch((err) => {
            console.log(err);
          });
    }

    return (
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Package Name</th>
              <th>Price</th>
                        <th>Tourist Name</th>
                        <th>Status</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {my_assigned_tours.map((tour, index) => (
              <tr key={tour?._id}>
                <th>{index + 1}</th>
                <td>{tour?.title}</td>
                <td>{tour?.price}</td>
                    <td>{tour?.name}</td>
                    <td className={tour?.status === "approved" ? "text-green-500" : "text-red-500" } >{ tour?.status  }</td>
                <td>
                  <button
                    onClick={() => handleApproveButton(tour)}
                    className="btn text-green-500"
                  >
                    <FaCheck />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleRejectedButton(tour)}
                    className="btn text-red-500 font-bold"
                  >
                    <RiTwitterXLine />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default MyAssignedTours;