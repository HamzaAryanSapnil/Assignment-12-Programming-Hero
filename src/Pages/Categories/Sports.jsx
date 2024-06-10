
import useAxiosLoadCategory from '../../Hooks/useAxiosLoadCategory';

const Sports = () => {
    const {sports} = useAxiosLoadCategory();
    return (
        <div>
            <h1> this is sports category { sports.length }</h1>
        </div>
    );
};

export default Sports;