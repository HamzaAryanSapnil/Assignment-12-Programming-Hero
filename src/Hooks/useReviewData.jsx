import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useReviewData = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: tour_reviews = [],
    refetch,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["tour_reviews"],
    queryFn: async () => {
      try {
        const { data } = await axiosPublic.get(`/tour_story`);
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });
  return [tour_reviews, refetch, loading, error];
};


export default useReviewData;