import useOurPackages from "./useOurPackages";


const useAxiosLoadCategory = () => {
    const [packages] = useOurPackages();
    const hiking = packages.filter((item) => item.tourType === "hiking");
    const sports = packages.filter((item) => item.tourType === "sports");
    const walking = packages.filter(
      (item) => item.tourType === "Relaxing" || item.tourType === "walking"
    );
    const wildLife = packages.filter(
      (item) => item.tourType === "Adventure" || item.tourType === "Wildlife"
    );
    const airRides = packages.filter((item) => item.tourType === "airRides");

    return { hiking, sports, walking, wildLife, airRides };
    
};



export default useAxiosLoadCategory;