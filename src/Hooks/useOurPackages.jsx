import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useOurPackages = (tourType, searchQuery) => {
  const axiosPublic = useAxiosPublic();
  console.log("Tour Type From useOurPackages hook: ", tourType);

  const {
    data: ourPackages = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["ourPackages", tourType, searchQuery],
    queryFn: async () => {
      const res = await axiosPublic.get(`/ourPackages`, {
        params: { search: searchQuery || "", tourType: tourType || "" },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  return [ourPackages, loading, refetch];
};

export default useOurPackages;
