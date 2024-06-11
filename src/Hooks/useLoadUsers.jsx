import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";

const useLoadUsers = () => {
    // const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
      queryFn: async () => {
        // i have to make this to axios secure
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });
  return [users, refetch];
};

export default useLoadUsers;
