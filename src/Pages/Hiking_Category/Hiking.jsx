
import useAxiosLoadCategory from '../../Hooks/useAxiosLoadCategory';

const Hiking = () => {
    const { hiking } = useAxiosLoadCategory();
    
    return (
        <div>
            <h1>items for hiking total: {hiking.length} </h1>
        </div>
    );
};

export default Hiking;