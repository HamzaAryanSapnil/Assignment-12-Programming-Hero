import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useStoryData = (id) => {
    const axiosSecure = useAxiosSecure();
    const {
      data: tour_story = [],
      refetch,
      isLoading: loading,
      error,
    } = useQuery({
      queryKey: ["tour_story"],
      queryFn: async () => {
        try {
          const { data } = await axiosSecure.get(`/tour_story/${id}`);
          return data;
        } catch (error) {
          console.error(error);
        }
      },
    });
    return [tour_story, refetch, loading, error];
};

export default useStoryData;