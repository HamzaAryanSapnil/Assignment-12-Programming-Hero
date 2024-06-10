import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useWishlist = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { refetch, data: wishList = [] } = useQuery({
    queryKey: ["wishList", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishList?email=${user.email}`);
      return res.data;
    },
  });

  return [wishList, refetch];
};

export default useWishlist;
