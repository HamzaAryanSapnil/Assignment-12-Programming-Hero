import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useLoadUsers = () => {
    const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
      queryFn: async () => {
        // i have to make this to axios secure
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  return [users, refetch];
};

export default useLoadUsers;
