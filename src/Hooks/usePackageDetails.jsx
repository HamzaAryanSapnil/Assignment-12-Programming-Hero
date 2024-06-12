import { useEffect } from "react";
import useAxiosPublic from "./useAxiosPublic";


const usePackageDetails = () => {
    const axiosPublic = useAxiosPublic();
    useEffect(() => {
      axiosPublic.get("/ourPackages").then((res) => {
        console.log(res.data);
      })
    }, [axiosPublic])
    
    return (
        <div>
            
        </div>
    );
};

export default usePackageDetails;