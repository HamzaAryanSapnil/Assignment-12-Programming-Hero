
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useTourGuideDetails = (id) => {
      const axiosSecure = useAxiosSecure();
      const {
        data: tourGuideDetails = [],
        isLoading: loading,
        refetch: reload,
      } = useQuery({
        queryKey: "tour_guide_details",
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/allTourGuides/${id}`);
          return data;
        },
      });

      return [tourGuideDetails, loading, reload];
};

export default useTourGuideDetails;