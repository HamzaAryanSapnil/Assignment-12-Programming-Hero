import useAxiosLoadCategory from "../../Hooks/useAxiosLoadCategory";


const Walking = () => {
    const {walking} = useAxiosLoadCategory();
    return (
        <div>
            <h2>this is walking category { walking.length }</h2>
        </div>
    );
};

export default Walking;