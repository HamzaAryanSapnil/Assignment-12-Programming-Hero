import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useOurPackages = (tourType) => {
  const axiosPublic = useAxiosPublic();
  console.log("Tour Type From useOurPackages hook: ", tourType);
  

  const {
    data: ourPackages = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["ourPackages", tourType],
    queryFn: async () => {
      const res = await axiosPublic.get(`/ourPackages?tourType=${tourType}`);
      return res.data;
    },
  });

  return [ourPackages, loading, refetch];
};

export default useOurPackages;
