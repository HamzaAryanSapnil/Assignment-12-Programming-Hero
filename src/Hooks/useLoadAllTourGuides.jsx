import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useLoadAllTourGuides = () => {
    const axiosPublic = useAxiosPublic();
    const { data: tourGuides = [], refetch, isLoading } = useQuery({
      queryKey: ["tourGuides"],
      queryFn: async () => {
        // i have to make this to axios secure
        const res = await axiosPublic.get("/allTourGuides");
        return res.data;
      },
    });
    return [tourGuides, refetch, isLoading];
};

export default useLoadAllTourGuides;