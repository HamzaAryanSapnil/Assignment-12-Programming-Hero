
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const usePackageDetails = (id) => {
  const axiosSecure = useAxiosSecure();
  const { data: packageDetails = [], isLoading: loading, refetch: reload } = useQuery({
    queryKey: "packageDetails",
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/ourPackages/${id}`);
      return data;
    }
  })
    
    return [packageDetails, loading, reload];
};

export default usePackageDetails;