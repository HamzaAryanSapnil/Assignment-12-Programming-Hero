import { useParams } from "react-router-dom";
import useStoryDetails from "../../../Hooks/useStoryDetails";


const StoryDetails = () => {
    const { id } = useParams()
    console.log(id);
    
    const [storyDetails] = useStoryDetails(id)
    console.log(storyDetails);
    
    return (
        <div>
            this is story details
        </div>
    );
};

export default StoryDetails;