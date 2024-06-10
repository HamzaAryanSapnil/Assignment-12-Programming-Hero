import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useOurPackages = () => {
  // const [ourPackages, setOurPackages] = useState([]);
  const axiosPublic = useAxiosPublic();

  // axios.get("ourPackages.json")
  //     .then((data) => {
  //         setOurPackages(data.data)
  //     });
  const {
    data: ourPackages = [],
    // isPending: loading,
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axiosPublic.get("/ourPackages");
      return res.data;
     
    },
  });

  return [ourPackages, loading, refetch];


};

export default useOurPackages;
