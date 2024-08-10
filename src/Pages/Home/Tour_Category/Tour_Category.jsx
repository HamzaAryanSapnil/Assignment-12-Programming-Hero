
import "swiper/css";
import "swiper/css/pagination";
import Container from "../../Shared/Container";
import Tour_Category_Card from "./Tour_Category_Card";
import useCategoryData from "../../../Hooks/useCategoryData";

const Tour_Category = () => {
  const [categoryData] = useCategoryData();
  
  return (
    <Container className="" >
      <div className="flex items-center justify-between overflow-x-auto p-3 my-10 gap-6">
        {categoryData.map((category, index) => (
          <Tour_Category_Card key={index} image={category.image} label={category.label} icon={category.icon} />
        ))}
      </div>
    </Container>
  );
};

export default Tour_Category;
