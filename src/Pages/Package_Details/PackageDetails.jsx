import { useLoaderData } from "react-router-dom";

const PackageDetails = () => {
  const data = useLoaderData();
  console.log(data);
  return <div>This is package details page of package: {data?.title}</div>;
};

export default PackageDetails;
