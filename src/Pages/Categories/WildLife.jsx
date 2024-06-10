import useAxiosLoadCategory from "../../Hooks/useAxiosLoadCategory";


const WildLife = () => {
    const { wildLife } = useAxiosLoadCategory();
    return (
      <div>
        <h1> this is wildLife category {wildLife.length}</h1>
      </div>
    );
};

export default WildLife;