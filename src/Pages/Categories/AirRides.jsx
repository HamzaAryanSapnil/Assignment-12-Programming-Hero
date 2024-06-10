import useAxiosLoadCategory from "../../Hooks/useAxiosLoadCategory";


const AirRides = () => {
    const { airRides } = useAxiosLoadCategory();
    return (
      <div>
        <h1> this is Air Rides category {airRides.length}</h1>
      </div>
    );
};

export default AirRides;