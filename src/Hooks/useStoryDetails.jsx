
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useStoryDetails = (id) => {
     const axiosSecure = useAxiosSecure();
     const {
       data: storyDetails = [],
       isLoading,
       refetch,
     } = useQuery({
       queryKey: "story_details",
       queryFn: async () => {
         const { data } = await axiosSecure.get(`/tour_story/${id}`);
         return data;
       },
     });

     return [storyDetails, isLoading, refetch];
};

export default useStoryDetails;